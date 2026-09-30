# Design

## Context

- Repository 目前只有 OpenSpec 設定，沒有任何程式碼（greenfield）。動機與範圍見 `proposal.md`，行為需求見 `specs/`。
- 本機環境：Node 24（LTS）、npm 11。Git remote 為 `github.com/waiting0514/portfolio`，因此預設部署目標是 project site `https://waiting0514.github.io/portfolio/`，但設定不可寫死 repo 名稱（見 `pages-deployment` spec）。
- 限制：純前端、無 backend / DB / CMS；作品資料為靜態 TypeScript；除非有明確理由，不引入第三方套件。
- 網站為中英雙語，預設繁體中文（`zh-TW`，`<html lang="zh-Hant-TW">`），英文位於 `/en` 前綴（見 D14）。

## Goals / Non-Goals

**Goals:**
- 程式架構簡單、可讀，面試官打開 repo 能在幾分鐘內看懂資料流與元件分工。
- 型別完整描述作品與 Case Study 內容，缺少 section 時由型別與模板自然處理。
- 在 GitHub Pages 子路徑下，乾淨網址、深層連結重新整理、社群分享預覽都能正常運作，且不需額外 runtime 套件。

**Non-Goals:**
- Dark mode（token 以語意命名，未來可加，但本次不做）。
- 兩種以上語言、依瀏覽器語言自動導向（語系只由網址決定，避免同一網址內容不一致與爬蟲問題）。
- CMS、Markdown 內容管線、部落格。
- 完整 SSR / SSG 框架（如 Nuxt、vite-ssg）。
- E2E 測試框架（Playwright 測試套件）；E2E 層面以 Phase 7／8 的瀏覽器 QA 檢查清單驗證，單元測試見 D15。

## Decisions

### D1. 以 `create-vue` 建立骨架，再精簡
使用 `npm create vue@latest`（TypeScript、Router、Vitest、ESLint、Prettier），刪除範例元件與不需要的檔案（HelloWorld、icons 等）。create-vue 預設附帶的 oxlint 與 `vite-plugin-vue-devtools` 一併移除：兩套 linter 規則需同步維護，而 devtools 可用瀏覽器擴充套件取代，維持單一 ESLint 設定更易理解。`lint` script 不帶 `--fix`（CI 應只檢查），另提供 `lint:fix`。
- **理由**：官方維護的 `tsconfig.app.json` / `tsconfig.node.json` 分離、`vue-tsc --build` type-check、flat ESLint config 都是目前 Vue 社群標準，面試官熟悉。
- **替代方案**：從零手動設定——可控但易出錯，且沒有額外展示價值。

### D2. 不使用 Pinia
目前唯一的「狀態」是 mobile 選單開關（Navbar 本地 `ref`）與路由參數；作品資料為不可變的靜態 import。
- **理由**：加入 store 只會多一層間接；README 會說明「若未來出現跨頁共享且可變的狀態（如篩選條件需跨頁保留、主題切換），再引入 Pinia」。

### D3. Tailwind CSS v4 + `@theme` 設計 token
以 `@tailwindcss/vite` 整合，於 `src/assets/main.css` 用 `@theme` 定義語意化 token，元件只使用這些 token 對應的 utility，而不是任意色碼。

| 類別 | 規則 |
|------|------|
| Color | `canvas`（頁面底色）、`surface`（卡片／區塊底色）、`ink`（主文字 ≈ slate-900）、`ink-muted`（次要文字 ≈ slate-600，白底對比 > 7:1）、`line`（邊框 ≈ slate-200）、`accent`（單一強調色，深藍，白底對比 ≥ 4.5:1）、`accent-strong`（hover） |
| Typography | 系統字體堆疊（不載入 web font，零額外請求）；等寬字體用於 Tech Tag。字級：display / h1 / h2 / h3 / body / small 六級，行高 body 1.7 |
| Spacing | Tailwind 4px scale；Section 垂直間距統一 `py-16 md:py-24`；元件內距 4 / 6 / 8 |
| Container | `max-w-6xl` 置中，左右 padding `px-4 sm:px-6 lg:px-8`；Case Study 內文另限 `max-w-[70ch]` |
| Border / Radius | 1px `line` 邊框；按鈕與標籤 `rounded-md`，卡片 `rounded-lg` |
| Shadow | 預設無陰影，以邊框區隔；卡片 hover 僅 `shadow-sm` |
| Motion | 只有 150ms 的 color/shadow transition；`prefers-reduced-motion` 時全域關閉 |

