import { editionAt, editionSrc } from '~/data/editions'

// The hand to show today: the seasonal edition if one is running, the plain mark otherwise.
// Picked once on the server and shared through useState, so hydration never swaps it.
export const useMark = () => useState('mark', () => {
  const e = editionAt(new Date())
  return e ? editionSrc(e.id) : '/favicon.svg'
})
