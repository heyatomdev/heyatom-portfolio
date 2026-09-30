<script setup lang="ts">
import { works, type Work } from '~/data/works'
import { Flip, gsap, magnetic, MOTION_OK, revealLines, SplitText, useMotion } from '~/utils/motion'

useSeoMeta({
  title: 'Lavori',
  description: `${works.length} progetti di Andrea Tombolato dal 2016: siti e web app per associazioni e clienti, microservizi open source, strumenti per community.`,
})

type Filter = 'tutti' | 'clienti' | 'miei'
const filters: { id: Filter, label: string, match: (w: Work) => boolean }[] = [
  { id: 'tutti', label: 'Tutti', match: () => true },
  { id: 'clienti', label: 'Clienti e community', match: w => w.kind === 'cliente' },
  { id: 'miei', label: 'Prodotti miei', match: w => w.kind !== 'cliente' },
]
const active = ref<Filter>('tutti')
const visible = computed(() => new Set(works.filter(filters.find(f => f.id === active.value)!.match).map(w => w.slug)))
const count = (f: typeof filters[number]) => works.filter(f.match).length

const kindLabel = { 'cliente': 'Cliente', 'open-source': 'Open source', 'personale': 'Personale' } as const

// Open the row targeted by the URL hash (links from the home page).
const open = ref<string | null>(null)
onMounted(() => {
  const slug = location.hash.slice(1)
  if (works.some(w => w.slug === slug)) {
    open.value = slug
    nextTick(() => document.getElementById(slug)?.scrollIntoView({ block: 'center' }))
  }
})
const motion = () => matchMedia(MOTION_OK).matches

function toggle(slug: string, e: Event) {
  const details = e.target as HTMLDetailsElement
  if (details.open) {
    open.value = slug
    if (motion()) {
      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .fromTo(details.querySelector('.detail img'), { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'expo.inOut' })
        .from(details.querySelectorAll('.info > *'), { x: 24, autoAlpha: 0, stagger: 0.06, duration: 0.8 }, 0.2)
    }
  }
  else if (open.value === slug) open.value = null
}

// Filtering reflows the ledger: rows slide to their new place (Flip), leavers fade, arrivals rise.
const list = ref<HTMLElement>()
let flip: gsap.core.Timeline | undefined
let hold: gsap.core.Tween | undefined
function pick(id: Filter) {
  if (id === active.value) return
  if (!motion() || !list.value) {
    active.value = id
    return
  }
  // A click mid-flight finishes the previous reflow first, so state is read from settled rows.
  flip?.progress(1)
  hold?.progress(1)
  const ul = list.value
  const rows = ul.querySelectorAll(':scope > li')
  const state = Flip.getState(rows)
  const from = ul.offsetHeight
  active.value = id
  nextTick(() => {
    // Rows go absolute while flipping; hold the list's height so the page below doesn't jump.
    hold = gsap.fromTo(ul, { height: from }, { height: ul.offsetHeight, duration: 0.7, ease: 'expo.inOut', clearProps: 'height' })
    flip = Flip.from(state, {
    duration: 0.7,
    ease: 'expo.inOut',
    absolute: true,
    stagger: 0.02,
    onEnter: els => gsap.fromTo(els, { autoAlpha: 0, x: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'expo.out', stagger: 0.04, delay: 0.2 }),
    onLeave: els => gsap.to(els, { autoAlpha: 0, x: -30, duration: 0.35, ease: 'power2.in' }),
    })
  })
}

// Desktop: the hovered row's screenshot trails the pointer and leans with its speed.
const peek = ref<Work | null>(null)
const lastPeek = ref<Work | null>(null) // keeps the image while the card fades out
watch(peek, (w) => { if (w) lastPeek.value = w })
const peekEl = ref<HTMLElement>()
let rest: ReturnType<typeof setTimeout> | undefined
let px: ((v: number) => void) | undefined
let py: ((v: number) => void) | undefined
let pr: ((v: number) => void) | undefined
let lastX = 0
function move(e: PointerEvent) {
  if (!peekEl.value) return
  if (!px) {
    const d = motion() ? 0.55 : 0
    px = gsap.quickTo(peekEl.value, 'x', { duration: d, ease: 'power3' })
    py = gsap.quickTo(peekEl.value, 'y', { duration: d, ease: 'power3' })
    pr = gsap.quickTo(peekEl.value, 'rotation', { duration: 0.8, ease: 'power3' })
  }
  px(e.clientX + 28)
  py!(e.clientY - 90)
  if (motion()) {
    pr!(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6))
    clearTimeout(rest)
    rest = setTimeout(() => pr!(0), 90) // lean settles when the pointer stops
  }
  lastX = e.clientX
}

