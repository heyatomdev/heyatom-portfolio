<script setup lang="ts">
import { gsap, MOTION_OK, ScrollTrigger } from '~/utils/motion'

const available = useRuntimeConfig().public.freelanceAvailable === 'true'
const route = useRoute()
// Header slides away while reading down, returns on the way up; a hairline tracks page progress.
const hdr = ref<HTMLElement>()
const bar = ref<HTMLElement>()
let st: ScrollTrigger | undefined
let hidden = false
function slide(hide: boolean) {
  if (hide === hidden) return
  hidden = hide
  gsap.to(hdr.value!, { yPercent: hide ? -130 : 0, duration: 0.6, ease: 'expo.out' })
}
// Keyboard focus inside the header always brings it back.
const reveal = () => slide(false)
onMounted(() => {
  const setBar = gsap.quickSetter(bar.value!, 'scaleX')
  const motionOk = matchMedia(MOTION_OK)
  hdr.value!.addEventListener('focusin', reveal)
  st = ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      setBar(self.progress)
      slide(motionOk.matches && self.direction === 1 && self.scroll() > 240)
    },
  })
})
onBeforeUnmount(() => {
  st?.kill()
  hdr.value?.removeEventListener('focusin', reveal)
})
watch(() => route.fullPath, () => nextTick(() => st?.refresh()))

const anchors = [{ to: '/#percorso', label: 'Percorso' }, { to: '/#contatti', label: 'Contatti' }]
</script>

<template>
  <a class="skip" href="#main">Vai al contenuto</a>
  <header ref="hdr" class="hdr">
    <nav class="pill" aria-label="Principale">
      <NuxtLink to="/" class="brand" aria-label="HeyAtom, home">
        <img src="/favicon.svg" alt="" width="36" height="36">
        <span>HeyAtom</span>
      </NuxtLink>

      <ul class="links">
        <li><NuxtLink to="/works" :aria-current="route.path.startsWith('/works') ? 'page' : undefined">Lavori</NuxtLink></li>
        <li v-for="l in anchors" :key="l.to">
          <NuxtLink v-slot="{ href, navigate }" :to="l.to" custom>
            <a :href="href" @click="navigate">{{ l.label }}</a>
          </NuxtLink>
        </li>
      </ul>

      <span v-if="available && route.path !== '/'" class="avail" title="Disponibile per progetti freelance">
        <span class="dot" aria-hidden="true" />
        <span class="avail-txt">Disponibile</span>
      </span>
      <a class="btn btn--primary cta" href="mailto:hey@heyatom.dev">Scrivimi</a>
      <span class="progress" aria-hidden="true"><span ref="bar" /></span>
    </nav>
  </header>
</template>

<style scoped>
.skip {
  position: absolute;
  left: 1rem;
  top: -4rem;
  z-index: 100;
  padding: 0.6rem 1rem;
  background: var(--green);
  color: var(--on-green);
  border-radius: var(--r-sm);
  font-weight: 600;
}
.skip:focus { top: 1rem; }

.hdr {
  position: sticky;
  top: 0;
  z-index: 50;
  padding: 0.9rem var(--gutter) 0;
}

.pill {
  max-width: var(--max);
  margin-inline: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.45rem 0.45rem 0.9rem;
  border-radius: var(--r-sm);
  background: rgba(18, 28, 25, 0.72);
  border: 1px solid var(--hair);
  backdrop-filter: blur(18px) saturate(1.3);
  -webkit-backdrop-filter: blur(18px) saturate(1.3);
  box-shadow: 0 10px 30px -12px rgba(0, 0, 0, 0.6);
}

.pill { position: relative; }
.progress {
  position: absolute;
  left: 1.4rem;
  right: 1.4rem;
  bottom: -1px;
  height: 2px;
  overflow: hidden;
  border-radius: 2px;
  pointer-events: none;
}
.progress span {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--green-dark), var(--green-light));
  transform: scaleX(0);
  transform-origin: left;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  color: var(--ink);
  text-decoration: none;
  font-weight: 800;
  font-size: 1.3rem;
  letter-spacing: -0.02em;
  margin-right: auto;
}
.brand img { transition: transform 0.5s var(--ease-out); transform-origin: 50% 85%; }
.brand:hover img { transform: rotate(-12deg); }

.links {
  display: flex;
  gap: 0.15rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.links a {
  display: block;
  padding: 0.55rem 0.9rem;
  border-radius: var(--r-sm);
  color: var(--ink-2);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.93rem;
  transition: background-color 0.2s ease, color 0.2s ease;
}
.links a:hover,
.links a[aria-current='page'] { color: var(--ink); background: rgba(0, 168, 107, 0.12); }

.avail {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0 0.6rem 0 0.9rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--green-light);
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 0 0 rgba(0, 168, 107, 0.6);
  animation: ring 2.4s var(--ease-out) 3;
}
@keyframes ring { 70%, 100% { box-shadow: 0 0 0 8px rgba(0, 168, 107, 0); } }

.cta { padding: 0.7rem 1.2rem; font-size: 0.93rem; box-shadow: none; }

@media (max-width: 760px) {
  .links li:not(:first-child), .avail { display: none; }
  .links a { padding: 0.55rem 0.7rem; }
}
</style>
