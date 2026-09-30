# about-page Specification

## Purpose

提供較完整的個人背景頁面，補充首頁 About Preview 的內容，讓面試官了解工作經歷、專長方向與聯絡方式。

## Requirements

### Requirement: About content
`/about` SHALL 顯示：`<h1>` 標題、個人簡介段落、工作經歷列表（每筆含公司／職稱／期間／重點，未知內容以 TODO placeholder 表示）、專長重點，以及聯絡方式（至少 GitHub；Email 等其他管道為 optional）。內容 SHALL 來自集中管理的 profile 資料。

#### Scenario: About page renders profile
- **WHEN** 訪客開啟 `/about`
- **THEN** 看到簡介、工作經歷與 GitHub 連結

#### Scenario: Unknown experience details
- **WHEN** 工作經歷的公司名稱或期間尚未提供
- **THEN** 以 TODO placeholder 顯示，不虛構內容

### Requirement: Link to projects
About 頁 SHALL 提供前往 `/projects` 的 CTA。

#### Scenario: CTA to projects
- **WHEN** 訪客點擊 About 頁的 View Projects
- **THEN** 導向 `/projects`
