<script setup lang="ts">
import { projects, works } from '~/data/works'
import { gsap, magnetic, MOTION_OK, revealLines, ScrollTrigger, SplitText, useMotion } from '~/utils/motion'

useSeoMeta({
  title: 'Andrea Tombolato, full-stack developer',
  description: 'Sono Andrea (HeyAtom), sviluppatore full-stack dal 2016. Costruisco siti e web app su misura per associazioni, professionisti e piccole realtà. Parli sempre con me.',
  ogTitle: 'Andrea Tombolato · HeyAtom',
  ogDescription: 'Siti e web app su misura, costruiti da una persona sola. Vue, Nuxt, Node, NestJS e Java dal 2016.',
})

const bySlug = (s: string) => works.find(w => w.slug === s)!
// Last slot is dealt in front.
const deck = ['element', 'sgweb', 'kaish-dbd'].map(bySlug)

const picks = [
  { slug: 'kaish-dbd', line: 'Community e build builder per Dead by Daylight: utenti, ruoli, wiki e traduzione completa.' },
  { slug: 'sgweb', line: 'Il sito dei corsi di Tai Chi e Qi Gong: sedi, orari e contatto diretto, in italiano e inglese.' },
  { slug: 'element', line: 'Il sito del network e-sport, con lo stato live degli streamer dalle API di Twitch.' },
].map(p => ({ ...bySlug(p.slug), line: p.line }))

const offers = [
  {
    title: 'Un sito per la tua associazione o attività',
    text: 'Chiaro, veloce, facile da aggiornare. Si legge bene dal telefono e ti trovano su Google.',
    examples: ['prociv', 'puma-arts'],
  },
  {
    title: 'Una web app su misura',
    text: 'Aree riservate, gestionali, strumenti per la tua community: quello che un sito vetrina non fa.',
    examples: ['kaish-dbd', 'element'],
  },
  {
    title: 'API e integrazioni',
    text: 'Collegare sistemi che non si parlano, automatizzare, e tenere tutto acceso in produzione.',
    examples: ['alertconnector', 'fileharbor'],
  },
].map(o => ({ ...o, examples: o.examples.map(bySlug) }))

const path = [
  {
    when: '2016 → oggi',
    role: 'Full-stack developer',
    org: 'Medas Solutions',
    text: 'Software in ambito sanitario con Java, Node.js e Vue: dossier online per dare ai pazienti accesso a referti e documentazione clinica. Sistemi dove continuità e affidabilità non sono negoziabili.',
  },
  {
    when: '2020 → oggi',
    role: 'Consiglio direttivo',
    org: 'Element Gaming',
    text: 'Gestione di una community gaming no-profit: coordinamento del team, decisioni organizzative, nuove iniziative.',
  },
  {
    when: '2019 → 2020',
    role: 'Full-stack developer e project manager',
    org: 'Element Gaming',
    text: 'Piattaforma web del network con Nuxt e Node.js, dashboard per team e streamer, strumenti interni.',
  },
  {
    when: '2015 → oggi',
    role: 'Volontario, capo squadra, consigliere',
    org: 'Protezione Civile',
    text: 'Dal 2022 responsabile della comunicazione pubblica: ho rilanciato i social e costruito da zero il sito del gruppo.',
  },
]

const stack = [
  { group: 'Frontend', items: ['Vue', 'Nuxt', 'TypeScript', 'Vuetify', 'Sass'] },
  { group: 'Backend', items: ['Node.js', 'NestJS', 'Java', 'Grails', 'Prisma', 'PostgreSQL', 'MySQL'] },
  { group: 'Infrastruttura', items: ['Docker', 'NGINX', 'Git', 'Swagger'] },
]

