import { createRouter, type RouteRecordRaw, type RouterHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

/**
 * One route table serves both locales: the optional `en` segment matches `/about` and `/en/about`.
 * Components read the locale from the path through `useLocale`, so only `slug` is passed as a prop.
 */
const LOCALE_SEGMENT = '/:locale(en)?'

export const routes: RouteRecordRaw[] = [
  {
    path: LOCALE_SEGMENT,
    name: 'home',
    component: HomeView,
  },
  {
    path: `${LOCALE_SEGMENT}/projects`,
    name: 'projects',
    component: () => import('@/views/ProjectsView.vue'),
  },
  {
    path: `${LOCALE_SEGMENT}/projects/:slug`,
    name: 'project-detail',
    component: () => import('@/views/ProjectDetailView.vue'),
    props: (route) => ({ slug: String(route.params.slug) }),
  },
  {
    path: `${LOCALE_SEGMENT}/about`,
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

export function createAppRouter(history: RouterHistory) {
  return createRouter({
    history,
    routes,
    scrollBehavior(to, _from, savedPosition) {
      if (savedPosition) return savedPosition
      if (to.hash) return { el: to.hash }
      return { top: 0 }
    },
  })
}
