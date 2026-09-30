import type { Work } from './works'

// English overrides for works.ts, kept apart so regenerating works.ts doesn't wipe them.
// `images` are gallery titles, in the same order as the Italian ones.
export type WorkEn = Partial<Pick<Work, 'role' | 'line' | 'client' | 'description' | 'features'>> & { images?: string[] }

const personal = 'Personal project'
const oss = 'Open source project'

export const worksEn: Record<string, WorkEn> = {
  'herald': {
    role: 'Email',
    line: 'Your site’s emails get delivered: automatic retries, delivery history with resend, weekly or monthly newsletters per language.',
    client: personal,
    description: 'Multi-tenant email service on Brevo: transactional sends with retries and error classification, an idempotency key against duplicate sends, delivery logs with resend and separate retention for message bodies, newsletters by frequency and language with signed unsubscribe webhooks. Per-tenant configuration encrypted with AES-256-GCM, access via Bastion JWTs.',
    features: ['Retries without duplicate sends', 'History and resend', 'Newsletters per language'],
  },
  'bastion': {
    role: 'Access and users',
    line: 'Password or social login, two-step verification, roles and an activity log. Every other service recognizes your users through here.',
    client: personal,
    description: 'The internal identity provider of the HeyAtom ecosystem: it issues app-scoped RS256 JWTs, so every service validates identity locally, with no call per request and no duplicated user database. OAuth, 2FA, multi-tenancy and centralized audit.',
    features: ['Google, Discord and Twitch', 'Two-step verification', 'Roles per app and organization', 'Sessions and activity log'],
  },
  'articuno': {
    role: 'Content and comments',
    line: 'Articles, categories and translations, with automatically moderated comments: banned words, reports, shadow bans.',
    client: oss,
    description: 'Multi-tenant CMS microservice built with NestJS, Prisma and PostgreSQL. It manages articles, comments and users with full tenant isolation, automatic moderation through a banned-words list and report thresholds, and asynchronous webhook delivery with the outbox pattern and exactly-once semantics.',
    features: ['Multilingual articles', 'Automatic moderation', 'Signed webhooks'],
    images: ['Homepage', 'Article list', 'Article detail', 'Translating an article in the editor', 'Category list', 'Category detail', 'Tag list', 'Banned words'],
  },
  'gatherly': {
    role: 'Events',
    line: 'Events, recurring and multilingual too, with categories, tags and participants, even without an account.',
    client: oss,
    description: 'Open source multi-tenant event manager built with NestJS 10, Prisma ORM and PostgreSQL. Each client only reaches its own events through a token, with support for recurring events following the RFC 5545 standard and automatic cleanup of past events.',
    features: ['Standard iCal recurrence', 'Multilingual events', 'Participants with or without an account'],
  },
  'sgweb': {
    description: 'The site for Federico Liuzzi’s Tai Chi and Qi Gong classes in Sesto San Giovanni and Cinisello Balsamo; he teaches in the Lo Spazio del Tao lineage. It introduces the practice, the venues with schedules and directions, the teachers, and lets you write to Federico directly by email or WhatsApp.',
    features: ['Italian and English', 'Venues, schedules and directions', 'Map loaded only on consent', 'Direct contact via WhatsApp', 'SEO and share previews'],
  },
  'beacon': {
    client: personal,
    description: 'Keeps an eye on Twitch channels and sends an alert when someone goes live, switches game or the viewer count changes: notifications go to Discord or any other system, with automatic retries if something doesn’t get through. Every stream is saved, so the stats can be read over time too.',
    features: ['Live monitoring', 'Multi-platform notifications', 'Stream statistics', 'Protected API'],
  },
  'kaish-dbd': {
    description: 'The site of streamer Kaish79, built around a build creator for Dead by Daylight. Users sign up, create and share their own builds; Kaish features the best ones from the admin panel and sees how often they get opened. Around it, a complete game wiki, fully translated.',
    features: ['Full build creator', 'Users and roles', 'Image upload via FileHarbor', 'Featured builds and metrics', 'Complete game wiki', 'Full translation', 'Lobby wait times', 'Maps with callouts and realms'],
    images: ['Homepage', 'Kaish Top Builds', 'Community builds', 'Random build generator', 'Killers', 'Survivors', 'Perks', 'Add-ons', 'Maps', 'Wait times'],
  },
  'fileharbor': {
    role: 'Images and video',
    line: 'Uploads, optimizes and serves images and video: automatic WebP, on-the-fly resizing, avatars and public or private albums.',
    client: oss,
    description: 'Open source multi-tenant microservice for image uploads, built with NestJS 10 and Prisma on PostgreSQL. It supports automatic WebP conversion with Sharp, on-demand resizing, public/private albums with token-based access, JWT + API key authentication, scheduled jobs for optimization and EXIF stripping, and auto-generated Swagger docs.',
    features: ['WebP and resizing', 'Avatars and albums', 'Video with preview'],
  },
  'emt-links': {
    description: 'A single page with all of Element Gaming’s links: socials, announcements and resources, in the brand’s look. The Linktree idea, but on an Element domain.',
    features: ['Link management', 'Integrated social profiles', 'Brand customization'],
  },
  'nuxt-vuetify-template': {
    line: 'The starting point for my Nuxt projects: Vuetify, TypeScript, Pinia, i18n and SEO already set up.',
    client: oss,
    description: 'Open source template to quickly start Nuxt 4 projects with Vuetify 3. It includes TypeScript, Pinia, i18n (it/en), SEO tuned with @nuxtjs/seo, a light/dark theme, a responsive app bar and a modular architecture ready to customize.',
    features: ['Nuxt 4 and Vuetify 3', 'Internationalization', 'Pre-configured UI', 'SEO and bots', 'Modular architecture'],
  },
  'puma-arts': {
    description: 'The site of artist Emanuele Puma: works, projects and collaborations, with a gallery of optimized images that browses well on a phone too.',
    images: ['Homepage', 'About me'],
  },
  'ziplink': {
    line: 'URL shortener with custom codes, click counts and a documented API.',
    client: oss,
    description: 'Open source service for creating and managing short URLs, built with NestJS and Prisma on PostgreSQL. It supports custom codes, click tracking, fallback redirects and API authentication. Dockerized, with a CI/CD pipeline on GitHub Actions and Swagger docs.',
    features: ['Short URL creation', 'Full CRUD management', 'Fallback redirect', 'Click tracking', 'API authentication', 'Dockerized with CI/CD', 'API documentation'],
  },
  'alertconnector': {
    line: 'Collects the Italian Civil Protection’s emergency alerts and exposes them through a standard REST API, ready to integrate.',
    client: oss,
    description: 'Open source aggregator of emergency alerts from the Italian Civil Protection, built with NestJS. The service normalizes the official feeds and re-exposes them through a standardized REST API, making integration with third-party applications easier.',
    features: ['Alert aggregation', 'Public REST service', 'Standardized format'],
  },
  'element': {
    description: 'The platform of the Element Gaming esports network: teams, players, events and news, plus the live status of streamers read from the Twitch API. Streamers get their own dashboard and an internal marketplace.',
    features: ['Real-time monitoring', 'Twitch API integration', 'Team and streamer dashboard', 'Node.js backend'],
    images: ['Homepage', 'Player list', 'Player detail', 'Streamer list', 'Streamer detail', 'Section list', 'Team list', 'Team detail', 'Event list', 'Event detail', 'News list', 'News detail', 'Streamer dashboard', 'Streamer marketplace'],
  },
  'prociv': {
    client: 'Settimo Milanese Civil Protection',
    description: 'The site of the Settimo Milanese Civil Protection group: its activities, volunteers, base and vehicles, plus a section with real-time emergency updates linked to the alert systems.',
    features: ['Real-time emergency updates', 'The association’s activities and events', 'Alert system integration', 'Designed phone-first'],
    images: ['Homepage', 'The group’s activities', 'Base and contacts', 'The volunteers', 'The group’s vehicles'],
  },
  'gymtrack': {
    description: 'Web app for a personal trainer who coaches clients remotely: profiles, session calendar, tailored workout plans, progress and chat.',
    features: ['Client management', 'Session planning', 'Exercise assignment', 'Progress tracking', 'Built-in chat'],
  },
  'alirdb': {
    description: 'Portal for the ALIR community’s Arma 3 players: each one checks their vehicles, weapons, roles, jobs and in-game balance in real time, read from the dedicated server’s API.',
    features: ['Personal data dashboard', 'Vehicle tracking', 'Roles and specializations', 'In-game bank accounts'],
    images: ['Homepage', 'Player profile', 'Player vehicles', 'Players by faction'],
  },
  'alircommunity': {
    description: 'Site and forum of the ALIR community, for the Arma 3 Altis Life server: discussions, player support, and user and content management.',
  },
}