const travels = [
  { src: 'https://fileharbor.heyatom.dev/v2/images/f4a215ed-406d-4532-8f4f-67cc3fa132f6', place: 'Edimburgo, Scozia', year: 2022, alt: 'Via di Edimburgo al tramonto, con una cabina telefonica rossa e palazzi in pietra' },
  { src: 'https://fileharbor.heyatom.dev/v2/images/b6e3fce0-4b4a-49c5-a636-c8d5d5954335', place: 'Chicago, USA', year: 2022, alt: 'Aiuola di tulipani davanti all’insegna del Chicago Theatre, tra i grattacieli' },
  { src: 'https://fileharbor.heyatom.dev/v2/images/085153e2-9300-4168-ae78-c12ddb247064', place: 'Valsesia, Piemonte', year: 2023, alt: 'Vette innevate che si specchiano in un laghetto di montagna' },
  { src: 'https://fileharbor.heyatom.dev/v2/images/821de266-6804-4f06-9576-6febd993396c', place: 'Lisbona, Portogallo', year: 2019, alt: 'Arco di Rua Augusta affacciato su Praça do Comércio, sotto un cielo azzurro' },
  { src: 'https://fileharbor.heyatom.dev/v2/images/0056c6b0-0b84-4b19-8af9-4571e4e1e53c', place: 'Dolomiti, Trentino', year: 2018, alt: 'Lago verde smeraldo circondato da abeti, con le guglie delle Dolomiti sullo sfondo' },
  { src: 'https://fileharbor.heyatom.dev/v2/images/243e5eef-2a2b-4b38-a694-11cefd754e74', place: 'Siviglia, Spagna', year: 2019, alt: 'Plaza de España a Siviglia, con le torri e la balaustra illuminate dal sole' },
  { src: 'https://fileharbor.heyatom.dev/v2/images/8ab40bb6-4e37-4c3b-b12b-726e913e477d', place: 'Londra, Regno Unito', year: 2014, alt: 'Il Parlamento di Westminster illuminato di notte, riflesso sul Tamigi' },
  { src: 'https://fileharbor.heyatom.dev/v2/images/07dc987f-631e-49c2-87dd-c7602fc58243', place: 'Prealpi Bergamasche', year: 2023, alt: 'Cima rocciosa tra le nuvole sopra pendii verdi' },
]

const years = new Date().getFullYear() - 2016
const available = useRuntimeConfig().public.freelanceAvailable === 'true'

const root = ref<HTMLElement>()

