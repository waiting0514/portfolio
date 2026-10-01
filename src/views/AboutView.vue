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
  <article aria-labelledby="about-title">
    <header class="hero-grid border-b border-line">
      <BaseContainer class="py-14 md:py-20">
        <p class="eyebrow text-accent">{{ messages.home.aboutEyebrow }}</p>
        <h1
          id="about-title"
          class="mt-4 text-4xl leading-tight font-bold tracking-tight md:text-[3.75rem]"
        >
          {{ messages.pages.aboutTitle }}
        </h1>
        <p class="mt-5 text-lg text-ink-soft">
          <span class="font-bold text-ink">{{ content.name }}</span>
          <span aria-hidden="true" class="mx-2 text-line-strong">/</span>{{ content.role }}
        </p>
        <div class="prose-content mt-8 max-w-3xl">
          <p v-for="paragraph in content.bio" :key="paragraph">{{ paragraph }}</p>
        </div>
      </BaseContainer>
    </header>

    <BaseContainer class="section-spacing space-y-16 md:space-y-24">
      <!-- The h2 and its list stay siblings; the grid only places them side by side. -->
      <section aria-labelledby="experience-title" class="lg:grid lg:grid-cols-12 lg:gap-8">
        <h2
          id="experience-title"
          class="text-3xl leading-tight font-bold tracking-tight lg:col-span-4 md:text-[2.75rem]"
        >
          {{ messages.about.experienceTitle }}
        </h2>
        <ol class="mt-8 border-l border-line lg:col-span-8 lg:mt-0">
          <li
            v-for="entry in content.experience"
            :key="`${entry.company}-${entry.period}`"
            class="relative pb-12 pl-8 last:pb-0 before:absolute before:top-2 before:-left-[5px] before:size-[9px] before:rounded-full before:border-2 before:border-accent before:bg-canvas"
          >
            <p class="font-mono text-sm font-medium text-accent">{{ entry.period }}</p>
            <h3 class="mt-2 text-xl font-bold">{{ entry.company }}</h3>
            <p class="mt-1 text-ink-muted">{{ entry.title }}</p>
            <div class="prose-content mt-4">
              <ul>
                <li v-for="highlight in entry.highlights" :key="highlight">{{ highlight }}</li>
              </ul>
            </div>
          </li>
        </ol>
      </section>

      <section aria-labelledby="strengths-title" class="lg:grid lg:grid-cols-12 lg:gap-8">
        <h2
          id="strengths-title"
          class="text-3xl leading-tight font-bold tracking-tight lg:col-span-4 md:text-[2.75rem]"
        >
          {{ messages.about.strengthsTitle }}
        </h2>
        <ul class="mt-8 grid gap-4 md:grid-cols-2 lg:col-span-8 lg:mt-0">
          <li
            v-for="strength in content.strengths"
            :key="strength"
            class="rounded-xl border border-line bg-surface p-6 leading-relaxed text-ink-soft"
          >
            {{ strength }}
          </li>
        </ul>
      </section>
    </BaseContainer>

    <section aria-labelledby="contact-title" class="section-spacing bg-navy text-on-navy">
      <BaseContainer>
        <h2
          id="contact-title"
          class="text-3xl leading-tight font-bold tracking-tight md:text-[2.75rem]"
        >
          {{ messages.about.contactTitle }}
        </h2>
        <p class="mt-4 max-w-prose text-[1.0625rem] text-on-navy-muted">
          {{ messages.about.contactDescription }}
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <BaseButton :to="localePath('/projects')">{{ messages.common.viewProjects }}</BaseButton>
          <BaseButton :href="profile.githubUrl" variant="secondary">
            {{ messages.nav.github }}
          </BaseButton>
          <BaseButton v-if="profile.email" :href="`mailto:${profile.email}`" variant="secondary">
            {{ messages.about.email }}
          </BaseButton>
        </div>
      </BaseContainer>
    </section>
  </article>
</template>
