"""Download the licensed photographic and typographic assets used by the site."""
import re
from pathlib import Path
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1] / "public" / "assets"
PHOTOS = {
    "horizonte": ("1445262801997-d50c1f12cb4d", 2000),
    "agro": ("1675896655875-c2bab196d4dd", 1600),
    "air": ("1528668196720-27460849c191", 1600),
    "servicos": ("1497366811353-6870744d04b2", 1000),
    "maquinas": ("1523848309072-c199db53f137", 1400),
    "calcados": ("1631701657898-8c452b7380d9", 1000),
}

def download(url, path):
    request = Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urlopen(request, timeout=45) as response:
        path.write_bytes(response.read())
    print(path.name, path.stat().st_size)

for name, (photo_id, width) in PHOTOS.items():
    download(f"https://images.unsplash.com/photo-{photo_id}?fit=max&w={width}&q=82&fm=webp", ROOT / "photos" / f"{name}.webp")

for family, name in [("Instrument+Serif", "instrument-serif"), ("Manrope:wght@400;500;600;700", "manrope")]:
    request = Request(f"https://fonts.googleapis.com/css2?family={family}&display=swap", headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"})
    css = urlopen(request, timeout=30).read().decode()
    blocks = re.findall(r"/\* ([^*]+) \*/\s*(@font-face\s*\{[^}]+\})", css)
    if not blocks:
        raise RuntimeError(f"No font files found for {family}")
    for subset, block in blocks:
        if subset.strip() in ("latin", "latin-ext"):
            url = re.search(r"url\(([^)]+)\)", block).group(1)
            filename = (name if name == "instrument-serif" and subset.strip() == "latin" else f"{name}-{subset.strip()}") + ".woff2"
            download(url, ROOT / "fonts" / filename)

for family, directory in [("instrumentserif", "instrument-serif"), ("manrope", "manrope")]:
    download(f"https://raw.githubusercontent.com/google/fonts/main/ofl/{family}/OFL.txt", ROOT / "fonts" / f"{directory}-OFL.txt")
