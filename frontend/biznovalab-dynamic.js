/* ════════════════════════════════════════════════════════════
   biznovalab-dynamic.js
   - Supabase(읽기 전용)에서 인트로/카테고리/업체 데이터를 받아
     #nhnHeroSlider 와 #partnerDirectory 를 렌더링합니다.
   - 기존 index.html 의 CSS 를 그대로 사용하며, 기존 인라인
     <script>(슬라이더/디렉터리) 와 하드코딩된 슬라이드 div 는
     제거하고 이 파일 하나로 대체합니다. (README 참고)
   ════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var CFG = window.BNL_SUPABASE || {};
  if (!CFG.url || !CFG.anonKey) {
    console.error('[BNL] supabase-config.js 설정이 필요합니다.');
    return;
  }

  function rest(table, qs) {
    return fetch(CFG.url + '/rest/v1/' + table + '?' + qs, {
      headers: {
        apikey: CFG.anonKey,
        Authorization: 'Bearer ' + CFG.anonKey,
      },
    }).then(function (r) {
      if (!r.ok) throw new Error(table + ' 로드 실패 (' + r.status + ')');
      return r.json();
    });
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ══════════ HERO 렌더 + 컨트롤러 ══════════ */
  function renderHero(slides) {
    var section = document.querySelector('#nhnHeroSlider');
    if (!section) return;
    var slider = section.querySelector('.nhn-slider');
    if (!slider) return;

    if (!slides.length) { section.style.display = 'none'; return; }

    slider.innerHTML = slides.map(function (s, i) {
      var btn = s.button_text
        ? '<a class="nhn-cta" href="' + esc(s.button_link || '#') + '">' + esc(s.button_text) + '</a>'
        : '';
      return '' +
        '<div class="nhn-slide' + (i === 0 ? ' active' : '') + '">' +
          '<div class="nhn-bg"><img src="' + esc(s.image_url) + '" alt=""></div>' +
          '<div class="nhn-content">' +
            '<div class="nhn-title">' + esc(s.title) + '</div>' +
            '<div class="nhn-brand">' + esc(s.brand) + '</div>' +
            '<div class="nhn-desc">' + esc(s.description) + '</div>' +
            btn +
          '</div>' +
        '</div>';
    }).join('');

    /* CTA 버튼 최소 스타일 (1회 주입) */
    if (!document.getElementById('nhn-cta-style')) {
      var st = document.createElement('style');
      st.id = 'nhn-cta-style';
      st.textContent =
        '#nhnHeroSlider .nhn-cta{display:inline-block;margin-top:22px;padding:13px 30px;border:1.5px solid rgba(255,255,255,.85);border-radius:40px;color:#fff;font-weight:600;letter-spacing:.02em;opacity:0;transform:translateY(30px);transition:background .3s,color .3s}' +
        '#nhnHeroSlider .nhn-slide.active .nhn-cta{animation:nhnFadeUp .8s .6s forwards}' +
        '#nhnHeroSlider .nhn-cta:hover{background:#fff;color:#111}';
      document.head.appendChild(st);
    }

    /* ── 컨트롤러 (기존 로직과 동일) ── */
    var slides_ = section.querySelectorAll('.nhn-slide');
    var bar = section.querySelector('.nhn-progress-bar');
    var page = section.querySelector('.nhn-page');
    var btns = section.querySelectorAll('.nhn-btn');
    var index = 0, total = slides_.length, timer = null, INTERVAL = 4000;

    function resetAnimations(slide) {
      slide.querySelectorAll('.nhn-title, .nhn-brand, .nhn-desc, .nhn-cta').forEach(function (el) {
        el.style.animation = 'none'; el.offsetHeight; el.style.animation = '';
      });
    }
    function restartProgress() {
      if (!bar) return;
      bar.style.transition = 'none'; bar.style.width = '0%'; bar.offsetHeight;
      bar.style.transition = 'width ' + (INTERVAL / 1000) + 's linear';
      bar.style.width = '100%';
    }
    function goTo(n) {
      slides_.forEach(function (s) { s.classList.remove('active'); });
      index = n;
      slider.style.transform = 'translateX(-' + (index * 100) + '%)';
      resetAnimations(slides_[index]);
      slides_[index].classList.add('active');
      if (page) page.textContent = String(index + 1).padStart(2, '0') + ' / ' + String(total).padStart(2, '0');
      restartProgress();
    }
    function next() { goTo((index + 1) % total); }
    function prev() { goTo((index - 1 + total) % total); }
    function startAuto() { stopAuto(); timer = setInterval(next, INTERVAL); }
    function stopAuto() { if (timer) { clearInterval(timer); timer = null; } }

    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        btn.getAttribute('data-dir') === 'next' ? next() : prev();
        startAuto();
      });
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { goTo(index); startAuto(); } else { stopAuto(); }
      });
    }, { threshold: 0.3 });
    io.observe(section);

    goTo(0);
  }

  /* ══════════ DIRECTORY 렌더 (기존 빌더 로직 재사용) ══════════ */
  function renderDirectory(data) {
    var root = document.getElementById('partnerDirectory');
    if (!root) return;
    root.setAttribute('data-view', 'card');

    var navTabs = document.getElementById('pdNavTabs');
    var content = document.getElementById('pdContent');
    navTabs.innerHTML = '';
    content.innerHTML = '';

    data.forEach(function (cat, ci) {
      var tab = document.createElement('button');
      tab.className = 'pd-nav-tab';
      tab.setAttribute('data-active', ci === 0 ? 'true' : 'false');
      tab.setAttribute('data-target', cat.id);
      tab.textContent = cat.category;
      tab.type = 'button';
      navTabs.appendChild(tab);

      var sec = document.createElement('div');
      sec.className = 'pd-cat';
      sec.id = cat.id;
      sec.setAttribute('data-hidden', 'false');
      var sliderId = 'pdSlider_' + ci;

      var hd = document.createElement('div');
      hd.className = 'pd-cat-header';
      hd.innerHTML =
        '<h2 class="pd-cat-title">' + esc(cat.category) + '</h2>' +
        '<div class="pd-arrows">' +
          '<button type="button" class="pd-arrow" data-dir="prev" data-slider="' + sliderId + '" aria-label="이전"><svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg></button>' +
          '<button type="button" class="pd-arrow" data-dir="next" data-slider="' + sliderId + '" aria-label="다음"><svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg></button>' +
        '</div>';
      sec.appendChild(hd);

      var sw = document.createElement('div'); sw.className = 'pd-slider-wrap';
      var sl = document.createElement('div'); sl.className = 'pd-slider'; sl.id = sliderId;

      cat.companies.forEach(function (c) {
        var cd = document.createElement('article');
        cd.className = 'pd-card';
        cd.setAttribute('data-name', String(c.name).toLowerCase());
        cd.setAttribute('data-tags', c.tags.join(' ').toLowerCase());
        cd.setAttribute('data-hidden', 'false');
        if (c.link) { cd.setAttribute('data-link', c.link); cd.style.cursor = 'pointer'; }
        cd.innerHTML =
          '<div class="pd-card-thumb">' +
            '<img src="' + esc(c.image) + '" alt="' + esc(c.name) + '" loading="lazy">' +
            '<div class="pd-card-overlay">' +
              '<div class="pd-card-ov-title">' + esc(c.overlay).replace(/\n/g, '<br>') + '</div>' +
              '<div class="pd-card-ov-role">' + esc(c.name) + ' ' + esc(c.role) + '</div>' +
            '</div>' +
          '</div>' +
          '<div class="pd-card-meta">' +
            '<span class="pd-card-meta-cat" style="color:' + cat.accent + '">' + esc(cat.category) + '</span>' +
            '<span class="pd-card-meta-sep"></span>' +
            '<span class="pd-card-meta-desc">' + esc(c.desc) + '</span>' +
          '</div>' +
          '<div class="pd-card-name">' + esc(c.name) + ' | ' + esc(c.role) + '</div>' +
          '<div class="pd-card-tags">' + c.tags.map(function (t) { return '<span class="pd-tag">' + esc(t) + '</span>'; }).join('') + '</div>';
        sl.appendChild(cd);
      });
      sw.appendChild(sl); sec.appendChild(sw);

      var lw = document.createElement('div'); lw.className = 'pd-list-wrap';
      cat.companies.forEach(function (c, idx) {
        var item = document.createElement('div');
        item.className = 'pd-list-item';
        item.setAttribute('data-name', String(c.name).toLowerCase());
        item.setAttribute('data-tags', c.tags.join(' ').toLowerCase());
        item.setAttribute('data-hidden', 'false');
        if (c.link) { item.setAttribute('data-link', c.link); item.style.cursor = 'pointer'; }
        item.innerHTML =
          '<span class="pd-list-num">' + String(idx + 1).padStart(2, '0') + '</span>' +
          '<span class="pd-list-logo">' + esc(c.logo) + '</span>' +
          '<div class="pd-list-info">' +
            '<div class="pd-list-name">' + esc(c.name) + '</div>' +
            '<div class="pd-list-role">' + esc(c.role) + '</div>' +
          '</div>' +
          '<div class="pd-list-desc">' + esc(c.desc) + '</div>' +
          '<div class="pd-list-tags">' + c.tags.map(function (t) { return '<span class="pd-list-tag">' + esc(t) + '</span>'; }).join('') + '</div>';
        lw.appendChild(item);
      });
      sec.appendChild(lw);

      var nr = document.createElement('div');
      nr.className = 'pd-no-result';
      nr.textContent = '검색 결과가 없습니다.';
      sec.appendChild(nr);

      content.appendChild(sec);
    });

    initDirectoryInteractions(root, navTabs);
  }

  /* 인터랙션 (탭 드래그/스크롤스파이/뷰토글/화살표/검색/링크) — 기존 로직 동일 */
  function initDirectoryInteractions(root, navTabs) {
    /* 링크 이동 */
    root.addEventListener('click', function (e) {
      var el = e.target.closest('[data-link]');
      if (el && el.getAttribute('data-link')) window.open(el.getAttribute('data-link'), '_blank');
    });

    /* 카테고리 탭 드래그 */
    (function () {
      var el = navTabs, isDown = false, startX = 0, scrollLeft = 0, hasMoved = false;
      el.addEventListener('mousedown', function (e) { isDown = true; hasMoved = false; el.classList.add('dragging'); startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; e.preventDefault(); });
      el.addEventListener('mouseleave', function () { isDown = false; el.classList.remove('dragging'); });
      el.addEventListener('mouseup', function () { isDown = false; el.classList.remove('dragging'); });
      el.addEventListener('mousemove', function (e) { if (!isDown) return; var x = e.pageX - el.offsetLeft; var walk = (x - startX) * 1.5; if (Math.abs(walk) > 4) hasMoved = true; el.scrollLeft = scrollLeft - walk; });
      el.addEventListener('click', function (e) { if (hasMoved) { e.stopPropagation(); e.preventDefault(); hasMoved = false; } }, true);
    })();

    var allTabs = root.querySelectorAll('.pd-nav-tab');
    var catBlocks = root.querySelectorAll('.pd-cat');
    var pdNav = document.getElementById('pdNav');
    var ticking = false, currentActive = -1, isClickScrolling = false;

    function onScroll() {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () {
        if (pdNav) pdNav.classList.toggle('scrolled', window.scrollY > 10);
        if (!isClickScrolling && pdNav) {
          var navH = pdNav.offsetHeight, newActive = 0;
          for (var i = 0; i < catBlocks.length; i++) {
            if (catBlocks[i].getAttribute('data-hidden') !== 'true' && catBlocks[i].getBoundingClientRect().top <= navH + 60) newActive = i;
          }
          if (newActive !== currentActive) {
            currentActive = newActive;
            allTabs.forEach(function (n, j) { n.setAttribute('data-active', j === currentActive ? 'true' : 'false'); });
            var activeTab = allTabs[currentActive], tabsEl = navTabs;
            if (activeTab) {
              var tabLeft = activeTab.offsetLeft, tabWidth = activeTab.offsetWidth, scrollL = tabsEl.scrollLeft, visibleW = tabsEl.clientWidth;
              if (tabLeft < scrollL) tabsEl.scrollTo({ left: tabLeft - 16, behavior: 'smooth' });
              else if (tabLeft + tabWidth > scrollL + visibleW) tabsEl.scrollTo({ left: tabLeft + tabWidth - visibleW + 16, behavior: 'smooth' });
            }
          }
        }
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    allTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = document.getElementById(tab.getAttribute('data-target'));
        if (!target) return;
        allTabs.forEach(function (n) { n.setAttribute('data-active', 'false'); });
        tab.setAttribute('data-active', 'true');
        isClickScrolling = true;
        target.scrollIntoView({ behavior: 'smooth' });
        setTimeout(function () { isClickScrolling = false; }, 800);
      });
    });

    var viewBtns = root.querySelectorAll('.pd-view-btn');
    viewBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var mode = btn.getAttribute('data-view');
        root.setAttribute('data-view', mode);
        viewBtns.forEach(function (b) { b.setAttribute('data-active', b.getAttribute('data-view') === mode ? 'true' : 'false'); });
      });
    });

    root.querySelectorAll('.pd-arrow').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var slider = document.getElementById(btn.getAttribute('data-slider'));
        if (!slider) return;
        var card = slider.querySelector('.pd-card');
        var amt = card ? card.offsetWidth + 24 : 400;
        slider.scrollBy({ left: btn.getAttribute('data-dir') === 'prev' ? -amt : amt, behavior: 'smooth' });
      });
    });

    root.querySelectorAll('.pd-slider').forEach(function (sl) {
      var down = false, sx, sLeft;
      sl.addEventListener('mousedown', function (e) { down = true; sl.style.cursor = 'grabbing'; sx = e.pageX - sl.offsetLeft; sLeft = sl.scrollLeft; });
      sl.addEventListener('mouseleave', function () { down = false; sl.style.cursor = ''; });
      sl.addEventListener('mouseup', function () { down = false; sl.style.cursor = ''; });
      sl.addEventListener('mousemove', function (e) { if (!down) return; e.preventDefault(); sl.scrollLeft = sLeft - ((e.pageX - sl.offsetLeft) - sx) * 1.2; });
    });

    /* 검색 */
    var searchInput = document.getElementById('pdSearchInput');
    var searchClear = document.getElementById('pdSearchClear');
    var searchCount = document.getElementById('pdSearchCount');
    var emptyState = document.getElementById('pdEmptyState');
    var emptyKeyword = document.getElementById('pdEmptyKeyword');

    function doSearch() {
      var q = searchInput.value.trim().toLowerCase();
      searchClear.classList.toggle('visible', q.length > 0);
      var totalMatch = 0;
      catBlocks.forEach(function (sec) {
        var cards = sec.querySelectorAll('.pd-card');
        var listItems = sec.querySelectorAll('.pd-list-item');
        var catMatch = 0;
        cards.forEach(function (c) {
          if (q.length === 0) { c.setAttribute('data-hidden', 'false'); catMatch++; return; }
          var match = c.getAttribute('data-name').indexOf(q) !== -1 || c.getAttribute('data-tags').indexOf(q) !== -1;
          c.setAttribute('data-hidden', match ? 'false' : 'true'); if (match) catMatch++;
        });
        listItems.forEach(function (l) {
          if (q.length === 0) { l.setAttribute('data-hidden', 'false'); return; }
          var match = l.getAttribute('data-name').indexOf(q) !== -1 || l.getAttribute('data-tags').indexOf(q) !== -1;
          l.setAttribute('data-hidden', match ? 'false' : 'true');
        });
        totalMatch += catMatch;
        sec.setAttribute('data-hidden', catMatch === 0 && q.length > 0 ? 'true' : 'false');
        var nr = sec.querySelector('.pd-no-result');
        if (nr) { (catMatch === 0 && q.length > 0) ? nr.classList.add('visible') : nr.classList.remove('visible'); }
      });
      if (q.length > 0) {
        searchCount.textContent = '"' + searchInput.value.trim() + '" 검색 결과 ' + totalMatch + '개';
        if (totalMatch === 0) { emptyKeyword.textContent = searchInput.value.trim(); emptyState.classList.add('visible'); }
        else emptyState.classList.remove('visible');
      } else { searchCount.textContent = ''; emptyState.classList.remove('visible'); }
    }
    if (searchInput) {
      searchInput.addEventListener('input', function () { searchClear.classList.toggle('visible', searchInput.value.trim().length > 0); });
      searchInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); doSearch(); } });
      document.getElementById('pdSearchSubmit').addEventListener('click', doSearch);
      searchClear.addEventListener('click', function () { searchInput.value = ''; doSearch(); searchInput.focus(); });
      root.querySelectorAll('.pd-empty-tip').forEach(function (tip) {
        tip.addEventListener('click', function () { searchInput.value = tip.getAttribute('data-q'); doSearch(); });
      });
    }
    requestAnimationFrame(onScroll);
  }

  /* ══════════ 부트스트랩 ══════════ */
  function detectHeroKey() {
    var section = document.querySelector('#nhnHeroSlider');
    // 1) 명시적 지정 우선: <section id="nhnHeroSlider" data-hero-key="incubation">
    var explicit = section && section.getAttribute('data-hero-key');
    if (explicit) return explicit;
    // 2) 같은 페이지에 어떤 섹션이 있는지로 자동 판별
    if (document.getElementById('innovationIncubationLab')) return 'incubation';
    if (document.getElementById('solutionMarket')) return 'solution';
    return 'partners';
  }

  function boot() {
    // HERO (페이지별 슬라이드만 로드)
    var heroKey = detectHeroKey();
    rest('hero_slides', 'page_key=eq.' + encodeURIComponent(heroKey) + '&is_active=eq.true&order=sort_order.asc')
      .then(renderHero)
      .catch(function (e) { console.error('[BNL hero]', e); });

    // DIRECTORY (categories + companies 합치기) — 해당 섹션이 있는 페이지에서만
    if (!document.getElementById('partnerDirectory')) return;
    Promise.all([
      rest('categories', 'is_active=eq.true&order=sort_order.asc'),
      rest('companies', 'is_active=eq.true&order=sort_order.asc'),
    ]).then(function (res) {
      var cats = res[0], comps = res[1];
      var data = cats.map(function (cat) {
        return {
          id: cat.slug,
          category: cat.name,
          accent: cat.accent,
          companies: comps.filter(function (c) { return c.category_id === cat.id; }).map(function (c) {
            return {
              name: c.name, logo: c.logo, role: c.role,
              image: c.image_url, overlay: c.overlay, desc: c.description,
              tags: Array.isArray(c.tags) ? c.tags : [],
              link: c.link || '',
            };
          }),
        };
      });
      renderDirectory(data);
    }).catch(function (e) { console.error('[BNL directory]', e); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
