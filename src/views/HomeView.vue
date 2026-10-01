<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseContainer from '@/components/common/BaseContainer.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import TechTagList from '@/components/common/TechTagList.vue'
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
  <section aria-labelledby="hero-title" class="hero-grid border-b border-line">
    <BaseContainer
      class="grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-28"
    >
      <div class="lg:col-span-7">
        <p class="eyebrow text-accent">{{ content.name }}</p>
        <h1
          id="hero-title"
          class="mt-4 text-5xl leading-[1.05] font-black tracking-tight md:text-7xl lg:text-[4.5rem]"
        >
          {{ content.role }}
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
          {{ content.intro }}
        </p>
        <TechTagList
          class="mt-6"
          :items="profile.focusTechnologies"
          :label="messages.home.focusLabel"
        />
        <div class="mt-10 flex flex-wrap gap-3">
          <BaseButton :to="localePath('/projects')">
            {{ messages.common.viewProjects }} <span aria-hidden="true">→</span>
          </BaseButton>
          <BaseButton :to="localePath('/about')" variant="secondary">
            {{ messages.home.aboutMe }}
          </BaseButton>
        </div>
      </div>

      <HeroAnimation
        :label="messages.home.heroAnimationLabel"
        class="mx-auto w-full max-w-[32.5rem] lg:col-span-5"
      >
        <RequirementToProduct />
      </HeroAnimation>
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
          class="group inline-flex min-h-11 items-center gap-1.5 font-bold text-accent hover:text-accent-strong"
        >
          {{ messages.home.viewAllProjects }}
          <span
            aria-hidden="true"
            class="transition-transform duration-150 motion-safe:group-hover:translate-x-0.5"
            >→</span
          >
        </RouterLink>
      </div>
      <ProjectGrid :projects="featuredProjects" />
    </BaseContainer>
  </section>

  <section aria-labelledby="skills-title" class="border-y border-line bg-surface py-12 md:py-16">
    <BaseContainer>
      <div class="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h2 id="skills-title" class="text-xl font-bold tracking-tight md:text-2xl">
          {{ messages.home.skillsTitle }}
        </h2>
        <p class="text-sm text-ink-muted">{{ messages.home.skillsDescription }}</p>
      </div>
      <div class="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
        <div v-for="category in skillCategories" :key="category.name.en">
          <h3 class="eyebrow text-xs text-ink-muted">{{ category.name[locale] }}</h3>
          <ul
            class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.9375rem] text-ink-soft lg:grid lg:gap-1"
          >
            <li v-for="item in category.items" :key="item">{{ item }}</li>
          </ul>
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
        <ol :aria-label="messages.home.experience" class="mt-10 border-t border-ink">
          <li
            v-for="job in content.experience"
            :key="`${job.company}-${job.period}`"
            class="grid gap-1 border-b border-line py-4 sm:grid-cols-8 sm:gap-8 sm:py-5"
          >
            <span class="font-mono text-sm text-ink-muted sm:col-span-2">{{ job.period }}</span>
            <span class="font-bold sm:col-span-4">{{ job.company }}</span>
            <span class="text-ink-muted sm:col-span-2">{{ job.title }}</span>
          </li>
        </ol>
        <RouterLink
          :to="localePath('/about')"
          class="group mt-8 inline-flex min-h-11 items-center gap-1.5 font-bold text-accent hover:text-accent-strong"
        >
          {{ messages.home.viewAbout }}
          <span
            aria-hidden="true"
            class="transition-transform duration-150 motion-safe:group-hover:translate-x-0.5"
            >→</span
          >
        </RouterLink>
      </div>
    </BaseContainer>
  </section>
</template>