useMotion(root, (mm, el) => {
  const q = gsap.utils.selector(el)

  mm.add(MOTION_OK, (ctx) => {
    const stage = q('.stage')[0] as HTMLElement
    const shots = q('.shot')

    // Focal moment: the deck is dealt at once; the headline joins word by word as soon as fonts are in.
    // Second visit in a session plays the same sequence at double speed.
    const h1 = q('#hero-title')[0] as HTMLElement
    let seen = false
    try { seen = sessionStorage.getItem('intro') === '1'; sessionStorage.setItem('intro', '1') } catch {}
    const speed = seen ? 2.2 : 1
    gsap.set(shots, { '--in': 1 })
    gsap.set(h1, { autoAlpha: 0 })
    gsap.set(q('[data-intro]'), { autoAlpha: 1 })
    stage.classList.add('is-intro')
    gsap.timeline({ defaults: { ease: 'expo.out' }, onComplete: () => stage.classList.remove('is-intro') })
      .from(q('.avail'), { y: 18, autoAlpha: 0, duration: 0.8 })
      .from(q('.lead'), { y: 26, autoAlpha: 0, filter: 'blur(10px)', duration: 1.1 }, 0.55)
      .from(q('.hero .actions > *'), { y: 22, autoAlpha: 0, stagger: 0.09, duration: 1 }, 0.7)
      .to(shots, { '--in': 0, duration: 1.4, stagger: 0.15 }, 0.2)
      .from(q('.medal'), { scale: 0, rotation: -120, duration: 1.2, ease: 'back.out(1.7)' }, 0.9)
      .from(q('.facts li'), { y: 22, autoAlpha: 0, stagger: 0.09, duration: 0.9 }, 1)
      .timeScale(speed)
    document.fonts.ready.then(ctx.add(() => {
      const split = SplitText.create(h1, { type: 'lines,words', mask: 'lines', linesClass: 'ln' })
      gsap.set(h1, { autoAlpha: 1 })
      gsap.from(split.words, { yPercent: 118, duration: 1.2, stagger: 0.05, ease: 'expo.out', onComplete: () => split.revert() }).timeScale(speed)
    }))

    // Leaving the hero, the deck scatters and the copy recedes. The CSS transform lag is off while scrubbing.
    const leave = { trigger: q('.hero')[0], start: 'top top', end: 'bottom top', scrub: 0.4 }
    gsap.to(stage, {
      '--scatter': 1,
      ease: 'power1.in',
      scrollTrigger: { ...leave, onUpdate: s => stage.classList.toggle('is-scrub', s.progress > 0.01) },
    })
    gsap.to(q('.hero-copy'), { yPercent: -14, opacity: 0.25, ease: 'none', scrollTrigger: leave })

    // Section headings: lines rise out of a mask; the intro paragraph follows.
    q('.sec-head h2, .close h2').forEach(h => revealLines(h))
    q('.sec-head p').forEach(p => gsap.from(p, {
      y: 24, autoAlpha: 0, duration: 1, ease: 'expo.out', delay: 0.15,
      scrollTrigger: { trigger: p, start: 'top 90%' },
    }))

    // Picks: the screenshot is uncovered from below and settles in scale.
    q('.pick').forEach((p) => {
      gsap.timeline({ scrollTrigger: { trigger: p, start: 'top 85%' } })
        .fromTo(p.querySelector('.pick-img'), { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut' })
        .from(p.querySelector('.pick-img img'), { scale: 1.35, duration: 1.8, ease: 'expo.out', clearProps: 'scale' }, 0.1)
        .from(p.querySelectorAll('.pick-body > *'), { y: 20, autoAlpha: 0, stagger: 0.08, duration: 0.9, ease: 'expo.out' }, 0.55)
    })

    // Offers: the rule draws across, then the row fills in.
    q('.offer').forEach((o) => {
      gsap.timeline({ scrollTrigger: { trigger: o, start: 'top 88%' } })
        .from(o.querySelector('.rule'), { scaleX: 0, duration: 1.2, ease: 'expo.inOut' })
        .from(o.querySelectorAll(':scope > h3, :scope > p'), { y: 24, autoAlpha: 0, stagger: 0.08, duration: 0.9, ease: 'expo.out' }, 0.25)
    })

    // Path: a green line follows the scroll; each step lights up as it is reached.
    gsap.from(q('.path-progress'), {
      scaleY: 0, ease: 'none',
      scrollTrigger: { trigger: q('.path')[0], start: 'top 65%', end: 'bottom 65%', scrub: 0.4 },
    })
    q('.path > li').forEach(li => ScrollTrigger.create({ trigger: li, start: 'top 65%', toggleClass: { targets: li, className: 'on' } }))
    gsap.from(q('.chip'), {
      scale: 0.6, autoAlpha: 0, duration: 0.6, ease: 'back.out(2)', stagger: { each: 0.025, from: 'random' },
      scrollTrigger: { trigger: q('.stack')[0], start: 'top 80%' },
    })

    // Close: rings turn only while on screen; the orb leans toward the pointer.
    const rings = gsap.to(q('.orb-ring--a, .orb-ring--b'), { rotation: i => (i ? -360 : 360), duration: i => (i ? 26 : 16), ease: 'none', repeat: -1, paused: true })
    ScrollTrigger.create({ trigger: q('.close')[0], onToggle: s => (s.isActive ? rings.play() : rings.pause()) })
    gsap.from(q('.orb'), { scale: 0.7, autoAlpha: 0, rotation: -30, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: q('.close')[0], start: 'top 75%' } })
    gsap.from(q('.mail, .close .actions > *'), { y: 24, autoAlpha: 0, stagger: 0.08, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: q('.mail')[0], start: 'top 92%' } })

    const offs = [
      magnetic(q('.orb')[0] as HTMLElement, 0.18),
      ...q('.btn--primary').map(b => magnetic(b as HTMLElement, 0.25)),
    ]
    return () => offs.forEach(off => off())
  })

  // Desktop: the travel strip scrolls sideways while its section is pinned.
  mm.add(`(min-width: 901px) and ${MOTION_OK}`, () => {
    const strip = q('.strip')[0] as HTMLElement
    strip.classList.add('is-pinned')
    strip.removeAttribute('tabindex') // not a scroller while pinned
    const dist = () => {
      const last = strip.lastElementChild as HTMLElement
      return Math.max(0, last.offsetLeft + last.offsetWidth - window.innerWidth + 48)
    }
    gsap.to(strip, {
      x: () => -dist(),
      ease: 'none',
      // Shorter than the travel distance: the personal photos pass quickly and never outweigh the work.
      scrollTrigger: { trigger: q('.off')[0], start: 'top top', end: () => `+=${dist() * 0.6}`, pin: true, scrub: 0.6, invalidateOnRefresh: true },
    })
    return () => {
      strip.classList.remove('is-pinned')
      strip.setAttribute('tabindex', '0')
    }
  })
})

// Hero deck: tilt toward the pointer, fan out on hover.
function tilt(e: PointerEvent) {
  const el = e.currentTarget as HTMLElement
  if (e.pointerType !== 'mouse') return
  const r = el.getBoundingClientRect()
  el.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3))
  el.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3))
}
function untilt(e: PointerEvent) {
  const el = e.currentTarget as HTMLElement
  el.style.setProperty('--px', '0')
  el.style.setProperty('--py', '0')
}
</script>

