import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassBox from './GlassBox';
import Logo from './Logo';
import useSound from 'use-sound';
import ReactConfetti from 'react-confetti';

const PasswordScreen = ({ onUnlock }: { onUnlock: () => void }) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showError, setShowError] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [playSuccess] = useSound('/success.mp3', { volume: 0.5 });
  const [playError] = useSound('/error.mp3', { volume: 0.25 });
  const inputRef = useRef<HTMLInputElement>(null);
  
  const validPassword = '0712';
  
  useEffect(() => {
    // Remove auto-unlock on refresh or re-login
    // const unlocked = localStorage.getItem('shwetha-unlocked');
    // if (unlocked === 'true') {
    //   onUnlock();
    // }
    // Fix for iOS touch events
    document.addEventListener('touchstart', function() {}, { passive: true });
    
    return () => {
      document.removeEventListener('touchstart', function() {});
    };
  }, [onUnlock]);

  // Focus input when visible
  useEffect(() => {
    if (!showInstructions && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    }
  }, [showInstructions]);
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setPassword(value);
      setShowError(false);
    }
  };
  
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setShowError(false);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setShowError(true);
      setErrorMessage('Please enter your name before unlocking.');
      return;
    }
    if (password === validPassword) {
      playSuccess();
      setShowConfetti(true);
      // Store in localStorage
      localStorage.setItem('shwetha-unlocked', 'true');
      localStorage.setItem('shwetha-username', username.trim());
      setTimeout(() => {
        onUnlock();
      }, 2500);
    } else {
      playError();
      setShowError(true);
      setErrorMessage(
        password.length === 0
          ? 'Please enter the 4-digit code (MM/DD format)'
          : password.length < 4
          ? 'Please enter all 4 digits'
          : 'Incorrect password. Try again with our first meet date (MM/DD format)'
      );
      // Only clear if wrong password, not if incomplete
      if (password.length === 4) {
        setPassword('');
      }
      
      // Re-focus the input
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  // Handle digit button click
  const handleDigitClick = (digit: string) => {
    if (password.length < 4) {
      setPassword(prev => prev + digit);
      setShowError(false);
    }
  };

  // Handle backspace
  const handleBackspace = () => {
    setPassword(prev => prev.slice(0, -1));
    setShowError(false);
  };

  // Simplified floating words (reduced for performance)
  const floatingWords = [
    "Love", "Memories", "Birthday", "Special", "Heart"
  ];
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-sky-100 via-blue-200 to-blue-300 overflow-y-auto">
      {showConfetti && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          colors={['#c3e6ff', '#0096FF', '#4cc9f0', '#ffffff']}
          numberOfPieces={300}
          recycle={false}
        />
      )}
      
      {/* Reduced number of floating words for better performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingWords.map((word, index) => (
          <motion.div
            key={index}
            className="absolute text-blue-500/30 font-bold"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0.3,
              scale: 0.5 + Math.random() * 1.5
            }}
            animate={{
              y: Math.random() * window.innerHeight,
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {word}
          </motion.div>
        ))}
      </div>
      
      <div className="relative z-10 flex flex-col items-center max-w-md px-4 py-8">
        <AnimatePresence mode="wait">
          {showInstructions ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 text-center"
            >
              <Logo className="mx-auto mb-6 w-32 h-32" />
              <GlassBox className="p-6 mb-6">
                <h1 className="text-2xl font-bold text-blue-600 mb-2">Welcome to Shwetha🩵</h1>
                <p className="text-blue-800 mb-4">
                  This is a special birthday gift made just for you.
                </p>
                <p className="text-blue-700">
                  To unlock your gift, you'll need to enter our special date (MM/DD format).
                </p>
              </GlassBox>
              <motion.button
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowInstructions(false)}
              >
                Let's Begin 🩵
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-xs"
            >
              <GlassBox className="p-6 text-center">
                <div className="h-24 mb-4 flex items-center justify-center">
                  <div className="text-6xl">🎁</div>
                </div>
                
                <h2 className="text-xl font-semibold text-blue-600 mb-4">Enter Unlock Code</h2>
                
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                  <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    className="w-full px-4 py-2 mb-4 rounded-lg border border-blue-300 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg"
                    placeholder="Enter your name"
                    aria-label="Username input"
                  />
                  
                  <div className="flex gap-2 mb-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className={`w-12 h-12 border-2 ${showError ? 'border-red-400' : 'border-blue-400'} rounded-lg flex items-center justify-center bg-white/50 text-blue-700 text-xl font-bold`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          borderColor: showError ? '#f87171' : '#60a5fa'
                        }}
                        transition={{ delay: i * 0.1 }}
                      >
                        {password[i] || ''}
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Visible input for better keyboard handling */}
                  <input
                    ref={inputRef}
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={4}
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 mb-4 rounded-lg border border-blue-300 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-xl"
                    placeholder="Enter code"
                    aria-label="Password input"
                  />
                  
                  {showError && (
                    <motion.p 
                      className="text-red-500 mb-4 max-w-xs text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {errorMessage}
                    </motion.p>
                  )}
                  
                  <motion.p className="text-blue-600 text-sm mb-4">
                    <strong>Hint:</strong> Our first meet date (MMDD) 🩵
                  </motion.p>
                  
                  {/* On-screen number pad */}
                  <div className="grid grid-cols-3 gap-2 mb-4 w-48">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <motion.button
                        key={num}
                        type="button"
                        className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 font-medium flex items-center justify-center text-xl"
                        whileHover={{ scale: 1.05, backgroundColor: '#bfdbfe' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDigitClick(num.toString())}
                      >
                        {num}
                      </motion.button>
                    ))}
                    <motion.button
                      key={0}
                      type="button"
                      className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 font-medium flex items-center justify-center text-xl col-start-2"
                      whileHover={{ scale: 1.05, backgroundColor: '#bfdbfe' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDigitClick("0")}
                    >
                      0
                    </motion.button>
                  </div>
                  
                  <div className="flex gap-3">
                    <motion.button
                      type="button"
                      className="bg-red-100 text-red-600 px-4 py-3 rounded-full font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleBackspace}
                      disabled={password.length === 0}
                    >
                      ← Clear
                    </motion.button>
                    
                    <motion.button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-full font-medium shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Unlock Gift
                    </motion.button>
                  </div>
                </form>
              </GlassBox>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PasswordScreen;