全域基礎樣式只放：focus-visible ring、reduced-motion、Case Study 內文排版（段落／列表間距）。
- **替代方案**：`@apply` 大量組合 class——會重新發明 CSS 且難追蹤；改以 Vue 元件封裝重複 class 組合。

### D4. 共用 UI 元件（只抽真正重複的）
| 元件 | 職責 |
|------|------|
| `BaseButton` | 以 `variant: 'primary' \| 'secondary'` 呈現按鈕外觀；依 `to`（站內）或 `href`（外部）渲染 `RouterLink` 或 `<a>`，外部連結自動加 `target`/`rel` 與「opens in new tab」提示。本網站 CTA 全是導覽，所以不需 `<button>` 版本；有需要時再加 |
| `BaseContainer` | 最大寬度與水平 padding |
| `SectionHeading` | Section 標題（可指定 heading level 以維持階層）＋可選描述 |
| `TechTag` / `TechTagList` | 技術標籤，`<ul>` 語意 |
| `ProjectCard` | 封面、標題、描述、標籤、單一 Case Study 連結（stretched link 技巧讓整張卡可點但只有一個 Tab stop） |
| `ProjectGrid` | 1 / 2 / 3 欄 responsive grid，首頁與 Projects 頁共用 |
| `CaseStudySection` | `<section>` + `<h2>` + slot，統一 Case Study 版面 |
| `ProjectPager` | Case Study 底部上一個／下一個專案 |
| `NotFoundContent` | 404 內容，供 `NotFoundView` 與無效 slug 共用 |
| `SiteHeader` / `SiteFooter` / `SkipLink` | 全站 layout |

首頁各區塊（Hero、Skills、About Preview）只在首頁使用，直接寫在 `HomeView.vue`；若檔案超過可讀範圍再拆出 `components/home/`。

### D5. 資料模型
```ts
// src/types/project.ts
export interface ImageAsset {
  src: string            // 相對於 public/ 的路徑，例如 'images/projects/upload-cover.svg'
  alt: string
  width: number
  height: number
}

export interface TechnicalChallenge {
  challenge: string
  solution: string
}

export interface CaseStudy {
  overview?: string[]                      // 段落
  role?: { title: string; responsibilities: string[] }
  problem?: string[]
  architecture?: { steps: string[]; diagramAlt?: string }
  solution?: string[]
  challenges?: TechnicalChallenge[]
  results?: string[]
  learnings?: string[]
}

// 語系相關文字，每個語系一份完整結構
export interface ProjectContent {
  title: string
  subtitle: string
  summary: string                          // 卡片與 meta description
  coverAlt: string
  highlights: string[]                     // 需求中的「特色」
  caseStudy: CaseStudy
}

export interface Project {
  slug: string                             // 語系共用
  cover: ImageAsset                        // src/width/height 語系共用
  architectureDiagram?: ImageAsset
  technologies: readonly string[]          // 技術名稱不翻譯
  featured: boolean
  content: Localized<ProjectContent>       // Record<Locale, ProjectContent>
}
```
- `Localized<T> = Record<Locale, T>`：語系無關的欄位（slug、圖片、技術）只寫一次，文字內容以「每個語系一整份」撰寫，比每個欄位各自 `{ 'zh-TW', en }` 更好讀、好寫；少一個語系或欄位時 type-check 失敗。`ImageAsset` 因此不含 alt，alt 放在語系內容中。
- 必要欄位為 required，所有 Case Study section 為 optional；空陣列與 `undefined` 同樣視為「不渲染」，由單一 helper `hasContent()` 判斷。
- `projects` 以 `satisfies readonly Project[]` 宣告，保留字面型別推論又能被型別檢查。
- 資料模組同時匯出 `getProjectBySlug()`、`featuredProjects`、`getAdjacentProjects()` 等純函式，view 不自行 filter。
- `profile.ts`（姓名、職稱、簡介、focus 技術、GitHub、經歷；文字以 `Localized<>` 撰寫）、`skills.ts`（分類名稱雙語、技能名稱共用）同樣集中於 `src/data/`，型別放 `src/types/profile.ts`。
- 未知內容一律寫成 `'TODO: ...'` 字串，不虛構數據。
- **為何不是 Markdown / JSON**：TS 靜態資料可在編譯期檢查結構、零解析成本、無需額外 loader；內容量小，不需要 CMS。

