# Spec Delta

## MODIFIED Requirements

### Requirement: Open Graph basics
HTML SHALL 包含 `og:title`、`og:description`、`og:type`、`og:url`、`og:image`、`og:locale`、`twitter:card`（`summary_large_image`）、`twitter:title`、`twitter:description` 與 `twitter:image`，並在站內換頁時與 title/description 一起更新。Twitter 標籤 SHALL 與對應的 Open Graph 內容相同，且兩者 SHALL 由同一份頁面資料產生。`og:type` SHALL 在 Case Study 為 `article`，其他頁面為 `website`。`og:url` 與 `og:image` SHALL 為包含 base path 的絕對網址。

Case Study 的 `og:image` SHALL 依序使用專案資料中的 `ogImage`、非 SVG 的封面，最後 fallback 到預設 OG 圖片；缺少個別圖片 SHALL NOT 造成 build 失敗。

#### Scenario: OG tags present
- **WHEN** 檢視任一頁面的 `<head>`
- **THEN** 存在上述 Open Graph 與 Twitter 標籤，每個標籤只出現一次，且內容與該頁及其語系一致

#### Scenario: Case study type
- **WHEN** 檢視任一 Case Study 的 `<head>`
- **THEN** `og:type` 為 `article`，`twitter:title` 與 `og:title` 相同

### Requirement: Metadata readable without JavaScript
對於兩個語系的所有已知靜態路由（`/`、`/projects`、`/about`、每個 `/projects/<slug>`，以及其 `/en` 版本），部署產物中 SHALL 存在已寫入該頁 title、description 與 Open Graph 標籤的 HTML，且該 HTML 的 `<body>` SHALL 已包含頁面的主要內容（Navbar、標題、首頁 Hero 與精選作品、About 內容、作品標題與摘要、Case Study 內文），使不執行 JavaScript 的爬蟲與預覽服務也能讀取。JavaScript 載入後 SHALL 以 hydration 接手同一份 DOM，保留原本的 SPA 導覽與互動，且 SHALL NOT 產生 hydration mismatch。

`404.html` SHALL 維持為 SPA fallback，不預先渲染內容。

#### Scenario: Share preview of a case study
- **WHEN** 不執行 JS 的用戶端請求 `<base>/projects/multi-stream-video-system/`
- **THEN** 回應的 HTML `<title>` 與 `og:title` 為該專案標題

#### Scenario: Content in the HTML source
- **WHEN** 讀取 build 產物 `dist/projects/<slug>/index.html` 的原始碼
- **THEN** `<div id="app">` 內含該專案的 `<h1>` 標題、摘要與 Case Study section 內容

#### Scenario: Hydration keeps the SPA
- **WHEN** 訪客直接開啟 `<base>/` 後點擊導覽列的作品連結
- **THEN** 頁面以 client-side navigation 切換（不重新載入整頁），console 沒有 hydration 警告

## ADDED Requirements

### Requirement: Sitemap and robots
Build SHALL 產生 `sitemap.xml`，列出兩個語系所有可索引的靜態路由（與 canonical 相同的絕對網址，含 base path），並為每筆提供 `hreflang` alternate 連結；Not Found 與其他不可索引頁面 SHALL NOT 列入。Build SHALL 產生 `robots.txt`，允許所有爬蟲且 SHALL NOT 包含 `Disallow: /`，並以絕對網址指向 sitemap。新增專案時，sitemap SHALL 自動包含其 Case Study，不需修改其他設定。

#### Scenario: Sitemap lists public routes
- **WHEN** 讀取 build 產物 `dist/sitemap.xml`
- **THEN** 包含 `<base>/`、`<base>/about/`、`<base>/projects/`、每個 `<base>/projects/<slug>/` 與其 `/en/` 版本，不含 404

#### Scenario: Robots points to the sitemap
- **WHEN** 讀取 build 產物 `dist/robots.txt`
- **THEN** 內容包含 `Sitemap: https://<user>.github.io/<repo>/sitemap.xml`，且沒有 `Disallow: /`
