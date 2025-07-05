import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ scale: 1.05 }}
    >
      <img 
        src="/virtual-gift.png"
        alt="Virtual Gift Logo"
        className="w-full h-full object-contain"
        loading="lazy"
      />
    </motion.div>
  );
};

export default Logo;
