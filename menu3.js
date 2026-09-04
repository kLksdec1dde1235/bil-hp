// ./menu3.js
(function () {

  /* =========================================================================
     [설정 1] 카테고리 목록 페이지 주소
     · 혁신 사례 전용 페이지 파일명이 따로 있다면 CASE_PAGE만 바꾸면 됩니다.
     ========================================================================= */
  const PAGE_INNOVATION = './column.html';
  const PAGE_SPECIAL    = './special-column.html';
  const PAGE_CASE       = './special-column.html';   // ← 혁신 사례 페이지 파일명으로 교체

  const FEED_CATS = [
    { key: 'innovation', label: '혁신 칼럼', href: PAGE_INNOVATION },
    { key: 'special',    label: '확장 칼럼', href: PAGE_SPECIAL },
    { key: 'case',       label: '혁신 사례', href: PAGE_CASE }
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
       (category 값에 '확장/special' → 확장 칼럼, '사례/case' → 혁신 사례로 자동 분류)
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
        title: '비즈니스 혁신의 최고의 철학은 Why와 Who이다',
        desc : '무엇을 할 것인가보다 왜 하는가, 그리고 누구와 함께하는가.',
        url  : './special-column1.html',
        thumb: './img/special-1.jpg'
      },
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

    // ⬇️ 혁신 사례 전용 글이 준비되면 이 배열만 교체하세요.
    'case': [
      {
        title: '비즈니스 혁신의 최고의 철학은 Why와 Who이다',
        desc : '현장에서 Why와 Who를 다시 세운 기업들의 이야기.',
        url  : './special-column1.html',
        thumb: './img/special-1.jpg'
      },
      {
        title: '혁신의 최종 목적지는 인간과 사회의 행복이다',
        desc : '기술이 아니라 사람을 향한 혁신이 만든 결과.',
        url  : './special-column2.html',
        thumb: './img/2-4.jpg'
      },
      {
        title: '비즈니스 성공의 6가지 요소',
        desc : '성공한 현장이 공통으로 갖추고 있던 여섯 가지.',
        url  : './special-column3.html',
        thumb: './img/fm.jpg'
      }
    ]
  };

  const FEED_CFG = window.NBBIO_COLUMN_FEED || {};
  const FEED_LIMIT = FEED_CFG.limit || 6;   // 카테고리별 최대 보관 개수

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
    const out = { innovation: [], special: [], 'case': [] };
    (rows || []).forEach(row => {
      const it = normalizeRow(row);
      if (!it) return;
      const key = catKeyOf(it.cat || it.url);
      if (out[key].length < FEED_LIMIT) out[key].push(it);
    });
    Object.keys(out).forEach(k => {
      if (!out[k].length) out[k] = (DEFAULT_ITEMS[k] || []).slice(0, FEED_LIMIT);
    });
    return out;
  }

  function loadColumns() {
    if (feedPromise) return feedPromise;

    if (Array.isArray(FEED_CFG.data)) {
      feedPromise = Promise.resolve(groupItems(FEED_CFG.data));
    } else if (FEED_CFG.endpoint) {
      feedPromise = fetch(FEED_CFG.endpoint, { headers: FEED_CFG.headers || {} })
        .then(r => (r.ok ? r.json() : Promise.reject(new Error('feed ' + r.status))))
        .then(json => groupItems(Array.isArray(json) ? json : (json.items || json.data || json.rows || [])))
        .catch(() => groupItems([]));
    } else {
      feedPromise = Promise.resolve(groupItems([]));
    }
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

  // 1) 헤더 전체 HTML 템플릿 (#nbbioHeaderLocal + 스타일 + 구조)
  const HEADER_TEMPLATE = `
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
    #nbbioHeaderLocal .colfeed{margin-top:26px;padding-top:20px;border-top:1px solid var(--line);}
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
    #nbbioHeaderLocal .colfeed.cf-mobile{margin-top:2px;padding-top:14px;border-top:1px solid #eceff2;}
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
      <a class="logo" href="./index.html"><img src="./img/logo-b.png" alt="비즈니스 혁신 연구소"></a>

      <nav aria-label="주 메뉴">
        <ul class="gnb" role="menubar">
          <!-- 1) 연구소 -->
          <li role="none" data-col="0">
            <a role="menuitem" href="./introduce.html">연구소</a>
            <ul class="dep2" role="menu">
              <li><a href="./introduce.html">연구소 소개</a></li>
              <li><a href="./ceo.html">대표 인사말</a></li>
              <li><a href="./vision.html">비전 &amp; 철학</a></li>
              <li><a href="./history.html">연혁</a></li>
            </ul>
          </li>

          <!-- 2) 칼럼 -->
          <li role="none" data-col="1">
            <a role="menuitem" href="${PAGE_INNOVATION}">칼럼</a>
            <ul class="dep2" role="menu">
              <li><a href="${PAGE_INNOVATION}">혁신 칼럼</a></li>
              <li><a href="${PAGE_SPECIAL}">확장 칼럼</a></li>
              <li><a href="${PAGE_CASE}">혁신 사례</a></li>
            </ul>
          </li>

          <li role="none" data-col="3">
            <a role="menuitem" href="./community.html">혁신 광장</a>
            <ul class="dep2" role="menu">
              <li><a href="./community-company.html">혁신 파트너스 그룹</a></li>
              <li><a href="./innolab.html">혁신 인큐베이션 랩</a></li>
              <li><a href="./community-solution.html">혁신 인사이트</a></li>
            </ul>
          </li>

          <!-- 3) 패밀리 사이트 -->
          <li role="none" data-col="4">
            <a role="menuitem" href="#">패밀리 사이트</a>
            <ul class="dep2" role="menu">
              <li><a href="https://htuglobal.com/">HTU GLOBAL</a></li>
              <li><a href="https://maxq.kr/">MAXQ</a></li>
              <li><a href="http://hcn.or.kr/">건강소비자연대</a></li>
              <li><a href="https://www.mdjournal.kr/">MD저널</a></li>
            </ul>
          </li>

          <!-- 4) 오시는 길 -->
          <li role="none" data-col="5">
            <a role="menuitem" href="./location.html">오시는 길</a>
            <ul class="dep2" role="menu">
              <li><a href="./location.html">오시는 길</a></li>
            </ul>
          </li>
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
          <div>
            <h4>연구소</h4>
            <ul>
              <li><a href="./introduce.html">연구소 소개</a></li>
              <li><a href="./ceo.html">대표 인사말</a></li>
              <li><a href="./vision.html">비전 &amp; 철학</a></li>
              <li><a href="./history.html">연혁</a></li>
            </ul>
          </div>

          <div>
            <h4>칼럼</h4>
            <ul>
              <li><a class="is-cf is-on" href="${PAGE_INNOVATION}" data-cf-cat="innovation">혁신 칼럼</a></li>
              <li><a class="is-cf" href="${PAGE_SPECIAL}" data-cf-cat="special">확장 칼럼</a></li>
              <li><a class="is-cf" href="${PAGE_CASE}" data-cf-cat="case">혁신 사례</a></li>
            </ul>
          </div>

          <div>
            <h4>혁신 광장</h4>
            <ul>
              <li><a href="./community-company.html">혁신 파트너스 그룹</a></li>
              <li><a href="./innolab.html">혁신 인큐베이션 랩</a></li>
              <li><a href="./community-solution.html">혁신 인사이트</a></li>
            </ul>
          </div>

          <div>
            <h4>패밀리 사이트</h4>
            <ul>
              <li><a href="https://htuglobal.com/">HTU GLOBAL</a></li>
              <li><a href="https://maxq.kr/">MAXQ</a></li>
              <li><a href="http://hcn.or.kr/">건강소비자연대</a></li>
              <li><a href="https://www.mdjournal.kr/">MD저널</a></li>
            </ul>
          </div>

          <div>
            <h4>오시는 길</h4>
            <ul>
              <li><a href="./location.html">오시는 길</a></li>
            </ul>
          </div>
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
          <div class="brand"><img src="./img/logo-b.png" alt="비즈니스 혁신 연구소" /><span style="font-weight:800;color:#0a6a62;letter-spacing:.4px;"></span></div>
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
          <div class="col" data-col="0">
            <h3>연구소</h3>
            <ul>
              <li><a href="./introduce.html">연구소 소개</a></li>
              <li><a href="./ceo.html">대표 인사말</a></li>
              <li><a href="./vision.html">비전 &amp; 철학</a></li>
              <li><a href="./history.html">연혁</a></li>
            </ul>
          </div>

          <div class="col" data-col="1">
            <h3>칼럼</h3>
            <ul>
              <li><a class="is-cf is-on" href="${PAGE_INNOVATION}" data-cf-cat="innovation">혁신 칼럼</a></li>
              <li><a class="is-cf" href="${PAGE_SPECIAL}" data-cf-cat="special">확장 칼럼</a></li>
              <li><a class="is-cf" href="${PAGE_CASE}" data-cf-cat="case">혁신 사례</a></li>
            </ul>
          </div>

          <div class="col" data-col="2">
            <h3>혁신 광장</h3>
            <ul>
              <li><a href="./community.html">혁신 광장</a></li>
              <li><a href="./community-company.html">혁신 파트너스 그룹</a></li>
              <li><a href="./innolab.html">혁신 인큐베이션 랩</a></li>
              <li><a href="./community-solution.html">혁신 인사이트</a></li>
            </ul>
          </div>

          <div class="col" data-col="3">
            <h3>패밀리 사이트</h3>
            <ul>
              <li><a href="https://htuglobal.com/">HTU GLOBAL</a></li>
              <li><a href="https://maxq.kr/">MAXQ</a></li>
              <li><a href="http://hcn.or.kr/">건강소비자연대</a></li>
              <li><a href="https://www.mdjournal.kr/">MD저널</a></li>
            </ul>
          </div>

          <div class="col" data-col="4">
            <h3>오시는 길</h3>
            <ul>
              <li><a href="./location.html">오시는 길</a></li>
            </ul>
          </div>
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
      <div class="brand"><img src="./img/logo-b.png" alt="비즈니스 혁신 연구소"></div>
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
      <details>
        <summary>연구소 <span class="chev"></span></summary>
        <div class="gs2">
          <a href="./introduce.html">연구소 소개</a>
          <a href="./ceo.html">대표 인사말</a>
          <a href="./vision.html">비전 &amp; 철학</a>
          <a href="./history.html">연혁</a>
        </div>
      </details>

      <details>
        <summary>칼럼 <span class="chev"></span></summary>
        <div class="gs2">
          ${feedBlockHTML('cf-mobile')}
        </div>
      </details>

      <details>
        <summary>혁신 광장<span class="chev"></span></summary>
        <div class="gs2">
          <a href="./community-company.html">혁신 파트너스 그룹</a>
          <a href="./innolab.html">혁신 인큐베이션 랩</a>
          <a href="./community-solution.html">혁신 인사이트</a>
        </div>
      </details>

      <details>
        <summary>패밀리 사이트<span class="chev"></span></summary>
        <div class="gs2">
          <a href="https://htuglobal.com/">HTU GLOBAL</a>
          <a href="https://maxq.kr/">MAXQ</a>
          <a href="http://hcn.or.kr/">건강소비자연대</a>
          <a href="https://www.mdjournal.kr/">MD저널</a>
        </div>
      </details>

      <details>
        <summary>오시는 길 <span class="chev"></span></summary>
        <div class="gs2">
          <a href="./location.html">오시는 길</a>
        </div>
      </details>
    </nav>
  </aside>
</section>
`;

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

    // 패널 안의 "혁신 칼럼 / 확장 칼럼 / 혁신 사례" 링크 → 같은 패널 피드 전환
    root.querySelectorAll('[data-cf-cat]').forEach(link => {
      const scope = link.closest('.megalite, .mega');
      const box = scope ? scope.querySelector('[data-feed]') : null;
      if (!box) return;
      const apply = () => { ensureFeed(); setFeedCat(box, link.dataset.cfCat); };
      link.addEventListener('mouseenter', apply);
      link.addEventListener('focus', apply);
    });

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
    const closeLite = () => { if (megalite) megalite.classList.remove('act'); };
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
    const colGnb = root.querySelector('.gnb > li[data-col="1"]');
    if (colGnb && megalite) {
      colGnb.addEventListener('mouseenter', () => {
        ensureFeed();
        setFeedCat(megalite.querySelector('[data-feed]'), 'innovation');
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
      if (menuOpened || isMenuHovered()) setLogo('./img/logo-b.png');
      else if (y <= 30) setLogo('./img/logo-w.png');
      else setLogo('./img/logo-b.png');
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

  // 3) mount 함수: #menu_navi에 템플릿 주입 후 init
  function mountMenu() {
    const mount = document.getElementById('menu_navi');
    if (!mount) return;
    if (mount._nbbioMounted) return;
    mount._nbbioMounted = true;

    mount.innerHTML = HEADER_TEMPLATE;

    const root = mount.querySelector('#nbbioHeaderLocal');
    initNbbioMenu(root);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountMenu);
  else mountMenu();
})();