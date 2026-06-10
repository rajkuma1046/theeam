/* =====================================================
   SSCExamPrep — Main JavaScript
   Handles: mobile menu, updates feed, filter/search,
            ticker animation, active nav state
   ===================================================== */

// === MOBILE MENU ===
(function() {
  const menuBtn    = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay    = document.getElementById('mmOverlay');
  const closeBtn   = document.getElementById('mmClose');
  if (!menuBtn || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('is-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    closeBtn && closeBtn.focus();
  }
  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    menuBtn.focus();
  }

  menuBtn.addEventListener('click', openMenu);
  closeBtn  && closeBtn.addEventListener('click', closeMenu);
  overlay   && overlay.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) closeMenu();
  });
})();

// === ACTIVE NAV HIGHLIGHT ===
(function() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-main a, .mm-panel a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && href !== '/' && path.startsWith(href)) {
      a.setAttribute('aria-current', 'page');
    } else if (href === '/' && (path === '/' || path === '/index.html')) {
      a.setAttribute('aria-current', 'page');
    }
  });
})();

// === UPDATES FEED CONFIG ===
const TYPE_CFG = {
  result: { label: 'Result',       dot: 'result', tag: 'badge-result', tagText: 'result' },
  admit:  { label: 'Admit Card',   dot: 'admit',  tag: 'badge-admit',  tagText: 'admit' },
  answer: { label: 'Answer Key',   dot: 'answer', tag: 'badge-answer', tagText: 'answer' },
  notif:  { label: 'Latest Job',   dot: 'job',    tag: 'badge-job',    tagText: 'job' },
  job:    { label: 'Latest Job',   dot: 'job',    tag: 'badge-job',    tagText: 'job' },
};


function buildUpdateCard(u) {
  const cfg = TYPE_CFG[u.type] || TYPE_CFG.notif;
  return `
<a href="${u.officialLink || u.link}" target="_blank" rel="noopener noreferrer"
   class="update-item" data-type="${u.type}"
   aria-label="${u.title} — ${cfg.label} — ${u.date}">
  <div class="u-dot ${cfg.dot}" aria-hidden="true"></div>
  <div class="u-content">
    <div class="u-title">${u.title}</div>
    <div class="u-meta">
      <span class="u-tag badge ${cfg.tag}">${cfg.label}</span>
      <span class="u-tag badge" style="background:#F1F5F9;color:#475569">${u.exam}</span>
      <span class="u-date">${u.date}</span>
      ${u.isNew ? '<span class="u-new" aria-label="New">● NEW</span>' : ''}
    </div>
  </div>
  <div class="u-arrow" aria-hidden="true">›</div>
</a>`;
}

// === RENDER UPDATES (Homepage — last 5) ===
function renderHomeUpdates(items) {
  const el = document.getElementById('homeUpdatesList');
  if (!el) return;
  const top5 = items.slice(0, 5);
  el.innerHTML = top5.map(buildUpdateCard).join('');
}

// === RENDER + FILTER UPDATES (Updates Page) ===
let allUpdates = [];

function renderUpdatesPage(items) {
  const el = document.getElementById('updatesGrid');
  if (!el) return;
  if (!items || items.length === 0) {
    el.innerHTML = `<div class="empty-state"><div class="es-icon">🔍</div><p>No updates found. Try a different filter or search term.</p></div>`;
    return;
  }
  el.innerHTML = items.map(buildUpdateCard).join('');
}

function filterUpdates() {
  const activeTab = document.querySelector('.filter-tab.active');
  const activeType = activeTab ? activeTab.dataset.type : 'all';
  const query = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();

  const filtered = allUpdates.filter(u => {
    const typeMatch = activeType === 'all' || 
                      u.type === activeType || 
                      (activeType === 'job' && u.type === 'notif');
    const textMatch = !query ||
      u.title.toLowerCase().includes(query) ||
      u.exam.toLowerCase().includes(query);
    return typeMatch && textMatch;
  });
  renderUpdatesPage(filtered);
}

// Filter tab clicks
document.querySelectorAll('.filter-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    filterUpdates();
  });
});

// Search input
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  let debounceTimer;
  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(filterUpdates, 280);
  });
}

// === LOAD UPDATES JSON ===
async function loadUpdates() {
  try {
    const res  = await fetch('/data/updates.json');
    const data = await res.json();
    allUpdates = data.items || [];

    // Render homepage feed
    renderHomeUpdates(allUpdates);

    // Render updates page
    renderUpdatesPage(allUpdates);

    // Populate ticker
    buildTicker(allUpdates.slice(0, 8));

    // Filter on page load if grid is present (to support pre-selected filter tabs)
    if (document.getElementById('updatesGrid')) {
      filterUpdates();
    }

  } catch (err) {
    console.warn('Could not load updates.json — using fallback');
    const fallback = document.getElementById('homeUpdatesList');
    if (fallback) fallback.innerHTML = '<p class="empty-state">Updates loading... <a href="https://ssc.gov.in">Visit ssc.gov.in</a> for latest info.</p>';
  }
}

// === BUILD TICKER FROM DATA ===
function buildTicker(items) {
  const el = document.getElementById('tickerInner');
  if (!el || !items || !items.length) return;
  const html = items.map(u => `<span class="sep">⚡</span><a href="${u.officialLink}" target="_blank" rel="noopener">${u.title}</a>`).join('');
  el.innerHTML = html + html; // duplicate for seamless loop
}

// Kick off
document.addEventListener('DOMContentLoaded', loadUpdates);
