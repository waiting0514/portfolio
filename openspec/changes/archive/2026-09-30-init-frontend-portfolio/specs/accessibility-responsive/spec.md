# Spec Delta

## Purpose

確保作品集在手機、平板與桌面都有良好閱讀體驗，並符合基本無障礙需求（對齊 WCAG 2.2 AA 的常見項目），這本身也是面試展示的品質指標。

## ADDED Requirements

### Requirement: Keyboard navigation and focus
所有互動元素 SHALL 可僅用鍵盤操作，Tab 順序 SHALL 符合視覺順序；所有可聚焦元素在 `:focus-visible` 時 SHALL 有清楚可見的 focus 樣式。頁面 SHALL 提供第一個可聚焦的「Skip to content」連結跳至 `<main>`。站內換頁後焦點 SHALL 移至新頁面的主要內容（或其 `<h1>`），讓螢幕閱讀器使用者得知頁面已切換。

#### Scenario: Skip link
- **WHEN** 鍵盤使用者載入任一頁面後按第一次 Tab
- **THEN** 出現「Skip to content」連結，按 Enter 後焦點移至主要內容

#### Scenario: Focus after route change
- **WHEN** 使用者透過 Navbar 從 Home 切換到 Projects
- **THEN** 焦點移至 Projects 頁的主要內容區

### Requirement: Correct interactive semantics
導向其他頁面或網址的元素 SHALL 為 `<a>`（含 router link）；觸發頁內動作的元素 SHALL 為 `<button>`。不得以 `div`/`span` 搭配 click 事件模擬按鈕或連結。

#### Scenario: CTA semantics
- **WHEN** 檢視 View Projects、View Case Study、GitHub 等 CTA
- **THEN** 它們皆為 `<a>` 元素，僅外觀為按鈕樣式

### Requirement: Heading hierarchy
每個頁面 SHALL 恰有一個 `<h1>`，標題層級 SHALL 不跳級（h1 → h2 → h3）。

#### Scenario: No skipped levels
- **WHEN** 檢視任一頁面的 heading 結構
- **THEN** 只有一個 h1，且不存在 h2 之前出現 h3 的情況

### Requirement: Images have text alternatives
內容圖片 SHALL 有描述性 `alt`；純裝飾性圖片 SHALL 使用 `alt=""`。

#### Scenario: Project cover alt
- **WHEN** 檢視 Project Card 封面圖
- **THEN** `alt` 描述該專案畫面內容，而非檔名或空字串

### Requirement: Color contrast
一般文字與背景的對比 SHALL 至少 4.5:1，大字與 UI 元件邊界／focus 指示 SHALL 至少 3:1。

#### Scenario: Muted text contrast
- **WHEN** 量測次要文字（例如描述、標籤）與其背景的對比
- **THEN** 對比值 ≥ 4.5:1

### Requirement: Reduced motion
當使用者設定 `prefers-reduced-motion: reduce` 時，網站 SHALL 停用非必要的 transition、動畫與平滑捲動。

#### Scenario: Reduced motion enabled
- **WHEN** 作業系統開啟減少動態效果並瀏覽網站
- **THEN** hover/選單等不出現動畫過渡，捲動為即時跳轉

### Requirement: Responsive layout
網站 SHALL 在 375px、768px、1024px、1440px 寬度下正常呈現：無水平捲軸、文字不被截斷、觸控目標至少 24×24 CSS px（主要導覽與 CTA 為 44×44）。內容寬度 SHALL 受 Container 最大寬度限制，在大螢幕上置中。

#### Scenario: No horizontal overflow
- **WHEN** 在 375px 寬度瀏覽所有頁面
- **THEN** `document.documentElement.scrollWidth` 不大於 viewport 寬度

#### Scenario: Wide screen container
- **WHEN** 在 1440px 寬度瀏覽
- **THEN** 內容被限制在 Container 最大寬度內並水平置中
