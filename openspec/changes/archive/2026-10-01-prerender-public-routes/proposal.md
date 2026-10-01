# Proposal

## Repository Analysis

| # | 項目 | 現況 |
|---|---|---|
| 1 | package.json | runtime 只有 `vue`、`vue-router`；其餘皆 devDependencies。沒有任何 SSR／SSG／prerender 套件 |
| 2 | Vite | Vite 8；plugins：`vue`、`tailwindcss`、自製 `staticRoutes`（`build/static-routes.ts`） |
| 3 | Vue | 3.5，全部 `<script setup lang="ts">` |
| 4–5 | Router | vue-router 5；`createAppRouter(history)` 工廠（`src/router/index.ts`），路由：`/`、`/projects`、`/projects/:slug`、`/about`，皆有 `/:locale(en)?` 前綴，另有 catch-all `not-found`。除首頁外皆 lazy import |
| 6 | Base path | `BASE_PATH`（CI 由 `actions/configure-pages` 提供）→ `normalizeBasePath` → Vite `base`；client 用 `createWebHistory(import.meta.env.BASE_URL)`；public 資源用 `assetUrl()` |
| 7–8 | 專案／Case Study 資料 | 單一 TS 資料檔 `src/data/projects.ts`（中英內容、cover、caseStudy）；沒有 draft／published 狀態，所有專案皆公開（`status: 'in-development'` 只是開發進度標示，仍公開） |
| 9 | SEO | 已集中：`src/utils/seo.ts` 的 `describePage()` → `buildPageHead()`，runtime 由 `usePageMeta` 套用、build 時由 `staticRoutes` plugin 寫入每個路由的 `index.html`（title、description、canonical、hreflang、OG、`twitter:card`）。canonical 已正確帶 `/portfolio/` |
| 10 | Hero Animation | `HeroAnimation.vue`：`matchMedia`、`requestIdleCallback`、`IntersectionObserver` 全部在 `onMounted` 內；初始 render 為靜態最終狀態 |
| 11 | Theme | 只有淺色，沒有 dark mode、沒有 `localStorage` |
| 12–13 | CI／Pages | `.github/workflows/` 單一 workflow：`npm ci` → lint → type-check → test → `npm run build`（帶 `BASE_PATH`、`SITE_URL`）→ upload `dist` → deploy-pages |
| 14 | public | `favicon.svg`、`og-default.png`（1200×630）、`images/projects/*`（3 張 1600×900 jpg cover、1 張 svg） |
| 15 | Build output | 每個路由（兩語系）各一份 `index.html` + `404.html`（SPA fallback），但 **`<body>` 只有 `<div id="app"></div>`** |
| 16 | 既有 SSR／SSG | 無 |
| 17–18 | Browser-only API | `usePageMeta`（`document`、`window.location`，在 `watchEffect` 內，**SSR 時會被執行**）；`SiteHeader`、`useActiveSection`、`HeroAnimation` 皆在 `onMounted` 內（SSR 不執行）；`SiteFooter` 的 `new Date().getFullYear()`（跨年時 build 與瀏覽器的年份不同 → hydration mismatch） |

## Current Problem

`<head>` 已經可以不靠 JS 讀取，但頁面內容完全由 client 渲染：不執行 JS 的爬蟲、預覽服務、AI 爬蟲讀到的 `<body>` 只有空的 `#app` 與「需要 JavaScript」訊息。Google 會延後渲染，其他多數爬蟲不會。另外缺少 `sitemap.xml`、`robots.txt` 與 `twitter:title／description／image`，Case Study 的 `og:type` 也固定為 `website`。

## Proposed Architecture

Static-first + Vue hydration：

```
npm run build
  1. vite build                      → client bundle + 每個路由的 index.html（head 已寫入）、404.html、sitemap.xml、robots.txt
  2. vite build --ssr entry-server   → dist-ssr/（Node 用的 render 函式，不部署）
  3. node build/prerender.ts         → 以 vue/server-renderer 渲染每個公開路由，把 HTML 填入對應 dist/**/index.html 的 #app
瀏覽器
  靜態 HTML 立即可讀 → main.ts 以 createSSRApp hydrate → 之後完全是原本的 SPA（Router、動畫、互動）
```

## Prerender Strategy

採 **Vue 官方 `vue/server-renderer`（`renderToString`）+ Vite SSR build，build time 執行**，原因：

- 不新增任何 dependency：`vue/server-renderer` 隨 `vue` 套件提供，SSR build 是 Vite 內建功能。
- 沿用既有 `staticRoutes` plugin 的路由清單（`getStaticPages()`）、head 產生與 base path 處理；prerender 只負責填入 `<body>`。新增專案時路由、HTML、sitemap 全部自動跟著資料產生。
- 產物是真正的 hydration 標記，client 用 `createSSRApp` 接手，不會重新產生 DOM，也不會造成 layout shift。
- 不需要 headless browser，CI 不需安裝 Chromium。

## Alternatives Considered

| 方案 | 評估 |
|---|---|
| 維持 CSR | head 已可讀，但內容對非 JS 爬蟲不可見；不解決問題 |
| **Build-time prerender（本案）** | 內容可讀、零新依賴、部署方式不變；代價是元件必須 SSR-safe（目前只需改 2 處） |
| Headless browser 預渲染（Puppeteer／Playwright） | 程式改動最少，但 CI 需下載瀏覽器、build 變慢，輸出的是瀏覽器序列化後的 DOM，不是 hydration 標記，client 只能整個重新掛載 |
| `vite-ssg` | 功能相同，但需新增依賴並改寫 `main.ts`／路由進入點為其 API；本專案已有自己的路由清單與 head 產生，重複 |
| Full SSR（Node server） | GitHub Pages 不能跑 server；內容在 build time 已全部確定，不需要 request time 渲染 |
| Nuxt migration | 等於重寫專案架構，與「最小侵入」衝突 |

