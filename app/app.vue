<script setup lang="ts">
// Hide intro elements before first paint only when motion will reveal them.
useHead({
  script: [{
    innerHTML: 'if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("js")',
    tagPosition: 'head',
  }],
})
</script>

<template>
  <SiteHeader />
  <main id="main">
    <NuxtPage />
  </main>
  <SiteFooter />
</template>
