# Spec Delta

## ADDED Requirements

### Requirement: Build-time prerender
`npm run build` SHALL 以單一指令完成 client build、SSR build 與 prerender，最終 `dist/` 即可直接部署，CI workflow 不需額外步驟。Prerender SHALL 只使用 build-time 工具（Vue 內建的 server renderer 與 Vite SSR build），SHALL NOT 新增 runtime dependency，SSR bundle SHALL NOT 出現在部署產物中。任何公開路由在 Node 環境渲染失敗（例如元件在 setup 階段使用 browser-only API）SHALL 使 build 或測試失敗。

#### Scenario: One build command
- **WHEN** 在乾淨 clone 執行 `npm ci && npm run build`
- **THEN** `dist/` 內每個公開路由的 `index.html` 都已包含頁面內容，且 `dist/` 不含 SSR bundle

#### Scenario: Browser-only API in setup
- **WHEN** 開發者在某個頁面元件的 setup 直接讀取 `window`
- **THEN** `npm run test` 失敗
