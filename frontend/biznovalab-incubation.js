/* ════════════════════════════════════════════════════════════
   biznovalab-incubation.js
   - Supabase(읽기 전용)에서 incubation_filters / incubation_projects 를 받아
     #innovationIncubationLab 를 렌더링합니다.
   - 기존 index.html 의 CSS/마크업은 그대로 사용하며, 기존 인라인
     <script>(빌더) 는 제거하고 이 파일로 대체합니다.
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

  function escapeText(str) {
    return String(str == null ? '' : str).replace(/[&<>'"]/g, function (s) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[s];
    });
  }

  function boot(filterRows, projectRows) {
    var root = document.getElementById('innovationIncubationLab');
    if (!root) return;
    root.setAttribute('data-view', 'card');

    // 'all' 이 없으면 맨 앞에 자동 추가
    var hasAll = filterRows.some(function (f) { return f.key === 'all'; });
    var filters = (hasAll ? [] : [{ key: 'all', label: '전체', title: '전체 프로젝트', desc: '' }]).concat(
      filterRows.map(function (r) {
        return { key: r.key, label: r.label, title: r.title, desc: r.description };
      })
    );

    var projects = projectRows.map(function (r) {
      return {
        code: r.code, category: r.categories || [], title: r.title,
        base: r.mix_base, add: r.mix_add, plus: r.mix_plus,
        result: r.result, copy: r.copy, stage: r.stage,
        image: r.image_url, link: r.link || '',
      };
    });

    var tabsEl = document.getElementById('iilTabs');
    var gridEl = document.getElementById('iilGrid');
    var listRowsEl = document.getElementById('iilListRows');
    var emptyEl = document.getElementById('iilEmpty');
    var currentTitleEl = document.getElementById('iilCurrentTitle');
    var currentDescEl = document.getElementById('iilCurrentDesc');
    var navEl = document.getElementById('iilNav');
    var activeFilter = 'all';

    function getFiltered() {
      if (activeFilter === 'all') return projects.slice();
      return projects.filter(function (p) { return p.category.indexOf(activeFilter) > -1; });
    }

    function statusColor(stage) {
      if (stage === '운영중') return '#2f9e5f';
      if (stage === '진행중') return '#2468db';
      if (stage === '검증중') return '#d28c00';
      if (stage === '개발중') return '#6d59c7';
      if (stage === '실험중') return '#d75b37';
      return '#aaa';
    }

    function renderTabs() {
      tabsEl.innerHTML = filters.map(function (f) {
        return '<button class="iil-tab" type="button" data-filter="' + f.key + '" data-active="' + (f.key === activeFilter ? 'true' : 'false') + '">' + escapeText(f.label) + '</button>';
      }).join('');
      tabsEl.querySelectorAll('.iil-tab').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activeFilter = btn.getAttribute('data-filter');
          renderAll();
        });
      });
    }

    function renderHeader() {
      var meta = filters.filter(function (f) { return f.key === activeFilter; })[0] || filters[0];
      currentTitleEl.textContent = meta.title;
      currentDescEl.textContent = meta.desc || '';
    }

    function linkAttr(p) {
      return p.link ? ' data-link="' + escapeText(p.link) + '" style="cursor:pointer"' : '';
    }

    function renderCards(filtered) {
      gridEl.innerHTML = filtered.map(function (p) {
        return '' +
        '<article class="iil-card iil-fade"' + linkAttr(p) + '>' +
          '<div class="iil-card-thumb">' +
            '<img src="' + p.image + '" alt="' + escapeText(p.title) + '" loading="lazy">' +
            '<div class="iil-card-overlay">' +
              '<div class="iil-card-ov-title">' + escapeText(p.title) + '</div>' +
              '<div class="iil-card-ov-role">' + escapeText(p.stage) + '</div>' +
            '</div>' +
          '</div>' +
          '<div class="iil-card-meta">' +
            '<span class="iil-card-meta-cat" style="color:' + statusColor(p.stage) + '">' + escapeText(p.code) + '</span>' +
            '<span class="iil-card-meta-sep"></span>' +
            '<span class="iil-card-meta-desc">업종 결합 프로젝트</span>' +
          '</div>' +
          '<div class="iil-card-name">' + escapeText(p.copy) + '</div>' +
          '<div class="iil-mix-box">' +
            '<span class="iil-mix-label">BUSINESS MIX</span>' +
            '<div class="iil-mix-line">' +
              '<span class="iil-tag">' + escapeText(p.base) + '</span>' +
              '<span class="iil-plus">+</span>' +
              '<span class="iil-tag">' + escapeText(p.add) + '</span>' +
              '<span class="iil-plus">+</span>' +
              '<span class="iil-tag">' + escapeText(p.plus) + '</span>' +
            '</div>' +
            '<div class="iil-result-box">' +
              '<span class="iil-result-label">PROJECT RESULT</span>' +
              '<span class="iil-result-text">' + escapeText(p.result) + '</span>' +
            '</div>' +
          '</div>' +
        '</article>';
      }).join('');
    }

    function renderList(filtered) {
      listRowsEl.innerHTML = filtered.map(function (p) {
        return '' +
        '<article class="iil-list-row iil-fade"' + linkAttr(p) + '>' +
          '<div class="iil-list-code">' + escapeText(p.code) + '</div>' +
          '<div><div class="iil-list-title">' + escapeText(p.title) + '</div><span class="iil-list-copy">' + escapeText(p.copy) + '</span></div>' +
          '<div class="iil-list-mix">' +
            '<span>' + escapeText(p.base) + '</span><b>+</b>' +
            '<span>' + escapeText(p.add) + '</span><b>+</b>' +
            '<span>' + escapeText(p.plus) + '</span>' +
          '</div>' +
          '<div class="iil-list-result">' + escapeText(p.result) + '</div>' +
          '<div><span class="iil-status-pill"><span class="iil-status-dot" style="background:' + statusColor(p.stage) + '"></span>' + escapeText(p.stage) + '</span></div>' +
        '</article>';
      }).join('');
    }

    function playFade() {
      root.querySelectorAll('.iil-fade').forEach(function (el, idx) {
        el.classList.remove('show');
        setTimeout(function () { el.classList.add('show'); }, idx * 35);
      });
    }

    function renderAll() {
      renderTabs();
      var filtered = getFiltered();
      renderHeader();
      renderCards(filtered);
      renderList(filtered);
      emptyEl.classList.toggle('show', filtered.length === 0);
      playFade();
    }

    // 카드/행 클릭 → 링크 이동 (위임)
    root.addEventListener('click', function (e) {
      var el = e.target.closest('[data-link]');
      if (el && root.contains(el)) {
        var url = el.getAttribute('data-link');
        if (url) window.open(url, '_blank', 'noopener');
      }
    });

    // 뷰 토글
    root.querySelectorAll('.iil-view-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var view = btn.getAttribute('data-view');
        root.setAttribute('data-view', view);
        root.querySelectorAll('.iil-view-btn').forEach(function (b) {
          b.setAttribute('data-active', b.getAttribute('data-view') === view ? 'true' : 'false');
        });
        playFade();
      });
    });

    window.addEventListener('scroll', function () {
      navEl.classList.toggle('scrolled', window.scrollY > root.offsetTop + 20);
    }, { passive: true });

    // 탭 드래그 스크롤
    (function () {
      var el = tabsEl, isDown = false, startX = 0, scrollLeft = 0, hasMoved = false;
      el.addEventListener('mousedown', function (e) { isDown = true; hasMoved = false; el.classList.add('dragging'); startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; e.preventDefault(); });
      el.addEventListener('mouseleave', function () { isDown = false; el.classList.remove('dragging'); });
      el.addEventListener('mouseup', function () { isDown = false; el.classList.remove('dragging'); });
      el.addEventListener('mousemove', function (e) { if (!isDown) return; var x = e.pageX - el.offsetLeft; var walk = (x - startX) * 1.5; if (Math.abs(walk) > 4) hasMoved = true; el.scrollLeft = scrollLeft - walk; });
      el.addEventListener('click', function (e) { if (hasMoved) { e.preventDefault(); e.stopPropagation(); hasMoved = false; } }, true);
    })();

    renderAll();
  }

  function init() {
    Promise.all([
      rest('incubation_filters', 'is_active=eq.true&order=sort_order.asc'),
      rest('incubation_projects', 'is_active=eq.true&order=sort_order.asc'),
    ]).then(function (res) {
      boot(res[0] || [], res[1] || []);
    }).catch(function (err) {
      console.error('[BNL] incubation 로드 오류:', err);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
