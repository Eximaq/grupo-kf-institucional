"""Visual and functional checks for the local or published static site."""
import argparse
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser()
parser.add_argument("--url", default="http://127.0.0.1:5173/grupo-kf-institucional/")
parser.add_argument("--inspect-only", action="store_true")
args = parser.parse_args()
output = Path("qa")
output.mkdir(exist_ok=True)
errors = []
report = []

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    for label, width, height in [("desktop", 1440, 1000), ("tablet", 768, 1024), ("mobile", 390, 844)]:
        page = browser.new_page(viewport={"width": width, "height": height}, device_scale_factor=1, reduced_motion="reduce")
        page.on("pageerror", lambda error: errors.append(str(error)))
        page.on("console", lambda message: errors.append(message.text) if message.type == "error" else None)
        page.on("response", lambda response: errors.append(f"{response.status}: {response.url}") if response.status >= 400 else None)
        response = page.goto(args.url, wait_until="networkidle")
        assert response.status == 200
        page.evaluate("document.fonts.ready")
        for y in range(0, page.evaluate("document.documentElement.scrollHeight"), height - 100):
            page.evaluate("window.scrollTo(0, %d)" % y)
            page.wait_for_timeout(90)
        page.wait_for_load_state("networkidle")
        page.evaluate("window.scrollTo(0, 0)")
        page.wait_for_timeout(300)
        page.screenshot(path=str(output / f"{label}-full.png"), full_page=True)
        page.screenshot(path=str(output / f"{label}-opening.png"))
        for selector, name in [(".agro-section", "agro"), (".work-section", "work"), (".retail-section", "retail")]:
            page.locator(selector).screenshot(path=str(output / f"{label}-{name}.png"), style=".header, .skip-link { visibility: hidden !important; }")
        info = page.evaluate("""() => ({
          title: document.title,
          h1: document.querySelector('h1').innerText,
          overflow: document.documentElement.scrollWidth > innerWidth,
          failedImages: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.src),
          logoCount: [...document.images].filter(i => i.alt.startsWith('Logotipo')).length,
          font: document.fonts.check('16px Manrope') && document.fonts.check('16px "Instrument Serif"'),
          brokenAnchors: [...document.querySelectorAll('a[href^="#"]')].filter(a => !document.getElementById(a.getAttribute('href').slice(1))).map(a => a.getAttribute('href')),
          tabs: [...document.querySelectorAll('[role="tab"]')].map(b => b.textContent),
          buttons: [...document.querySelectorAll('button')].map(b => b.textContent)
        })""")
        report.append({"viewport": label, "width": width, **info})
        if not args.inspect_only:
            assert not info["overflow"], info
            assert not info["failedImages"], info
            assert not info["brokenAnchors"], info
            assert info["logoCount"] == 10
            assert info["font"]
            tabs = page.get_by_role("tab")
            for index in range(5):
                tabs.nth(index).click()
                assert tabs.nth(index).get_attribute("aria-selected") == "true"
                assert page.get_by_role("tabpanel").get_attribute("aria-labelledby") == f"hero-tab-{index}"
                page.wait_for_load_state("networkidle")
            tabs.nth(4).press("ArrowRight")
            assert tabs.nth(0).get_attribute("aria-selected") == "true"
            tabs.nth(0).press("End")
            assert tabs.nth(4).get_attribute("aria-selected") == "true"
            tabs.nth(4).press("Home")
            assert tabs.nth(0).get_attribute("aria-selected") == "true"
            if width <= 850:
                menu = page.locator('.menu-toggle')
                menu.click()
                assert menu.get_attribute("aria-expanded") == "true"
                page.get_by_role("navigation").get_by_role("link", name="Nossos negócios", exact=True).click()
                assert menu.get_attribute("aria-expanded") == "false"
                assert page.evaluate("location.hash") == "#negocios"
                menu.click()
                page.keyboard.press("Escape")
                assert menu.get_attribute("aria-expanded") == "false"
                assert menu.evaluate("el => el === document.activeElement")
            page.get_by_role("button", name="Fotografias e créditos", exact=True).click()
            assert page.get_by_role("dialog").is_visible()
            assert page.get_by_role("dialog").get_by_role("link").count() == 7
            page.keyboard.press("Escape")
            assert not page.get_by_role("dialog").is_visible()
            for identifier in ["grupo", "agro", "air", "servico", "maquinas", "calcados", "horizontes"]:
                links = page.locator(f'a[href="#{identifier}"]:visible')
                if links.count() == 0:
                    page.get_by_role("button", name="Menu", exact=True).click()
                page.locator(f'a[href="#{identifier}"]:visible').first.click()
                assert page.evaluate("location.hash") == f"#{identifier}"
            page.get_by_role("link", name="Voltar ao início", exact=True).click()
            assert page.evaluate("location.hash") == "#inicio"
        page.close()
    browser.close()

result = {"url": args.url, "viewports": report, "errors": errors, "mode": "inspection" if args.inspect_only else "verification"}
(output / "report.json").write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps(result, ensure_ascii=True, indent=2))
assert not errors, errors
