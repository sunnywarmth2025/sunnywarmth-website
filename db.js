// 線上資料庫（Supabase）連線設定，全站共用。
// publishable key 本來就設計成公開使用：訪客只能讀取，寫入受資料庫權限規則保護。
// 絕對不要把 secret / service_role key 放進這個檔案或網站任何地方。
const SUPABASE_URL = 'https://nybmhasdnnptrytvzdaz.supabase.co';
const SUPABASE_KEY = 'sb_publishable_NJxkvEAN-qTtoo8BUDuaCw_l9H25bWQ';

// 讀取一張公開資料表（依 sort_order 排序）。
// 連不上或逾時回傳 null，頁面會改用自己內建的備援資料；成功回傳陣列（可能是空的）。
async function fetchTable(table) {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*&order=sort_order.asc,id.asc`,
      { headers: { apikey: SUPABASE_KEY }, signal: ctrl.signal });
    clearTimeout(timer);
    return res.ok ? await res.json() : null;
  } catch (e) {
    return null;
  }
}
