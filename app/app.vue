<script setup lang="ts">
const site = useRuntimeConfig().public.siteUrl
const route = useRoute()
const url = computed(() => site + route.path)
const { t } = useI18n()
// hreflang alternates, og:locale and <html lang> for the current locale.
const i18nHead = useLocaleHead({ seo: true })
const colorMode = useColorMode()

// Hide intro elements before first paint only when motion will reveal them.
useHead(() => ({
  htmlAttrs: i18nHead.value.htmlAttrs,
  meta: [...(i18nHead.value.meta ?? []), { name: 'theme-color', content: colorMode.value === 'light' ? '#f3f5f3' : '#1e201e' }],
  script: [{
    // `intro-seen`: later page loads in the session replay the home intro faster.
    innerHTML: 'var d=document.documentElement;if(!matchMedia("(prefers-reduced-motion: reduce)").matches)d.classList.add("js");try{if(sessionStorage.getItem("intro"))d.classList.add("intro-seen");sessionStorage.setItem("intro","1")}catch(e){}',
    tagPosition: 'head',
  }],
  link: [...(i18nHead.value.link ?? []), { rel: 'canonical', href: url.value }, { rel: 'preload', as: 'image', href: '/assets/hex.svg' }],
}))

// Structured data: one Person for the whole site.
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Andrea Tombolato',
      alternateName: 'HeyAtom',
      url: site,
      image: `${site}/og.jpg`,
      email: 'mailto:hey@heyatom.dev',
      jobTitle: 'Full-stack developer',
      sameAs: ['https://github.com/andreacw5', 'https://www.linkedin.com/in/atombolato'],
    }),
  }],
})

// Share defaults: crawlers need absolute URLs. Pages override title/description.
useSeoMeta({
  ogType: 'website',
  ogSiteName: 'HeyAtom',
  ogUrl: url,
  ogImage: `${site}/og.jpg`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/jpeg',
  ogImageAlt: () => t('seo.ogImageAlt'),
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <SiteHeader />
  <main id="main">
    <NuxtPage />
  </main>
  <SiteFooter />
</template>
