import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassBoxProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  whileHover?: any;
  whileTap?: any;
  variants?: any;
  initial?: any;
  animate?: any;
  exit?: any;
}

const GlassBox = ({ 
  children, 
  className = "", 
  onClick,
  whileHover,
  whileTap,
  variants,
  initial,
  animate,
  exit
}: GlassBoxProps) => {
  return (
    <motion.div
      className={`backdrop-blur-md bg-white/20 border border-white/30 shadow-lg rounded-xl hardware-accelerated touch-fix ${className}`}
      onClick={onClick}
      whileHover={whileHover || { scale: 1.01 }}
      whileTap={whileTap || { scale: 0.99 }}
      variants={variants}
      initial={initial}
      animate={animate}
      exit={exit}
      style={{ 
        transform: 'translateZ(0)', // Force hardware acceleration
        willChange: 'transform' // Hint to browser for optimization
      }}
    >
      {children}
    </motion.div>
  );
};

export default GlassBox;
