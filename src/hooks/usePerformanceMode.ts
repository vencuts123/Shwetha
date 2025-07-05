import { useState, useEffect } from 'react';

export const usePerformanceMode = () => {
  const [isLowPerformance, setIsLowPerformance] = useState(() => {
    // Check if there's a saved preference
    const savedMode = localStorage.getItem('performance-mode');
    if (savedMode) {
      return savedMode === 'low';
    }
    
    // Auto-detect if device might be low-powered
    return detectLowPoweredDevice();
  });
  
  useEffect(() => {
    // Save the current preference
    localStorage.setItem('performance-mode', isLowPerformance ? 'low' : 'high');
    
    // Apply performance mode settings to body
    if (isLowPerformance) {
      document.body.classList.add('low-performance-mode');
    } else {
      document.body.classList.remove('low-performance-mode');
    }
    
    // Apply reduced animations for low performance mode
    const style = document.createElement('style');
    if (isLowPerformance) {
      style.textContent = `
        .motion-reduce {
          transition-duration: 0ms !important;
          animation-duration: 0ms !important;
        }
        
        @media (prefers-reduced-motion: reduce) {
          *, ::before, ::after {
            animation-delay: -0.01ms !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `;
    }
    document.head.appendChild(style);
    
    return () => {
      if (style.parentNode) {
        document.head.removeChild(style);
      }
    };
  }, [isLowPerformance]);
  
  const togglePerformanceMode = () => {
    setIsLowPerformance(prev => !prev);
  };
  
  return { isLowPerformance, togglePerformanceMode };
};

const detectLowPoweredDevice = (): boolean => {
  // Check if device is mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Check if device has limited memory or CPU cores
  const hasLimitedResources = 
    typeof (navigator as any).deviceMemory !== 'undefined' && (navigator as any).deviceMemory < 4 || 
    typeof (navigator as any).hardwareConcurrency !== 'undefined' && (navigator as any).hardwareConcurrency < 4;
  
  // Check if the browser reports low-end experience
  const hasLowEndExperience = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Check if it's an older iOS device (which often struggles with animations)
  const isOlderIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) && 
                     !(/OS 15_|OS 16_|OS 17_/.test(navigator.userAgent));
  
  return isMobile || hasLimitedResources || hasLowEndExperience || isOlderIOS;
};
