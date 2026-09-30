import type { Profile } from '@/types/profile'

/**
 * Site owner profile.
 * Unknown facts stay as `TODO:` placeholders — never invent companies, dates or numbers.
 * Keep this module free of Vite-only APIs: build-time code imports it in Node.
 */
export const profile: Profile = {
  githubUrl: 'https://github.com/waiting0514',
  focusTechnologies: ['Vue', 'Angular', 'TypeScript', 'JavaScript', 'RxJS'],
  content: {
    'zh-TW': {
      name: 'TODO: 姓名',
      role: '前端工程師',
      intro:
        '專注於 Vue、Angular 與 TypeScript 的前端工程師，擅長大型檔案上傳、即時影像串流等複雜前端問題。TODO: 依個人經歷調整。',
      summary: 'TODO: 簡短介紹工作背景（年資、產業、主要負責的產品類型）。',
      bio: ['TODO: 個人簡介第一段。', 'TODO: 個人簡介第二段。'],
      strengths: ['TODO: 專長重點，例如大型檔案上傳與斷點續傳', 'TODO: 專長重點，例如即時影像串流'],
      experience: [
        {
          company: 'TODO: 公司名稱',
          title: '前端工程師',
          period: 'TODO: 任職期間',
          highlights: ['TODO: 主要負責項目'],
        },
      ],
    },
    en: {
      name: 'TODO: Name',
      role: 'Frontend Engineer',
      intro:
        'Frontend engineer focused on Vue, Angular and TypeScript, working on complex problems such as large file uploads and real-time video streaming. TODO: adjust to your experience.',
      summary: 'TODO: A short summary of your background (years, industry, products you own).',
      bio: ['TODO: First paragraph of your bio.', 'TODO: Second paragraph of your bio.'],
      strengths: [
        'TODO: Strength, e.g. large file upload and resumable transfer',
        'TODO: Strength, e.g. real-time video streaming',
      ],
      experience: [
        {
          company: 'TODO: Company',
          title: 'Frontend Engineer',
          period: 'TODO: Period',
          highlights: ['TODO: Key responsibility'],
        },
      ],
    },
  },
}
