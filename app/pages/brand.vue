<script setup lang="ts">
import { gsap, MOTION_OK, useMotion } from '~/utils/motion'

const { t } = useI18n()

useSeoMeta({
  title: 'Brand',
  description: () => t('brand.seo.description'),
  ogTitle: 'Brand · HeyAtom',
  ogDescription: () => t('brand.seo.ogDescription'),
})

// Palette from the designer's guide (v04). Two swatches there carry a wrong code: light jade and filed drab were sampled.
const core = [
  { name: 'Jade', hex: '#00A86B' },
  { name: 'Jade dark', hex: '#007A4D' },
  { name: 'Jade light', hex: '#33BF89' },
  { name: 'Racing green', hex: '#00432B' },
  { name: 'Aquamarine', hex: '#76FECC' },
]
const neutral = [
  { name: 'Charcoal', hex: '#1E201E' },
  { name: 'Surface', hex: '#252725' },
  { name: 'White smoke', hex: '#F2F2F2' },
  { name: 'Black', hex: '#020202' },
]
const extended = [
  { name: 'Gold', hex: '#E3C16F' },
  { name: 'Dutch white', hex: '#F4E6C5' },
  { name: 'Dark slate', hex: '#1C5253' },
  { name: 'Tiffany', hex: '#88D6D7' },
  { name: 'Rose taupe', hex: '#7D4E57' },
  { name: 'Old rose', hex: '#D07581' },
  { name: 'Licorice', hex: '#230C0F' },
]
// Text on a swatch: dark on light grounds, light on dark ones.
const onColor = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16))
  return 0.299 * r! + 0.587 * g! + 0.114 * b! > 150 ? '#020202' : '#f2f2f2'
}

const copied = ref('')
let copiedTimer: ReturnType<typeof setTimeout> | undefined
function copy(hex: string) {
  navigator.clipboard?.writeText(hex).then(() => {
    copied.value = hex
    clearTimeout(copiedTimer)
    copiedTimer = setTimeout(() => { copied.value = '' }, 1600)
  }).catch(() => {})
}

const donts = ['stretch', 'rotate', 'recolor', 'effects', 'busy'] as const

const files = computed(() => [
  { label: t('brand.files.mark'), items: ['mark', 'mark-gradient', 'mark-black', 'mark-white'] },
  { label: t('brand.files.logo'), items: ['logo-dark', 'logo-light', 'logo-black', 'logo-white', 'logo-stacked-dark', 'logo-stacked-light', 'logo-stacked-black', 'logo-stacked-white'] },
  { label: t('brand.files.icon'), items: ['icon', 'icon-flat'] },
])

const root = ref<HTMLElement>()
useMotion(root, (mm, el) => {
  const q = gsap.utils.selector(el)
  mm.add(MOTION_OK, () => {
    gsap.from(q('.head h1, .head p'), { y: 24, filter: 'blur(10px)', duration: 1.1, ease: 'expo.out', stagger: 0.12 })
    gsap.from(q('.hero-mark'), { scale: 0.6, rotation: -18, duration: 1.4, ease: 'elastic.out(1, 0.5)', delay: 0.2 })
    for (const s of q('.sec')) {
      gsap.from(gsap.utils.selector(s)('.sec-head, .reveal'), {
        y: 34, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.07,
        scrollTrigger: { trigger: s, start: 'top 80%' },
      })
    }
  })
})
</script>

