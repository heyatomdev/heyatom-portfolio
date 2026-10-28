"""Packs public/brand/ into public/brand/heyatom-brand-kit.zip: every SVG, a PNG of each at 1x and 2x, the PDF guide.

Run after render.py (and pdf.sh, if the guide changed).
Usage: DYLD_FALLBACK_LIBRARY_PATH=/opt/homebrew/lib uvx --with cairosvg python brand/kit.py
"""
import zipfile
from pathlib import Path

import cairosvg

OUT = Path(__file__).resolve().parent.parent / 'public/brand'
ZIP = OUT / 'heyatom-brand-kit.zip'
WIDTH = {'mark': 512, 'edition': 512, 'logo-stacked': 640, 'logo': 1200}  # 1x width, first prefix match wins

with zipfile.ZipFile(ZIP, 'w', zipfile.ZIP_DEFLATED) as z:
    for svg in sorted(OUT.glob('heyatom-*.svg')):
        stem = svg.stem.removeprefix('heyatom-')
        w = next(v for k, v in WIDTH.items() if stem.startswith(k))
        z.write(svg, f'heyatom-brand-kit/svg/{svg.name}')
        for scale in (1, 2):
            png = cairosvg.svg2png(url=str(svg), output_width=w * scale)
            z.writestr(f'heyatom-brand-kit/png/{svg.stem}@{scale}x.png', png)
    z.write(OUT / 'heyatom-brand.pdf', 'heyatom-brand-kit/heyatom-brand.pdf')

print(f'{ZIP.relative_to(OUT.parent.parent)} · {ZIP.stat().st_size // 1024} KB')
