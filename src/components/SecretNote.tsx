import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassBox from './GlassBox';
import useSound from 'use-sound';

const SecretNote = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [activeLine, setActiveLine] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Secret note content
  const noteContent = `This is just between us... I want you to know that no matter what happens, you'll always have a special place in my heart. 💙

Through all the ups and downs, the distance, and the challenges, what we have is real and precious.

I cherish every memory, every laugh, and even every argument because it all brought us closer.

You're my favorite thought when I wake up and my last thought before I sleep. Always. 💙`;

  // Split into lines for animation
  const noteLines = noteContent.split('\n\n');
  
  // Paper sound effect
  const [playPaperSound] = useSound('/paper-flip.mp3', { volume: 0.4 });
  // Unlock sound effect
  const [playUnlockSound] = useSound('/unlock-sound.mp3', { volume: 0.4 });
  
  const handleUnlock = () => {
    playUnlockSound();
    
    setTimeout(() => {
      setIsUnlocked(true);
      playPaperSound();
      revealText();
    }, 500);
  };
  
  const revealText = () => {
    // Reset
    setVisibleLines([]);
    setActiveLine(0);
    
    // Reveal each line with delay
    noteLines.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, line]);
        setActiveLine(index);
      }, (index + 1) * 3000); // 3 second delay between lines
    });
  };
  
  // Hearts background animation
  const FloatingHearts = () => {
    const hearts = Array.from({ length: 15 });
    
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {hearts.map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl z-10"
            initial={{ 
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              top: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              left: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              opacity: [0, 0.2, 0],
              scale: [0.5, 0.8, 0.5],
              rotate: Math.random() * 360
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            🩵
          </motion.div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 relative">
      <FloatingHearts />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <GlassBox className="p-6 mb-8 text-center">
          <h2 className="text-2xl font-bold text-blue-600">💬 Secret Note – Just Between Us 🤫</h2>
          <p className="text-blue-700">Words meant only for you</p>
        </GlassBox>
        
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="max-w-lg mx-auto"
            >
              <button
                type="button"
                onClick={handleUnlock}
                tabIndex={0}
                aria-label="Unlock secret note"
                className="w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg"
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') handleUnlock();
                }}
                style={{ background: 'none', border: 'none', padding: 0 }}
              >
                <GlassBox 
                  className="p-8 text-center cursor-pointer relative overflow-hidden"
                  whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(0,150,255,0.3)" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100/60 to-blue-300/60 backdrop-blur-sm" />
                  
                  <div className="relative z-10">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="text-5xl mb-4"
                    >
                      🔒
                    </motion.div>
                    
                    <h3 className="text-xl font-semibold text-blue-600 mb-3">
                      Secret Note – Tap to Unlock
                    </h3>
                    
                    <p className="text-blue-700 mb-6">
                      This message is locked with emotions only you can understand
                    </p>
                    
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="inline-block bg-blue-500 text-white px-5 py-2 rounded-full shadow-lg"
                    >
                      Unlock Now
                    </motion.div>
                  </div>
                  
                  {/* Notebook Edge Design */}
                  <div className="absolute left-0 top-0 bottom-0 w-6 bg-blue-200/50"></div>
                  <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-blue-400/50"></div>
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div 
                      key={i}
                      className="absolute left-3 w-[2px] h-[2px] rounded-full bg-blue-400/60"
                      style={{ top: `${(i + 1) * 5}%` }}
                    ></div>
                  ))}
                </GlassBox>
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="max-w-xl mx-auto"
            >
              <GlassBox className="p-8 relative overflow-hidden min-h-[400px]">
                {/* Notebook Design */}
                <div className="absolute left-0 top-0 bottom-0 w-6 bg-blue-200/50"></div>
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-blue-400/50"></div>
                {Array.from({ length: 20 }).map((_, i) => (
                  <div 
                    key={i}
                    className="absolute left-3 w-[2px] h-[2px] rounded-full bg-blue-400/60"
                    style={{ top: `${(i + 1) * 5}%` }}
                  ></div>
                ))}
                
                {/* Horizontal Lines */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <div 
                    key={i}
                    className="absolute left-8 right-4 h-[1px] bg-blue-300/40"
                    style={{ top: `${(i + 1) * 8}%` }}
                  ></div>
                ))}
                
                <div 
                  ref={contentRef}
                  className="pl-10 pr-4 py-4 text-blue-800 space-y-6 leading-relaxed relative z-10"
                >
                  {visibleLines.map((line, index) => (
                    <motion.p 
                      key={index} 
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: 1,
                        color: activeLine === index ? "#1E40AF" : "#1E3A8A"
                      }}
                      className={`${activeLine === index ? 'font-medium' : ''}`}
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>
                
                {/* Decorative Elements */}
                <motion.div
                  className="absolute top-4 right-4 text-2xl text-blue-400 opacity-40"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  💭
                </motion.div>
              </GlassBox>
              
              <div className="text-center mt-6 text-blue-700 font-medium italic">
                "No one else will read this. Just us."
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SecretNote;
