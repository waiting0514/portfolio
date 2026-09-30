# Design

## Context

- 動機見 `proposal.md`。現行 Case Study 以 `src/types/project.ts` 的 `CaseStudy`（9 個 optional section）描述，`ProjectDetailView.vue` 以明確模板逐一 `v-if` 渲染；`CaseStudySection`（`<section>` + `<h2>` + 內文排版，可關閉 prose 樣式）是共用外框。Technical Challenges 的卡片樣式目前直接寫在 view 內。
- `ProjectCard` 顯示封面、標題、摘要、技術標籤與單一 stretched link；首頁取前 3 個 `featured` 專案。
- 內容來源：使用者提供的 Case Study 需求說明，以及 `社群管理平台-系統操作流程展示.html`（已 gitignore，只讀取文字，不使用截圖）。該文件是操作流程展示，**看不出實際技術與程式架構**。
- 既有設計決策維持：明確模板而非設定驅動渲染（原 design D6）、資料模組 Node 相容、所有文字雙語且缺漏時 type-check 失敗。

## Goals / Non-Goals

**Goals:**
- 在不改變全站 Design System 的前提下，讓 Case Study 能表達「開發中」、專案類型、需求到實作的流程與職責。
- 新增欄位全部 optional，既有三個專案的資料與版面不變。
- 公司內部專案的內容只寫使用者提供或文件中可確認的事實，不含任何內部識別資訊。

**Non-Goals:**
- 不改成區塊式（block-based）內容模型或 CMS 式的 section registry。
- 不新增 Screenshot 區塊、Live Demo／GitHub 連結欄位。
- 不調整首頁精選作品數量上限（維持 3）。

## Decisions

### D1. 資料模型擴充（全部 optional）

```ts
// src/types/project.ts
export type ProjectStatus = 'in-development'

export interface Project {
  // …既有欄位
  status?: ProjectStatus
  /** 專案類型標籤，不翻譯（例如 'Real-world Project'） */
  labels?: readonly string[]
}

export interface CaseStudy {
  overview?: string[]
  background?: { paragraphs: string[]; flow?: string[] }
  role?: { title: string; responsibilities: string[]; flow?: string[] }
  problem?: string[]
  problemExample?: { heading?: string; requirement: string; flow: string[]; states?: string[] }
  workflow?: string[]
  architecture?: { steps: string[]; diagramAlt?: string }
  solution?: string[]
  responsibilities?: { title: string; description: string }[]
  challenges?: TechnicalChallenge[]
  aiAssisted?: { paragraphs: string[]; humanTasks: string[] }
  results?: string[]
  currentStatus?: { label: string; value: string }[]
  learnings?: string[]
}
```

- `status` 只有一個值：目前沒有「已完成」以外的其他狀態需求，未標示即視為一般專案。避免預先設計用不到的列舉。
- `labels` 與 `technologies` 一樣不翻譯（使用者指定的英文標籤），放在 `Project` 層級。
- `problemExample` 讓 Problem 在段落之後附上「需求範例 → 實際需要定義的流程 → 狀態清單」，不需要改動既有 `problem: string[]` 的型別，避免影響三個既有專案。
- **替代方案**：把所有 section 改成 `{ type: 'paragraphs' | 'flow' | 'cards' … }[]` 的區塊模型——彈性最高，但等於重寫資料與模板，也違反原本「明確模板」的決策，為一個專案不值得。

### D2. Section 順序與渲染

`ProjectDetailView` 維持明確模板，依 spec 順序插入新 section：Overview → Background → My Role → Problem → Workflow → Architecture → Solution → Key Responsibilities → Technical Challenges → AI-assisted Development → Tech Stack → Result → Current Status → What I Learned。每個新 section 都以 `hasContent()` 判斷，沒有資料就不渲染。

新 section 標題放在 `messages.caseStudy.sections`（中英各一），例如「專案背景／Project Background」「需求到前端的工作流程／Requirement to Frontend Workflow」「主要職責／Key Responsibilities」「AI 輔助開發／AI-assisted Development」「目前狀態／Current Status」。Problem 的標題維持「問題」，範例的小標題（例如「從 AI 需求到可實作的產品」）由資料的 `problemExample.heading` 以 `<h3>` 呈現，維持 heading 階層。

### D3. `FlowDiagram` 元件（新增、可重用）

- 語意：`<ol>`，每個步驟一個 `<li>`；箭頭以 `aria-hidden` 的元素呈現，螢幕閱讀器只會讀到有序步驟。
- 版面：預設（<768px）直向排列，步驟間顯示「↓」；`md:` 以上改為 `flex-row flex-wrap`，步驟間顯示「→」，自然換行，不產生水平捲軸。
- 樣式：沿用既有 token（`line`、`surface`、`ink`、`accent`）與 `rounded-md` 的標籤外觀，不新增顏色。
- 使用處：Background 的輸入流程、My Role 的工作範圍、Problem 範例的操作流程、Requirement to Frontend Workflow。
- 放在 `CaseStudySection` 內時使用 `prose` = false 的區塊（或在元件內重置列表樣式），避免繼承內文的項目符號。

### D4. `CaseStudyCard` 元件（從既有樣式抽出）

把 Technical Challenges 目前寫在 view 內的卡片（`rounded-lg border border-line p-5`、標題 + 內文）抽成元件，Technical Challenges 與 Key Responsibilities 共用，避免兩份重複樣式。卡片標題層級由 prop 指定（在 `<h2>` section 內為 `h3`）。

### D5. `StatusBadge` 元件與專案標籤

