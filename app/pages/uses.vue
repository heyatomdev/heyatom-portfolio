<script setup lang="ts">
import { updated, uses } from '~/data/uses'
import { gsap, MOTION_OK, SplitText, useMotion } from '~/utils/motion'

const { t, locale } = useI18n()

useSeoMeta({
  title: 'Uses',
  description: () => t('uses.seo.description'),
  ogTitle: 'Uses · HeyAtom',
  ogDescription: () => t('uses.seo.ogDescription'),
})

const updatedLabel = computed(() => new Date(updated).toLocaleDateString(locale.value === 'en' ? 'en-GB' : 'it-IT', { day: 'numeric', month: 'long', year: 'numeric' }))
// English overrides on the Italian items; anchors keep using the Italian titles so links stay stable.
const groups = computed(() => uses.map(g => locale.value === 'en'
  ? { ...g, label: g.en, items: g.items.map(i => ({ ...i, ...i.en })) }
  : { ...g, label: g.title }))
const pad = (n: number) => String(n).padStart(2, '0')
// Stable anchor per group: "Design & produttività" → "design-produttivita".
const slug = (t: string) => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const copied = ref('')
let copiedTimer: ReturnType<typeof setTimeout> | undefined
// The href still updates the URL; copying is a bonus where the clipboard is available.
function copyLink(id: string) {
  navigator.clipboard?.writeText(`${location.origin}${location.pathname}#${id}`).then(() => {
    copied.value = id
    clearTimeout(copiedTimer)
    copiedTimer = setTimeout(() => { copied.value = '' }, 1800)
  }).catch(() => {})
}

const root = ref<HTMLElement>()
useMotion(root, (mm, el) => {
  const q = gsap.utils.selector(el)
  mm.add(MOTION_OK, (ctx) => {
    document.fonts.ready.then(ctx.add(() => {
      // Kept split after the intro: the letters hop again on hover.
      const split = SplitText.create(q('.head h1'), { type: 'chars' })
      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .from(split.chars, { yPercent: 110, rotation: () => gsap.utils.random(-25, 25), duration: 1.3, ease: 'elastic.out(1, 0.55)', stagger: 0.07 })
        .from(q('.head p'), { y: 24, filter: 'blur(10px)', duration: 1.1 }, 0.25)

      const hop = () => gsap.to(split.chars, {
        keyframes: { y: [0, -18, 0], rotation: [0, -8, 0] },
        duration: 0.55, ease: 'power2.out', stagger: 0.05, overwrite: true,
      })
      const h1 = q('.head h1')[0] as HTMLElement
      h1.addEventListener('pointerenter', hop)
      return () => h1.removeEventListener('pointerenter', hop)
    }))

    for (const g of q('.group')) {
      const s = gsap.utils.selector(g)
      const count = s('.count')[0] as HTMLElement
      const n = { v: 0 }
      count.textContent = pad(0)
      gsap.timeline({ scrollTrigger: { trigger: g, start: 'top 82%' } })
        .from(s('.rule'), { scaleX: 0, duration: 1.1, ease: 'expo.inOut' })
        .from(s('h2'), { x: -30, autoAlpha: 0, duration: 0.9, ease: 'expo.out' }, 0.2)
        .to(n, { v: s('li').length, duration: 0.9, ease: 'power2.out', snap: { v: 1 }, onUpdate: () => { count.textContent = pad(n.v) } }, 0.2)
        .from(s('li'), { y: 34, rotation: 1.5, autoAlpha: 0, duration: 0.9, ease: 'expo.out', stagger: 0.06 }, 0.3)
        .from(s('.tag'), { scale: 0, rotation: -20, duration: 0.6, ease: 'back.out(3)', stagger: 0.06 }, 0.6)
    }
  })
})
</script>