<template>
  <div ref="root" class="wrap page">
    <header class="head hexed">
      <div>
        <h1>Brand</h1>
        <p>{{ t('brand.intro') }}</p>
        <a class="btn btn--primary" href="#file"><Icon name="download" />{{ t('brand.download') }}</a>
      </div>
      <img class="hero-mark" src="/brand/heyatom-mark-gradient.svg" alt="" width="320" height="320">
    </header>

    <section id="segno" class="sec">
      <div class="sec-head">
        <h2>{{ t('brand.mark.title') }}</h2>
        <p>{{ t('brand.mark.body') }}</p>
      </div>
      <div class="grid-2">
        <div class="panel panel--dark reveal"><img src="/brand/heyatom-mark.svg" alt="HeyAtom" class="mark-lg"></div>
        <div class="panel reveal ladder">
          <div class="sizes" aria-hidden="true">
            <img v-for="s in [96, 64, 48, 32, 24, 16]" :key="s" src="/brand/heyatom-mark.svg" alt="" :width="s" :height="s">
          </div>
          <p>{{ t('brand.mark.small') }}</p>
        </div>
      </div>
    </section>

    <section id="logo" class="sec">
      <div class="sec-head">
        <h2>{{ t('brand.logo.title') }}</h2>
        <p>{{ t('brand.logo.body') }}</p>
      </div>
      <div class="grid-2">
        <figure class="panel panel--dark reveal">
          <img src="/brand/heyatom-logo-dark.svg" alt="HeyAtom" class="logo-h">
          <figcaption class="mono">{{ t('brand.logo.h') }}</figcaption>
        </figure>
        <figure class="panel panel--light reveal">
          <img src="/brand/heyatom-logo-stacked-light.svg" alt="HeyAtom" class="logo-v">
          <figcaption class="mono">{{ t('brand.logo.v') }}</figcaption>
        </figure>
      </div>
      <div class="grid-2 rules">
        <div class="panel reveal">
          <div class="space" aria-hidden="true">
            <div class="space-in">
              <img src="/brand/heyatom-logo-dark.svg" alt="">
              <span class="x x--gap mono">X</span>
            </div>
            <span class="x x--top mono">2X</span>
            <span class="x x--left mono">2X</span>
          </div>
          <h3>{{ t('brand.logo.space') }}</h3>
          <p>{{ t('brand.logo.spaceBody') }}</p>
        </div>
        <div class="panel reveal">
          <div class="mins" aria-hidden="true">
            <img src="/brand/heyatom-logo-dark.svg" alt="" width="96">
            <img src="/brand/heyatom-mark.svg" alt="" width="16" height="16">
          </div>
          <h3>{{ t('brand.logo.min') }}</h3>
          <p>{{ t('brand.logo.minBody') }}</p>
        </div>
      </div>
    </section>

    <section id="icona" class="sec">
      <div class="sec-head">
        <h2>{{ t('brand.icon.title') }}</h2>
        <p>{{ t('brand.icon.body') }}</p>
      </div>
      <div class="icons reveal">
        <img src="/brand/heyatom-icon.svg" alt="HeyAtom" width="160" height="160">
        <img src="/brand/heyatom-icon-flat.svg" alt="HeyAtom" width="160" height="160">
        <img src="/brand/heyatom-icon.svg" alt="" width="64" height="64">
        <img src="/brand/heyatom-icon.svg" alt="" width="40" height="40">
        <div class="tab">
          <span class="tab-pill"><img src="/favicon.svg" alt="" width="16" height="16">HeyAtom</span>
          <span class="mono">{{ t('brand.icon.tab') }}</span>
        </div>
      </div>
    </section>

    <section id="colore" class="sec">
      <div class="sec-head">
        <h2>{{ t('brand.color.title') }}</h2>
        <p>{{ t('brand.color.body') }}</p>
      </div>
      <div v-for="g in [{ k: 'core', l: t('brand.color.core'), c: core }, { k: 'neutral', l: t('brand.color.neutral'), c: neutral }]" :key="g.k" class="swatches reveal" :class="`swatches--${g.k}`">
        <h3 class="mono">{{ g.l }}</h3>
        <button
          v-for="c in g.c" :key="c.hex" type="button" class="sw" :style="{ background: c.hex, color: onColor(c.hex) }"
          :aria-label="`${t('brand.color.copy')} ${c.name} ${c.hex}`" @click="copy(c.hex)"
        >
          <span>{{ c.name }}</span>
          <span class="mono">{{ copied === c.hex ? t('brand.color.copied') : c.hex }}</span>
        </button>
      </div>
      <div class="grid-2 reveal">
        <div class="gradient">
          <h3>{{ t('brand.color.gradient') }}</h3>
          <p>{{ t('brand.color.gradientBody') }}</p>
        </div>
        <div class="swatches swatches--ext">
          <h3 class="mono">{{ t('brand.color.extended') }}</h3>
          <button
            v-for="c in extended" :key="c.hex" type="button" class="sw" :style="{ background: c.hex, color: onColor(c.hex) }"
            :aria-label="`${t('brand.color.copy')} ${c.name} ${c.hex}`" @click="copy(c.hex)"
          >
            <span class="mono">{{ copied === c.hex ? t('brand.color.copied') : c.hex }}</span>
          </button>
          <p class="note">{{ t('brand.color.extendedNote') }}</p>
        </div>
      </div>
      <p class="sr-only" role="status">{{ copied ? `${t('brand.color.copied')} ${copied}` : '' }}</p>
    </section>

    <section id="tipografia" class="sec">
      <div class="sec-head">
        <h2>{{ t('brand.type.title') }}</h2>
        <p>{{ t('brand.type.body') }}</p>
      </div>
      <div class="type">
        <div class="panel reveal">
          <span class="mono">Manrope · {{ t('brand.type.display') }}</span>
          <p class="t-display" lang="en">{{ t('brand.type.sample') }}</p>
        </div>
        <div class="panel reveal">
          <span class="mono">Manrope · {{ t('brand.type.text') }}</span>
          <p class="t-text">{{ t('brand.mark.body') }}</p>
        </div>
        <div class="panel reveal">
          <span class="mono">JetBrains Mono · {{ t('brand.type.mono') }}</span>
          <p class="t-mono mono">#00A86B · 2016—{{ new Date().getFullYear() }} · hey@heyatom.dev</p>
        </div>
      </div>
    </section>

    <section id="forme" class="sec">
      <div class="sec-head">
        <h2>{{ t('brand.shape.title') }}</h2>
        <p>{{ t('brand.shape.body') }}</p>
      </div>
      <div class="pattern reveal">
        <span class="shape shape--pill" aria-hidden="true" />
        <span class="shape shape--circle" aria-hidden="true" />
        <span class="shape shape--square" aria-hidden="true" />
        <p class="pattern-title">HeyAtom</p>
      </div>
    </section>

    <section id="no" class="sec">
      <div class="sec-head">
        <h2>{{ t('brand.dont.title') }}</h2>
      </div>
      <ul class="donts">
        <li v-for="d in donts" :key="d" class="reveal">
          <div class="dont" :class="`dont--${d}`"><img src="/brand/heyatom-mark.svg" alt=""></div>
          <span><Icon name="plus" :size="16" class="x-icon" />{{ t(`brand.dont.${d}`) }}</span>
        </li>
      </ul>
    </section>

    <section id="file" class="sec">
      <div class="sec-head">
        <h2>{{ t('brand.files.title') }}</h2>
        <p>{{ t('brand.files.body') }}</p>
      </div>
      <div class="files">
        <div v-for="g in files" :key="g.label" class="reveal">
          <h3 class="mono">{{ g.label }}</h3>
          <ul>
            <li v-for="f in g.items" :key="f">
              <a :href="`/brand/heyatom-${f}.svg`" download>
                <span class="thumb" :class="{ 'thumb--light': /light|black/.test(f) }"><img :src="`/brand/heyatom-${f}.svg`" alt=""></span>
                <span class="mono">heyatom-{{ f }}.svg</span>
                <Icon name="download" :size="16" class="dl" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page { padding-top: clamp(3rem, 8vh, 5.5rem); padding-bottom: var(--section); }