<template>
  <div ref="root">
  <!-- ── Hero ─────────────────────────────────────── -->
  <section class="hero wrap" aria-labelledby="hero-title">
    <div class="hero-copy" data-intro>
      <p v-if="available" class="avail"><span class="dot" aria-hidden="true" />Disponibile per progetti freelance</p>
      <h1 id="hero-title">
        <span class="hi">Ciao, sono Andrea.</span>
        Costruisco <span class="nw">siti e web</span> app <span class="nw">su misura.</span>
      </h1>
      <p class="lead">
        Per associazioni, professionisti e piccole realtà. Sviluppo full-stack dal 2016, dalla prima riga al deploy.
        E parli sempre con me, non con un’agenzia.
      </p>
      <div class="actions">
        <a class="btn btn--primary" href="#contatti">
          Raccontami il progetto <Icon name="arrow-right" />
        </a>
        <NuxtLink class="btn btn--ghost" to="/works">Vedi tutti i lavori</NuxtLink>
      </div>
    </div>

    <NuxtLink
      to="/works" class="stage" data-intro :aria-label="`Alcuni lavori: ${[...deck].reverse().map(w => w.title).join(', ')}. Vedi tutti i lavori`"
      @pointermove="tilt" @pointerleave="untilt"
    >
      <figure v-for="(w, i) in deck" :key="w.slug" class="shot" :class="`shot--${i}`">
        <img
          :src="img(w.preview, 960)" :srcset="srcset(w.preview, [640, 960, 1280])" sizes="(max-width: 900px) 80vw, 34vw"
          :alt="`Schermata di ${w.title}`" width="1280" height="720" :fetchpriority="i === 2 ? 'high' : 'auto'"
        >
        <figcaption><span>{{ w.title }}</span><span class="mono">{{ w.year }}</span></figcaption>
      </figure>
      <span class="medal" aria-hidden="true">
        <span class="medal-ring" />
        <img src="/favicon.svg" alt="" width="64" height="64">
      </span>
    </NuxtLink>

    <ul class="facts" data-intro aria-label="In breve">
      <li><span class="mono">2016 → oggi</span>Full-stack in Medas Solutions</li>
      <li><span class="mono">2020 → oggi</span>Consiglio direttivo Element Gaming</li>
      <li><span class="mono">dal 2015</span>Volontario in Protezione Civile</li>
    </ul>
  </section>

  <!-- ── Lavori scelti ────────────────────────────── -->
  <section class="sec wrap" aria-labelledby="picks-title">
    <div class="sec-head">
      <h2 id="picks-title">Cose che ho costruito e che girano davvero.</h2>
      <NuxtLink to="/works" class="more">Tutti i {{ projects.length }} lavori <Icon name="arrow-right" /></NuxtLink>
    </div>

    <div class="picks">
      <a
        v-for="p in picks" :key="p.slug" class="pick"
        :href="p.website || p.github" target="_blank" rel="noopener"
      >
        <div class="pick-img">
          <img
            :src="img(p.preview, 960)" :srcset="srcset(p.preview, [640, 960, 1280])"
            sizes="(max-width: 900px) 92vw, 680px"
            :alt="`Schermata di ${p.title}`" width="1280" height="720" loading="lazy"
          >
        </div>
        <div class="pick-body">
          <h3>{{ p.title }}<Icon name="arrow-up-right" :size="20" /></h3>
          <p>{{ p.line }}</p>
          <p class="mono meta">{{ p.year }} · {{ p.stack.slice(0, 3).join(' · ') }}</p>
        </div>
      </a>
    </div>
  </section>

  <!-- ── Cosa faccio per te ───────────────────────── -->
  <section class="sec sec--near wrap" aria-labelledby="offer-title">
    <div class="sec-head">
      <h2 id="offer-title">Cosa posso fare per te.</h2>
      <p>
        Niente pacchetti né listini: capisco cosa ti serve e ti propongo la strada più semplice che funziona.
        E non riparto da zero: accessi, immagini, contenuti, eventi ed email poggiano su una
        <NuxtLink to="/works#piattaforma">base comune</NuxtLink> già collaudata.
      </p>
    </div>
    <ul class="offers">
      <li v-for="o in offers" :key="o.title" class="offer">
        <span class="rule" aria-hidden="true" />
        <h3>{{ o.title }}</h3>
        <p>{{ o.text }}</p>
        <p class="ex">
          <span class="ex-label">Per esempio</span>
          <template v-for="(e, j) in o.examples" :key="e.slug">
            <NuxtLink :to="`/works#${e.slug}`">{{ e.title }}</NuxtLink><span v-if="j < o.examples.length - 1">, </span>
          </template>
        </p>
      </li>
    </ul>
  </section>

  <!-- ── Percorso ─────────────────────────────────── -->
  <section id="percorso" class="sec sec--far wrap" aria-labelledby="path-title">
    <div class="sec-head">
      <h2 id="path-title">{{ years }} anni di codice, e non solo.</h2>
      <p>Di giorno software sanitario, dove un errore non è un dettaglio. Il resto del tempo community, volontariato e progetti miei.</p>
    </div>

    <div class="path-grid">
      <ol class="path">
        <span class="path-track" aria-hidden="true"><span class="path-progress" /></span>
        <li v-for="p in path" :key="p.role + p.org">
          <span class="mono when">{{ p.when }}</span>
          <div>
            <h3>{{ p.role }} <span class="org">· {{ p.org }}</span></h3>
            <p>{{ p.text }}</p>
          </div>
        </li>
      </ol>

      <aside class="stack" aria-labelledby="stack-title">
        <h3 id="stack-title">Con cosa lavoro</h3>
        <dl>
          <template v-for="s in stack" :key="s.group">
            <dt>{{ s.group }}</dt>
            <dd>
              <span v-for="t in s.items" :key="t" class="mono chip">{{ t }}</span>
            </dd>
          </template>
        </dl>
        <a class="btn btn--ghost cv" href="/assets/cv-tombolato.pdf" download>
          Scarica il CV <Icon name="download" />
        </a>
      </aside>
    </div>
  </section>

  <!-- ── Fuori dallo schermo ──────────────────────── -->
  <section class="sec sec--near off" aria-labelledby="off-title">
    <div class="wrap sec-head">
      <h2 id="off-title">Fuori dallo schermo.</h2>
      <p>Montagna, viaggi, gaming. Mi ricaricano, e secondo me si vede nella cura dei dettagli.</p>
    </div>
    <ul class="strip" tabindex="0" aria-label="Foto di viaggio">
      <li v-for="t in travels" :key="t.src">
        <img :src="img(t.src, 720)" :alt="t.alt" width="720" height="900" loading="lazy">
        <span class="mono">{{ t.place }} · {{ t.year }}</span>
      </li>
    </ul>
  </section>

  <!-- ── Contatti ─────────────────────────────────── -->
  <section id="contatti" class="close" aria-labelledby="close-title">
    <div class="wrap close-inner">
      <div class="orb" aria-hidden="true">
        <span class="orb-ring orb-ring--a" />
        <span class="orb-ring orb-ring--b" />
        <img src="/favicon.svg" alt="" width="120" height="120">
      </div>
      <div class="close-copy">
        <h2 id="close-title">Hai un progetto in mente? Raccontamelo.</h2>
        <p>Seguo soprattutto no profit e piccole realtà del gaming e del benessere, come palestre, dojo e massaggiatori. Due righe su cosa ti serve bastano: rispondo io, a tutti i messaggi, e se non sono la persona giusta te lo dico.</p>
        <p class="aside">Non cerco lavoro attivamente, ma se hai una proposta interessante scrivimi pure.</p>
        <a class="mail" href="mailto:hey@heyatom.dev">hey@heyatom.dev</a>
        <div class="actions">
          <a class="btn btn--primary" href="mailto:hey@heyatom.dev?subject=Ciao%20Andrea"><Icon name="mail" /> Scrivimi una mail</a>
          <a class="btn btn--ghost" href="https://www.linkedin.com/in/atombolato" target="_blank" rel="noopener"><Icon name="linkedin" /> LinkedIn</a>
          <a class="btn btn--ghost" href="https://github.com/andreacw5" target="_blank" rel="noopener"><Icon name="github" /> GitHub</a>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<style scoped>
