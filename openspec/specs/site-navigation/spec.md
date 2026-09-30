# site-navigation Specification

## Purpose

定義作品集網站的全站外框：共用 layout、主要導覽、頁尾與路由對應，讓訪客在任何頁面都能一致地切換到主要內容，並在網址無效時得到明確的 Not Found 回應。

## Requirements

### Requirement: Route table
網站 SHALL 提供以下路由：`/`（Home）、`/projects`（Projects）、`/projects/:slug`（Project Case Study）、`/about`（About），以及一個 catch-all 路由顯示 Not Found 頁面。每個路由 SHALL 同時存在英文版本（加上 `/en` 前綴，見 `i18n` spec）。所有路由 SHALL 相對於部署的 base path 運作。

#### Scenario: Known route renders its page
- **WHEN** 訪客開啟 `<base>/about`
- **THEN** 顯示 About 頁面內容

#### Scenario: Unknown route renders Not Found
- **WHEN** 訪客開啟 `<base>/does-not-exist`
- **THEN** 顯示 Not Found 頁面，且頁面提供回到首頁與 Projects 的連結

### Requirement: Shared site layout
每個頁面 SHALL 使用同一個 layout：頁首 Navbar、`<main>` 主要內容區、頁尾 Footer。頁尾 SHALL 至少包含 GitHub 連結與版權資訊。

#### Scenario: Layout is consistent across pages
- **WHEN** 訪客在 Home、Projects、Case Study、About、Not Found 之間切換
- **THEN** 每頁都有相同的 Navbar 與 Footer，且主要內容位於唯一的 `<main>` 元素中

### Requirement: Primary navigation links
Navbar SHALL 包含 Home、Projects、About 三個站內連結（文字依目前語系顯示）、一個 GitHub 外部連結與語言切換連結。目前所在頁面的連結 SHALL 以視覺樣式與 `aria-current="page"` 標示；瀏覽任一 `/projects/:slug` 時 Projects 連結 SHALL 視為目前頁面。GitHub 連結 SHALL 在新分頁開啟，並帶有 `rel="noopener noreferrer"` 以及告知會開新分頁的無障礙文字。

#### Scenario: Active link on case study page
- **WHEN** 訪客位於 `/projects/large-file-upload-system`
- **THEN** Navbar 中的 Projects 連結帶有 `aria-current="page"` 並呈現 active 樣式

#### Scenario: External GitHub link
- **WHEN** 訪客點擊 Navbar 的 GitHub 連結
- **THEN** 在新分頁開啟 GitHub 個人頁面

### Requirement: Mobile navigation
在寬度小於 768px 的 viewport，Navbar SHALL 將導覽連結收合至一個以 `<button>` 實作的選單切換鈕之後。切換鈕 SHALL 具備可讀名稱、`aria-expanded` 與 `aria-controls`。選單開啟後，按下 Escape、點擊任一連結或路由變更時 SHALL 關閉選單；以 Escape 關閉時焦點 SHALL 回到切換鈕。在 768px 以上 SHALL 直接顯示所有連結，不顯示切換鈕。

#### Scenario: Open and close with keyboard
- **WHEN** 在 375px 寬度下，使用者以 Tab 移到選單按鈕並按 Enter，再按 Escape
- **THEN** 選單先展開且 `aria-expanded="true"`，再收合且 `aria-expanded="false"`，焦點回到選單按鈕

#### Scenario: Menu closes after navigation
- **WHEN** 選單開啟時使用者點擊 About 連結
- **THEN** 導向 About 頁面且選單收合

#### Scenario: Desktop shows inline links
- **WHEN** viewport 寬度為 1024px
- **THEN** Home、Projects、About、GitHub 與語言切換連結直接顯示，選單按鈕不顯示

### Requirement: Scroll position on navigation
路由切換到新頁面時 SHALL 捲動至頁面頂端；使用瀏覽器上一頁／下一頁時 SHALL 還原先前的捲動位置。

#### Scenario: New page starts at top
- **WHEN** 訪客在首頁底部點擊某個 Featured Project 的 View Case Study
- **THEN** Case Study 頁面從頂端開始顯示

#### Scenario: Back restores position
- **WHEN** 訪客從 Case Study 按瀏覽器上一頁回到首頁
- **THEN** 首頁回到離開前的捲動位置
