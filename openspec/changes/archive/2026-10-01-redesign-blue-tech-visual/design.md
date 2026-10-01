# Design

## Context

- 視覺方向已在 Claude Design 畫布確認（Portfolio 版面美化提案 v5：首頁桌面／手機、Projects、Case Study）。本次依 web-design-engineer 的 Redesign · Overhaul（視覺層）流程實作：內容、IA 與技術契約維持，視覺語言改變。
- 現行 token 在 `src/assets/main.css`（`@theme` 清空預設色盤），元件只使用語意色，因此大部分改動集中在 token 與少數元件模板。

## Goals / Non-Goals

**Goals:** 依畫布實作藍白科技風；字型比例與區塊節奏更有層次；Case Study 更好導覽；維持 a11y 0 violations 與所有既有測試契約。

**Non-Goals:** 深色模式、動畫敘事（motion 維持 3/10）、新增頁面或內容區塊以外的功能、改變路由或文案。

## Decisions

### D1. Token（`main.css` 的 `@theme`）
| Token | 值 | 用途 |
|---|---|---|
| `canvas` | #F6F9FD | 頁面底色 |
| `surface` | #FFFFFF | 卡片、面板 |
| `ink` | #0B1A30 | 標題、主要文字 |
| `ink-soft` | #33445C | 內文 |
| `ink-muted` | #4B5B72 | 次要文字（canvas 上 6.9:1） |
| `line` / `line-strong` | #DCE5F1 / #B9C7DA | 分隔線、次要按鈕外框 |
| `accent` / `accent-strong` / `accent-soft` | #1653E6 / #0F3FB3 / #EAF1FF | 重點色、hover、淺底 |
| `navy` / `on-navy` / `on-navy-muted` / `on-navy-accent` | #0B1A30 / #FFFFFF / #A9BCD9 / #8FB4FF | 深藍色帶 |
| `warn` / `warn-soft` | #8A3B0A / #FDF2E4 | 「開發中」徽章 |

內容寬度 `--container-content` 改為 75rem（1200px）。沿用既有的 `section-spacing`，數值改為 56px（手機）／112px（≥768px）。新增 `@utility`：`eyebrow`（mono、uppercase、0.1em 字距、accent 色）、`hero-grid`（40px 淡網格底紋）。卡片 hover 陰影與位移以 `@utility card-lift` 定義一次。

### D2. 字型
`index.html` 以 `preconnect` + Google Fonts css2 載入 Noto Sans TC 400/500/700/900 與 IBM Plex Mono 400/500（`display=swap`，CJK 依 unicode-range 切片）。`--font-sans` 改為 `'Noto Sans TC'` 優先並保留系統字型 fallback；`--font-mono` 改為 `'IBM Plex Mono'`。靜態路由 HTML 以 `index.html` 為模板，字型連結自然帶入。

### D3. 首頁
- Hero：12 欄格線，左 8 欄（eyebrow、h1 900 字重、介紹、CTA），右 4 欄「目前」面板；面板資料由 `profile.content[locale].experience[0]`、`profile.focusTechnologies`、`projects.find(status)` 推導，不另存資料。
- 技能：深藍色帶，每個分類一列（左分類名、右技能），技能仍為 `<ul>/<li>`，以 CSS 加上「/」分隔，維持 spec 的列表語意與既有測試。
- About 預覽：摘要 + `<ol>` 工作經歷（期間、公司、職稱）。

### D4. 卡片
維持單一連結、封面、標題、摘要、技術標籤；新增 mono 編號（`01` 依顯示順序，由 grid 傳入 index）；hover 時浮起 2px + 陰影、箭頭右移 2px；reduced-motion 時停用位移。

### D5. Case Study
- `ProjectContent.facts?: { company?: string; period?: string }`（依語系）。事實列：角色取 `caseStudy.role.title`、公司與期間取 `facts`、技術取 `technologies`；缺少的項目不渲染。
- 已有 facts 的專案，`role.title` 簡化為職稱（公司與期間改由 facts 呈現，避免重複）。
- 目錄元件 `CaseStudyToc`：由 view 依實際渲染條件產生 section 清單（id + 標題），只在 `lg` 以上顯示（`hidden lg:block`），`sticky top-24`。
- scroll-spy：`useActiveSection(ids)` 以 IntersectionObserver 追蹤目前 section；環境沒有 IntersectionObserver（jsdom）時不啟用，目錄仍可正常點擊。
- section 編號由 `CaseStudySection` 的 `index` prop 顯示（mono、accent），標題改為 34px 700。

### D6. 其他頁面與版面
Header／Footer、Projects、About、404 套用同一套 token 與字型；語言切換維持「English／中文」文字（i18n spec），以 mono 樣式呈現。

## Risks / Trade-offs

- [CJK 網頁字型增加首次載入] → 切片載入 + `display=swap`；fallback 字型與網頁字型的 metrics 差異會造成輕微 layout shift，可接受。
- [scroll-spy 增加 JS] → 只在 Case Study 且 ≥1024px 使用；觀察者在卸載時清除。
- [既有測試依賴 DOM 結構] → 保留所有 id、`aria-labelledby`、`aria-label` 與列表語意；只改 class 與新增元素。

## Open Questions

（無）
