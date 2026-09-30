<script setup lang="ts">
const site = useRuntimeConfig().public.siteUrl
const route = useRoute()
const url = computed(() => site + route.path)
const { t } = useI18n()
// hreflang alternates, og:locale and <html lang> for the current locale.
const i18nHead = useLocaleHead({ seo: true })

// Hide intro elements before first paint only when motion will reveal them.
useHead(() => ({
  htmlAttrs: i18nHead.value.htmlAttrs,
  meta: i18nHead.value.meta,
  script: [{
    innerHTML: 'if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("js")',
    tagPosition: 'head',
  }],
  link: [...(i18nHead.value.link ?? []), { rel: 'canonical', href: url.value }],
}))

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
  <SiteHeader />
  <main id="main">
    <NuxtPage />
  </main>
  <SiteFooter />
</template>
