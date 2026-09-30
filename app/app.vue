<script setup lang="ts">
const site = useRuntimeConfig().public.siteUrl
const route = useRoute()
const url = computed(() => site + route.path)

// Hide intro elements before first paint only when motion will reveal them.
useHead({
  script: [{
    innerHTML: 'if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("js")',
    tagPosition: 'head',
  }],
  link: [{ rel: 'canonical', href: url }],
})

// Share defaults: crawlers need absolute URLs. Pages override title/description.
useSeoMeta({
  ogType: 'website',
  ogSiteName: 'HeyAtom',
  ogLocale: 'it_IT',
  ogUrl: url,
  ogImage: `${site}/og.jpg`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/jpeg',
  ogImageAlt: 'HeyAtom: Andrea Tombolato, siti e web app su misura',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <SiteHeader />
  <main id="main">
    <NuxtPage />
  </main>
  <SiteFooter />
</template>
