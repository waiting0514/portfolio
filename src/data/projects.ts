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
    technologies: ['Vue', 'RxJS', 'Resumable.js', 'AWS'],
    featured: true,
    content: {
      'zh-TW': {
        title: '大型檔案上傳系統',
        subtitle: '從單純上傳，演進為支援 CAD 大檔的切割上傳、續傳與直傳 AWS',
        summary:
          '檔案管理系統的大型檔案上傳：隨需求演進加入切割上傳與斷點續傳，最後改為由前端直接上傳至 AWS，避免檔案佔用後端空間。',
        coverAlt: '大型檔案上傳系統的介面示意圖（placeholder）',
        highlights: [
          'CAD 大型檔案',
          'Chunk Upload',
          'Resume Upload',
          '前端直傳 AWS',
          'Upload Progress',
          'DXF Preview',
          '成員存取權限管理',
        ],
        caseStudy: {
          overview: [
            '億集創見應用科技的「檔案管理系統 v2」，讓使用者上傳與管理圖片、影片、CAD 等檔案，並設定與管理成員的存取權限。',
            '上傳功能一開始只是單純的檔案上傳，之後隨著需求一步步演進：CAD 檔案可能非常大，需要支援大檔上傳；大檔上傳太慢，於是做了檔案切割；接著又有續傳的需求；最後為了不讓檔案佔用後端空間，改成直接上傳至 AWS。',
            'TODO: 補充系統的使用者與使用情境。',
          ],
          role: {
            title: '前端工程師 · 億集創見應用科技（2025/06 起）',
            responsibilities: [
              '參與系統維護與新功能開發，負責前端頁面、互動介面與表格',
              '隨需求演進實作檔案上傳：切割上傳、斷點續傳，以及改為前端直接上傳至 AWS',
            ],
          },
          problem: [
            'CAD 檔案可能非常大，原本單純的上傳方式無法應付，而且大檔上傳速度太慢。',
            '上傳中斷時需要能接續，而不是整個檔案重新上傳。',
            '檔案原本先經過後端空間再上傳至 AWS，大檔案讓後端空間撐不住。',
          ],
          architecture: {
            steps: [
              '使用者選擇檔案後，在前端將檔案切割成多個分段',
              '分段由前端直接上傳至 AWS，不經過後端空間',
              '追蹤每個分段的狀態並顯示上傳進度',
              '上傳中斷後，只重新上傳尚未完成的分段',
              '上傳完成後可預覽 DXF 圖檔',
            ],
          },
          solution: [
            '依需求逐步調整上傳流程：先以檔案切割改善大檔上傳過慢的問題，再加入斷點續傳；最後把上傳目的地從後端空間改為 AWS，由前端直接上傳。',
            'TODO: 補充 Resumable.js 與 RxJS 在實作中負責的部分。',
          ],
          challenges: [
            {
              challenge: '大檔上傳速度太慢',
              solution: '將檔案切割成分段上傳。',
            },
            {
              challenge: '上傳中斷後必須整個重新上傳',
              solution: '加入斷點續傳，只重新上傳尚未完成的分段。',
            },
            {
              challenge: '檔案先經過後端空間再轉傳 AWS，後端空間撐不住大檔案',
              solution: '改為由前端直接上傳至 AWS，檔案不再經過後端空間。',
            },
          ],
          results: [
            '支援 CAD 等大型檔案的上傳',
            '上傳中斷後可以續傳，不必重新上傳整個檔案',
            '檔案直接上傳至 AWS，不再佔用後端空間',
            'TODO: 如有確認過的數據（例如檔案大小上限、上傳時間）可補充',
          ],
          learnings: ['TODO: 學到的事'],
        },
      },
      en: {
        title: 'Large File Upload System',
        subtitle:
          'From simple uploads to chunked, resumable uploads of large CAD files sent straight to AWS',
        summary:
          'Large file uploads for a file-management system: chunked and resumable uploads were added as requirements grew, and files are now uploaded straight from the browser to AWS instead of through backend storage.',
        coverAlt: 'Illustration of the large file upload system interface (placeholder)',
        highlights: [
          'Large CAD files',
          'Chunk Upload',
          'Resume Upload',
          'Direct upload to AWS',
          'Upload Progress',
          'DXF Preview',
          'Member access permissions',
        ],
        caseStudy: {
          overview: [
            'File Management System v2 at 億集創見應用科技 lets users upload and manage images, videos and CAD files, and control which members can access them.',
            'Uploading started as a simple file upload and evolved step by step: CAD files can be very large, so large uploads had to be supported; large uploads were too slow, so files were split into chunks; resuming interrupted uploads came next; finally, to keep files off the backend storage, uploads were changed to go directly to AWS.',
            'TODO: Describe who uses the system and how.',
          ],
          role: {
            title: 'Frontend Engineer · 億集創見應用科技 (since 2025/06)',
            responsibilities: [
              'System maintenance and new features: frontend pages, interactive UI and data tables',
              'Evolved the upload flow with the requirements: chunked uploads, resumable uploads, then direct uploads from the browser to AWS',
            ],
          },
          problem: [
            'CAD files can be very large: the original simple upload could not handle them, and large uploads were too slow.',
            'An interrupted upload had to be resumed instead of starting the whole file again.',
            'Files first went through backend storage before being uploaded to AWS, and large files overwhelmed that storage.',
          ],
          architecture: {
            steps: [
              'After a file is selected, the browser splits it into chunks',
              'Chunks are uploaded directly from the browser to AWS, bypassing backend storage',
              'The state of each chunk is tracked and shown as upload progress',
              'After an interruption, only the unfinished chunks are uploaded again',
              'DXF drawings can be previewed once the upload completes',
            ],
          },
          solution: [
            'The upload flow was adjusted as requirements grew: chunking first made large uploads faster, resumable uploads came next, and finally the upload target moved from backend storage to AWS, with the browser uploading directly.',
            'TODO: Describe the parts handled by Resumable.js and RxJS.',
          ],
          challenges: [
            {
              challenge: 'Large file uploads were too slow',
              solution: 'Split files into chunks and upload them separately.',
            },
            {
              challenge: 'An interrupted upload had to start over from the beginning',
              solution: 'Added resumable uploads that only re-send the unfinished chunks.',
            },
            {
              challenge:
                'Files passed through backend storage on their way to AWS, and large files overwhelmed it',
              solution:
                'Upload directly from the browser to AWS so files no longer pass through backend storage.',
            },
          ],
          results: [
            'Large files such as CAD drawings can be uploaded',
            'Interrupted uploads resume instead of re-uploading the whole file',
            'Files go straight to AWS and no longer take up backend storage',
            'TODO: Add verified figures if available (e.g. maximum file size, upload time)',
          ],
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
        subtitle: '12 支攝影機即時監控，以及同時 4 支影片的歷史回放',
        summary:
          '監控系統的即時影像與歷史回放：將 WebRTC 架構改寫為 Vue 版本，即時監控從 1 支擴充到 12 支，並處理多支影片同時回放的卡頓、中斷與倍速問題。',
        coverAlt: '多路即時影像系統的畫面示意圖（placeholder）',
        highlights: [
          '12 支攝影機即時監控',
          'WebRTC',
          '同時 4 支影片歷史回放',
          '時間軸拖放',
          '最高 4 倍速播放',
          '攝影機系統設定',
        ],
        caseStudy: {
          overview: [
            '億集創見應用科技的「監控系統」，讓使用者瀏覽監控攝影機畫面、回放歷史記錄，並進行攝影機的系統設定。',
            '即時監控一開始只有一支攝影機，之後需求改為 12 支；歷史回放則需要同時播放 4 支影片，並支援時間軸拖放。',
            'TODO: 補充系統的使用者與使用情境。',
          ],
          role: {
            title: '前端工程師 · 億集創見應用科技（2025/06 起）',
            responsibilities: [
              '參與系統維護與新功能開發，負責前端頁面、互動介面與表格',
              '將後端同事設計的 WebRTC 架構改寫為 Vue 版本，並優化程式碼',
              '將即時監控從 1 支擴充到 12 支攝影機',
              '開發歷史回放：同時播放 4 支影片、時間軸拖放與倍速播放',
            ],
          },
          problem: [
            '即時監控的需求從 1 支攝影機增加到 12 支。',
            '歷史回放是問題最多的部分：需要同時播放 4 支影片，卻常常卡頓、報錯；歷史記錄中間有中斷的地方，播放時會卡住或跳過。',
            '原本需求要支援 8 倍速播放，但本地瀏覽器負荷不了。',
          ],
          architecture: {
            steps: [
              'WebRTC 串流架構由後端同事設計',
              '前端以 Vue 實作即時監控畫面，同時顯示 12 支攝影機',
              '歷史回放同時播放 4 支影片，並透過快取機制與時間軸拖放控制播放',
              'TODO: 補充影像來源、FFmpeg、WebSocket 與 MSE 在流程中的角色',
            ],
          },
          solution: [
            '將 WebRTC 架構改寫為 Vue 版本並優化程式碼，再依需求擴充到 12 支攝影機。',
            '針對歷史回放反覆調整快取機制與處理中斷片段的程式碼；倍速播放則評估瀏覽器負荷後，將上限從 8 倍調整為 4 倍。',
            'TODO: 補充快取機制的做法，以及最後如何處理歷史記錄中的中斷片段。',
          ],
          challenges: [
            {
              challenge: '同時播放 4 支歷史影片時常常卡頓、報錯',
              solution: '多次調整快取機制。TODO: 補充最後採用的快取做法。',
            },
            {
              challenge: '歷史記錄中間有中斷的部分，播放時會卡住或跳過',
              solution: '多次調整遇到中斷片段時的播放處理。TODO: 補充最後的處理方式。',
            },
            {
              challenge: '需求要求 8 倍速播放，但本地瀏覽器負荷不了',
              solution: '將倍速上限調整為 4 倍。',
            },
          ],
          results: [
            '即時監控支援同時顯示 12 支攝影機',
            '歷史回放支援同時播放 4 支影片、時間軸拖放與最高 4 倍速',
            'TODO: 如有確認過的數據（例如延遲、卡頓改善）可補充',
          ],
          learnings: ['TODO: 學到的事'],
        },
      },
      en: {
        title: 'Multi-stream Video System',
        subtitle: 'Live monitoring of 12 cameras and playback of 4 recordings at once',
        summary:
          'Live view and playback for a surveillance system: rewrote the WebRTC client in Vue, scaled live monitoring from 1 to 12 cameras, and worked through stuttering, gaps and speed limits when playing back several recordings at once.',
        coverAlt: 'Illustration of the multi-stream video system (placeholder)',
        highlights: [
          'Live monitoring of 12 cameras',
          'WebRTC',
          'Playback of 4 recordings at once',
          'Timeline scrubbing',
          'Up to 4x playback speed',
          'Camera settings',
        ],
        caseStudy: {
          overview: [
            'The surveillance system at 億集創見應用科技 lets users browse camera feeds, play back recorded history and configure camera settings.',
            'Live monitoring started with a single camera and the requirement grew to 12; history playback has to play 4 recordings at once and support scrubbing along a timeline.',
            'TODO: Describe who uses the system and how.',
          ],
          role: {
            title: 'Frontend Engineer · 億集創見應用科技 (since 2025/06)',
            responsibilities: [
              'System maintenance and new features: frontend pages, interactive UI and data tables',
              'Rewrote the WebRTC architecture designed by a backend colleague as a Vue implementation and optimized the code',
              'Scaled live monitoring from 1 to 12 cameras',
              'Built history playback: 4 recordings at once, timeline scrubbing and faster playback speeds',
            ],
          },
          problem: [
            'Live monitoring had to grow from 1 camera to 12.',
            'History playback caused the most problems: it has to play 4 recordings at once, yet often stuttered or threw errors, and gaps in the recorded history made playback get stuck or skip.',
            'The original requirement was 8x playback speed, but the local browser could not keep up.',
          ],
          architecture: {
            steps: [
              'The WebRTC streaming architecture was designed by a backend colleague',
              'The frontend, built with Vue, shows 12 live camera feeds at once',
              'History playback plays 4 recordings at once, using a caching mechanism and a draggable timeline',
              'TODO: Describe the roles of the video sources, FFmpeg, WebSocket and MSE in the flow',
            ],
          },
          solution: [
            'Rewrote the WebRTC client as a Vue implementation and optimized the code, then scaled it to 12 cameras.',
            'For history playback, iterated many times on the caching mechanism and on how gaps in recordings are handled; for faster playback, lowered the maximum speed from 8x to 4x after the browser could not keep up.',
            'TODO: Describe the caching approach and how gaps in the recorded history are finally handled.',
          ],
          challenges: [
            {
              challenge: 'Playing 4 recordings at once often stuttered or threw errors',
              solution:
                'Adjusted the caching mechanism many times. TODO: Describe the final caching approach.',
            },
            {
              challenge: 'Gaps in the recorded history made playback get stuck or skip',
              solution:
                'Reworked how playback handles gaps many times. TODO: Describe the final approach.',
            },
            {
              challenge:
                'The requirement asked for 8x playback, but the local browser could not keep up',
              solution: 'Lowered the maximum playback speed to 4x.',
            },
          ],
          results: [
            'Live monitoring shows 12 cameras at once',
            'History playback supports 4 recordings at once, timeline scrubbing and up to 4x speed',
            'TODO: Add verified figures if available (e.g. latency, reduced stuttering)',
          ],
          learnings: ['TODO: What you learned'],
        },
      },
    },
  },
  {
    slug: 'b2b-corporate-website',
    cover: { src: 'images/projects/b2b-corporate-website.svg', width: 1600, height: 900 },
    technologies: ['Laravel', 'Vue', 'GitHub Actions', 'Linode', 'GA4', 'Cloudflare'],
    featured: true,
    content: {
      'zh-TW': {
        title: 'B2B 企業官網',
        subtitle: '個人接案：Laravel 前台兼顧 SEO、Vue 後台管理產品與詢價',
        summary:
          '個人接案的 B2B 企業官網：前台以 Laravel 開發以兼顧 SEO，後台以 Vue + API 管理產品與規格，並透過 GitHub Actions 部署到 Linode。',
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
          overview: [
            '個人接案開發的 B2B 企業官網，包含產品管理、產品規格展示、線上詢價與 Email 通知，並處理 SEO 與 GA4 追蹤。',
            'TODO: 補充客戶產業、網站目的與目標客群（避免透露客戶的機密資訊）。',
          ],
          role: {
            title: '接案開發者（個人承接）',
            responsibilities: [
              '以 Laravel 開發前台網站',
              '以 Vue + API 開發後台管理',
              '以 GitHub Actions 建立部署流程，部署到 Linode 主機',
            ],
          },
          problem: [
            '企業官網需要被搜尋引擎收錄，前台頁面必須對 SEO 友善；同時客戶需要一個後台來管理產品與規格。',
          ],
          architecture: {
            steps: [
              '後台以 Vue 開發，透過 API 管理產品與產品規格',
              '前台以 Laravel 開發，考量 SEO 由伺服器輸出頁面內容',
              '訪客可在前台瀏覽產品規格並送出詢價',
              '透過 GitHub Actions 部署到 Linode 主機',
              'TODO: 補充 Email 通知、GA4 與 Cloudflare 在架構中的位置',
            ],
          },
          solution: [
            '將前台與後台分開：前台考量 SEO 使用 Laravel，後台使用 Vue + API，並以 GitHub Actions 自動部署到 Linode。',
            'TODO: 補充 SEO、GA4 與 Email 通知的實作細節。',
          ],
          challenges: [
            {
              challenge: '企業官網的前台頁面需要對搜尋引擎友善',
              solution: '前台改用 Laravel 開發，由伺服器輸出頁面內容。',
            },
          ],
          results: [
            '網站透過 GitHub Actions 部署到 Linode',
            'TODO: 成果（請勿填入未經確認的流量或詢價數字）',
          ],
          learnings: ['TODO: 學到的事'],
        },
      },
      en: {
        title: 'B2B Corporate Website',
        subtitle:
          'Freelance project: SEO-friendly Laravel site with a Vue admin for products and inquiries',
        summary:
          'A freelance B2B corporate website: the public site is built with Laravel for SEO, the admin uses Vue with an API to manage products and specifications, and GitHub Actions deploys it to Linode.',
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
          overview: [
            'A B2B corporate website I built as a freelance project, with product management, product specifications, online inquiries and email notifications, plus SEO and GA4 tracking.',
            "TODO: Describe the client's industry, the site's purpose and its audience (without confidential details).",
          ],
          role: {
            title: 'Freelance developer',
            responsibilities: [
              'Built the public website with Laravel',
              'Built the admin with Vue and an API',
              'Set up deployment to a Linode server with GitHub Actions',
            ],
          },
          problem: [
            'A corporate website has to be indexed by search engines, so the public pages must be SEO-friendly; the client also needed an admin to manage products and specifications.',
          ],
          architecture: {
            steps: [
              'The admin, built with Vue, manages products and specifications through an API',
              'The public site, built with Laravel, renders pages on the server for SEO',
              'Visitors browse product specifications and send inquiries on the public site',
              'GitHub Actions deploys the site to a Linode server',
              'TODO: Describe where email notifications, GA4 and Cloudflare fit in',
            ],
          },
          solution: [
            'Separated the public site from the admin: Laravel for the public site because of SEO, Vue with an API for the admin, and automatic deployment to Linode with GitHub Actions.',
            'TODO: Describe how SEO, GA4 and email notifications were implemented.',
          ],
          challenges: [
            {
              challenge:
                'The public pages of a corporate website need to be search-engine friendly',
              solution: 'Built the public site with Laravel so pages are rendered on the server.',
            },
          ],
          results: [
            'The site is deployed to Linode through GitHub Actions',
            'TODO: Results (do not add unverified traffic or inquiry numbers)',
          ],
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