### D6. Case Study 以明確模板呈現，而非設定驅動
`ProjectDetailView.vue` 依 spec 順序直接寫出各 `<CaseStudySection v-if="hasContent(...)">`。
- **理由**：每個 section 的內部結構不同（段落、成對挑戰、有序步驟＋圖），寫成 section registry / 動態 component map 反而更難讀。這是刻意選擇「不要為 pattern 而 pattern」。

### D7. 無效 slug 在原路徑渲染 Not Found
路由使用 `props: true` 將 `slug` 傳入 view；view 以 `computed` 查找專案，找不到時渲染 `NotFoundContent` 並設定 Not Found meta。
- **替代方案**：`beforeEnter` redirect 到 404 路由——會改變網址，使用者無法看出輸入錯誤的路徑，且需重複查找邏輯。

### D8. Router：HTML5 history mode ＋ build 時產生靜態路由 HTML ＋ `404.html` fallback
**選擇與原因（README 會完整說明）：**
- `createWebHistory(import.meta.env.BASE_URL)`：乾淨網址，適合放在履歷與分享。
- 一個小型 Vite plugin（`build/static-routes.ts`，約數十行，無額外依賴）在 `generateBundle` 階段：
  1. 讀取 `src/data/projects.ts` 取得所有 slug，並驗證 slug 唯一與格式，重複時讓 build 失敗。
  2. 以產出的 `index.html` 為模板，為兩個語系的 `/`、`/projects/`、`/about/`、每個 `/projects/<slug>/`（英文加 `/en` 前綴）產生 `<route>/index.html`，並寫入該頁語系的 `<html lang>`、title、description、Open Graph、canonical 與 hreflang alternates。
  3. 產生 `404.html`（Not Found meta ＋ `noindex`），GitHub Pages 對未知路徑回傳它，SPA 啟動後由 router 依網址前綴決定語系並顯示 Not Found。
  - 「要產生哪些路由與各自 meta」寫成純函式 `getStaticRoutes()`（放在 `src/utils/seo.ts`），plugin 只負責讀寫檔案，讓核心邏輯可單元測試。
- **效果**：已知路由直接重新整理 → HTTP 200 且 meta 正確（社群預覽、爬蟲可讀）；未知路由 → 網站自己的 404 頁。
- **替代方案比較**：
  - Hash mode（`/#/projects/x`）：最簡單可靠，但網址醜、所有路由對爬蟲而言都是同一頁、無法產生各頁 meta。
  - 只放 `404.html` 複製 index 的常見 SPA hack：深層連結能用，但每個深層頁面都回 HTTP 404，搜尋引擎可能不索引，社群預覽也只拿到首頁 meta。
  - `vite-ssg` / Nuxt 預渲染：效果最好但引入較大依賴與 SSR 相容性考量，對 5 個頁面的網站過度。
