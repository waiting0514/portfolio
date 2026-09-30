import type { SkillCategory } from '@/types/profile'

/** Skills grouped by area, shown as text lists rather than a logo wall. */
export const skillCategories: readonly SkillCategory[] = [
  {
    name: { 'zh-TW': '前端', en: 'Frontend' },
    items: ['Vue', 'Angular', 'React', 'TypeScript', 'JavaScript'],
  },
  {
    name: { 'zh-TW': '狀態管理與響應式', en: 'State / Reactive' },
    items: ['Pinia', 'RxJS'],
  },
  {
    name: { 'zh-TW': '即時通訊與媒體', en: 'Realtime / Media' },
    items: ['WebSocket', 'WebRTC', 'MSE'],
  },
  {
    name: { 'zh-TW': '開發工具', en: 'Tooling' },
    items: ['Vite', 'Webpack', 'ESLint', 'Prettier'],
  },
  {
    name: { 'zh-TW': 'DevOps', en: 'DevOps' },
    items: ['Docker', 'GitHub Actions', 'Cloudflare'],
  },
]
