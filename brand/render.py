"""Builds the brand kit in public/brand/ (the files listed on /brand).

Mark: the hand from public/favicon.svg. Wordmark: "HeyAtom" in Manrope 800 from cv/fonts/, outlined.
Usage: uvx --with fonttools --with brotli python brand/render.py
"""
import re
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public/brand'
JADE, INK, BG, WHITE, BLACK = '#00a86b', '#f2f2f2', '#1e201e', '#ffffff', '#020202'

hand = re.search(r' d="([^"]+)"', (ROOT / 'public/favicon.svg').read_text()).group(1)
HX0, HX1 = 40.8, 1039.2  # hand's horizontal extent inside its 1080 box

# The woff2 is the variable font: pin it to 800 before reading outlines.
font = instancer.instantiateVariableFont(TTFont(ROOT / 'cv/fonts/Manrope-normal-800-latin.woff2'), {'wght': 800})
glyphs, cmap, hmtx = font.getGlyphSet(), font.getBestCmap(), font['hmtx']
CAP = font['OS/2'].sCapHeight  # 1440 units
DESC = -font['glyf'][cmap[ord('y')]].yMin  # the "y" tail, kept inside the box
TRACK = -0.02 * font['head'].unitsPerEm
x, parts = 0, []
for ch in 'HeyAtom':
    g = cmap[ord(ch)]
    pen = SVGPathPen(glyphs)
    glyphs[g].draw(TransformPen(pen, (1, 0, 0, -1, x, 0)))  # y-down, baseline at 0
    parts.append(pen.getCommands())
    x += hmtx[g][0] + TRACK
word, WORD_W = ' '.join(parts), x - TRACK
LSB = hmtx[cmap[ord('H')]][1]
X = CAP / 2  # gap between hand and name; clear space is 2X


def svg(name, view_box, body):
    (OUT / f'heyatom-{name}.svg').write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view_box}" role="img"><title>HeyAtom</title>{body}</svg>\n')


def lockup(hand_fill, text_fill, stacked):
    if stacked:  # hand 2.6 caps tall, centred over the name
        h = 2.6 * CAP
        s = h / 1080
        w = WORD_W - LSB
        hx, hy = (w - (HX1 - HX0) * s) / 2 - HX0 * s, -CAP - X - h
        tx, box = -LSB, f'0 {hy:.0f} {w:.0f} {h + X + CAP + DESC:.0f}'
    else:  # hand 1.5 caps tall, centred on the cap height
        h = 1.5 * CAP
        s = h / 1080
        hx, hy = -HX0 * s, -CAP / 2 - h / 2
        tx = (HX1 - HX0) * s + X - LSB
        box = f'0 {hy:.0f} {tx + WORD_W:.0f} {max(hy + h, DESC) - hy:.0f}'
    return box, (f'<path fill="{hand_fill}" transform="translate({hx:.1f} {hy:.1f}) scale({s:.4f})" d="{hand}"/>'
                 f'<path fill="{text_fill}" transform="translate({tx:.1f} 0)" d="{word}"/>')


OUT.mkdir(exist_ok=True)
# The icon is the hand alone, no container: green-light reads on dark grounds, green-dark on light ones.
for name, fill in [('mark', JADE), ('mark-green-light', '#33bf89'), ('mark-green-dark', '#007a4d'), ('mark-black', BLACK), ('mark-white', WHITE)]:
    svg(name, '0 0 1080 1080', f'<path fill="{fill}" d="{hand}"/>')

for stacked in (False, True):
    for name, hand_fill, text_fill in [('dark', JADE, INK), ('light', JADE, BG), ('black', BLACK, BLACK), ('white', WHITE, WHITE)]:
        svg(f'logo{"-stacked" if stacked else ""}-{name}', *lockup(hand_fill, text_fill, stacked))

print('\n'.join(sorted(p.name for p in OUT.glob('*.svg'))))
