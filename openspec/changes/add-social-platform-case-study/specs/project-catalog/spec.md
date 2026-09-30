# Spec Delta

## MODIFIED Requirements

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
