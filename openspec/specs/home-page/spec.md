# home-page Specification

## Purpose

首頁是面試官的第一印象：在一個畫面內說明「我是誰、擅長什麼」，並引導至精選專案、技能分類與個人背景，讓訪客能快速決定要深入閱讀哪個 Case Study。

## Requirements

### Requirement: Hero section
首頁 SHALL 以 Hero 區塊開始，包含：頁面唯一的 `<h1>`（職稱：中文「前端工程師」／英文「Frontend Engineer」，可搭配姓名）、簡短自我介紹、技術重點（Vue、Angular、TypeScript、JavaScript、RxJS），以及兩個 CTA：「View Projects」（Primary，連到目前語系的 Projects 頁）與「About Me」（Secondary，連到目前語系的 About 頁）。本規格中的按鈕與區塊名稱以英文記載，實際顯示文字依語系翻譯。Hero 的文字內容 SHALL 來自集中管理的 profile 資料，而非寫死在頁面中。

寬度 ≥1024px 時 Hero SHALL 為左右版面：左側為上述文字與 CTA，右側為 Hero Animation；較窄時 SHALL 改為上下排列，文字在前。

#### Scenario: Hero content and CTAs
- **WHEN** 訪客開啟首頁
- **THEN** 看到職稱標題、自我介紹、技術重點，以及 View Projects 與 About Me 兩個按鈕樣式的連結

#### Scenario: English hero
- **WHEN** 訪客開啟 `<base>/en/`
- **THEN** `<h1>` 包含「Frontend Engineer」

#### Scenario: View Projects CTA
- **WHEN** 訪客點擊 View Projects
- **THEN** 導向 `/projects`

#### Scenario: About Me CTA
- **WHEN** 訪客點擊 About Me
- **THEN** 導向 `/about`

#### Scenario: Current panel
- **WHEN** 訪客開啟首頁
- **THEN** Hero 不再顯示「目前」面板，最新一筆工作經歷改由 About 預覽呈現

#### Scenario: Desktop split layout
- **WHEN** 在 1440px 寬度開啟首頁
- **THEN** Hero 文字與 CTA 在左、Hero Animation 在右，且頁面沒有水平捲軸

### Requirement: Featured projects
首頁 SHALL 顯示所有標記為 featured 的專案，數量上限為 3，順序依資料定義順序。每個專案以 Project Card 呈現（內容規則見 `project-catalog`），並提供前往 `/projects` 的「View all projects」連結。

#### Scenario: Three featured cards
- **WHEN** 資料中有 3 個 featured 專案
- **THEN** 首頁 Featured Projects 區塊顯示 3 張 Project Card

#### Scenario: Card links to case study
- **WHEN** 訪客點擊某張 Featured Project Card 的 View Case Study
- **THEN** 導向該專案的 `/projects/:slug`

### Requirement: Categorized skills
首頁 SHALL 以文字分類清單呈現技能（非 Logo Wall），至少包含以下分類與項目：Frontend（Vue、Angular、TypeScript、JavaScript）、State / Reactive（Pinia、RxJS）、Realtime / Media（WebSocket、WebRTC、MSE）、Tooling（Vite、Webpack、ESLint、Prettier）、DevOps（Docker、GitHub Actions）。每個分類 SHALL 有標題，項目 SHALL 以列表語意（`<ul>`/`<li>`）呈現。技能資料 SHALL 集中管理。技能區塊為輔助資訊，其標題 SHALL 小於精選作品等主要區塊的標題。

#### Scenario: Skills grouped by category
- **WHEN** 訪客捲動到 Skills 區塊
- **THEN** 看到 5 個具標題的分類，每個分類下列出對應技能，且不包含 React 與 Cloudflare

### Requirement: About preview
首頁 SHALL 包含一段簡短的工作背景介紹、依時間由新到舊排列的工作經歷（期間、公司、職稱），以及連到 `/about` 的「View About」CTA。工作經歷 SHALL 來自 profile 資料。

#### Scenario: Navigate to About
- **WHEN** 訪客點擊 View About
- **THEN** 導向 `/about`

#### Scenario: Experience timeline
- **WHEN** 訪客捲動到 About 預覽
- **THEN** 以有序清單看到每一段工作經歷的期間、公司與職稱

### Requirement: Hero animation
Hero SHALL 包含一個裝飾性的 Hero Animation，以約 6 秒的無限循環依序呈現 Requirement（Product / AI Spec）→ Requirement Analysis → Frontend Architecture（Component、State、Router、API）→ Web Product（Maintainable Web Application）。動畫 SHALL 只使用網站既有的設計 token，SHALL 只以 transform 與 opacity 製作動態，且每個循環 SHALL 以全部透明開始與結束，接縫不出現跳格。動畫 SHALL NOT 包含公司名稱、客戶名稱、真實 API、真實需求或業務資料，也 SHALL NOT 以技術 Logo 呈現。

動畫 SHALL 以單一具有本地化無障礙名稱的圖片角色（`role="img"`）呈現，內部元素對輔助科技隱藏，且不含可聚焦元素。動畫元件 SHALL 與 Hero 文字分開實作；首屏 SHALL 先以靜態完整狀態渲染，在瀏覽器空閒後才開始循環，且播放不改變版面尺寸。寬度 <640px 時 Architecture 節點 MAY 簡化，但 Requirement → Architecture → Product 流程 SHALL 保留。

當使用者設定 `prefers-reduced-motion: reduce` 時，動畫 SHALL NOT 播放，SHALL 直接顯示完整的靜態最終狀態。

#### Scenario: Animation plays after idle
- **WHEN** 訪客開啟首頁且未設定減少動態效果
- **THEN** Hero 文字立即可見，動畫在瀏覽器空閒後開始 6 秒循環

#### Scenario: Reduced motion shows the final state
- **WHEN** 作業系統開啟減少動態效果並開啟首頁
- **THEN** 動畫不播放，Requirement、Architecture 與 Web Application 同時完整顯示

#### Scenario: Accessible name
- **WHEN** 螢幕閱讀器讀到 Hero Animation
- **THEN** 只讀出一段描述「需求 → 前端架構 → 可維護的 Web 應用程式」的名稱，不逐一讀出動畫內的文字

#### Scenario: Mobile without overflow or layout shift
- **WHEN** 在 375px 寬度開啟首頁
- **THEN** 動畫位於 Hero 文字下方、沒有水平捲軸，且動畫播放期間下方內容不位移
