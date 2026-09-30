# Proposal

## Why

作品集目前的三個 Case Study 都在說明「做了什麼系統、解決了什麼技術問題」，還缺一個能展示**需求分析與產品思考**的案例。「社群管理平台」是一個仍在開發中的公司專案：主管提供的是 AI 輔助產生的需求草稿，而不是完整規格，我的工作是把模糊需求轉成可實作的使用者流程、頁面架構、狀態設計與前端 UI。這正好補上「如何把 AI 產生的需求轉成真正的前端產品」這一塊。

現有的 Case Study 資料模型與版面是依「已完成的技術專案」設計的（Problem → Architecture → Solution → Challenges → Result），無法表達「開發中」狀態、專案類型標籤、需求到實作的流程圖、職責卡片、AI 輔助開發與目前進度，因此需要小幅擴充。

## What Changes

- 新增第 4 個專案「社群管理平台／Social Media Management Platform」，中英雙語內容，定位為需求分析與前端架構的 Case Study，明確標示 **In Development**。
- 擴充專案資料模型（皆為 optional，既有三個專案不受影響）：
  - 專案層級：`status`（開發狀態）、`labels`（專案類型標籤，例如 Real-world Project、Frontend Development）。
  - Case Study 新增 optional section：Background、Requirement to Frontend Workflow、Key Responsibilities、AI-assisted Development、Current Status；並讓 My Role 與 Problem 可附帶流程（flow）與狀態清單。
- 新增一個可重用的流程圖元件（桌面橫向、手機直向，不產生水平捲軸），用於背景的輸入流程、我的角色、需求到實作的流程與主要挑戰的範例流程。
- Project Card 與 Case Study Hero 在有資料時顯示專案類型標籤與「開發中」狀態徽章；其他專案不變。
- 將既有「技術挑戰」的卡片樣式抽成共用元件，同時用於 Key Responsibilities，避免重複樣式。
- 公司內部專案的呈現規則：不提供 Source Code、GitHub、Live Demo；封面先使用中性 placeholder，待使用者確認可公開的畫面後再替換；不公開內部需求文件、追蹤編號、示範資料與任何 API 資訊。
- 更新 `project-catalog` 中已過時的「Initial placeholder projects」需求，改為描述目前實際的四個專案與內容規則。

### 對原始需求的調整

- **發文狀態依實際文件**：需求範例列出 `Cancelled`，但說明資料中的狀態是草稿、已排程、發布中、已發布、**部分失敗**、失敗，沒有 Cancelled。Case Study 依實際文件呈現，並把「部分失敗」與「只重試失敗平台」作為產品思考的重點。
- **Tech Stack 與 Frontend Architecture 不自行推測**：說明資料是操作流程展示，看不出實際技術與程式架構，實作時以 TODO 呈現，待使用者提供後填入。
- **不新增 Screenshot 區塊**：以現有 Hero 封面承載 placeholder，避免只為一個專案新增一種圖片區塊。

## Capabilities

### New Capabilities

（無）

### Modified Capabilities

- `project-case-study`: section 順序加入新的 optional section；支援流程圖、職責卡片與狀態清單；新增開發狀態與公司內部專案的呈現規則。
- `project-catalog`: Project Card 在有資料時顯示專案類型標籤與開發狀態；更新過時的專案清單需求為目前實際的四個專案。

## Impact

- **程式碼**：`src/types/project.ts`（新增 optional 欄位）、`src/data/projects.ts`（新增專案）、`src/views/ProjectDetailView.vue`（新 section）、`src/components/project/ProjectCard.vue`（標籤與狀態）、新增 `FlowDiagram`、`StatusBadge`、`CaseStudyCard` 元件、`src/i18n/messages.ts`（新 section 標題與狀態文字）、`public/images/projects/`（placeholder 封面）。
- **測試**：新元件與新 section 的單元測試、資料完整性測試（第 4 個專案兩語系完整）。
- **既有頁面**：三個既有 Case Study 沒有新欄位，版面與內容不變；首頁精選作品維持 3 個（新專案是否列為精選見 design 的 Open Questions）。
- **機密資訊**：說明資料（`社群管理平台-系統操作流程展示.html`）已加入 `.gitignore`，不會進入 repo；截圖不使用。
