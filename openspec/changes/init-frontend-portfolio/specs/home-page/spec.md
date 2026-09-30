# Spec Delta

## Purpose

首頁是面試官的第一印象：在一個畫面內說明「我是誰、擅長什麼」，並引導至精選專案、技能分類與個人背景，讓訪客能快速決定要深入閱讀哪個 Case Study。

## ADDED Requirements

### Requirement: Hero section
首頁 SHALL 以 Hero 區塊開始，包含：頁面唯一的 `<h1>`（職稱：中文「前端工程師」／英文「Frontend Engineer」，可搭配姓名）、簡短自我介紹、技術重點（Vue、Angular、TypeScript、JavaScript、RxJS），以及兩個 CTA：「View Projects」（Primary，連到目前語系的 Projects 頁）與「GitHub」（Secondary，外部連結）。本規格中的按鈕與區塊名稱以英文記載，實際顯示文字依語系翻譯。Hero 的文字內容 SHALL 來自集中管理的 profile 資料，而非寫死在頁面中。

#### Scenario: Hero content and CTAs
- **WHEN** 訪客開啟首頁
- **THEN** 看到職稱標題、自我介紹、技術重點，以及 View Projects 與 GitHub 兩個按鈕樣式的連結

#### Scenario: English hero
- **WHEN** 訪客開啟 `<base>/en/`
- **THEN** `<h1>` 包含「Frontend Engineer」

#### Scenario: View Projects CTA
- **WHEN** 訪客點擊 View Projects
- **THEN** 導向 `/projects`

### Requirement: Featured projects
首頁 SHALL 顯示所有標記為 featured 的專案，數量上限為 3，順序依資料定義順序。每個專案以 Project Card 呈現（內容規則見 `project-catalog`），並提供前往 `/projects` 的「View all projects」連結。

#### Scenario: Three featured cards
- **WHEN** 資料中有 3 個 featured 專案
- **THEN** 首頁 Featured Projects 區塊顯示 3 張 Project Card

#### Scenario: Card links to case study
- **WHEN** 訪客點擊某張 Featured Project Card 的 View Case Study
- **THEN** 導向該專案的 `/projects/:slug`

### Requirement: Categorized skills
首頁 SHALL 以文字分類清單呈現技能（非 Logo Wall），至少包含以下分類與項目：Frontend（Vue、Angular、React、TypeScript、JavaScript）、State / Reactive（Pinia、RxJS）、Realtime / Media（WebSocket、WebRTC、MSE）、Tooling（Vite、Webpack、ESLint、Prettier）、DevOps（Docker、GitHub Actions、Cloudflare）。每個分類 SHALL 有標題，項目 SHALL 以列表語意（`<ul>`/`<li>`）呈現。技能資料 SHALL 集中管理。

#### Scenario: Skills grouped by category
- **WHEN** 訪客捲動到 Skills 區塊
- **THEN** 看到 5 個具標題的分類，每個分類下列出對應技能

### Requirement: About preview
首頁 SHALL 包含一段簡短的工作背景介紹，以及連到 `/about` 的「View About」CTA。

#### Scenario: Navigate to About
- **WHEN** 訪客點擊 View About
- **THEN** 導向 `/about`
