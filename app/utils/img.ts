// FileHarbor resizes on demand: ?width=N returns a WebP at that width.
// Local shots (public/shots) are static, so `pnpm shots` pre-renders <n>-<w>.webp for every width in SHOT_WIDTHS.
export const SHOT_WIDTHS = [640, 960, 1280, 1920]
const local = (url: string) => !url.startsWith('http')
export const img = (url: string, width: number) => local(url) ? url.replace('.webp', `-${width}.webp`) : `${url}?width=${width}`
export const srcset = (url: string, widths: number[]) => widths.map(w => `${img(url, w)} ${w}w`).join(', ')
