// Crawlers always get the Italian root: Google advises against language redirects for bots,
// and hreflang + x-default already point them to /en. Humans keep the browser-language redirect.
const BOT = /bot|crawl|spider|slurp|facebookexternalhit|linkedinbot|twitterbot|whatsapp|telegrambot|preview/i

export default defineEventHandler((event) => {
  if (BOT.test(getRequestHeader(event, 'user-agent') ?? '')) delete event.node.req.headers['accept-language']
})
