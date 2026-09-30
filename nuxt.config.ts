export default defineNuxtConfig({
  compatibilityDate: '2026-09-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/google-fonts', '@nuxtjs/i18n'],
  css: ['~/assets/main.css'],
  googleFonts: {
    families: { Manrope: [400, 500, 600, 700, 800], 'JetBrains Mono': [400, 600] },
    display: 'swap',
    download: true,
  },
  i18n: {
    locales: [
      { code: 'it', language: 'it-IT', name: 'Italiano', file: 'it.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'it',
    // Italian stays on /, English lives under /en.
    strategy: 'prefix_except_default',
    baseUrl: 'https://heyatom.dev',
    // First visit to / follows the browser; the choice sticks in a cookie. Unsupported or missing language (crawlers) stays Italian.
    detectBrowserLanguage: { useCookie: true, cookieKey: 'lang', redirectOn: 'root', fallbackLocale: 'it' },
  },
  runtimeConfig: {
    public: { freelanceAvailable: 'false', siteUrl: 'https://heyatom.dev' },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      titleTemplate: '%s · HeyAtom',
      meta: [
        { name: 'theme-color', content: '#1e201e' },
        { name: 'color-scheme', content: 'dark' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
})
