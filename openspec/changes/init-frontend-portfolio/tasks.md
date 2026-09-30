# Tasks

> 每個 Phase 完成時都必須執行 `npm run lint`、`npm run type-check`、`npm run test`、`npm run build`，全部通過且既有頁面仍可正常運作，才進入下一個 Phase。每個 Phase 的新邏輯在同一 Phase 補上單元測試（design.md D15）。

## 1. Project initialization

- [x] 1.1 在 scratchpad 暫存目錄以 `create-vue`（TypeScript、Router、Vitest、ESLint、Prettier；不選 Pinia、JSX、E2E）產生骨架，再複製到 repo 根目錄（**不可**在 repo 內使用 `--force`，以免刪除 `openspec/`、`.claude/` 等既有資料夾）；驗證：`npm install` 成功，`npm run dev` 可啟動
- [x] 1.2 移除範例檔（HelloWorld、TheWelcome、icons、範例 views、範例測試等），不留空資料夾；驗證：`src/` 中無範例元件
- [x] 1.3 設定 `package.json` scripts（dev / build / preview / lint / type-check / format / test / test:watch）、`engines.node`、`.nvmrc`（24）、`.gitignore`、`.editorconfig`、`.prettierrc.json`；驗證：每個 script 都能執行
- [x] 1.4 設定 ESLint flat config（vue `flat/recommended`、typescript `recommended`、`vuejs-accessibility`、skip-formatting、`no-explicit-any: error`、測試檔規則）；驗證：故意寫入 `any` 時 `npm run lint` 失敗，移除後通過
- [x] 1.5 設定 Vitest（`vitest.config.ts` 以 `mergeConfig` 重用 vite 設定、jsdom）與 `tsconfig.vitest.json`；新增一個最小 smoke 測試；驗證：`npm run test` 通過且 `npm run type-check` 會檢查 spec 檔
- [x] 1.6 安裝並整合 Tailwind CSS v4（`@tailwindcss/vite`），`main.css` 載入 Tailwind；驗證：utility class 在 build 產物 CSS 中生效
- [x] 1.7 `vite.config.ts` 支援 `BASE_PATH` 環境變數（正規化前後斜線，預設 `/`），正規化邏輯抽成可測試函式並寫單元測試；驗證：`BASE_PATH=/portfolio/ npm run build` 後 `dist/index.html` 資源路徑以 `/portfolio/` 開頭，不設定時以 `/` 開頭
- [x] 1.8 Phase 檢查：lint、type-check、test、build 通過

## 2. Design system / layout / i18n foundation

- [x] 2.1 在 `main.css` 以 `@theme` 定義 design.md D3 的 color / font / container token，並加入全域 base：focus-visible ring、`prefers-reduced-motion`、Case Study 內文排版；字體堆疊需涵蓋繁體中文系統字體；驗證：`ink-muted`、`accent` 在 `canvas`/`surface` 上對比 ≥ 4.5:1（計算值記錄於 CSS 註解）
- [x] 2.2 建立 `src/i18n/locales.ts`（`Locale`、`DEFAULT_LOCALE='zh-TW'`、`htmlLang`、`ogLocale`、路徑前綴解析與互換純函式）與 `src/i18n/messages.ts`（`interface Messages`，`zh-TW`/`en` 各自 `satisfies Messages`）；單元測試前綴解析與互換；驗證：刪除某個英文 key 時 type-check 失敗
- [x] 2.3 建立 router（`/:locale(en)?` 選擇性前綴、5 種頁面、catch-all、`createWebHistory(BASE_URL)`、非首頁 lazy load、`scrollBehavior`）與 `useLocale` composable（由 route 推導 locale、`messages`、`localePath`、`switchLocalePath`）；單元測試路由解析（`/`、`/en`、`/en/projects/x`、`/foo`、`/en/foo`）與 `useLocale`；驗證：測試通過
- [x] 2.4 建立型別 `src/types/profile.ts` 與資料 `src/data/profile.ts`（`Localized<>` 文字；未知內容用 `TODO:`），`src/utils/asset.ts`、`src/utils/content.ts`；單元測試 `assetUrl`、`hasContent` 與 profile 兩語系完整性；驗證：測試通過，資料中無虛構公司或數字
- [x] 2.5 建立共用元件 `BaseContainer`、`BaseButton`、`SectionHeading`、`TechTag`、`TechTagList`；`BaseButton` 單元測試（`to` → RouterLink、`href` → `<a target rel>` 與新分頁提示）；驗證：測試通過
- [x] 2.6 建立 `SkipLink`、`SiteHeader`（導覽文字依語系、active 與 `aria-current`、`/projects/:slug` 時 Projects active、GitHub 外部連結、語言切換連結、<768px `<button>` 選單含 `aria-expanded`/`aria-controls`，Escape 關閉並還原焦點、點擊連結或路由變更時關閉）、`SiteFooter`；`SiteHeader` 單元測試涵蓋上述互動；驗證：測試通過
- [x] 2.7 `App.vue` layout（SkipLink → Header → `<main id="main-content" tabindex="-1">` → Footer，換頁後焦點移至 main）、各 view 先放標題 placeholder、`NotFoundContent` 與 `NotFoundView`；驗證：瀏覽器中兩語系五種路由皆可切換，`/en/does-not-exist` 顯示英文 Not Found
- [x] 2.8 Phase 檢查：lint、type-check、test、build 通過