## SEO Architecture

仍以 `src/utils/seo.ts` 為唯一來源：

- `describePage(key, locale)` 產生每頁的 title、description、image、`type`（新增：Case Study 為 `article`，其餘 `website`）。
- 新增 `headTags(head)`：把 head 轉成一份 meta 清單（OG、Twitter 從同一筆資料產生）。build 時的 `renderHeadTags` 與 runtime 的 `applyPageHead` 都改用它，避免兩處各自維護一份 tag 清單。
- Twitter：`twitter:card=summary_large_image`、`twitter:title`、`twitter:description`、`twitter:image` 直接取自 OG 的值。

## Project Metadata Architecture

Case Study 的 SEO 繼續由 `projects.ts` 推導：title = 專案標題、description = `summary`、URL = slug。只新增一個 optional 欄位 `ogImage`（`public/` 相對路徑），不另建 SEO 資料來源。OG image 優先順序：`ogImage` → 非 SVG 的 cover → `og/default-og.png`。修改專案名稱時，卡片、Case Study、title、OG、sitemap 一起改變。

## GitHub Pages Compatibility

- Vite `base`、Router base、資源路徑：沿用現有 `BASE_PATH` 機制，不寫死。
- SSR 以 `createMemoryHistory(BASE_URL)` 渲染，渲染路徑使用 GitHub Pages 實際回應 200 的目錄形式（`/about/`、`/projects/<slug>/`，首頁 `/`、`/en/`），與 client hydrate 時的 `route.path` 一致，避免連結 `href` 不同。
- canonical、`og:url`、`og:image`、sitemap、robots 一律由 `SITE_URL`（`https://waiting0514.github.io/portfolio/`）組成絕對網址。canonical 維持結尾 `/`：GitHub Pages 對 `/portfolio/about` 會 301 到 `/portfolio/about/`，canonical 應指向直接回 200 的網址。
- **robots.txt 的限制**：爬蟲只讀網域根目錄的 `/robots.txt`，放在 `/portfolio/robots.txt` 不會被當成 robots 規則。仍依需求產生（內容正確、無 `Disallow: /`），但 sitemap 需要到 Google Search Console／Bing Webmaster 手動提交才有效。

## Animation Compatibility

`HeroAnimation` 的 browser API 都在 `onMounted`，SSR 不會執行；SSR 與 client 第一次 render 都是「沒有 `is-playing`」的靜態最終狀態，hydration 一致，hydrate 後才在 idle 時開始播放。`prefers-reduced-motion` 行為不變。

## Risks

| 風險 | 處理 |
|---|---|
| browser-only API 在 SSR 執行 | `usePageMeta` 在 SSR 時直接 return（head 已由 build 寫入）；新增在 Node 環境渲染全部路由的測試，之後若有元件在 setup 碰到 `window` 會直接測試失敗 |
| Hydration mismatch | 年份改用 build 時注入的常數；渲染路徑與實際網址一致；驗收時檢查 console 無 hydration 警告 |
| Duplicate metadata | 沿用 `MANAGED_TAGS` 先移除再寫入，擴充為涵蓋所有 `twitter:*`；驗收時檢查每個 tag 只出現一次 |
| 404 | `404.html` 維持不 prerender（任何未知網址都會拿到它，無法預知內容）；`main.ts` 偵測 `#app` 是空的就改用一般 mount。404 不列入 sitemap，維持 `noindex` |
| 動態路由 | slug 全部來自 `projects.ts`，build 時即已知 |
| Build 複雜度 | `npm run build` 仍是單一指令；workflow 不需修改；`dist-ssr/` 已在 `.gitignore`，不部署 |

## Files to Modify

- 新增：`src/entry-server.ts`、`build/prerender.ts`、`build/html.ts`（純函式：輸出路徑、渲染路徑、填入 app HTML）、對應測試、`src/entry-server.spec.ts`（Node 環境渲染全部路由）
- 修改：`package.json`（`build` script）、`vite.config.ts`（`define` build 年份）、`src/main.ts`（hydrate／mount）、`index.html`（移除通用 `<noscript>`）、`build/static-routes.ts`（SSR build 時不套用、sitemap、robots、404 的 noscript）、`src/utils/seo.ts`（`type`、`headTags`、OG image fallback）、`src/composables/usePageMeta.ts`、`src/components/layout/SiteFooter.vue`、`src/types/project.ts`（`ogImage?`）、`src/env.d.ts`
- 實作時另外修改：`vitest.config.ts`（Vite config 改為函式）、`eslint.config.ts`／`.prettierignore`（忽略 `dist-ssr/`）、`src/test-utils/setup.ts`（Node 環境的測試沒有 `window`）
- 移動：`public/og-default.png` → `public/og/default-og.png`
- 不修改：GitHub Actions workflow、Router、所有 UI 元件與 Design System

## Capabilities

### Modified Capabilities

- `seo-metadata`：Open Graph／Twitter 完整化、`og:type`、內容不需 JS 即可讀取、sitemap 與 robots。
- `pages-deployment`：`npm run build` 產出 prerender 後的靜態 HTML。
