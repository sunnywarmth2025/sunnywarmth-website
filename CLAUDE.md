# 暖晴社會福利協會 官網 — 專案說明

## 專案背景
為「**社團法人暖晴社會福利協會**」（Sunny Warmth）建置的官方網站。
這是一間服務身心障礙者就業的社福協會／庇護工場，網站用來對外介紹服務、活動、捐款與參與方式。

## 技術架構
- **靜態多頁 HTML 網站**（沒有框架、沒有 build 步驟），部署在 **GitHub Pages**，使用自訂網域。
- 版面、樣式、文字直接改 `.html` / `.css`，上傳 GitHub 才會更新。
- **內容資料（活動、生活點滴、徵信、物資）存在線上資料庫 Supabase**，在後台存檔即上線，不經過 GitHub。詳見下方「線上資料庫」。

| 項目 | 值 |
|------|----|
| 自訂網域 | `sunnywarmth2025.com.tw`（見 `CNAME`） |
| GitHub repo | `https://github.com/sunnywarmth2025/sunnywarmth-website` |
| 分支 | `main`（GitHub Pages 來源） |

## 檔案結構
```
index.html        首頁
about.html        關於我們
services.html     服務項目
participate.html  參與我們（含各「據點」卡片，照片放 Location/）
gallery.html      生活點滴（資料來自資料庫 photos 表）
donate.html       捐款支持（徵信芳名錄來自資料庫 credits 表）
events.html       活動（資料來自 events 表；導覽列已不連結，後台保留）
admin.html        後台（Google／Email 登入，直接讀寫資料庫）
db.js             全站共用的資料庫連線設定與讀取函式 fetchTable()
style.css         全站共用樣式（改顏色/字體先看 :root 變數）
logo.png          網站 logo / favicon
team-photo.png    團隊合照

gallery/          生活點滴的活動照片（檔名多為「日期+說明.jpg」）
Location/         「參與我們」各據點的門市照片
510/              510 相關素材（logo、捐款圖）
pay-icon/         捐款頁金流圖示
```

## 樣式慣例
- 顏色用 CSS 變數，定義在 `style.css` 的 `:root`（如 `--vest`、`--vest-cream`、`--logo-yellow` 等）。改配色從這裡改。
- 語言 `zh-TW`，全站繁體中文。
- 導覽列（`.site-nav`）與頁腳每頁都各自寫一份，改導覽列要**每頁都改**。

## 線上資料庫（Supabase）
- 專案 `nybmhasdnnptrytvzdaz`（東京區）。連線設定只寫在 `db.js`，前台各頁與後台都載入它。
- 網頁裡的 publishable key（`sb_publishable_…`）本來就是公開用的，只能讀。**絕對不要**把 secret / service_role key 或資料庫密碼放進 repo。
- 資料表（都有 `sort_order`，小的排前面）：
  - `photos`：title / src / images(text[]) / video / date / category / description
  - `events`：title / event_type / date / event_time / location / status / description / detail / contact / fee / quota / reg_link
  - `credits`：title / date / link / content
  - `supplies`：name / status / description
  - `admin_users`：email（小寫）/ name —— 管理人員名單
- 圖片空間 `gallery`（公開讀取）：後台上傳的照片先在瀏覽器壓縮到長邊 1400px，存到 `photos/`；`src` 存完整網址。舊照片的 `src` 是檔名，對到 repo 的 `gallery/` 資料夾。
- 權限（RLS）：所有人可讀；寫入要 `public.is_admin()` 為真＝登入帳號的 email 在 `admin_users` 裡且已驗證。
- 後台登入：同仁用自己的 **Google 帳號**（Supabase Auth 的 Google provider），名單在後台「管理人員」頁維護；也保留 Email 密碼登入。不在名單的人登入後會被自動登出。
- 前台各頁的 `==XXX_DATA_START==` 區塊是**備援資料**：只有資料庫連不上時才顯示；也是後台「⬆ 匯入現有資料」的來源（資料表空的時候才出現）。
- `.github/workflows/supabase-keepalive.yml` 每 3 天讀一次資料庫，避免免費專案 7 天沒動靜被暫停。

## ⚠️ 工作慣例（重要）
- **改完檔案不要自動 `git commit` / `git push`**。依慣例由使用者**自己上傳／commit**。除非使用者明講「幫我 push」才動 git。
- 要預覽時用本機靜態伺服器 + 瀏覽器檢查，不要直接對線上動手。
- 新增資料夾（如 `Location/`）時提醒使用者：上傳到 GitHub 時要一起把資料夾建上去。

## 相關但不在此 repo 的東西
- **Facebook 粉專**：暖晴發展協會 FB（曾做過「抓取最新活動內容」的爬蟲）。
- **捐款收據**：另有試算表（捐款收據、含官方印章）在別的對話處理過。
