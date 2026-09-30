# project-catalog Specification

## Purpose

集中定義與管理所有作品資料，並以一致的 Project Card 在首頁與 Projects 頁呈現，讓新增或修改作品只需要編輯單一資料來源。

## Requirements

### Requirement: Centralized project data
所有作品資料 SHALL 集中定義於單一資料模組並以型別約束；頁面與元件 SHALL 只讀取該模組，不得各自寫死作品內容。每個專案 SHALL 有唯一的 URL-safe slug（小寫英數與連字號），slug 兩語系共用；專案文字內容 SHALL 同時提供繁中與英文（見 `i18n` spec）。Case Study 的各 section SHALL 在型別上為 optional。

#### Scenario: Adding a project needs one edit
- **WHEN** 開發者在資料模組中新增一個專案物件
- **THEN** 該專案自動出現在 Projects 頁，並可透過 `/projects/<slug>` 開啟，不需修改任何 view 或 component

#### Scenario: Invalid data fails type-check
- **WHEN** 開發者新增的專案缺少必要欄位（例如 slug 或 title）
- **THEN** `npm run type-check` 失敗

#### Scenario: Duplicate slug fails build
- **WHEN** 兩個專案使用相同的 slug
- **THEN** `npm run build` 失敗並指出重複的 slug

### Requirement: Initial placeholder projects
資料 SHALL 包含以下 4 個專案，依顯示順序：
1. 社群管理平台／Social Media Management Platform（公司內部專案，開發中；重點為需求分析、使用者流程、前端架構、Component Design、State / Data Flow 與前端互動邏輯）
2. 檔案管理系統：大檔上傳與 CAD 檢視（featured）
3. 監控系統：即時串流與多路回放（featured）
4. B2B 企業官網：多專案 CMS 與 AI 內容工具（featured）

專案內容 SHALL 只記載已由使用者提供或確認的事實；未知的成效數字、使用者數、效能改善百分比、商業 KPI、技術選型與公司機密 SHALL 以明確的 TODO placeholder 表示，不得虛構。

#### Scenario: No fabricated metrics
- **WHEN** 檢視任一專案的 Result 內容
- **THEN** 未經確認的數據位置顯示為 TODO placeholder，而非具體數值

#### Scenario: Unknown tech stack stays a placeholder
- **WHEN** 社群管理平台的實際技術尚未由使用者提供
- **THEN** 技術標籤與 Tech Stack 以 TODO placeholder 呈現，不列出推測的技術

### Requirement: Projects listing page
`/projects` SHALL 以 Project Card 顯示所有專案，使用 responsive grid：寬度 ≥1024px 為 3 欄、768px–1023px 為 2 欄、<768px 為 1 欄。頁面 SHALL 有 `<h1>` 標題與簡短說明。

#### Scenario: Desktop grid
- **WHEN** 在 1440px 寬度開啟 `/projects`
- **THEN** 專案卡片以 3 欄排列

#### Scenario: Tablet grid
- **WHEN** 在 768px 寬度開啟 `/projects`
- **THEN** 專案卡片以 2 欄排列

#### Scenario: Mobile grid
- **WHEN** 在 375px 寬度開啟 `/projects`
- **THEN** 專案卡片以 1 欄排列且無水平捲軸

### Requirement: Project card content
Project Card SHALL 顯示：封面圖片（具有描述性 alt，並延遲載入）、專案標題、簡短描述、技術標籤，以及「View Case Study」連結至 `/projects/:slug`。專案有類型標籤或開發狀態時，卡片 SHALL 一併顯示；沒有時 SHALL 不顯示空白區塊。整張卡片 SHALL 只有一個可聚焦的連結目標，避免重複的 Tab 停留點；連結的可讀名稱 SHALL 包含專案標題。卡片在首頁與 Projects 頁 SHALL 使用相同元件與樣式。

#### Scenario: Card keyboard access
- **WHEN** 鍵盤使用者 Tab 經過一張 Project Card
- **THEN** 只停留一次，焦點樣式清楚可見，按 Enter 進入該專案 Case Study

#### Scenario: Image lazy loading
- **WHEN** Projects 頁載入
- **THEN** 卡片封面圖片帶有 `loading="lazy"` 與固定的長寬比例，載入時不造成版面位移

#### Scenario: Labels and status on the card
- **WHEN** Projects 頁顯示社群管理平台的卡片
- **THEN** 卡片顯示 Real-world Project、Frontend Development 標籤與「開發中」徽章，且卡片仍只有一個連結

#### Scenario: Cards without labels stay unchanged
- **WHEN** 卡片對應的專案沒有標籤與狀態
- **THEN** 卡片不顯示標籤列或徽章，版面與原本相同