- Title / description / OG 的組字規則寫在 `src/utils/seo.ts`（純函式、node 可執行），plugin 與 runtime composable 共用，避免兩邊不一致。因為 plugin 會在 Node 中 import 資料模組，**資料模組不得使用 `import.meta.env` 或 import 圖片**，因此圖片放 `public/` 並以相對路徑字串記錄（見 D9）。

### D9. Base path 與資源路徑
- `vite.config.ts`：`base` 取自環境變數 `BASE_PATH`（正規化為前後皆有 `/`），未設定時為 `/`。
- CI 中以 `actions/configure-pages` 的 `base_path` 與 `base_url` 輸出設定 `BASE_PATH` 與 `SITE_URL`；user site 時 `base_path` 為空，自動變成 `/`。
- `SITE_URL` 用於 `og:url`、`og:image` 絕對網址；本地未設定時 fallback 為相對 origin（runtime 取 `location.origin`）。
- 圖片放在 `public/images/...`，由 `assetUrl(path)`（`import.meta.env.BASE_URL + path`）解析。取捨：失去 Vite 的 hash 與自動最佳化，但換得資料模組可在 Node 中讀取；圖片檔以 WebP/SVG 並指定 width/height 控制大小與避免 CLS。
- 第一批專案封面使用簡單的 SVG placeholder（標題文字＋中性底色），之後替換為真實截圖。

### D10. Runtime meta：`usePageMeta` composable
每個 view 呼叫 `usePageMeta(() => ({ title, description, image? }))`，以 `watchEffect` 更新 `document.title`、`<html lang>`、既有的 `<meta>`（`index.html` 已放好所有 tag，composable 只改 `content`）與 canonical / hreflang `<link>`。語系由 `useLocale()` 取得。
- **理由**：五個頁面只需要這些功能，不值得引入 `@unhead/vue`；把 meta 放在 view 而非 `route.meta`，可自然支援 Case Study 的動態資料與無效 slug。

### D11. Layout、捲動與焦點管理
- 單一 layout 直接寫在 `App.vue`：`SkipLink` → `SiteHeader` → `<main id="main-content" tabindex="-1"><RouterView/></main>` → `SiteFooter`。不建立 `layouts/` 資料夾（只有一種 layout）。
- `scrollBehavior`：有 `savedPosition` 時還原，否則回到頂端（reduced motion 時不使用 smooth）。
- 路由變更（非首次載入）後在 `App.vue` 以 `watch(route.path)` + `nextTick` 將焦點移到 `<main>`，讓螢幕閱讀器與鍵盤使用者從新內容開始。
- 非首頁的 views 使用 `() => import()` lazy load；首頁同步載入以縮短首屏。

### D12. Lint / Format
- ESLint flat config：`eslint-plugin-vue`（`flat/recommended`）、`@vue/eslint-config-typescript`（`recommended`）、`@vue/eslint-config-prettier/skip-formatting`，並加入 `eslint-plugin-vuejs-accessibility`（dev only）在 lint 階段抓 a11y 問題（alt、label、互動語意）——與本專案 a11y 優先的定位一致。
- `@typescript-eslint/no-explicit-any: error`；不使用 `eslint-disable` / `@ts-ignore` 迴避問題。
- Prettier：`semi: false`、`singleQuote: true`、`printWidth: 100`（create-vue 預設風格）。

