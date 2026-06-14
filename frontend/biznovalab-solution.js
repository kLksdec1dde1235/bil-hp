/* ════════════════════════════════════════════════════════════
   biznovalab-solution.js
   - Supabase(읽기 전용)에서 solution_categories / solution_items 를 받아
     #solutionMarket 를 렌더링합니다.
   - 기존 index.html 의 CSS/마크업(검색·뷰토글·빈상태)은 그대로 사용하며,
     기존 인라인 <script>(빌더) 는 제거하고 이 파일로 대체합니다.
   - supabase-config.js 가 먼저 로드되어 있어야 합니다.
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
      headers: { apikey: CFG.anonKey, Authorization: 'Bearer ' + CFG.anonKey },
    }).then(function (r) {
      if (!r.ok) throw new Error(table + ' 로드 실패 (' + r.status + ')');
      return r.json();
    });
  }

  function boot(data) {
    var root = document.getElementById('solutionMarket');
    if (!root) return;
    root.setAttribute('data-view', 'card');

    var navTabs = document.getElementById('smNavTabs');
    var content = document.getElementById('smContent');
    if (!navTabs || !content) return;
    navTabs.innerHTML = '';
    content.innerHTML = '';

    data.forEach(function (cat, ci) {
      var tab = document.createElement('button');
      tab.className = 'sm-nav-tab';
      tab.setAttribute('data-active', ci === 0 ? 'true' : 'false');
      tab.setAttribute('data-target', cat.id);
      tab.textContent = cat.category;
      tab.type = 'button';
      navTabs.appendChild(tab);

      var sec = document.createElement('div');
      sec.className = 'sm-cat';
      sec.id = cat.id;
      sec.setAttribute('data-hidden', 'false');
      var sliderId = 'smSlider_' + ci;

      var hd = document.createElement('div');
      hd.className = 'sm-cat-header';
      hd.innerHTML =
        '<h2 class="sm-cat-title">' + cat.category + '</h2>' +
        '<div class="sm-arrows">' +
          '<button type="button" class="sm-arrow" data-dir="prev" data-slider="' + sliderId + '"><svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg></button>' +
          '<button type="button" class="sm-arrow" data-dir="next" data-slider="' + sliderId + '"><svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg></button>' +
        '</div>';
      sec.appendChild(hd);

      var subWrap = document.createElement('div');
      subWrap.className = 'sm-sub-wrap';
      var subList = document.createElement('div');
      subList.className = 'sm-sub-list';
      (cat.subs || []).forEach(function (s, si) {
        var btn = document.createElement('button');
        btn.className = 'sm-sub-btn';
        btn.type = 'button';
        btn.textContent = s;
        btn.setAttribute('data-sub', s);
        btn.setAttribute('data-active', si === 0 ? 'true' : 'false');
        subList.appendChild(btn);
      });
      subWrap.appendChild(subList);
      sec.appendChild(subWrap);

      var sw = document.createElement('div');
      sw.className = 'sm-slider-wrap';
      var sl = document.createElement('div');
      sl.className = 'sm-slider';
      sl.id = sliderId;

      cat.items.forEach(function (it) {
        var cd = document.createElement('article');
        cd.className = 'sm-card';
        cd.setAttribute('data-sub', it.sub);
        cd.setAttribute('data-name', (it.name || '').toLowerCase());
        cd.setAttribute('data-tags', (it.tags || []).join(' ').toLowerCase());
        cd.setAttribute('data-hidden', 'false');
        if (it.link) { cd.setAttribute('data-link', it.link); cd.style.cursor = 'pointer'; }
        cd.innerHTML =
          '<div class="sm-card-thumb">' +
            '<img src="' + it.image + '" alt="' + it.name + '" loading="lazy">' +
            '<span class="sm-card-badge">' + it.sub + '</span>' +
          '</div>' +
          '<div class="sm-card-body">' +
            '<div class="sm-card-sub">' + cat.category + ' · ' + it.sub + '</div>' +
            '<div class="sm-card-name">' + it.name + '</div>' +
            '<div class="sm-card-desc">' + it.desc + '</div>' +
            '<div class="sm-card-tags">' + (it.tags || []).map(function (t) { return '<span class="sm-card-tag">' + t + '</span>'; }).join('') + '</div>' +
          '</div>';
        sl.appendChild(cd);
      });
      sw.appendChild(sl);
      sec.appendChild(sw);

      var lw = document.createElement('div');
      lw.className = 'sm-list-wrap';
      cat.items.forEach(function (it) {
        var li = document.createElement('div');
        li.className = 'sm-list-item';
        li.setAttribute('data-sub', it.sub);
        li.setAttribute('data-name', (it.name || '').toLowerCase());
        li.setAttribute('data-tags', (it.tags || []).join(' ').toLowerCase());
        li.setAttribute('data-hidden', 'false');
        if (it.link) { li.setAttribute('data-link', it.link); li.style.cursor = 'pointer'; }
        li.innerHTML =
          '<span class="sm-list-logo">' + it.logo + '</span>' +
          '<div class="sm-list-info"><div class="sm-list-name">' + it.name + '</div><div class="sm-list-sub">' + it.sub + '</div></div>' +
          '<div class="sm-list-desc">' + it.desc + '</div>' +
          '<div class="sm-list-tags">' + (it.tags || []).map(function (t) { return '<span class="sm-list-tag">' + t + '</span>'; }).join('') + '</div>';
        lw.appendChild(li);
      });
      sec.appendChild(lw);

      var nr = document.createElement('div');
      nr.className = 'sm-no-result';
      nr.textContent = '검색 결과가 없습니다.';
      sec.appendChild(nr);

      content.appendChild(sec);
    });

    /* 카드/행 클릭 → 링크 이동 (위임) */
    root.addEventListener('click', function (e) {
      var el = e.target.closest('[data-link]');
      if (el && root.contains(el)) {
        var url = el.getAttribute('data-link');
        if (url) window.open(url, '_blank', 'noopener');
      }
    });

    /* ── 탭 드래그(관성) ── */
    (function () {
      var el = navTabs, dragging = false, moved = false, startX = 0, scrollStart = 0;
      var trackX = [], trackT = [], velX = 0, rafId = 0;
      function momentum() { velX *= 0.94; if (Math.abs(velX) < 0.5) return; el.scrollLeft += velX; rafId = requestAnimationFrame(momentum); }
      el.addEventListener('mousedown', function (e) { cancelAnimationFrame(rafId); dragging = true; moved = false; velX = 0; startX = e.clientX; scrollStart = el.scrollLeft; trackX = [e.clientX]; trackT = [Date.now()]; el.classList.add('dragging'); e.preventDefault(); });
      document.addEventListener('mousemove', function (e) { if (!dragging) return; var dx = e.clientX - startX; if (Math.abs(dx) > 3) moved = true; el.scrollLeft = scrollStart - dx; trackX.push(e.clientX); trackT.push(Date.now()); if (trackX.length > 5) { trackX.shift(); trackT.shift(); } });
      document.addEventListener('mouseup', function () { if (!dragging) return; dragging = false; el.classList.remove('dragging'); if (trackX.length >= 2) { var dt = trackT[trackT.length - 1] - trackT[0]; var dp = trackX[trackX.length - 1] - trackX[0]; if (dt > 0) velX = -dp / dt * 16; } if (Math.abs(velX) > 0.5) rafId = requestAnimationFrame(momentum); });
      el.addEventListener('click', function (e) { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
    })();

    /* ── 스크롤/탭 동기화 ── */
    var allTabs = root.querySelectorAll('.sm-nav-tab');
    var catBlocks = root.querySelectorAll('.sm-cat');
    var smNav = document.getElementById('smNav');
    var ticking = false, currentActive = -1, isClick = false;

    function onScroll() {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () {
        smNav.classList.toggle('scrolled', window.scrollY > 10);
        if (!isClick) {
          var navH = smNav.offsetHeight, na = 0;
          for (var i = 0; i < catBlocks.length; i++) { if (catBlocks[i].getAttribute('data-hidden') !== 'true' && catBlocks[i].getBoundingClientRect().top <= navH + 80) na = i; }
          if (na !== currentActive) {
            currentActive = na;
            allTabs.forEach(function (n, j) { n.setAttribute('data-active', j === currentActive ? 'true' : 'false'); });
            var at = allTabs[currentActive], te = navTabs, tl = at.offsetLeft, tw = at.offsetWidth, sL = te.scrollLeft, vW = te.clientWidth;
            if (tl < sL) te.scrollTo({ left: tl - 16, behavior: 'smooth' });
            else if (tl + tw > sL + vW) te.scrollTo({ left: tl + tw - vW + 16, behavior: 'smooth' });
          }
        }
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    allTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var t = document.getElementById(tab.getAttribute('data-target'));
        if (!t) return;
        allTabs.forEach(function (n) { n.setAttribute('data-active', 'false'); });
        tab.setAttribute('data-active', 'true');
        isClick = true; t.scrollIntoView({ behavior: 'smooth' });
        setTimeout(function () { isClick = false; }, 800);
      });
    });

    /* 뷰 토글 */
    var vBtns = root.querySelectorAll('.sm-view-btn');
    vBtns.forEach(function (b) { b.addEventListener('click', function () { var m = b.getAttribute('data-view'); root.setAttribute('data-view', m); vBtns.forEach(function (v) { v.setAttribute('data-active', v.getAttribute('data-view') === m ? 'true' : 'false'); }); }); });

    /* 화살표 */
    root.querySelectorAll('.sm-arrow').forEach(function (b) { b.addEventListener('click', function () { var s = document.getElementById(b.getAttribute('data-slider')); if (!s) return; var c = s.querySelector('.sm-card:not([data-hidden="true"])'), a = c ? c.offsetWidth + 20 : 340; s.scrollBy({ left: b.getAttribute('data-dir') === 'prev' ? -a : a, behavior: 'smooth' }); }); });

    /* 슬라이더 드래그(관성/스냅) */
    root.querySelectorAll('.sm-slider').forEach(function (s) {
      var dragging = false, startX = 0, scrollStart = 0, trackX = [], trackT = [], velX = 0, rafId = 0, gap = 20;
      function getCardWidth() { var card = s.querySelector('.sm-card:not([data-hidden="true"])'); return card ? card.offsetWidth + gap : 340; }
      function snapToNearest() { var cw = getCardWidth(); var target = Math.round(s.scrollLeft / cw) * cw; (function snapTick() { var remaining = target - s.scrollLeft; if (Math.abs(remaining) < 1) { s.scrollLeft = target; return; } s.scrollLeft += remaining * 0.18; rafId = requestAnimationFrame(snapTick); })(); }
      function momentum() { velX *= 0.94; if (Math.abs(velX) < 1.5) { snapToNearest(); return; } s.scrollLeft += velX; rafId = requestAnimationFrame(momentum); }
      s.addEventListener('mousedown', function (e) { cancelAnimationFrame(rafId); dragging = true; velX = 0; startX = e.clientX; scrollStart = s.scrollLeft; trackX = [e.clientX]; trackT = [Date.now()]; s.style.cursor = 'grabbing'; e.preventDefault(); });
      document.addEventListener('mousemove', function (e) { if (!dragging) return; s.scrollLeft = scrollStart - (e.clientX - startX); trackX.push(e.clientX); trackT.push(Date.now()); if (trackX.length > 5) { trackX.shift(); trackT.shift(); } });
      document.addEventListener('mouseup', function () { if (!dragging) return; dragging = false; s.style.cursor = ''; if (trackX.length >= 2) { var dt = trackT[trackT.length - 1] - trackT[0]; var dp = trackX[trackX.length - 1] - trackX[0]; if (dt > 0) velX = -dp / dt * 16; } if (Math.abs(velX) > 1.5) { rafId = requestAnimationFrame(momentum); } else { snapToNearest(); } });
    });

    /* 서브카테고리 필터 */
    root.querySelectorAll('.sm-sub-list').forEach(function (list) {
      list.addEventListener('click', function (e) {
        var btn = e.target.closest('.sm-sub-btn'); if (!btn) return;
        list.querySelectorAll('.sm-sub-btn').forEach(function (b) { b.setAttribute('data-active', 'false'); });
        btn.setAttribute('data-active', 'true');
        var sub = btn.getAttribute('data-sub');
        var sec = list.closest('.sm-cat');
        var cards = sec.querySelectorAll('.sm-card');
        var listItems = sec.querySelectorAll('.sm-list-item');
        var count = 0;
        cards.forEach(function (c) { var show = sub === '전체' || c.getAttribute('data-sub') === sub; c.setAttribute('data-hidden', show ? 'false' : 'true'); if (show) count++; });
        listItems.forEach(function (l) { var show = sub === '전체' || l.getAttribute('data-sub') === sub; l.setAttribute('data-hidden', show ? 'false' : 'true'); });
        var nr = sec.querySelector('.sm-no-result');
        if (nr) { count === 0 ? nr.classList.add('visible') : nr.classList.remove('visible'); }
      });
    });

    /* 검색 */
    var searchInput = document.getElementById('smSearchInput');
    var searchClear = document.getElementById('smSearchClear');
    var searchCount = document.getElementById('smSearchCount');
    var emptyState = document.getElementById('smEmptyState');
    var emptyKeyword = document.getElementById('smEmptyKeyword');

    function doSearch() {
      var q = searchInput.value.trim().toLowerCase();
      searchClear.classList.toggle('visible', q.length > 0);
      var totalMatch = 0;
      catBlocks.forEach(function (sec) {
        var cards = sec.querySelectorAll('.sm-card');
        var listItems = sec.querySelectorAll('.sm-list-item');
        var catMatch = 0;
        if (q.length > 0) { sec.querySelectorAll('.sm-sub-btn').forEach(function (b, i) { b.setAttribute('data-active', i === 0 ? 'true' : 'false'); }); }
        cards.forEach(function (c) {
          if (q.length === 0) { c.setAttribute('data-hidden', 'false'); catMatch++; return; }
          var n = c.getAttribute('data-name'), t = c.getAttribute('data-tags');
          var match = n.indexOf(q) !== -1 || t.indexOf(q) !== -1;
          c.setAttribute('data-hidden', match ? 'false' : 'true'); if (match) catMatch++;
        });
        listItems.forEach(function (l) {
          if (q.length === 0) { l.setAttribute('data-hidden', 'false'); return; }
          var n = l.getAttribute('data-name'), t = l.getAttribute('data-tags');
          var match = n.indexOf(q) !== -1 || t.indexOf(q) !== -1;
          l.setAttribute('data-hidden', match ? 'false' : 'true');
        });
        totalMatch += catMatch;
        sec.setAttribute('data-hidden', catMatch === 0 && q.length > 0 ? 'true' : 'false');
        var nr = sec.querySelector('.sm-no-result');
        if (nr) { catMatch === 0 && q.length > 0 ? nr.classList.add('visible') : nr.classList.remove('visible'); }
      });
      if (q.length > 0) {
        searchCount.textContent = '"' + searchInput.value.trim() + '" 검색 결과 ' + totalMatch + '개';
        if (totalMatch === 0) { emptyKeyword.textContent = searchInput.value.trim(); emptyState.classList.add('visible'); }
        else { emptyState.classList.remove('visible'); }
      } else { searchCount.textContent = ''; emptyState.classList.remove('visible'); }
    }

    searchInput.addEventListener('input', function () { searchClear.classList.toggle('visible', searchInput.value.trim().length > 0); });
    searchInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); doSearch(); } });
    document.getElementById('smSearchSubmit').addEventListener('click', doSearch);
    searchClear.addEventListener('click', function () { searchInput.value = ''; doSearch(); searchInput.focus(); });
    root.querySelectorAll('.sm-empty-tip').forEach(function (tip) { tip.addEventListener('click', function () { searchInput.value = tip.getAttribute('data-q'); doSearch(); }); });

    requestAnimationFrame(onScroll);
  }

  function init() {
    Promise.all([
      rest('solution_categories', 'is_active=eq.true&order=sort_order.asc'),
      rest('solution_items', 'is_active=eq.true&order=sort_order.asc'),
    ]).then(function (res) {
      var cats = res[0] || [], items = res[1] || [];
      var byCat = {};
      items.forEach(function (it) {
        (byCat[it.category_id] = byCat[it.category_id] || []).push({
          name: it.name, logo: it.logo, sub: it.sub,
          image: it.image_url, desc: it.description,
          tags: it.tags || [], link: it.link || '',
        });
      });
      var data = cats.map(function (c) {
        return { id: c.slug, category: c.name, subs: c.subs || ['전체'], items: byCat[c.id] || [] };
      });
      boot(data);
    }).catch(function (err) {
      console.error('[BNL] solution 로드 오류:', err);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