- `StatusBadge` 顯示「開發中／In Development」，由 `messages.project.status['in-development']` 提供文字；以文字 + 小圓點呈現，不只靠顏色（符合 a11y spec）。
- 標籤（labels）以小字、等寬字的文字列呈現，和技術標籤區隔（技術標籤是有框的 TechTag）。
- 位置：Project Card 標題上方一列（標籤 + 徽章）；Case Study Hero 的標題上方同樣一列。沒有 labels 與 status 時整列不渲染。
- 卡片仍只有一個 stretched link，標籤列不含任何連結。

### D6. 封面 placeholder

新增 `public/images/projects/social-media-platform.svg`：沿用既有 SVG placeholder 的中性風格，文字為「Social Media Management Platform」與「Screenshot pending approval」，不含任何實際系統畫面。alt 文字說明「畫面尚待確認後公開」。因為是 SVG，社群分享預覽會自動使用 `og-default.png`（既有 `socialImage()` 規則）。

### D7. 專案順序與精選

- 新專案放在 `projects` 陣列**第一個**（最新、也最能代表需求分析能力），`featured: false`：首頁仍顯示原本三個精選作品，Projects 頁與 Case Study 前後頁導覽包含新專案。
- 是否改為首頁精選見 Open Questions；改動只需調整資料，不影響程式。

### D8. 內容規劃（中文為主，英文版同步）

依使用者提供的頁面結構，對應到模型：

| 使用者要求的區塊 | 對應欄位 | 內容來源 |
|---|---|---|
| Hero / Overview | title、subtitle（Social Media Management Platform）、labels、status、overview | 使用者提供的簡介；功能範圍（前置設定、內容產製、客服回覆、導流轉換、成效稽核，7 個社群平台）取自說明文件 |
| Project Background | background（含輸入流程） | 使用者說明 |
| My Role | role（含工作範圍流程） | 使用者說明 |
| Main Challenge | problem + problemExample（排程發文的流程與狀態） | 使用者說明；狀態依說明文件：草稿、已排程、發布中、已發布、部分失敗、失敗 |
| Requirement to Frontend Workflow | workflow | 使用者說明 |
| Frontend Architecture | architecture | **TODO**：待使用者提供實際分層 |
| Key Responsibilities | responsibilities | 使用者說明；Business Logic 以說明文件中的規則舉例（部分失敗只重試失敗平台、送出前檢核平台規則、超過回覆時限停用回覆框、平台未提供的指標顯示「—」） |
| AI-assisted Development | aiAssisted | 使用者說明 |
| Tech Stack | technologies | **TODO**：待使用者提供 |
| Current Status | currentStatus | 使用者說明；Mock Data 狀態為 TODO |
| What I Learned | learnings | 使用者列出的學習重點 |

不寫入：內部追蹤編號（P2-05、DEC-001、GAP-001）、示範情境與示範資料名稱、SSO 與 AI 判讀的實作細節、截圖。

### D9. 測試

- `FlowDiagram`：有序列表、步驟順序、箭頭 `aria-hidden`、步驟數正確。
- `StatusBadge`：依語系顯示文字。
- `ProjectCard`：有 labels / status 時顯示且仍只有一個連結；沒有時不渲染標籤列。既有「技術標籤」斷言改為只檢查技術標籤列表（目前以卡片內所有 `<li>` 比對，加入標籤後會失準）。
- `ProjectDetailView`：fixture 新增一個含所有新 section 的專案，驗證 section 順序、Problem 範例的流程與狀態、職責卡片、Current Status 清單、Hero 徽章；既有 fixture 專案不出現新 section。
- 資料：第 4 個專案兩語系內容完整、section 鍵一致（沿用既有測試）。

## Risks / Trade-offs

- [CaseStudy 型別欄位變多（9 → 14 個 section）] → 全部 optional 且各自獨立；維持明確模板，讀程式時仍一眼看得出每個 section 如何渲染。若日後出現更多專案專屬需求，再評估區塊模型。
- [TODO placeholder 直接出現在公開頁面] → 與既有專案一致的處理；在使用者提供 Tech Stack 與架構前，建議先不推送部署（見 Open Questions）。
- [Business Logic 舉例可能被視為敏感] → 只使用一般化、與平台公開限制相關的規則，不含內部決策編號與數據；實作前請使用者確認。
- [新專案排第一會改變 Case Study 前後頁順序] → 前後頁依資料順序是既有規則，行為正確；ProjectPager 測試以資料動態取值，不受影響。

## Resolved Questions

使用者於實作前確認：

- **Tech Stack**：Vue 3（Composition API、`<script setup>`）、Vite、Vue Router、vue-i18n、Arco Design Vue（按需引入）、ECharts、Axios；未使用 Pinia／Vuex。
- **Frontend Architecture**：表現層（layouts、依業務模組劃分的 views、通用與領域元件）→ 狀態與業務邏輯層（composables 以模組層級的單例響應式狀態共用資料，封裝發布檢核、權限、列表查詢；切換租戶時統一清空）→ 服務層（各業務 API 模組以開關決定走 Mock 或 HTTP；HTTP 封裝統一處理授權標頭、語系與錯誤正規化）→ Mock 層（記憶體中的可變資料庫、預建多租戶與邊界狀態、模擬延遲與標準化錯誤）→ 基礎層（常數、路由與選單權限、i18n、樣式 token）。D8 表中的 Architecture 與 Tech Stack 改用以上內容，不再是 TODO；本機路徑與測試租戶識別碼不寫入。
- **首頁精選**：不變（`featured: false`）。
- **Business Logic 舉例**：D8 的四個規則範例可以公開。

## Open Questions

- **封面**：之後確認可公開的畫面後，再以同樣的去識別化流程替換 placeholder。
