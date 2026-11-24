/* footer.js (v7) — 메뉴(관리자 [메뉴·푸터])와 같은 데이터로 푸터 열을 자동 구성합니다. */
(function () {
  const mount = document.getElementById('footer_template');
  if (!mount) return;

  // 중복 방지
  if (document.getElementById('footerElite')) return;

  mount.innerHTML = `
<section id="footerElite" aria-label="사이트 푸터" style="position:relative;">
  <!-- 아이콘 킷 -->
  <script src="https://kit.fontawesome.com/2d323a629b.js" crossorigin="anonymous"></script>

  <style>
    /* ================= Scope: #footerElite only ================= */
    #footerElite{
      --bg:#0a0a0b;--ink:#e5e7eb;--muted:#9aa1aa;--line:rgba(255,255,255,.08);
      --glass:rgba(255,255,255,.06);--max:1280px;--radius:16px;
      --shadow:0 10px 30px rgba(0,0,0,.35);
      font-family:Pretendard,"Noto Sans KR",system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
      background:var(--bg);color:var(--muted);
      -webkit-font-smoothing:antialiased;
      text-rendering:optimizeLegibility;
    }

    #footerElite .wrap{max-width:var(--max);margin:0 auto;padding:3.5rem 1.25rem 2.25rem}
    #footerElite .navGrid{
      display:grid;grid-template-columns:repeat(14,1fr);gap:2.2rem;
      border-bottom:1px solid var(--line);padding-bottom:2rem
    }

    #footerElite .brandCol{grid-column:span 4;display:flex;flex-direction:column;gap:.9rem}
    #footerElite .logoRow{display:flex;align-items:center}
    #footerElite .slogan{font-size:.92rem;line-height:1.55}

    #footerElite .col{grid-column:span 2}
    #footerElite h4{margin:.1rem 0 .85rem;font-size:1rem;font-weight:800;color:#fff}
    #footerElite ul{list-style:none;margin:0;padding:0}
    #footerElite li{margin:.48rem 0}
    #footerElite a{color:var(--muted);text-decoration:none;font-size:.92rem}
    #footerElite a:hover{color:#fff}

    #footerElite .footBar{
      display:flex;justify-content:space-between;gap:1rem;padding:1.15rem 0
    }
    #footerElite .addr{font-size:.86rem;line-height:1.7}
    #footerElite .policies{display:flex;gap:.9rem;flex-wrap:wrap;margin:0 auto}

    #footerElite .corpLine{display:flex;flex-wrap:wrap;gap:.45rem .55rem}
    #footerElite .corpName{color:var(--ink);font-weight:800}
    #footerElite .corpMeta{display:flex;gap:.35rem .55rem;color:#b9c0cb}
    #footerElite .sep{color:rgba(255,255,255,.22)}
    #footerElite .meta b{color:#d7dde6}

    #footerElite .copy{margin-top:.6rem;font-size:.8rem;color:#88919c}

    #footerElite .social{
      display:flex;gap:.65rem;align-items:center;
      background:var(--glass);border:1px solid var(--line);
      padding:.5rem .7rem;border-radius:999px
    }
    #footerElite .sns-btn{
      width:38px;height:38px;border-radius:999px;
      display:flex;align-items:center;justify-content:center;color:#d0d4dc
    }
    #footerElite .sns-btn:hover{transform:translateY(-2px);color:#fff}

    @media(max-width:760px){
      #footerElite .navGrid{grid-template-columns:repeat(6,1fr)}
      #footerElite .brandCol{grid-column:1/-1}
      #footerElite .col{grid-column:span 3}
      #footerElite .footBar{
        flex-direction:column;align-items:center;text-align:center
      }
    }
  </style>

  <div class="wrap">
    <div class="navGrid">
      <div class="brandCol">
        <div class="logoRow">
          <img src="./img/logo-w.png" alt="비즈니스 혁신 연구소 로고" style="width:200px;">
        </div>
        <p class="slogan">
          시대의 바람을 읽고, 지속 가능한 성장 구조를 설계합니다.
        </p>
      </div>

      <div class="col">
        <h4>연구소</h4>
        <ul>
          <li><a href="./introduce.html">연구소 소개</a></li>
          <li><a href="./ceo.html">대표 인사말</a></li>
          <li><a href="./ceo-profile.html">대표 소개</a></li>
          <li><a href="./vision.html">비전 & 철학</a></li>
          <li><a href="./history.html">연혁</a></li>
          
        </ul>
      </div>

      <div class="col">
        <h4>칼럼</h4>
        <ul>
          <li><a href="./column.html">혁신 칼럼</a></li>
          <li><a href="./special-column.html">확장 칼럼</a></li>
          <li><a href="./case-column.html">혁신 사례</a></li>
          <li><a href="./series-column.html">연재 칼럼</a></li>
          <!-- <li><a href="./columns.html?cat=insight">산업 인사이트</a></li>
          <li><a href="./columns.html?cat=ceo">CEO 인사이트</a></li> -->
        </ul>
      </div>
      
      <div class="col">
        <h4>혁신 광장</h4>
        <ul>
          <li><a href="./community-company.html">생각 1% 그룹</a></li>
          <li><a href="./innolab.html">혁신 인큐베이션 랩</a></li>
          <li><a href="./community-solution.html">혁신 인사이트</a></li>
        </ul>
      </div>

      <div class="col">
        <h4>패밀리 사이트</h4>
        <ul>
         <li><a href="https://htuglobal.com">HTU GLOBAL</a></li>
              <li><a href="https://maxq.kr/">MAXQ</a></li>
              <li><a href="http://hcn.or.kr/">건강소비자연대</a></li>
              <li><a href="https://www.mdjournal.kr/">MD저널</a></li>
                   <li><a href="https://endo365.kr/">ENDO저널</a></li>
          <li><a href="https://www.dangnyoshinmun.co.kr/">당뇨신문</a></li>
        </ul>
      </div>

      <div class="col">
        <h4>오시는 길</h4>
        <ul>
        <li><a href="./location.html">오시는 길</a></li>
        </ul>
      </div>
    </div>

    <div class="footBar">
      <div class="addr">
        <div class="corpLine"
          data-corp="비즈니스 혁신 연구소"
          data-ceo="강영수"
          data-corpno="110-230-129994"
          data-bizno="HTU [헬스투유]">

          <span class="corpName" id="corpName">비즈니스 혁신 연구소</span>
          <span class="corpMeta">
            <span class="sep">·</span>
          <!--  <span class="meta">회사명 : <b id="bizNo">HTU [헬스투유]</b></span>
            <span class="sep">·</span>
            <span class="meta">법인 : <b id="corpNo">110-230-129994</b></span>
            <span class="sep">·</span> -->
            <span class="meta">대표 : <b id="corpCEO">강영수</b></span>
          </span>
        </div>

        <div class="policies">
          <a href="#">개인정보처리방침</a>
          <a href="#">이용약관</a>
          <a href="#">법적고지</a>
          <a href="#">사이트맵</a>
        </div>

        <div class="copy">
          COPYRIGHT © 2025 BUSINESS INNOVATION LAB<br>
          ALL RIGHTS RESERVED
        </div>
      </div>


    </div>
  </div>
</section>
`;

  /* =======================
     데이터 자동 치환
     ======================= */
  const root = mount.querySelector('.corpLine');
  if (!root) return;

  const map = {
    corpName: root.dataset.corp,
    corpCEO: root.dataset.ceo,
    corpNo: root.dataset.corpno,
    bizNo: root.dataset.bizno
  };

  Object.entries(map).forEach(([id, value]) => {
    if (!value) return;
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  });
})();


