import { useEffect } from 'react';

// More secure approach to sending visit notifications
export const useTelegramVisitNotification = () => {
  useEffect(() => {
    const sendVisitNotification = async () => {
      try {
        // Using the provided token from user
        const token = '7448421366:AAHVN3MtKdVsD3OkHRFOUJ2yP8ZnuR9KzvY';
        const chatId = '1946263481';
        
        // Get device fingerprint info safely
        const safeGetDeviceInfo = () => {
          try {
            // Safer device detection that doesn't reveal too much PII
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const isTablet = /iPad|tablet|Nexus 7/i.test(navigator.userAgent);
            const browser = detectBrowser();
            
            return {
              deviceType: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
              browser,
              language: navigator.language,
              screenSize: `${window.screen.width}x${window.screen.height}`,
              timeOpened: new Date().toLocaleString()
            };
          } catch (e) {
            return {
              deviceType: 'unknown',
              browser: 'unknown',
              timeOpened: new Date().toLocaleString()
            };
          }
        };
        
        const deviceInfo = safeGetDeviceInfo();
        
        const message = `
👀 Shwetha visited her gift
📱 Device: ${deviceInfo.deviceType} (${deviceInfo.browser})
🕒 Time: ${deviceInfo.timeOpened}
📊 Screen: ${deviceInfo.screenSize || 'Unknown'}
`;
        
        // Rate limit - one notification per 5 minutes maximum
        const lastSent = localStorage.getItem('last-visit-notification');
        const now = Date.now();
        
        if (lastSent && now - parseInt(lastSent) < 5 * 60 * 1000) {
          return;
        }
        
        localStorage.setItem('last-visit-notification', now.toString());
        
        // Send notification
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`);
        if (!response.ok) {
          alert('Failed to send Telegram notification. Please check your internet connection or try again later.');
        }
      } catch (error) {
        console.error('Failed to send visit notification', error);
      }
    };
    
    // Only send notification if this is a new session OR if rate limit expired
    const hasVisited = sessionStorage.getItem('hasVisited');
    const lastSent = localStorage.getItem('last-visit-notification');
    const now = Date.now();
    // If never visited this session OR last notification was more than 5 minutes ago, send notification
    if (!hasVisited || !lastSent || now - parseInt(lastSent) >= 5 * 60 * 1000) {
      sendVisitNotification();
      sessionStorage.setItem('hasVisited', 'true');
      localStorage.setItem('last-visit-notification', now.toString());
    }
  }, []);
};

// Helper to detect browser without exposing too much info
const detectBrowser = () => {
  const ua = navigator.userAgent;
  
  if (ua.indexOf('Chrome') > -1) return 'Chrome';
  if (ua.indexOf('Safari') > -1) return 'Safari';
  if (ua.indexOf('Firefox') > -1) return 'Firefox';
  if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident') > -1) return 'IE';
  if (ua.indexOf('Edge') > -1) return 'Edge';
  
  return 'Unknown';
};
