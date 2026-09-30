# Spec Delta

## Purpose

確保每個頁面都有正確的標題與描述，讓搜尋引擎、瀏覽器分頁與社群分享預覽（Open Graph）都能呈現有意義的資訊，且不依賴大型 SEO 套件。

## ADDED Requirements

### Requirement: Per-page title and description
每個路由 SHALL 設定 document title，格式為 `<頁面名稱> | <站名>`（首頁可僅為站名＋職稱），並 SHALL 更新 `<meta name="description">`。Case Study 的 title SHALL 使用專案標題，description SHALL 使用專案的簡短描述。Not Found SHALL 使用 Not Found 的 title。

#### Scenario: Case study title
- **WHEN** 訪客在站內從 `<base>/en/projects` 導向 Large File Upload System 的 Case Study
- **THEN** 瀏覽器分頁標題變為 `Large File Upload System | <站名>`

#### Scenario: Not found title
- **WHEN** 訪客開啟不存在的網址
- **THEN** document title 包含 Not Found

### Requirement: Open Graph basics
HTML SHALL 包含 `og:title`、`og:description`、`og:type`、`og:url`、`og:image`、`og:locale` 與 `twitter:card`，並在站內換頁時與 title/description 一起更新。`og:url` 與 `og:image` SHALL 為包含 base path 的絕對網址。

#### Scenario: OG tags present
- **WHEN** 檢視任一頁面的 `<head>`
- **THEN** 存在上述 Open Graph 標籤且內容與該頁及其語系一致

### Requirement: Localized metadata and alternates
title、description 與 Open Graph 內容 SHALL 使用目前語系的文字。每個頁面 SHALL 提供 `<link rel="alternate" hreflang>` 指向兩個語系的對應網址（`zh-Hant-TW`、`en`，以及指向繁中版的 `x-default`），以及指向自身的 `<link rel="canonical">`。

#### Scenario: English case study meta
- **WHEN** 檢視 `<base>/en/projects/large-file-upload-system/` 的 `<head>`
- **THEN** title 為英文專案標題，且存在指向中文版與英文版的 hreflang alternate 連結

### Requirement: Metadata readable without JavaScript
對於兩個語系的所有已知靜態路由（`/`、`/projects`、`/about`、每個 `/projects/<slug>`，以及其 `/en` 版本），部署產物中 SHALL 存在已寫入該頁 title、description 與 Open Graph 標籤的 HTML，使不執行 JavaScript 的爬蟲（例如社群分享預覽）也能讀取正確資訊。

#### Scenario: Share preview of a case study
- **WHEN** 不執行 JS 的用戶端請求 `<base>/projects/multi-stream-video-system/`
- **THEN** 回應的 HTML `<title>` 與 `og:title` 為該專案標題

### Requirement: Language and semantics
`<html>` SHALL 宣告與頁面語系一致的 `lang` 屬性（靜態產物亦同）；頁面 SHALL 使用 `header`、`nav`、`main`、`section`、`article`、`footer` 等語意元素。網站 SHALL 提供 favicon。

#### Scenario: Document language
- **WHEN** 檢視任一頁面的 HTML
- **THEN** `<html>` 具有 `lang` 屬性
