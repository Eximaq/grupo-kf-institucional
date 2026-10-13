"""Visual and functional verification for the Grupo KF institutional website."""
import argparse
import json
from pathlib import Path

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
            reduced_motion="reduce",
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

        report.append({"viewport": label, "width": width, **stats})
        page.close()

    browser.close()

result = {"url": args.url, "viewports": report, "errors": errors}
(output / "report.json").write_text(
    json.dumps(result, indent=2, ensure_ascii=False), encoding="utf-8"
)
print(json.dumps(result, ensure_ascii=False))
assert not errors, errors
