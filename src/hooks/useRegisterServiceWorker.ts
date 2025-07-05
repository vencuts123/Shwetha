import { useEffect } from 'react';

export const useRegisterServiceWorker = () => {
  useEffect(() => {
    const registerSW = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register('/service-worker.js');
          console.log('SW registered: ', registration);
          
          // Ensure the service worker is activated
          if (registration.active) {
            console.log('SW is active');
          } else {
            registration.addEventListener('activate', () => {
              console.log('SW is now active');
            });
          }
          
          // Handle updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('New service worker installed, refresh recommended');
                }
              });
            }
          });
          
        } catch (error) {
          console.error('SW registration failed: ', error);
        }
      }
    };
    
    // Register the service worker
    window.addEventListener('load', registerSW);
    
    return () => {
      window.removeEventListener('load', registerSW);
    };
  }, []);
};
