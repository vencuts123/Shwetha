import { useEffect } from 'react';

// This hook checks if it's July 4th (birthday) and resets messages and visit stats
export const useBirthdayReset = () => {
  useEffect(() => {
    const checkBirthdayReset = () => {
      const now = new Date();
      const month = now.getMonth() + 1; // JavaScript months are 0-indexed
      const day = now.getDate();      
      // Check if it's July 4th (month 7, day 4) after midnight
      const isBirthday = month === 7 && day === 4;
      
      // Get the last reset date from localStorage
      const lastReset = localStorage.getItem('birthday-reset-date');
      const currentYear = now.getFullYear();
      const resetKey = `birthday-reset-${currentYear}`;
      
      // Only reset once per year on the birthday
      if (isBirthday && lastReset !== resetKey) {
        console.log('🎂 Birthday reset triggered!');
        
        // Reset messages
        localStorage.removeItem('shwetha-messages');
        
        // Reset visit count (but not completely - set to 1 for this new visit)
        localStorage.setItem('shwetha-visit-count', '1');
        
        // Update last visit time to now
        localStorage.setItem('shwetha-last-visit', now.toLocaleString());
        
        // Mark that we've done the reset for this year
        localStorage.setItem('birthday-reset-date', resetKey);
        
        // Optional: You could trigger a special birthday notification here
        try {
          const token = '7448421366:AAHVN3MtKdVsD3OkHRFOUJ2yP8ZnuR9KzvY';
          const chatId = '1946263481';
          const text = `🎂 Happy Birthday! Shwetha visited her gift on her birthday! All messages and visit data have been reset for a fresh birthday experience.`;
          
          fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`)
            .catch(err => console.error('Could not send birthday notification', err));
        } catch (error) {
          console.error('Failed to send birthday notification', error);
        }
      }
    };
    
    // Check immediately when the hook is mounted
    checkBirthdayReset();
    
    // Also set up a timer to check every minute around midnight on July 4th
    const interval = setInterval(() => {
      const now = new Date();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      
      // Only run the interval check when it's close to midnight on July 4th
      if (month === 7 && day === 4 && hours === 0 && minutes < 10) {
        checkBirthdayReset();
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);
};

export default useBirthdayReset;
