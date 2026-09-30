import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Pages mount during the transition; re-measure once it settles.
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:transition:finish', () => ScrollTrigger.refresh())
})
