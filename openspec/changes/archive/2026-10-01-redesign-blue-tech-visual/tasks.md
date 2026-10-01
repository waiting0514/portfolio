# Tasks

> 每組完成時執行 `npm run lint`、`type-check`、`test`、`build`。v0（群組 1–3）完成後先給使用者看，確認後再做群組 4–5。

## 1. Token 與字型

- [x] 1.1 更新 `main.css` 的 `@theme` token、`section-spacing`，新增 `eyebrow`、`hero-grid`、`card-lift` utility，並記錄對比值；驗證：build 通過，對比值 ≥ 4.5:1
- [x] 1.2 `index.html` 加入 Google Fonts preconnect 與字型連結；`--font-sans`／`--font-mono` 改用網頁字型；驗證：build 產物（含靜態路由 HTML）帶有字型連結

## 2. 共用元件與版面（v0）

- [x] 2.1 Header（底線 active、mono 語言切換）與 Footer 套用新樣式；BaseButton、SectionHeading（加 eyebrow）、TechTag、ProjectCard（編號、hover）、ProjectGrid 傳入 index；驗證：既有元件測試通過
- [x] 2.2 `ProjectContent.facts` 型別與資料（檔案管理、監控系統；B2B 與社群平台不列期間），`role.title` 簡化；驗證：type-check 與資料測試通過

## 3. 首頁與 Case Study（v0）

- [x] 3.1 首頁：Hero（網格底紋、900 字重 h1、「目前」面板）、精選作品、深藍技能帶、About 預覽時間軸；新增測試（目前面板、工作經歷）；驗證：HomeView 測試通過
- [x] 3.2 Case Study：事實列、`CaseStudyToc` + `useActiveSection`、section 編號、挑戰卡片與架構步驟樣式；新增測試（事實列缺項、目錄只列出渲染的 section）；驗證：ProjectDetailView 測試通過
- [x] 3.3 v0 截圖給使用者確認（首頁與 Case Study，桌面與手機）

## 4. 其他頁面

- [x] 4.1 Projects、About、404 套用新樣式；驗證：頁面測試通過
- [x] 4.2 瀏覽器檢查 375／768／1024／1440 無水平捲軸、目錄只在 ≥1024 顯示、axe-core 0 violations、reduced-motion 停用位移

## 5. 收尾

- [x] 5.1 lint、type-check、test、build 全部通過
- [x] 5.2 `openspec validate redesign-blue-tech-visual --strict` 通過
