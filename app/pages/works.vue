<script setup lang="ts">
import { platform, platformBase, projects, tools, type Work } from '~/data/works'
import { gsap, magnetic, MOTION_OK, revealLines, SplitText, useMotion } from '~/utils/motion'

useSeoMeta({
  title: 'Lavori',
  description: `${projects.length} progetti di Andrea Tombolato dal 2016 per clienti, associazioni e community, costruiti su una piattaforma comune per accessi, immagini, contenuti ed eventi.`,
  ogTitle: 'Lavori · HeyAtom',
  ogDescription: `${projects.length} progetti dal 2016 per clienti, associazioni e community.`,
})

const kindLabel = { 'cliente': 'Cliente', 'open-source': 'Open source', 'personale': 'Personale' } as const

// Open the row targeted by the URL hash (links from the home page).
const open = ref<string | null>(null)
onMounted(() => {
  const slug = location.hash.slice(1)
  if (projects.some(w => w.slug === slug)) {
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
        .from(q('.cols'), { autoAlpha: 0, duration: 0.8 }, 0.5)
        .from(q('.list > li'), { y: 34, autoAlpha: 0, stagger: 0.045, duration: 1 }, 0.5)
      // Reveal the containers only now that every intro tween holds its start state (.cols fades itself).
      gsap.set(q('.head, .list'), { autoAlpha: 1 })
    }))
    revealLines(q('.next h2')[0])
    revealLines(q('.tools h2')[0])
    revealLines(q('.platform h2')[0])
    gsap.timeline({ scrollTrigger: { trigger: q('.platform')[0], start: 'top 75%' } })
      .from(q('.platform-head p'), { y: 24, autoAlpha: 0, duration: 0.9, ease: 'expo.out' })
      .from(q('.core'), { scale: 0.8, autoAlpha: 0, duration: 1, ease: 'expo.out' }, 0.1)
      .from(q('.wire'), { scaleY: 0, duration: 0.7, ease: 'expo.inOut', stagger: 0.08 }, 0.35)
      .from(q('.services .service'), { y: 40, autoAlpha: 0, duration: 1, ease: 'expo.out', stagger: 0.09 }, 0.5)
      .from(q('.service--base'), { y: 30, autoAlpha: 0, scaleX: 0.94, duration: 1.1, ease: 'expo.out' }, 0.85)
    gsap.from(q('.tools-head p, .tool-list > li'), {
      y: 24, autoAlpha: 0, stagger: 0.08, duration: 0.9, ease: 'expo.out',
      scrollTrigger: { trigger: q('.tools')[0], start: 'top 85%' },
    })
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
        {{ projects.length }} progetti per clienti, associazioni e community, dal 2016 a oggi.
        Più sotto, la piattaforma su cui li costruisco e gli strumenti che ho reso pubblici.
      </p>
    </header>

    <div class="cols mono" data-intro aria-hidden="true">
      <span>Anno</span><span>Progetto</span><span>Stack</span>
    </div>

    <ul class="list" data-intro @pointermove="move">
      <li v-for="w in projects" :id="w.slug" :key="w.slug">
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
              :src="img(w.preview!, 960)" :srcset="srcset(w.preview!, [640, 960, 1280])" sizes="(max-width: 900px) 92vw, 44vw"
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

    <section id="piattaforma" class="platform" aria-labelledby="platform-title">
      <div class="platform-head">
        <h2 id="platform-title">La base comune</h2>
        <p>
          Accessi, immagini, contenuti, eventi, email: servono a quasi tutti i progetti. Li ho scritti una volta, bene,
          e li riuso per ogni cliente. Così il tempo va sul tuo progetto, non sulla trentesima riscrittura del login.
        </p>
      </div>

      <div class="core" aria-hidden="true">Il tuo progetto</div>
      <ul class="services">
        <li v-for="p in platform" :id="p.slug" :key="p.slug" class="service">
          <span class="wire" aria-hidden="true" />
          <p class="role">{{ p.role }}</p>
          <h3>{{ p.title }}</h3>
          <p class="line">{{ p.line }}</p>
          <ul class="svc-feats">
            <li v-for="f in p.features" :key="f">{{ f }}</li>
          </ul>
          <p class="mono stackfull">{{ p.stack.join(' · ') }}</p>
          <a v-if="p.github" class="svc-link" :href="p.github" target="_blank" rel="noopener">
            <Icon name="github" :size="16" /> Codice
          </a>
          <span v-else class="svc-link svc-link--off">Codice privato</span>
        </li>
      </ul>

      <div :id="platformBase.slug" class="service service--base">
        <div>
          <p class="role">{{ platformBase.role }}</p>
          <h3>{{ platformBase.title }}</h3>
        </div>
        <p class="line">{{ platformBase.line }}</p>
        <ul class="svc-feats">
          <li v-for="f in platformBase.features" :key="f">{{ f }}</li>
        </ul>
        <span class="svc-link svc-link--off">Codice privato</span>
      </div>
    </section>

    <section class="tools" aria-labelledby="tools-title">
      <div class="tools-head">
        <h2 id="tools-title">Strumenti e codice aperto</h2>
        <p>Cose che ho scritto per lavorare meglio io, e che chiunque può usare.</p>
      </div>
      <ul class="tool-list">
        <li v-for="t in tools" :id="t.slug" :key="t.slug">
          <a :href="t.github" target="_blank" rel="noopener">
            <span class="mono year">{{ t.year }}</span>
            <span class="tool-name">
              <strong>{{ t.title }}</strong>
              <span>{{ t.line }}</span>
            </span>
            <span class="mono tags">{{ t.stack.slice(0, 3).join(' · ') }}</span>
            <span class="gh" aria-hidden="true"><Icon name="github" :size="18" /></span>
            <span class="sr-only">(codice su GitHub)</span>
          </a>
        </li>
      </ul>
    </section>

    <section class="next" aria-labelledby="next-title">
      <h2 id="next-title">Il prossimo potrebbe essere il tuo.</h2>
      <a class="btn btn--primary" href="/#contatti">Raccontami il progetto <Icon name="arrow-right" /></a>
    </section>
  </div>

  <div ref="peekEl" class="peek" :class="{ on: peek && open !== peek.slug }" aria-hidden="true">
    <img v-if="lastPeek" :src="img(lastPeek.preview!, 640)" alt="" width="640" height="360">
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
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
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

