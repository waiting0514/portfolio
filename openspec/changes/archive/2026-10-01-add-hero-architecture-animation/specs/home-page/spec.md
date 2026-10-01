# Spec Delta

## MODIFIED Requirements

### Requirement: Hero section
首頁 SHALL 以 Hero 區塊開始，包含：頁面唯一的 `<h1>`（職稱：中文「前端工程師」／英文「Frontend Engineer」，可搭配姓名）、簡短自我介紹、技術重點（Vue、Angular、TypeScript、JavaScript、RxJS），以及兩個 CTA：「View Projects」（Primary，連到目前語系的 Projects 頁）與「About Me」（Secondary，連到目前語系的 About 頁）。本規格中的按鈕與區塊名稱以英文記載，實際顯示文字依語系翻譯。Hero 的文字內容 SHALL 來自集中管理的 profile 資料，而非寫死在頁面中。

寬度 ≥1024px 時 Hero SHALL 為左右版面：左側為上述文字與 CTA，右側為 Hero Animation；較窄時 SHALL 改為上下排列，文字在前。

#### Scenario: Hero content and CTAs
- **WHEN** 訪客開啟首頁
- **THEN** 看到職稱標題、自我介紹、技術重點，以及 View Projects 與 About Me 兩個按鈕樣式的連結

#### Scenario: English hero
- **WHEN** 訪客開啟 `<base>/en/`
- **THEN** `<h1>` 包含「Frontend Engineer」

#### Scenario: View Projects CTA
- **WHEN** 訪客點擊 View Projects
- **THEN** 導向 `/projects`

#### Scenario: About Me CTA
- **WHEN** 訪客點擊 About Me
- **THEN** 導向 `/about`

#### Scenario: Current panel
- **WHEN** 訪客開啟首頁
- **THEN** Hero 不再顯示「目前」面板，最新一筆工作經歷改由 About 預覽呈現

#### Scenario: Desktop split layout
- **WHEN** 在 1440px 寬度開啟首頁
- **THEN** Hero 文字與 CTA 在左、Hero Animation 在右，且頁面沒有水平捲軸

## ADDED Requirements

### Requirement: Hero animation
Hero SHALL 包含一個裝飾性的 Hero Animation，以約 6 秒的無限循環依序呈現 Requirement（Product / AI Spec）→ Requirement Analysis → Frontend Architecture（Component、State、Router、API）→ Web Product（Maintainable Web Application）。動畫 SHALL 只使用網站既有的設計 token，SHALL 只以 transform 與 opacity 製作動態，且每個循環 SHALL 以全部透明開始與結束，接縫不出現跳格。動畫 SHALL NOT 包含公司名稱、客戶名稱、真實 API、真實需求或業務資料，也 SHALL NOT 以技術 Logo 呈現。

動畫 SHALL 以單一具有本地化無障礙名稱的圖片角色（`role="img"`）呈現，內部元素對輔助科技隱藏，且不含可聚焦元素。動畫元件 SHALL 與 Hero 文字分開實作；首屏 SHALL 先以靜態完整狀態渲染，在瀏覽器空閒後才開始循環，且播放不改變版面尺寸。寬度 <640px 時 Architecture 節點 MAY 簡化，但 Requirement → Architecture → Product 流程 SHALL 保留。

當使用者設定 `prefers-reduced-motion: reduce` 時，動畫 SHALL NOT 播放，SHALL 直接顯示完整的靜態最終狀態。

#### Scenario: Animation plays after idle
- **WHEN** 訪客開啟首頁且未設定減少動態效果
- **THEN** Hero 文字立即可見，動畫在瀏覽器空閒後開始 6 秒循環

#### Scenario: Reduced motion shows the final state
- **WHEN** 作業系統開啟減少動態效果並開啟首頁
- **THEN** 動畫不播放，Requirement、Architecture 與 Web Application 同時完整顯示

#### Scenario: Accessible name
- **WHEN** 螢幕閱讀器讀到 Hero Animation
- **THEN** 只讀出一段描述「需求 → 前端架構 → 可維護的 Web 應用程式」的名稱，不逐一讀出動畫內的文字

#### Scenario: Mobile without overflow or layout shift
- **WHEN** 在 375px 寬度開啟首頁
- **THEN** 動畫位於 Hero 文字下方、沒有水平捲軸，且動畫播放期間下方內容不位移
