import type { Project } from '@/types/project'

/**
 * All portfolio projects, in display order.
 *
 * Content rules:
 * - Never invent metrics, user counts, KPIs or confidential details: use `TODO:` placeholders.
 * - Leave a case study section out entirely when nothing is known about it.
 *
 * This module is imported by build-time code in Node, so it must not use `import.meta.env`
 * or import assets. Images live in `public/` and are referenced by relative path.
 */
export const projects: readonly Project[] = [
  {
    slug: 'large-file-upload-system',
    cover: { src: 'images/projects/large-file-upload-system.svg', width: 1600, height: 900 },
    technologies: ['Vue', 'RxJS', 'Resumable.js'],
    featured: true,
    content: {
      'zh-TW': {
        title: '大型檔案上傳系統',
        subtitle: '支援 GB 級檔案的分段上傳、續傳與 DXF 預覽',
        summary:
          '以 Chunk Upload 處理 GB 級大型檔案，支援斷點續傳、上傳進度、失敗重試與 DXF 預覽。',
        coverAlt: '大型檔案上傳系統的介面示意圖（placeholder）',
        highlights: [
          'GB 級大型檔案',
          'Chunk Upload',
          'Resume Upload',
          'Upload Progress',
          'Retry',
          'DXF Preview',
        ],
        caseStudy: {
          overview: [
            '讓使用者在瀏覽器中穩定上傳 GB 級的大型檔案，並在上傳後預覽 DXF 圖檔。',
            'TODO: 補充產品背景與使用情境。',
          ],
          role: {
            title: 'TODO: 職稱／角色',
            responsibilities: ['TODO: 實際負責的範圍'],
          },
          problem: [
            '單一請求上傳 GB 級檔案時，任何網路中斷都會讓整個上傳失敗並需要從頭開始。',
            'TODO: 補充實際遇到的問題與限制。',
          ],
          architecture: {
            steps: [
              '選擇檔案後，在前端將檔案切分為固定大小的 chunk',
              '依序或並行上傳 chunk，並追蹤每個 chunk 的狀態',
              '上傳中斷後，只重新上傳尚未完成的 chunk',
              '所有 chunk 完成後，由後端合併檔案',
              '上傳完成後提供 DXF 預覽',
            ],
          },
          solution: [
            '以 Resumable.js 處理檔案切分、續傳與重試，並以 RxJS 管理上傳事件與進度串流。',
            'TODO: 補充實作細節。',
          ],
          challenges: [
            {
              challenge: 'TODO: 技術挑戰（例如大量 chunk 的並行數控制）',
              solution: 'TODO: 對應的解法',
            },
          ],
          results: ['TODO: 成果（請勿填入未經確認的數字）'],
          learnings: ['TODO: 學到的事'],
        },
      },
      en: {
        title: 'Large File Upload System',
        subtitle: 'Chunked, resumable uploads for GB-scale files with DXF preview',
        summary:
          'Handles GB-scale files with chunked uploads, resumable transfers, progress tracking, retries and DXF preview.',
        coverAlt: 'Illustration of the large file upload system interface (placeholder)',
        highlights: [
          'GB-scale files',
          'Chunk Upload',
          'Resume Upload',
          'Upload Progress',
          'Retry',
          'DXF Preview',
        ],
        caseStudy: {
          overview: [
            'Lets users reliably upload GB-scale files from the browser and preview DXF drawings afterwards.',
            'TODO: Add product background and use cases.',
          ],
          role: {
            title: 'TODO: Title / role',
            responsibilities: ['TODO: What you were responsible for'],
          },
          problem: [
            'Uploading a GB-scale file in a single request means any network interruption fails the whole upload and forces a restart.',
            'TODO: Describe the actual problems and constraints.',
          ],
          architecture: {
            steps: [
              'After a file is selected, split it into fixed-size chunks in the browser',
              'Upload chunks sequentially or in parallel and track the state of each chunk',
              'After an interruption, re-upload only the chunks that did not finish',
              'Once every chunk is uploaded, the backend merges the file',
              'Provide a DXF preview after the upload completes',
            ],
          },
          solution: [
            'Resumable.js handles chunking, resuming and retries, while RxJS manages upload events and progress streams.',
            'TODO: Add implementation details.',
          ],
          challenges: [
            {
              challenge: 'TODO: Technical challenge (e.g. limiting concurrency across many chunks)',
              solution: 'TODO: How it was solved',
            },
          ],
          results: ['TODO: Results (do not add unverified numbers)'],
          learnings: ['TODO: What you learned'],
        },
      },
    },
  },
  {
    slug: 'multi-stream-video-system',
    cover: { src: 'images/projects/multi-stream-video-system.svg', width: 1600, height: 900 },
    technologies: ['Vue', 'WebSocket', 'MSE', 'WebRTC', 'FFmpeg'],
    featured: true,
    content: {
      'zh-TW': {
        title: '多路即時影像系統',
        subtitle: '同時播放 12 路即時影像的低延遲串流與回放',
        summary: '在瀏覽器中同時呈現 12 路即時影像，兼顧低延遲、回放與多路畫面同步。',
        coverAlt: '多路即時影像系統的畫面示意圖（placeholder）',
        highlights: [
          '多路即時影像',
          '12 streams',
          'Realtime streaming',
          'Low latency',
          'Playback',
          'Synchronization',
        ],
        caseStudy: {
          overview: [
            '在單一頁面中同時播放 12 路即時影像，並支援回放與多路畫面同步。',
            'TODO: 補充產品背景與使用情境。',
          ],
          role: {
            title: 'TODO: 職稱／角色',
            responsibilities: ['TODO: 實際負責的範圍'],
          },
          problem: [
            '多路影像同時播放時，需要在延遲、瀏覽器效能與畫面同步之間取得平衡。',
            'TODO: 補充實際遇到的問題與限制。',
          ],
          architecture: {
            steps: [
              'TODO: 影像來源與 FFmpeg 處理流程',
              'TODO: 透過 WebSocket 或 WebRTC 傳送至瀏覽器的方式',
              'TODO: 以 MSE 餵入播放器並處理緩衝',
              'TODO: 多路畫面同步與回放機制',
            ],
          },
          solution: ['TODO: 說明採用的串流架構與取捨。'],
          challenges: [
            {
              challenge: 'TODO: 技術挑戰（例如多路播放時的效能）',
              solution: 'TODO: 對應的解法',
            },
            {
              challenge: 'TODO: 技術挑戰（例如多路畫面同步）',
              solution: 'TODO: 對應的解法',
            },
          ],
          results: ['TODO: 成果（請勿填入未經確認的延遲或效能數字）'],
          learnings: ['TODO: 學到的事'],
        },
      },
      en: {
        title: 'Multi-stream Video System',
        subtitle: 'Low-latency streaming and playback for 12 simultaneous live feeds',
        summary:
          'Displays 12 live video streams at once in the browser, balancing low latency, playback and cross-stream synchronization.',
        coverAlt: 'Illustration of the multi-stream video system (placeholder)',
        highlights: [
          'Multiple live streams',
          '12 streams',
          'Realtime streaming',
          'Low latency',
          'Playback',
          'Synchronization',
        ],
        caseStudy: {
          overview: [
            'Plays 12 live video streams on a single page, with playback and synchronization across streams.',
            'TODO: Add product background and use cases.',
          ],
          role: {
            title: 'TODO: Title / role',
            responsibilities: ['TODO: What you were responsible for'],
          },
          problem: [
            'Playing many streams at once requires balancing latency, browser performance and synchronization.',
            'TODO: Describe the actual problems and constraints.',
          ],
          architecture: {
            steps: [
              'TODO: Video sources and the FFmpeg processing pipeline',
              'TODO: How streams reach the browser over WebSocket or WebRTC',
              'TODO: Feeding the player through MSE and handling buffers',
              'TODO: Synchronization and playback across streams',
            ],
          },
          solution: ['TODO: Explain the streaming architecture and its trade-offs.'],
          challenges: [
            {
              challenge: 'TODO: Technical challenge (e.g. performance with many streams)',
              solution: 'TODO: How it was solved',
            },
            {
              challenge: 'TODO: Technical challenge (e.g. keeping streams in sync)',
              solution: 'TODO: How it was solved',
            },
          ],
          results: ['TODO: Results (do not add unverified latency or performance numbers)'],
          learnings: ['TODO: What you learned'],
        },
      },
    },
  },
  {
    slug: 'b2b-corporate-website',
    cover: { src: 'images/projects/b2b-corporate-website.svg', width: 1600, height: 900 },
    technologies: ['TODO: Framework', 'GA4', 'Cloudflare'],
    featured: true,
    content: {
      'zh-TW': {
        title: 'B2B 企業官網',
        subtitle: '產品管理、規格展示與詢價流程的企業網站',
        summary:
          '提供產品管理、產品規格、線上詢價與 Email 通知的 B2B 企業官網，並處理 SEO 與 GA4 追蹤。',
        coverAlt: 'B2B 企業官網的頁面示意圖（placeholder）',
        highlights: [
          'Product Management',
          'Product Specification',
          'Inquiry',
          'SEO',
          'GA4',
          'Email',
          'Cloudflare',
        ],
        caseStudy: {
          overview: ['TODO: 補充網站目的、目標客群與使用情境。'],
          role: {
            title: 'TODO: 職稱／角色',
            responsibilities: ['TODO: 實際負責的範圍'],
          },
          problem: ['TODO: 補充實際要解決的問題。'],
          solution: ['TODO: 說明產品管理、詢價流程、SEO 與 GA4 的實作方式。'],
          results: ['TODO: 成果（請勿填入未經確認的流量或詢價數字）'],
          learnings: ['TODO: 學到的事'],
        },
      },
      en: {
        title: 'B2B Corporate Website',
        subtitle: 'Corporate site with product management, specifications and inquiries',
        summary:
          'A B2B corporate website with product management, product specifications, online inquiries and email notifications, plus SEO and GA4 tracking.',
        coverAlt: 'Illustration of the B2B corporate website (placeholder)',
        highlights: [
          'Product Management',
          'Product Specification',
          'Inquiry',
          'SEO',
          'GA4',
          'Email',
          'Cloudflare',
        ],
        caseStudy: {
          overview: ['TODO: Describe the purpose of the site, its audience and use cases.'],
          role: {
            title: 'TODO: Title / role',
            responsibilities: ['TODO: What you were responsible for'],
          },
          problem: ['TODO: Describe the actual problem to solve.'],
          solution: [
            'TODO: Explain how product management, the inquiry flow, SEO and GA4 were implemented.',
          ],
          results: ['TODO: Results (do not add unverified traffic or inquiry numbers)'],
          learnings: ['TODO: What you learned'],
        },
      },
    },
  },
]

export const MAX_FEATURED_PROJECTS = 3

/** Lowercase letters and digits, separated by single hyphens. */
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export const featuredProjects: readonly Project[] = projects
  .filter((project) => project.featured)
  .slice(0, MAX_FEATURED_PROJECTS)

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

/** Neighbours in display order; missing at either end. */
export function getAdjacentProjects(slug: string): { previous?: Project; next?: Project } {
  const index = projects.findIndex((project) => project.slug === slug)
  if (index === -1) return {}
  return { previous: projects[index - 1], next: projects[index + 1] }
}
