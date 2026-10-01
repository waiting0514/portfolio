import type { Project } from '@/types/project'

/**
 * All portfolio projects, in display order.
 *
 * Content rules:
 * - Never invent metrics, user counts, KPIs or confidential details: use `TODO:` placeholders.
 * - Leave a case study section out entirely when nothing is known about it.
 * - Work projects must not reveal client names, internal hosts, API paths or source locations.
 *
 * This module is imported by build-time code in Node, so it must not use `import.meta.env`
 * or import assets. Images live in `public/` and are referenced by relative path.
 */
export const projects: readonly Project[] = [
  {
    slug: 'social-media-platform',
    cover: { src: 'images/projects/social-media-platform.svg', width: 1600, height: 900 },
    technologies: [
      'Vue 3',
      'Vite',
      'Vue Router',
      'vue-i18n',
      'Arco Design Vue',
      'ECharts',
      'Axios',
    ],
    featured: false,
    status: 'in-development',
    labels: ['Real-world Project', 'Frontend Development'],
    content: {
      'zh-TW': {
        title: '社群管理平台',
        subtitle: 'Social Media Management Platform',
        summary:
          '將 AI 輔助產生的初步需求轉換為可實作的前端架構、操作流程與 UI，負責需求分析、Component Design、State / Data Flow 與前端互動邏輯。',
        coverAlt: '社群管理平台的封面 placeholder：實際畫面待確認可公開後補上',
        highlights: [
          '需求分析與缺漏情境補齊',
          '使用者流程與狀態設計',
          'Component Design',
          'State / Data Flow',
          'Mock 資料層與 API-ready 設計',
          '前端商業邏輯',
        ],
        caseStudy: {
          overview: [
            '公司內部開發中的社群管理平台。專案初期由主管提供 AI 輔助產生的需求草稿，我負責將初步需求轉換為可實作的前端功能、操作流程與頁面架構，並完成前端 UI 與互動邏輯。',
            '平台把 Facebook、Instagram、LINE、YouTube、Threads、TikTok、LinkedIn 的發文與訊息收在同一個後台，流程分為前置設定、內容產製、客服回覆、導流轉換與成效稽核五個階段。',
            '這個 Case Study 的重點不是功能清單，而是如何把 AI 產生的模糊需求，轉換成真正可以實作的前端產品。',
          ],
          background: {
            paragraphs: [
              '專案開始時沒有完整的 UI 設計稿，也沒有完整的系統規格。手上的資料是主管以 AI 輔助產生的需求草稿：它描述系統「應該有什麼功能」，但沒有定義使用者怎麼操作、資料會經過哪些狀態，也沒有處理例外情況。',
              '因此不能直接開始寫程式：前端必須先把需求整理清楚，才知道要做哪些頁面、元件與狀態。',
            ],
            flow: ['AI 產生的需求草稿', '功能描述', '部分使用者流程', '商業需求'],
          },
          role: {
            title: '前端工程師',
            responsibilities: [
              '我的角色不只是 UI 實作，而是把不完整的需求轉換成可實作的前端系統：從理解與分析需求開始，一路到頁面架構、元件、狀態、Mock 資料與 UI，並讓程式結構可以直接接上未來的後端 API。',
            ],
            flow: [
              'Requirement Understanding',
              'Requirement Analysis',
              'User Flow Design',
              'Page Structure',
              'Frontend Architecture',
              'Component Design',
              'State / Data Flow',
              'Mock Data',
              'UI Implementation',
              'Interaction Logic',
              'API-ready Structure',
            ],
          },
          problem: [
            'AI 產生的需求文件通常只描述「系統應該有什麼功能」，不足以直接轉換成程式。一句需求背後，前端還需要定義完整的操作流程、每個步驟的資料、可能的狀態，以及失敗時畫面該怎麼呈現。',
            '例如三個平台送出、一個成功兩個失敗時，狀態應該是「部分失敗」而不是「失敗」，而且重試時只能重送失敗的平台。這類規則不會出現在需求草稿裡，卻直接決定了資料結構與畫面。',
          ],
          problemExample: {
            heading: '從 AI 需求到可實作的產品',
            requirement: '「系統需要支援社群貼文排程管理」',
            flow: [
              '建立貼文',
              '選擇社群平台',
              '選擇帳號',
              '輸入內容',
              '上傳媒體',
              '立即發布／排程',
              '選擇日期與時間',
              '儲存',
              '發布中',
              '成功／失敗',
            ],
            states: ['草稿', '已排程', '發布中', '已發布', '部分失敗', '失敗'],
          },
          workflow: [
            'AI 需求草稿',
            '需求分析',
            '找出缺漏情境',
            '使用者流程',
            '頁面與功能定義',
            'Component Design',
            'State & Data Flow',
            'Mock Data',
            'UI 實作',
            '前端邏輯',
            '後端 API 整合（未來）',
          ],
          architecture: {
            steps: [
              '表現層：layouts 負責導覽、側邊選單、組織（租戶）切換與全域異常提示；views 依業務模組劃分（收件匣、發布與排程、社群帳號、成效分析、行銷活動、主控台）；components 分為通用元件（圖表、平台圖示、面板）與領域元件',
              '狀態與業務邏輯層：composables 以模組層級的單例響應式狀態讓多個頁面共用資料（未使用 Pinia），並封裝跨平台發布檢核、權限、列表查詢與篩選等邏輯；切換租戶時統一清空，避免資料混用',
              '服務層：每個業務 API 模組對外提供一致的函式，內部以開關決定呼叫 Mock 或真實後端；HTTP 請求統一處理授權標頭、語系與錯誤格式',
              'Mock 層：記憶體中的可變資料庫，新增、回覆、審核、發布等操作會直接修改資料；預先建立多租戶與各種邊界狀態（授權過期、部分發布失敗、AI 配額限制），並模擬網路延遲與標準化的錯誤回應',
              '基礎層：領域常數（錯誤代碼、平台權限、角色）、路由與選單權限、多語系字典與樣式 token',
            ],
          },
          responsibilities: [
            {
              title: 'Requirement Analysis',
              description: '把 AI 產生的初步規格轉換成實際可開發的需求，找出缺漏的情境與例外。',
            },
            {
              title: 'User Flow',
              description:
                '補齊不同功能之間的操作流程與狀態，例如發文從草稿、排程、發布中，到部分失敗與重試的完整過程。',
            },
            {
              title: 'UI Implementation',
              description:
                '依整理後的需求完成前端頁面，涵蓋社群帳號、發文與排程、收件匣、導流轉換與成效分析等模組。',
            },
            {
              title: 'Component Design',
              description: '將功能拆分成可維護、可重用的元件：通用元件，以及依業務領域劃分的元件。',
            },
            {
              title: 'State & Data Flow',
              description:
                '以 composables 管理跨頁共用的狀態與資料流，並在切換租戶時統一重置，避免資料混用。',
            },
            {
              title: 'Business Logic',
              description:
                '處理畫面背後的規則，而不只是切版：部分失敗時只重試失敗的平台；送出前就檢核各平台的字數、附圖與影片長度規則；超過平台回覆時限時停用回覆框並說明原因；平台沒有提供的指標顯示「—」而不是 0。',
            },
            {
              title: 'API-ready Design',
              description:
                '後端尚未完整串接，因此每個 API 模組以開關切換 Mock 與真實請求；Mock 層也模擬延遲與標準化錯誤，讓前端的錯誤處理現在就能被驗證，之後接上後端時頁面不需要改寫。',
            },
          ],
          aiAssisted: {
            paragraphs: [
              'AI 在這個專案中是需求與開發流程中的輔助工具，而不是自動產生整個系統的工具：需求草稿由 AI 輔助產生，開發時也以 AI 協助產生程式碼草稿。',
              'AI 可以產生初步規格與程式碼，但工程師仍然需要判斷需求是否合理，並把它轉換成可維護、可實際運作的產品。',
            ],
            humanTasks: [
              '需求驗證',
              '找出缺漏的情境',
              '架構決策',
              '使用者流程',
              '狀態設計',
              'Component Design',
              '商業邏輯',
              'Code Review',
              '整合決策',
            ],
          },
          currentStatus: [
            { label: '專案狀態', value: '開發中（In Development）' },
            { label: 'Frontend UI／Logic', value: '開發中' },
            {
              label: 'Mock Data',
              value: '記憶體 Mock 資料庫已建立，目前所有業務 API 皆使用 Mock',
            },
            { label: 'Backend Integration', value: '待整合（Pending）' },
            { label: '公開範圍', value: '公司內部專案，不提供原始碼、GitHub 與 Live Demo' },
          ],
          learnings: [
            '如何處理不完整的需求：先補齊情境與例外，再開始寫程式',
            '如何從產品需求推導出使用者流程與資料狀態',
            '如何在後端尚未完成時設計前端，讓介面與資料層各自前進',
            '如何建立可替換的 Mock 資料層，讓之後接上真實 API 時頁面不需要改寫',
            '如何讓元件與商業邏輯保持分離，維持可維護性',
            '如何把 AI 當作輔助工具：用它加速，但需求判斷與架構決策仍由工程師負責',
          ],
        },
      },
      en: {
        title: 'Social Media Management Platform',
        subtitle: 'Turning AI-generated requirements into an implementable frontend product',
        summary:
          'Turned AI-assisted draft requirements into an implementable frontend architecture, user flows and UI, owning requirement analysis, component design, state and data flow, and frontend interaction logic.',
        coverAlt:
          'Placeholder cover for the social media management platform; screenshots will be added once approved',
        highlights: [
          'Requirement analysis and missing scenarios',
          'User flows and state design',
          'Component design',
          'State / data flow',
          'Mock data layer and API-ready design',
          'Frontend business logic',
        ],
        caseStudy: {
          overview: [
            'A social media management platform in development at my company. The project started from a requirement draft my manager produced with AI assistance; I turned it into implementable frontend features, user flows and page architecture, and built the frontend UI and interaction logic.',
            'The platform brings posts and messages from Facebook, Instagram, LINE, YouTube, Threads, TikTok and LinkedIn into one admin, organized in five stages: setup, content production, customer replies, conversion, and performance review.',
            'This case study is not about the feature list; it is about turning vague, AI-generated requirements into a frontend product that can actually be built.',
          ],
          background: {
            paragraphs: [
              'The project had no complete UI design and no complete system specification. The input was an AI-assisted requirement draft from my manager: it described what the system should do, but not how people would use it, which states the data goes through, or what happens in edge cases.',
              'So coding could not start right away: the frontend first had to make the requirements concrete to know which pages, components and states were needed.',
            ],
            flow: [
              'AI-generated requirement draft',
              'Feature description',
              'Partial user flow',
              'Business requirement',
            ],
          },
          role: {
            title: 'Frontend Engineer',
            responsibilities: [
              'My role went beyond UI implementation: I turned incomplete requirements into an implementable frontend system, from understanding and analysing the requirements to page structure, components, state, mock data and UI, structured so it can connect to the future backend API directly.',
            ],
            flow: [
              'Requirement Understanding',
              'Requirement Analysis',
              'User Flow Design',
              'Page Structure',
              'Frontend Architecture',
              'Component Design',
              'State / Data Flow',
              'Mock Data',
              'UI Implementation',
              'Interaction Logic',
              'API-ready Structure',
            ],
          },
          problem: [
            'AI-generated requirement documents usually describe what a system should have, which is not enough to write code from. Behind a single requirement, the frontend still has to define the full user flow, the data at each step, the possible states, and what the screen shows when something fails.',
            'For example, when a post is sent to three platforms and only one succeeds, the status should be “partially failed” rather than “failed”, and a retry must only resend to the failed platforms. Rules like these never appear in the draft, yet they shape both the data structure and the UI.',
          ],
          problemExample: {
            heading: 'From AI-generated requirements to an implementable product',
            requirement: '“The system needs to support scheduling social media posts.”',
            flow: [
              'Create post',
              'Select social platform',
              'Select account',
              'Enter content',
              'Upload media',
              'Publish now / Schedule',
              'Select date and time',
              'Save',
              'Publishing',
              'Success / Failure',
            ],
            states: ['Draft', 'Scheduled', 'Publishing', 'Published', 'Partially failed', 'Failed'],
          },
          workflow: [
            'AI requirement draft',
            'Requirement analysis',
            'Identify missing scenarios',
            'User flow',
            'Page / feature definition',
            'Component design',
            'State & data flow',
            'Mock data',
            'UI implementation',
            'Frontend logic',
            'Backend API integration (future)',
          ],
          architecture: {
            steps: [
              'Presentation layer: layouts provide navigation, the side menu, organization (tenant) switching and global error banners; views are organized by business module (inbox, publishing and scheduling, social accounts, analytics, campaigns, dashboard); components are split into shared components (charts, platform icons, panels) and domain components',
              'State and business logic layer: composables share state across pages through module-level singleton reactive state (no Pinia) and encapsulate logic such as cross-platform publish validation, permissions and list queries; switching tenants clears all tenant-scoped state so data never mixes',
              'Service layer: each business API module exposes the same functions and uses a switch to call either the mock or the real backend; HTTP requests share one place for authorization headers, language and error normalization',
              'Mock layer: an in-memory, mutable database where creating, replying, approving and publishing change the data directly; it ships with multiple tenants and edge cases (expired authorization, partially failed publishing, AI quota limits) and simulates network delay and standardized error responses',
              'Infrastructure layer: domain constants (error codes, platform permissions, roles), routes and menu permissions, localization dictionaries and style tokens',
            ],
          },
          responsibilities: [
            {
              title: 'Requirement Analysis',
              description:
                'Turned the AI-generated draft into requirements that can actually be built, and identified missing scenarios and edge cases.',
            },
            {
              title: 'User Flow',
              description:
                'Filled in the flows and states between features, such as a post’s full lifecycle from draft, scheduled and publishing to partial failure and retry.',
            },
            {
              title: 'UI Implementation',
              description:
                'Built the frontend pages from the refined requirements, covering social accounts, publishing and scheduling, the inbox, conversion and analytics.',
            },
            {
              title: 'Component Design',
              description:
                'Split features into maintainable, reusable components: shared components and components organized by business domain.',
            },
            {
              title: 'State & Data Flow',
              description:
                'Managed state and data flow shared across pages with composables, resetting everything when the tenant changes so data never mixes.',
            },
            {
              title: 'Business Logic',
              description:
                'Handled the rules behind the UI, not just the layout: retry only the platforms that failed; validate each platform’s length, image and video rules before submitting; disable the reply box with an explanation once a platform’s reply window has passed; show “—” instead of 0 for metrics a platform does not provide.',
            },
            {
              title: 'API-ready Design',
              description:
                'With the backend not yet fully integrated, each API module switches between mock and real requests, and the mock layer simulates delays and standardized errors, so frontend error handling can be verified now and pages will not need rewriting once the backend is connected.',
            },
          ],
          aiAssisted: {
            paragraphs: [
              'In this project AI is an assistant within the requirements and development workflow, not a tool that generates the whole system: the requirement draft was produced with AI assistance, and AI also helps draft code during development.',
              'AI can produce early specifications and code, but an engineer still has to judge whether the requirements make sense and turn them into a product that is maintainable and actually works.',
            ],
            humanTasks: [
              'Requirement validation',
              'Identifying missing scenarios',
              'Architecture decisions',
              'User flows',
              'State design',
              'Component design',
              'Business logic',
              'Code review',
              'Integration decisions',
            ],
          },
          currentStatus: [
            { label: 'Project status', value: 'In Development' },
            { label: 'Frontend UI / Logic', value: 'In progress' },
            {
              label: 'Mock Data',
              value: 'In-memory mock database in place; all business APIs currently use mocks',
            },
            { label: 'Backend Integration', value: 'Pending' },
            {
              label: 'Visibility',
              value: 'Internal company project: no source code, GitHub or live demo',
            },
          ],
          learnings: [
            'Handling incomplete requirements: fill in scenarios and edge cases before writing code',
            'Deriving user flows and data states from product requirements',
            'Designing the frontend while the backend is unfinished, so UI and data layers can progress independently',
            'Building a replaceable mock data layer so pages do not need rewriting when the real API arrives',
            'Keeping components and business logic separate for maintainability',
            'Using AI as an assistant: it speeds things up, but requirement judgement and architecture decisions stay with the engineer',
          ],
        },
      },
    },
  },
  {
    slug: 'large-file-upload-system',
    cover: { src: 'images/projects/file-management-cover.jpg', width: 1600, height: 900 },
    technologies: ['Vue', 'AWS S3', 'WebGL', 'Resumable.js'],
    featured: true,
    content: {
      'zh-TW': {
        title: '檔案管理系統：大檔上傳與 CAD 檢視',
        subtitle: '單檔 5 GB、單次 100 檔的背景批次上傳，以及列表 hover 即可預覽的 CAD 檢視',
        summary:
          '檔案管理系統的上傳與 CAD 檢視：以分級分片、雙層併發排程與重試續傳支援單檔 5 GB 直傳 S3；CAD 檢視以單例 WebGL 與縮圖快取，讓列表 hover 預覽不再耗盡資源。',
        coverAlt: '檔案管理系統的文件管理頁面，開啟中的「上傳檔案」對話框',
        facts: { company: '億集創見應用科技', period: '2025/06 起' },
        highlights: [
          '單檔 5 GB・單次 100 檔',
          '依檔案大小分級分片（10／16／32 MB）',
          '全域 3、單檔 1 的併發排程',
          '重試、續傳與對帳',
          'S3 直傳（單次／分段）',
          '跨頁背景上傳',
          'CAD hover 縮圖與全螢幕檢視',
          '成員存取權限管理',
        ],
        caseStudy: {
          overview: [
            '億集創見應用科技的「檔案管理系統 v2」，讓使用者上傳與管理圖片、影片、CAD 等檔案。管理員建立資料夾結構並設定權限，使用者依權限上傳、預覽、下載與分享文件，系統也提供版本紀錄、垃圾桶與活動紀錄。',
            '上傳一開始只是單純的檔案上傳，之後隨需求一步步演進：CAD 檔案可能非常大，需要支援大檔上傳；大檔上傳太慢，於是做了檔案切割；接著又有續傳的需求；最後為了不讓檔案佔用後端空間，改成直接上傳至 AWS。',
            '這個 Case Study 聚焦在兩個機制：大檔批次上傳，以及 CAD 圖檔檢視。',
          ],
          role: {
            title: '前端工程師',
            responsibilities: [
              '參與系統維護與新功能開發，負責前端頁面、互動介面與表格',
              '大檔批次上傳：分片、併發排程、重試續傳、S3 直傳與跨頁進度',
              'CAD 圖檔檢視：列表 hover 縮圖與全螢幕檢視',
            ],
          },
          problem: [
            '需求的硬條件決定了設計：單檔最大 5 GB、單次最多 100 檔、檔案以動輒數百 MB 的 CAD／BIM 圖檔為主、網路不穩定，而且使用者不該被綁在上傳畫面上。',
            '檔案原本先經過後端空間再上傳至 AWS，大檔案讓後端空間撐不住。',
            'CAD 預覽使用的套件是全域單例，destroy() 也不會真正釋放 WebGL context。每次預覽都重建 viewer 的直覺做法，在列表上 hover 十幾次後就會碰到瀏覽器的 WebGL context 上限而無法顯示。',
          ],
          architecture: {
            steps: [
              '畫面層只做前置檢查（檔數上限、剩餘容量），把上傳交給 store',
              'store 以「批次（session）／檔案（task）」兩層模型與狀態機，集中管理排程、重試續傳與進度',
              '建立批次時由後端依環境與檔案大小決定策略：S3 單次直傳、S3 分段直傳，或退回後端分片上傳',
              '分片依檔案大小分級，由排程器在全域與單檔兩個併發上限內送出',
              '上傳完成後輪詢處理狀態，並以輕量的訊號通知列表頁自動刷新',
              'CAD 檢視只有一個常駐容器與單例 viewer，在列表縮圖與全螢幕燈箱之間搬移，不重建 WebGL',
            ],
          },
          solution: [
            '上傳以兩層模型與狀態機管理，所有排程集中在 store，API 層只是薄封裝。是否直傳 S3 由後端依部署環境決定，不符合條件的檔案自動退回後端分片，讓「走不走 S3」成為部署決策，而不是寫死在前端。',
            '大檔以分級分片平衡請求數與單片重試成本；失敗只對網路錯誤與 5xx 以指數退避重試，4xx 直接失敗；續傳前先向 S3 或後端對帳已完成的分片，避免重傳已成功的部分。',
            '上傳在背景跨頁進行。列表頁只監聽一個輕量的刷新訊號，上傳相關程式以動態 import 載入，不會進入首屏 bundle。既有的「更新版本」流程則保留以 Resumable.js 上傳。',
            'CAD 檢視不再每次重建：單一容器在掛載點之間搬移（搬移 DOM 會保留 WebGL context），開檔以佇列序列化，並用遞增序號作廢已過時的請求。',
          ],
          challenges: [
            {
              challenge: '5 GB 的檔案若分片太小會產生數百個請求，太大則單片失敗的重傳成本高',
              solution:
                '依檔案大小分級：小於 100 MB 用 10 MB、100 MB 到 1 GB 用 16 MB、超過 1 GB 用 32 MB。分片大小只看檔案大小、不看網速，讓總片數保持可預測，與後端對帳時不會出錯。',
            },
            {
              challenge: '多檔同時上傳時，只取佇列隊頭會讓同一個檔案的下一片卡住其他檔案',
              solution:
                '手寫排程器：全域同時最多 3 片、單一檔案 1 片（循序送出，後端合併時不必處理亂序），並往後尋找第一個所屬檔案仍有額度的分片，避免隊頭阻塞。',
            },
            {
              challenge: '大檔直傳 S3 可能需要上千個分段簽章，一次全部取得會有過期風險',
              solution:
                '每次向後端索取 20 個分段的簽章，同一檔案同時上傳 3 個分段；分段失敗重試前先把已回報的進度扣回，避免重複計算讓進度條超過 100%。',
            },
            {
              challenge: '上傳進度事件每秒觸發數十次，大批次上傳時整個進度面板重繪卡頓',
              solution:
                '以 200 ms 的 leading＋trailing 節流更新進度，完成時強制立即更新；同時降低了把狀態寫入 localStorage 的頻率。',
            },
            {
              challenge: '在列表上反覆 hover 預覽 CAD，十幾次後 WebGL context 失效',
              solution:
                '改為單例 viewer 加上常駐容器，容器在掛載點之間搬移而不重建。縮圖模式略過字型載入以加速，並把第一次的渲染結果截圖存入 60 筆的 LRU 快取；判定為空白的截圖不存入，避免之後一直顯示空白。',
            },
          ],
          results: [
            '支援單檔最大 5 GB、單次最多 100 檔的背景批次上傳，可跨頁進行，完成後自動刷新列表',
            '失敗或中斷後可續傳，只重傳未完成的分片；部分成功的批次會標示完成與未完成的數量，而不是整批顯示失敗',
            '檔案直接上傳至 S3，不再佔用後端空間；不支援直傳的環境自動退回後端分片上傳',
            'CAD 圖檔可在列表 hover 預覽，第二次 hover 由快取立即顯示，也不再因反覆預覽耗盡 WebGL context',
            'TODO: 如有確認過的數據（例如上傳時間）可補充',
          ],
          learnings: ['TODO: 學到的事'],
        },
      },
      en: {
        title: 'File Management: Large Uploads & CAD Viewer',
        subtitle:
          'Background batch uploads of up to 100 files and 5 GB per file, plus CAD previews on hover',
        summary:
          'Uploads and CAD viewing for a file-management system: tiered chunking, a two-level concurrency scheduler and resumable retries support 5 GB files uploaded straight to S3; a singleton WebGL viewer with a thumbnail cache keeps hover previews from exhausting resources.',
        coverAlt:
          'The document management page of the file management system with the “Upload files” dialog open',
        facts: { company: '億集創見應用科技', period: 'Since 2025/06' },
        highlights: [
          '5 GB per file, 100 files per batch',
          'Chunk size tiered by file size (10 / 16 / 32 MB)',
          'Concurrency: 3 overall, 1 per file',
          'Retries, resuming and reconciliation',
          'Direct upload to S3 (single / multipart)',
          'Background uploads across pages',
          'CAD thumbnails on hover and full-screen viewer',
          'Member access permissions',
        ],
        caseStudy: {
          overview: [
            'File Management System v2 at 億集創見應用科技 lets users upload and manage images, videos and CAD files. Administrators set up folders and permissions; users upload, preview, download and share documents according to their permissions, with version history, a recycle bin and an activity log.',
            'Uploading started as a simple file upload and evolved step by step: CAD files can be very large, so large uploads had to be supported; large uploads were too slow, so files were split into chunks; resuming interrupted uploads came next; finally, to keep files off the backend storage, uploads were changed to go directly to AWS.',
            'This case study focuses on two mechanisms: large batch uploads and the CAD viewer.',
          ],
          role: {
            title: 'Frontend Engineer',
            responsibilities: [
              'System maintenance and new features: frontend pages, interactive UI and data tables',
              'Large batch uploads: chunking, concurrency scheduling, retries and resuming, direct S3 uploads and progress across pages',
              'CAD viewer: thumbnails on hover in the file list and a full-screen viewer',
            ],
          },
          problem: [
            'Hard requirements drove the design: up to 5 GB per file, up to 100 files per batch, mostly CAD/BIM drawings of several hundred MB, unreliable networks, and users should not be tied to the upload screen.',
            'Files first went through backend storage before being uploaded to AWS, and large files overwhelmed that storage.',
            'The CAD viewer library is a global singleton, and its destroy() does not actually release the WebGL context. Rebuilding the viewer for every preview hit the browser’s WebGL context limit after a dozen or so hovers in the file list.',
          ],
          architecture: {
            steps: [
              'The page only runs pre-checks (file count limit, remaining quota) and hands the upload to a store',
              'The store manages scheduling, retries and progress with a two-level model (session / task) and a state machine',
              'When a batch is created, the backend picks the strategy by environment and file size: single S3 upload, S3 multipart upload, or a fallback to chunked uploads through the backend',
              'Chunks are sized by file size and sent by a scheduler within an overall limit and a per-file limit',
              'After uploading, the store polls for processing status and signals the file list to refresh',
              'The CAD viewer uses one persistent container and a singleton viewer, moved between list thumbnails and the full-screen lightbox without rebuilding WebGL',
            ],
          },
          solution: [
            'Uploads are managed by a two-level model and a state machine; all scheduling lives in the store and the API layer stays thin. Whether to upload directly to S3 is decided by the backend per deployment, and files that do not qualify fall back to backend chunking, so using S3 is a deployment decision rather than something hard-coded in the frontend.',
            'Tiered chunk sizes balance the number of requests against the cost of retrying a chunk. Only network errors and 5xx responses are retried, with exponential backoff; 4xx responses fail immediately. Before resuming, the client reconciles completed chunks with S3 or the backend so it never re-sends what already succeeded.',
            'Uploads run in the background across pages. The file list only watches a lightweight refresh signal, and the upload runtime is loaded with a dynamic import so it stays out of the initial bundle. The existing “upload new version” flow still uses Resumable.js.',
            'The CAD viewer is no longer rebuilt: a single container moves between mount points (moving a DOM node keeps its WebGL context), file opens are serialized in a queue, and an incrementing token discards requests that have been superseded.',
          ],
          challenges: [
            {
              challenge:
                'For 5 GB files, small chunks mean hundreds of requests while large chunks make each retry expensive',
              solution:
                'Chunk size is tiered by file size: 10 MB under 100 MB, 16 MB up to 1 GB and 32 MB above that. It depends only on file size, not network speed, so the chunk count stays predictable when reconciling with the backend.',
            },
            {
              challenge:
                'With several files uploading, always taking the head of the queue let one file’s next chunk block every other file',
              solution:
                'A hand-written scheduler allows 3 chunks overall and 1 per file (sequential per file, so the backend never has to merge out of order), and picks the first queued chunk whose file still has capacity, avoiding head-of-line blocking.',
            },
            {
              challenge:
                'Direct S3 uploads of large files can need thousands of part signatures, which may expire if requested all at once',
              solution:
                'Request signatures 20 parts at a time and upload 3 parts of a file concurrently. Before retrying a failed part, subtract its reported progress so the progress bar never double-counts past 100%.',
            },
            {
              challenge:
                'Upload progress events fire dozens of times per second, and large batches made the whole progress panel stutter',
              solution:
                'Throttle progress updates to 200 ms (leading and trailing), with an immediate update on completion; this also cut how often state is written to localStorage.',
            },
            {
              challenge:
                'Repeatedly hovering CAD files in the list lost the WebGL context after a dozen or so previews',
              solution:
                'Switched to a singleton viewer with a persistent container that moves between mount points instead of being rebuilt. Thumbnail mode skips font loading for speed, and the first render is captured into a 60-entry LRU cache; blank captures are never cached, so a blank thumbnail cannot stick.',
            },
          ],
          results: [
            'Background batch uploads of up to 100 files and 5 GB per file, continuing across pages and refreshing the file list when done',
            'Failed or interrupted uploads resume and only re-send unfinished chunks; partially successful batches report how many files finished instead of failing the whole batch',
            'Files go straight to S3 and no longer take up backend storage; environments without direct upload fall back to backend chunking',
            'CAD drawings preview on hover, a second hover is served instantly from the cache, and repeated previews no longer exhaust WebGL contexts',
            'TODO: Add verified figures if available (e.g. upload times)',
          ],
          learnings: ['TODO: What you learned'],
        },
      },
    },
  },
  {
    slug: 'multi-stream-video-system',
    cover: { src: 'images/projects/surveillance-cover.jpg', width: 1600, height: 900 },
    technologies: ['Vue', 'WebRTC', 'WebSocket', 'MSE'],
    featured: true,
    content: {
      'zh-TW': {
        title: '監控系統：即時串流與多路回放',
        subtitle: '以 WebRTC 同時監看 12 支攝影機，以自建的 MSE 播放引擎同步回放 4 路歷史影像',
        summary:
          '監控系統的前端：以 WebSocket 信令建立 WebRTC 連線顯示 12 路即時影像；歷史回放以 MSE 自建播放引擎，處理錄影空檔、倍速緩衝與 4 路同步播放。',
        coverAlt: '監控系統的歷史回放頁面：四個播放器與時間軸，監控影像已模糊處理',
        facts: { company: '億集創見應用科技', period: '2025/06 起' },
        highlights: [
          '12 路 WebRTC 即時監看',
          'WebSocket 信令與自動重連',
          '移動偵測警報與提示音',
          'MSE 歷史回放・4 個播放器',
          '錄影空檔自動跳過',
          '多路同步播放',
          '可拖曳縮放的時間軸',
          '0.25–4 倍速播放',
        ],
        caseStudy: {
          overview: [
            '億集創見應用科技的 NVR 監控系統，前端分為四個功能頁：即時監看（固定 12 格）、個別監控（只顯示偵測到異動的攝影機並播放提示音）、歷史回放（4 個播放器與同步控制），以及相機設置（含移動偵測的感興趣區域 ROI）。',
            '即時監控一開始只有一支攝影機，之後需求改為 12 支；歷史回放則需要同時播放 4 支影片，並支援時間軸拖放。',
          ],
          role: {
            title: '前端工程師',
            responsibilities: [
              '參與系統維護與新功能開發，負責前端頁面、互動介面與表格',
              '將後端同事設計的 WebRTC 架構改寫為 Vue 版本，並優化程式碼',
              '將即時監控擴充到 12 路，並處理逾時重試與斷線重連',
              '歷史回放：MSE 播放引擎、互動時間軸、倍速與多路同步播放',
            ],
          },
          problem: [
            '即時監控從 1 支擴充到 12 支，每一路都要各自完成信令、建立連線，並在逾時或斷線時自行恢復。',
            '歷史回放是問題最多的部分：同時播放 4 支影片常常卡頓、報錯；錄影中間有空檔時會卡住或跳過；原本要支援 8 倍速，但本地瀏覽器負荷不了。',
            '多支攝影機的歷史影像要能對齊同一個時間點一起播放。',
          ],
          architecture: {
            steps: [
              '前端取得攝影機清單後，透過 WebSocket 為每一路送出初始化訊息；前端只送攝影機 id，由後端自行拉取 RTSP 串流',
              '後端回傳 offer，前端建立 RTCPeerConnection、回傳 answer 並交換 ICE candidate；影像經 WebRTC 直接傳送，不經過 WebSocket',
              'WebSocket 持續推送移動偵測、警報與攝影機連線狀態，驅動指示燈與個別監控的顯示',
              '歷史回放的播放器向後端取得時間軸與播放清單，下載影片片段後寫入 MSE 的 SourceBuffer 播放',
              '自建的互動時間軸負責拖曳、縮放與播放頭；多路同步由頁面統一計算並下發目標時間',
            ],
          },
          solution: [
            '即時串流：每一路等待 offer 逾時 15 秒就自動重試，最多 3 次；WebSocket 斷線時以指數退避重連（2 秒起、上限 20 秒），重連後所有路重新初始化；元件卸載時關閉所有連線與計時器，避免資源殘留。',
            '歷史回放：自建 MSE 播放引擎。每個片段依「實際起始時間 − 清單基準時間」放到 video 的時間軸上，並以 LRU 快取這些偏移量；錄影空檔因此保留為緩衝區之間的空隙，video.currentTime 永遠能換算回真實時間。',
            '緩衝策略依播放速度調整：倍速越高，保留的回溯緩衝越少、每次補充的片段越多；緩衝快播完時自動續載下一段播放清單。',
          ],
          challenges: [
            {
              challenge: '4 個播放器同時回放時常常卡頓、報錯',
              solution:
                '反覆調整緩衝與快取：寫入 SourceBuffer 一律經過單一佇列以確保順序；依播放速度調整回溯緩衝與補片數量；碰到瀏覽器緩衝配額上限時強制修剪後重試；中止下載超過 30 秒或屬於舊播放清單的片段。',
            },
            {
              challenge: '錄影中間有空檔時，播放會卡住或跳過',
              solution:
                '以真實時間計算每個片段的位置，把空檔保留為緩衝區之間的空隙；播到空檔時用 requestAnimationFrame 推進「虛擬時間」並通知介面，到下一段緩衝時再跳過去。',
            },
            {
              challenge: '需求要求 8 倍速播放，但本地瀏覽器負荷不了',
              solution: '將倍速上限調整為 4 倍（0.25–4 倍），並讓緩衝策略隨播放速度調整。',
            },
            {
              challenge: '多路回放要對齊同一個時間點一起播放',
              solution:
                '先計算所有攝影機的共同時間區間，再以同一個基準時間下發給各播放器；等全部就緒並確認彼此誤差在 400 ms 內，最後在同一個 animation frame 內同時開始播放。',
            },
            {
              challenge: '拖曳時間軸時若即時重新載入，會產生大量請求',
              solution:
                '播放頭固定在中央，拖曳的是時間軸本身；只有放開滑鼠且移動超過 5 秒時，才重新載入播放清單。',
            },
          ],
          results: [
            '即時監看同時顯示 12 路影像，逾時自動重試、斷線自動重連',
            '個別監控只顯示偵測到異動的攝影機，並在警報出現時播放提示音',
            '歷史回放支援 4 個播放器、多路同步播放、可拖曳縮放的時間軸與 0.25–4 倍速',
            '錄影空檔可以正確跳過，播放時間永遠能對應回真實時間',
            'TODO: 如有確認過的數據（例如延遲、卡頓改善）可補充',
          ],
          learnings: ['TODO: 學到的事'],
        },
      },
      en: {
        title: 'Surveillance System: Live Streams & Multi-camera Playback',
        subtitle:
          'Live monitoring of 12 cameras over WebRTC and synchronized playback of 4 recordings with a custom MSE player',
        summary:
          'Frontend of a surveillance system: WebRTC connections negotiated over WebSocket show 12 live feeds, and a custom MSE playback engine handles recording gaps, speed-dependent buffering and synchronized playback of 4 cameras.',
        coverAlt:
          'The history playback page of the surveillance system: four players with timelines, camera footage blurred',
        facts: { company: '億集創見應用科技', period: 'Since 2025/06' },
        highlights: [
          '12 live feeds over WebRTC',
          'WebSocket signaling with auto-reconnect',
          'Motion alerts with sound',
          'MSE playback with 4 players',
          'Recording gaps skipped automatically',
          'Synchronized multi-camera playback',
          'Draggable, zoomable timeline',
          '0.25–4x playback speed',
        ],
        caseStudy: {
          overview: [
            'The NVR surveillance system at 億集創見應用科技 has four frontend pages: live view (a fixed 12-cell grid), alert monitoring (only cameras that detect motion, with an alert sound), history playback (4 players with synchronized control) and camera settings (including regions of interest for motion detection).',
            'Live monitoring started with a single camera and the requirement grew to 12; history playback has to play 4 recordings at once and support scrubbing along a timeline.',
          ],
          role: {
            title: 'Frontend Engineer',
            responsibilities: [
              'System maintenance and new features: frontend pages, interactive UI and data tables',
              'Rewrote the WebRTC architecture designed by a backend colleague as a Vue implementation and optimized the code',
              'Scaled live monitoring to 12 feeds, with timeout retries and reconnection',
              'History playback: the MSE playback engine, interactive timeline, playback speeds and synchronized playback',
            ],
          },
          problem: [
            'Live monitoring grew from 1 camera to 12, and every feed has to complete signaling, connect and recover on its own after timeouts or disconnects.',
            'History playback caused the most problems: playing 4 recordings at once often stuttered or threw errors, gaps in the recordings made playback get stuck or skip, and the original requirement of 8x speed was more than the local browser could handle.',
            'Recordings from several cameras have to line up and play from the same point in time.',
          ],
          architecture: {
            steps: [
              'After loading the camera list, the frontend sends an init message per camera over WebSocket; it only sends a camera id and the backend pulls the RTSP stream itself',
              'The backend replies with an offer; the frontend creates an RTCPeerConnection, answers and exchanges ICE candidates. Video flows over WebRTC, not through the WebSocket',
              'The WebSocket keeps pushing motion, alert and camera connection events, which drive the status indicators and the alert monitoring page',
              'Each playback player fetches the timeline and playlist from the backend, downloads video segments and appends them to an MSE SourceBuffer',
              'A custom interactive timeline handles dragging, zooming and the playhead; the page computes and distributes a common target time for synchronized playback',
            ],
          },
          solution: [
            'Live streams: each feed retries automatically after waiting 15 seconds for an offer, up to 3 times; a dropped WebSocket reconnects with exponential backoff (from 2 s, capped at 20 s) and re-initializes every feed; unmounting closes every connection and timer so nothing leaks.',
            'History playback uses a custom MSE engine. Each segment is placed on the video timeline at “segment start time − playlist reference time”, with the offsets kept in an LRU cache. Recording gaps therefore stay as gaps between buffered ranges, and video.currentTime can always be mapped back to real time.',
            'Buffering adapts to playback speed: faster playback keeps less back buffer and fetches more segments per refill, and the next part of the playlist is loaded automatically before the buffer runs out.',
          ],
          challenges: [
            {
              challenge: 'Playing 4 recordings at once often stuttered or threw errors',
              solution:
                'Iterated on buffering and caching: every SourceBuffer append goes through a single queue to keep order; back buffer and refill size follow playback speed; hitting the browser’s buffer quota forces a trim and a retry; segment downloads older than 30 seconds or from a superseded playlist are aborted.',
            },
            {
              challenge: 'Gaps in the recordings made playback get stuck or skip',
              solution:
                'Segments are positioned by real time, so a gap stays as a gap between buffered ranges. While playing through a gap, requestAnimationFrame advances a “virtual time” and notifies the UI, then playback jumps to the next buffered range.',
            },
            {
              challenge:
                'The requirement asked for 8x playback, but the local browser could not keep up',
              solution:
                'Capped playback speed at 4x (0.25–4x) and made the buffering strategy follow the playback speed.',
            },
            {
              challenge: 'Playback from several cameras must line up and start at the same moment',
              solution:
                'Compute the time range shared by all cameras, send every player the same reference time, wait until all are ready and within 400 ms of each other, then start them all in the same animation frame.',
            },
            {
              challenge:
                'Reloading on every movement while dragging the timeline would flood the backend',
              solution:
                'The playhead stays fixed in the center and the timeline itself moves; the playlist only reloads when the mouse is released after moving more than 5 seconds.',
            },
          ],
          results: [
            'Live view shows 12 feeds at once, with automatic retries and reconnection',
            'Alert monitoring shows only cameras that detect motion and plays a sound when an alert appears',
            'History playback supports 4 players, synchronized playback, a draggable and zoomable timeline, and 0.25–4x speed',
            'Recording gaps are skipped correctly, and playback time always maps back to real time',
            'TODO: Add verified figures if available (e.g. latency, reduced stuttering)',
          ],
          learnings: ['TODO: What you learned'],
        },
      },
    },
  },
  {
    slug: 'b2b-corporate-website',
    cover: { src: 'images/projects/cms-cover.jpg', width: 1600, height: 900 },
    technologies: [
      'Laravel',
      'Vue 3',
      'Pinia',
      'Element Plus',
      'Alpine.js',
      'Tailwind CSS',
      'MySQL',
      'OpenAI API',
      'GitHub Actions',
      'Linode',
    ],
    featured: true,
    content: {
      'zh-TW': {
        title: 'B2B 企業官網：多專案 CMS 與 AI 內容工具',
        subtitle: '個人接案：Laravel 前台兼顧 SEO，Vue 3 後台整合具預算控管的 AI 內容工具',
        summary:
          '個人接案的多專案 CMS：Laravel 前台由伺服器輸出頁面以兼顧 SEO，Vue 3 後台管理產品與中英雙語內容，並整合 AI 翻譯、文案與圖片辨識，以專案年度預算控管 AI 用量。',
        coverAlt: '後台產品管理頁面，開啟中的「AI 辨識建立產品」對話框',
        highlights: [
          'Laravel Blade 前台（SEO）',
          'Vue 3 後台 SPA',
          '中英雙語內容與網址',
          '角色權限（選單／路由／API）',
          'AI 翻譯與文案助手',
          'AI 圖片辨識建立產品',
          'AI 用量預算控管',
          '聯絡表單驗證碼與 Email 通知',
          'GitHub Actions 部署到 Linode',
        ],
        caseStudy: {
          overview: [
            '個人接案開發的多專案 CMS，用來建置 B2B 企業官網。前台讓訪客瀏覽產品、分類、最新消息與知識庫，送出聯絡表單，也能註冊會員；後台讓管理者維護產品、輪播、消息、知識庫、詢價訂單、使用者與系統設定，並提供 AI 內容工具。',
            '單一 Laravel 12 應用同時提供三種介面：伺服器渲染的前台網站、Vue 3 後台 SPA，以及後台使用的 REST API；前台與後台讀寫同一組資料模型。',
          ],
          role: {
            title: '接案開發者（個人承接）',
            responsibilities: [
              '以 Laravel Blade、Alpine.js 與 Tailwind CSS 開發前台網站',
              '以 Vue 3、Pinia 與 Element Plus 開發後台 SPA',
              '設計 REST API、角色權限、多語系與 AI 預算控管',
              '以 GitHub Actions 建立部署流程，部署到 Linode 主機',
            ],
          },
          problem: [
            '企業官網的產品與內容頁必須能被搜尋引擎收錄；同時客戶需要一個好用的後台，管理產品、分類與中英雙語內容。',
            '後台要協助管理者建立雙語的產品內容：一鍵翻譯、AI 文案，以及上傳產品圖片後由 AI 辨識建立產品。',
            'AI 功能每次呼叫都會產生外部費用，需要依專案控制用量與預算。',
            '後台有多種角色，權限需要一致地套用在選單、路由與 API。',
          ],
          architecture: {
            steps: [
              '前台：Laravel Blade 由伺服器輸出頁面，搭配 Alpine.js 與 Tailwind CSS；每條路由同時提供預設語系與加上語系前綴的版本',
              '後台：Vue 3 + Pinia + Element Plus 的 SPA，以 token 驗證呼叫 REST API',
              '權限分三層：選單依權限過濾、前端路由守衛、API 端授權',
              '內容以 JSON 欄位儲存多語系，網址用的 slug 在儲存時自動產生',
              'AI 功能經過預算控管服務：先確認專案剩餘預算，再呼叫 OpenAI 等外部服務並記錄用量',
              '前台表單經驗證碼（Cloudflare Turnstile 或 reCAPTCHA）驗證，並以各專案自己的 SMTP 寄出通知',
              '透過 GitHub Actions 部署到 Linode 主機',
            ],
          },
          solution: [
            '前台考量 SEO，使用 Laravel Blade 由伺服器輸出頁面，並產生 sitemap 與 robots.txt；後台則是 Vue 3 SPA，兩者放在同一個 Laravel 應用裡共用資料模型。',
            'API 的成功與錯誤回應格式統一，例外集中轉換；前端依錯誤代碼顯示對應訊息，token 失效時自動導回登入頁。',
            '每個 AI 功能以固定單價從專案年度預算扣款，同時記錄實際的外部成本以便對帳；預算不足時不會呼叫外部服務，呼叫失敗的紀錄也不扣款，年度用量每年自動歸零。',
          ],
          challenges: [
            {
              challenge: '前台要對搜尋引擎友善，後台又需要豐富的互動',
              solution:
                '在同一個 Laravel 應用裡分開兩種介面：前台用 Blade 由伺服器輸出頁面，後台用 Vue 3 SPA 呼叫 REST API，兩者讀寫同一組資料模型。',
            },
            {
              challenge: 'AI 功能依呼叫次數產生外部費用，不能無上限地使用',
              solution:
                '所有 AI 呼叫都先經過預算控管服務：確認專案剩餘預算足夠才呼叫外部 API，成功後扣款並記錄實際成本；失敗時記錄但不扣款。',
            },
            {
              challenge: '產品名稱多為中文，自動產生的網址 slug 會變成空字串',
              solution:
                '先嘗試一般的 slug 轉換，結果為空時改用拼音轉換，仍為空再使用雜湊值；同一專案內重複時自動加上流水號。',
            },
            {
              challenge: '產品分類是無限層級的樹狀結構，錯誤的父層設定會造成循環',
              solution:
                '更新時拒絕把分類自己或其子孫設為父層；系統預設分類不可刪除，刪除一般分類時自動把底下的產品移到預設分類。',
            },
            {
              challenge: '中英雙語的網址需要一致，又不能產生重複內容',
              solution:
                '每條前台路由同時註冊無前綴（預設語系）與語系前綴的版本；網址帶預設語系前綴時 301 轉址到無前綴網址，無效的語系前綴回 404。',
            },
          ],
          results: [
            '前台頁面由伺服器輸出，並提供 sitemap 與 robots.txt',
            '前台與後台皆支援中英雙語',
            '後台可管理產品、分類、輪播、最新消息、知識庫、詢價訂單、使用者與系統設定',
            'AI 翻譯、文案、圖片辨識建立產品、去背與情境圖，並依專案年度預算控管用量',
            '上傳的產品圖自動補白成正方形並產生三種尺寸',
            '透過 GitHub Actions 部署到 Linode',
            'TODO: 上線後的成效（請勿填入未經確認的流量或詢價數字）',
          ],
          learnings: ['TODO: 學到的事'],
        },
      },
      en: {
        title: 'B2B Corporate Website: Multi-project CMS with AI Tools',
        subtitle:
          'Freelance project: an SEO-friendly Laravel site and a Vue 3 admin with budget-controlled AI content tools',
        summary:
          'A freelance multi-project CMS: the Laravel public site renders on the server for SEO, the Vue 3 admin manages products and bilingual content, and AI translation, copywriting and image recognition are metered against each project’s yearly budget.',
        coverAlt:
          'The admin product management page with the “Create product with AI recognition” dialog open',
        highlights: [
          'Laravel Blade public site (SEO)',
          'Vue 3 admin SPA',
          'Bilingual content and URLs',
          'Role permissions (menu / route / API)',
          'AI translation and copywriting',
          'Create products from images with AI',
          'AI usage budget control',
          'Contact form captcha and email notifications',
          'Deployed to Linode with GitHub Actions',
        ],
        caseStudy: {
          overview: [
            'A multi-project CMS I built as a freelance project for B2B corporate websites. Visitors browse products, categories, news and a knowledge base, send contact forms and can register as members; administrators manage products, banners, news, the knowledge base, inquiry orders, users and settings, with AI content tools built in.',
            'A single Laravel 12 application serves three interfaces: a server-rendered public site, a Vue 3 admin SPA and the REST API the admin uses. The public site and the admin read and write the same data models.',
          ],
          role: {
            title: 'Freelance developer',
            responsibilities: [
              'Built the public site with Laravel Blade, Alpine.js and Tailwind CSS',
              'Built the admin SPA with Vue 3, Pinia and Element Plus',
              'Designed the REST API, role permissions, localization and AI budget control',
              'Set up deployment to a Linode server with GitHub Actions',
            ],
          },
          problem: [
            'Product and content pages of a corporate website must be indexed by search engines, while the client also needs an easy admin for products, categories and bilingual content.',
            'The admin should help create bilingual product content: one-click translation, AI copywriting, and creating products by letting AI recognize uploaded product images.',
            'Every AI call costs money with an external provider, so usage and budget have to be controlled per project.',
            'The admin has several roles, and permissions must apply consistently to menus, routes and the API.',
          ],
          architecture: {
            steps: [
              'Public site: Laravel Blade renders pages on the server, with Alpine.js and Tailwind CSS; every route exists both without a prefix (default language) and with a language prefix',
              'Admin: a Vue 3 + Pinia + Element Plus SPA calling the REST API with token authentication',
              'Permissions work in three layers: menu filtering, frontend route guards and API authorization',
              'Content is stored as JSON fields per language, and URL slugs are generated automatically on save',
              'AI features go through a budget control service: check the project’s remaining budget, then call OpenAI or other providers and record the usage',
              'Public forms are verified with a captcha (Cloudflare Turnstile or reCAPTCHA) and send notifications through each project’s own SMTP settings',
              'GitHub Actions deploys the application to a Linode server',
            ],
          },
          solution: [
            'For SEO, the public site renders on the server with Laravel Blade and provides a sitemap and robots.txt; the admin is a Vue 3 SPA, and both live in the same Laravel application sharing the data models.',
            'API success and error responses share one format, with exceptions converted in one place; the admin shows messages by error code and returns to the login page when the token expires.',
            'Each AI feature is charged at a fixed price against the project’s yearly budget while the real provider cost is logged for reconciliation. Calls are refused before reaching the provider when the budget is insufficient, failed calls are logged but not charged, and yearly usage resets automatically.',
          ],
          challenges: [
            {
              challenge:
                'The public site has to be search-engine friendly while the admin needs rich interaction',
              solution:
                'Split the two interfaces within one Laravel application: Blade renders the public site on the server, and a Vue 3 SPA calls the REST API for the admin, both using the same data models.',
            },
            {
              challenge: 'AI features cost money per call and cannot be used without limits',
              solution:
                'Every AI call goes through a budget control service: the provider is only called if the project has enough budget left, successful calls are charged and their real cost recorded, and failures are logged without charge.',
            },
            {
              challenge:
                'Most product names are Chinese, so automatically generated URL slugs came out empty',
              solution:
                'Try a normal slug first, fall back to a pinyin transliteration when it is empty, then to a hash; duplicates within a project get a numeric suffix.',
            },
            {
              challenge:
                'Product categories form a tree of unlimited depth, and a wrong parent could create a loop',
              solution:
                'Updates reject a category or any of its descendants as its own parent; the system default category cannot be deleted, and deleting another category moves its products to the default one.',
            },
            {
              challenge: 'Bilingual URLs must stay consistent without creating duplicate content',
              solution:
                'Every public route is registered both without a prefix (default language) and with a language prefix; a URL carrying the default language prefix redirects with 301 to the unprefixed one, and an invalid prefix returns 404.',
            },
          ],
          results: [
            'Public pages render on the server, with a sitemap and robots.txt',
            'Both the public site and the admin are bilingual',
            'The admin manages products, categories, banners, news, the knowledge base, inquiry orders, users and settings',
            'AI translation, copywriting, product creation from images, background removal and scene generation, metered against each project’s yearly budget',
            'Uploaded product images are padded to squares and generated in three sizes',
            'Deployed to Linode through GitHub Actions',
            'TODO: Results after launch (do not add unverified traffic or inquiry numbers)',
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