## 3. Home

- [x] 3.1 建立 `src/types/project.ts`（design.md D5）與 `src/data/projects.ts`：3 個 placeholder 專案（兩語系內容；spec `project-catalog` 列出的技術與特色；未知成效一律 `TODO:`）、`featuredProjects`、`getProjectBySlug`、`getAdjacentProjects`；檔頭註明 Node 相容限制；單元測試 slug 唯一與格式、兩語系必要文字非空、featured ≤ 3、查詢 helper；驗證：測試通過
- [x] 3.2 在 `public/images/projects/` 建立 3 張 SVG placeholder 封面（16:9），資料中填入 width/height 與兩語系 alt；驗證：dev 中圖片可載入
- [x] 3.3 建立 `src/data/skills.ts`（5 個分類，分類名稱雙語）並加入完整性測試；驗證：測試通過
- [x] 3.4 建立 `ProjectCard`（lazy 圖片 + width/height、標題、描述、`TechTagList`、單一 stretched link 且可讀名稱含專案標題、連結保持語系）與 `ProjectGrid`（1/2/3 欄）；`ProjectCard` 單元測試：只有一個連結、href 依語系正確；驗證：測試通過
- [x] 3.5 實作 `HomeView`：Hero（唯一 h1、簡介、focus 技術、兩個 CTA）、Featured Projects（+ View all）、Skills（分類 `<h3>` + `<ul>`）、About Preview；驗證：瀏覽器中 `/` 與 `/en/` 依 `home-page` spec scenarios 確認，heading 無跳級
- [x] 3.6 Phase 檢查：lint、type-check、test、build 通過；Navbar、語言切換與 404 仍正常

## 4. Projects

- [ ] 4.1 實作 `ProjectsView`：h1、說明、`ProjectGrid` 顯示全部專案（資料只來自 `src/data/projects.ts`）；驗證：375 / 768 / 1440px 分別為 1 / 2 / 3 欄，兩語系皆正常
- [ ] 4.2 Phase 檢查：lint、type-check、test、build 通過；首頁與 Projects 頁使用同一個 `ProjectCard`

## 5. Case Study

- [ ] 5.1 建立 `CaseStudySection`（`<section aria-labelledby>` + `<h2>` + slot）與 `ProjectPager`（Previous / Next，邊界時不顯示）；`ProjectPager` 單元測試邊界；驗證：測試通過
- [ ] 5.2 實作 `ProjectDetailView`（`slug` 由 props 傳入）：Hero 與依 spec 順序、各自 `v-if="hasContent(...)"` 的十個 section，內文 `max-w-[70ch]`；無效 slug 時在原路徑渲染 `NotFoundContent`；單元測試：缺少 section 不渲染標題、挑戰與解法成對、無效 slug 顯示 Not Found；驗證：測試通過
- [ ] 5.3 Phase 檢查：lint、type-check、test、build 通過；在 375px 閱讀兩語系三個 Case Study 無水平捲動

## 6. About / 404 / SEO

- [ ] 6.1 實作 `AboutView`：h1、簡介、經歷列表（TODO placeholder）、專長重點、聯絡方式、View Projects CTA；驗證：依 `about-page` spec scenarios 在兩語系確認
- [ ] 6.2 建立 `src/utils/seo.ts`（純函式：title、description、OG、canonical、hreflang alternates、`getStaticRoutes()`；Node 相容）與 `usePageMeta` composable（更新 title、`html[lang]`、meta、link）；`index.html` 設預設 `lang="zh-Hant-TW"`、預設 meta/OG/link tags、favicon；單元測試 `seo.ts` 全部函式與 `usePageMeta`；驗證：測試通過
- [ ] 6.3 在全部 view 套用 `usePageMeta`（Case Study 用專案 title/summary/cover；無效 slug 與 404 用 Not Found）；驗證：瀏覽器中切換頁面與語系時分頁標題、`html[lang]`、meta 同步更新
- [ ] 6.4 建立 `public/og-default.png`（1200×630，站名＋職稱）；驗證：檔案存在且尺寸正確
- [ ] 6.5 Phase 檢查：lint、type-check、test、build 通過

