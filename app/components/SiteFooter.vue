<script setup lang="ts">
const { t, locale, setLocaleCookie } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <footer class="ftr hexed">
    <div class="wrap row">
      <p>
        <img src="/favicon.svg" alt="" width="22" height="22">
        {{ t('footer.bio') }}
      </p>
      <ul>
        <li><a href="https://github.com/andreacw5" rel="me noopener" target="_blank">GitHub</a></li>
        <li><a href="https://www.linkedin.com/in/atombolato" rel="me noopener" target="_blank">LinkedIn</a></li>
        <li><NuxtLink :to="localePath('/uses')">Uses</NuxtLink></li>
        <li><a href="mailto:hey@heyatom.dev">hey@heyatom.dev</a></li>
        <li class="lang" role="group" :aria-label="t('footer.language')">
          <!-- Plain links: a full load renders the page in the new language (GSAP's split text can't be patched live).
               The cookie goes first, or / would bounce an English visitor back to /en. -->
          <a v-for="l in ['it', 'en']" :key="l" :href="switchLocalePath(l)" :lang="l" :hreflang="l" :aria-current="locale === l ? 'true' : undefined" @click="setLocaleCookie(l)">{{ l.toUpperCase() }}</a>
        </li>
      </ul>
      <p class="tag">Code meets personality · {{ new Date().getFullYear() }}</p>
    </div>
  </footer>
</template>

<style scoped>
.ftr {
  border-top: 1px solid var(--hair);
  padding: 2.25rem 0 2.75rem;
  color: var(--ink-3);
  font-size: 0.92rem;
  overflow: hidden;
  --hex-inset: 0 0 0 60%;
  --hex-o: 0.09;
}
.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem 2rem;
}
.row p:first-child { display: inline-flex; align-items: center; gap: 0.6rem; color: var(--ink-2); }
ul { display: flex; gap: 1.4rem; list-style: none; margin: 0; padding: 0; }
a { color: var(--ink-2); text-decoration: none; }
a:hover { color: var(--green-light); }
.row p:first-child img { transition: transform 0.5s var(--ease-out); transform-origin: 50% 85%; }
.row p:first-child:hover img { transform: rotate(-12deg); }
.tag { font-size: 0.85rem; }
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
</style>
