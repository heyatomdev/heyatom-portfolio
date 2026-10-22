<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const { t } = useI18n()
const localePath = useLocalePath()

const notFound = computed(() => props.error.statusCode === 404)
const key = computed(() => (notFound.value ? 'notFound' : 'generic'))

// error.vue replaces app.vue, so the page sets its own lang and keeps itself out of the index.
const i18nHead = useLocaleHead()
useHead(() => ({ htmlAttrs: i18nHead.value.htmlAttrs, meta: [{ name: 'robots', content: 'noindex' }] }))
useSeoMeta({ title: () => t(`error.${key.value}.title`) })

// The error state stays until it is cleared: a plain link would keep showing this page.
const go = (path: string) => clearError({ redirect: localePath(path) })
</script>

<template>
  <NuxtRouteAnnouncer />
  <SiteHeader />
  <main id="main" class="wrap page">
    <div class="head hexed">
      <p class="code mono" aria-hidden="true">{{ error.statusCode }}</p>
      <h1>{{ t(`error.${key}.title`) }}</h1>
      <p class="text">{{ t(`error.${key}.text`) }}</p>
      <div class="actions">
        <a class="btn btn--primary" :href="localePath('/')" @click.prevent="go('/')">
          {{ t('error.home') }} <Icon name="arrow-right" />
        </a>
        <a v-if="notFound" class="btn btn--ghost" :href="localePath('/works')" @click.prevent="go('/works')">{{ t('error.works') }}</a>
        <a v-else class="btn btn--ghost" href="mailto:hey@heyatom.dev">hey@heyatom.dev</a>
      </div>
    </div>
  </main>
  <SiteFooter />
</template>

<style scoped>
.page {
  padding-top: clamp(4rem, 14vh, 9rem);
  padding-bottom: var(--section);
  min-height: 70svh;
}
.head { --hex-inset: -40% -10% -40% 40%; max-width: 40rem; }
.code {
  font-size: clamp(3.5rem, 9vw, 6rem);
  font-weight: 600;
  line-height: 0.9;
  color: var(--green-light);
}
h1 {
  margin-top: 1.5rem;
  font-size: clamp(2rem, 4.2vw, 3.25rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.08;
}
.text {
  margin-top: 1.2rem;
  max-width: 46ch;
  color: var(--ink-2);
  font-size: var(--text-md);
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2.2rem;
}
</style>