/* ── Hero ─────────────────────────────────────── */
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  grid-template-areas: 'copy stage' 'facts facts';
  align-items: center;
  gap: 2rem clamp(2rem, 5vw, 5rem);
  padding-top: clamp(3rem, 9vh, 6.5rem);
  padding-bottom: clamp(2.5rem, 6vh, 4rem);
  min-height: min(92svh, 60rem);
}

.hero-copy { grid-area: copy; }

.hero h1 {
  font-size: clamp(2.7rem, 5.8vw, 5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.02;
  text-wrap: wrap; /* balance re-breaks lines after the split reverts */
}
/* Keeps "siti e web" together in both the split and settled layouts (SplitText drops &nbsp;). */
.nw { white-space: nowrap; }
.hi {
  display: block;
  color: var(--green-light);
  font-weight: 600;
  font-size: 0.5em;
  letter-spacing: -0.02em;
  margin-bottom: 0.55em;
}

.lead {
  margin-top: 1.6rem;
  max-width: 44ch;
  font-size: clamp(1.06rem, 1.4vw, 1.2rem);
  color: var(--ink-2);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2.2rem;
}


.avail {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 1.6rem;
  padding: 0.4rem 0.9rem 0.4rem 0.75rem;
  border-radius: 999px;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--green-light);
  background: rgba(0, 168, 107, 0.08);
  border: 1px solid var(--hair-strong);
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 10px var(--green);
}

/* Deck of real screenshots */
.stage {
  --px: 0;
  --py: 0;
  --fan: 0;
  --scatter: 0;
  grid-area: stage;
  position: relative;
  display: block;
  aspect-ratio: 1 / 0.92;
  perspective: 1400px;
  isolation: isolate;
  color: inherit;
  text-decoration: none;
  border-radius: 20px;
}
.stage::before {
  content: '';
  position: absolute;
  inset: 4% 2% 0;
  z-index: -1;
  background: radial-gradient(closest-side, rgba(0, 168, 107, 0.3), rgba(0, 168, 107, 0.06) 60%, transparent);
  filter: blur(20px);
}
.stage:hover,
.stage:focus-visible { --fan: 1; }

