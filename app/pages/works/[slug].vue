<script setup lang="ts">
import { localize, projects } from '~/data/works'
import { gsap, MOTION_OK, revealLines, useMotion } from '~/utils/motion'

const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const src = projects.find(p => p.slug === route.params.slug)
if (!src) throw createError({ statusCode: 404, statusMessage: t('work.notFound'), fatal: true })
const w = computed(() => localize(src, locale.value))

const kindLabel = computed(() => ({ 'cliente': t('common.kind.client'), 'open-source': 'Open source', 'personale': t('common.kind.personal') }))

useSeoMeta({
  title: src.title,
  description: () => w.value.description,
  ogTitle: `${src.title} · HeyAtom`,
  ogDescription: () => w.value.description,
  ogImage: `${useRuntimeConfig().public.siteUrl}/og/works/${src.slug}.jpg`,
  ogImageAlt: `HeyAtom: ${src.title}, ${src.year}`,
})

// Similar: most shared stack entries, newest first on ties.
const similar = projects
  .filter(p => p.slug !== src.slug)
  .map(p => ({ p, score: p.stack.filter(s => src.stack.includes(s)).length }))
  .filter(x => x.score > 0)
  .sort((a, b) => b.score - a.score || b.p.year - a.p.year)
  .slice(0, 3)
  .map(x => x.p)

// Lightbox on a native <dialog>: Esc, focus trap and backdrop come for free.
const shots = computed(() => w.value.images ?? [])
const box = ref<HTMLDialogElement>()
const at = ref(0)
function show(i: number) {
  at.value = i
  box.value?.showModal()
}
const step = (d: number) => { at.value = (at.value + d + shots.value.length) % shots.value.length }
function key(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft') step(-1)
  if (e.key === 'ArrowRight') step(1)
}

