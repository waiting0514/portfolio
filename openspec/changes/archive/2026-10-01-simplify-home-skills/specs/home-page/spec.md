# Spec Delta

## MODIFIED Requirements

### Requirement: Categorized skills
首頁 SHALL 以文字分類清單呈現技能（非 Logo Wall），至少包含以下分類與項目：Frontend（Vue、Angular、TypeScript、JavaScript）、State / Reactive（Pinia、RxJS）、Realtime / Media（WebSocket、WebRTC、MSE）、Tooling（Vite、Webpack、ESLint、Prettier）、DevOps（Docker、GitHub Actions）。每個分類 SHALL 有標題，項目 SHALL 以列表語意（`<ul>`/`<li>`）呈現。技能資料 SHALL 集中管理。技能區塊為輔助資訊，其標題 SHALL 小於精選作品等主要區塊的標題。

#### Scenario: Skills grouped by category
- **WHEN** 訪客捲動到 Skills 區塊
- **THEN** 看到 5 個具標題的分類，每個分類下列出對應技能，且不包含 React 與 Cloudflare