.head {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  align-items: center;
  gap: 2rem 3rem;
  --hex-inset: -40% -10% -40% 40%;
  --hex-o: 0.15;
}
.head h1 {
  font-size: clamp(3.5rem, 9vw, 6rem);
  font-weight: 800;
  letter-spacing: -0.05em;
  line-height: 0.9;
}
.head p { margin: 1.25rem 0 2rem; color: var(--ink-2); font-size: var(--text-md); max-width: 46ch; }
.hero-mark { justify-self: center; width: min(100%, 320px); }

.sec { padding-top: var(--section); }
.sec-head h2 { max-width: none; }
h3 { font-size: var(--text-lg); margin-bottom: 0.35rem; }

.grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
.grid-2 + .grid-2 { margin-top: 1rem; }

.panel {
  position: relative;
  margin: 0;
  padding: clamp(1.4rem, 3vw, 2.25rem);
  border-radius: var(--r-lg);
  background: var(--surface);
  border: 1px solid var(--hair);
}
.panel p { color: var(--ink-2); font-size: var(--text-label); max-width: 46ch; }
/* Fixed grounds: they show the logo on its approved backgrounds, whatever the site theme. */
.panel--dark, .panel--light {
  display: grid;
  place-items: center;
  min-height: clamp(220px, 30vw, 340px);
}
.panel--dark { background: #1e201e; }
.panel--light { background: #f2f2f2; }
.panel figcaption {
  position: absolute;
  left: 1.25rem;
  bottom: 1rem;
  font-size: var(--text-xs);
  color: #a1a6a2;
}
.panel--light figcaption { color: #5c635e; }
.mark-lg { width: min(60%, 220px); }
.logo-h { width: min(80%, 380px); }
.logo-v { width: min(55%, 220px); }

.ladder { display: grid; align-content: space-between; gap: 2rem; }
.sizes { display: flex; align-items: end; gap: clamp(0.75rem, 2vw, 1.5rem); flex-wrap: wrap; }

/* Clear space: the lockup box is 2280 units tall and X is 720, so 2X of padding is 0.63 of its height. */
.space {
  --h: clamp(2.2rem, 5vw, 3rem);
  position: relative;
  width: max-content;
  max-width: 100%;
  margin-bottom: 1.5rem;
  padding: calc(var(--h) * 0.63);
  border: 1px dashed var(--hair-strong);
  border-radius: 4px;
  background: repeating-linear-gradient(45deg, rgb(var(--green-rgb) / 0.08) 0 6px, transparent 6px 12px);
}
.space-in { position: relative; background: var(--surface); outline: 1px dashed var(--green); }
.space-in img { height: var(--h); width: auto; }
.x { position: absolute; font-size: 0.7rem; color: var(--green-light); }
.x--top { top: 0.3rem; left: 50%; translate: -50% 0; }
.x--left { left: 0.35rem; top: 50%; translate: 0 -50%; }
/* Gap between mark and name: mark ends at ~17.5% of the lockup width. */
.x--gap { left: 20%; bottom: -1.3rem; }
.mins { display: flex; align-items: center; gap: 2rem; min-height: calc(clamp(2.2rem, 5vw, 3rem) * 7 / 3 + 1.5rem); }

.icons {
  display: flex;
  align-items: end;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.icons > img { border-radius: 22%; box-shadow: 0 18px 40px -18px rgb(0 0 0 / calc(0.8 * var(--shade))); }
.tab { display: grid; gap: 0.5rem; margin-left: auto; }
.tab .mono { font-size: var(--text-xs); color: var(--ink-3); }
.tab-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: 12rem;
  padding: 0.55rem 0.8rem;
  border-radius: var(--r-sm) var(--r-sm) 0 0;
  background: var(--surface-2);
  font-size: var(--text-sm);
  font-weight: 600;
}

.swatches { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 0.5rem; margin-bottom: 1.5rem; }
.swatches--neutral { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.swatches h3 { grid-column: 1 / -1; font-size: var(--text-xs); font-weight: 400; color: var(--ink-3); margin: 0; }
.sw {
  display: grid;
  align-content: end;
  gap: 0.15rem;
  min-height: 8.5rem;
  padding: 0.9rem;
  border: 1px solid rgb(var(--green-rgb) / 0.12);
  border-radius: var(--r-lg);
  font: 700 var(--text-label) / 1.2 var(--sans);
  text-align: left;
  cursor: pointer;
  transition: translate 0.35s var(--ease-out);
}
.sw:hover { translate: 0 -4px; }
.sw .mono { font-size: var(--text-xs); font-weight: 400; opacity: 0.85; }
.swatches--core .sw:first-of-type { grid-row: span 1; }
.swatches--ext { grid-template-columns: repeat(7, minmax(0, 1fr)); margin: 0; align-content: start; }
.swatches--ext .sw { min-height: 5.5rem; padding: 0.5rem; border-radius: var(--r-sm); }
.swatches--ext .sw .mono { font-size: 0.62rem; }
.note { grid-column: 1 / -1; color: var(--ink-3); font-size: var(--text-sm); }

.gradient {
  display: grid;
  align-content: end;
  min-height: 15rem;
  padding: 1.5rem;
  border-radius: var(--r-lg);
  background: linear-gradient(45deg, rgb(0 67 43 / 0.7), #00a86b 65%);
  color: #f2f2f2;
}
.gradient p { font-size: var(--text-sm); max-width: 40ch; opacity: 0.9; }

.type { display: grid; gap: 1rem; }
.type .mono { font-size: var(--text-xs); color: var(--ink-3); }
.type p { margin-top: 0.75rem; font-size: var(--text-md); max-width: 60ch; }
.type .t-display {
  font-size: clamp(2.4rem, 7vw, 5rem);
  font-weight: 800;
  letter-spacing: -0.045em;
  line-height: 1;
  color: var(--ink);
  max-width: none;
}
.type .t-mono { color: var(--green-light); }

.pattern {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  min-height: 18rem;
  padding: clamp(1.5rem, 4vw, 3rem);
  border-radius: var(--r-lg);
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--hair);
  isolation: isolate;
}
.pattern::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: url('/assets/hex.svg') right center / 70% auto no-repeat;
  opacity: 0.18;
}
.shape { display: block; background: var(--green); }
.shape--pill { width: 7rem; height: 3rem; border-radius: 999px; }
.shape--circle { width: 3rem; aspect-ratio: 1; border-radius: 50%; background: var(--green-dark); }
.shape--square { width: 3rem; aspect-ratio: 1; border-radius: var(--r-lg); background: var(--green-light); }
.pattern-title {
  margin-left: auto;
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 800;
  letter-spacing: -0.05em;
}

.donts { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 1rem; }
.donts li { display: grid; gap: 0.6rem; font-size: var(--text-sm); color: var(--ink-2); }
.donts li > span { display: inline-flex; align-items: center; gap: 0.35rem; }
.x-icon { rotate: 45deg; color: #e5484d; }
.dont {
  display: grid;
  place-items: center;
  aspect-ratio: 1;
  border-radius: var(--r-lg);
  background: var(--surface);
  border: 1px solid var(--hair);
  overflow: hidden;
}
.dont img { width: 50%; }
.dont--stretch img { transform: scaleX(1.5) scaleY(0.75); }
.dont--rotate img { rotate: -24deg; }
.dont--recolor img { filter: hue-rotate(150deg) saturate(1.4); }
.dont--effects img { filter: drop-shadow(6px 8px 0 #e3c16f) drop-shadow(0 0 14px #76fecc); }
.dont--busy { background: #33bf89 url('/assets/hex.svg') center / 180% auto; }

.files { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.5rem 2rem; }
.files h3 { font-size: var(--text-xs); font-weight: 400; color: var(--ink-3); margin-bottom: 0.6rem; }
.files ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.35rem; }
.files a {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.45rem;
  border-radius: var(--r-sm);
  color: var(--ink-2);
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease;
}
.files a:hover { background: rgb(var(--green-rgb) / 0.08); color: var(--ink); }
.files .mono { font-size: var(--text-xs); overflow-wrap: anywhere; }
.thumb {
  display: grid;
  place-items: center;
  flex: none;
  width: 3.25rem;
  height: 2.25rem;
  padding: 0.3rem;
  border-radius: 6px;
  background: #1e201e;
}
.thumb--light { background: #f2f2f2; }
.thumb img { max-height: 100%; width: auto; }
.dl { margin-left: auto; flex: none; opacity: 0.5; }
.files a:hover .dl { opacity: 1; }

@media (max-width: 900px) {
  .head, .grid-2, .files { grid-template-columns: minmax(0, 1fr); }
  .hero-mark { width: 160px; justify-self: start; }
  .swatches--core { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .swatches--neutral { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .swatches--ext { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .donts { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .tab { margin-left: 0; }
  .pattern { flex-wrap: wrap; }
}
</style>
