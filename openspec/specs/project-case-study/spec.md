# project-case-study Specification

## Purpose

Case Study 是作品集最重要的內容：以一致、易讀的結構說明每個專案的背景、個人角色、問題、架構、解法、挑戰與成果，讓面試官能評估問題解決能力與實務經驗。

## Requirements

### Requirement: Case study sections
`/projects/:slug` SHALL 依以下順序呈現專案內容：Hero（標題、副標、封面圖、技術標籤）、Overview、My Role、Problem、Architecture / Flow、Solution、Technical Challenges、Tech Stack、Result、What I Learned。每個 section SHALL 使用 `<section>` 並以 `<h2>` 作為標題，頁面唯一的 `<h1>` 為專案標題。

#### Scenario: Full case study
- **WHEN** 訪客開啟一個所有 section 皆有資料的專案
- **THEN** 依上述順序顯示全部 section，每個 section 有 `<h2>` 標題

### Requirement: Optional sections are omitted
任何沒有資料（未定義或為空陣列）的 section SHALL 完全不渲染，包含其標題；不得顯示空白 section 或「N/A」。

#### Scenario: Missing architecture section
- **WHEN** 某專案沒有 Architecture / Flow 資料
- **THEN** 頁面中不出現 Architecture / Flow 標題或空容器，其餘 section 正常顯示

### Requirement: Structured section content
Technical Challenges SHALL 以「挑戰 → 解法」成對呈現；Architecture / Flow SHALL 支援有序步驟列表，並可選擇性附上架構圖（附 alt 文字）；Result 與 What I Learned SHALL 以列表呈現。

#### Scenario: Challenge paired with solution
- **WHEN** 某專案有 2 個 Technical Challenges
- **THEN** 顯示 2 組內容，每組都包含挑戰描述與對應解法

### Requirement: Unknown slug shows Not Found
當 `:slug` 不對應任何專案時，頁面 SHALL 顯示 Not Found 內容（與 404 頁相同的內容與連結），且 document title SHALL 反映 Not Found。

#### Scenario: Invalid slug
- **WHEN** 訪客開啟 `/projects/unknown-project`
- **THEN** 顯示 Not Found 內容與回到 Projects 的連結

### Requirement: Case study navigation
Case Study 頁 SHALL 提供回到 `/projects` 的連結，並在頁尾提供前往上一個／下一個專案的連結（依資料順序；第一個或最後一個專案時不顯示不存在的方向）。

#### Scenario: Next project link
- **WHEN** 訪客位於第一個專案的 Case Study 底部
- **THEN** 看到指向第二個專案的「Next」連結，且沒有「Previous」連結

### Requirement: Readable on mobile
Case Study 內文 SHALL 限制最大行寬以利閱讀（約 65–75 字元），在 375px 寬度下 SHALL 無水平捲軸，圖片 SHALL 縮放至容器寬度。

#### Scenario: Mobile reading
- **WHEN** 在 375px 寬度閱讀任一 Case Study
- **THEN** 內文、列表與圖片皆在畫面寬度內，無需水平捲動