.shot {
  position: absolute;
  margin: 0;
  width: 78%;
  border-radius: 14px;
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--hair-strong);
  box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.75), 0 8px 18px -8px rgba(0, 0, 0, 0.5);
  --in: 0;
  --spread: calc(1 + var(--fan) * 0.55 + var(--scatter) * 4.5);
  opacity: calc(1 - var(--in));
  transform:
    translateY(calc(var(--in) * 90px + var(--scatter) * var(--lift)))
    rotateY(calc(var(--px) * 14deg)) rotateX(calc(var(--py) * -10deg))
    translate(calc(var(--dx) * var(--spread)), calc(var(--dy) * var(--spread)))
    rotate(calc(var(--r) * (1 + var(--fan) * 0.6 + var(--scatter) * 4.5) * (1 - var(--in))))
    scale(calc(1 - var(--in) * 0.08));
  transition: transform 0.9s var(--ease-out), box-shadow 0.6s var(--ease-out);
}
.stage.is-intro .shot,
.stage.is-scrub .shot,
.stage.is-scrub .medal { transition: none; }
.shot img { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; }
.shot figcaption {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.6rem 0.85rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--ink);
  background: var(--surface);
  border-top: 1px solid var(--hair);
}
.shot figcaption .mono { color: var(--green-light); font-weight: 400; }

.shot--0 { --dx: -4%; --dy: -6%; --r: -7deg; --lift: -260px; top: 4%; left: 0; }
.shot--1 { --dx: 5%; --dy: -2%; --r: 5deg; --lift: -90px; top: 16%; right: 0; }
.shot--2 { --dx: 0%; --dy: 6%; --r: -3deg; --lift: 140px; bottom: 6%; left: 11%; z-index: 2; }

.medal {
  position: absolute;
  z-index: 3;
  top: 0;
  right: 6%;
  width: clamp(88px, 11vw, 124px);
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 28%, rgba(0, 168, 107, 0.28), var(--surface) 65%);
  border: 1px solid var(--hair-strong);
  box-shadow: 0 18px 40px -12px rgba(0, 0, 0, 0.7), inset 0 2px 24px rgba(0, 168, 107, 0.18);
  translate: calc(var(--px) * 18px) calc(var(--py) * 18px - var(--scatter) * 160px);
  transition: translate 0.9s var(--ease-out);
}
.medal img { width: 52%; filter: drop-shadow(0 4px 14px rgba(0, 168, 107, 0.55)); transform-origin: 52% 88%; }
.stage:hover .medal img { animation: wave 1.3s ease-in-out; }
.medal-ring {
  position: absolute;
  inset: -9%;
  border-radius: 50%;
  border: 1px solid rgba(0, 168, 107, 0.2);
  border-top-color: var(--green-light);
}
@keyframes wave {
  15% { transform: rotate(-16deg); }
  30% { transform: rotate(12deg); }
  45% { transform: rotate(-10deg); }
  60% { transform: rotate(6deg); }
}

.facts {
  grid-area: facts;
  list-style: none;
  margin: 0;
  padding: 1.4rem 0 0;
  border-top: 1px solid var(--hair);
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem 2rem;
}
.facts li { display: flex; flex-direction: column; gap: 0.2rem; font-weight: 600; color: var(--ink); }
.facts .mono { font-size: 0.8rem; font-weight: 400; color: var(--green-light); }

/* ── Sections ─────────────────────────────────── */
.sec { padding-top: var(--section); }
.sec--near { padding-top: var(--section-near); }
.sec--far { padding-top: var(--section-far); }

.more {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-weight: 600;
  text-decoration: none;
}
.more svg { transition: transform 0.35s var(--ease-out); }
.more:hover svg { transform: translateX(4px); }