const root = ref<HTMLElement>()
useMotion(root, (mm, el) => {
  const q = gsap.utils.selector(el)
  mm.add(MOTION_OK, (ctx) => {
    document.fonts.ready.then(ctx.add(() => {
      const split = SplitText.create(q('.head h1'), { type: 'chars', mask: 'chars' })
      gsap.timeline({ defaults: { ease: 'expo.out' }, onComplete: () => split.revert() })
        .from(split.chars, { yPercent: 120, rotation: 12, duration: 1.2, stagger: 0.05 })
        .from(q('.head p'), { y: 24, autoAlpha: 0, filter: 'blur(10px)', duration: 1.1 }, 0.25)
        .from(q('.filter'), { y: 16, autoAlpha: 0, stagger: 0.06, duration: 0.8 }, 0.4)
        .from(q('.cols'), { autoAlpha: 0, duration: 0.8 }, 0.5)
        .from(q('.list > li'), { y: 34, autoAlpha: 0, stagger: 0.045, duration: 1 }, 0.5)
      // Reveal the containers only now that every intro tween holds its start state (.cols fades itself).
      gsap.set(q('.head, .filters, .list'), { autoAlpha: 1 })
    }))
    revealLines(q('.next h2')[0])
    const off = magnetic(q('.next .btn')[0] as HTMLElement, 0.25)
    return off
  })
})
</script>

<template>
  <div ref="root">
  <div class="wrap page">
    <header class="head" data-intro>
      <h1>Lavori</h1>
      <p>
        {{ works.length }} progetti dal 2016 a oggi. Siti e web app per clienti e associazioni, microservizi open source,
        e qualche strumento che ho costruito perché mi serviva.
      </p>
    </header>

    <div class="filters" data-intro role="group" aria-label="Filtra i lavori">
      <button
        v-for="f in filters" :key="f.id" type="button" class="filter" :aria-pressed="active === f.id"
        @click="pick(f.id)"
      >
        {{ f.label }} <span class="mono">{{ count(f) }}</span>
      </button>
    </div>

    <div class="cols mono" data-intro aria-hidden="true">
      <span>Anno</span><span>Progetto</span><span>Stack</span>
    </div>

    <ul ref="list" class="list" data-intro @pointermove="move">
      <li v-for="w in works" :id="w.slug" :key="w.slug" :class="{ gone: !visible.has(w.slug) }">
        <details :open="open === w.slug" @toggle="toggle(w.slug, $event)">
          <summary @pointerenter="peek = w" @pointerleave="peek = null">
            <span class="mono year">{{ w.year }}</span>
            <span class="name">
              <strong>{{ w.title }}</strong>
              <span class="client">{{ w.client }}<template v-if="w.current"> · <em>in corso</em></template></span>
            </span>
            <span class="mono tags">{{ w.stack.slice(0, 3).join(' · ') }}</span>
            <span class="plus" aria-hidden="true"><Icon name="plus" :size="20" /></span>
          </summary>

          <div class="detail">
            <img
              :src="img(w.preview, 960)" :srcset="srcset(w.preview, [640, 960, 1280])" sizes="(max-width: 900px) 92vw, 44vw"
              :alt="`Schermata di ${w.title}`" width="1280" height="720" loading="lazy"
            >
            <div class="info">
              <p class="kind">{{ kindLabel[w.kind] }}</p>
              <p class="desc">{{ w.description }}</p>
              <ul v-if="w.features.length" class="feats">
                <li v-for="f in w.features" :key="f">{{ f }}</li>
              </ul>
              <p class="mono stackfull">{{ w.stack.join(' · ') }}</p>
              <div class="links">
                <a v-if="w.website" class="btn btn--primary" :href="w.website" target="_blank" rel="noopener">
                  Visita il sito <Icon name="arrow-up-right" />
                </a>
                <a v-if="w.github" class="btn btn--ghost" :href="w.github" target="_blank" rel="noopener">
                  <Icon name="github" /> Codice
                </a>
                <span v-if="!w.website && !w.github" class="private">Progetto privato, niente link pubblico.</span>
              </div>
            </div>
          </div>
        </details>
      </li>
    </ul>

    <section class="next" aria-labelledby="next-title">
      <h2 id="next-title">Il prossimo potrebbe essere il tuo.</h2>
      <a class="btn btn--primary" href="/#contatti">Raccontami il progetto <Icon name="arrow-right" /></a>
    </section>
  </div>

  <div ref="peekEl" class="peek" :class="{ on: peek && open !== peek.slug }" aria-hidden="true">
    <img v-if="lastPeek" :src="img(lastPeek.preview, 640)" alt="" width="640" height="360">
  </div>
  </div>
</template>

<style scoped>
.page { padding-top: clamp(3rem, 8vh, 5.5rem); }

