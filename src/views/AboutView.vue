<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseContainer from '@/components/common/BaseContainer.vue'
import ManHeader from '@/components/common/ManHeader.vue'
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
    <header class="hero-grid border-b border-line-strong">
      <BaseContainer class="pt-6 pb-14 md:pt-8 md:pb-20">
        <ManHeader page="about" />
        <p class="mt-10 eyebrow text-accent md:mt-14">
          <span class="marker-hash">{{ messages.home.aboutEyebrow }}</span>
        </p>
        <h1 id="about-title" class="mt-4 text-4xl leading-tight font-bold md:text-display">
          {{ messages.pages.aboutTitle }}
        </h1>
        <p class="mt-5 font-mono text-ui text-ink-soft">
          <span class="font-semibold text-ink">{{ content.name }}</span>
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
          class="text-3xl leading-tight font-semibold lg:col-span-4 md:text-heading-lg"
        >
          {{ messages.about.experienceTitle }}
        </h2>
        <ol class="mt-8 border-l border-dashed border-line-strong lg:col-span-8 lg:mt-0">
          <li
            v-for="entry in content.experience"
            :key="`${entry.company}-${entry.period}`"
            class="relative pb-12 pl-8 last:pb-0 before:absolute before:top-2 before:-left-[5px] before:size-[9px] before:border-2 before:border-accent before:bg-canvas"
          >
            <p class="font-mono text-label font-medium text-syntax-number">{{ entry.period }}</p>
            <h3 class="mt-2 text-xl font-semibold">{{ entry.company }}</h3>
            <p class="mt-1 font-mono text-label text-ink-muted">{{ entry.title }}</p>
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
          class="text-3xl leading-tight font-semibold lg:col-span-4 md:text-heading-lg"
        >
          {{ messages.about.strengthsTitle }}
        </h2>
        <ul class="mt-8 grid gap-4 [counter-reset:strength] md:grid-cols-2 lg:col-span-8 lg:mt-0">
          <li
            v-for="strength in content.strengths"
            :key="strength"
            class="rounded-card border border-line-strong bg-surface p-6 leading-relaxed text-ink-soft [counter-increment:strength] before:mb-3 before:block before:font-mono before:text-label before:text-accent before:content-['0'_counter(strength)]"
          >
            {{ strength }}
          </li>
        </ul>
      </section>
    </BaseContainer>

    <section aria-labelledby="contact-title" class="section-spacing surface-navy">
      <BaseContainer>
        <p aria-hidden="true" class="mb-6 font-mono text-label text-on-navy-muted">
          <span class="text-on-navy-string">~/portfolio</span>
          <span class="text-on-navy-accent"> $ </span>./contact.sh<span
            class="cursor-block text-on-navy-accent"
          ></span>
        </p>
        <h2 id="contact-title" class="text-3xl leading-tight font-semibold md:text-heading-lg">
          {{ messages.about.contactTitle }}
        </h2>
        <p class="mt-4 max-w-prose text-lead text-on-navy-muted">
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
