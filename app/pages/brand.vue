<script setup lang="ts">
import { editions, editionSrc } from '~/data/editions'
import { gsap, MOTION_OK, useMotion } from '~/utils/motion'

const { t, tm, rt } = useI18n()

useSeoMeta({
  title: 'Brand',
  description: () => t('brand.seo.description'),
  ogTitle: 'Brand · HeyAtom',
  ogDescription: () => t('brand.seo.ogDescription'),
})

// Same values as main.css: the swatches show the tokens on their own grounds, whatever theme the visitor is on.
const brand = [
  { name: 'green', hex: '#00A86B', role: 'green' },
  { name: 'green-dark', hex: '#007A4D', role: 'greenDark' },
  { name: 'green-light', hex: '#33BF89', role: 'greenLight' },
]
const themes = [
  {
    key: 'dark', bg: '#1e201e', ink: '#eef1ef', hair: 'rgba(0, 168, 107, 0.16)',
    tokens: [
      { name: 'bg', hex: '#1E201E', role: 'bg' },
      { name: 'surface', hex: '#252725', role: 'surface' },
      { name: 'surface-2', hex: '#2E312F', role: 'surface2' },
      { name: 'ink', hex: '#EEF1EF', role: 'ink' },
      { name: 'ink-2', hex: '#D1D5D2', role: 'ink2' },
      { name: 'ink-3', hex: '#A1A6A2', role: 'ink3' },
      { name: 'green-light', hex: '#33BF89', role: 'greenLight' },
      { name: 'on-green', hex: '#04140D', role: 'onGreen' },
    ],
  },
  {
    key: 'light', bg: '#f3f5f3', ink: '#151816', hair: 'rgba(0, 122, 77, 0.18)',
    tokens: [
      { name: 'bg', hex: '#F3F5F3', role: 'bg' },
      { name: 'surface', hex: '#FFFFFF', role: 'surface' },
      { name: 'surface-2', hex: '#EAEEEB', role: 'surface2' },
      { name: 'ink', hex: '#151816', role: 'ink' },
      { name: 'ink-2', hex: '#3A403C', role: 'ink2' },
      { name: 'ink-3', hex: '#5C635E', role: 'ink3' },
      { name: 'green-light', hex: '#007A4D', role: 'greenLight' },
      { name: 'on-green', hex: '#04140D', role: 'onGreen' },
    ],
  },
]

// Type scale from DESIGN.md; the sample renders with the spec it names.
const scale = [
  { key: 'display', spec: '800 · clamp(2.7–5rem) · -0.04em', style: 'font-size: clamp(2.2rem, 5.8vw, 5rem); font-weight: 800; letter-spacing: -0.04em; line-height: 1.02' },
  { key: 'headline', spec: '700 · clamp(2–3.25rem) · -0.03em', style: 'font-size: clamp(1.8rem, 4.2vw, 3.25rem); font-weight: 700; letter-spacing: -0.03em; line-height: 1.08' },
  { key: 'title', spec: '700 · clamp(1.25–1.9rem) · -0.03em', style: 'font-size: clamp(1.25rem, 2.3vw, 1.9rem); font-weight: 700; letter-spacing: -0.03em; line-height: 1.15' },
  { key: 'lead', spec: '450 · clamp(1.06–1.2rem) · 1.6', style: 'font-size: clamp(1.06rem, 1.4vw, 1.2rem); font-weight: 450; line-height: 1.6' },
  { key: 'body', spec: '450 · 1rem · 1.6', style: 'font-size: 1rem; font-weight: 450; line-height: 1.6' },
  { key: 'label', spec: '600 · 0.94rem · 1', style: 'font-size: 0.94rem; font-weight: 600; line-height: 1' },
  { key: 'mono', spec: 'JetBrains Mono 400 · 0.8rem · tnum', style: 'font-family: var(--mono); font-size: 0.8rem; font-variant-numeric: tabular-nums', mono: true },
]

// vue-i18n hands arrays back as compiled messages: rt() turns each one into text.
const list = (key: string) => (tm(key) as unknown[]).map(i => Array.isArray(i) ? i.map(x => rt(x)) : rt(i as never))