const root = ref<HTMLElement>()
useMotion(root, (mm, el) => {
  const q = gsap.utils.selector(el)
  mm.add(MOTION_OK, () => {
    gsap.timeline({ defaults: { ease: 'expo.out' } })
      .from(q('.head > *'), { y: 30, stagger: 0.07, duration: 1.1 })
      .fromTo(q('.hero'), { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.inOut' }, 0.2)
    gsap.set(q('.hero'), { autoAlpha: 1 })
    q('.body h2, .similar h2').forEach(h => revealLines(h))
    gsap.from(q('.shots li, .sim-list li'), {
      y: 30, autoAlpha: 0, stagger: 0.05, duration: 0.9, ease: 'expo.out',
      scrollTrigger: { trigger: q('.shots, .sim-list')[0], start: 'top 85%' },
    })
  })
})
</script>

<template>
  <div ref="root" class="wrap page">
    <NuxtLink :to="localePath('/works')" class="back mono">← {{ t('common.allWorks') }}</NuxtLink>

    <header class="head hexed">
      <p class="meta mono">
        {{ w.year }} · {{ kindLabel[w.kind] }}<template v-if="w.current"> · <em>{{ t('common.ongoing') }}</em></template>
      </p>
      <h1>{{ w.title }}</h1>
      <p class="client">{{ w.client }}</p>
      <div class="links">
        <a v-if="w.website" class="btn btn--primary" :href="w.website" target="_blank" rel="noopener">
          {{ t('common.visitSite') }} <Icon name="arrow-up-right" />
        </a>
        <a v-if="w.github" class="btn btn--ghost" :href="w.github" target="_blank" rel="noopener">
          <Icon name="github" /> {{ t('common.code') }}
        </a>
        <span v-if="!w.website && !w.github" class="private">{{ t('common.private') }}</span>
      </div>
    </header>

    <img
      class="hero" data-intro
      :src="img(w.preview!, 1280)" :srcset="srcset(w.preview!, [640, 960, 1280, 1920])" sizes="(max-width: 1240px) 92vw, 1150px"
      :alt="`${t('common.screenshotOf', { title: w.title })}`" width="1920" height="1080" fetchpriority="high"
    >

    <div class="body">
      <section aria-labelledby="about">
        <h2 id="about">{{ t('work.about') }}</h2>
        <p class="desc">{{ w.description }}</p>
        <ul v-if="w.features.length" class="feats">
          <li v-for="f in w.features" :key="f">{{ f }}</li>
        </ul>
      </section>
      <aside>
        <p class="label mono">Stack</p>
        <ul class="stack">
          <li v-for="s in w.stack" :key="s" class="mono">{{ s }}</li>
        </ul>
      </aside>
    </div>

    <section v-if="shots.length" class="gallery" aria-labelledby="shots-title">
      <h2 id="shots-title">{{ t('common.screenshots') }} <span class="mono count">{{ shots.length }}</span></h2>
      <ul class="shots">
        <li v-for="(s, i) in shots" :key="s.image">
          <button type="button" @click="show(i)">
            <img :src="img(s.image, 640)" :alt="s.title || `${t('work.screenshotN', { n: i + 1, title: w.title })}`" width="640" height="400" loading="lazy">
            <span v-if="s.title">{{ s.title }}</span>
          </button>
        </li>
      </ul>
    </section>

    <section v-if="similar.length" class="similar" aria-labelledby="sim-title">
      <div class="sim-head">
        <h2 id="sim-title">{{ t('work.similar') }}</h2>
        <NuxtLink :to="localePath('/works')" class="more">{{ t('common.allWorks') }} <Icon name="arrow-right" /></NuxtLink>
      </div>
      <ul class="sim-list">
        <li v-for="p in similar" :key="p.slug">
          <NuxtLink :to="localePath(`/works/${p.slug}`)">
            <img :src="img(p.preview!, 640)" :alt="`${t('common.screenshotOf', { title: p.title })}`" width="640" height="360" loading="lazy">
            <span class="mono year">{{ p.year }}</span>
            <strong>{{ p.title }}</strong>
            <span class="mono tags">{{ p.stack.slice(0, 3).join(' · ') }}</span>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <dialog v-if="shots.length" ref="box" class="box" :aria-label="t('common.screenshots')" @keydown="key" @click.self="box?.close()">
      <figure>
        <img :src="img(shots[at]!.image, 1920)" :alt="shots[at]!.title || `${t('work.screenshotN', { n: at + 1, title: w.title })}`">
        <figcaption class="mono">
          <span v-if="shots[at]!.title">{{ shots[at]!.title }}</span>
          <span class="n">{{ at + 1 }} / {{ shots.length }}</span>
        </figcaption>
      </figure>
      <button type="button" class="nav close" :aria-label="t('work.close')" @click="box?.close()">
        <Icon name="plus" :size="22" />
      </button>
      <template v-if="shots.length > 1">
        <button type="button" class="nav prev" :aria-label="t('work.prev')" @click="step(-1)">
          <Icon name="arrow-right" :size="20" />
        </button>
        <button type="button" class="nav next" :aria-label="t('work.next')" @click="step(1)">
          <Icon name="arrow-right" :size="20" />
        </button>
      </template>
    </dialog>
  </div>
</template>

<style scoped>
.page { padding-top: clamp(2rem, 6vh, 4rem); }

.back { display: inline-block; font-size: 0.85rem; color: var(--ink-3); text-decoration: none; margin-bottom: 2rem; }
.back:hover { color: var(--green-light); }

.head { display: grid; gap: 0.75rem; margin-bottom: clamp(2rem, 4vw, 3rem); }
.meta { font-size: 0.85rem; color: var(--green-light); }
.meta em { font-style: normal; }
.head h1 {
  font-size: clamp(3rem, 8vw, 5.5rem);
  font-weight: 800;
  letter-spacing: -0.05em;
  line-height: 0.95;
}
.client { color: var(--ink-2); font-size: 1.1rem; }
.links { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 0.75rem; }
.links .btn { padding: 0.75rem 1.2rem; font-size: 0.93rem; }
.private { color: var(--ink-3); font-size: 0.92rem; }

.hero {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: var(--r-lg);
  border: 1px solid var(--hair-strong);
  background: var(--surface-2);
  box-shadow: 0 40px 80px -40px rgb(0 0 0 / calc(0.9 * var(--shade)));
}

.body {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
  gap: 2rem clamp(2rem, 6vw, 5rem);
  margin-top: var(--section-near);
}
.body h2, .gallery h2, .similar h2 { font-size: clamp(1.6rem, 3vw, 2.25rem); margin-bottom: 1.25rem; }
.desc { color: var(--ink-2); font-size: 1.08rem; max-width: 65ch; }
.feats, .stack { list-style: none; margin: 1.5rem 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 0.4rem; }
.feats li, .stack li {
  padding: 0.3rem 0.75rem;
  border-radius: var(--r-sm);
  font-size: 0.85rem;
  color: var(--ink);
  background: var(--surface-2);
  border: 1px solid var(--hair);
}
aside {
  align-self: start;
  padding: 1.4rem;
  border-radius: var(--r-lg);
  background: var(--surface);
  border: 1px solid var(--hair);
}
.label { font-size: 0.75rem; color: var(--ink-3); }
.stack { margin-top: 0.75rem; }
.stack li { font-size: 0.78rem; }

.gallery { margin-top: var(--section-near); }
.count { font-size: 0.9rem; color: var(--green-light); vertical-align: super; font-weight: 400; }
.shots {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr));
  gap: clamp(0.75rem, 1.5vw, 1.25rem);
}
.shots button {
  all: unset;
  display: grid;
  gap: 0.5rem;
  width: 100%;
  cursor: zoom-in;
  border-radius: var(--r-sm);
}
.shots img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: top;
  border-radius: var(--r-sm);
  border: 1px solid var(--hair);
  background: var(--surface-2);
  transition: translate 0.4s var(--ease-out), border-color 0.2s ease, box-shadow 0.4s var(--ease-out);
}
.shots button:hover img { translate: 0 -4px; border-color: var(--hair-strong); box-shadow: 0 24px 40px -24px rgb(0 0 0 / calc(0.9 * var(--shade))); }
.shots button:focus-visible { outline: 2px solid var(--green-light); outline-offset: 3px; }
.shots span { font-size: 0.88rem; color: var(--ink-3); padding-inline: 0.25rem; }

