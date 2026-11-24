// ./menu3.js  (v7: 메뉴·푸터·칼럼을 관리자(Supabase)에서 불러와 자동 구성)
(function () {

  /* =========================================================================
     [설정 1] 카테고리 목록 페이지 주소
     · 혁신 사례 전용 페이지 파일명이 따로 있다면 CASE_PAGE만 바꾸면 됩니다.
     ========================================================================= */
  const PAGE_INNOVATION = './column.html';
  const PAGE_SPECIAL    = './special-column.html';
  const PAGE_CASE       = './case-column.html';   // ← 혁신 사례 페이지 파일명으로 교체
  const PAGE_SERIES     = './series-column.html'; // ← 대표 연재 칼럼 목록 페이지
  const PAGE_CEO_PROFILE = './ceo-profile.html';   // ← 대표 소개 페이지

  let FEED_CATS = [
    { key: 'innovation', label: '혁신 칼럼', href: PAGE_INNOVATION },
    { key: 'special',    label: '확장 칼럼', href: PAGE_SPECIAL },
    { key: 'case',       label: '혁신 사례', href: PAGE_CASE },
    { key: 'series',     label: '연재 칼럼', href: PAGE_SERIES }
  ];

  /* =========================================================================
     [설정 2] 메뉴에 노출할 칼럼 (제목 / 내용 / 링크 / 썸네일)
     · 여기만 고치면 PC 라이트패널 · PC 메가메뉴 · 모바일 드로어가 한 번에 바뀝니다.
     · 관리자에서 불러오려면 페이지에서 window.NBBIO_COLUMN_FEED를 주입하세요.
       <script>
         window.NBBIO_COLUMN_FEED = {
           endpoint: 'https://xxxx.supabase.co/rest/v1/columns?select=id,title,desc,thumb,category,url,created_at&order=created_at.desc&limit=30',
           headers: { apikey: 'ANON_KEY', Authorization: 'Bearer ANON_KEY' }
         };
       </script>
       (category 값에 '확장/special' → 확장 칼럼, '사례/case' → 혁신 사례, '연재/series' → 연재 칼럼으로 자동 분류)
     ========================================================================= */
  const DEFAULT_ITEMS = {
    innovation: [
      {
        title: '01. 이 시대에 혁신은 선택이 아닌 생존이다',
        desc : '열심히 하는데 결과가 줄어든다면, 노력의 문제가 아니라 비즈니스의 룰이 바뀐 것일 수 있다.',
        url  : './column-1.html',
        thumb: 'https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=1000&auto=format&fit=crop'
      },
      {
        title: '02. 혁신을 위해 꼭 알아야 할 비즈니스의 본질',
        desc : '시대가 바뀌고 기술이 바뀌어도 비즈니스의 본질은 단 한 번도 바뀐 적이 없다.',
        url  : './column-2.html',
        thumb: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop'
      },
      {
        title: '03. 성공하는 비즈니스 혁신의 4가지 형태',
        desc : '성과로 이어진 혁신은 대부분 네 가지 유형 안에서 반복된다.',
        url  : './column-3.html',
        thumb: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1000&auto=format&fit=crop'
      },
      {
        title: '04. 혁신을 위한 진정한 비즈니스의 흐름은 어떻게 읽어내는가?',
        desc : '혁신을 위한 가장 중요한 능력은 시대의 바람을 읽어내는 힘이다.',
        url  : './column-4.html',
        thumb: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1000&auto=format&fit=crop'
      },
      {
        title: '05. 혁신은 아무나 못한다',
        desc : '왜 혁신은 늘 소수의 선택으로 남을까? 혁신을 가로막는 구조적인 장벽이 존재한다.',
        url  : './column-5.html',
        thumb: 'https://biznovalab.com/img/column5-2.jpg'
      },
      {
        title: '06. 혁신은 개인적이지만, 이뤄내는 것은 함께',
        desc : '혁신의 출발은 개인이지만 완주는 시스템과 팀이 만든다.',
        url  : './column-6.html',
        thumb: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop'
      }
    ],

    special: [
    
      {
        title: '혁신의 최종 목적지는 인간과 사회의 행복이다',
        desc : '혁신의 본질은 기술 그 자체에 있지 않다.',
        url  : './special-column2.html',
        thumb: './img/2-4.jpg'
      },
      {
        title: '비즈니스 성공의 6가지 요소',
        desc : '비즈니스 성공에도 분명한 공식이 있다.',
        url  : './special-column3.html',
        thumb: './img/fm.jpg'
      }
    ],

    // ⬇️ 혁신 사례 (case-column.html 목록과 동일하게 관리)
    'case': [
      {
        title: '01. 업타운(와썹타운)에서 배우는 혁신의 공식',
        desc : '평균연령 70대 산골마을에 5년간 6만 명. 관광객을 관계인구로 바꾼 관계혁신.',
        url  : './case-column1.html',
        thumb: './img/case-8.jpg'
      },
      {
        title: '02. 코닝 혁신의 핵심은 집토끼 전략이다',
        desc : '이미 가진 유리 기술로 통신 문제를 풀어 광통신이라는 새 산업을 열다.',
        url  : './case-column2.html',
        thumb: './img/case-1.jpg'
      },
      {
        title: '03. 현대건설 ‘더 뉴 하우스’ 보존의 혁신',
        desc : '이주 없이, 간소하게, 2년 이내에. 철거 대신 필요한 곳만 바꾸는 혁신.',
        url  : './case-column3.html',
        thumb: './img/case-6.jpg'
      },
      {
        title: '04. 빅블러 시대, 경계가 무너지는 혁신',
        desc : '이어폰 · 보청기 · 안경이 ‘더 잘 듣고 싶다’는 하나의 고객문제로 모이다.',
        url  : './case-column4.html',
        thumb: './img/case-9.jpg'
      },
      {
        title: '05. 작은 연결이 나라를 바꾼다',
        desc : '확정일자와 색깔 유도선. 연결 하나로 국가의 사회적 비용을 줄인 두 혁신.',
        url  : './case-column5.html',
        thumb: './img/case-4.jpg'
      },
      {
        title: '06. 제품을 혁신하지 말고 문제를 혁신하라',
        desc : '수영용 샴푸 스타트업 마케마케. 샴푸가 아니라 ‘워터 스트레스’라는 새로운 문제를 정의하다.',
        url  : './case-column6.html',
        thumb: './img/case-14.jpg'
      },
      {
        title: '07. 환율을 혁신한 것이 아니라 금융의 국경을 허물다',
        desc : '트래블로그에서 블록체인 송금, 두나무, 원화 스테이블코인까지. 하나은행이 금융의 경계를 허무는 과정.',
        url  : './case-column7.html',
        thumb: './img/case-3.jpg'
      },
      {
        title: '08. 반도체를 만들지 않고 반도체 산업의 판을 바꾸다',
        desc : '“설계기업이 반드시 공장까지 가져야 하는가?” 질문 하나로 팹리스 시대를 연 모리스 창의 TSMC.',
        url  : './case-column8.html',
        thumb: './img/case-9.jpg'
      }
    ],

    // ⬇️ 연재 칼럼 (series-column.html 목록과 동일하게 관리 · 강영수 대표 연재)
    //    새 연재가 올라가면 아래 형식으로 맨 위에 추가하세요.
    //    { title: '01. 연재 제목', desc: '한 줄 설명', url: './series-column1.html', thumb: './img/series-1.jpg' },
    series: [
    ]
  };

  /* =========================================================================
     [v7] 사이트 데이터 — 관리자(Supabase)에서 메뉴 · 로고 · 칼럼 카테고리 · 칼럼 목록을 불러옵니다.
     · 관리자 [메뉴·푸터] 에서 바꾸면 PC 메뉴 · 전체 메뉴 · 모바일 · 푸터가 함께 바뀝니다.
     · 연결 정보는 ./frontend/supabase-config.js 한 곳에서만 관리합니다(없으면 아래 기본 메뉴로 표시).
     · 방문자 브라우저에 1회분을 저장해 두었다가 먼저 그리고, 새 데이터가 오면 바뀐 경우에만 다시 그립니다.
     ========================================================================= */
  function L(label, href, extra) { return Object.assign({ label: label, href: href, children: [] }, extra || {}); }
  const DEFAULT_MENU = [
    L('연구소', './introduce.html', { children: [
      L('연구소 소개', './introduce.html'), L('대표 인사말', './ceo.html'), L('대표 소개', PAGE_CEO_PROFILE),
      L('비전 & 철학', './vision.html'), L('연혁', './history.html') ] }),
    L('칼럼', PAGE_INNOVATION, { children: [
      L('혁신 칼럼', PAGE_INNOVATION, { feed_key: 'innovation' }), L('확장 칼럼', PAGE_SPECIAL, { feed_key: 'special' }),
      L('혁신 사례', PAGE_CASE, { feed_key: 'case' }), L('연재 칼럼', PAGE_SERIES, { feed_key: 'series' }) ] }),
    L('혁신 광장', './community.html', { children: [
      L('생각 1% 그룹', './community-company.html'), L('혁신 인큐베이션 랩', './innolab.html'), L('혁신 인사이트', './community-solution.html') ] }),
    L('패밀리 사이트', '#', { children: [
      L('HTU GLOBAL', 'https://htuglobal.com/', { new_tab: true }), L('MAXQ', 'https://maxq.kr/', { new_tab: true }),
      L('건강소비자연대', 'http://hcn.or.kr/', { new_tab: true }), L('MD저널', 'https://www.mdjournal.kr/', { new_tab: true }),
      L('ENDO저널', 'https://endo365.kr/', { new_tab: true }), L('당뇨신문', 'https://www.dangnyoshinmun.co.kr/', { new_tab: true }) ] }),
    L('오시는 길', './location.html', { children: [ L('오시는 길', './location.html') ] })
  ];
  let MENU = DEFAULT_MENU;
  let LOGO = { dark: './img/logo-b.png', light: './img/logo-w.png' };

  const BNL = window.BNL_SITE || (window.BNL_SITE = (function () {
    const CACHE_KEY = 'bnl_site_v7';
    function cached() {
      try { const c = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null'); return c && c.data ? c.data : null; } catch (e) { return null; }
    }
    function config() {
      return new Promise(function (res) {
        if (window.BNL_SUPABASE && window.BNL_SUPABASE.url) return res(window.BNL_SUPABASE);
        const s = document.createElement('script');
        s.src = './frontend/supabase-config.js';
        s.onload = function () { res(window.BNL_SUPABASE || null); };
        s.onerror = function () { res(null); };
        document.head.appendChild(s);
        setTimeout(function () { res(window.BNL_SUPABASE || null); }, 4000);
      });
    }
    function rest(c, table, qs) {
      return fetch(c.url + '/rest/v1/' + table + '?' + qs, { headers: { apikey: c.anonKey, Authorization: 'Bearer ' + c.anonKey } })
        .then(function (r) { return r.ok ? r.json() : Promise.reject(new Error(table + ' ' + r.status)); });
    }
    const ready = config().then(function (c) {
      if (!c || !c.url || /x{6,}/.test(c.url)) return null;
      return Promise.all([
        rest(c, 'site_menus', 'select=id,parent_id,label,href,new_tab,show_header,show_mobile,show_footer,feed_key,sort_order&order=sort_order.asc').catch(function () { return null; }),
        rest(c, 'site_settings', 'select=key,value').catch(function () { return null; }),
        rest(c, 'column_categories', 'select=key,label,en_label,list_page,series_name,sort_order&order=sort_order.asc').catch(function () { return null; }),
        rest(c, 'columns', 'select=id,category_key,series,number,title,subtitle,description,thumb,url,file_path,published_at&order=number.asc.nullslast,published_at.asc').catch(function () { return null; })
      ]).then(function (r) {
        const settings = {};
        (r[1] || []).forEach(function (x) { settings[x.key] = x.value; });
        const data = { menus: r[0], settings: settings, categories: r[2], columns: r[3] };
        if (r[0] || r[2] || r[3]) { try { localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), data: data })); } catch (e) {} }
        return data;
      });
    }).catch(function () { return null; });
    return { ready: ready, cached: cached, defaults: function () { return DEFAULT_MENU; } };
  })());

  function treeFrom(rows) {
    if (!Array.isArray(rows) || !rows.length) return null;
    const tops = rows.filter(function (r) { return !r.parent_id; }).sort(function (a, b) { return a.sort_order - b.sort_order; });
    return tops.map(function (t) {
      return Object.assign({}, t, { children: rows.filter(function (r) { return r.parent_id === t.id; }).sort(function (a, b) { return a.sort_order - b.sort_order; }) });
    });
  }
  function applySiteData(d) {
    if (!d) return;
    const t = treeFrom(d.menus);
    if (t) MENU = t;
    const h = (d.settings && d.settings.header) || {};
    LOGO = { dark: h.logo || './img/logo-b.png', light: h.logo_light || './img/logo-w.png' };
    if (Array.isArray(d.categories) && d.categories.length) {
      FEED_CATS = d.categories.map(function (c) { return { key: c.key, label: c.label, href: c.list_page || '#' }; });
    }
  }
  window.BNL_SITE.menu = function () { return MENU; };

  /* ---------- 메뉴 마크업 생성 (PC 상단 · 라이트 패널 · 전체 메뉴 · 모바일) ---------- */
  function vis(it, k) { return it[k] !== false; }
  function aAttr(it) { return ' href="' + esc(it.href || '#') + '"' + (it.new_tab ? ' target="_blank" rel="noopener"' : ''); }
  function isFeed(c) { return !!(c.feed_key && FEED_CATS.some(function (f) { return f.key === c.feed_key; })); }
  function feedOf(t) { const k = (t.children || []).find(isFeed); return k ? k.feed_key : ''; }
  function listOf(t) {
    let first = true;
    return (t.children || []).filter(function (c) { return vis(c, 'show_header'); }).map(function (c) {
      if (isFeed(c)) {
        const on = first; first = false;
        return '<li><a class="is-cf' + (on ? ' is-on' : '') + '"' + aAttr(c) + ' data-cf-cat="' + esc(c.feed_key) + '">' + esc(c.label) + '</a></li>';
      }
      return '<li><a' + aAttr(c) + '>' + esc(c.label) + '</a></li>';
    }).join('');
  }
  function gnbHTML() {
    return MENU.filter(function (t) { return vis(t, 'show_header'); }).map(function (t, i) {
      const kids = (t.children || []).filter(function (c) { return vis(c, 'show_header'); });
      const f = feedOf(t);
      return '<li role="none" data-col="' + i + '"' + (f ? ' data-feedkey="' + esc(f) + '"' : '') + '>' +
        '<a role="menuitem"' + aAttr(t) + '>' + esc(t.label) + '</a>' +
        (kids.length ? '<ul class="dep2" role="menu">' + kids.map(function (c) { return '<li><a' + aAttr(c) + '>' + esc(c.label) + '</a></li>'; }).join('') + '</ul>' : '') +
        '</li>';
    }).join('');
  }
  function liteHTML() {
    return MENU.filter(function (t) { return vis(t, 'show_header'); }).map(function (t) {
      return '<div><h4>' + esc(t.label) + '</h4><ul>' + listOf(t) + '</ul></div>';
    }).join('');
  }
  function megaHTML() {
    return MENU.filter(function (t) { return vis(t, 'show_header'); }).map(function (t, i) {
      return '<div class="col" data-col="' + i + '"><h3>' + esc(t.label) + '</h3><ul>' + listOf(t) + '</ul></div>';
    }).join('');
  }
  function mobileHTML() {
    return MENU.filter(function (t) { return vis(t, 'show_mobile'); }).map(function (t) {
      const kids = (t.children || []).filter(function (c) { return vis(c, 'show_mobile'); });
      const inner = feedOf(t)
        ? feedBlockHTML('cf-mobile')
        : (kids.length ? kids.map(function (c) { return '<a' + aAttr(c) + '>' + esc(c.label) + '</a>'; }).join('') : '<a' + aAttr(t) + '>' + esc(t.label) + '</a>');
      return '<details><summary>' + esc(t.label) + ' <span class="chev"></span></summary><div class="gs2">' + inner + '</div></details>';
    }).join('');
  }

  /* =========================================================================
     [v7] 페이지 훅
     ① 칼럼·연재 글 하단에 "같은 연재 전체 목록 + 이전/다음 글" 자동 연결
     ② 칼럼 목록 페이지(column.html 등)에 관리자에서 새로 발행한 글 카드 자동 추가
     ========================================================================= */
  function curFile() {
    try { return decodeURIComponent(location.pathname.split('/').pop() || 'index.html'); } catch (e) { return 'index.html'; }
  }
  function stripDot(u) { return String(u || '').replace(/^\.\//, '').replace(/^\//, '').split(/[?#]/)[0]; }

  function runPageHooks(d) {
    if (!d || !Array.isArray(d.columns)) return;
    try { seriesHook(d); } catch (e) { console.warn('[BNL series]', e); }
    try { listHook(d); } catch (e) { console.warn('[BNL list]', e); }
  }

  function seriesHook(d) {
    const file = curFile();
    const me = d.columns.find(function (c) { return c.file_path === file; });
    if (!me || document.getElementById('bnlSeriesList')) return;
    const cat = (d.categories || []).find(function (c) { return c.key === me.category_key; }) || { label: '칼럼', list_page: '#' };
    const same = d.columns.filter(function (c) { return me.series ? c.series === me.series : c.category_key === me.category_key; });
    if (same.length < 2) return;
    const idx = same.indexOf(me);
    const prev = same[idx - 1], next = same[idx + 1];
    const num = function (c, i) { return String(c.number != null ? c.number : i + 1).padStart(2, '0'); };
    const card = function (c, tag) {
      return c ? '<a class="bsl-step' + (tag === 'NEXT' ? ' is-next' : '') + '" href="' + esc(c.url || './' + c.file_path) + '"><small>' + tag + '</small><strong>' + esc(c.title) + '</strong></a>'
               : '<span class="bsl-step is-empty"><small>' + tag + '</small><strong>' + (tag === 'NEXT' ? '다음 글 준비 중' : '첫 번째 글입니다') + '</strong></span>';
    };
    const sec = document.createElement('section');
    sec.id = 'bnlSeriesList';
    sec.setAttribute('aria-label', '연재 목록');
    sec.innerHTML =
      '<style>' +
      '#bnlSeriesList{--a:#ff4d00;background:#0b0b0c;color:#fff;font-family:Pretendard,"Noto Sans KR",system-ui,sans-serif;word-break:keep-all;padding:clamp(64px,8vw,110px) 20px}' +
      '#bnlSeriesList *{box-sizing:border-box}' +
      '#bnlSeriesList .bsl-wrap{max-width:1100px;margin:0 auto}' +
      '#bnlSeriesList .bsl-head{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;flex-wrap:wrap;padding-bottom:22px;border-bottom:1px solid #222}' +
      '#bnlSeriesList .bsl-eye{display:block;color:var(--a);font-size:12px;font-weight:900;letter-spacing:4px;text-transform:uppercase;margin-bottom:12px}' +
      '#bnlSeriesList h2{margin:0;font-size:clamp(1.5rem,3vw,2.1rem);font-weight:800;letter-spacing:-.03em;line-height:1.3}' +
      '#bnlSeriesList h2 small{font-size:.5em;font-weight:600;color:#888;margin-left:10px;letter-spacing:0}' +
      '#bnlSeriesList .bsl-all{color:#bbb;font-size:14px;font-weight:700;text-decoration:none;border-bottom:1px solid #444;padding-bottom:2px}' +
      '#bnlSeriesList .bsl-all:hover{color:#fff;border-color:var(--a)}' +
      '#bnlSeriesList .bsl-steps{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:26px 0 34px}' +
      '#bnlSeriesList .bsl-step{display:block;padding:20px 22px;border:1px solid #232323;border-radius:10px;background:#111;color:#fff;text-decoration:none;transition:border-color .2s}' +
      '#bnlSeriesList .bsl-step.is-next{text-align:right}' +
      '#bnlSeriesList a.bsl-step:hover{border-color:var(--a)}' +
      '#bnlSeriesList .bsl-step small{display:block;font-size:11px;font-weight:900;letter-spacing:3px;color:var(--a);margin-bottom:8px}' +
      '#bnlSeriesList .bsl-step strong{font-size:16px;line-height:1.5;font-weight:700}' +
      '#bnlSeriesList .bsl-step.is-empty{opacity:.45}' +
      '#bnlSeriesList ol{list-style:none;margin:0;padding:0;border-top:1px solid #222}' +
      '#bnlSeriesList li a{display:grid;grid-template-columns:56px 96px 1fr auto;gap:18px;align-items:center;padding:16px 6px;border-bottom:1px solid #1d1d1d;color:#ddd;text-decoration:none;transition:background .2s}' +
      '#bnlSeriesList li a:hover{background:#121212}' +
      '#bnlSeriesList .n{font-size:13px;font-weight:900;color:#666;letter-spacing:1px}' +
      '#bnlSeriesList .t{width:96px;aspect-ratio:16/10;border-radius:6px;overflow:hidden;background:#1a1a1a}' +
      '#bnlSeriesList .t img{width:100%;height:100%;object-fit:cover;display:block}' +
      '#bnlSeriesList .x b{display:block;font-size:16px;font-weight:700;line-height:1.45;color:#fff}' +
      '#bnlSeriesList .x small{display:block;margin-top:4px;font-size:13px;color:#8a8a8a;line-height:1.5;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}' +
      '#bnlSeriesList .pill{font-size:11px;font-weight:800;color:#000;background:var(--a);border-radius:20px;padding:4px 10px;white-space:nowrap}' +
      '#bnlSeriesList li.is-cur a{background:#140d09}' +
      '#bnlSeriesList li.is-cur .n{color:var(--a)}' +
      '@media(max-width:640px){#bnlSeriesList .bsl-steps{grid-template-columns:1fr}#bnlSeriesList .bsl-step.is-next{text-align:left}#bnlSeriesList li a{grid-template-columns:40px 72px 1fr;gap:12px}#bnlSeriesList .t{width:72px}#bnlSeriesList .pill{display:none}}' +
      '</style>' +
      '<div class="bsl-wrap">' +
        '<div class="bsl-head"><div><span class="bsl-eye">' + esc(cat.label) + (me.series ? ' · SERIES' : '') + '</span>' +
        '<h2>' + esc(me.series || cat.label) + '<small>전체 ' + same.length + '편</small></h2></div>' +
        '<a class="bsl-all" href="' + esc(cat.list_page || '#') + '">목록 전체 보기 →</a></div>' +
        '<div class="bsl-steps">' + card(prev, 'PREV') + card(next, 'NEXT') + '</div>' +
        '<ol>' + same.map(function (c, i) {
          const cur = c === me;
          return '<li' + (cur ? ' class="is-cur"' : '') + '><a href="' + esc(c.url || './' + c.file_path) + '"' + (cur ? ' aria-current="page"' : '') + '>' +
            '<span class="n">' + num(c, i) + '</span>' +
            '<span class="t">' + (c.thumb ? '<img src="' + esc(c.thumb) + '" alt="" loading="lazy" onerror="this.remove()">' : '') + '</span>' +
            '<span class="x"><b>' + esc(c.title) + '</b>' + (c.description ? '<small>' + esc(c.description) + '</small>' : '') + '</span>' +
            (cur ? '<span class="pill">읽는 중</span>' : '<span></span>') +
            '</a></li>';
        }).join('') + '</ol>' +
      '</div>';
    const foot = document.getElementById('footer_template');
    if (foot && foot.parentNode) foot.parentNode.insertBefore(sec, foot);
    else document.body.appendChild(sec);
    /* 손으로 넣어 둔 이전/다음·다른 칼럼 영역은 자동 목록으로 대체 */
    ['col-slider'].forEach(function (id) { const el = document.getElementById(id); if (el) el.style.display = 'none'; });
    document.querySelectorAll('.series-nav, .next-preview').forEach(function (el) { el.style.display = 'none'; });
  }

  function listHook(d) {
    const file = curFile();
    const cat = (d.categories || []).find(function (c) { return stripDot(c.list_page) === file; });
    const box = document.getElementById('h-banner-container');
    if (!cat || !box) return;
    const items = d.columns.filter(function (c) { return c.category_key === cat.key; });
    const have = {};
    box.querySelectorAll('a.h-banner').forEach(function (a) { have[stripDot(a.getAttribute('href'))] = true; });
    const add = items.filter(function (c) { return !have[stripDot(c.url || c.file_path)]; });
    if (!add.length) return;
    const sample = box.querySelector('a.h-banner');
    add.forEach(function (c, i) {
      let card;
      if (sample) {
        card = sample.cloneNode(true);
        card.className = card.className.replace(/\bbanner-\d+\b/g, '').replace(/\bh-hidden\b/g, '').trim();
        card.removeAttribute('data-category');
        card.style.display = ''; card.style.opacity = ''; card.style.transform = '';
        card.querySelectorAll('.cs-lock, .h-lock, .lock').forEach(function (el) { el.remove(); });
      } else {
        card = document.createElement('a');
        card.className = 'h-banner';
        card.innerHTML = '<span class="h-num"></span><div class="h-banner-content"><h3 class="h-dummy-title"></h3><span class="h-cat"></span><p class="h-banner-text"></p><span class="h-more">자세히 보기 <span class="arrow">→</span></span></div>';
      }
      const n = String(c.number != null ? c.number : (box.querySelectorAll('a.h-banner').length + i + 1)).padStart(2, '0');
      card.setAttribute('href', c.url || ('./' + c.file_path));
      card.setAttribute('aria-label', c.title + '(으)로 이동');
      const q = function (sel) { return card.querySelector(sel); };
      if (q('.h-num')) q('.h-num').textContent = n;
      if (q('.h-dummy-title')) q('.h-dummy-title').textContent = (sample && !q('.h-num') ? n + '. ' : '') + c.title;
      if (q('.h-banner-text')) q('.h-banner-text').textContent = c.description || c.subtitle || '';
      if (q('.h-cat')) { if (c.series || c.subtitle) q('.h-cat').textContent = c.series || ''; else q('.h-cat').remove(); }
      if (c.thumb) { card.setAttribute('data-thumb', c.thumb); card.style.setProperty('--h-bg', 'url("' + String(c.thumb).replace(/"/g, '%22') + '")'); }
      box.appendChild(card);
    });
    box.style.display = '';
    const empty = document.getElementById('sr-empty');
    if (empty) empty.hidden = true;
  }

  const FEED_CFG = window.NBBIO_COLUMN_FEED || {};
  const FEED_LIMIT = FEED_CFG.limit || 7;   // 카테고리별 최대 보관 개수

  // 패널별 노출 개수
  const COUNT_LITE   = 3;   // PC 호버 패널
  const COUNT_MEGA   = 6;   // PC 햄버거 메가메뉴
  const COUNT_MOBILE = 4;   // 모바일 드로어

  /* ---------- 피드 데이터 로더 ---------- */
  let feedPromise = null;

  function pick(obj, keys) {
    for (const k of keys) {
      if (obj && obj[k] != null && obj[k] !== '') return obj[k];
    }
    return '';
  }

  function catKeyOf(v) {
    const s = String(v || '');
    if (/연재|series/i.test(s)) return 'series';
    if (/사례|case/i.test(s)) return 'case';
    if (/확장|special|expand/i.test(s)) return 'special';
    return 'innovation';
  }

  function normalizeRow(row) {
    if (!row || typeof row !== 'object') return null;
    const title = String(pick(row, ['title', 'subject', 'name', 'headline'])).trim();
    if (!title) return null;
    const id = pick(row, ['id', 'uuid', 'slug', 'no', 'idx']);
    let url = pick(row, ['url', 'link', 'href', 'permalink']);
    if (!url) url = id ? './column-view.html?id=' + encodeURIComponent(id) : PAGE_INNOVATION;
    return {
      title,
      url,
      desc : String(pick(row, ['desc', 'description', 'summary', 'excerpt', 'subtitle', 'text'])).trim(),
      thumb: pick(row, ['thumb', 'thumbnail', 'thumb_url', 'thumbnail_url', 'image', 'image_url', 'img', 'cover', 'cover_url', 'og_image']),
      date : String(pick(row, ['date', 'created_at', 'published_at', 'reg_date', 'createdAt'])).slice(0, 10),
      cat  : pick(row, ['category', 'cat', 'type', 'board', 'section'])
    };
  }

  function groupItems(rows) {
    const out = {};
    FEED_CATS.forEach(c => { out[c.key] = []; });
    ['innovation', 'special', 'case', 'series'].forEach(k => { if (!out[k]) out[k] = []; });
    (rows || []).forEach(row => {
      const it = normalizeRow(row);
      if (!it) return;
      const key = out[it.cat] ? it.cat : catKeyOf(it.cat || it.url);
      if (!out[key]) out[key] = [];
      if (out[key].length < FEED_LIMIT) out[key].push(it);
    });
    Object.keys(out).forEach(k => {
      if (!out[k].length) out[k] = (DEFAULT_ITEMS[k] || []).slice(0, FEED_LIMIT);
    });
    return out;
  }

  function loadColumns() {
    if (feedPromise) return feedPromise;
    if (Array.isArray(FEED_CFG.data)) { feedPromise = Promise.resolve(groupItems(FEED_CFG.data)); return feedPromise; }
    feedPromise = BNL.ready.then(function (d) {
      const rows = (d && Array.isArray(d.columns)) ? d.columns.slice().reverse().map(function (c) {
        return { title: c.title, desc: c.description, url: c.url || ('./' + c.file_path), thumb: c.thumb, date: c.published_at, category: c.category_key };
      }) : [];
      return groupItems(rows);
    }).catch(function () { return groupItems([]); });
    return feedPromise;
  }

  /* ---------- 피드 마크업 ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[m]));
  }

  function feedBlockHTML(extraClass) {
    const tabs = FEED_CATS.map((c, i) =>
      `<button class="cf-tab${i === 0 ? ' is-on' : ''}" type="button" data-cat="${c.key}" aria-pressed="${i === 0}">${c.label}</button>`
    ).join('');
    return `
      <div class="colfeed ${extraClass || ''}" data-feed>
        <div class="cf-head">
          <div class="cf-tabs" aria-label="칼럼 분류">${tabs}</div>
          <a class="cf-more" href="${FEED_CATS[0].href}">혁신 칼럼 전체 보기</a>
        </div>
        <div class="cf-list" data-cf-list aria-live="polite"></div>
      </div>`;
  }

  function skeletonHTML(n) {
    let html = '';
    for (let i = 0; i < n; i++) {
      html += '<span class="cf-card is-skeleton"><span class="cf-thumb"></span><span class="cf-body"><span class="cf-line"></span><span class="cf-line short"></span></span></span>';
    }
    return html;
  }

  function cardHTML(item, label) {
    const img = item.thumb
      ? `<img src="${esc(item.thumb)}" alt="" loading="lazy" onerror="this.remove()">`
      : '';
    const desc = item.desc ? `<span class="cf-desc">${esc(item.desc)}</span>` : '';
    const date = item.date ? `<span class="cf-meta">${esc(item.date)}</span>` : '';
    return `<a class="cf-card" href="${esc(item.url)}">
      <span class="cf-thumb">${img}<span class="cf-badge">${esc(label)}</span></span>
      <span class="cf-body"><span class="cf-tit">${esc(item.title)}</span>${desc}${date}</span>
    </a>`;
  }

  // 1) 헤더 전체 HTML 템플릿 (#nbbioHeaderLocal + 스타일 + 구조) — 메뉴 부분은 데이터로 생성
  function headerTemplate() { return `
<section id="nbbioHeaderLocal" aria-label="NBBIO Global Navigation">
  <style>
    /* ============== Scope: #nbbioHeaderLocal only ============== */
    #nbbioHeaderLocal{
      --ink:#0b1220; --muted:#3b3f45; --brand:#0a6a62; --brand-soft:#eaf3f1;
      --line:#e8ecef; --bg:#f6f7f8; --white:#fff; --overlay:rgba(0,0,0,.55);
      --z:20000; --shadow:0 12px 30px rgba(16,24,40,.12);
      font-family:Pretendard,"Noto Sans KR",system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
      position:relative;
      z-index:100;
    }

    /* Header bar */
    #nbbioHeaderLocal .bar{
      position:fixed;top:0;left:0;right:0;
      z-index:var(--z);
      background:var(--white);
      border-bottom:1px solid var(--line);
      transition:transform .3s ease, background-color .26s ease, border-color .26s ease;
    }
    #nbbioHeaderLocal.scroll-down .bar{transform:translateY(-100%);}
    #nbbioHeaderLocal.scroll-up .bar{transform:translateY(0);}

    /* 최상단(0~30px) 투명 모드 */
    #nbbioHeaderLocal.at-top .bar{background:transparent;border-color:transparent;}

    #nbbioHeaderLocal.at-top .bar:hover{ background:var(--white); border-color:var(--line); }
    #nbbioHeaderLocal.at-top .bar:hover .gnb>li>a{ color:var(--ink); }
    #nbbioHeaderLocal.at-top .bar:hover .gnb>li:hover>a,
    #nbbioHeaderLocal.at-top .bar:hover .gnb>li:focus-within>a,
    #nbbioHeaderLocal.at-top .bar:hover .gnb>li.is-on>a{ color:var(--brand); }
    #nbbioHeaderLocal.at-top .bar:hover .globeBtn{ background:var(--white); border-color:var(--line); }
    #nbbioHeaderLocal.at-top .bar:hover .menuBtn{ background:var(--white); border-color:var(--line); }
    #nbbioHeaderLocal.at-top .bar:hover .menuBtn i,
    #nbbioHeaderLocal.at-top .bar:hover .menuBtn i::before,
    #nbbioHeaderLocal.at-top .bar:hover .menuBtn i::after{ background:#111; }
    #nbbioHeaderLocal.at-top .bar:hover .globeBtn svg circle,
    #nbbioHeaderLocal.at-top .bar:hover .globeBtn svg path{ stroke:#0b1220; }

    #nbbioHeaderLocal.at-top.hovering .bar{
      background:var(--white);
      border-color:var(--line);
    }
    #nbbioHeaderLocal.at-top.hovering .gnb>li>a{color:var(--ink);}
    #nbbioHeaderLocal.at-top.hovering .gnb>li:hover>a,
    #nbbioHeaderLocal.at-top.hovering .gnb>li:focus-within>a,
    #nbbioHeaderLocal.at-top.hovering .gnb>li.is-on>a{color:var(--brand);}
    #nbbioHeaderLocal.at-top.hovering .globeBtn,
    #nbbioHeaderLocal.at-top.hovering .menuBtn{background:var(--white);border-color:var(--line);}
    #nbbioHeaderLocal.at-top.hovering .menuBtn i,
    #nbbioHeaderLocal.at-top.hovering .menuBtn i::before,
    #nbbioHeaderLocal.at-top.hovering .menuBtn i::after{background:#111;}
    #nbbioHeaderLocal.at-top.hovering .globeBtn svg circle,
    #nbbioHeaderLocal.at-top.hovering .globeBtn svg path{stroke:#0b1220;}

    #nbbioHeaderLocal .wrap{
      max-width:1820px;margin:0 auto;padding:16px 20px;
      display:flex;align-items:center;justify-content:space-between;gap:14px;
    }
    #nbbioHeaderLocal .logo img{display:block;height:36px;width:auto;}

    /* GNB */
    #nbbioHeaderLocal nav{display:flex;gap:24px;flex-direction: column;}
    #nbbioHeaderLocal .gnb{display:flex;gap:76px;margin:0;padding:0;}
    #nbbioHeaderLocal .gnb>li{list-style:none;position:relative;}
    #nbbioHeaderLocal .gnb>li>a{
      display:block;padding:10px 6px;font-weight:700;color:var(--ink);
      letter-spacing:-.2px;text-decoration:none;transition:color .26s ease;
    }
    #nbbioHeaderLocal .gnb>li:hover>a,
    #nbbioHeaderLocal .gnb>li:focus-within>a,
    #nbbioHeaderLocal .gnb>li.is-on>a{color:var(--brand);}

    #nbbioHeaderLocal.at-top .gnb>li>a{color:#fff;}
    #nbbioHeaderLocal.at-top .gnb>li:hover>a,
    #nbbioHeaderLocal.at-top .gnb>li:focus-within>a,
    #nbbioHeaderLocal.at-top .gnb>li.is-on>a{color:#fff;}

    /* 2뎁스 드롭다운 */
    #nbbioHeaderLocal .dep2{
      position:absolute;left:0;top:100%;min-width:190px;border:1px solid var(--line);
      border-radius:10px;background:#fff;box-shadow:var(--shadow);overflow:hidden;
      transform-origin:0 0;transform:scale(.98) translateY(6px);opacity:0;visibility:hidden;
      transition:transform .18s ease,opacity .18s ease,visibility .18s ease;
    }
    #nbbioHeaderLocal .dep2 a{display:block;padding:11px 14px;color:var(--ink);white-space:nowrap;font-size:14px;text-decoration:none;}
    #nbbioHeaderLocal .dep2 a:hover{background:#f7fafc;color:var(--brand);}
    #nbbioHeaderLocal .gnb>li:hover .dep2,#nbbioHeaderLocal .gnb>li:focus-within .dep2{opacity:1;visibility:visible;transform:scale(1) translateY(0);}

    /* Right actions */
    #nbbioHeaderLocal .actions{display:flex;align-items:center;gap:12px;}
    #nbbioHeaderLocal .globeBtn{
      width:36px;height:36px;border:1px solid var(--line);border-radius:10px;
      background:var(--white);display:grid;place-items:center;cursor:pointer;
      transition:background-color .26s ease, border-color .26s ease;
      display:none;
    }
    #nbbioHeaderLocal .menuBtn{
      width:42px;height:36px;border:1px solid var(--line);border-radius:10px;
      background:var(--white);cursor:pointer;position:relative;
      transition:background-color .26s ease, border-color .26s ease;
    }
    #nbbioHeaderLocal .menuBtn i,#nbbioHeaderLocal .menuBtn i::before,#nbbioHeaderLocal .menuBtn i::after{
      content:"";position:absolute;left:8px;right:8px;height:2px;background:#111;transition:.24s ease;
    }
    #nbbioHeaderLocal .menuBtn i{top:50%;transform:translateY(-50%);}
    #nbbioHeaderLocal .menuBtn i::before{top:-8px;}
    #nbbioHeaderLocal .menuBtn i::after{top:8px;}
    #nbbioHeaderLocal .menuBtn[aria-expanded="true"] i{background:transparent;}
    #nbbioHeaderLocal .menuBtn[aria-expanded="true"] i::before{top:0;transform:rotate(45deg);}
    #nbbioHeaderLocal .menuBtn[aria-expanded="true"] i::after{top:0;transform:rotate(-45deg);}

    #nbbioHeaderLocal.at-top .globeBtn{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.4);}
    #nbbioHeaderLocal.at-top .menuBtn{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.4);}
    #nbbioHeaderLocal.at-top .menuBtn i,#nbbioHeaderLocal.at-top .menuBtn i::before,#nbbioHeaderLocal.at-top .menuBtn i::after{background:#fff;}
    #nbbioHeaderLocal.at-top .globeBtn svg circle,#nbbioHeaderLocal.at-top .globeBtn svg path{stroke:#fff;}

    /* Hover bottom bar */
    #nbbioHeaderLocal .down{transform-origin:top;transform:scaleY(0);transition:transform .18s ease;background:#fff;border-bottom:1px solid var(--line);}
    #nbbioHeaderLocal .header.act .down{transform:scaleY(1);}

    /* ===================== HOVER LIGHT PANEL (PC) ===================== */
    #nbbioHeaderLocal .megalite{
      position:absolute; left:0; right:0; top:100%;
      background:#fff; border-bottom:1px solid var(--line); box-shadow:var(--shadow);
      opacity:0; transform:translateY(-6px); visibility:hidden; pointer-events:none;
      transition:opacity .26s ease, transform .26s ease, visibility .26s ease;
      max-height:calc(100vh - 76px); overflow:auto;
    }
    #nbbioHeaderLocal .megalite.act{opacity:1; transform:translateY(0); visibility:visible; pointer-events:auto;}
    #nbbioHeaderLocal .megalite .inner{max-width:1440px;margin:0 auto;padding:24px 40px 28px;}
    #nbbioHeaderLocal .megalite .grid{display:grid;grid-template-columns:repeat(5,minmax(160px,1fr));gap:60px;}
    #nbbioHeaderLocal .megalite h4{margin:0 0 10px;font-size:18px;letter-spacing:-.2px;color:#111;font-weight:800;}
    #nbbioHeaderLocal .megalite ul{margin:0;padding:0;list-style:none;}
    #nbbioHeaderLocal .megalite li a{display:block;padding:6px 0;color:#111;text-decoration:none;transition:color .2s ease;}
    #nbbioHeaderLocal .megalite li a:hover{color:var(--brand);}

    /* ▶ 선택된 칼럼 카테고리 링크: 흰색이 아니라 브랜드 그린 */
    #nbbioHeaderLocal .megalite li a.is-cf.is-on,
    #nbbioHeaderLocal .mega .col li a.is-cf.is-on{color:var(--brand);font-weight:700;}

    /* ===================== COLUMN FEED (제목 + 내용 + 썸네일) ===================== */
    /* PC: 기본은 숨김 — '혁신 칼럼 / 확장 칼럼 / 혁신 사례'에 마우스를 올렸을 때만 노출 */
    #nbbioHeaderLocal .colfeed{display:none;margin-top:26px;padding-top:20px;border-top:1px solid var(--line);}
    #nbbioHeaderLocal .colfeed.is-open{display:block;animation:nbbioCfFade .24s ease;}
    @keyframes nbbioCfFade{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
    #nbbioHeaderLocal .cf-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0 0 16px;flex-wrap:wrap;}
    #nbbioHeaderLocal .cf-tabs{display:flex;gap:8px;flex-wrap:wrap;}
    #nbbioHeaderLocal .cf-tab{
      appearance:none;-webkit-appearance:none;font:inherit;font-size:14px;font-weight:700;line-height:1;
      padding:9px 16px;border-radius:999px;border:1px solid var(--line);background:#fff;color:var(--muted);
      cursor:pointer;transition:background-color .2s ease,border-color .2s ease,color .2s ease;
    }
    #nbbioHeaderLocal .cf-tab:hover{color:var(--brand);border-color:var(--brand);}
    /* ▶ 선택 상태: 초록 글씨 + 초록 테두리 (흰 글씨 아님) */
    #nbbioHeaderLocal .cf-tab.is-on{background:var(--brand-soft);border-color:var(--brand);color:var(--brand);}
    #nbbioHeaderLocal .cf-tab:focus-visible{outline:2px solid var(--brand);outline-offset:2px;}
    #nbbioHeaderLocal .cf-more{font-size:14px;font-weight:700;color:var(--brand);text-decoration:none;white-space:nowrap;}
    #nbbioHeaderLocal .cf-more:hover{text-decoration:underline;}

    #nbbioHeaderLocal .cf-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;}
    #nbbioHeaderLocal .cf-card{display:block;text-decoration:none;color:inherit;}
    #nbbioHeaderLocal .cf-thumb{
      display:block;position:relative;width:100%;aspect-ratio:16/10;border-radius:12px;overflow:hidden;
      background:linear-gradient(135deg,#e7eeec,#dbe4e3);
    }
    #nbbioHeaderLocal .cf-thumb img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s ease;}
    #nbbioHeaderLocal .cf-card:hover .cf-thumb img{transform:scale(1.05);}
    #nbbioHeaderLocal .cf-badge{
      position:absolute;left:8px;top:8px;background:rgba(10,106,98,.92);color:#fff;
      font-size:11px;font-weight:700;line-height:1;padding:6px 9px;border-radius:999px;letter-spacing:-.2px;
    }
    #nbbioHeaderLocal .cf-body{display:block;}
    #nbbioHeaderLocal .cf-tit{
      display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
      margin:12px 0 6px;font-size:15px;font-weight:700;line-height:1.45;color:#111;letter-spacing:-.2px;
      transition:color .2s ease;word-break:keep-all;
    }
    #nbbioHeaderLocal .cf-card:hover .cf-tit{color:var(--brand);}
    #nbbioHeaderLocal .cf-desc{
      display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
      font-size:13px;line-height:1.55;color:#5b6b86;letter-spacing:-.2px;word-break:keep-all;
    }
    #nbbioHeaderLocal .cf-meta{display:block;margin-top:6px;font-size:12px;color:#8b9299;}

    /* 로딩 스켈레톤 */
    #nbbioHeaderLocal .cf-card.is-skeleton{pointer-events:none;}
    #nbbioHeaderLocal .cf-card.is-skeleton .cf-thumb{
      background:linear-gradient(90deg,#eef1f3 25%,#e2e8ea 37%,#eef1f3 63%);
      background-size:400% 100%;animation:nbbioCfShimmer 1.2s ease infinite;
    }
    #nbbioHeaderLocal .cf-line{display:block;height:12px;border-radius:6px;background:#eef1f3;margin-top:12px;}
    #nbbioHeaderLocal .cf-line.short{width:60%;margin-top:8px;}
    @keyframes nbbioCfShimmer{0%{background-position:100% 0}100%{background-position:0 0}}

    @media (prefers-reduced-motion:reduce){
      #nbbioHeaderLocal .cf-thumb img,#nbbioHeaderLocal .cf-tit{transition:none;}
      #nbbioHeaderLocal .cf-card.is-skeleton .cf-thumb{animation:none;}
    }

    /* 모바일(드로어) 변형: 가로형 카드 */
    #nbbioHeaderLocal .colfeed.cf-mobile{display:block;margin-top:2px;padding-top:14px;border-top:1px solid #eceff2;}
    #nbbioHeaderLocal .colfeed.cf-mobile .cf-head{margin-bottom:14px;}
    #nbbioHeaderLocal .colfeed.cf-mobile .cf-tab{font-size:13px;padding:9px 13px;}
    #nbbioHeaderLocal .colfeed.cf-mobile .cf-list{grid-template-columns:1fr;gap:14px;}
    #nbbioHeaderLocal .colfeed.cf-mobile .cf-card{display:grid;grid-template-columns:112px minmax(0,1fr);gap:14px;align-items:center;}
    #nbbioHeaderLocal .colfeed.cf-mobile .cf-thumb{aspect-ratio:4/3;border-radius:10px;}
    #nbbioHeaderLocal .colfeed.cf-mobile .cf-badge{left:6px;top:6px;font-size:10px;padding:5px 7px;}
    #nbbioHeaderLocal .colfeed.cf-mobile .cf-tit{margin:0 0 4px;font-size:15px;}
    #nbbioHeaderLocal .colfeed.cf-mobile .cf-desc{-webkit-line-clamp:2;font-size:13px;}
    #nbbioHeaderLocal .colfeed.cf-mobile .cf-line{margin-top:0;}
    #nbbioHeaderLocal .colfeed.cf-mobile .cf-line.short{margin-top:8px;}

    /* 드로어 내부 링크 기본 스타일 무력화 */
    #nbbioHeaderLocal .gs2 .colfeed a{padding:0;font-size:inherit;}
    #nbbioHeaderLocal .gs2 .colfeed .cf-more{padding:2px 0;}

    /* ===================== MEGA MENU (햄버거 전용, 풀스크린) ===================== */
    #nbbioHeaderLocal .mega{position:fixed;inset:0;display:block;z-index:var(--z);pointer-events:none;visibility:hidden;}
    #nbbioHeaderLocal .mega .scrim{position:absolute;inset:0;background:var(--overlay);opacity:0;transition:opacity .28s ease;}
    #nbbioHeaderLocal .mega .panel{position:absolute;inset:0;background:#f5f6f7;opacity:0;transform:translateY(-10px);transition:opacity .32s ease,transform .32s ease;overflow:auto;}
    #nbbioHeaderLocal .mega .inner{max-width:1440px;margin:0 auto;padding:80px 40px 60px;min-height:100%;display:flex;flex-direction:column;}
    #nbbioHeaderLocal .mega .topline{display:flex;align-items:center;justify-content:space-between;gap:12px;padding-bottom:20px;}
    #nbbioHeaderLocal .mega .topline .brand{display:flex;align-items:center;gap:12px;}
    #nbbioHeaderLocal .mega .topline .brand img{height:32px;}
    #nbbioHeaderLocal .mega .icons{display:flex;gap:16px;align-items:center;}
    #nbbioHeaderLocal .mega .iconBtn{width:36px;height:36px;border:1px solid var(--line);border-radius:10px;background:var(--white);display:grid;place-items:center;cursor:pointer;}
    #nbbioHeaderLocal .mega .grid{display:grid;grid-template-columns:repeat(5,minmax(200px,1fr));gap:60px;margin-top:40px;}
    #nbbioHeaderLocal .mega .col h3{font-size:28px;line-height:1.2;letter-spacing:-.4px;font-weight:900;color:#111;margin:0 0 18px;}
    #nbbioHeaderLocal .mega .col ul{margin:0;padding:0;list-style:none;}
    #nbbioHeaderLocal .mega .col li a{display:block;padding:10px 0;color:#111;text-decoration:none;font-size:16px;transition:color .2s ease;}
    #nbbioHeaderLocal .mega .col li a:hover{color:var(--brand);}
    #nbbioHeaderLocal .mega .colfeed{margin-top:44px;border-top-color:#e2e6e8;}
    #nbbioHeaderLocal .mega .colfeed .cf-tab{background:#fff;}
    #nbbioHeaderLocal .mega .colfeed .cf-tab.is-on{background:var(--brand-soft);color:var(--brand);border-color:var(--brand);}
    #nbbioHeaderLocal .mega .watermark{position:absolute;right:40px;bottom:34px;opacity:.08;}
    #nbbioHeaderLocal .mega .watermark svg{width:220px;height:auto;}
    #nbbioHeaderLocal .mega.act{visibility:visible;pointer-events:auto;}
    #nbbioHeaderLocal .mega.act .scrim{opacity:1;}
    #nbbioHeaderLocal .mega.act .panel{opacity:1;transform:translateY(0);}

    @media (max-width:1439.98px){
      #nbbioHeaderLocal .mega .watermark{display:none;}
      #nbbioHeaderLocal .megalite .grid,#nbbioHeaderLocal .mega .grid{gap:36px;}
    }

    /* ===================== MOBILE DRAWER ===================== */
    #nbbioHeaderLocal .overlay{position:fixed;inset:0;background:var(--overlay);display:none;z-index:calc(var(--z) - 1);}
    #nbbioHeaderLocal .overlay.act{display:block;}
    #nbbioHeaderLocal .drawer{
      position:fixed; inset:0 0 0 auto; width:min(480px,94vw);
      background:#ffffff; transform:translateX(100%);
      transition:transform .26s ease;
      z-index:var(--z); display:flex; flex-direction:column;
      height:100dvh; height:100vh;
    }
    #nbbioHeaderLocal .drawer.act{transform:translateX(0);}
    #nbbioHeaderLocal .drawer .top{
      display:flex;align-items:center;justify-content:space-between;
      padding:18px 16px;background:#fff;flex:0 0 auto;
    }
    #nbbioHeaderLocal .drawer .top .brand{display:flex;align-items:center;gap:10px;}
    #nbbioHeaderLocal .drawer .top .brand img{height:28px;}

    #nbbioHeaderLocal .mnav{
      padding:6px 18px 32px;
      overflow:auto; -webkit-overflow-scrolling:touch;
      flex:1 1 auto; min-height:0;
      color:#111;
    }
    #nbbioHeaderLocal details{border-bottom:1px solid #eceff2;}
    #nbbioHeaderLocal summary{
      list-style:none;display:flex;align-items:center;justify-content:space-between;
      cursor:pointer;padding:18px 6px;font-weight:700;font-size:20px;color:#111;
    }
    #nbbioHeaderLocal summary::-webkit-details-marker{display:none;}
    #nbbioHeaderLocal summary .chev{
      width:10px;height:10px;border-right:2px solid #111;border-bottom:2px solid #111;
      transform: rotate(45deg); transition: .28s; margin-left:8px; flex:0 0 10px;
    }
    #nbbioHeaderLocal details[open] summary .chev{transform:rotate(-135deg);}
    #nbbioHeaderLocal .gs2{max-height:0;overflow:hidden;transition:max-height .32s ease; padding:0 0 0 6px;}
    #nbbioHeaderLocal details[open] .gs2{padding:4px 0 14px 6px;}
    #nbbioHeaderLocal .gs2 a{display:block;padding:14px 2px;color:#111;font-size:18px;text-decoration:none;}
    #nbbioHeaderLocal .gs2{padding-left:16px;}

    /* 브레이크포인트 */
    @media (max-width:1279.98px){
      #nbbioHeaderLocal .bar nav{display:none;}
      #nbbioHeaderLocal .megalite{display:none!important;}
      #nbbioHeaderLocal .mega{display:none!important;}
    }
    @media (min-width:1280px){
      #nbbioHeaderLocal .dep2{display:none!important;}
    }
  </style>

  <!-- ====== Header Bar (+ 라이트 패널 컨테이너) ====== -->
  <div class="bar header">
    <div class="wrap">
      <a class="logo" href="./index.html"><img src="${esc(LOGO.dark)}" alt="비즈니스 혁신 연구소"></a>

      <nav aria-label="주 메뉴">
        <ul class="gnb" role="menubar">
          ${gnbHTML()}
        </ul>
      </nav>

      <div class="actions">
        <button class="globeBtn" type="button" aria-label="언어">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="#0b1220" stroke-width="1.7"/><path d="M3 12h18M12 3c3.5 3.8 3.5 13.2 0 18M12 3c-3.5 3.8-3.5 13.2 0 18" fill="none" stroke="#0b1220" stroke-width="1.2"/></svg>
        </button>
        <button class="menuBtn" type="button" aria-label="전체 메뉴 열기" aria-expanded="false"><i></i></button>
      </div>
    </div>

    <!-- ===== PC Hover 라이트 패널 ===== -->
    <div class="megalite" aria-hidden="true">
      <div class="inner">
        <div class="grid">
          ${liteHTML()}
        </div>

        ${feedBlockHTML('cf-lite')}
      </div>
    </div>
    <!-- /라이트 패널 -->
  </div>

  <!-- ===== Hover bottom bar ===== -->
  <div class="down"></div>

  <!-- ===== 햄버거: 풀스크린 메가메뉴 (PC) ===== -->
  <aside class="mega" aria-hidden="true">
    <div class="scrim" data-close="mega"></div>
    <div class="panel">
      <div class="inner">
        <div class="topline">
          <div class="brand"><img src="${esc(LOGO.dark)}" alt="비즈니스 혁신 연구소" /><span style="font-weight:800;color:#0a6a62;letter-spacing:.4px;"></span></div>
          <div class="icons">
            <button class="iconBtn" type="button" aria-label="언어">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="#0b1220" stroke-width="1.7"/><path d="M3 12h18M12 3c3.5 3.8 3.5 13.2 0 18M12 3c-3.5 3.8-3.5 13.2 0 18" fill="none" stroke="#0b1220" stroke-width="1.2"/></svg>
            </button>
            <button class="iconBtn closeMega" type="button" aria-label="닫기">
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="#111" stroke-width="2" stroke-linecap="round"/></svg>
            </button>
          </div>
        </div>
        <hr style="border:none;border-top:1px solid var(--line);margin:10px 0 40px;" />

        <div class="grid" role="menu">
          ${megaHTML()}
        </div>

        ${feedBlockHTML('cf-mega')}

        <div class="watermark" aria-hidden="true">
          <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg"><path d="M30 30h40a20 20 0 0 1 0 40H30V30zm12 12v16h20a8 8 0 1 0 0-16H42zm64-12h40a20 20 0 0 1 0 40h-40V30zm12 12v16h20a8 8 0 1 0 0-16h-20zM30 78h40a20 20 0 1 1 0 40H30V78zm12 12v16h20a8 8 0 1 0 0-16H42zm64-12h40a20 20 0 1 1 0 40h-40V78zm12 12v16h20a8 8 0 1 0 0-16h-20z" fill="#0b1220"/></svg>
        </div>
      </div>
    </div>
  </aside>

  <!-- ===== MOBILE: Drawer ===== -->
  <div class="overlay" hidden></div>
  <aside class="drawer" aria-hidden="true" aria-label="모바일 전체 메뉴">
    <div class="top">
      <div class="brand"><img src="${esc(LOGO.dark)}" alt="비즈니스 혁신 연구소"></div>
      <div style="display:flex;gap:10px;align-items:center;">
        <button class="globeBtn" type="button" aria-label="언어">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="#0b1220" stroke-width="1.7"/><path d="M3 12h18M12 3c3.5 3.8 3.5 13.2 0 18M12 3c3.5 3.8 3.5 13.2 0 18" fill="none" stroke="#0b1220" stroke-width="1.2"/></svg>
        </button>
        <button class="iconBtn closeDrawer" type="button" aria-label="닫기" style="width:36px;height:36px;border:1px solid var(--line);border-radius:10px;background:#fff;display:grid;place-items:center;">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="#111" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
      </div>
    </div>

    <nav class="mnav" aria-label="모바일 내비게이션">
      ${mobileHTML()}
    </nav>
  </aside>
