# Design

## Context

現況分析（開始前確認）：

| 項目 | 現況 |
|---|---|
| Hero | 寫在 `HomeView.vue` 內；`hero-grid` 底紋；12 欄格線，左 8 欄文字（h1 最大 5.5rem），右 4 欄「目前」面板；CTA 為 View Projects（primary）與 GitHub（secondary） |
| Design token | `src/assets/main.css` 的 `@theme`，預設色盤已清空：`canvas`、`surface`、`ink`／`ink-soft`／`ink-muted`、`line`／`line-strong`、`accent`／`accent-strong`／`accent-soft`；`--ease-out-soft`；字型 Noto Sans TC + IBM Plex Mono |
| 元件樣式 | 卡片 `rounded-xl border border-line bg-surface`；標籤 `TechTag`（mono、`rounded-md border-line`）；徽章 `StatusBadge`（`rounded-full bg-accent-soft text-accent`）；`eyebrow` utility（mono uppercase） |
| 陰影 | 只有 `card-lift` hover 時的輕陰影 |
| 動畫 | 只有 150–180ms 的 hover transition；沒有任何 `@keyframes`，也沒有動畫函式庫 |
| Reduced motion | 全域規則把 `animation-duration` 壓成 0.01ms、`iteration-count: 1` |
| 深淺色 | 只有淺色，沒有深色模式 |
| Breakpoint | Tailwind 預設 `sm 640`、`md 768`、`lg 1024`；驗收寬度 375／768／1024／1440 |
| HyperFrames | 未安裝（只有 Skill），見 proposal |

## Goals / Non-Goals

**Goals:**
- 6 秒、無縫循環，只用既有 token。
- 動畫是輔助視覺（Supporting Visual），視覺重量低於 h1 與 CTA。
- 不影響 FCP／LCP／INP，CLS 為 0。
- reduced motion 時顯示可理解的靜態最終狀態。

**Non-Goals:**
- Sequence 02（Large File Upload）與 Sequence 03（Real-time Video）的實作。
- 播放控制與序列切換 UI。
- 深色模式。

## Decisions

### D1. 元件結構

```
src/components/hero/
  HeroAnimation.vue              # 外框（卡片、尺寸、無障礙名稱）+ 播放控制（idle 啟動、reduced motion、離開視窗暫停）
  sequences/
    RequirementToProduct.vue     # 第一支序列：只有標記與動畫樣式，不含播放邏輯
```

`HeroAnimation` 以 default slot 接收序列，`HomeView` 寫成 `<HeroAnimation><RequirementToProduct /></HeroAnimation>`。

- 播放邏輯只在外框寫一次。
- 新增序列只需要新增一個 `sequences/*.vue`（標記 + keyframes），外框不用改。
- **不**建立序列註冊表、設定檔或通用「step」資料模型。目前只有一支序列，等第二支出現再做抽象。

### D2. 時間軸：純 CSS keyframes

- 每個動畫元素各有一組 `@keyframes`，全部使用 `6s linear infinite`，起點相同，所以天然同步、不會漂移。各段的緩動寫在 keyframe 區段的 `animation-timing-function` 裡。
- 百分比對照（6s = 100%）：0.8s = 13.3%、1.8s = 30%、3.2s = 53.3%、4.6s = 76.7%、5.4s = 90%。
- 只動 `transform` 與 `opacity`。連接線用 `scaleY(0 → 1)`（`transform-origin: top`）表示「延伸」。
- 不使用 filter、blur 或 box-shadow 動畫，不觸發 layout。

| 時間 | 元素 | 動作 |
|---|---|---|
| 0.0–0.8s | Requirement 卡片 | opacity 0→1、translateY 8px→0；卡片內三條抽象文字列（Feature Requirement / User Scenario / Business Rule）各延遲約 100ms；一道 `accent-soft` 的淡掃描條橫越卡片一次 |
| 0.8–1.8s | Requirement 卡片 | translateY 0→-4px（稍微上移） |
| | 「Requirement Analysis」標籤 + 連接線 1 | 標籤淡入；線 scaleY 0→1，約 0.8s，ease-out |
| 1.8–3.2s | Frontend Architecture 卡片 | opacity 0→1、translateY 8px→0；它是視覺中心，用 `border-accent/40`、標題 `text-accent` |
| | 4 個節點 | 依序淡入，間隔 120ms：Component → State → Router → API |
| 3.2–4.6s | 節點 | 「收斂」：scale 1→0.96、往卡片中心位移 2px |
| | 連接線 2 | scaleY 0→1 |
| | Web Application 視窗 | 淡入上移；內部的 Dashboard 標題列與兩張小卡依序出現 |
| 4.6–5.4s | 完成狀態 | 「WEB PRODUCT · Maintainable Web Application」與 `✓ Ready` 小徽章（與 `StatusBadge` 同樣式）淡入，維持完整畫面 |
| 5.4–6.0s | 全部 | opacity 1→0、translateY 往 -4px；線同時淡出。100% 與 0% 都是「全部透明」，所以循環接縫不閃爍 |

### D3. 版面不位移（CLS = 0）

序列使用一般文件流：Requirement 卡片 → 線 → Architecture 卡片 → 線 → 視窗。所有元素**永遠在版面中**，動畫只改透明度與位移。

因此動畫容器的高度由內容決定且固定：播放時不會改變大小，延後啟動也不會推擠下方內容。

