import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassBox from './GlassBox';
import useSound from 'use-sound';

const BirthdayMessage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [typedText, setTypedText] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  // Define the paragraph content
  const paragraphContent = `Hey, remember how we started with just a 'Hi'? Now, you're one of the most important people in my life. 💙

We've had fights, misunderstandings, and ego clashes, but one deep conversation fixes everything - because our care for each other is stronger than any stupid argument. 💙

I love how we vibe to GROIC songs or play Ludo like it's a life-or-death match. 😂 Those little moments make me so happy. And the best part? We never stay mad. If I'm wrong, you forgive me. If you're wrong, I don't hold it against you. That's our bond - no ego, just love. 🤝

July 12, 2024 at Chennai Phoenix Mall - our first meet. Those 2 hours were pure bliss. 💙 I remember everything: first time seeing your eyes 👀 (I just stared like a fool 😂), our awkward handshake, the selfies and photos with your cousin Swathi, periyamma and paati! My only regret? Forgetting to give you that special diary I bought a year ago. Next time, definitely! And I still laugh about those random lies you told your family about me. Marakka mudiyaadhu paa! 😉

Next meet, we'll do it better: more time, just our photos/videos (no family spies! 📸), and that long-pending gift. Until then, I'll replay that day in my head - pure happiness. 🥹

Sorry for the times I hurt you or broke your trust. You mean too much to me for that. 💙

Happy Birthday Shwetha! 🎂 Love you lots - be my favorite always. I know this birthday will be special for you. The past might still hurt sometimes, but remember: "Kadandhu Poradhu dhaana Vazhkai." Even if I mess up, you're strong enough to rise above it. You're at that stage where you accept things and keep going - that's growth. 💙

Whatever you overthink, whatever weighs you down... just focus on your studies now. Nothing else is worth stressing over.

Once again, Happy Birthday Sweetha dear! 💙🌊🫂 May this year bring you peace, strength, and all the happiness you deserve.`;

  // Split into lines for typewriter effect
  const paragraphLines = paragraphContent.split('\n\n');
  
  // Paper flip sound effect
  const [playSound] = useSound('/paper-flip.mp3', { volume: 0.5 });
  
  const handleOpenEnvelope = () => {
    setIsOpen(true);
    playSound();
    startTyping();
  };
  
  const startTyping = () => {
    setIsTyping(true);
    setTypedText([]);
    
    // Typewriter effect for each paragraph
    paragraphLines.forEach((line, index) => {
      setTimeout(() => {
        setTypedText((prev) => [...prev, line]);
      }, index * 1000); // Delay between paragraphs
    });
  };
  
  // Create falling hearts animation
  const FallingHearts = () => {
    const heartCount = 20;
    const hearts = Array.from({ length: heartCount });
    
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {hearts.map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl z-10 opacity-50"
            initial={{ 
              top: -20,
              left: `${Math.random() * 100}%`,
              opacity: 0.7,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              top: '100%',
              opacity: [0.7, 0.4, 0],
              rotate: Math.random() * 360
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              delay: Math.random() * 5
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
      <FallingHearts />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <GlassBox className="p-6 mb-8 text-center">
          <h2 className="text-2xl font-bold text-blue-600">✨ Birthday Message – July 4, 2025 ✨</h2>
          <p className="text-blue-700">One birthday. One letter. A lifetime of emotions.</p>
        </GlassBox>
        
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="max-w-lg mx-auto"
            >
              <GlassBox 
                className="p-8 text-center cursor-pointer relative overflow-hidden" 
                onClick={handleOpenEnvelope}
                whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(0,150,255,0.3)" }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100/80 to-blue-300/80 backdrop-blur-sm" />
                  <div className="w-full h-full flex flex-col items-center justify-center z-10">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="text-6xl mb-4"
                    >
                      ✉️
                    </motion.div>
                    <h3 className="text-xl font-semibold text-blue-600 mb-2">
                      Birthday Letter
                    </h3>
                    <p className="text-blue-700">Tap to open</p>
                    
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="mt-6 bg-blue-500 text-white px-5 py-2 rounded-full shadow-lg"
                    >
                      Open Envelope
                    </motion.div>
                  </div>
                </div>
                
                {/* Sparkles Animation */}
                {Array.from({ length: 10 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-xl pointer-events-none"
                    initial={{ 
                      top: `${Math.random() * 100}%`, 
                      left: `${Math.random() * 100}%`,
                      scale: 0,
                      opacity: 0
                    }}
                    animate={{ 
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: Math.random() * 3
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
              </GlassBox>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto"
            >
              <GlassBox className="p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-70" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-70" />
                
                <div className="text-blue-800 space-y-4 leading-relaxed relative z-10">
                  {isTyping ? (
                    <>
                      {typedText.map((line, index) => (
                        <motion.p 
                          key={index} 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className={`mb-4 ${index === paragraphLines.length - 1 ? 'font-medium' : ''}`}
                        >
                          {line}
                        </motion.p>
                      ))}
                      
                      {typedText.length < paragraphLines.length && (
                        <motion.div 
                          className="inline-block h-5 w-2 bg-blue-500 ml-1"
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        />
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-40">
                      <div className="loader"></div>
                    </div>
                  )}
                </div>
                
                {/* Decorative Elements */}
                <motion.div
                  className="absolute top-4 right-4 text-3xl text-blue-400 opacity-50"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  🩵
                </motion.div>
                
                <motion.div
                  className="absolute bottom-4 left-4 text-3xl text-blue-400 opacity-50"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  🎂
                </motion.div>
              </GlassBox>
              
              <div className="text-center mt-6 text-blue-700 font-medium italic">
                "I wrote this only for your eyes, Shwetha 🩵"
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default BirthdayMessage;
