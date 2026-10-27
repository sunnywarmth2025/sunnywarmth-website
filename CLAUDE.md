# 暖晴社會福利協會 官網 — 專案說明

## 專案背景
為「**社團法人暖晴社會福利協會**」（Sunny Warmth）建置的官方網站。
這是一間服務身心障礙者就業的社福協會／庇護工場，網站用來對外介紹服務、活動、捐款與參與方式。

## 技術架構
- **純靜態多頁 HTML 網站**（沒有後端、沒有框架、沒有 build 步驟）。
- 部署在 **GitHub Pages**，使用自訂網域。
- 直接改 `.html` / `.css` 檔即可，改完刷新瀏覽器就看得到。

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
gallery.html      生活點滴（活動照片；資料在 ==PHOTOS_DATA_START== 區塊內）
donate.html       捐款支持
events.html       活動
admin.html        後台（分頁切換式管理介面）
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

## gallery.html 照片資料
- 照片清單以 `==PHOTOS_DATA_START==` / `==PHOTOS_DATA_END==` 標記的資料區塊維護。
- 新增照片：把圖檔放進 `gallery/`，再在該資料區塊補一筆。

## ⚠️ 工作慣例（重要）
- **改完檔案不要自動 `git commit` / `git push`**。依慣例由使用者**自己上傳／commit**。除非使用者明講「幫我 push」才動 git。
- 要預覽時用本機靜態伺服器 + 瀏覽器檢查，不要直接對線上動手。
- 新增資料夾（如 `Location/`）時提醒使用者：上傳到 GitHub 時要一起把資料夾建上去。

## 相關但不在此 repo 的東西
- **Facebook 粉專**：暖晴發展協會 FB（曾做過「抓取最新活動內容」的爬蟲）。
- **捐款收據**：另有試算表（捐款收據、含官方印章）在別的對話處理過。