.head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: end;
  gap: 1.5rem 3rem;
}
.head h1 {
  font-size: clamp(3.5rem, 9vw, 6rem);
  font-weight: 800;
  letter-spacing: -0.05em;
  line-height: 0.9;
}
.head p {
  color: var(--ink-2);
  font-size: 1.1rem;
  max-width: 46ch;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: clamp(2.5rem, 5vw, 3.5rem) 0 1.5rem;
}
.filter {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.6rem 1rem;
  border-radius: 999px;
  font: 600 0.93rem/1 var(--sans);
  color: var(--ink-2);
  background: transparent;
  border: 1px solid var(--hair);
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.filter .mono { font-size: 0.78rem; color: var(--ink-3); }
.filter:hover { color: var(--ink); border-color: var(--hair-strong); }
.filter[aria-pressed='true'] { background: var(--green); border-color: var(--green); color: var(--on-green); }
.filter[aria-pressed='true'] .mono { color: var(--on-green); }

.cols,
summary {
  display: grid;
  grid-template-columns: 5.5rem minmax(0, 1fr) minmax(0, 0.8fr) 2.5rem;
  gap: 1.5rem;
  align-items: center;
}
.cols { padding: 0 0.25rem 0.75rem; font-size: 0.72rem; color: var(--ink-3); border-bottom: 1px solid var(--hair); }

.list { list-style: none; margin: 0; padding: 0; position: relative; }
.list > li { border-bottom: 1px solid var(--hair); scroll-margin-top: 8rem; }

summary {
  list-style: none;
  cursor: pointer;
  padding: 1.35rem 0.25rem;
  position: relative;
}
summary::-webkit-details-marker { display: none; }
summary::before {
  content: '';
  position: absolute;
  inset: 0 -1rem;
  border-radius: 14px;
  background: rgba(0, 168, 107, 0.07);
  opacity: 0;
  transition: opacity 0.25s ease;
  z-index: -1;
}
summary:hover::before,
details[open] summary::before { opacity: 1; }
summary:focus-visible { outline-offset: -2px; }

.year { color: var(--green-light); font-size: 0.9rem; }
.name { display: grid; gap: 0.15rem; }
.name strong {
  font-size: clamp(1.25rem, 2.3vw, 1.75rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.15;
  transition: transform 0.4s var(--ease-out), color 0.2s ease;
}
summary:hover strong { transform: translateX(6px); }
details[open] strong { color: var(--green-light); }
.client { color: var(--ink-3); font-size: 0.92rem; font-weight: 500; }
.client em { font-style: normal; color: var(--green-light); white-space: nowrap; }
.tags { color: var(--ink-3); font-size: 0.8rem; }

.plus {
  width: 2.5rem;
  height: 2.5rem;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid var(--hair);
  color: var(--ink-2);
  transition: transform 0.45s var(--ease-out), background-color 0.2s ease, color 0.2s ease;
}
summary:hover .plus { border-color: var(--hair-strong); color: var(--ink); }
details[open] .plus { transform: rotate(45deg); background: var(--green); border-color: var(--green); color: var(--on-green); }

.detail {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(1.5rem, 4vw, 3rem);
  padding: 0.75rem 0.25rem 2.25rem calc(5.5rem + 1.5rem);
}
.detail img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 14px;
  border: 1px solid var(--hair-strong);
  background: var(--surface-2);
  box-shadow: 0 24px 50px -24px rgba(0, 0, 0, 0.8);
}
.info { display: grid; gap: 1rem; align-content: start; }
.kind { font-size: 0.88rem; font-weight: 700; color: var(--green-light); }
.desc { color: var(--ink-2); max-width: 62ch; }
.feats {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.feats li {
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  font-size: 0.85rem;
  color: var(--ink);
  background: var(--surface-2);
  border: 1px solid var(--hair);
}
.stackfull { font-size: 0.78rem; color: var(--ink-3); }
.links { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 0.25rem; }
.links .btn { padding: 0.75rem 1.2rem; font-size: 0.93rem; }
.private { color: var(--ink-3); font-size: 0.92rem; }

.list > li.gone { display: none; }

.peek {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  width: 320px;
  pointer-events: none;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--hair-strong);
  box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.8);
  opacity: 0;
  scale: 0.9;
  rotate: -3deg;
  transition: opacity 0.25s ease, scale 0.4s var(--ease-out), rotate 0.4s var(--ease-out);
}
.peek.on { opacity: 1; scale: 1; rotate: 0deg; }
.peek img { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; }
@media (hover: none), (max-width: 900px) { .peek { display: none; } }

.next {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin: var(--section) 0;
  padding: clamp(2rem, 4vw, 3rem);
  border-radius: 22px;
  background:
    radial-gradient(ellipse 70% 120% at 0% 0%, rgba(0, 168, 107, 0.2), transparent 70%),
    var(--surface);
  border: 1px solid var(--hair);
}
.next h2 { font-size: clamp(1.6rem, 3.2vw, 2.5rem); max-width: 18ch; }

@media (max-width: 900px) {
  .head { grid-template-columns: minmax(0, 1fr); }
  .cols { display: none; }
  summary { grid-template-columns: 3.5rem minmax(0, 1fr) 2.5rem; gap: 1rem; }
  .tags { display: none; }
  .detail { grid-template-columns: minmax(0, 1fr); padding-left: 0.25rem; }
}
</style>
