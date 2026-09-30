<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseContainer from '@/components/common/BaseContainer.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import TechTagList from '@/components/common/TechTagList.vue'
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
  <section aria-labelledby="hero-title" class="border-b border-line">
    <BaseContainer class="py-20 md:py-28">
      <p class="font-mono text-sm text-ink-muted">{{ content.name }}</p>
      <h1 id="hero-title" class="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
        {{ content.role }}
      </h1>
      <p class="mt-6 max-w-2xl text-lg text-ink-muted">{{ content.intro }}</p>
      <TechTagList
        class="mt-6"
        :items="profile.focusTechnologies"
        :label="messages.home.focusLabel"
      />
      <div class="mt-10 flex flex-wrap gap-3">
        <BaseButton :to="localePath('/projects')">{{ messages.common.viewProjects }}</BaseButton>
        <BaseButton :href="profile.githubUrl" variant="secondary">
          {{ messages.nav.github }}
        </BaseButton>
      </div>
    </BaseContainer>
  </section>

  <section aria-labelledby="featured-title" class="section-spacing">
    <BaseContainer>
      <SectionHeading
        id="featured-title"
        :title="messages.home.featuredTitle"
        :description="messages.home.featuredDescription"
      />
      <ProjectGrid :projects="featuredProjects" />
      <div class="mt-10">
        <BaseButton :to="localePath('/projects')" variant="secondary">
          {{ messages.home.viewAllProjects }}
        </BaseButton>
      </div>
    </BaseContainer>
  </section>

  <section aria-labelledby="skills-title" class="section-spacing border-y border-line bg-surface">
    <BaseContainer>
      <SectionHeading
        id="skills-title"
        :title="messages.home.skillsTitle"
        :description="messages.home.skillsDescription"
      />
      <div class="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="category in skillCategories" :key="category.name.en">
          <h3 class="text-base font-semibold text-ink">{{ category.name[locale] }}</h3>
          <TechTagList class="mt-3" :items="category.items" />
        </div>
      </div>
    </BaseContainer>
  </section>

  <section aria-labelledby="about-preview-title" class="section-spacing">
    <BaseContainer>
      <SectionHeading id="about-preview-title" :title="messages.home.aboutTitle" />
      <p class="max-w-prose text-ink-muted">{{ content.summary }}</p>
      <div class="mt-8">
        <BaseButton :to="localePath('/about')" variant="secondary">
          {{ messages.home.viewAbout }}
        </BaseButton>
      </div>
    </BaseContainer>
  </section>
</template>
