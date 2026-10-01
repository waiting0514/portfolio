<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseContainer from '@/components/common/BaseContainer.vue'
import ManHeader from '@/components/common/ManHeader.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import HeroAnimation from '@/components/hero/HeroAnimation.vue'
import RequirementToProduct from '@/components/hero/sequences/RequirementToProduct.vue'
import ProjectGrid from '@/components/project/ProjectGrid.vue'
import { useLocale } from '@/composables/useLocale'
import { usePageMeta } from '@/composables/usePageMeta'
import { describePage } from '@/utils/seo'
import { profile } from '@/data/profile'
import { featuredProjects } from '@/data/projects'
import { skillCategories } from '@/data/skills'

const { locale, messages, localePath } = useLocale()
const content = computed(() => profile.content[locale.value])

usePageMeta(() => describePage({ page: 'home' }, locale.value))
</script>

<template>
  <!--
    The hero reads like a manual page: NAME, SYNOPSIS, DESCRIPTION. The section labels are
    decorative and hidden from assistive technology; the content beside them carries the meaning.
  -->
  <section aria-labelledby="hero-title" class="hero-grid border-b border-line-strong">
    <BaseContainer class="pt-6 pb-16 md:pt-8 md:pb-24">
      <ManHeader page="portfolio" />

      <div class="mt-10 grid gap-14 md:mt-16 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div class="grid gap-8 lg:col-span-7">
          <div class="man-row">
            <span aria-hidden="true" class="man-label">Name</span>
            <div>
              <p class="font-mono text-ui text-ink-soft">
                {{ content.name }} <span aria-hidden="true" class="text-ink-muted">—</span>
              </p>
              <h1 id="hero-title" class="mt-2 text-5xl leading-display font-bold md:text-display">
                {{ content.role }}
              </h1>
            </div>
          </div>

          <div class="man-row">
            <span aria-hidden="true" class="man-label">Synopsis</span>
            <div
              class="flex flex-wrap items-baseline gap-x-2 gap-y-1 rounded-card border border-line-strong bg-surface px-4 py-3 font-mono text-ui"
            >
              <span aria-hidden="true" class="marker-prompt text-ink">engineer --stack</span>
              <!-- Commas are generated content, so each item's text stays the plain name. -->
              <ul :aria-label="messages.home.focusLabel" class="flex flex-wrap gap-y-1">
                <li
                  v-for="item in profile.focusTechnologies"
                  :key="item"
                  class="text-syntax-string after:mr-1.5 after:text-ink-muted after:content-[','] last:after:mr-0 last:after:content-none"
                >
                  {{ item }}
                </li>
              </ul>
              <span aria-hidden="true" class="cursor-block text-accent"></span>
            </div>
          </div>

          <div class="man-row">
            <span aria-hidden="true" class="man-label">Description</span>
            <div>
              <p class="max-w-2xl text-lg leading-relaxed text-ink-soft">{{ content.intro }}</p>
              <div class="mt-8 flex flex-wrap gap-3">
                <BaseButton :to="localePath('/projects')">
                  {{ messages.common.viewProjects }} <span aria-hidden="true">→</span>
                </BaseButton>
                <BaseButton :to="localePath('/about')" variant="secondary">
                  {{ messages.home.aboutMe }}
                </BaseButton>
              </div>
            </div>
          </div>
        </div>

        <div class="mx-auto w-full max-w-[32.5rem] lg:col-span-5">
          <p aria-hidden="true" class="mb-3 font-mono text-label text-ink-muted">
            // spec → architecture → product
          </p>
          <HeroAnimation :label="messages.home.heroAnimationLabel">
            <RequirementToProduct />
          </HeroAnimation>
        </div>
      </div>
    </BaseContainer>
  </section>

  <section aria-labelledby="featured-title" class="section-spacing">
    <BaseContainer>
      <div class="mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 md:mb-12">
        <SectionHeading
          id="featured-title"
          class="mb-0! md:mb-0!"
          :eyebrow="messages.home.featuredEyebrow"
          :title="messages.home.featuredTitle"
          :description="messages.home.featuredDescription"
        />
        <RouterLink
          :to="localePath('/projects')"
          class="group inline-flex min-h-11 items-center gap-1.5 link-accent font-mono text-ui font-semibold transition-state"
        >
          {{ messages.home.viewAllProjects }}
          <span aria-hidden="true" class="transition-state motion-safe:group-hover:translate-x-0.5"
            >→</span
          >
        </RouterLink>
      </div>
      <ProjectGrid :projects="featuredProjects" />
    </BaseContainer>
  </section>

  <section
    aria-labelledby="skills-title"
    class="border-y border-line-strong bg-surface py-12 md:py-16"
  >
    <BaseContainer>
      <div class="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h2 id="skills-title" class="text-xl font-semibold md:text-2xl">
          {{ messages.home.skillsTitle }}
        </h2>
        <p class="font-mono text-label text-ink-muted">
          <span aria-hidden="true">// </span>{{ messages.home.skillsDescription }}
        </p>
      </div>

      <!--
        Laid out like a YAML file: each category is a key, its items a list. The ":" and "- "
        are generated content, so headings and items keep their plain text.
      -->
      <div class="mt-8 overflow-hidden rounded-card border border-line-strong">
        <div
          aria-hidden="true"
          class="flex h-9 items-center border-b border-line-strong bg-canvas px-4 font-mono text-label text-ink-muted"
        >
          skills.yaml
        </div>
        <div class="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5">
          <div
            v-for="category in skillCategories"
            :key="category.name.en"
            class="bg-surface px-5 py-4 sm:last:col-span-2 lg:last:col-span-1"
          >
            <h3
              class="font-mono text-label font-semibold tracking-normal text-syntax-keyword after:text-ink-muted after:content-[':']"
            >
              {{ category.name[locale] }}
            </h3>
            <ul class="mt-2 grid gap-1 pl-3 font-mono text-label text-ink-soft">
              <li
                v-for="item in category.items"
                :key="item"
                class="before:text-ink-muted before:content-['-_']"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </BaseContainer>
  </section>

  <section aria-labelledby="about-preview-title" class="section-spacing">
    <BaseContainer class="grid gap-10 lg:grid-cols-12 lg:gap-8">
      <div class="lg:col-span-4">
        <SectionHeading
          id="about-preview-title"
          class="mb-0! md:mb-0!"
          :eyebrow="messages.home.aboutEyebrow"
          :title="messages.home.aboutTitle"
        />
      </div>
      <div class="lg:col-span-8">
        <p class="max-w-prose text-lg leading-relaxed text-ink-soft">{{ content.summary }}</p>
        <!-- Read like `git log`: date first, then the entry. -->
        <ol :aria-label="messages.home.experience" class="mt-10 border-t border-ink">
          <li
            v-for="job in content.experience"
            :key="`${job.company}-${job.period}`"
            class="grid gap-1 border-b border-dashed border-line-strong py-4 sm:grid-cols-8 sm:gap-8 sm:py-5"
          >
            <span class="font-mono text-label text-syntax-number sm:col-span-2 sm:pt-1">{{
              job.period
            }}</span>
            <span class="font-bold sm:col-span-4">{{ job.company }}</span>
            <span class="font-mono text-label text-ink-muted sm:col-span-2 sm:pt-1">{{
              job.title
            }}</span>
          </li>
        </ol>
        <RouterLink
          :to="localePath('/about')"
          class="group mt-8 inline-flex min-h-11 items-center gap-1.5 link-accent font-mono text-ui font-semibold transition-state"
        >
          {{ messages.home.viewAbout }}
          <span aria-hidden="true" class="transition-state motion-safe:group-hover:translate-x-0.5"
            >→</span
          >
        </RouterLink>
      </div>
    </BaseContainer>
  </section>
</template>

<style scoped>
/* A manual-page section: label on top on small screens, beside the content from md up. */
.man-row {
  display: grid;
  gap: 0.5rem;
}

.man-label {
  font-family: var(--font-mono);
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-syntax-keyword);
}

@media (min-width: 48rem) {
  .man-row {
    grid-template-columns: 8.5rem minmax(0, 1fr);
    gap: 0;
  }

  .man-label {
    padding-top: 0.2rem;
  }
}
</style>
