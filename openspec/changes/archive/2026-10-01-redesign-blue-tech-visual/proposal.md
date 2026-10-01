# Proposal

## Why

現行版面功能完整，但視覺層次偏弱：系統字體、h1 與內文比例約 3.5 倍、各區塊節奏一致、卡片資訊層次不明顯，長篇 Case Study 缺少導覽。使用者已在 Claude Design 畫布確認「藍白科技風」方向（Portfolio 版面美化提案 v5），需要把它實作到 Vue 專案，讓作品集本身更能展示前端的設計實作能力。

## What Changes

- 視覺語言改為藍白科技風：冷白底、深海軍藍文字、單一科技藍重點色、1px 細線分層、hover 才出現的輕陰影。
- 網頁字型：Noto Sans TC（400/500/700/900）與 IBM Plex Mono（400/500），以 Google Fonts 載入（依字元切片、`display=swap`）。
- 設計 token 全部集中在 `src/assets/main.css`；內容寬度由 1152px 調整為 1200px；新增 hero 網格底紋、深藍色帶、mono 標籤等共用樣式。
- 首頁：Hero 新增「目前」面板（目前任職、技術重點、開發中專案）；卡片加上專案編號；技能改為深藍色帶上的兩欄清單；About 預覽新增工作經歷時間軸。
- Case Study：新增事實列（角色、公司、期間、技術）、桌面版（≥1024px）sticky 的「本頁內容」目錄並標示目前閱讀的 section、section 編號；挑戰卡片與架構步驟改為新樣式。
- 專案資料新增 optional 的 `facts`（公司、期間，依語系）；`role.title` 移除已改由 facts 呈現的公司與期間文字。
- Projects、About、404、Header、Footer 套用同一套 token 與字型，結構不變。

## Capabilities

### New Capabilities

（無）

### Modified Capabilities

- `home-page`: Hero 新增「目前」面板；About 預覽新增工作經歷時間軸。
- `project-case-study`: 新增事實列與本頁目錄的需求。

## Impact

- **程式碼**：`src/assets/main.css`、`index.html`（字型）、`src/types/project.ts`、`src/data/projects.ts`、`src/i18n/messages.ts`、Header／Footer、`HomeView`、`ProjectDetailView`、`ProjectsView`、`AboutView`、`NotFoundContent`、`ProjectCard`、`BaseButton`、`SectionHeading`、`TechTag`、`CaseStudySection`、`CaseStudyCard` 等元件的 class；新增目錄元件與 scroll-spy composable。
- **效能**：新增 Google Fonts 請求（preconnect + 切片載入）；CJK 字型只下載頁面實際用到的字元。
- **不變的契約**：路由與 slug、導覽文字、`/en` 網址、section `id`、`aria-labelledby`／`aria-label`、靜態路由 HTML、SEO meta、單一連結的卡片、heading 階層、Skip link 與焦點管理、語言切換文字（English／中文）。
