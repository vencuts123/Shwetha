import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassBox from './GlassBox';

const floatingEmojis = ['🩵', '✨', '🎂'];

const IntroSection = ({ onContinue }: { onContinue: () => void }) => {
  const [showButton, setShowButton] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-sky-100 via-blue-200 to-blue-300 overflow-y-auto touch-fix">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Reduced number of floating emojis for better performance */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0.2,
              scale: 0.5
            }}
            animate={{
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight - 100
              ],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)]}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full z-10 relative"
      >
        {/* Animated music tip */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col items-center mb-4"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="text-3xl mb-2"
            aria-label="Music Icon"
          >
            <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-500 drop-shadow">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-2v13" />
              <circle cx="6" cy="18" r="3" fill="#38bdf8" />
              <circle cx="18" cy="16" r="3" fill="#38bdf8" />
            </svg>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-blue-700 text-center text-base font-medium px-2"
          >
            <span className="inline-block animate-pulse">🎧 Click the music icon below to turn on the sound — then scroll and feel the magic of every section unfold with music.<br />This site is best experienced with your heart and headphones. 🩵</span>
          </motion.p>
        </motion.div>

        <GlassBox 
          className="p-6 md:p-8 relative overflow-hidden"
          whileHover={{ scale: 1 }} // Disable hover effect for better performance
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
            animate={{ 
              opacity: [0.2, 0.6, 0.2],
              x: [-100, 300, -100]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
          
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4 md:mb-6 text-center">
            Welcome to "Shwetha🩵"
          </h1>
          
          <div className="space-y-3 md:space-y-4 text-blue-800">
            <p className="font-medium">
              Not just a website. Not just a gift. This is a memory vault. A reflection. A feeling.
            </p>
            
            <p>
              From the very first "Hi" on Snapchat… to the laughs, calls, and that unforgettable day at Phoenix Mall — everything we built together is here, waiting for you.
            </p>
            
            <div className="py-3 md:py-4">
              <h2 className="font-semibold text-lg text-blue-600 mb-2">Inside this surprise:</h2>
              <ul className="space-y-2">
                <motion.li 
                  className="flex items-center"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="mr-2">📜</span> A rewind of our first conversation
                </motion.li>
                <motion.li 
                  className="flex items-center"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="mr-2">🕹️</span> A game built from our journey
                </motion.li>
                <motion.li 
                  className="flex items-center"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="mr-2">📆</span> A timeline of memories
                </motion.li>
                <motion.li 
                  className="flex items-center"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="mr-2">🩵</span> The meaning of our blue heart
                </motion.li>
              </ul>
            </div>
            
            <p className="font-medium">
              It's all made just for you.
            </p>
          </div>
          
          <AnimatePresence>
            {showButton && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex justify-center"
              >
                <motion.button
                  onClick={onContinue}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium shadow-lg flex items-center"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>Let's Begin 🩵</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassBox>
      </motion.div>
    </div>
  );
};

export default IntroSection;