.platform { margin-top: var(--section-far); }
.platform-head {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  align-items: end;
  gap: 1rem 3rem;
}
.platform-head h2 { font-size: clamp(2rem, 4.2vw, 3.25rem); }
.platform-head p { color: var(--ink-2); font-size: 1.05rem; max-width: 58ch; }

/* The shared services hang from one core, the client's project. */
.core {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: max-content;
  margin: clamp(2.5rem, 5vw, 3.5rem) auto 0;
  padding: 0.75rem 1.4rem;
  border-radius: 999px;
  font-weight: 700;
  color: var(--on-green);
  background: var(--green);
  box-shadow: 0 10px 30px -8px rgba(0, 168, 107, 0.6);
  position: relative;
  z-index: 1;
}
.services {
  list-style: none;
  margin: 0;
  padding: 3.75rem 0 0;
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(0.75rem, 1.5vw, 1.25rem);
}
/* Stem from the pill down to the bus line, then one wire per card. */
.services::before {
  content: '';
  position: absolute;
  top: 1.75rem;
  left: 12.5%;
  right: 12.5%;
  height: 1px;
  background: var(--hair-strong);
}
.services::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 1px;
  height: 1.75rem;
  background: var(--hair-strong);
}
.service {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.4rem 1.3rem 1.3rem;
  border-radius: 18px;
  background: var(--surface);
  border: 1px solid var(--hair);
  scroll-margin-top: 8rem;
  transition: border-color 0.3s ease;
}
.service:hover { border-color: var(--hair-strong); }
.wire {
  position: absolute;
  left: 50%;
  top: calc(-2rem - 1px);
  height: 2rem;
  width: 1px;
  background: var(--hair-strong);
  transform-origin: top;
}
.wire::after {
  content: '';
  position: absolute;
  left: -3px;
  bottom: -4px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 10px var(--green);
}
.role { font-size: 0.88rem; font-weight: 700; color: var(--green-light); }
.service h3 { font-size: 1.4rem; letter-spacing: -0.03em; }
.service .line { color: var(--ink-2); font-size: 0.95rem; flex: 1; }
.svc-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
}
.svc-link--off { color: var(--ink-3); font-weight: 500; }
.svc-feats { list-style: none; margin: 0.25rem 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 0.35rem; }
.svc-feats li {
  padding: 0.22rem 0.6rem;
  border-radius: 999px;
  font-size: 0.8rem;
  color: var(--ink);
  background: var(--surface-2);
  border: 1px solid var(--hair);
}

/* Bastion: the layer every service authenticates through, drawn as a base under them. */
.service--base {
  margin-top: clamp(0.75rem, 1.5vw, 1.25rem);
  display: grid;
  grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.4fr) minmax(0, 1.2fr) auto;
  align-items: center;
  gap: 1rem 2rem;
  background:
    linear-gradient(90deg, rgba(0, 168, 107, 0.12), transparent 60%),
    var(--surface);
  border-color: var(--hair-strong);
}
.service--base .line { flex: none; }
.service--base .svc-link { margin-top: 0; }

.tools { margin-top: var(--section-near); }
.tools-head {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  justify-content: space-between;
  gap: 0.75rem 3rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--hair);
}
.tools-head h2 { font-size: clamp(1.6rem, 3vw, 2.25rem); }
.tools-head p { color: var(--ink-2); max-width: 46ch; }
.tool-list { list-style: none; margin: 0; padding: 0; }
.tool-list > li { border-bottom: 1px solid var(--hair); }
.tool-list a {
  display: grid;
  grid-template-columns: 5.5rem minmax(0, 1fr) minmax(0, 0.8fr) 2.5rem;
  gap: 1.5rem;
  align-items: center;
  padding: 1.1rem 0.25rem;
  color: inherit;
  text-decoration: none;
  border-radius: 14px;
  transition: background-color 0.25s ease;
}
.tool-list a:hover { background: rgba(0, 168, 107, 0.07); }
.tool-name { display: grid; gap: 0.15rem; }
.tool-name strong { font-size: 1.15rem; font-weight: 700; letter-spacing: -0.02em; }
.tool-name span { color: var(--ink-2); font-size: 0.95rem; }
.gh {
  width: 2.5rem;
  height: 2.5rem;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid var(--hair);
  color: var(--ink-2);
  transition: color 0.2s ease, border-color 0.2s ease;
}
.tool-list a:hover .gh { color: var(--green-light); border-color: var(--hair-strong); }

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
  .platform-head { grid-template-columns: minmax(0, 1fr); }
  .services { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .services::before, .services::after, .wire { display: none; }
  .service--base { grid-template-columns: minmax(0, 1fr); }
  .core { margin-bottom: 1rem; }
  .services { padding-top: 0; }
  .tool-list a { grid-template-columns: 3.5rem minmax(0, 1fr) 2.5rem; gap: 1rem; }
  .detail { grid-template-columns: minmax(0, 1fr); padding-left: 0.25rem; }
}

@media (max-width: 560px) {
  .services { grid-template-columns: minmax(0, 1fr); }
}
</style>
