(function () {
  // Build the full list of URLs to cache. Prefer the build-generated
  // offline-manifest.json (every page + every image + assets) so chapters work
  // offline WITH their screenshots; fall back to the current page's links/assets.
  async function getAllPageUrls() {
    let urls = [];
    try {
      const r = await fetch(new URL('/offline-manifest.json', location.origin), {
        credentials: 'same-origin'
      });
      if (r.ok) {
        const list = await r.json();
        urls = list.map(u => new URL(u, location.origin).href);
      }
    } catch (_) { /* manifest missing — fall back below */ }

    const links = Array.from(document.querySelectorAll(
      '.md-nav__link[href], .md-footer-nav__link[href]'
    )).map(a => a.href).filter(h => h.startsWith(location.origin));
    const assets = Array.from(document.querySelectorAll(
      'link[rel="stylesheet"], script[src], img[src]'
    )).map(el => el.href || el.src).filter(Boolean);

    return [...new Set([...urls, ...links, ...assets, location.href])];
  }

  function getCacheStatus(cb) {
    if (!('caches' in window)) return cb('unavailable');
    caches.open('pag-sops-v1').then(cache => {
      cache.keys().then(keys => cb(keys.length > 5 ? 'cached' : 'uncached'));
    });
  }

  function createButton() {
    const btn = document.createElement('button');
    btn.id = 'pag-offline-btn';
    btn.setAttribute('aria-label', 'Download for offline use');
    btn.setAttribute('title', 'Download for offline use');
    btn.style.cssText = [
      'background:none',
      'border:1.5px solid rgba(255,255,255,0.3)',
      'border-radius:6px',
      'color:rgba(255,255,255,0.8)',
      'cursor:pointer',
      'display:flex',
      'align-items:center',
      'gap:5px',
      'font-size:11px',
      'font-weight:600',
      'padding:5px 10px',
      'margin-left:8px',
      'transition:all 0.15s',
      'white-space:nowrap'
    ].join(';');

    function setIcon(state) {
      const icons = {
        uncached: '⬇ Save offline',
        downloading: '⏳ Saving…',
        cached: '✓ Offline ready',
        unavailable: ''
      };
      btn.textContent = icons[state] || '';
      btn.style.borderColor = state === 'cached'
        ? 'rgba(143,183,62,0.7)'
        : state === 'downloading'
          ? 'rgba(255,255,255,0.15)'
          : 'rgba(255,255,255,0.3)';
      btn.style.color = state === 'cached' ? '#8FB73E' : 'rgba(255,255,255,0.8)';
      btn.disabled = state === 'downloading' || state === 'cached'
        || state === 'unavailable';
    }

    getCacheStatus(s => setIcon(s));

    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener('message', e => {
        if (e.data.type === 'CACHE_PROGRESS') {
          btn.textContent = '⏳ ' + e.data.done + '/' + e.data.total;
        }
        if (e.data.type === 'CACHE_DONE') setIcon('cached');
      });
    }

    window.addEventListener('sw-update-available', () => {
      setIcon('uncached');
      btn.disabled = false;
    });

    btn.addEventListener('click', async () => {
      if (!navigator.serviceWorker.controller) return;
      setIcon('downloading');
      const urls = await getAllPageUrls();
      navigator.serviceWorker.controller.postMessage({ type: 'CACHE_ALL', urls });
    });

    return btn;
  }

  function inject() {
    const header = document.querySelector('.md-header__inner');
    if (!header || document.getElementById('pag-offline-btn')) return;
    if (!('serviceWorker' in navigator)) return;
    header.appendChild(createButton());
  }

  inject();
  document.addEventListener('DOMContentLoaded', inject);
  window.addEventListener('load', inject);
})();
