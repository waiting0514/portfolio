<script setup lang="ts">
import NotFoundContent from '@/components/common/NotFoundContent.vue'
import { useLocale } from '@/composables/useLocale'
import { usePageMeta } from '@/composables/usePageMeta'
import { describePage } from '@/utils/seo'

const { locale } = useLocale()

usePageMeta(() => describePage({ page: 'not-found' }, locale.value))
</script>

<template>
  <NotFoundContent />
</template>
