import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PerformanceToggleProps {
  isLowPerformance: boolean;
  onToggle: () => void;
}

const PerformanceToggle = ({ isLowPerformance, onToggle }: PerformanceToggleProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);
  
  return (
    <div className="fixed top-20 right-4 z-50">
      <div className="relative">
        <motion.button
          onClick={() => {
            onToggle();
            setShowTooltip(true);
          }}
          className={`w-10 h-10 rounded-full shadow-lg flex items-center justify-center ${
            isLowPerformance ? 'bg-gray-200 text-blue-600' : 'bg-blue-500 text-white'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle performance mode"
        >
          {isLowPerformance ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4 14 10 14 10 20"></polyline>
              <polyline points="20 10 14 10 14 4"></polyline>
              <line x1="14" y1="10" x2="21" y2="3"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
            </svg>
          )}
        </motion.button>
        
        <AnimatedTooltip 
          isVisible={showTooltip} 
          text={isLowPerformance ? "Lite mode enabled" : "Full experience enabled"} 
        />
      </div>
    </div>
  );
};

interface AnimatedTooltipProps {
  isVisible: boolean;
  text: string;
}

const AnimatedTooltip = ({ isVisible, text }: AnimatedTooltipProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : -10
      }}
      className="absolute right-0 top-12 w-40 bg-white/90 backdrop-blur-sm text-blue-600 p-2 rounded-lg text-xs shadow-lg text-center"
    >
      {text}
    </motion.div>
  );
};

export default PerformanceToggle;
