<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseContainer from '@/components/common/BaseContainer.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import TechTagList from '@/components/common/TechTagList.vue'
import ProjectGrid from '@/components/project/ProjectGrid.vue'
import StatusBadge from '@/components/project/StatusBadge.vue'
import { useLocale } from '@/composables/useLocale'
import { usePageMeta } from '@/composables/usePageMeta'
import { describePage } from '@/utils/seo'
import { profile } from '@/data/profile'
import { featuredProjects, projects } from '@/data/projects'
import { skillCategories } from '@/data/skills'

const { locale, messages, localePath } = useLocale()
const content = computed(() => profile.content[locale.value])

/** The "Now" panel is derived from existing data: latest job and any project in development. */
const currentJob = computed(() => content.value.experience[0])
const inProgress = computed(() => {
  const project = projects.find((item) => item.status !== undefined)
  return project && { project, title: project.content[locale.value].title }
})

usePageMeta(() => describePage({ page: 'home' }, locale.value))
</script>

<template>
  <section aria-labelledby="hero-title" class="hero-grid border-b border-line">
    <BaseContainer
      class="grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-end lg:gap-8 lg:py-32"
    >
      <div class="lg:col-span-8">
        <p class="eyebrow text-accent">{{ content.name }}</p>
        <h1
          id="hero-title"
          class="mt-4 text-5xl leading-[1.05] font-black tracking-tight md:text-7xl lg:text-[5.5rem]"
        >
          {{ content.role }}
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
          {{ content.intro }}
        </p>
        <div class="mt-10 flex flex-wrap gap-3">
          <BaseButton :to="localePath('/projects')">
            {{ messages.common.viewProjects }} <span aria-hidden="true">→</span>
          </BaseButton>
          <BaseButton :href="profile.githubUrl" variant="secondary">
            {{ messages.nav.github }}
          </BaseButton>
        </div>
      </div>

      <section
        :aria-label="messages.home.now"
        class="flex flex-col gap-5 rounded-xl border border-line bg-surface p-6 md:p-7 lg:col-span-4"
      >
        <div v-if="currentJob">
          <p class="eyebrow text-xs text-ink-muted">{{ messages.home.now }}</p>
          <p class="mt-2 font-bold">{{ currentJob.company }}</p>
          <p class="mt-1 text-sm text-ink-muted">
            {{ currentJob.title }} · {{ currentJob.period }}
          </p>
        </div>
        <div class="border-t border-line pt-5">
          <p class="eyebrow text-xs text-ink-muted">{{ messages.home.focusLabel }}</p>
          <TechTagList
            class="mt-3"
            :items="profile.focusTechnologies"
            :label="messages.home.focusLabel"
          />
        </div>
        <div v-if="inProgress" class="border-t border-line pt-5">
          <p class="eyebrow text-xs text-ink-muted">{{ messages.home.inProgress }}</p>
          <div class="mt-2 flex flex-wrap items-center justify-between gap-3">
            <RouterLink
              :to="localePath(`/projects/${inProgress.project.slug}`)"
              class="font-bold text-ink hover:text-accent"
            >
              {{ inProgress.title }}
            </RouterLink>
            <StatusBadge v-if="inProgress.project.status" :status="inProgress.project.status" />
          </div>
        </div>
      </section>
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

  <section aria-labelledby="skills-title" class="section-spacing bg-navy text-on-navy">
    <BaseContainer class="grid gap-10 lg:grid-cols-12 lg:gap-8">
      <div class="lg:col-span-4">
        <p class="eyebrow text-on-navy-accent">{{ messages.home.skillsEyebrow }}</p>
        <h2
          id="skills-title"
          class="mt-3 text-3xl leading-tight font-bold tracking-tight md:text-[2.75rem]"
        >
          {{ messages.home.skillsTitle }}
        </h2>
        <p class="mt-4 text-[1.0625rem] text-on-navy-muted">
          {{ messages.home.skillsDescription }}
        </p>
      </div>
      <div class="border-t border-on-navy-muted/40 lg:col-span-8">
        <div
          v-for="category in skillCategories"
          :key="category.name.en"
          class="grid gap-2 border-b border-navy-line py-5 sm:grid-cols-8 sm:gap-8 sm:py-6"
        >
          <h3 class="font-bold sm:col-span-3">{{ category.name[locale] }}</h3>
          <ul
            class="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.9375rem] text-on-navy-muted sm:col-span-5"
          >
            <li
              v-for="item in category.items"
              :key="item"
              class="after:ml-3 after:text-navy-line after:content-['/'] last:after:content-none"
            >
              {{ item }}
            </li>
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
