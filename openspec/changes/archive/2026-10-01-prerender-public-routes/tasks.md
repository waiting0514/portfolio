# Tasks

> 每組完成時執行 `npm run lint`、`type-check`、`test`、`build`。

## 1. SEO 資料

- [x] 1.1 `seo.ts`：`PageDescription.type`（Case Study 為 `article`）、`headTags()`、OG image fallback（`ogImage` → 非 SVG cover → 預設）；`Project.ogImage?`；`public/og-default.png` 移到 `public/og/default-og.png`；驗證：seo 測試
- [x] 1.2 `renderHeadTags`、`applyPageHead` 改用 `headTags()`；`MANAGED_TAGS` 涵蓋 `twitter:*`；驗證：static-routes／usePageMeta 測試
- [x] 1.3 `renderSitemap`、`renderRobots`，在 `generateBundle` 輸出；驗證：測試 sitemap 只含 indexable 頁面、robots 指向 sitemap

## 2. Prerender

- [x] 2.1 SSR-safe：`usePageMeta` SSR 時 return；`SiteFooter` 用 `__BUILD_YEAR__`；`index.html` 移除 `<noscript>`，`404.html` 保留
- [x] 2.2 `src/entry-server.ts`、`build/html.ts`、`build/prerender.ts`；`main.ts` hydrate／mount；`staticRoutes` 在 SSR build 不套用；`build` script；驗證：`src/entry-server.spec.ts` 在 Node 環境渲染全部路由並含 h1
- [x] 2.3 `build/html.ts` 單元測試（輸出路徑、渲染路徑、填入 app HTML）

## 3. 驗證

- [x] 3.1 以 `SITE_URL=https://waiting0514.github.io/portfolio/ BASE_PATH=/portfolio/` build，直接檢查 `dist/index.html`、`dist/about/index.html`、`dist/projects/index.html`、`dist/projects/<slug>/index.html` 原始碼：head 標籤（各一次、絕對網址含 `/portfolio/`）與主要內容；`sitemap.xml`、`robots.txt`、`404.html`
- [x] 3.2 瀏覽器：JS 停用時內容可讀；JS 啟用時無 hydration 警告、站內導覽不重新載入、直接進入與重新整理 Case Study 正常、Hero 動畫與 reduced motion 正常、axe 0 violations
- [x] 3.3 lint、type-check、test、build、`openspec validate --strict`
