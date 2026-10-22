<script setup lang="ts">
const { t, locale, setLocaleCookie } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const colorMode = useColorMode()
const light = computed(() => colorMode.value === 'light')
const toggleTheme = () => { colorMode.preference = light.value ? 'dark' : 'light' }
</script>

<template>
  <footer class="ftr hexed">
    <div class="wrap row">
      <p class="me">
        <img src="/favicon.svg" alt="" width="22" height="22">
        {{ t('footer.bio') }}
      </p>
      <div class="prefs">
        <div class="lang" role="group" :aria-label="t('footer.language')">
          <!-- Plain links: a full load renders the page in the new language (GSAP's split text can't be patched live).
               The cookie goes first, or / would bounce an English visitor back to /en.
               Hash dropped: the server never sees it, so keeping it would break hydration. -->
          <a v-for="l in ['it', 'en']" :key="l" :href="switchLocalePath(l).split('#')[0]" :lang="l" :hreflang="l" :aria-current="locale === l ? 'true' : undefined" :aria-label="l === 'it' ? 'Italiano' : 'English'" @click="setLocaleCookie(l)">{{ l.toUpperCase() }}</a>
        </div>
        <!-- The server can't know the OS theme on a first visit (no cookie yet): render the toggle on the client only,
             or a light visitor would get the "switch to light" icon and label. The placeholder keeps the row from shifting. -->
        <ClientOnly>
          <template #fallback><span class="theme" aria-hidden="true" /></template>
          <button type="button" class="theme" :aria-label="t(light ? 'nav.toDark' : 'nav.toLight')" :title="t(light ? 'nav.toDark' : 'nav.toLight')" @click="toggleTheme">
            <svg v-if="light" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" /></svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
          </button>
        </ClientOnly>
      </div>
      <ul>
        <li><a href="https://github.com/andreacw5" rel="me">GitHub</a></li>
        <li><a href="https://www.linkedin.com/in/atombolato" rel="me">LinkedIn</a></li>
        <li><NuxtLink :to="localePath('/uses')" lang="en">Uses</NuxtLink></li>
        <li><a href="https://status.heyatom.dev/en">Status</a></li>
        <li><a href="mailto:hey@heyatom.dev">hey@heyatom.dev</a></li>
      </ul>
      <p class="tag"><span lang="en">Code meets personality</span> · {{ new Date().getFullYear() }}</p>
    </div>
  </footer>
</template>

<style scoped>
.ftr {
  border-top: 1px solid var(--hair);
  padding: 2.25rem 0 2.75rem;
  color: var(--ink-3);
  font-size: var(--text-label);
  overflow: hidden;
  --hex-inset: 0 0 0 60%;
  --hex-o: 0.09;
}
.row {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 1.25rem 2rem;
}
.row p { margin: 0; }
.me { display: inline-flex; align-items: center; gap: 0.6rem; color: var(--ink-2); }
ul { display: flex; flex-wrap: wrap; gap: 0.5rem 1.4rem; list-style: none; margin: 0; padding: 0; }
a { color: var(--ink-2); text-decoration: none; }
a:hover { color: var(--green-light); }
.me img { transition: transform 0.5s var(--ease-out); transform-origin: 50% 85%; }
.me:hover img { transform: rotate(-12deg); }
.tag { font-size: var(--text-sm); }
@media (max-width: 640px) {
  .row { grid-template-columns: 1fr; }
}
.lang { display: inline-flex; gap: 0.2rem; }
.lang a {
  font-weight: 600;
  padding: 0.1rem 0.45rem;
  border: 1px solid transparent;
  border-radius: var(--r-sm);
  color: var(--ink-3);
}
.lang a:hover { color: var(--green-light); }
.lang a[aria-current] { color: var(--ink); border-color: var(--hair); }
.prefs { display: inline-flex; align-items: center; gap: 0.6rem; }
.theme {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: 1px solid transparent;
  border-radius: var(--r-sm);
  background: none;
  color: var(--ink-3);
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease;
}
.theme:hover { color: var(--green-light); border-color: var(--hair); }
.theme svg { width: 1.1em; height: 1.1em; } /* scales with enlarged text */
/* Touch: 44px targets; the text links grow in height only, so the row keeps its rhythm. */
@media (pointer: coarse) {
  .lang a, .theme { display: inline-grid; place-items: center; min-width: 44px; min-height: 44px; }
  ul { row-gap: 0; }
  ul a { display: inline-block; padding-block: 0.75rem; }
}
</style>
