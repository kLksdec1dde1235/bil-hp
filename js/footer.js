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
      display:grid;grid-template-columns:repeat(12,1fr);gap:2.2rem;
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
          <li><a href="./vision.html">비전 & 철학</a></li>
          <li><a href="./history.html">연혁</a></li>
          
        </ul>
      </div>

      <div class="col">
        <h4>칼럼</h4>
        <ul>
          <li><a href="./column.html">혁신 칼럼</a></li>
          <!-- <li><a href="./columns.html?cat=innovation">비즈니스 혁신</a></li>
          <li><a href="./columns.html?cat=insight">산업 인사이트</a></li>
          <li><a href="./columns.html?cat=ceo">CEO 인사이트</a></li> -->
        </ul>
      </div>

      <div class="col">
        <h4>오프라인 상담</h4>
        <ul>
         <li><a href="https://h2u.xyz/">HTU GLOBAL</a></li>
              <li><a href="https://www.maxq.kr/">MAXQ</a></li>
              <li><a href="http://hcn.or.kr/">건강소비자연대</a></li>
              <li><a href="https://www.mdjournal.kr/">MD저널</a></li>
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