.similar { margin: var(--section) 0; padding-top: var(--section-near); border-top: 1px solid var(--hair); }
.sim-head { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 1rem; }
.more { display: inline-flex; align-items: center; gap: 0.4rem; font-weight: 600; text-decoration: none; }
.sim-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(0.75rem, 1.5vw, 1.25rem);
}
.sim-list a {
  display: grid;
  gap: 0.3rem;
  padding: 0.75rem 0.75rem 1.1rem;
  border-radius: var(--r-lg);
  background: var(--surface);
  border: 1px solid var(--hair);
  color: inherit;
  text-decoration: none;
  transition: border-color 0.2s ease, translate 0.4s var(--ease-out);
}
.sim-list a:hover { border-color: var(--hair-strong); translate: 0 -4px; }
.sim-list img { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; border-radius: var(--r-sm); margin-bottom: 0.6rem; }
.sim-list .year { font-size: 0.8rem; color: var(--green-light); }
.sim-list strong { font-size: 1.25rem; letter-spacing: -0.02em; }
.sim-list .tags { font-size: 0.78rem; color: var(--ink-3); }

.box {
  width: 100vw;
  height: 100dvh;
  max-width: none;
  max-height: none;
  margin: 0;
  padding: clamp(1rem, 4vw, 3rem);
  border: 0;
  background: transparent;
  color: var(--ink);
}
.box[open] { display: grid; place-items: center; }
.box::backdrop { background: rgba(10, 12, 10, 0.94); backdrop-filter: blur(6px); }
.box figure { margin: 0; display: grid; gap: 0.9rem; justify-items: center; pointer-events: none; }
.box figure img {
  max-width: min(100%, 1600px);
  max-height: calc(100dvh - 8rem);
  object-fit: contain;
  border-radius: var(--r-sm);
  pointer-events: auto;
}
.box figcaption { display: flex; gap: 1rem; font-size: 0.85rem; color: var(--ink-2); }
.box .n { color: var(--ink-3); }
.nav {
  position: fixed;
  width: 3rem;
  height: 3rem;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid var(--hair-strong);
  background: var(--surface);
  color: var(--ink);
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}
.nav:hover { background: var(--green); color: var(--on-green); }
.close { top: 1rem; right: 1rem; rotate: 45deg; }
.prev, .next { top: 50%; translate: 0 -50%; }
.prev { left: 1rem; rotate: 180deg; }
.next { right: 1rem; }

@media (max-width: 900px) {
  .body { grid-template-columns: minmax(0, 1fr); }
  .sim-list { grid-template-columns: minmax(0, 1fr); }
  .prev, .next { top: auto; bottom: 1rem; translate: none; }
}
</style>
