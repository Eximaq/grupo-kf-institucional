"""Visual and functional verification for the Grupo KF institutional website."""
import argparse
import json
from pathlib import Path
from urllib.parse import urljoin

from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser()
parser.add_argument(
    "--url",
    default="http://127.0.0.1:5173/grupo-kf-institucional/",
    help="Local Vite URL or GitHub Pages publication URL",
)
args = parser.parse_args()

output = Path("qa")
output.mkdir(exist_ok=True)
errors = []
report = []

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    for label, width, height in [
        ("desktop", 1440, 900),
        ("tablet", 768, 1024),
        ("mobile", 390, 844),
    ]:
        page = browser.new_page(
            viewport={"width": width, "height": height},
            device_scale_factor=1,
            reduced_motion="no-preference",
        )
        page.on("pageerror", lambda error: errors.append(str(error)))
        page.on(
            "console",
            lambda message: errors.append(message.text)
            if message.type == "error"
            else None,
        )
        page.on(
            "response",
            lambda response: errors.append(f"{response.status}: {response.url}")
            if response.status >= 400
            else None,
        )
        response = page.goto(args.url, wait_until="networkidle")
        assert response and response.status == 200, f"Cannot open site: {args.url}"
        page.evaluate("document.fonts.ready")

        # Load lazy images before checking the complete document.
        for y in range(0, page.evaluate("document.documentElement.scrollHeight"), max(300, height - 100)):
            page.evaluate("(y) => window.scrollTo(0, y)", y)
            page.wait_for_timeout(90)
        page.wait_for_load_state("networkidle")
        page.evaluate("window.scrollTo(0, 0)")
        page.wait_for_timeout(200)

        page.screenshot(path=str(output / f"{label}-full.png"), full_page=True)
        page.screenshot(path=str(output / f"{label}-opening.png"))

        stats = page.evaluate("""() => ({
            title: document.title,
            h1: document.querySelector('h1')?.innerText,
            hasHorizontalOverflow: document.documentElement.scrollWidth > innerWidth,
            brokenImages: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.src),
            brokenAnchors: [...document.querySelectorAll('a[href^="#"]')].filter(a => !document.getElementById(a.hash.slice(1))).map(a => a.hash),
            manropeLoaded: document.fonts.check('14px Manrope'),
            instrumentSerifLoaded: document.fonts.check('14px "Instrument Serif"'),
            tabCount: document.querySelectorAll('[role="tab"]').length,
            brandLogoCount: [...document.images].filter(i => i.alt.startsWith('Logomarca')).length
        })""")
        assert not stats["hasHorizontalOverflow"], stats
        assert not stats["brokenImages"], stats
        assert not stats["brokenAnchors"], stats
        assert stats["manropeLoaded"], stats
        assert stats["instrumentSerifLoaded"], stats
        assert stats["tabCount"] == 5, stats
        assert page.get_by_role("heading", name="Quem somos.").count() == 1
        clip_url = page.locator(".reel-video").get_attribute("src")
        assert ("grupo-kf-reel-mobile.mp4" if width <= 680 else "grupo-kf-reel-fullhd.mp4") in clip_url, clip_url
        clip_response = page.request.get(urljoin(args.url, clip_url), timeout=15000)
        assert clip_response.status == 200, f"Video missing: {clip_url}"
        assert "video/mp4" in clip_response.headers.get("content-type", ""), clip_response.headers
        video = page.locator(".reel-video")
        video.evaluate("(v) => { v.muted = true; v.currentTime = 0; }")
        video.evaluate("(v) => v.play()")
        page.wait_for_timeout(1400)
        playback = video.evaluate("""(v) => ({
            currentTime: v.currentTime, readyState: v.readyState,
            paused: v.paused, visible: getComputedStyle(v).display !== 'none',
            opacity: getComputedStyle(v).opacity
        })""")
        assert playback["currentTime"] > 0.25 and playback["readyState"] >= 2 and not playback["paused"], playback
        assert playback["visible"] and float(playback["opacity"]) > 0.5, playback
        video.evaluate("(v) => v.pause()")
        assert page.locator(".reel-chapter").count() == 3
        chapter_labels = [
            "".join(s.split())[2:] for s in page.locator(".reel-chapter-title").all_text_contents()
        ]
        assert chapter_labels == ["Alagoas", "RioGrandedoSul", "SantaCatarina"], chapter_labels
        manifest = page.request.get(urljoin(args.url, "assets/videos/reel-manifest.json"), timeout=15000)
        assert manifest.status == 200
        assert isinstance(manifest.json()["realFootage"], bool)
        for number in range(3):
            page.locator(".reel-chapter").nth(number).click()
            current_time = page.locator(".reel-video").evaluate("(v) => v.currentTime")
            assert abs(current_time - [0,4.5,9][number]) < 1.5, current_time
        assert stats["brandLogoCount"] >= 6, stats

        tabs = page.get_by_role("tab")
        for index in range(5):
            tabs.nth(index).click()
            assert tabs.nth(index).get_attribute("aria-selected") == "true"
            assert page.locator(".explorer-panel").is_visible()
        tabs.nth(4).press("ArrowDown")
        assert tabs.nth(0).get_attribute("aria-selected") == "true"
        tabs.nth(0).press("End")
        assert tabs.nth(4).get_attribute("aria-selected") == "true"
        tabs.nth(4).press("Home")
        assert tabs.nth(0).get_attribute("aria-selected") == "true"

        if width <= 680:
            toggle = page.locator(".menu-button")
            toggle.click()
            assert toggle.get_attribute("aria-expanded") == "true"
            page.get_by_role("navigation").get_by_role("link", name="Nossas empresas").click()
            assert toggle.get_attribute("aria-expanded") == "false"

        contact_url = urljoin(args.url, "contato/")
        page.goto(contact_url, wait_until="networkidle")
        assert page.url.rstrip("/").endswith("/contato"), page.url
        assert page.title() == "Contato | Grupo KF", page.title()
        assert page.get_by_role("heading", name="Cinco marcas. Uma apresentação.").count() == 1
        assert page.get_by_role("heading", level=3).count() == 5
        assert page.get_by_text("Informações demonstrativas").count() == 1
        assert page.locator(".contact-company-details dd").count() == 5
        assert page.get_by_text("Celular / WhatsApp").count() == 0
        assert page.locator(".contact-directory-list a[href^='mailto:']").count() == 0
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")
        page.screenshot(path=str(output / f"{label}-contact-full.png"), full_page=True)
        page.screenshot(path=str(output / f"{label}-contact-opening.png"))
        assert page.get_by_role("link", name="Voltar ao início").get_attribute("href") == "/grupo-kf-institucional/"
        for slug in ["kf-agro", "kf-air", "kf-servico", "kf-caminhoes-maquinas", "vd-calcados"]:
            company_page = urljoin(args.url, "empresas/" + slug + "/")
            response = page.goto(company_page, wait_until="networkidle")
            assert response and response.status == 200, company_page
            assert page.locator(".company-page h1").count() == 1, company_page
            assert page.locator(".company-intro-logo img").count() == 1, company_page
            assert page.locator(".company-related-item").count() == 2, company_page
            agro_suggestion = page.locator('.company-related-item[href*="kf-agro/"]')
            if agro_suggestion.count():
                assert "kf-agro-capa.jpg" in agro_suggestion.locator("img").get_attribute("src")
            if slug == "vd-calcados":
                assert page.locator(".vd-kids-feature").count() == 1
                assert page.locator(".vd-kids-feature img").evaluate("(img) => img.complete && img.naturalWidth > 0")
                assert page.locator(".company-hero-image img").last.evaluate("(img) => img.complete && img.naturalWidth > 0")
            if slug == "kf-air":
                air_cover = page.locator(".company-hero-image img").last
                assert "kf-air-capa.jpeg" in air_cover.get_attribute("src")
                assert air_cover.evaluate("(img) => img.complete && img.naturalWidth > 0")
            if slug == "kf-agro":
                agro_hero = page.locator(".company-hero-image img").last
                assert "kf-agro-capa.jpg" in agro_hero.get_attribute("src")
                assert agro_hero.evaluate("(img) => img.complete && img.naturalWidth > 0")

            machinery_card = page.locator('.company-related-item[href*="kf-caminhoes-maquinas/"]')
            if machinery_card.count():
                assert "frota-kf-capa.png" in machinery_card.locator("img").get_attribute("src"), company_page
            assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), company_page
            assert page.locator(".company-hero-image img").last.evaluate("(img) => img.complete && img.naturalWidth > 0")
            if slug == "kf-caminhoes-maquinas":
                cover = page.locator(".company-hero-uploaded")
                assert cover.count() == 1
                assert "frota-kf-capa.png" in cover.get_attribute("src")
        page.screenshot(path=str(output / f"{label}-company-page.png"), full_page=True)
        report.append({"viewport": label, "width": width, **stats, "contactOK": True, "companiesOK": 5})
        page.close()

    browser.close()

result = {"url": args.url, "viewports": report, "errors": errors}
(output / "report.json").write_text(
    json.dumps(result, indent=2, ensure_ascii=False), encoding="utf-8"
)
print(json.dumps(result, ensure_ascii=False))
assert not errors, errors
