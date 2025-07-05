// registerServiceWorker.ts
// Registers the service worker and notifies the app when a new version is available.

export function registerServiceWorker(onUpdate: () => void) {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        // Listen for updates to the service worker
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // New update available
                  onUpdate();
                }
              }
            };
          }
        };
      }).catch(error => {
        // Registration failed
        console.error('Service worker registration failed:', error);
      });
    });
  }
}