## 7. RWD / accessibility

- [ ] 7.1 以瀏覽器在 375 / 768 / 1024 / 1440px 檢查兩語系所有頁面：無水平捲軸、文字不截斷（特別注意中英文長度差異）、Navbar 行為符合 spec、Container 在 1440px 置中；修正發現的問題
- [ ] 7.2 鍵盤全流程檢查：Skip link、Navbar（含 mobile 選單 Escape、語言切換）、卡片、CTA、Pager 皆可操作且 focus 可見；每頁僅一個 h1 且無跳級；所有 CTA 為 `<a>`、選單切換為 `<button>`；修正發現的問題並補對應單元測試
- [ ] 7.3 模擬 `prefers-reduced-motion: reduce` 確認無 transition 與 smooth scroll；確認所有 `<img>` 有 alt；以 Lighthouse Accessibility 檢查兩語系首頁與 Case Study，無嚴重錯誤；修正發現的問題
- [ ] 7.4 Phase 檢查：lint、type-check、test、build 通過

## 8. GitHub Actions / GitHub Pages

- [ ] 8.1 實作 `build/static-routes.ts`：`generateBundle` 呼叫 `getStaticRoutes()`、驗證 slug（違反時 build 失敗）、以產出 `index.html` 為模板產生兩語系全部路由的 `index.html`（寫入 `lang`、title、description、OG、canonical、hreflang）與 `404.html`（`noindex`）；更新 `tsconfig.node.json` include；驗證：build 後 `dist/` 出現上述檔案且 `dist/en/projects/<slug>/index.html` 的 `<title>` 為英文專案標題、`<html lang="en">`
- [ ] 8.2 本機驗證子路徑部署：`BASE_PATH=/portfolio/` build 後以靜態伺服器將 `dist` 掛在 `/portfolio/` 下，直接開啟並重新整理 `/portfolio/projects/<slug>`、`/portfolio/en/about`（正確頁面與語系）與 `/portfolio/foo/bar`（網站 Not Found），Network 面板無 404 資源
- [ ] 8.3 建立 `.github/workflows/deploy.yml`（push main / workflow_dispatch / pull_request；build job：checkout → setup-node（`.nvmrc`、npm cache）→ configure-pages → npm ci → lint → type-check → test → build（`BASE_PATH`、`SITE_URL` 取自 configure-pages）→ upload-pages-artifact；deploy job 僅限 main：deploy-pages；最小 permissions 與 concurrency）；實作前確認各官方 action 最新非 deprecated major；驗證：YAML 語法檢查通過，步驟順序符合 `pages-deployment` spec
- [ ] 8.4 Phase 檢查：lint、type-check、test、build 通過（推送與實際部署需使用者確認後執行，並需先在 repo Settings → Pages 將 Source 設為 GitHub Actions）

## 9. README / QA

- [ ] 9.1 撰寫 `README.md`（繁體中文為主）：Project Introduction、Tech Stack、Features、Project Structure、Local Development、Build、Lint、Type Check、Test、Format、Deployment、GitHub Pages（Settings 設定步驟）、Architecture Decisions（Vue 3、TypeScript、static TS data、不用 Pinia、不用 vue-i18n 與 URL 語系策略、不用 SEO 套件、Router strategy 與替代方案比較、圖片放 public 的取捨、測試策略）、如何新增一個專案（含兩語系內容）、待替換的 TODO 內容清單；驗證：依 README 指令在乾淨 clone 照做成功
- [ ] 9.2 最終整合檢查：乾淨安裝後 `npm ci && npm run lint && npm run type-check && npm run test && npm run build` 全部通過；全文搜尋確認無 `any`、`@ts-ignore`、`eslint-disable`；抽查所有 spec scenarios（兩語系導覽、語言切換、首頁、grid、Case Study optional section、無效 slug、meta/hreflang、深層連結、RWD 四個寬度）皆符合
- [ ] 9.3 執行 `openspec validate init-frontend-portfolio --strict` 通過
