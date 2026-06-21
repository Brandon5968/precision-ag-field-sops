if ('serviceWorker' in navigator) {
  // When a new service worker (new deploy) takes control, reload once so the
  // page picks up fresh content instead of serving the old cached version.
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(reg => {
      reg.addEventListener('updatefound', () => {
        const worker = reg.installing;
        worker.addEventListener('statechange', () => {
          if (worker.state === 'installed' && navigator.serviceWorker.controller) {
            window.dispatchEvent(new Event('sw-update-available'));
          }
        });
      });
    }).catch(() => {});
  });
}
