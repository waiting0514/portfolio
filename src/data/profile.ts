import type { Profile } from '@/types/profile'

/**
 * Site owner profile, based on the owner's own autobiography and work history.
 * Never invent companies, dates or numbers: unknown facts stay as `TODO:` placeholders.
 * Keep this module free of Vite-only APIs: build-time code imports it in Node.
 */
export const profile: Profile = {
  githubUrl: 'https://github.com/waiting0514',
  email: 'waiting0514@gmail.com',
  focusTechnologies: ['Vue', 'Angular', 'TypeScript', 'JavaScript', 'RxJS'],
  content: {
    'zh-TW': {
      name: '賴韋廷',
      role: '前端工程師',
      intro:
        '自 2016 年投入前端開發，熟悉 Vue 與 Angular，參與過企業級平台、資料視覺化大屏與監控系統等專案。商業背景出身，開發時從實際需求出發，重視產品的可用性與長期維運。',
      summary:
        '商業背景出身，自學轉職成為前端工程師。曾在鼎新數智參與大屏、運營數據看板與開發者平台等企業級系統，目前在億集創見負責檔案管理系統與監控系統的前端開發。',
      bio: [
        '我來自商業背景，投身職場後逐漸發現自己對技術與邏輯問題的熱情，因而自學程式設計，最終轉職成為工程師。轉職過程充滿挑戰，也讓我建立起自律與解決問題的能力。',
        '身為工程師，我重視邏輯、效率與可靠性，同時帶著商業背景培養出的用戶導向思維：從「解決實際需求」出發，不只思考技術實現，也注重產品的可用性與長期維運。我相信好的程式不只是能動，而是能持續為使用者與組織創造價值。',
        '我在巨匠與職訓局的課程中打下 HTML、CSS、JavaScript 與 Git 的基礎，之後到飛肯設計進修 UI/UX 與 RWD，並參與中部的前端學習社群。真正讓我成長最多的是進入職場後的協作：閱讀既有程式碼、撰寫可維護的模組、處理跨瀏覽器問題，以及 Debug、效能優化與團隊溝通。',
        '我個性細心、有耐心，遇到問題不輕言放棄，喜歡從錯誤中找出根因並持續優化；跨領域的背景也讓我能在團隊中扮演技術與業務之間的溝通橋樑。',
      ],
      strengths: [
        '以 Vue 與 Angular 開發與維護企業級系統的前端頁面、互動介面與表格',
        '以 ECharts 實作資料視覺化，並在大屏與運營數據看板中進行效能優化',
        '多流程表單、驗證邏輯與模組化開發',
        '在每月發版的敏捷流程中，與 PM、QC 及後端工程師協作，釐清需求並主動回報風險',
        '商業背景帶來的用戶導向思維，能擔任技術與業務之間的溝通橋樑',
      ],
      experience: [
        {
          company: '億集創見應用科技股份有限公司',
          title: '前端工程師',
          period: '2025/06 – 至今',
          highlights: [
            '檔案管理系統 v2：上傳與管理圖片、影片、CAD 等檔案，並設定成員存取權限（Vue）',
            '監控系統：瀏覽監控攝影機、歷史記錄回放與攝影機系統設定（Vue、WebSocket）',
          ],
        },
        {
          company: '鼎新數智股份有限公司',
          title: '前端工程師',
          period: '2020/02 – 2025/04',
          highlights: [
            '大屏：使用者在編輯頁面排列圖表與自訂資訊，並顯示於不同裝置（Angular、ECharts）',
            '運營數據看板：以圖表與表格呈現統計埋點資料（Angular、ECharts）',
            '智客中心、開發者工作台與開發者管理後台：開發者申請、租戶綁定、部署與測試申請，以及相關審核管理（Angular）',
            '在每月發版的敏捷流程中參與需求討論、排程規劃與進度同步',
          ],
        },
        {
          company: '艾羅資訊',
          title: '軟體工程師',
          period: '2016/05 – 2020/01',
          highlights: [
            '企業形象網站（眼睛達人、井古茶堂）與購物網站（一頁式購物網站、大貓團購）的前端開發與維護（Laravel、Vue）',
          ],
        },
      ],
    },
    en: {
      name: 'Wei-Ting Lai',
      role: 'Frontend Developer',
      intro:
        'Frontend developer since 2016, working mainly with Vue and Angular on enterprise platforms, data-visualization dashboards and video-surveillance systems. Coming from a business background, I start from real user needs and care about usability and long-term maintainability.',
      summary:
        'I moved into software from a business background and taught myself to program. At Digiwin I built enterprise systems including large-screen dashboards, an operations analytics board and a developer platform; I now develop the frontend of file-management and surveillance systems at 億集創見應用科技.',
      bio: [
        'I come from a business background. After starting my career I discovered a passion for technology and logical problem solving, taught myself to program, and eventually changed careers to become an engineer. The transition was challenging, and it taught me self-discipline and how to solve problems independently.',
        'As an engineer I value logic, efficiency and reliability, and I bring the user-oriented mindset of my business background: I start from the real need, and think about usability and long-term maintenance as well as the technical implementation. Good code should not just work; it should keep creating value for users and the organization.',
        'I built my foundation in HTML, CSS, JavaScript and Git through courses at 巨匠 (a computer training school) and a government vocational training program, then studied UI/UX and responsive design at 飛肯設計 (a design school) and joined a frontend learning community in central Taiwan. I grew the most on the job: reading existing code, writing maintainable modules, handling cross-browser issues, debugging, optimizing performance and communicating within a team.',
        'I am careful and patient, I do not give up easily on hard problems, and I like tracing issues to their root cause. My cross-disciplinary background lets me act as a bridge between engineering and the business side of a team.',
      ],
      strengths: [
        'Building and maintaining enterprise frontends with Vue and Angular: pages, interactive UI and data tables',
        'Data visualization with ECharts, including performance optimization for large-screen and analytics dashboards',
        'Multi-step forms, validation logic and modular development',
        'Working with PMs, QA and backend engineers in a monthly-release agile process: clarifying requirements and raising risks early',
        'A user-oriented mindset from my business background, bridging engineering and business needs',
      ],
      experience: [
        {
          company: '億集創見應用科技',
          title: 'Frontend Developer',
          period: '2025/06 – Present',
          highlights: [
            'File Management System v2: uploading and managing images, videos and CAD files, with member access permissions (Vue)',
            'Surveillance System: browsing cameras, playing back recordings and configuring camera settings (Vue, WebSocket)',
          ],
        },
        {
          company: 'Digiwin (鼎新數智)',
          title: 'Frontend Developer',
          period: '2020/02 – 2025/04',
          highlights: [
            'Large-screen dashboard builder: users arrange charts and custom content in an editor and display them on different devices (Angular, ECharts)',
            'Operations analytics board: tracking data presented as charts and tables (Angular, ECharts)',
            'Developer portal, developer workbench and admin console: developer applications, tenant binding, deployment and test-tenant requests, and their review workflows (Angular)',
            'Took part in requirement discussions, planning and progress syncs in a monthly-release agile process',
          ],
        },
        {
          company: '艾羅資訊',
          title: 'Software Engineer',
          period: '2016/05 – 2020/01',
          highlights: [
            'Frontend development and maintenance of corporate websites and e-commerce sites, including one-page shops and group-buying sites (Laravel, Vue)',
          ],
        },
      ],
    },
  },
}
