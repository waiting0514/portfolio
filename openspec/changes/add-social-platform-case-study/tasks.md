# Tasks

> 每個群組完成時執行 `npm run lint`、`npm run type-check`、`npm run test`、`npm run build`，全部通過才進入下一組。

## 1. 資料模型與共用文字

- [x] 1.1 在 `src/types/project.ts` 新增 `ProjectStatus`、`Project.status`、`Project.labels`，以及 `CaseStudy` 的 `background`、`role.flow`、`problemExample`、`workflow`、`responsibilities`、`aiAssisted`、`currentStatus`（全部 optional）；驗證：type-check 通過，既有三個專案資料不需修改
- [x] 1.2 在 `src/i18n/messages.ts` 新增新 section 標題與狀態文字（中英）；驗證：type-check 通過，`messages.spec` 無空字串

## 2. 共用元件

- [x] 2.1 新增 `FlowDiagram`（`<ol>`、箭頭 `aria-hidden`、<768px 直向、≥768px 橫向可換行）與單元測試；驗證：測試涵蓋有序列表、步驟順序與箭頭隱藏
- [x] 2.2 新增 `StatusBadge`（文字 + 圓點，依語系）與單元測試；驗證：中英文字正確
- [x] 2.3 從 `ProjectDetailView` 抽出 `CaseStudyCard`，Technical Challenges 改用它；驗證：既有 ProjectDetailView 測試不修改即通過，畫面與原本一致

## 3. Project Card 與 Case Study 頁面

- [x] 3.1 `ProjectCard` 在有 labels / status 時於標題上方顯示標籤列與徽章；更新 `ProjectCard.spec`（技術標籤斷言改為只比對技術標籤列表，新增有／無標籤的案例與單一連結檢查）；驗證：測試通過
- [x] 3.2 `ProjectDetailView` Hero 顯示標籤與徽章，並依 spec 順序新增 Background、Problem 範例、Workflow、Key Responsibilities、AI-assisted Development、Current Status 的渲染（各自以 `hasContent()` 判斷）；My Role 支援 flow；驗證：畫面檢查三個既有 Case Study 版面不變
- [x] 3.3 更新 `src/test-utils/fixtures.ts` 新增含所有新欄位的 fixture，並在 `ProjectDetailView.spec` 驗證 section 順序、Problem 範例流程與狀態、職責卡片、Current Status 清單、Hero 徽章，以及既有 fixture 不出現新 section；驗證：測試通過

## 4. 社群管理平台內容

- [x] 4.1 新增 `public/images/projects/social-media-platform.svg` 中性 placeholder 封面；驗證：不含任何實際系統畫面
- [x] 4.2 在 `src/data/projects.ts` 陣列最前面新增社群管理平台（`featured: false`、`status: 'in-development'`、`labels: ['Real-world Project', 'Frontend Development']`），依 design D8 撰寫中英內容；Tech Stack 與 Architecture 依 design 的 Resolved Questions 填寫；不含內部追蹤編號、示範資料名稱與截圖；驗證：`projects.spec` 通過，並全文搜尋確認沒有 P2-05、DEC-001、GAP-001、示範情境名稱
- [x] 4.3 瀏覽器檢查：`/projects` 與 `/projects/social-media-platform`（中英）在 375 / 768 / 1024 / 1440px 無水平捲軸；流程圖在 375px 為直向、1440px 為橫向；Hero 與卡片徽章正確；前後頁導覽正確；三個既有 Case Study 版面不變；axe-core 掃描新頁面 0 violations

## 5. 收尾

- [x] 5.1 `npm run lint`、`type-check`、`test`、`build` 全部通過；build 產物包含 `projects/social-media-platform/index.html` 與英文版，且 `og:image` 為 `og-default.png`
- [x] 5.2 `openspec validate add-social-platform-case-study --strict` 通過