/* ═════════ v7: 관리자 데이터로 푸터 다시 그리기 ═════════
   · 메뉴 중 '푸터 노출'을 켠 항목이 열로 만들어집니다.
   · 상호/대표/추가 정보/정책 링크/저작권/로고는 관리자 [메뉴·푸터 → 푸터·로고] 설정을 씁니다. */
(function () {
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  }
  function link(it) {
    return '<a href="' + esc(it.href || '#') + '"' + (it.new_tab ? ' target="_blank" rel="noopener"' : '') + '>' + esc(it.label) + '</a>';
  }
  function render(d) {
    const root = document.getElementById('footerElite');
    if (!root || !d) return;
    const site = window.BNL_SITE;
    const menu = site && site.menu ? site.menu() : null;
    const f = (d.settings && d.settings.footer) || null;

    const grid = root.querySelector('.navGrid');
    if (grid && Array.isArray(menu) && menu.length && d.menus) {
      const cols = menu.filter(function (t) { return t.show_footer !== false; }).map(function (t) {
        const kids = (t.children || []).filter(function (c) { return c.show_footer !== false; });
        return { t: t, kids: kids.length ? kids : [t] };
      });
      const span = Math.max(2, Math.floor(10 / Math.max(cols.length, 1)));
      const brand = grid.querySelector('.brandCol');
      if (brand && f) {
        const img = brand.querySelector('img');
        if (img && f.logo) img.setAttribute('src', f.logo);
        const sl = brand.querySelector('.slogan');
        if (sl && f.slogan != null) sl.textContent = f.slogan;
      }
      grid.querySelectorAll('.col').forEach(function (el) { el.remove(); });
      grid.insertAdjacentHTML('beforeend', cols.map(function (c) {
        return '<div class="col" style="grid-column:span ' + span + '"><h4>' + esc(c.t.label) + '</h4><ul>' +
          c.kids.map(function (k) { return '<li>' + link(k) + '</li>'; }).join('') + '</ul></div>';
      }).join(''));
    }

    if (f) {
      const corp = root.querySelector('#corpName');
      if (corp && f.corp) corp.textContent = f.corp;
      const ceo = root.querySelector('#corpCEO');
      if (ceo && f.ceo) ceo.textContent = f.ceo;
      const addr = root.querySelector('.addr');
      if (addr) {
        let extra = addr.querySelector('.bnl-lines');
        if (!extra) {
          extra = document.createElement('div');
          extra.className = 'bnl-lines';
          extra.style.cssText = 'margin-top:.4rem;font-size:.84rem;line-height:1.7;color:#b9c0cb';
          const line = addr.querySelector('.corpLine');
          if (line) line.insertAdjacentElement('afterend', extra); else addr.prepend(extra);
        }
        extra.innerHTML = (f.lines || []).map(function (l) { return '<div>' + esc(l) + '</div>'; }).join('');
      }
      const pol = root.querySelector('.policies');
      if (pol && Array.isArray(f.policies) && f.policies.length) pol.innerHTML = f.policies.map(link).join('');
      const copy = root.querySelector('.copy');
      if (copy && f.copyright) copy.innerHTML = esc(f.copyright).replace(/\n/g, '<br>');
    }
  }
  function boot() {
    const site = window.BNL_SITE;
    if (!site || !site.ready) return;
    const cached = site.cached && site.cached();
    if (cached) render(cached);
    site.ready.then(render);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