const copied = ref('')
let copiedTimer: ReturnType<typeof setTimeout> | undefined
function copy(hex: string) {
  navigator.clipboard?.writeText(hex).then(() => {
    copied.value = hex
    clearTimeout(copiedTimer)
    copiedTimer = setTimeout(() => { copied.value = '' }, 1600)
  }).catch(() => {})
}

// The icon is the hand alone; each colour shown on the ground it is meant for.
const iconVariants = [
  { file: 'mark', ground: '#1e201e' },
  { file: 'mark-green-light', ground: '#1e201e' },
  { file: 'mark-green-dark', ground: '#f3f5f3' },
  { file: 'mark-white', ground: '#00a86b' },
  { file: 'mark-black', ground: '#f3f5f3' },
]

// The edition running today, if any, gets a "live" badge.
const mark = useMark()

const donts = ['stretch', 'rotate', 'recolor', 'effects', 'busy'] as const

// Each file previewed on the ground it is meant for, same grounds as the icon set.
const logoGrounds = { dark: '#1e201e', light: '#f3f5f3', black: '#f3f5f3', white: '#00a86b' }
const logos = (prefix: string) => Object.entries(logoGrounds).map(([k, ground]) => ({ file: `${prefix}-${k}`, ground, label: t(`brand.files.variants.${k}`) }))
const files = computed(() => [
  { key: 'icon', label: t('brand.files.icon'), items: iconVariants.map(v => ({ ...v, label: t(`brand.icon.variants.${v.file}`) })) },
  { key: 'h', label: t('brand.files.logoH'), items: logos('logo') },
  { key: 'v', label: t('brand.files.logoV'), items: logos('logo-stacked') },
  { key: 'ed', label: t('brand.files.editions'), items: editions.map(e => ({ file: `edition-${e.id}`, ground: '#1e201e', label: t(`brand.editions.${e.id}.name`) })) },
])

