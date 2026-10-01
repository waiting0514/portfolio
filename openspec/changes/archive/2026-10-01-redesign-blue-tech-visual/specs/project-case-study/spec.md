# Spec Delta

## ADDED Requirements

### Requirement: Case study facts
Case Study Hero SHALL 在標題與副標之後顯示事實列，列出已知的專案事實：角色、公司、期間與技術；缺少的項目 SHALL 不顯示，不得顯示空白或 placeholder。事實列 SHALL 以 `<dl>` 呈現，項目名稱依語系顯示。

#### Scenario: All facts known
- **WHEN** 訪客開啟一個有角色、公司、期間與技術資料的專案
- **THEN** 事實列依序顯示四個項目

#### Scenario: Missing period
- **WHEN** 某專案沒有期間資料
- **THEN** 事實列不出現期間項目，其餘項目正常顯示

### Requirement: On-page table of contents
寬度 ≥1024px 時，Case Study SHALL 在內文旁顯示「本頁內容」目錄：只列出該專案實際渲染的 section，依頁面順序，以 `<nav>` 與連到各 section `id` 的連結呈現，並在捲動時固定在畫面中。目前閱讀中的 section SHALL 以視覺樣式與 `aria-current="true"` 標示。寬度 <1024px 時 SHALL 不顯示目錄，內文佔滿容器寬度。

#### Scenario: Table of contents lists rendered sections
- **WHEN** 訪客在 1440px 寬度開啟一個沒有 Architecture 資料的專案
- **THEN** 目錄列出該頁實際存在的 section，且不包含 Architecture / Flow

#### Scenario: Jump to a section
- **WHEN** 訪客點擊目錄中的「技術挑戰」
- **THEN** 頁面捲動到技術挑戰 section

#### Scenario: Hidden on small screens
- **WHEN** 訪客在 375px 或 768px 寬度閱讀 Case Study
- **THEN** 不顯示目錄，且沒有水平捲軸