### D13. GitHub Actions
`.github/workflows/deploy.yml`：
- 觸發：`push` 到 `main`、`workflow_dispatch`；另對 `pull_request` 只跑檢查（不部署），讓 PR 也有品質關卡。
- `build` job：`actions/checkout` → `actions/setup-node`（`node-version-file: .nvmrc`，`cache: npm`）→ `actions/configure-pages`（取得 base path / URL）→ `npm ci` → `npm run lint` → `npm run type-check` → `npm run test` → `npm run build`（帶 `BASE_PATH`、`SITE_URL`）→ `actions/upload-pages-artifact`（`dist`）。
- `deploy` job：`needs: build`，僅在 `main` 執行，`environment: github-pages`，使用 `actions/deploy-pages`。
- `permissions` 依 job 最小化：workflow 預設 `contents: read`；build job 加 `pages: read`（configure-pages 讀取 Pages 設定）；只有 deploy job 有 `pages: write`、`id-token: write`。`concurrency` 以 workflow + ref 分組：main 的部署排隊不取消，PR 的舊執行會被取消。PR 不執行 configure-pages 與 upload，只跑品質關卡。
- Actions 版本以實作當下（2026-09）各官方 repo 的最新 major 為準：`checkout@v7`、`setup-node@v7`、`configure-pages@v6`、`upload-pages-artifact@v5`、`deploy-pages@v5`，並以 actionlint 驗證 workflow。
- `.nvmrc` 設為 `24`；`package.json` `engines.node` 設為 Vite 支援的最低版本以上（`>=22.12`）。

### D14. i18n：網址前綴決定語系、型別化字典、不引入 vue-i18n
- **URL**：繁中無前綴（`/projects`），英文 `/en/projects`。路由以選擇性參數一次定義兩種語系：`/:locale(en)?/projects/:slug` 等，路由名稱不重複，站內連結用 `{ name, params: { locale } }` 產生；catch-all 由路徑前綴判斷語系。
  - 替代方案：語系存在 localStorage、網址不變——無法分享特定語系、爬蟲只看得到一種語言、同網址內容不一致，排除。
  - 替代方案：兩種語言都加前綴（`/zh-tw/`、`/en/`）——根路徑需要轉址，對 GitHub Pages（無 server redirect）不友善。
- **語系狀態**：`useLocale()` 由 `useRoute()` 推導 `locale`（computed），並提供 `messages`（目前語系字典）、`localePath(to)`、`switchLocalePath(target)`。語系是 URL 的衍生值，不是可變的全域狀態，所以依然不需要 Pinia。
- **UI 字典**：`src/i18n/messages.ts` 定義 `interface Messages`（巢狀結構），`zh-TW` 與 `en` 各自 `satisfies Messages`；template 以 `messages.nav.projects` 這種屬性存取，打錯 key 或缺翻譯都是型別錯誤，不需要字串 key 與 runtime fallback。
- **為何不用 vue-i18n**：兩個語系、無複數／ICU／日期格式化需求；vue-i18n 帶來額外 bundle 與字串 key（型別安全需額外設定）。若日後語系變多或需要格式化，再遷移（字典結構可直接沿用）。
- 語系定義（`Locale` 型別、預設語系、`htmlLang`、`ogLocale`、路徑前綴轉換純函式）放 `src/i18n/locales.ts`，Node 相容，供 plugin 使用。
- 圖片（專案封面 placeholder）不含文字以外的語系差異；placeholder SVG 只放專案英文名，兩語系共用，alt 依語系。

### D15. 單元測試：Vitest + Vue Test Utils + jsdom
- **理由**：與 Vite 共用設定與轉譯、零額外 bundler 設定，是 Vue 官方建議組合。
- **放置**：測試檔與被測檔同層，命名 `*.spec.ts`（例如 `src/utils/seo.spec.ts`、`src/components/layout/SiteHeader.spec.ts`），找得到、刪得乾淨。`vitest.config.ts` 以 `mergeConfig` 重用 `vite.config.ts`，`environment: 'jsdom'`。
- **tsconfig**：依 create-vue 慣例新增 `tsconfig.vitest.json`，讓 `vue-tsc --build` 也型別檢查測試檔。
- **測試範圍**（只測有邏輯的地方，不為了覆蓋率而測純展示元件）：
  | 對象 | 驗證重點 |
  |------|----------|
  | `data/projects`、`profile`、`skills` | slug 唯一且格式正確、兩語系內容非空、featured ≤ 3、無未填的必要文字 |
  | `utils/seo`、`asset`、`content` | title 格式、絕對網址組合、`getStaticRoutes()` 產出兩語系全部路由、`hasContent` 邊界 |
  | `i18n/locales`、`useLocale` | 前綴解析、`/en` ↔ 無前綴互換、catch-all 的語系判斷 |
  | `router` | 各路徑解析到正確 route name 與 locale，未知路徑命中 catch-all |
  | `BaseButton` | `to` 渲染 RouterLink、`href` 渲染含 `target`/`rel` 的 `<a>` |
  | `SiteHeader` | mobile 選單 `aria-expanded` 切換、Escape 關閉並還原焦點、active link、語言切換連結指向對應網址 |
  | `ProjectDetailView` | 缺少 section 時不渲染標題、無效 slug 顯示 Not Found |
  | `usePageMeta` | 更新 `document.title`、`html[lang]`、meta content |
