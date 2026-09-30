import { projects } from '../../../app/data/works'

// Work detail pages come from the data, so a new project lands in the sitemap on its own.
// _i18nTransform adds the /en variant and the hreflang alternates.
export default defineSitemapEventHandler(() =>
  projects.map(w => ({ loc: `/works/${w.slug}`, _i18nTransform: true })),
)
