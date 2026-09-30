# Frontend Engineer Portfolio

[![CI / Deploy to GitHub Pages](https://github.com/waiting0514/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/waiting0514/portfolio/actions/workflows/deploy.yml)

前端工程師個人作品集，用於求職與面試展示：個人介紹、技術能力，以及每個重要專案的完整 Case Study。

這個 repo 本身也是一件作品：TypeScript 資料建模、元件設計、RWD、無障礙、SEO、單元測試與 CI/CD 都是展示的一部分。

- 網站：<https://waiting0514.github.io/portfolio/>（繁體中文）／<https://waiting0514.github.io/portfolio/en/>（English）
- 規格：[`openspec/`](openspec/)（需求、規格、設計決策與任務拆解）

## Tech Stack

| 類別      | 技術                                                                |
| --------- | ------------------------------------------------------------------- |
| Framework | Vue 3（Composition API、`<script setup lang="ts">`）、Vue Router    |
| Language  | TypeScript（strict、`noUncheckedIndexedAccess`）                    |
| Build     | Vite                                                                |
| Styling   | Tailwind CSS v4（`@theme` 設計 token）                              |
| Quality   | ESLint（含 `eslint-plugin-vuejs-accessibility`）、Prettier、vue-tsc |
| Testing   | Vitest、Vue Test Utils、jsdom                                       |
| CI/CD     | GitHub Actions → GitHub Pages                                       |

Runtime 依賴只有 `vue` 與 `vue-router`。

## Features

- **首頁**：Hero、3 個精選作品、分類技能清單（非 Logo Wall）、About 預覽
- **作品列表**：1 / 2 / 3 欄 responsive grid
- **Case Study**：Overview、My Role、Problem、Architecture / Flow、Solution、Technical Challenges、Tech Stack、Result、What I Learned；沒有內容的 section 不渲染
- **中英雙語**：繁體中文為預設（`/`），英文位於 `/en/`，可在任一頁切換到對應頁面
- **SEO**：每頁 title、description、Open Graph、canonical、hreflang；每個已知網址在 build 時產生帶有該頁 meta 的靜態 HTML
- **無障礙**：語意化 HTML、Skip link、鍵盤操作、可見 focus、換頁後焦點移至主內容、`prefers-reduced-motion`、WCAG AA 對比
- **404**：未知網址與不存在的專案 slug 都顯示網站自己的 Not Found 頁

## Project Structure

```
.github/workflows/deploy.yml   CI：lint → type-check → test → build → deploy
build/                         在 Node 執行的 build helper（皆有單元測試）
  base-path.ts                 正規化 GitHub Pages base path
  static-routes.ts             Vite plugin：每個網址的靜態 HTML、404.html、slug 驗證
public/                        favicon、Open Graph 圖片、專案封面
src/
  assets/main.css              Tailwind 與設計 token（顏色、字體、寬度、section 間距）
  components/
    common/                    BaseButton、BaseContainer、SectionHeading、TechTag(List)、SkipLink、NotFoundContent
    layout/                    SiteHeader（含 mobile 選單、語言切換）、SiteFooter
    project/                   ProjectCard、ProjectGrid、CaseStudySection、ProjectPager
  composables/                 useLocale（由網址推導語系）、usePageMeta（同步 <head>）
  data/                        projects.ts、profile.ts、skills.ts：所有內容集中於此
  i18n/                        locales.ts（語系與網址前綴）、messages.ts（型別化 UI 字典）
  router/                      路由表（單一表同時服務兩個語系）
  types/                       Project、CaseStudy、Profile 等型別
  utils/                       seo.ts（頁面 meta 單一來源）、asset.ts、content.ts
  views/                       HomeView、ProjectsView、ProjectDetailView、AboutView、NotFoundView
  test-utils/                  測試共用工具與 fixture（不會打包進網站）
```

單元測試以 `*.spec.ts` 放在被測檔案旁邊。

## Local Development

需求：Node.js 22.18+ 或 24 LTS（見 `.nvmrc`）、npm。

```bash
npm ci
npm run dev        # http://localhost:5173
```

## Scripts

| 指令                              | 說明                                                          |
| --------------------------------- | ------------------------------------------------------------- |
| `npm run dev`                     | 開發伺服器                                                    |
| `npm run build`                   | 產生正式版本到 `dist/`（含每個網址的靜態 HTML 與 `404.html`） |
| `npm run preview`                 | 預覽 `dist/`                                                  |
| `npm run lint`                    | ESLint 檢查（CI 使用，不修改檔案）                            |
| `npm run lint:fix`                | ESLint 自動修正                                               |
| `npm run type-check`              | vue-tsc 型別檢查（app、測試、build helper 三個 tsconfig）     |
| `npm run test`                    | 執行全部單元測試                                              |
| `npm run test:watch`              | 以 watch 模式執行測試                                         |
| `npm run format` / `format:check` | Prettier 格式化／檢查                                         |

`build` 不包含型別檢查；CI 會分別執行 `lint`、`type-check`、`test`、`build`，任一步失敗就不會部署。

## Deployment

推送到 `main` 後，GitHub Actions 會執行 lint、type-check、test、build，並用官方 Pages actions 部署。Pull Request 只執行檢查，不部署。

### GitHub Pages 設定（只需一次）

1. Repo **Settings → Pages → Build and deployment → Source** 選擇 **GitHub Actions**
2. 推送到 `main`，或在 Actions 頁面手動執行 workflow

### Base path

網站可能部署在 `https://<user>.github.io/`（user site）或 `https://<user>.github.io/<repo>/`（project site）。設定中沒有寫死 repo 名稱：

- `vite.config.ts` 的 `base` 來自環境變數 `BASE_PATH`，未設定時為 `/`
- CI 以 `actions/configure-pages` 的 `base_path` 設定 `BASE_PATH`，`base_url` 設定 `SITE_URL`（用於 canonical 與 Open Graph 的絕對網址）
- 改用自訂網域時 `base_path` 會變成空字串，不需要修改程式

在本機模擬 project site：

```bash
BASE_PATH=/portfolio SITE_URL=http://localhost:4173/portfolio npm run build
```

在 Windows 的 Git Bash 中，需在前面加上 `MSYS_NO_PATHCONV=1`，否則 `/portfolio` 會被轉成 Windows 路徑。

## Architecture Decisions

### 為什麼使用 Vue 3 與 TypeScript

Composition API 與 `<script setup>` 讓元件邏輯集中、易於抽出 composable；TypeScript 讓「作品資料的結構」與「兩種語言的翻譯是否完整」都能在編譯期被檢查，而不是在畫面上才發現缺漏。

### 為什麼作品資料使用靜態 TypeScript

內容量小、更新頻率低，不需要 CMS 或 API。TypeScript 資料在編譯期檢查結構、零解析成本，也不需要額外的 loader。新增專案只需要編輯 `src/data/projects.ts`。

每個 Case Study section 在型別上都是 optional，沒有內容的 section 不渲染，因此不需要為了填滿版面而虛構內容。

### 為什麼沒有使用 Pinia

目前沒有跨頁共享且可變的狀態：作品資料是不可變的靜態 import，語系由網址推導，mobile 選單開關是 Navbar 的本地狀態。加入 store 只會多一層間接。之後若出現需要跨頁保留的狀態（例如篩選條件、主題切換）再引入。

### i18n：網址決定語系，不使用 vue-i18n

- 繁體中文不加前綴（`/projects`），英文加 `/en`（`/en/projects`）。語系只由網址決定，每個語言的每一頁都有可分享、可被搜尋引擎索引的網址
- 不把語系存在 localStorage：同一網址會顯示不同內容，爬蟲也只看得到一種語言
- 兩種語言都加前綴（`/zh-tw/`、`/en/`）需要把根路徑轉址，GitHub Pages 無法做 server 端轉址
- 只有兩種語言、沒有複數規則或日期格式化需求，因此用型別化字典取代 vue-i18n：`zh-TW` 與 `en` 都必須符合同一個 `Messages` interface，缺少或拼錯 key 都是型別錯誤

### Router strategy：History mode + 靜態路由 HTML + `404.html`

GitHub Pages 沒有 server 端 rewrite，直接開啟或重新整理 `/projects/some-slug` 時，伺服器找不到對應檔案。

| 方案                                                 | 網址            | 深層連結重新整理 | 已知網址 HTTP 狀態 | 各頁 meta（不執行 JS） |
| ---------------------------------------------------- | --------------- | ---------------- | ------------------ | ---------------------- |
| Hash mode                                            | `/#/projects/x` | 可以             | 200                | 無，全部同一頁         |
| 只複製 `index.html` 為 `404.html`                    | 乾淨            | 可以             | **404**            | 無                     |
| vite-ssg / Nuxt 預渲染                               | 乾淨            | 可以             | 200                | 有，但需引入 SSR 架構  |
| **本專案：build 時產生每個網址的 HTML + `404.html`** | 乾淨            | 可以             | **200**            | **有**                 |

`build/static-routes.ts` 是一百多行、無額外依賴的 Vite plugin，在 build 時：

1. 驗證專案 slug 格式與唯一性，有問題就讓 build 失敗
2. 以產出的 `index.html` 為模板，為兩個語系的每個已知網址寫出 `<route>/index.html`，包含該頁的 `lang`、title、description、Open Graph、canonical 與 hreflang
3. 產生 `404.html`（`noindex`），未知網址載入 SPA 後由 router 顯示網站自己的 Not Found 頁

頁面 meta 的組成規則集中在 `src/utils/seo.ts`，runtime 的 `usePageMeta` 與 build plugin 共用，兩者不會不一致。這也是 `src/data`、`src/i18n`、`src/utils/seo.ts` 必須維持 Node 相容（使用相對路徑 import、不使用 `import.meta.env`）的原因。

### 為什麼不使用 SEO 套件

需要的只有 title、description、Open Graph、canonical 與 hreflang。一個約 60 行的 composable 即可完成，不需要 `@unhead/vue` 這類依賴。

### 圖片放在 `public/`

build plugin 在 Node 中讀取作品資料，資料模組因此不能 import 圖片，封面改以 `public/` 的相對路徑記錄，並透過 `assetUrl()` 加上 base path。代價是檔名沒有 content hash，替換圖片時請改檔名。所有圖片都指定 `width`、`height` 以避免版面位移，列表中的封面延遲載入。

社群平台不支援 SVG 預覽圖，封面是 SVG 時 Open Graph 會改用 `public/og-default.png`；封面改成 PNG／JPG 後會自動使用封面。

### 設計系統

`src/assets/main.css` 以 `@theme` 定義語意化 token（`canvas`、`surface`、`ink`、`ink-muted`、`line`、`accent`），並清除 Tailwind 預設色盤，元件只能使用這些顏色。重複的樣式組合封裝成 Vue 元件（`BaseButton`、`ProjectCard`、`TechTag`…），不使用大量 `@apply`。

### 測試策略

只測有邏輯的地方：資料完整性（slug、兩語系內容）、SEO 與網址工具、路由解析、語系切換、mobile 選單互動、Case Study 的 optional section、build plugin 的 HTML 產生。Case Study 測試使用 fixture 資料，修改實際作品內容不會讓測試失敗。

RWD 與無障礙以瀏覽器檢查：375 / 768 / 1024 / 1440 px、鍵盤操作、`prefers-reduced-motion`，以及 axe-core（WCAG 2.2 AA）掃描。

## 新增一個專案

1. 在 `public/images/projects/` 放入 16:9 封面圖
2. 在 `src/data/projects.ts` 的 `projects` 陣列新增一筆資料：
   - `slug`：小寫英數與連字號，兩個語系共用
   - `cover`：`src`（相對於 `public/`）、`width`、`height`
   - `technologies`：技術名稱（不翻譯）
   - `featured`：是否顯示在首頁（最多 3 個）
   - `content['zh-TW']`、`content.en`：標題、摘要、封面 alt、特色，以及 Case Study 各 section；沒有內容的 section 直接省略
3. 執行 `npm run type-check && npm run test`：缺少任一語系或必要欄位時會失敗

新專案會自動出現在作品列表、取得 `/projects/<slug>` 與 `/en/projects/<slug>` 頁面，並在 build 時產生對應的靜態 HTML。

## 待替換的內容（TODO）

目前的內容是 placeholder。成效數字、使用者數、公司名稱等未確認的資訊一律保留為 `TODO:`，請勿虛構。

- [ ] `src/data/profile.ts`：姓名、自我介紹、工作背景、簡介、專長、工作經歷；如需要可加入 `email`
- [ ] `src/data/projects.ts`：三個專案的 Case Study 內容（角色、問題、架構、解法、技術挑戰、成果、學到的事）
- [ ] `src/data/projects.ts`：B2B Corporate Website 的實際技術（目前為 `TODO: Framework`）
- [ ] `public/images/projects/`：以實際截圖（建議 PNG／WebP，1600×900）取代 SVG placeholder
- [ ] `public/og-default.png`：如需要，可換成含姓名的社群預覽圖（1200×630）
- [ ] `index.html`：首次載入的預設 title 與 description