const root = ref<HTMLElement>()
useMotion(root, (mm, el) => {
  const q = gsap.utils.selector(el)
  mm.add(MOTION_OK, () => {
    // Page head is the LCP: position and blur only.
    gsap.from(q('.head h1, .head p'), { y: 24, filter: 'blur(10px)', duration: 1.1, ease: 'expo.out', stagger: 0.12 })
    gsap.from(q('.hero-mark'), { scale: 0.6, rotation: -30, duration: 1.2, ease: 'back.out(1.7)', delay: 0.2 })
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
      <span class="bubble bubble--hero hero-mark" aria-hidden="true"><img src="/brand/heyatom-mark.svg" alt=""></span>
    </header>

    <section id="segno" class="sec">
      <div class="sec-head">
        <h2>{{ t('brand.mark.title') }}</h2>
        <p>{{ t('brand.mark.body') }}</p>
      </div>
      <div class="grid-3">
        <figure class="panel panel--dark reveal">
          <img src="/brand/heyatom-mark.svg" alt="HeyAtom" class="mark-lg">
          <figcaption class="mono">{{ t('brand.mark.alone') }}</figcaption>
        </figure>
        <figure class="panel panel--center reveal">
          <span class="bubble" aria-hidden="true"><img src="/brand/heyatom-mark.svg" alt=""></span>
          <figcaption class="mono">{{ t('brand.mark.bubble') }}</figcaption>
        </figure>
        <div class="panel reveal ladder">
          <div class="sizes" aria-hidden="true">
            <img v-for="s in [64, 48, 32, 24, 16]" :key="s" src="/brand/heyatom-mark.svg" alt="" :width="s" :height="s">
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
              <img src="/brand/heyatom-logo-dark.svg" alt="" class="on-dark">
              <img src="/brand/heyatom-logo-light.svg" alt="" class="on-light">
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
            <img src="/brand/heyatom-logo-dark.svg" alt="" width="96" class="on-dark">
            <img src="/brand/heyatom-logo-light.svg" alt="" width="96" class="on-light">
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
      <ul class="icon-set">
        <li v-for="v in iconVariants" :key="v.file" class="reveal">
          <a :href="`/brand/heyatom-${v.file}.svg`" download>
            <span class="ground" :style="{ background: v.ground }">
              <img :src="`/brand/heyatom-${v.file}.svg`" alt="" width="96" height="96">
              <Icon name="download" :size="16" class="dl" />
            </span>
            <span class="mono">{{ t(`brand.icon.variants.${v.file}`) }}</span>
          </a>
        </li>
      </ul>
      <div class="icons reveal">
        <img v-for="s in [64, 40, 24, 16]" :key="s" src="/brand/heyatom-mark.svg" alt="" :width="s" :height="s">
        <div class="tab">
          <span class="tab-pill"><img src="/favicon.svg" alt="" width="16" height="16">HeyAtom</span>
          <span class="mono">{{ t('brand.icon.tab') }}</span>
        </div>
      </div>
    </section>

    <section id="edizioni" class="sec">
      <div class="sec-head">
        <h2>{{ t('brand.editions.title') }}</h2>
        <p>{{ t('brand.editions.body') }}</p>
      </div>
      <ul class="editions">
        <li v-for="e in editions" :key="e.id" class="reveal">
          <a :href="editionSrc(e.id)" download class="edition">
            <span class="ground ground--ed">
              <img :src="editionSrc(e.id)" alt="" width="120" height="120">
              <span v-if="mark === editionSrc(e.id)" class="live mono"><span class="dot" />{{ t('brand.editions.live') }}</span>
              <Icon name="download" :size="16" class="dl" />
            </span>
            <span class="ed-meta">
              <strong>{{ t(`brand.editions.${e.id}.name`) }}</strong>
              <span class="mono">{{ t(`brand.editions.${e.id}.when`) }}</span>
            </span>
          </a>
        </li>
      </ul>
    </section>

    <section id="colore" class="sec">
      <div class="sec-head">
        <h2>{{ t('brand.color.title') }}</h2>
        <p>{{ t('brand.color.body') }}</p>
      </div>
      <div class="brand-sw reveal">
        <button
          v-for="c in brand" :key="c.hex" type="button" class="sw" :style="{ background: c.hex }"
          :aria-label="`${t('brand.color.copy')} ${c.name} ${c.hex}`" @click="copy(c.hex)"
        >
          <span class="sw-name">{{ c.name }}</span>
          <span class="mono">{{ copied === c.hex ? t('brand.color.copied') : c.hex }}</span>
          <span class="sw-role">{{ t(`brand.color.roles.${c.role}`) }}</span>
        </button>
      </div>
      <div class="grid-2">
        <div v-for="th in themes" :key="th.key" class="theme reveal" :style="{ background: th.bg, color: th.ink, '--th-hair': th.hair }">
          <h3 class="mono">{{ t(`brand.color.${th.key}`) }}</h3>
          <ul>
            <li v-for="c in th.tokens" :key="c.name">
              <button type="button" :aria-label="`${t('brand.color.copy')} ${c.name} ${c.hex}`" @click="copy(c.hex)">
                <span class="dot" :style="{ background: c.hex }" />
                <span class="tk">{{ c.name }}</span>
                <span class="role">{{ t(`brand.color.roles.${c.role}`) }}</span>
                <span class="mono">{{ copied === c.hex ? t('brand.color.copied') : c.hex }}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <ul class="rules-list">
        <li v-for="[h, b] in list('brand.color.rules')" :key="h" class="reveal"><strong>{{ h }}</strong><span>{{ b }}</span></li>
      </ul>
      <p class="sr-only" role="status">{{ copied ? `${t('brand.color.copied')} ${copied}` : '' }}</p>
    </section>

    <section id="tipografia" class="sec">
      <div class="sec-head">
        <h2>{{ t('brand.type.title') }}</h2>
        <p>{{ t('brand.type.body') }}</p>
      </div>
      <ul class="scale">
        <li v-for="s in scale" :key="s.key" class="reveal">
          <span class="spec"><strong>{{ t(`brand.type.scale.${s.key}`) }}</strong><span class="mono">{{ s.spec }}</span></span>
          <span class="sample" :style="s.style" :lang="s.mono ? undefined : 'en'">{{ s.mono ? '2016 → 2026 · Nuxt · NestJS' : t('brand.type.sample') }}</span>
        </li>
      </ul>
      <ul class="rules-list">
        <li v-for="[h, b] in list('brand.type.rules')" :key="h" class="reveal"><strong>{{ h }}</strong><span>{{ b }}</span></li>
      </ul>
    </section>

    <section id="forme" class="sec">
      <div class="sec-head">
        <h2>{{ t('brand.shape.title') }}</h2>
        <p>{{ t('brand.shape.body') }}</p>
      </div>
      <div class="shapes">
        <div class="panel reveal shape-cell"><span class="shape shape--r10" /><span class="mono">{{ t('brand.shape.r10') }}</span></div>
        <div class="panel reveal shape-cell"><span class="shape shape--r14" /><span class="mono">{{ t('brand.shape.r14') }}</span></div>
        <div class="panel reveal shape-cell"><span class="shape-dots"><span /><span /><span /></span><span class="mono">{{ t('brand.shape.circle') }}</span></div>
        <div class="panel reveal shape-cell hexed hex-cell"><span class="shape shape--hex" /><span class="mono">{{ t('brand.shape.hex') }}</span></div>
      </div>
      <div class="depth">
        <div class="depth-cell reveal">
          <span class="lift" />
          <h3>{{ t('brand.shape.shadow') }}</h3>
          <p>{{ t('brand.shape.shadowBody') }}</p>
        </div>
        <div class="depth-cell reveal">
          <span class="btn btn--primary" aria-hidden="true">{{ t('brand.ui.primary') }}</span>
          <h3>{{ t('brand.shape.glow') }}</h3>
          <p>{{ t('brand.shape.glowBody') }}</p>
        </div>
        <div class="depth-cell reveal">
          <span class="glass" aria-hidden="true"><img src="/favicon.svg" alt="" width="22" height="22">HeyAtom</span>
          <h3>{{ t('brand.shape.glass') }}</h3>
          <p>{{ t('brand.shape.glassBody') }}</p>
        </div>
      </div>
    </section>

    <section id="componenti" class="sec">
      <div class="sec-head">
        <h2>{{ t('brand.ui.title') }}</h2>
        <p>{{ t('brand.ui.body') }}</p>
      </div>
      <div class="panel ui reveal">
        <a class="btn btn--primary" href="mailto:hey@heyatom.dev"><Icon name="mail" />{{ t('brand.ui.primary') }}</a>
        <NuxtLink class="btn btn--ghost" :to="$localePath('/works')">{{ t('brand.ui.ghost') }}</NuxtLink>
        <NuxtLink class="arrow" :to="$localePath('/works')">{{ t('brand.ui.link') }}<Icon name="arrow-right" :size="16" /></NuxtLink>
        <span class="chips"><span class="chip mono">Nuxt</span><span class="chip mono">NestJS</span><span class="chip mono">Prisma</span></span>
        <span class="mono meta">{{ t('brand.ui.meta') }}</span>
      </div>
    </section>

    <section id="movimento" class="sec">
      <div class="sec-head">
        <h2>{{ t('brand.motion.title') }}</h2>
        <p>{{ t('brand.motion.body') }}</p>
      </div>
      <div class="motion">
        <ul class="rules-list rules-list--1">
          <li v-for="[h, b] in list('brand.motion.items')" :key="h" class="reveal"><strong class="mono">{{ h }}</strong><span>{{ b }}</span></li>
        </ul>
        <div class="panel wave reveal">
          <span class="bubble bubble--sm"><img src="/brand/heyatom-mark.svg" alt=""></span>
          <span class="mono">{{ t('brand.motion.try') }}</span>
        </div>
      </div>
    </section>

    <section id="voce" class="sec">
      <div class="sec-head">
        <h2>{{ t('brand.voice.title') }}</h2>
        <p>{{ t('brand.voice.body') }}</p>
      </div>
      <ul class="voice">
        <li v-for="[yes, no] in list('brand.voice.pairs')" :key="yes" class="reveal">
          <span class="yes"><span class="mono">{{ t('brand.voice.yes') }}</span>{{ yes }}</span>
          <span class="no"><span class="mono">{{ t('brand.voice.no') }}</span><s>{{ no }}</s></span>
        </li>
      </ul>
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
      <ul class="dont-list">
        <li v-for="d in list('brand.dont.list')" :key="String(d)" class="reveal"><Icon name="plus" :size="16" class="x-icon" />{{ d }}</li>
      </ul>
    </section>

    <section id="file" class="sec">
      <div class="sec-head">
        <h2>{{ t('brand.files.title') }}</h2>
        <p>{{ t('brand.files.body') }}</p>
      </div>
      <div v-for="g in files" :key="g.key" class="files" :class="`files--${g.key}`">
        <h3 class="mono">{{ g.label }}</h3>
        <ul>
          <li v-for="f in g.items" :key="f.file" class="reveal">
            <a :href="`/brand/heyatom-${f.file}.svg`" download class="file" :title="`heyatom-${f.file}.svg`">
              <span class="preview" :style="{ background: f.ground }"><img :src="`/brand/heyatom-${f.file}.svg`" alt=""></span>
              <span class="file-meta">
                <span class="file-name">{{ f.label }}</span>
                <span class="file-dl mono"><Icon name="download" :size="14" />SVG</span>
              </span>
            </a>
          </li>
        </ul>
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

.sec { padding-top: var(--section); }
h3 { font-size: var(--text-lg); margin-bottom: 0.35rem; }

.grid-2, .grid-3 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
.grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
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
/* Fixed grounds: the mark on its approved backgrounds, whatever the site theme. */
.panel--dark, .panel--light, .panel--center {
  display: grid;
  place-items: center;
  min-height: clamp(220px, 30vw, 340px);
}
.panel--dark { background: #1e201e; }
.panel--light { background: #f3f5f3; }
.panel figcaption {
  position: absolute;
  left: 1.25rem;
  bottom: 1rem;
  font-size: var(--text-xs);
  color: #a1a6a2;
}
.panel--light figcaption { color: #5c635e; }
.panel--center figcaption { color: var(--ink-3); }
.mark-lg { width: min(55%, 180px); }
.logo-h { width: min(80%, 380px); }
.logo-v { width: min(55%, 220px); }

/* The site's speech bubble (orb, medal): a circle with one corner at 10%. */
.bubble {
  display: grid;
  place-items: center;
  width: min(62%, 200px);
  aspect-ratio: 1;
  border-radius: 50% 50% 10% 50%;
  background: radial-gradient(circle at 30% 25%, var(--glass), var(--surface) 60%, var(--surface-3));
  border: 1px solid var(--hair-strong);
  box-shadow: inset 0 2px 30px rgb(var(--green-rgb) / 0.14), 0 40px 80px -20px rgb(0 0 0 / calc(0.6 * var(--shade)));
}
.bubble img { width: 52%; filter: drop-shadow(0 8px 18px rgb(var(--green-rgb) / 0.55)); }
.bubble--hero { justify-self: center; width: min(100%, 300px); }
.bubble--sm { width: 9rem; }

.ladder { display: grid; align-content: space-between; gap: 2rem; }
.sizes { display: flex; align-items: end; gap: clamp(0.75rem, 2vw, 1.25rem); flex-wrap: wrap; }

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
/* Gap between mark and name: the mark ends at ~17.5% of the lockup width. */
.x--gap { left: 20%; bottom: -1.3rem; }
.mins { display: flex; align-items: center; gap: 2rem; min-height: calc(clamp(2.2rem, 5vw, 3rem) * 2.26 + 1.5rem); }
/* Lockup ink follows the theme: light ink on dark, dark ink on light. */
.on-light { display: none; }
:root[data-theme='light'] .on-light { display: block; }
:root[data-theme='light'] .on-dark { display: none; }

.icon-set {
  list-style: none;
  margin: 0 0 2rem;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1.5rem 1rem;
}
.icon-set a { display: grid; gap: 0.75rem; color: inherit; text-decoration: none; }
.ground {
  display: grid;
  place-items: center;
  aspect-ratio: 1;
  border-radius: var(--r-lg);
  border: 1px solid var(--hair);
}
.ground { position: relative; transition: translate 0.35s var(--ease-out), border-color 0.2s ease; }
.ground img { width: 50%; height: auto; }
/* Download cue: hidden until hover or keyboard focus. */
.ground .dl {
  position: absolute;
  right: 0.6rem;
  bottom: 0.6rem;
  margin: 0;
  padding: 0.3rem;
  box-sizing: content-box;
  border-radius: var(--r-sm);
  background: var(--glass);
  color: var(--ink);
  opacity: 0;
  transition: opacity 0.2s ease;
}
.icon-set a:hover .ground, .icon-set a:focus-visible .ground { translate: 0 -4px; border-color: var(--green); }
.icon-set a:hover .dl, .icon-set a:focus-visible .dl { opacity: 1; }

.editions { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; }
.edition { display: grid; gap: 0.75rem; color: inherit; text-decoration: none; }
.ground--ed { aspect-ratio: 4 / 3; background: #1e201e; }
.ground--ed img { width: 34%; }
.edition:hover .ground, .edition:focus-visible .ground { translate: 0 -4px; border-color: var(--green); }
.edition:hover .dl, .edition:focus-visible .dl { opacity: 1; }
.ed-meta { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; }
.ed-meta strong { font-size: var(--text-lg); letter-spacing: -0.02em; }
.ed-meta .mono { font-size: var(--text-xs); color: var(--ink-3); }
.live {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.55rem;
  border-radius: var(--r-sm);
  border: 1px solid rgba(0, 168, 107, 0.38);
  background: rgba(0, 168, 107, 0.12);
  color: #33bf89;
  font-size: var(--text-xs);
}
.live .dot { width: 0.45rem; aspect-ratio: 1; border-radius: 50%; background: var(--green); box-shadow: 0 0 10px var(--green); }
.icon-set a:hover .mono { color: var(--green-light); }
@media (hover: none) { .ground .dl { opacity: 1; } }
.icon-set .mono { font-size: var(--text-xs); color: var(--ink-3); }
.icons { display: flex; align-items: end; flex-wrap: wrap; gap: 1.5rem; }
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

.brand-sw { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 0.5rem; margin-bottom: 1rem; }
.sw {
  display: grid;
  align-content: end;
  gap: 0.15rem;
  min-height: 11rem;
  padding: 1.1rem;
  border: 0;
  border-radius: var(--r-lg);
  color: var(--on-green);
  font: 700 var(--text-lg) / 1.2 var(--sans);
  text-align: left;
  cursor: pointer;
  transition: translate 0.35s var(--ease-out);
}
.sw:hover { translate: 0 -4px; }
.sw .mono { font-size: var(--text-xs); font-weight: 400; }
.sw-role { font-size: var(--text-sm); font-weight: 500; opacity: 0.8; }

.theme { padding: clamp(1.2rem, 2.5vw, 1.75rem); border-radius: var(--r-lg); border: 1px solid var(--th-hair); }
.theme h3 { font-size: var(--text-xs); font-weight: 400; opacity: 0.7; margin-bottom: 0.5rem; }
.theme ul { list-style: none; margin: 0; padding: 0; }
.theme li + li { border-top: 1px solid var(--th-hair); }
.theme button {
  display: grid;
  grid-template-columns: 1.5rem 6.5rem minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.6rem 0;
  border: 0;
  background: none;
  color: inherit;
  font: 600 var(--text-sm) / 1.3 var(--sans);
  text-align: left;
  cursor: pointer;
}
.theme .dot { width: 1.5rem; aspect-ratio: 1; border-radius: 50%; border: 1px solid var(--th-hair); }
.theme .role { font-weight: 450; opacity: 0.75; }
.theme .mono { font-size: var(--text-xs); opacity: 0.8; }
.theme button:hover .tk { color: var(--green); }

.rules-list {
  list-style: none;
  margin: 1.5rem 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 2.5rem;
}
.rules-list li { display: grid; gap: 0.2rem; padding: 1rem 0; border-top: 1px solid var(--hair); }
.rules-list strong { font-size: var(--text-md); letter-spacing: -0.02em; }
.rules-list strong.mono { font-size: var(--text-sm); color: var(--green-light); }
.rules-list span { color: var(--ink-2); font-size: var(--text-label); max-width: 52ch; }
.rules-list--1 { grid-template-columns: minmax(0, 1fr); margin: 0; }

.scale { list-style: none; margin: 0; padding: 0; }
.scale li {
  display: grid;
  grid-template-columns: 15rem minmax(0, 1fr);
  align-items: baseline;
  gap: 0.5rem 2rem;
  padding: 1.1rem 0;
  border-top: 1px solid var(--hair);
}
.spec { display: grid; gap: 0.15rem; }
.spec strong { font-size: var(--text-sm); color: var(--green-light); }
.spec .mono { font-size: var(--text-xs); color: var(--ink-3); }
.sample { min-width: 0; overflow-wrap: anywhere; }

.shapes { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1rem; }
.shape-cell { display: grid; gap: 1.25rem; align-content: space-between; min-height: 11rem; overflow: hidden; }
.shape-cell .mono { font-size: var(--text-xs); color: var(--ink-3); }
.shape { display: block; width: 4.5rem; aspect-ratio: 1; background: var(--green); }
.shape--r10 { border-radius: var(--r-sm); }
.shape--r14 { width: 7rem; aspect-ratio: 1.6; border-radius: var(--r-lg); background: var(--surface-2); border: 1px solid var(--hair-strong); }
.shape-dots { display: flex; gap: 0.75rem; align-items: center; }
.shape-dots span { width: 0.6rem; aspect-ratio: 1; border-radius: 50%; background: var(--green); box-shadow: 0 0 10px var(--green); }
.shape-dots span:last-child { width: 2.5rem; background: none; border: 1px solid var(--hair-strong); box-shadow: none; }
.shape--hex { width: 2.2rem; aspect-ratio: 1.155; clip-path: polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%); }
.hex-cell { --hex-inset: 0; --hex-o: 0.18; --hex-at: 80% 30%; }

.depth { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; margin-top: 1rem; }
.depth-cell { display: grid; align-content: end; gap: 0.2rem; }
.depth-cell > :first-child { justify-self: start; margin-bottom: 1.5rem; }
.depth-cell p { color: var(--ink-2); font-size: var(--text-label); }
.lift {
  display: block;
  width: 9rem;
  aspect-ratio: 16 / 9;
  border-radius: var(--r-sm);
  background: var(--surface);
  border: 1px solid var(--hair-strong);
  box-shadow: 0 30px 60px -20px rgb(0 0 0 / calc(0.75 * var(--shade))), 0 8px 18px -8px rgb(0 0 0 / calc(0.5 * var(--shade)));
}
.glass {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem 0.6rem 0.7rem;
  border-radius: var(--r-sm);
  background: var(--glass);
  border: 1px solid var(--hair);
  backdrop-filter: blur(18px) saturate(1.3);
  -webkit-backdrop-filter: blur(18px) saturate(1.3);
  box-shadow: 0 10px 30px -12px rgb(0 0 0 / calc(0.6 * var(--shade)));
  font-weight: 800;
  letter-spacing: -0.03em;
}

.ui { display: flex; flex-wrap: wrap; align-items: center; gap: 1.25rem 1.5rem; }
.arrow { display: inline-flex; align-items: center; gap: 0.4rem; font-weight: 600; text-decoration: none; }
.arrow svg { transition: transform 0.35s var(--ease-out); }
.arrow:hover svg { transform: translateX(4px); }
.chips { display: inline-flex; gap: 0.4rem; }
.chip {
  padding: 0.28rem 0.6rem;
  border-radius: var(--r-sm);
  background: var(--surface-2);
  border: 1px solid var(--hair);
  font-size: var(--text-xs);
}
.meta { font-size: var(--text-xs); color: var(--ink-3); }

.motion { display: grid; grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr); gap: 1rem 2.5rem; }
.wave { display: grid; place-items: center; gap: 1rem; }
.wave .mono { font-size: var(--text-xs); color: var(--ink-3); }
.wave img { transition: rotate 0.6s var(--ease-out); transform-origin: 50% 90%; }
.wave:hover img { rotate: -14deg; }

.voice { list-style: none; margin: 0; padding: 0; }
.voice li {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem 2rem;
  padding: 1rem 0;
  border-top: 1px solid var(--hair);
}
.voice li > span { display: grid; gap: 0.2rem; }
.voice .mono { font-size: var(--text-xs); }
.yes { font-size: var(--text-md); font-weight: 600; }
.yes .mono { color: var(--green-light); }
.no { color: var(--ink-3); }
.no s { text-decoration-thickness: 1px; }

.donts { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 1rem; }
.donts li { display: grid; gap: 0.6rem; font-size: var(--text-sm); color: var(--ink-2); }
.donts li > span { display: inline-flex; align-items: center; gap: 0.35rem; }
/* The one non-token colour on the page: the "no" mark has to read as wrong, not as brand. */
.x-icon { rotate: 45deg; color: #e5484d; flex: none; }
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
.dont--effects img { filter: drop-shadow(6px 8px 0 var(--ink-3)) drop-shadow(0 0 14px var(--green-light)); }
.dont--busy { background: var(--green-light) url('/assets/hex.svg') center / 180% auto; }
.dont-list {
  list-style: none;
  margin: 1.5rem 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 2.5rem;
}
.dont-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 0;
  border-top: 1px solid var(--hair);
  color: var(--ink-2);
  font-size: var(--text-label);
}

.files + .files { margin-top: 2.25rem; }
.files h3 { font-size: var(--text-xs); font-weight: 400; color: var(--ink-3); margin-bottom: 0.75rem; }
.files ul { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1rem; }
.files--icon ul { grid-template-columns: repeat(5, minmax(0, 1fr)); }
.files--ed ul { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.files--ed .preview img { max-height: 3.25rem; }
.file {
  display: grid;
  height: 100%;
  border-radius: var(--r-lg);
  background: var(--surface);
  border: 1px solid var(--hair);
  overflow: hidden;
  color: var(--ink);
  text-decoration: none;
  transition: translate 0.35s var(--ease-out), border-color 0.2s ease;
}
.file:hover, .file:focus-visible { translate: 0 -4px; border-color: var(--green); color: var(--ink); }
.preview { display: grid; place-items: center; aspect-ratio: 4 / 3; padding: 1.25rem; }
.preview img { width: 80%; max-height: 3.5rem; object-fit: contain; }
.files--v .preview img { max-height: 5.5rem; }
.files--icon .preview img { max-height: 3.25rem; }
.file-meta { display: flex; align-items: center; gap: 0.75rem; padding: 0.8rem 0.9rem; border-top: 1px solid var(--hair); }
.file-name { min-width: 0; font-size: var(--text-sm); font-weight: 600; line-height: 1.3; }
.file-dl {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  flex: none;
  margin-left: auto;
  padding: 0.3rem 0.55rem;
  border-radius: var(--r-sm);
  border: 1px solid var(--hair-strong);
  font-size: var(--text-xs);
  color: var(--green-light);
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.file:hover .file-dl, .file:focus-visible .file-dl { background: var(--green); border-color: var(--green); color: var(--on-green); }

@media (max-width: 900px) {
  .head, .grid-2, .grid-3, .motion, .rules-list, .dont-list, .depth { grid-template-columns: minmax(0, 1fr); }
  .bubble--hero { width: 160px; justify-self: start; }
  .brand-sw { grid-template-columns: minmax(0, 1fr); }
  .sw { min-height: 6rem; }
  .shapes, .donts { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .icon-set { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .editions { grid-template-columns: minmax(0, 1fr); }
  .files ul, .files--icon ul { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .scale li, .voice li { grid-template-columns: minmax(0, 1fr); }
  .tab { margin-left: 0; }
  .theme button { grid-template-columns: 1.5rem minmax(0, 1fr) auto; }
  .theme .role { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .wave img, .sw, .file, .file-dl { transition: none; }
}
</style>
