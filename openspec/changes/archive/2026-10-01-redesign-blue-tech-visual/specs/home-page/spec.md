# Spec Delta

## MODIFIED Requirements

### Requirement: Hero section
首頁 SHALL 以 Hero 區塊開始，包含：頁面唯一的 `<h1>`（職稱：中文「前端工程師」／英文「Frontend Engineer」，可搭配姓名）、簡短自我介紹、技術重點（Vue、Angular、TypeScript、JavaScript、RxJS），以及兩個 CTA：「View Projects」（Primary，連到目前語系的 Projects 頁）與「GitHub」（Secondary，外部連結）。本規格中的按鈕與區塊名稱以英文記載，實際顯示文字依語系翻譯。Hero 的文字內容 SHALL 來自集中管理的 profile 資料，而非寫死在頁面中。

Hero SHALL 另外包含一個「目前」面板：顯示最新一筆工作經歷的公司、職稱與期間、技術重點，以及標示為開發中的專案（連到其 Case Study）；面板內容 SHALL 由 profile 與專案資料推導，沒有開發中的專案時該列 SHALL 不顯示。

#### Scenario: Hero content and CTAs
- **WHEN** 訪客開啟首頁
- **THEN** 看到職稱標題、自我介紹、技術重點，以及 View Projects 與 GitHub 兩個按鈕樣式的連結

#### Scenario: English hero
- **WHEN** 訪客開啟 `<base>/en/`
- **THEN** `<h1>` 包含「Frontend Engineer」

#### Scenario: View Projects CTA
- **WHEN** 訪客點擊 View Projects
- **THEN** 導向 `/projects`

#### Scenario: Current panel
- **WHEN** 訪客開啟首頁
- **THEN** 「目前」面板顯示最新一筆工作經歷，以及開發中專案的連結與「開發中」狀態

### Requirement: About preview
首頁 SHALL 包含一段簡短的工作背景介紹、依時間由新到舊排列的工作經歷（期間、公司、職稱），以及連到 `/about` 的「View About」CTA。工作經歷 SHALL 來自 profile 資料。

#### Scenario: Navigate to About
- **WHEN** 訪客點擊 View About
- **THEN** 導向 `/about`

#### Scenario: Experience timeline
- **WHEN** 訪客捲動到 About 預覽
- **THEN** 以有序清單看到每一段工作經歷的期間、公司與職稱
