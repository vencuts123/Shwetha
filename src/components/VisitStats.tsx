import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassBox from './GlassBox';

const VisitStats = () => {
  const [visits, setVisits] = useState(0);
  const [lastVisit, setLastVisit] = useState<string | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    // Load visit data from localStorage
    const visitCount = localStorage.getItem('shwetha-visit-count');
    const lastVisitTime = localStorage.getItem('shwetha-last-visit');
    
    // Update visit count
    let count = 1;
    if (visitCount) {
      count = parseInt(visitCount);
    }
    setVisits(count);
    
    // Update last visit time
    if (lastVisitTime) {
      setLastVisit(lastVisitTime);
    }
    
    // Set current visit time
    const now = new Date().toLocaleString();
    localStorage.setItem('shwetha-last-visit', now);
    
    // Show stats after a delay
    const timer = setTimeout(() => {
      setShowStats(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!showStats || visits <= 0) {
    return null;
  }
    
  const getVisitMessage = () => {
    if (visits === 1) {
      return "This is your first visit! 🎉";
    } else if (visits <= 3) {
      return "You're just getting started! 🩵";
    } else if (visits <= 10) {
      return "You really care! 💙";
    } else {
      return "Wow! You visit so often! 🥰";
    }
  };
  
  return (
    <AnimatePresence>
      {showStats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-20 right-6 z-40"
        >
          <GlassBox 
            className={`p-3 ${isExpanded ? 'min-w-[250px]' : 'max-w-[200px]'}`}
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-blue-600">
                {isExpanded ? "Visit Statistics" : `${visits} Visits 🩵`}
              </div>
              <button 
                className="text-blue-500 text-xs ml-2"
                aria-label={isExpanded ? "Show less" : "Show more"}
              >
                {isExpanded ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                )}
              </button>
            </div>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 text-xs text-blue-600 space-y-2"
                >
                  <div className="p-2 bg-blue-50/70 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">Total Visits</span>
                      <span className="text-sm text-blue-500 font-bold">{visits}</span>
                    </div>
                    
                    <div className="w-full bg-blue-100 rounded-full h-1.5 mb-1">
                      <div 
                        className="bg-blue-500 h-1.5 rounded-full" 
                        style={{ width: `${Math.min(100, visits * 10)}%` }}
                      ></div>
                    </div>
                    
                    <div className="text-blue-500 italic">{getVisitMessage()}</div>
                  </div>
                  
                  {lastVisit && (
                    <div className="bg-blue-50/70 p-2 rounded-lg">
                      <div className="font-medium mb-1">Previous Visit</div>
                      <div className="text-blue-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        {lastVisit}
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center text-blue-400 text-xs italic">
                    Memories are best when revisited 🩵
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassBox>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VisitStats;