</section>
`; }

  // 2) 메뉴 동작 초기화 함수
  function initNbbioMenu(root) {
    if (!root) return;

    const barEl = root.querySelector('.bar');
    const header = barEl ? barEl.parentElement : null;
    const gnb = root.querySelector('.gnb');
    const megalite = root.querySelector('.megalite');

    const btnHamburger = root.querySelector('.menuBtn');
    const mega = root.querySelector('.mega');
    const closeMegaBtn = root.querySelector('.closeMega');

    const overlay = root.querySelector('.overlay');
    const drawer = root.querySelector('.drawer');
    const closeDrawer = root.querySelector('.closeDrawer');

    const logoImg = root.querySelector('.bar .logo img');

    if (!barEl || !header || !btnHamburger || !mega || !overlay || !drawer) return;

    const isDesktop = () => window.matchMedia('(min-width:1280px)').matches;
    const canHover = () => window.matchMedia('(hover:hover)').matches;
    const lockScroll = (on) => { document.documentElement.style.overflow = on ? 'hidden' : ''; };

    /* ========= 칼럼 피드 ========= */
    const feedBoxes = Array.from(root.querySelectorAll('[data-feed]'));
    let feedData = null;

    function feedCat(key) {
      return FEED_CATS.find(c => c.key === key) || FEED_CATS[0];
    }

    function countFor(box) {
      if (box.classList.contains('cf-mobile')) return COUNT_MOBILE;
      if (box.classList.contains('cf-lite')) return COUNT_LITE;
      return COUNT_MEGA;
    }

    function renderFeed(box) {
      const list = box.querySelector('[data-cf-list]');
      const more = box.querySelector('.cf-more');
      const cat = feedCat(box._cat);
      const max = countFor(box);

      if (more) {
        more.setAttribute('href', cat.href);
        more.textContent = cat.label + ' 전체 보기';
      }

      if (!feedData) {
        list.innerHTML = skeletonHTML(Math.min(max, 3));
        return;
      }

      const items = (feedData[cat.key] || []).slice(0, max);
      list.innerHTML = items.length
        ? items.map(it => cardHTML(it, cat.label)).join('')
        : `<span class="cf-meta">등록된 글이 없습니다. <a href="${cat.href}" style="color:var(--brand);font-weight:700;">${cat.label} 보기</a></span>`;

      // 모바일 아코디언이 열려 있으면 높이를 다시 잡아준다
      const panel = box.closest('.gs2');
      const det = box.closest('details');
      if (panel && det && det.hasAttribute('open')) panel.style.maxHeight = 'none';
    }

    function syncCatLinks(scope, key) {
      if (!scope) return;
      scope.querySelectorAll('[data-cf-cat]').forEach(a => {
        a.classList.toggle('is-on', a.dataset.cfCat === key);
      });
    }

    function setFeedCat(box, key) {
      if (!box) return;
      const scope = box.closest('.megalite, .mega');
      syncCatLinks(scope, key);
      if (box._cat === key) return;
      box._cat = key;
      box.querySelectorAll('.cf-tab').forEach(t => {
        const on = t.dataset.cat === key;
        t.classList.toggle('is-on', on);
        t.setAttribute('aria-pressed', String(on));
      });
      renderFeed(box);
    }

    function ensureFeed() {
      if (feedData || !feedBoxes.length) return;
      loadColumns().then(data => {
        feedData = data;
        feedBoxes.forEach(renderFeed);
      });
    }

    feedBoxes.forEach(box => {
      box._cat = FEED_CATS[0].key;
      renderFeed(box);
      box.querySelectorAll('.cf-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
          e.preventDefault();
          ensureFeed();
          setFeedCat(box, tab.dataset.cat);
        });
      });
    });

    /* PC: '혁신 칼럼 / 확장 칼럼 / 혁신 사례'에 마우스를 올렸을 때만 칼럼 내용 노출 */
    const feedGroups = [];
    ['.megalite', '.mega'].forEach(sel => {
      const scope = root.querySelector(sel);
      if (!scope) return;
      const box = scope.querySelector('[data-feed]');
      const firstLink = scope.querySelector('[data-cf-cat]');
      if (!box || !firstLink) return;

      const group = firstLink.closest('.col') || firstLink.closest('div');
      const g = { box: box, timer: null };
      feedGroups.push(g);

      const show = () => { clearTimeout(g.timer); ensureFeed(); box.classList.add('is-open'); };
      const hide = () => { clearTimeout(g.timer); g.timer = setTimeout(() => box.classList.remove('is-open'), 160); };

      [group, box].forEach(el => {
        if (!el) return;
        el.addEventListener('mouseenter', show);
        el.addEventListener('mouseleave', hide);
        el.addEventListener('focusin', show);
      });

      scope.querySelectorAll('[data-cf-cat]').forEach(link => {
        const apply = () => { show(); setFeedCat(box, link.dataset.cfCat); };
        link.addEventListener('mouseenter', apply);
        link.addEventListener('focus', apply);
      });
    });

    function closeAllFeeds() {
      feedGroups.forEach(g => { clearTimeout(g.timer); g.box.classList.remove('is-open'); });
    }

    if (gnb) {
      gnb.addEventListener('mouseover', () => header.classList.add('act'));
      header.addEventListener('mouseleave', () => header.classList.remove('act'));
    }

    /* ========= PC: GNB hover → 라이트 패널 ========= */
    let liteTimer = null;
    const openLite = () => {
      if (!isDesktop() || !megalite) return;
      clearTimeout(liteTimer);
      ensureFeed();
      megalite.classList.add('act');
    };
    const closeLite = () => { if (megalite) megalite.classList.remove('act'); closeAllFeeds(); };
    const delayedCloseLite = () => {
      if (!megalite) return;
      clearTimeout(liteTimer);
      liteTimer = setTimeout(closeLite, 120);
    };

    if (gnb && megalite) {
      gnb.addEventListener('mouseenter', openLite);
      gnb.addEventListener('focusin', openLite);
      gnb.addEventListener('mouseleave', delayedCloseLite);
      megalite.addEventListener('mouseenter', () => clearTimeout(liteTimer));
      megalite.addEventListener('mouseleave', delayedCloseLite);
    }

    // 상단 강조 토글
    root.querySelectorAll('.gnb > li').forEach(li => {
      li.addEventListener('mouseenter', () => { if (isDesktop()) li.classList.add('is-on'); });
      li.addEventListener('mouseleave', () => li.classList.remove('is-on'));
      li.addEventListener('focusin', () => { if (isDesktop()) li.classList.add('is-on'); });
      li.addEventListener('focusout', () => li.classList.remove('is-on'));
    });

    // 칼럼 GNB에 마우스를 올리면 라이트 패널 피드를 혁신 칼럼으로
    const colGnb = root.querySelector('.gnb > li[data-feedkey]');
    if (colGnb && megalite) {
      colGnb.addEventListener('mouseenter', () => {
        ensureFeed();
        setFeedCat(megalite.querySelector('[data-feed]'), colGnb.getAttribute('data-feedkey') || FEED_CATS[0].key);
      });
    }

    /* ========= PC: 햄버거 → 전체 메가메뉴 ========= */
    const openMega = () => {
      ensureFeed();
      mega.classList.add('act');
      btnHamburger.setAttribute('aria-expanded', 'true');
      lockScroll(true);
      root.classList.add('scroll-up');
      root.classList.remove('scroll-down');
      syncLogo();
    };
    const closeMega = () => {
      mega.classList.remove('act');
      btnHamburger.setAttribute('aria-expanded', 'false');
      lockScroll(false);
      closeAllFeeds();
      syncLogo();
    };

    /* ========= MOBILE: Drawer ========= */
    const openDrawer = () => {
      ensureFeed();
      overlay.hidden = false;
      overlay.classList.add('act');
      drawer.classList.add('act');
      drawer.setAttribute('aria-hidden', 'false');
      lockScroll(true);
      initMobileMenus(true);
      root.classList.add('scroll-up');
      root.classList.remove('scroll-down');
      syncLogo();
    };
    const closeDrawerAll = () => {
      overlay.classList.remove('act');
      overlay.hidden = true;
      drawer.classList.remove('act');
      drawer.setAttribute('aria-hidden', 'true');
      lockScroll(false);
      syncLogo();
    };

    btnHamburger.addEventListener('click', () => {
      if (isDesktop()) { closeLite(); openMega(); }
      else { openDrawer(); }
    });

    const closeAll = () => { closeMega(); closeDrawerAll(); };

    if (closeMegaBtn) closeMegaBtn.addEventListener('click', closeAll);

    const scrim = root.querySelector('[data-close="mega"]');
    if (scrim) scrim.addEventListener('click', closeAll);

    if (closeDrawer) closeDrawer.addEventListener('click', closeDrawerAll);
    overlay.addEventListener('click', closeDrawerAll);

    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });

    /* ========= 모바일 아코디언 ========= */
    const detailsList = Array.from(root.querySelectorAll('.mnav details'));
    const getPanel = (d) => d.querySelector('.gs2');

    const resetInline = (panel) => {
      if (!panel) return;
      if (panel._endHandler) {
        panel.removeEventListener('transitionend', panel._endHandler);
        panel._endHandler = null;
      }
    };

    const slideOpen = (panel) => {
      if (!panel) return;
      resetInline(panel);
      panel.style.transition = 'none';
      panel.style.maxHeight = '0px';
      void panel.offsetHeight;
      panel.style.transition = 'max-height .32s ease';
      panel.style.maxHeight = panel.scrollHeight + 'px';
      const onEnd = (e) => {
        if (e.propertyName !== 'max-height') return;
        panel.style.transition = 'none';
        panel.style.maxHeight = 'none';
        panel.removeEventListener('transitionend', onEnd);
        panel._endHandler = null;
      };
      panel._endHandler = onEnd;
      panel.addEventListener('transitionend', onEnd);
    };

    const slideClose = (panel, done) => {
      if (!panel) { done && done(); return; }
      resetInline(panel);
      const current = panel.scrollHeight;
      panel.style.transition = 'none';
      panel.style.maxHeight = current + 'px';
      void panel.offsetHeight;
      panel.style.transition = 'max-height .28s ease';
      panel.style.maxHeight = '0px';
      const onEnd = (e) => {
        if (e.propertyName !== 'max-height') return;
        panel.style.transition = 'none';
        panel.removeEventListener('transitionend', onEnd);
        panel._endHandler = null;
        done && done();
      };
      panel._endHandler = onEnd;
      panel.addEventListener('transitionend', onEnd);
    };

    const openOne = (target) => {
      detailsList.forEach(d => {
        const p = getPanel(d);
        if (d === target) {
          if (!d.hasAttribute('open')) { d.setAttribute('open', ''); ensureFeed(); slideOpen(p); }
          else { slideClose(p, () => d.removeAttribute('open')); }
        } else if (d.hasAttribute('open')) {
          slideClose(p, () => d.removeAttribute('open'));
        }
      });
    };

    detailsList.forEach(d => {
      const sum = d.querySelector('summary');
      if (!sum) return;
      sum.addEventListener('click', (e) => { e.preventDefault(); openOne(d); });
    });

    function initMobileMenus(resetHeights = false) {
      detailsList.forEach(d => {
        const p = getPanel(d);
        d.removeAttribute('open');
        if (resetHeights && p) {
          resetInline(p);
          p.style.transition = 'none';
          p.style.maxHeight = '0px';
        }
      });
    }
    initMobileMenus(true);

    // 리사이즈 가드
    const resetStates = () => {
      if (isDesktop()) {
        closeDrawerAll();
      } else {
        mega.classList.remove('act');
        if (megalite) megalite.classList.remove('act');
        btnHamburger.setAttribute('aria-expanded', 'false');
        lockScroll(false);
        initMobileMenus(true);
      }
      syncLogo();
    };
    window.addEventListener('resize', resetStates);

    /* ========= 스크롤/호버 상태에 따른 로고 스왑 ========= */
    let lastY = window.scrollY || 0;
    const delta = 6;
    let ticking = false;

    let mobilePeek = false;
    let mobilePeekTimer = null;

    function setHoveringClass(on) {
      root.classList.toggle('hovering', !!on);
    }

    function setMobilePeek(on, ms = 1200) {
      mobilePeek = !!on;
      clearTimeout(mobilePeekTimer);
      setHoveringClass(mobilePeek);
      if (mobilePeek) {
        mobilePeekTimer = setTimeout(() => {
          mobilePeek = false;
          setHoveringClass(false);
          syncLogo();
        }, ms);
      }
    }

    function isMenuHovered() {
      if (canHover()) {
        return (
          (barEl && barEl.matches(':hover')) ||
          (header && header.classList.contains('act')) ||
          (megalite && megalite.classList.contains('act') && megalite.matches(':hover')) ||
          (gnb && gnb.matches(':hover'))
        );
      }
      return mobilePeek;
    }

    function setLogo(src) {
      if (!logoImg) return;
      if (logoImg.getAttribute('src') !== src) logoImg.setAttribute('src', src);
    }

    function swapLogoByState(y) {
      const menuOpened = mega.classList.contains('act') || drawer.classList.contains('act');
      if (menuOpened || isMenuHovered()) setLogo(LOGO.dark);
      else if (y <= 30) setLogo(LOGO.light);
      else setLogo(LOGO.dark);
    }

    function applyTopState(y) {
      if (y <= 30) root.classList.add('at-top');
      else root.classList.remove('at-top');
    }

    function handleScrollDirection() {
      const y = window.scrollY || 0;
      const diff = y - lastY;

      applyTopState(y);
      swapLogoByState(y);

      const forceShow = mega.classList.contains('act') || drawer.classList.contains('act');
      if (forceShow) {
        root.classList.add('scroll-up');
        root.classList.remove('scroll-down');
        lastY = y;
        ticking = false;
        return;
      }

      if (Math.abs(diff) > delta) {
        if (diff > 0) { root.classList.add('scroll-down'); root.classList.remove('scroll-up'); }
        else { root.classList.add('scroll-up'); root.classList.remove('scroll-down'); }
        lastY = y;
      }

      if (y <= 0) {
        root.classList.remove('scroll-down');
        root.classList.add('scroll-up');
      }

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(handleScrollDirection);
        ticking = true;
      }
    }

    function syncLogo() { swapLogoByState(window.scrollY || 0); }

    function syncHoveringState() {
      if (!canHover()) return;
      const y = window.scrollY || 0;
      const hovering = (y <= 30) && (
        (barEl && barEl.matches(':hover')) ||
        (gnb && gnb.matches(':hover')) ||
        (megalite && megalite.classList.contains('act') && megalite.matches(':hover'))
      );
      setHoveringClass(hovering);
      syncLogo();
    }

    function peekIfTop() {
      if (canHover()) return;
      const y = window.scrollY || 0;
      if (y > 30) return;
      setMobilePeek(true, 1200);
      syncLogo();
    }

    if (barEl) {
      ['mouseenter','mouseleave','mousemove'].forEach(evt => barEl.addEventListener(evt, syncHoveringState));
    }
    if (gnb) {
      ['mouseenter','mouseleave','mousemove'].forEach(evt => gnb.addEventListener(evt, syncHoveringState));
    }
    if (megalite) {
      ['mouseenter','mouseleave','mousemove'].forEach(evt => megalite.addEventListener(evt, syncHoveringState));
    }

    barEl.addEventListener('pointerdown', peekIfTop, { passive: true });
    const globeBtnTop = root.querySelector('.bar .globeBtn');
    if (globeBtnTop) globeBtnTop.addEventListener('pointerdown', peekIfTop, { passive: true });
    btnHamburger.addEventListener('pointerdown', peekIfTop, { passive: true });

    window.addEventListener('scroll', () => {
      if (!canHover() && mobilePeek) {
        setMobilePeek(false);
        syncLogo();
      }
    }, { passive: true });

    document.addEventListener('pointerdown', (e) => {
      if (canHover()) return;
      if (!mobilePeek) return;
      if (barEl && barEl.contains(e.target)) return;
      setMobilePeek(false);
      syncLogo();
    }, { passive: true });

    if (barEl) ['mouseenter','mouseleave'].forEach(evt => barEl.addEventListener(evt, syncLogo));
    if (gnb) ['mouseenter','mouseleave'].forEach(evt => gnb.addEventListener(evt, syncLogo));
    if (megalite) ['mouseenter','mouseleave'].forEach(evt => megalite.addEventListener(evt, syncLogo));
    if (header) ['mouseenter','mouseleave'].forEach(evt => header.addEventListener(evt, syncLogo));

    applyTopState(window.scrollY || 0);
    root.classList.add('scroll-up');
    setHoveringClass(false);
    syncLogo();
    window.addEventListener('scroll', onScroll, { passive: true });

    // 데이터 미리 준비(첫 오픈 지연 제거)
    setTimeout(ensureFeed, 0);
  }

  // 3) mount 함수: 저장해 둔(또는 기본) 메뉴를 먼저 그리고, 관리자 데이터가 오면 바뀐 경우에만 다시 그림
  function mountMenu() {
    const mount = document.getElementById('menu_navi');
    if (!mount) { BNL.ready.then(runPageHooks); return; }
    if (mount._nbbioMounted) return;
    mount._nbbioMounted = true;

    function draw(data) {
      applySiteData(data);
      const sig = JSON.stringify([MENU, LOGO, FEED_CATS]);
      if (mount._sig === sig) return;
      mount._sig = sig;
      feedPromise = null;
      mount.innerHTML = headerTemplate();
      initNbbioMenu(mount.querySelector('#nbbioHeaderLocal'));
    }
    draw(BNL.cached());
    BNL.ready.then(function (d) { if (d) draw(d); runPageHooks(d); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountMenu);
  else mountMenu();
})();