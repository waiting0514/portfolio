# Tasks

> 使用者確認 proposal／design 後才開始實作。每組完成時執行 `npm run lint`、`type-check`、`test`、`build`。

## 1. 元件

- [x] 1.1 `src/components/hero/sequences/RequirementToProduct.vue`：靜態最終狀態的標記（≤40 個元素，只用 token），<640px 隱藏 Router 節點；驗證：靜態畫面在 375／1024／1440 正常
- [x] 1.2 keyframes 時間軸（design D2 對照表），包在 `prefers-reduced-motion: no-preference` 內，只在 `.is-playing` 時套用，起始 delay -5.4s；驗證：循環接縫無跳格
- [x] 1.3 `src/components/hero/HeroAnimation.vue`：`figure role="img"` + 本地化 aria-label、idle 啟動、reduced motion 監聽、IntersectionObserver 暫停；驗證：元件測試（reduced motion 不播放、idle 後播放、內部 aria-hidden、無可聚焦元素）
- [x] 1.4 `messages.ts` 新增 `home.heroAnimationLabel`（中／英）

## 2. 首頁版面

- [x] 2.1 `HomeView` Hero 改為左 7／右 5 欄；調整 lg 的 h1 尺寸；移除「目前」面板，技術重點移到左欄，CTA 改為 View Projects／About Me，新增 `home.aboutMe`、刪除 `home.now`／`home.inProgress`；更新 `HomeView.spec.ts`；驗證：HomeView 測試通過
- [x] 2.2 桌面節點 hover 強調（只改顏色）

## 3. 驗證

- [x] 3.1 瀏覽器檢查 375／768／1024／1440：無水平溢位、CLS 0、Hero 文字先渲染、reduced motion 顯示靜態最終狀態、axe 0 violations
- [x] 3.2 lint、type-check、test、build、`openspec validate --strict`