### D4. 首屏與延後啟動

- **首屏不播放。** 靜態 HTML 沒有 `is-playing` class，元素以完整的最終狀態渲染，也就是 reduced-motion 的畫面。Hero 文字照常優先渲染，動畫不阻塞任何東西；沒有 JS 時畫面仍可理解。
- **空閒後才開始。** `onMounted` 後以 `requestIdleCallback` 加上 `is-playing`；不支援時改用 `setTimeout` 1200ms。
- **從淡出那一段開始。** 啟動時設定 `animation-delay: -5.4s`，循環從「完整畫面淡出」的 0.6 秒開始，自然接到第一幕 Requirement，不會出現「完整 → 瞬間消失 → 重來」的跳動。
- **離開畫面就暫停。** 用 `IntersectionObserver` 偵測，不在畫面上時設 `animation-play-state: paused`，回到畫面再繼續。

### D5. Reduced motion

- 監聽 `matchMedia('(prefers-reduced-motion: reduce)')`。結果為 true 時不加 `is-playing`；使用者中途開啟設定時也會立即移除。
- 所有套用 keyframes 的規則同時包在 `@media (prefers-reduced-motion: no-preference)` 裡，作為雙重保險。
- 這層包裝是必要的。全域 reduced-motion 規則會把動畫壓成 0.01ms 並停在最後一格，而本動畫的最後一格是「全部透明」，讓它套用就會整個看不見。
- 靜態畫面同時顯示 Requirement → Architecture（4 個節點）→ Web Application + Ready，內容可理解。

### D6. 無障礙

- 外框是 `<figure role="img" :aria-label="messages.home.heroAnimationLabel">`，內部全部 `aria-hidden="true"`。
- 說明文字有中英兩版：「流程圖：需求 → 前端架構（元件、狀態、路由、API）→ 可維護的 Web 應用程式」。
- 動畫中的技術文字依需求一律英文，不隨語系切換。
- 動畫不含可聚焦元素，不影響 Tab 順序與 CTA。

### D7. Hover（桌面）

- 在 `@media (hover: hover)` 下，節點 hover 時改為 `border-color: accent`、`color: accent`，只改顏色，transition 150ms。
- 整個 figure 是 `role="img"`，所以 hover 純屬裝飾。
- 動畫只動 transform／opacity，hover 只動顏色，兩者屬性不重疊，不會打斷時間軸。

### D8. 響應式

| 寬度 | 版面 |
|---|---|
| ≥1024px | 左 7 欄文字、右 5 欄動畫（最大寬 520px）；h1 在 lg 改為 `text-[4.5rem]` 以配合 7 欄（文案不變） |
| 640–1023px | 上下排列；動畫最大寬 520px |
| <640px | 上下排列；動畫寬度 100%；Architecture 節點只顯示 Component / State / API（Router 用 `hidden sm:flex` 隱藏） |

核心流程 Requirement → Architecture → Product 在所有寬度都保留。

### D9. 視覺語言

只用既有 token 與元件樣式，不寫死任何 hex：

| 元素 | 樣式 |
|---|---|
| 卡片 | `rounded-xl border-line bg-surface` |
| Architecture 卡片 | `border-accent/40` |
| 標籤 | `eyebrow` utility |
| 節點與 Badge | 沿用 `TechTag`／`StatusBadge` 的外觀 |
| 連接線、視窗頂列的三個點 | `bg-line-strong` |

不使用 glow、neon、粒子、3D 或 glassmorphism。

## DOM 預算

約 35 個元素，低於 40 的上限：

| 區塊 | 元素數 |
|---|---|
| Requirement 卡片 | 6 |
| 線 + 標籤 | 3 |
| Architecture 卡片 + 4 個節點 | 6 |
| 線 | 1 |
| 視窗 | 12 |
| 完成狀態 | 4 |
| 外框 | 2 |

## 未來擴充（Sequence 02／03）

- **加入新序列**：例如新增 `sequences/LargeFileUpload.vue`（Large File → Chunks → Upload Queue → Server Merge）與它的 keyframes，在 `HomeView` 換掉 slot 內容即可。播放、reduced motion 與暫停邏輯完全重用外框。
- **輪播多支序列**：等真的有兩支以上要輪播時，才在 `HeroAnimation` 加上「每個循環切換下一支」的邏輯，例如監聽 `animationiteration`。

## Risks / Trade-offs

- **h1 縮小。** 桌面 h1 從 5.5rem 降到 4.5rem，以騰出右欄。它仍是頁面最大的文字，而且動畫刻意用低對比。
- **keyframes 數量多。** 約 15 組，集中在序列元件的 `<style>` 裡；可讀性靠 D2 的時間對照表。
- **jsdom 缺少瀏覽器 API。** 它沒有 `matchMedia`、`IntersectionObserver` 和 `requestIdleCallback`，測試會用 stub 驗證「reduced motion 不播放」與「idle 後才播放」。

## Resolved Questions

1. **「目前」面板**：直接移除；`home.now`、`home.inProgress` 文字一併刪除。技術重點（`profile.focusTechnologies`）以 `TechTagList` 移到左欄介紹下方，維持 spec 的「技術重點」。
2. **CTA**：改為 View Projects（primary）與 About Me（secondary，連到 About 頁）。GitHub 仍在導覽列、頁尾與 About 頁。
