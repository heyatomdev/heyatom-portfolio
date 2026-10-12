// Client-side navigation keeps focus on the clicked link in the persistent header/footer.
// Move it where a full page load would put the reading point: the hash target, else <main>.
export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()
  let hydrated = false
  let from: Element | null = null
  router.beforeEach(() => { from = document.activeElement })
  const land = () => {
    // The new page already placed focus itself (e.g. /works reopening a row on back).
    const now = document.activeElement
    if (now !== from && document.getElementById('main')?.contains(now)) return
    const hash = router.currentRoute.value.hash
    const el = (hash && document.getElementById(decodeURIComponent(hash.slice(1)))) || document.getElementById('main')
    if (!el) return
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
    el.focus({ preventScroll: true })
  }
  // New page rendered (skips the first one: a fresh load already starts at the top).
  nuxtApp.hook('page:finish', () => {
    if (hydrated) land()
    hydrated = true
  })
  // Same page, new hash (header "Percorso"/"Contatti"): no page:finish fires.
  router.afterEach((to, from) => {
    if (hydrated && to.path === from.path && to.hash && to.hash !== from.hash) nextTick(land)
  })
})
