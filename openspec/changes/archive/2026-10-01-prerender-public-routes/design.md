# Design

背景、方案比較與風險見 `proposal.md`。這裡記錄實作細節。

## D1. Build pipeline

```jsonc
"build": "vite build && vite build --ssr src/entry-server.ts --outDir dist-ssr && node build/prerender.ts"
```

- 第 1 步沿用現況：`staticRoutes` plugin 寫出每個路由的 `index.html`（只有 head），並新增 `sitemap.xml`、`robots.txt`。
- 第 2 步：`staticRoutes` 的 `apply` 改為只在 client build 套用（`isSsrBuild` 時跳過），SSR bundle 輸出到已被 gitignore 的 `dist-ssr/`。`vue`、`vue-router` 保持 external，由 `node_modules` 載入。
- 第 3 步：Node 24 原生執行 TS（type stripping，`.nvmrc` = 24）。`build/prerender.ts` 只 import `node:*`、`./html.ts` 與 SSR bundle，不 import `src/`。

## D2. `src/entry-server.ts`

```ts
export { getStaticPages } from './utils/seo'
export async function render(path: string): Promise<string> // createSSRApp + memory history(BASE_URL) + renderToString
```

每次呼叫建立新的 app 與 router，不共用狀態。

## D3. 渲染路徑

`routePath(page.path)`：`/` → `/`，其他加上結尾 `/`（`/en/` 、`/about/`、`/en/projects/<slug>/`）。這正是 GitHub Pages 回應 200 的網址，client hydrate 時的 `route.path` 與 SSR 相同。

## D4. Client 進入點

prerender 時在容器記錄渲染路徑：`<div id="app" data-prerendered-path="/about/">`。client 只有在這個路徑與目前網址相符（忽略結尾 `/`）時才用 `createSSRApp` hydrate，其餘一律 `createApp` 重新掛載：

- `404.html`（空容器）。
- 主機用別頁的 HTML 回應目前網址。例如 `vite preview` 對 `/about` 回傳首頁 HTML。實測這會造成 class 與 `href` 的 mismatch，而 Vue 在 production 不會修正這兩種 mismatch。GitHub Pages 會先 301 到 `/about/`，不受影響，但這層檢查讓結果不依賴主機行為。維持 `router.isReady()` 後才 mount，lazy route 元件會先載入，確保 hydrate 的元件樹與 HTML 相同。

## D5. SSR-safe 調整

| 位置 | 問題 | 調整 |
|---|---|---|
| `usePageMeta` | `watchEffect` 在 SSR setup 會執行一次，存取 `document`／`window` | `import.meta.env.SSR` 時 return；head 由 build 寫入 |
| `SiteFooter` | `new Date().getFullYear()` 跨年時與 build 結果不同 | Vite `define` 注入 `__BUILD_YEAR__`，SSR 與 client 一致 |
| `index.html` | `<noscript>需要 JavaScript</noscript>` 在 prerender 後不正確 | 移除；只在 `404.html` 保留 |

`SiteHeader`、`useActiveSection`、`HeroAnimation` 的 browser API 已在 `onMounted`，不需修改。

## D6. Head tags

`seo.ts` 新增 `headTags(head)`，回傳 `{ attribute, key, content }[]`：

`description`、`robots`、`og:type`、`og:title`、`og:description`、`og:url`、`og:image`、`og:locale`、`twitter:card`、`twitter:title`、`twitter:description`、`twitter:image`。

`renderHeadTags`（build）與 `applyPageHead`（runtime）都由它產生。`MANAGED_TAGS` 改為移除 `twitter:[\w:]+`。

## D7. OG image

- `DEFAULT_OG_IMAGE = 'og/default-og.png'`（由 `public/og-default.png` 移動）。
- `Project.ogImage?: string`；`projectImage = project.ogImage ?? socialImage(cover.src)`，`socialImage` 對 SVG 回傳預設圖。
- Home／About／Projects 使用預設圖；之後要換，只需在 `describePage` 對應 case 設定 `image`。

## D8. Sitemap 與 robots

- `renderSitemap(heads)`：每個 indexable 頁面一筆 `<url>`，`<loc>` = canonical，並列出 `xhtml:link rel="alternate" hreflang`。不輸出 `lastmod`（沒有可信的修改日期）。
- `renderRobots(siteUrl)`：`User-agent: *`、`Allow: /`、`Sitemap: <siteUrl>sitemap.xml`。
- 兩者都在 `staticRoutes` 的 `generateBundle` 由同一份 `getStaticPages()` 產生，404 不在其中。
