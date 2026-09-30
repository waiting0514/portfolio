import { mount, type ComponentMountingOptions } from '@vue/test-utils'
import type { Component } from 'vue'
import { createMemoryHistory } from 'vue-router'
import { createAppRouter } from '@/router'

/** A real app router backed by in-memory history, already navigated to `path`. */
export async function createTestRouter(path = '/') {
  const router = createAppRouter(createMemoryHistory())
  await router.push(path)
  await router.isReady()
  return router
}

/** Mounts a component with the app router at `path`. */
export async function mountAtPath<C extends Component>(
  component: C,
  path = '/',
  options: ComponentMountingOptions<C> = {},
) {
  const router = await createTestRouter(path)
  const wrapper = mount(component, {
    ...options,
    global: { ...options.global, plugins: [router, ...(options.global?.plugins ?? [])] },
  })
  return { wrapper, router }
}