- 每個 Phase 的新邏輯在同一 Phase 補上測試，而不是集中到最後。

### 最終目錄
```
.github/workflows/deploy.yml
public/
  favicon.svg
  og-default.png
  images/projects/*.svg        # placeholder 封面
build/                          # Node 端 build helpers（base-path、static-routes plugin）與其測試
vitest.config.ts
src/
  assets/main.css              # Tailwind + @theme tokens + base styles
  components/
    common/   BaseButton, BaseContainer, SectionHeading, TechTag, TechTagList, SkipLink, NotFoundContent
    layout/   SiteHeader, SiteFooter
    project/  ProjectCard, ProjectGrid, CaseStudySection, ProjectPager
  composables/usePageMeta.ts, useLocale.ts
  data/       projects.ts, profile.ts, skills.ts
  i18n/       locales.ts, messages.ts
  router/index.ts
  types/      project.ts, profile.ts
  utils/      seo.ts, asset.ts, content.ts (hasContent)
  views/      HomeView, ProjectsView, ProjectDetailView, AboutView, NotFoundView
  App.vue
  main.ts
  (*.spec.ts 與被測檔同層)
```

## Risks / Trade-offs

- [GitHub Pages 對無結尾斜線的目錄路徑會 301 到 `/about/`] → Vue Router 預設非 strict，`/about/` 與 `/about` 皆匹配；站內連結維持無斜線，canonical/`og:url` 統一使用有斜線版本以對應實際檔案。
- [新增專案後忘記重新 build，靜態 HTML 不存在] → 部署一律經 CI build；即使缺少，也會 fallback 到 `404.html` 由 SPA 正常渲染，只是 HTTP 狀態為 404。
- [Vite plugin import `src/data` 使資料模組必須保持 Node 相容] → 在 `projects.ts` 檔頭註解說明限制；若違反，build 會直接失敗而不是靜默出錯。`tsconfig.node.json` 需 include 相關檔案。
- [圖片放 `public/` 無 hash，快取更新較慢] → 替換圖片時改檔名；作品集更新頻率低，可接受。
- [系統字體在不同 OS 外觀略有差異] → 以字級、間距與行寬建立層次，不依賴特定字體；日後若需品牌字體可自架 woff2。
- [Placeholder 內容若直接上線會顯得未完成] → TODO 文字刻意保持明顯；README 列出需替換的內容清單。

## Migration Plan

新專案，無既有系統需遷移。首次部署前需在 GitHub repo **Settings → Pages → Source** 選擇 **GitHub Actions**。回滾：revert commit 並推送 main，或在 Actions 重新執行先前成功的 workflow。

## Open Questions

- 英文版內容由使用者校閱；placeholder 階段兩語系皆為 TODO 或由需求直譯，不虛構。
- 真實姓名、自我介紹、工作經歷、專案截圖與 Case Study 內容由使用者後續提供；在此之前以 TODO placeholder 呈現。
- 是否使用自訂網域（CNAME）？若使用，只需在 CI 中 `base_path` 自動變成 `/`，不需改程式。
