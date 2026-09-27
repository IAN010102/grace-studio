/* Grace Studio — 站台腳本 */
(function () {
  'use strict';

  /* ══════════ 公告資料（唯一來源）══════════
     新增公告：複製一組物件貼到陣列最前面即可，
     首頁與公告頁會同時更新。 */
  const NOTICES = [
  { id:'NT-2026-016', date:'2026.09.22', cat:'產品', title:'新增互動遊戲：《今晚的遊樂園》免費上線',
    body:'Grace Studio 第一個非書籍產品——專為排隊設計的朋友互動遊戲，八種模式、票根儀式、中英文雙語，免費體驗，不需下載安裝。手機直向開啟即玩。' },
  { id:'NT-2026-015', date:'2026.09.22', cat:'政策', title:'退款政策更新：三項商品調整為不適用七日解除權',
    body:'《為什麼藍牙耳機會延遲》、《為什麼無線充電這麼慢又這麼燙》、《看懂一張照片怎麼變小》原提供購買後 7 天內退款，現已調整為與其餘商品一致：數位內容經同意後發送存取權限，不適用七日解除權；檔案無法開啟等重大技術瑕疵仍可於 7 日內申請處理。全站付費商品之退款條件現已統一。' },
  { id:'NT-2026-014', date:'2026.09.21', cat:'產品', title:'《看懂一張照片怎麼變小》上架，工程解構系列四本完結',
    body:'工程解構 04《看懂一張照片怎麼變小：你按下傳送之後，它發生了什麼》上架，NT$ 450，36 頁，購買後 7 天內可申請退款。前半本講 JPEG 如何丟掉四分之三的色彩解析度，後半本講影片壓縮與串流。至此工程解構系列四本走完，從電磁波到螢幕畫面的完整路徑，四本各自獨立，沒有閱讀順序限制。' },
  { id:'NT-2026-013', date:'2026.09.21', cat:'產品', title:'新設「日常解構」系列，首兩本上架：藍牙延遲與無線充電',
    body:'《為什麼藍牙耳機會延遲》與《為什麼無線充電這麼慢又這麼燙》同步上架，各 NT$ 400，購買後 7 天內可申請退款。這條線問的是「為什麼它有那個讓我困擾的缺點」，每本最後一章都回答「所以我能做什麼」。' },
  { id:'NT-2026-012', date:'2026.09.17', cat:'產品', title:'工程解構系列新增兩本：晶片與電腦',
    body:'《看懂一顆晶片是怎麼做出來的》（工程解構 02，NT$ 500，41 頁）與《看懂一台電腦怎麼執行你寫的東西》（工程解構 03，NT$ 450，37 頁）同步上架。與系列其餘六本相同，兩本皆為數位內容，發送後不適用七日解除權；檔案無法開啟等重大技術瑕疵仍可於 7 日內申請處理。' },
  { id:'NT-2026-011', date:'2026.09.16', cat:'產品', title:'看懂系列 03 正式上架，新增 BU-03 工程解構系列與一份免費財經入門',
    body:'《看懂錢的流動》（看懂系列 03，NT$ 500，36 頁）正式上架。新設「工程解構」系列，第一本《看懂一支手機怎麼收到訊號》（NT$ 450，37 頁）同步上架。另新增免費資源《七天看懂財經：你可能一直搞錯的七件事》，24 頁，完全免費。全站付費商品之數位內容一經發送存取權限，皆不適用七日解除權；檔案無法開啟等重大技術瑕疵仍可於 7 日內申請處理。' },
  { id:'NT-2026-010', date:'2026.09.06', cat:'產品', title:'《引擎的名字》完整版上架，看懂系列．汽車特輯',
    body:'汽車特輯完整版《引擎的名字：一家巴伐利亞公司的一百年》已上架，NT$ 450，61 頁 PDF + EPUB，十章加尾聲。內容包含兩本免費版之全部章節，另新增 M 部門、M1、X5 與關鍵人物。全書標註出處，不提供購車建議。' },
  { id:'NT-2026-009', date:'2026.09.06', cat:'產品', title:'三份免費資源上架：財經新聞句型解碼表、BMW 兩本短篇研究',
    body:'《財經新聞句型解碼表》（11 頁 PDF）、《BMW：一家飛機引擎廠的一百年》與《BMW 3 系：一輛車的五十年》（各 31 頁與 18 頁 PDF + EPUB）已於 Gumroad 免費開放取得，不需付費或訂閱。三份文件版面偏密，建議以平板或電腦閱讀。' },
  { id:'NT-2026-008', date:'2026.09.02', cat:'產品', title:'「看懂系列」01、02 同步上架，新增 BU-05 財經與商業識讀',
    body:'《看懂財經新聞：50 個關鍵詞》NT$ 600 與《看懂一家公司：從財報看出它撐不撐得住》NT$ 800 已於 Gumroad 上架，兩本各自獨立。本系列歸屬新設之 BU-05 財經與商業識讀業務線；相關內容僅說明名詞定義與制度運作，不構成投資建議。本系列為數位內容，經結帳前明示同意後不適用七日解除權；檔案無法開啟等重大技術瑕疵仍可於 7 日內申請處理。' },
  { id:'NT-2026-007', date:'2026.08.31', cat:'產品', title:'首本數位出版物《一人公司接案工作手冊》上架',
    body:'第一本手冊已於 Gumroad 上架，售價 NT$ 450，首週輸入優惠碼 LAUNCH30 可折 30%。本書為研究整理型作品，全書 14 筆出處標號可查，並依台灣法規查核相關條款。本商品為數位內容，經結帳前明示同意後不適用七日解除權；檔案無法開啟等重大技術瑕疵仍可於 7 日內申請處理。' },
  { id:'NT-2026-006', date:'2026.08.30', cat:'產品', title:'首波產品線籌備進度公告',
    body:'四條產品線之首波數位出版物已進入製作階段。產品金庫已開放瀏覽籌備品項，實際名稱、規格與定價以正式上架公告為準。' },
  { id:'NT-2026-005', date:'2026.08.30', cat:'資安', title:'官方管道辨識與防詐騙聲明',
    body:'Grace Studio 僅透過官方網站與 thegracestudio.tw@gmail.com 進行交易與客服聯繫，絕不會以私訊索取付款資訊、驗證碼或個人證件。任何仿冒本工作室名稱、GS 徽標或海軍藍視覺識別之帳號，均與本工作室無關。' },
  { id:'NT-2026-004', date:'2026.08.30', cat:'智財', title:'授權範圍與數位浮水印溯源聲明',
    body:'本工作室發行之數位資產均內嵌溯源浮水印，綁定購買者之信箱與交易識別碼。檔案僅授予單一使用者之個人使用權；如查獲外流至公開平台或二次轉售，將啟動下架程序並依法追究。' },
  { id:'NT-2026-003', date:'2026.08.30', cat:'政策', title:'數位商品退款政策與猶豫期權利說明',
    body:'依消費性數位內容之特性，商品一經發送存取權限即不受理退款。買方須於結帳前主動勾選確認。檔案存在無法開啟等重大技術瑕疵者，可於 7 日內申請修復或退款。' },
  { id:'NT-2026-002', date:'2026.08.30', cat:'交付', title:'數位商品交付與存取說明',
    body:'付款完成後，存取連結將自動寄至結帳頁填寫之信箱，通常於數分鐘內送達。逾 24 小時未收到請先檢查垃圾信件匣，再來信附上訂單編號，本工作室將協助補寄。' },
  { id:'NT-2026-001', date:'2026.08.30', cat:'站務', title:'Grace Studio 官方網站上線',
    body:'官方網站正式啟用，作為所有產品、公告與法務文件之唯一發布管道。社群平台僅作為內容宣傳，所有交易與正式聲明一律以本站為準。' }
];

  function noticeHTML(n) {
    return '<article class="notice">' +
      '<div><p class="meta">' + n.date + '<br>' + n.id + '</p>' +
      '<p class="badge" style="margin-top:8px">' + n.cat + '</p></div>' +
      '<div><h3 class="h3">' + n.title + '</h3>' +
      '<p class="cn" style="margin-top:14px">' + n.body + '</p></div></article>';
  }

  var homeBox = document.getElementById('home-notices');
  if (homeBox) homeBox.innerHTML = NOTICES.slice(0, 3).map(noticeHTML).join('');
  var allBox = document.getElementById('all-notices');
  if (allBox) allBox.innerHTML = NOTICES.map(noticeHTML).join('');

  /* ══════════ 行動版選單 ══════════ */
  var burger = document.getElementById('burger');
  if (burger) {
    burger.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? '關閉選單' : '開啟選單');
    });
  }

  /* ══════════ 捲動淡入 ══════════ */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.rv');
  if (reduce || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(items, function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    Array.prototype.forEach.call(items, function (el) { io.observe(el); });
  }

  /* ══════════ 購買同意閘門 ══════════
     未勾選同意前，結帳按鈕不可點。
     此為退款政策生效的法律前提，請勿移除。
     新增商品時，於下方 PAIRS 補一組 id。 */
  var PAIRS = [['agree-fh', 'buy-fh'], ['agree-fn', 'buy-fn'],
               ['agree-fs', 'buy-fs'], ['agree-en', 'buy-en'],
               ['agree-hmm', 'buy-hmm'], ['agree-hpr', 'buy-hpr'],
               ['agree-him', 'buy-him'], ['agree-hce', 'buy-hce'],
               ['agree-wbl', 'buy-wbl'], ['agree-wwc', 'buy-wwc'],
               ['agree-his', 'buy-his']];
  PAIRS.forEach(function (pair) {
    var c = document.getElementById(pair[0]), b = document.getElementById(pair[1]);
    if (!c || !b) return;
    function sync() {
      b.toggleAttribute('disabled', !c.checked);
      b.setAttribute('aria-disabled', String(!c.checked));
    }
    c.addEventListener('change', sync);
    sync();
  });

  /* ══════════ Cookie 同意 ══════════
     使用者選「全部接受」後，才可載入 GA4 等分析腳本。 */
  var KEY = 'gs-cookie-consent';
  function readConsent() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function writeConsent(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  var bar = document.getElementById('cookie');
  if (bar) {
    if (!readConsent()) bar.classList.add('show');
    Array.prototype.forEach.call(bar.querySelectorAll('[data-cookie]'), function (b) {
      b.addEventListener('click', function () {
        writeConsent(b.dataset.cookie);
        bar.classList.remove('show');
        /* if (b.dataset.cookie === 'all') { loadAnalytics(); } */
      });
    });
  }

  /* ══════════ 版權年份 ══════════ */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
