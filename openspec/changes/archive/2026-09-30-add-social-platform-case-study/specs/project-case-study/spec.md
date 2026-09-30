# Spec Delta

## MODIFIED Requirements

### Requirement: Case study sections
`/projects/:slug` SHALL 依以下順序呈現專案內容：Hero（標題、副標、封面圖、技術標籤；專案有標籤或開發狀態時一併顯示）、Overview、Background、My Role、Problem、Requirement to Frontend Workflow、Architecture / Flow、Solution、Key Responsibilities、Technical Challenges、AI-assisted Development、Tech Stack、Result、Current Status、What I Learned。每個 section SHALL 使用 `<section>` 並以 `<h2>` 作為標題，頁面唯一的 `<h1>` 為專案標題。

#### Scenario: Full case study
- **WHEN** 訪客開啟一個所有 section 皆有資料的專案
- **THEN** 依上述順序顯示全部 section，每個 section 有 `<h2>` 標題

#### Scenario: Existing projects keep their layout
- **WHEN** 訪客開啟一個沒有 Background、Workflow、Key Responsibilities、AI-assisted Development 與 Current Status 資料的專案
- **THEN** 頁面只顯示該專案原有的 section，順序與原本相同

### Requirement: Structured section content
Technical Challenges SHALL 以「挑戰 → 解法」成對呈現；Architecture / Flow SHALL 支援有序步驟列表，並可選擇性附上架構圖（附 alt 文字）；Result 與 What I Learned SHALL 以列表呈現。

Background、My Role 與 Problem SHALL 可選擇性附帶一段流程（依序排列的步驟），Requirement to Frontend Workflow SHALL 以流程呈現；流程在寬度 ≥768px 時 SHALL 以橫向排列（可換行），在較窄的寬度 SHALL 改為直向排列，任何寬度下皆 SHALL 不產生水平捲軸。流程 SHALL 以有序列表語意呈現，箭頭等裝飾 SHALL 對輔助技術隱藏。

Problem SHALL 可選擇性附帶一組狀態清單（例如發文的各種狀態）。Key Responsibilities SHALL 以「標題 + 說明」的卡片呈現，並與 Technical Challenges 使用相同的卡片樣式。AI-assisted Development SHALL 包含說明段落，以及仍需由工程師判斷的項目列表。Current Status SHALL 以「項目 → 狀態」的清單呈現。

#### Scenario: Challenge paired with solution
- **WHEN** 某專案有 2 個 Technical Challenges
- **THEN** 顯示 2 組內容，每組都包含挑戰描述與對應解法

#### Scenario: Workflow on desktop and mobile
- **WHEN** 訪客在 1440px 與 375px 寬度檢視 Requirement to Frontend Workflow
- **THEN** 1440px 時步驟橫向排列並依序換行，375px 時步驟直向排列，兩者都沒有水平捲軸，且步驟以有序列表呈現

#### Scenario: Responsibilities use the shared card style
- **WHEN** 某專案有 Key Responsibilities
- **THEN** 每個職責以卡片呈現標題與說明，外觀與 Technical Challenges 的卡片一致

#### Scenario: Current status list
- **WHEN** 某專案有 Current Status 資料
- **THEN** 以「項目 → 狀態」的清單顯示，例如「Backend Integration → Pending」

## ADDED Requirements

### Requirement: Development status
專案 SHALL 可標示開發狀態；標示為開發中的專案 SHALL 在 Case Study Hero 與 Project Card 顯示「開發中／In Development」狀態徽章，徽章文字依語系顯示，且不得僅以顏色傳達狀態。沒有標示狀態的專案 SHALL 不顯示徽章。

#### Scenario: In-development badge
- **WHEN** 訪客開啟標示為開發中的專案
- **THEN** Hero 顯示「開發中」（英文頁為「In Development」）徽章

#### Scenario: Completed projects have no badge
- **WHEN** 訪客開啟未標示狀態的專案
- **THEN** 頁面不顯示任何狀態徽章

### Requirement: Confidential project presentation
公司內部或開發中的專案 SHALL 不提供 Source Code、GitHub Repository 或 Live Demo 連結，SHALL 不公開內部需求文件、內部追蹤編號、真實使用者或客戶資料、API endpoint 與憑證。在使用者確認可公開的畫面之前，封面 SHALL 使用不含任何實際系統畫面的中性 placeholder，並以 alt 文字說明畫面尚待確認。

#### Scenario: No external project links
- **WHEN** 訪客檢視社群管理平台的 Project Card 與 Case Study
- **THEN** 只有「View Case Study」與站內導覽連結，沒有 GitHub 或 Live Demo 連結

#### Scenario: Placeholder cover
- **WHEN** 訪客檢視社群管理平台的封面
- **THEN** 顯示中性 placeholder，不含任何實際系統畫面，alt 文字說明畫面尚待確認
