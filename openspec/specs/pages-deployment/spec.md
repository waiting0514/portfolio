# pages-deployment Specification

## Purpose

讓網站能透過 GitHub Actions 自動、可靠地部署到 GitHub Pages，無論是 user site（根路徑）或 project site（`/<repo>/` 子路徑），並在部署前以 lint、type-check、build 作為品質關卡。

## Requirements

### Requirement: npm scripts
專案 SHALL 提供 npm scripts：`dev`（本地開發伺服器）、`build`（產生生產版本）、`preview`（預覽生產版本）、`lint`（ESLint 檢查）、`type-check`（TypeScript 與 Vue SFC 型別檢查）、`format`（Prettier 格式化）、`test`（單次執行全部單元測試）、`test:watch`（watch 模式）。`lint`、`type-check`、`test`、`build` SHALL 在乾淨的 clone 經 `npm ci` 後以零錯誤完成。

#### Scenario: Quality commands pass
- **WHEN** 在乾淨 clone 執行 `npm ci && npm run lint && npm run type-check && npm run test && npm run build`
- **THEN** 所有指令以 exit code 0 結束

### Requirement: Unit test coverage of core logic
專案 SHALL 具備單元測試，至少涵蓋：作品資料完整性（slug 唯一且格式正確、兩語系內容齊全、featured 數量）、查詢 helper、SEO／meta 組字、語系路徑轉換、路由解析（含 `/en` 前綴、catch-all、無效 slug），以及有互動邏輯的元件（mobile 選單、按鈕連結渲染、Case Study optional section 省略）。測試 SHALL 不依賴網路或真實瀏覽器。

#### Scenario: Broken invariant fails tests
- **WHEN** 開發者將兩個專案設為相同 slug，或移除某個 Case Study section 後頁面仍渲染該標題
- **THEN** `npm run test` 失敗

### Requirement: Configurable base path
Build SHALL 支援透過環境變數設定 base path；未設定時為 `/`。所有資源（JS、CSS、圖片、favicon）與路由 SHALL 在該 base path 下正確解析，不得寫死 repository 名稱。

#### Scenario: Project site
- **WHEN** 以 base path `/portfolio/` build 並部署到 `https://<user>.github.io/portfolio/`
- **THEN** 所有頁面與資源正常載入，無 404 資源請求

#### Scenario: User site
- **WHEN** 未設定 base path 而 build 並部署到 `https://<user>.github.io/`
- **THEN** 所有頁面與資源正常載入

### Requirement: Deep link reload
直接開啟或重新整理任一合法路由的網址（例如 `<base>/projects/<slug>`、`<base>/about`、`<base>/en/about`）SHALL 顯示對應頁面，且網址保持為乾淨路徑（不含 `#`）。已知的靜態路由 SHALL 以 HTTP 200 回應；未知路徑 SHALL 由 SPA 顯示 Not Found 頁面。

#### Scenario: Reload case study
- **WHEN** 使用者在 `<base>/projects/b2b-corporate-website` 按重新整理
- **THEN** 顯示該 Case Study，HTTP 狀態為 200

#### Scenario: Reload unknown path
- **WHEN** 使用者直接開啟 `<base>/foo/bar`
- **THEN** 顯示網站的 Not Found 頁面（含 Navbar），而非 GitHub 預設 404 頁

### Requirement: CI/CD pipeline
推送到 `main` 分支 SHALL 觸發 GitHub Actions workflow，依序執行：checkout → setup Node（LTS）並使用 npm cache → `npm ci` → lint → type-check → test → build → 使用 GitHub 官方 Pages actions 上傳並部署。任一步驟失敗 SHALL 中止部署。Workflow SHALL 可手動觸發，SHALL 只宣告必要權限，並避免同時進行多個部署。Workflow SHALL 不使用已 deprecated 的 actions 版本。

#### Scenario: Failed lint blocks deploy
- **WHEN** 推送到 main 的 commit 含 ESLint 錯誤
- **THEN** workflow 在 lint 步驟失敗，網站不被更新

#### Scenario: Successful deploy
- **WHEN** 推送到 main 且所有檢查通過
- **THEN** 網站部署到 GitHub Pages，workflow 顯示部署網址
