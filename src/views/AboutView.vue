<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseContainer from '@/components/common/BaseContainer.vue'
import { useLocale } from '@/composables/useLocale'
import { usePageMeta } from '@/composables/usePageMeta'
import { describePage } from '@/utils/seo'
import { profile } from '@/data/profile'

const { locale, messages, localePath } = useLocale()
const content = computed(() => profile.content[locale.value])

usePageMeta(() => describePage({ page: 'about' }, locale.value))
</script>

<template>
  <BaseContainer as="article" aria-labelledby="about-title" class="section-spacing">
    <header class="max-w-prose">
      <p class="font-mono text-sm text-ink-muted">{{ content.name }}</p>
      <h1 id="about-title" class="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
        {{ messages.pages.aboutTitle }}
      </h1>
      <p class="mt-4 text-lg text-ink-muted">{{ content.role }}</p>
    </header>

    <div class="prose-content mt-10">
      <p v-for="paragraph in content.bio" :key="paragraph">{{ paragraph }}</p>
    </div>

    <section aria-labelledby="experience-title" class="mt-14 border-t border-line pt-10">
      <h2 id="experience-title" class="text-xl font-bold tracking-tight md:text-2xl">
        {{ messages.about.experienceTitle }}
      </h2>
      <ol class="mt-6 max-w-prose space-y-8">
        <li v-for="entry in content.experience" :key="`${entry.company}-${entry.period}`">
          <h3 class="text-base font-semibold">
            {{ entry.title }}<span class="text-ink-muted"> · {{ entry.company }}</span>
          </h3>
          <p class="mt-1 font-mono text-sm text-ink-muted">{{ entry.period }}</p>
          <div class="prose-content mt-3">
            <ul>
              <li v-for="highlight in entry.highlights" :key="highlight">{{ highlight }}</li>
            </ul>
          </div>
        </li>
      </ol>
    </section>

    <section aria-labelledby="strengths-title" class="mt-14 border-t border-line pt-10">
      <h2 id="strengths-title" class="text-xl font-bold tracking-tight md:text-2xl">
        {{ messages.about.strengthsTitle }}
      </h2>
      <div class="prose-content mt-6">
        <ul>
          <li v-for="strength in content.strengths" :key="strength">{{ strength }}</li>
        </ul>
      </div>
    </section>

    <section aria-labelledby="contact-title" class="mt-14 border-t border-line pt-10">
      <h2 id="contact-title" class="text-xl font-bold tracking-tight md:text-2xl">
        {{ messages.about.contactTitle }}
      </h2>
      <p class="mt-4 max-w-prose text-ink-muted">{{ messages.about.contactDescription }}</p>
      <div class="mt-8 flex flex-wrap gap-3">
        <BaseButton :to="localePath('/projects')">{{ messages.common.viewProjects }}</BaseButton>
        <BaseButton :href="profile.githubUrl" variant="secondary">
          {{ messages.nav.github }}
        </BaseButton>
        <BaseButton v-if="profile.email" :href="`mailto:${profile.email}`" variant="secondary">
          {{ messages.about.email }}
        </BaseButton>
      </div>
    </section>
  </BaseContainer>
</template>