/* Picks: one lead, two stacked, one wide */
/* Picks: one wide row, then two square-ish cards. Screenshots stay 16:9. */
.picks {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1rem, 2vw, 1.5rem);
}
.pick {
  display: flex;
  align-items: center;
  color: inherit;
  text-decoration: none;
  border-radius: 18px;
  background: var(--surface);
  border: 1px solid var(--hair);
  overflow: hidden;
  transition: border-color 0.3s ease, transform 0.6s var(--ease-out), box-shadow 0.6s var(--ease-out);
}
.pick:hover {
  color: inherit;
  border-color: var(--hair-strong);
  transform: translateY(-4px);
  box-shadow: 0 24px 50px -24px rgba(0, 168, 107, 0.45);
}
.pick:first-child { grid-column: 1 / -1; }
.pick:not(:first-child) { flex-direction: column; align-items: stretch; }
.pick-img { flex: 0 0 56%; overflow: hidden; background: var(--surface-2); }
.pick:not(:first-child) .pick-img { flex: none; }
.pick:not(:first-child) .pick-body { align-content: start; padding: 1.5rem clamp(1.4rem, 2.5vw, 2rem) 1.75rem; }
.pick-img img { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; transition: scale 1s var(--ease-out); }
.pick:hover .pick-img img { scale: 1.035; }
.pick-body { flex: 1; padding: 2rem clamp(1.4rem, 3.5vw, 3.25rem); display: grid; gap: 0.6rem; align-content: center; }
.pick h3 { font-size: clamp(1.4rem, 2.2vw, 1.9rem); }
.pick h3 svg { display: inline; margin-left: 0.3em; vertical-align: -0.05em; color: var(--green-light); transition: transform 0.35s var(--ease-out); }
.pick:hover h3 svg { transform: translate(3px, -3px); }
.pick p { color: var(--ink-2); max-width: 52ch; }
.pick .meta { color: var(--ink-3); font-size: 0.78rem; margin-top: 0.25rem; }

/* Offers: plain rows, no card grid */
.offers { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--hair); }
.offer {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr) minmax(0, 0.7fr);
  gap: 0.75rem 2.5rem;
  align-items: baseline;
  position: relative;
  padding: clamp(1.6rem, 3vw, 2.4rem) 0;
}
.rule {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: linear-gradient(90deg, var(--green), var(--hair) 40%);
  transform-origin: left;
}
.offer h3 { font-size: clamp(1.35rem, 2.3vw, 1.9rem); letter-spacing: -0.03em; }
.offer p { color: var(--ink-2); }
.ex { font-size: 0.95rem; }
.ex-label { display: block; color: var(--ink-3); font-size: 0.82rem; font-weight: 600; margin-bottom: 0.2rem; }

/* Path + stack */
.path-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: start;
}
.path { list-style: none; margin: 0; padding: 0 0 0 1.75rem; position: relative; }
.path-track {
  position: absolute;
  left: 0.3rem;
  top: 0.5rem;
  bottom: 0.5rem;
  width: 2px;
  border-radius: 2px;
  background: var(--hair);
}
.path-progress {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(180deg, var(--green-light), var(--green));
  box-shadow: 0 0 12px rgba(0, 168, 107, 0.6);
  transform-origin: top;
}
.path li { position: relative; }
.path li::before {
  content: '';
  position: absolute;
  left: calc(-1.75rem + 0.3rem - 4px);
  top: 1.95rem;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--bg);
  border: 2px solid var(--hair-strong);
  transition: background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
}
.path li:first-child::before { top: 0.55rem; }
.path li.on::before { background: var(--green); border-color: var(--green-light); box-shadow: 0 0 0 5px rgba(0, 168, 107, 0.15); }
.path li .when { transition: color 0.4s ease; }

.js .path li:not(.on) .when { color: var(--ink-3); }
.path li {
  display: grid;
  grid-template-columns: 9.5rem minmax(0, 1fr);
  gap: 0.5rem 1.5rem;
  padding: 1.6rem 0;
  border-top: 1px solid var(--hair);
}
.path li:first-child { border-top: 0; padding-top: 0.2rem; }
.when { color: var(--green-light); font-size: 0.85rem; padding-top: 0.3rem; }
.path h3 { font-size: 1.2rem; letter-spacing: -0.02em; line-height: 1.3; }
.org { color: var(--ink-3); font-weight: 600; }
.path p { color: var(--ink-2); margin-top: 0.45rem; max-width: 60ch; }

.stack {
  position: sticky;
  top: 6.5rem;
  padding: 1.6rem;
  border-radius: 18px;
  background: var(--surface);
  border: 1px solid var(--hair);
}
.stack h3 { font-size: 1.15rem; letter-spacing: -0.02em; }
.stack dl { margin: 1.2rem 0 1.5rem; display: grid; gap: 1.1rem; }
.stack dt { font-size: 0.85rem; font-weight: 700; color: var(--ink-3); margin-bottom: 0.45rem; }
.stack dd { margin: 0; display: flex; flex-wrap: wrap; gap: 0.4rem; }
.chip {
  padding: 0.28rem 0.6rem;
  border-radius: 999px;
  font-size: 0.78rem;
  color: var(--ink);
  background: var(--surface-2);
  border: 1px solid var(--hair);
}
.cv { width: 100%; justify-content: center; }

