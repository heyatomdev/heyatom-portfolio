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

# Special editions (app/data/editions.ts): same hand, dressed for the date. Everything is clipped to the hand.
CLIP = f'<defs><clipPath id="h"><path d="{hand}"/></clipPath></defs>'
clip = lambda body: f'<g clip-path="url(#h)">{body}</g>'

# Pride: the six-stripe rainbow filling the hand.
rainbow = ['#e40303', '#ff8c00', '#ffed00', '#008026', '#24408e', '#732982']
pride = clip(''.join(f'<rect y="{i * 180}" width="1080" height="181" fill="{c}"/>' for i, c in enumerate(rainbow)))

# Halloween: mummy. Jade hand in slanted bandages, two eyes peeking through the wide one.
wrap = ''.join(f'<rect x="-300" y="{y}" width="1700" height="70" transform="rotate(-12 540 540)"/>' for y in (60, 230, 400, 900))
halloween = f'<path fill="{JADE}" d="{hand}"/>' + clip(
    f'<g fill="{INK}">{wrap}<rect x="-300" y="600" width="1700" height="260" transform="rotate(-12 540 540)"/></g>'
    f'<g fill="{BG}"><circle cx="330" cy="740" r="48"/><circle cx="530" cy="700" r="48"/></g>')


# Christmas: snow on the fingertips and the thumb's flat top, with drips. The green-dark pass underneath
# outlines the snow from outside only, so it still reads on light grounds.
def drips(y, x0, x1, step):
    return ''.join(f'<circle cx="{x}" cy="{y + (12 if i % 2 else 0)}" r="{30 if i % 2 else 24}"/>' for i, x in enumerate(range(x0, x1, step)))


snow = f'<rect width="760" height="175"/>{drips(175, 20, 760, 72)}<path d="M850 0H1080V488H850Z"/>{drips(488, 860, 1080, 60)}'
natale = f'<path fill="{JADE}" d="{hand}"/>' + clip(
    f'<g fill="#007a4d" stroke="#007a4d" stroke-width="20">{snow}</g><g fill="{WHITE}">{snow}</g>')

for name, body in [('pride', pride), ('halloween', halloween), ('natale', natale)]:
    svg(f'edition-{name}', '0 0 1080 1080', CLIP + body)

print('\n'.join(sorted(p.name for p in OUT.glob('*.svg'))))
