import { useState, useEffect } from 'react';

interface VisitStats {
  count: number;
  lastVisit: string | null;
  increment: () => void;
}

export const useVisitCounter = (): VisitStats => {
  const [count, setCount] = useState(0);
  const [lastVisit, setLastVisit] = useState<string | null>(null);
  
  useEffect(() => {
    // Load visit data from localStorage
    const visitCount = localStorage.getItem('shwetha-visit-count');
    const lastVisitTime = localStorage.getItem('shwetha-last-visit');
    
    if (visitCount) {
      setCount(parseInt(visitCount));
    }
    
    if (lastVisitTime) {
      setLastVisit(lastVisitTime);
    }
  }, []);
  
  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem('shwetha-visit-count', newCount.toString());
    
    const now = new Date().toLocaleString();
    localStorage.setItem('shwetha-last-visit', now);
    setLastVisit(now);
  };
  
  return { count, lastVisit, increment };
};
