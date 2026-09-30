# Proposal

## Why

需要一個求職／面試用的前端工程師個人作品集網站：讓面試官能在幾分鐘內掌握個人背景、技術能力，並透過完整的 Case Study 了解實際專案中的問題解決過程。這個網站本身也是一件作品，程式碼品質、TypeScript modeling、Component 設計、RWD、Accessibility 與 CI/CD 都是展示的一部分。目前 repository 只有 OpenSpec 設定，尚無任何程式碼，因此這是一個從零開始的建置（greenfield）。

## What Changes

- 建立 Vue 3 + TypeScript + Vite 專案骨架，搭配 Vue Router、Tailwind CSS、ESLint、Prettier，npm 為套件管理工具。
- 建立統一 Design System（色彩、字級、間距、Container、Border、Radius、Shadow、Section spacing）與共用 UI：Primary/Secondary Button、Project Card、Tech Tag、Section Title、Container。
- 建立全站 Layout：Navbar（Home / Projects / About / GitHub，含 mobile 選單）、Footer、Skip link。
- 頁面：Home（Hero、Featured Projects、Skills、About Preview）、Projects（responsive grid）、Project Case Study（`/projects/:slug`）、About、404。
- 以 `src/data/projects.ts` 集中管理作品資料，並以 TypeScript 型別描述 Project 與 Case Study；section 為 optional，缺少的 section 不渲染。
- 建立 3 個 placeholder 專案（Large File Upload System、Multi-stream Video System、B2B Corporate Website）。未知的成效數字、使用者數、KPI、公司機密一律以 TODO 標示，不虛構。
- 基本 SEO：每頁 title／meta description、Open Graph 基本標籤、semantic HTML；Case Study 依專案改變 document title。
- 部署：GitHub Actions（lint → type-check → build → 官方 Pages actions）部署至 GitHub Pages，正確處理 repository base path 與 history mode 直接重新整理的問題。
- 中英雙語：預設語言為繁體中文（`/`），英文版位於 `/en/` 路徑前綴；Navbar 提供語言切換，切換後停留在對應頁面。所有 UI 文字與作品／個人資料都有兩種語言，缺少任一語言時 type-check 失敗。
- 單元測試：以 Vitest + Vue Test Utils 測試資料完整性、工具函式、i18n、路由與有邏輯的元件；`npm run test` 納入 CI 品質關卡。
- README：專案介紹、技術棧、結構、指令、部署與 Architecture Decisions。

### 對原始需求的調整（避免過度工程化）

- **不安裝 Pinia**：目前沒有跨頁的 global state；作品資料為靜態 import，mobile 選單狀態屬於 Navbar 本地狀態。
- **不引入 SEO / head 管理套件**（如 `@unhead/vue`）：以一個小型 composable 更新 `document.title` 與 meta 即可；另外在 build 時為已知路由產生帶有正確 meta 的靜態 HTML，讓不執行 JS 的 OG 爬蟲也能讀到。
- **不預先建立空資料夾**：例如 `layouts/` 只有在有第二種 layout 時才建立；目前單一 layout 放在 `components/layout/` 即可。
- **Skills、Profile 資料也集中為靜態 TS 資料**（`src/data/`），避免 hardcode 在 view 中。
- **不引入 `vue-i18n`**：只有兩種語言、沒有複數規則或日期/貨幣格式化需求；以型別化的訊息字典＋由 URL 推導語系的 composable 即可，且字典 key 打錯會直接在 type-check 失敗。

## Capabilities

### New Capabilities

- `site-navigation`: 全站 layout、Navbar（含 mobile 行為）、Footer、路由表與 404 catch-all。
- `home-page`: 首頁 Hero、3 個 Featured Projects、分類 Skills、About Preview 與 CTA。
- `project-catalog`: 作品資料模型與集中管理、Projects 列表頁、Project Card 的內容與 responsive grid。
- `project-case-study`: `/projects/:slug` 詳細頁的 section 結構、optional section 規則、slug 不存在時的行為、placeholder 內容規則。
- `about-page`: About 頁面內容結構。
- `seo-metadata`: 每頁 title、meta description、Open Graph、document title 更新與不執行 JS 時的 meta 可讀性。
- `accessibility-responsive`: semantic HTML、鍵盤操作、focus、heading 階層、alt、對比、reduced motion，以及 375/768/1024/1440 的 RWD 行為。
- `pages-deployment`: GitHub Pages base path、深層連結重新整理、CI pipeline 品質關卡（含單元測試）與 npm scripts。
- `i18n`: 繁中（預設）／英文雙語、語系 URL 結構、語言切換、內容完整性與 `<html lang>`。

### Modified Capabilities

（無，這是新專案，`openspec/specs/` 目前為空。）

## Impact

- **新增程式碼**：整個 `src/`、`public/`、`index.html`、`vite.config.ts`、`tsconfig*.json`、`eslint.config.ts`、`.prettierrc`、`package.json`、`.github/workflows/deploy.yml`、`README.md`。
- **Dependencies**：runtime 僅 `vue`、`vue-router`；dev 為 Vite、TypeScript、vue-tsc、Tailwind CSS、ESLint／Prettier 相關套件、Vitest、`@vue/test-utils`、`jsdom`。
- **外部系統**：GitHub Pages（需在 repo Settings → Pages 將 Source 設為 GitHub Actions）。部署目標為 `https://waiting0514.github.io/portfolio/`（由 git remote 推得），但設定不寫死 repository 名稱。
- **需使用者後續提供的內容**：真實姓名／自我介紹文字、工作經歷、專案截圖、Case Study 真實內容；在提供前以 TODO placeholder 呈現。