<template>
  <div ref="root" class="wrap page">
    <header class="head hexed">
      <h1>Uses</h1>
      <p>
        {{ t('uses.intro') }}
        <span class="mono">{{ t('uses.updated') }} <time :datetime="updated">{{ updatedLabel }}</time></span>
      </p>
    </header>

    <section v-for="g in groups" :id="slug(g.title)" :key="g.title" class="group" :aria-labelledby="`${slug(g.title)}-h`">
      <span class="rule" aria-hidden="true" />
      <div class="side">
        <h2 :id="`${slug(g.title)}-h`">
          <a :href="`#${slug(g.title)}`" class="anchor" :aria-label="`${g.label}, ${t('uses.copyLink')}`" @click="copyLink(slug(g.title))">{{ g.label }}<span class="hash" aria-hidden="true">#</span></a>
        </h2>
        <span class="mono count" aria-hidden="true">{{ pad(g.items.length) }}</span>
        <span class="mono copied" role="status">{{ copied === slug(g.title) ? t('uses.copied') : '' }}</span>
      </div>
      <ul>
        <li v-for="i in g.items" :key="i.name">
          <strong>
            <a v-if="i.url" :href="i.url" target="_blank" rel="noopener">{{ i.name }}<Icon name="arrow-up-right" :size="16" class="out" /></a>
            <template v-else>{{ i.name }}</template>
            <span v-if="i.tag" class="tag">{{ i.tag }}</span>
          </strong>
          <span class="note">{{ i.note }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.page { padding-top: clamp(3rem, 8vh, 5.5rem); padding-bottom: var(--section); }

.head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: end;
  gap: 1.5rem 3rem;
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
}
.head h1 {
  font-size: clamp(3.5rem, 9vw, 6rem);
  font-weight: 800;
  letter-spacing: -0.05em;
  line-height: 0.9;
  width: max-content;
  cursor: default;
}
.head p { color: var(--ink-2); font-size: 1.1rem; max-width: 46ch; }
.head .mono { display: block; margin-top: 0.5rem; font-size: 0.8rem; color: var(--ink-3); }

.group {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 2fr);
  gap: 1rem 3rem;
  padding: 1.75rem 0.25rem 2rem;
}
.rule {
  position: absolute;
  inset: 0 0 auto;
  height: 1px;
  background: linear-gradient(90deg, var(--green), var(--hair) 40%);
  transform-origin: left;
}
.side {
  position: sticky;
  top: 7rem;
  align-self: start;
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
}
.group h2 { font-size: 0.88rem; font-weight: 700; color: var(--green-light); letter-spacing: 0; }
/* Single cell of the site's hex pattern as section marker. */
.group h2::before {
  content: '';
  display: inline-block;
  width: 0.75em;
  aspect-ratio: 1.155;
  margin-right: 0.5em;
  background: var(--green);
  clip-path: polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%);
}
.count { font-size: 0.8rem; color: var(--ink-3); }
.anchor { color: inherit; text-decoration: none; }
.hash { margin-left: 0.3rem; opacity: 0; color: var(--ink-3); transition: opacity 0.2s ease; }
.anchor:hover .hash, .anchor:focus-visible .hash { opacity: 1; }
.anchor:focus-visible { outline: 2px solid var(--green-light); outline-offset: 3px; border-radius: 4px; }
.copied { font-size: 0.75rem; color: var(--green-light); }

ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.35rem; }
li {
  position: relative;
  display: grid;
  gap: 0.1rem;
  padding: 0.6rem 0.75rem;
  margin: 0 -0.75rem;
  border-radius: var(--r-sm);
  transition: background-color 0.25s ease;
}
li:hover { background: rgba(0, 168, 107, 0.07); }
li strong {
  display: block;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  transition: transform 0.4s var(--ease-out), color 0.2s ease;
}
li:hover strong { transform: translateX(6px); color: var(--green-light); }
li a { color: inherit; text-decoration: none; }
/* The whole row is the link's hit area. */
li a::after { content: ''; position: absolute; inset: 0; border-radius: inherit; }
li a:focus-visible { outline: none; }
li:has(a:focus-visible) { outline: 2px solid var(--green-light); outline-offset: 2px; }
.out {
  margin-left: 0.2rem;
  vertical-align: -0.1em;
  opacity: 0.45;
  transition: opacity 0.2s ease, transform 0.4s var(--ease-out);
}
li:hover .out { opacity: 1; transform: translate(2px, -2px); }
.note { color: var(--ink-2); font-size: 0.95rem; max-width: 62ch; }
.tag {
  display: inline-block;
  margin-left: 0.4rem;
  padding: 0.15rem 0.55rem;
  border-radius: var(--r-sm);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0;
  vertical-align: middle;
  color: var(--ink-2);
  background: var(--surface-2);
  border: 1px solid var(--hair);
  transition: rotate 0.4s var(--ease-out), background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
li:hover .tag { rotate: -6deg; color: var(--on-green); background: var(--green); border-color: var(--green); }

@media (max-width: 900px) {
  .head, .group { grid-template-columns: minmax(0, 1fr); }
  .side { position: static; }
}
@media (prefers-reduced-motion: reduce) {
  li strong, .tag { transition: none; }
}
</style>