/* Travels strip */
.strip {
  list-style: none;
  margin: 0;
  padding: 0 var(--gutter) 0.5rem;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: clamp(220px, 22vw, 300px);
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: var(--gutter);
  scrollbar-width: thin;
  max-width: calc(var(--max) + 2 * var(--gutter));
  margin-inline: auto;
}
.strip.is-pinned {
  overflow: visible;
  max-width: none;
  position: relative;
  grid-auto-columns: clamp(260px, 24vw, 360px);
  padding-inline: max(var(--gutter), calc((100vw - var(--max)) / 2 + var(--gutter)));
  will-change: transform;
}
.off { overflow: hidden; }
.strip li { scroll-snap-align: start; display: grid; gap: 0.6rem; }
.strip li:nth-child(even) { margin-top: 2.5rem; }
.strip img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: 14px;
  filter: saturate(0.85);
  transition: filter 0.5s ease;
}
.strip li:hover img { filter: saturate(1.05); }
.strip .mono { font-size: 0.76rem; color: var(--ink-3); }

/* Close */
.close {
  margin-top: var(--section);
  padding: var(--section) 0;
  position: relative;
  overflow: hidden;
  border-top: 1px solid var(--hair);
  background:
    radial-gradient(ellipse 60% 70% at 18% 50%, rgba(0, 168, 107, 0.16), transparent 70%),
    var(--bg);
}
.close::after {
  content: '';
  position: absolute;
  right: -6%;
  top: -10%;
  width: 46%;
  height: 130%;
  background: url('/assets/hex.svg') center / cover no-repeat;
  opacity: 0.12;
  mask-image: linear-gradient(90deg, transparent, #000 60%);
  pointer-events: none;
}
.close-inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.3fr);
  align-items: center;
  gap: clamp(2rem, 6vw, 6rem);
}
.orb {
  position: relative;
  width: min(100%, 340px);
  aspect-ratio: 1;
  margin-inline: auto;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background:
    radial-gradient(circle at 35% 28%, rgba(0, 168, 107, 0.2), rgba(18, 28, 25, 0.7) 60%),
    linear-gradient(160deg, var(--surface), var(--surface-3));
  border: 1px solid var(--hair-strong);
  box-shadow: inset 0 2px 30px rgba(0, 168, 107, 0.14), 0 40px 80px -20px rgba(0, 0, 0, 0.6), 0 0 80px rgba(0, 168, 107, 0.16);
}
.orb img { width: 42%; filter: drop-shadow(0 6px 22px rgba(0, 168, 107, 0.55)); transform-origin: 52% 88%; }
.orb:hover img { animation: wave 1.3s ease-in-out; }
.orb-ring { position: absolute; border-radius: 50%; pointer-events: none; }
.orb-ring--a { inset: -8%; border: 1px solid rgba(0, 168, 107, 0.2); border-top-color: var(--green-light); }
.orb-ring--b { inset: 5%; border: 1px dashed rgba(0, 168, 107, 0.16); border-bottom-color: rgba(0, 168, 107, 0.5); }

.close h2 { font-size: clamp(2.2rem, 4.8vw, 4rem); letter-spacing: -0.04em; max-width: 14ch; }
.close p { margin-top: 1.2rem; color: var(--ink-2); font-size: 1.1rem; max-width: 46ch; }
.close p.aside { margin-top: 0.8rem; color: var(--ink-3); font-size: 0.95rem; }
.mail {
  display: inline-block;
  margin-top: 1.8rem;
  font-size: clamp(1.5rem, 3.4vw, 2.6rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--green-light);
  text-decoration: underline;
  text-decoration-color: var(--hair-strong);
  text-decoration-thickness: 2px;
  text-underline-offset: 0.18em;
  overflow-wrap: anywhere;
}
.mail:hover { color: var(--ink); text-decoration-color: var(--green); }
.close .actions { margin-top: 1.8rem; }

/* ── Responsive ───────────────────────────────── */
@media (max-width: 900px) {
  .hero {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: 'copy' 'stage' 'facts';
    min-height: 0;
    padding-top: 2.5rem;
  }
  .stage { width: min(86%, 520px); margin-inline: auto; aspect-ratio: 1 / 0.85; }
  .picks { grid-template-columns: minmax(0, 1fr); }
  .pick { flex-direction: column; align-items: stretch; }
  .pick-img { flex: none; }
  .pick .pick-body { padding: 1.25rem 1.4rem 1.4rem; }
  .offer { grid-template-columns: minmax(0, 1fr); }
  .path-grid { grid-template-columns: minmax(0, 1fr); }
  .stack { position: static; }
  .close-inner { grid-template-columns: minmax(0, 1fr); }
  .orb { width: 180px; }
}

@media (max-width: 560px) {
  .facts { grid-template-columns: minmax(0, 1fr); gap: 0.9rem; }
  .path li { grid-template-columns: minmax(0, 1fr); }
  .strip li:nth-child(even) { margin-top: 0; }
  .close .actions .btn { flex: 1 1 100%; justify-content: center; }
}
</style>
