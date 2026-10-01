# Proposal

## Why

首頁的技能區塊目前是整條深藍色帶，標題與精選作品同級（2.75rem），在頁面中段搶走注意力；技能清單只是輔助資訊，重點應該留在 Hero 與精選作品。另外 React 與 Cloudflare 不是目前要強調的技能，從清單移除。

## What Changes

- 技能資料移除 React（Frontend）與 Cloudflare（DevOps），其他分類與項目不變。
- 首頁技能區塊降低視覺比重：
  - 深藍色帶改為白色 surface 加上下細線，與頁面其他區塊同色系。
  - 標題縮小為 `text-xl md:text-2xl`，移除 eyebrow，說明文字改為小字並與標題同列。
  - 縮小上下留白（`py-12 md:py-16`，取代 `section-spacing` 的 112px）。
  - 5 個分類在 ≥1024px 排成一列，各分類名稱以小型 mono 標籤呈現，項目為一般內文大小的清單。
- 移除不再使用的 `home.skillsEyebrow` 文字。
- 語意不變：`<h2>` 區塊標題、每個分類 `<h3>`、項目 `<ul>/<li>`。

## Capabilities

### Modified Capabilities

- `home-page`：技能清單的項目調整。

## Impact

`src/data/skills.ts`、`src/views/HomeView.vue`、`src/i18n/messages.ts`。不新增依賴、不影響其他頁面。
