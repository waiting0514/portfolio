# Spec Delta

## Purpose

讓作品集同時服務中文與英文的面試官：預設以繁體中文呈現，並提供完整的英文版本，兩種語言都有可分享、可被索引的獨立網址。

## ADDED Requirements

### Requirement: Supported locales and URL structure
網站 SHALL 支援兩個語系：繁體中文（`zh-TW`，預設）與英文（`en`）。繁體中文頁面 SHALL 使用無前綴路徑（例如 `<base>/projects`），英文頁面 SHALL 使用 `/en` 前綴（例如 `<base>/en/projects`）。目前語系 SHALL 完全由網址決定，同一網址在任何情況下都顯示相同語系。

#### Scenario: Default locale
- **WHEN** 訪客開啟 `<base>/`
- **THEN** 頁面以繁體中文顯示

#### Scenario: English locale
- **WHEN** 訪客開啟 `<base>/en/projects`
- **THEN** Projects 頁面以英文顯示

#### Scenario: English not found
- **WHEN** 訪客開啟 `<base>/en/does-not-exist`
- **THEN** 以英文顯示 Not Found 頁面

### Requirement: Language switcher
Navbar SHALL 提供語言切換連結（`<a>`），指向目前頁面在另一語系的對應網址（例如 `/projects/<slug>` ↔ `/en/projects/<slug>`）。切換連結 SHALL 以目標語言本身的名稱標示（「English」／「中文」），並帶有對應的 `lang` 與 `hreflang` 屬性。在 mobile 選單中 SHALL 同樣可用。

#### Scenario: Switch on case study
- **WHEN** 訪客在 `<base>/projects/large-file-upload-system` 點擊「English」
- **THEN** 導向 `<base>/en/projects/large-file-upload-system` 並以英文顯示同一專案

#### Scenario: Switch back to Chinese
- **WHEN** 訪客在 `<base>/en/about` 點擊「中文」
- **THEN** 導向 `<base>/about` 並以繁體中文顯示

### Requirement: Localized internal links
站內所有連結（Navbar、CTA、Project Card、Pager、Not Found 連結）SHALL 保持在目前語系內。

#### Scenario: Stay in English
- **WHEN** 訪客在 `<base>/en/` 點擊 View Projects
- **THEN** 導向 `<base>/en/projects`

### Requirement: Complete translations
所有 UI 文字、個人資料、技能分類名稱與作品內容 SHALL 同時提供兩種語言；任一語言缺少必要文字時 `npm run type-check` SHALL 失敗。技術名稱（例如 Vue、RxJS）與專案 slug SHALL 不翻譯，兩語系共用。

#### Scenario: Missing English text
- **WHEN** 開發者新增一個 UI 字串或專案欄位但只填寫繁體中文
- **THEN** `npm run type-check` 失敗並指出缺少的英文欄位

### Requirement: Document language
`<html lang>` SHALL 反映目前語系：繁體中文為 `zh-Hant-TW`，英文為 `en`，並在站內切換語言時即時更新。

#### Scenario: Lang attribute follows locale
- **WHEN** 訪客從 `<base>/about` 切換到英文
- **THEN** `<html>` 的 `lang` 由 `zh-Hant-TW` 變為 `en`
