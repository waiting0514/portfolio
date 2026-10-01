# Proposal

## Why

首頁 Hero 目前只靠文字說明「我是前端工程師」。面試官進站後 3～6 秒內應該能看懂一件事：這個人能把需求轉成可維護的前端系統。一段很安靜的 6 秒循環圖解（Requirement → Architecture → Product）可以在不搶走姓名、職稱與 CTA 的前提下，把這個「工程思考」視覺化，而不是再列一次技術 Logo。

## What Changes

- 新增 `HeroAnimation` 元件（`src/components/hero/`），以 6 秒無限循環呈現：Requirement 卡片 → Requirement Analysis 連接線 → Frontend Architecture 卡片與 Component / State / Router / API 節點 → 抽象 Web Application 視窗 → 完成狀態（Web Product · Maintainable Web Application · Ready）→ 淡出並無縫回到第一幕。
- 首頁 Hero 改為左右版面（≥1024px）：左側沿用現有姓名、職稱 h1、介紹與技術重點，文案不變；CTA 改為 View Projects（primary）與 About Me（secondary，取代 GitHub；GitHub 仍在導覽列與頁尾）；右側放 HeroAnimation。<1024px 改為上下排列（文字在上、動畫在下）。
- 移除 Hero 右側的「目前」面板（最新工作在 About 預覽、開發中專案在精選作品中都已呈現）；技術重點標籤移到左欄介紹下方。
- 動畫只用純 CSS `@keyframes`（transform／opacity），**不新增任何 dependency**。
- `prefers-reduced-motion: reduce` 時不播放，直接顯示完整的靜態最終狀態。

## HyperFrames

專案的 `package.json` 沒有 HyperFrames 或 GSAP；本機只有 HyperFrames 的 Claude Code Skill。HyperFrames 是「把 HTML composition 算圖成影片」的工具（GSAP 驅動、可 seek 的 timeline、輸出 MP4），不是網頁內的執行期動畫函式庫。若用在這裡只有兩種做法：

1. 輸出影片放在 Hero：違反「避免大型影片背景」，文字無法翻譯、無法跟 token 同步、對 LCP 不利。
2. 把 GSAP 當執行期依賴加入（約 70 KB min）：這個 6 秒線性時間軸用 CSS keyframes 就能精確表達，不值得增加 runtime。

因此本次**不使用 HyperFrames、不新增 dependency**。若未來序列需要互動式時間軸控制（例如依捲動進度 scrub），再另提 proposal 評估 GSAP。

## Capabilities

### New Capabilities

（無）

### Modified Capabilities

- `home-page`: Hero 改為左右版面、CTA 改為 View Projects／About Me、移除「目前」面板，並新增 Hero Animation 需求。

## Impact

- **新增**：`src/components/hero/HeroAnimation.vue`、`src/components/hero/sequences/RequirementToProduct.vue`、對應測試、keyframes。
- **修改**：`src/views/HomeView.vue`（版面）、`src/i18n/messages.ts`（新增 About Me 與動畫說明文字，移除「目前」面板用的文字）、`HomeView.spec.ts`。
- **Dependency**：無。
- **效能**：動畫 DOM 約 35 個節點，只動 transform／opacity；首屏先以靜態最終狀態渲染，瀏覽器空閒後才開始循環；離開視窗時暫停。
- **不變**：Hero 文案、h1、路由、SEO meta、其他頁面。網站目前只有淺色模式；元件全部使用 token，未來加入深色模式時會自動跟隨。
