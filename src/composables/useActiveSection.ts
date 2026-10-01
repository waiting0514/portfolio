import { onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'

/**
 * Tracks which section heading the reader is currently at, for a table of contents.
 * Without IntersectionObserver (e.g. in tests) it keeps the first id, and the
 * table of contents still works as plain in-page links.
 */
export function useActiveSection(ids: Ref<readonly string[]>) {
  const activeId = ref<string | undefined>(ids.value[0])
  const visible = new Set<string>()
  let observer: IntersectionObserver | undefined

  function update() {
    // The first visible heading in page order wins; keep the last one while between headings.
    const current = ids.value.find((id) => visible.has(id))
    if (current) activeId.value = current
  }

  function observe() {
    observer?.disconnect()
    visible.clear()
    if (typeof IntersectionObserver === 'undefined') return

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        update()
      },
      // A heading counts as "current" while it is in the upper part of the viewport.
      { rootMargin: '0px 0px -65% 0px' },
    )
    for (const id of ids.value) {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    }
  }

  onMounted(observe)
  watch(ids, () => {
    activeId.value = ids.value[0]
    observe()
  })
  onBeforeUnmount(() => observer?.disconnect())

  return activeId
}
