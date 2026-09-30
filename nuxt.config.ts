export default defineNuxtConfig({
  compatibilityDate: '2026-09-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/google-fonts'],
  css: ['~/assets/main.css'],
  googleFonts: {
    families: { Manrope: [400, 500, 600, 700, 800], 'JetBrains Mono': [400, 600] },
    display: 'swap',
    download: true,
  },
  runtimeConfig: {
    public: { freelanceAvailable: 'true', siteUrl: 'https://heyatom.dev' },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'it' },
      titleTemplate: '%s · HeyAtom',
      meta: [
        { name: 'theme-color', content: '#0d1412' },
        { name: 'color-scheme', content: 'dark' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
})
