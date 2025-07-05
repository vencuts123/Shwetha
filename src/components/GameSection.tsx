import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassBox from './GlassBox';
import html2canvas from 'html2canvas';

// Break the paragraphs into stages for better UX
const paragraphStages = [
  `Our journey started with just a 'Hi' on Snapchat, and now you are one of the most important people in my life.`,
  `Through fights and misunderstandings, we always find our way back to each other because our bond is stronger than any argument. I cherish our GROIC song sessions and those intense Ludo matches.`,
  `Remember our first meet at Phoenix Mall? Those two hours were pure bliss - your eyes, our awkward handshake, those selfies. Happy Birthday Shwetha! Whatever happens, you'll always have a special place in my heart.`
];

const GameSection = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [completedWords, setCompletedWords] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  
  const resultRef = useRef<HTMLDivElement>(null);
  
  // All words to guess across all stages
  const allWordsToGuess = [
    { word: 'Snapchat', hint: 'The app where our journey began', stage: 0 },
    { word: 'important', hint: 'What you\'ve become to me', stage: 0 },
    { word: 'bond', hint: 'What connects us, stronger than any argument', stage: 1 },
    { word: 'GROIC', hint: 'We listen to songs together here', stage: 1 },
    { word: 'Ludo', hint: 'The game we play like it\'s life-or-death', stage: 1 },
    { word: 'Phoenix', hint: 'The mall where we first met', stage: 2 },
    { word: 'eyes', hint: 'What you caught me staring at when we first met', stage: 2 },
    { word: 'special', hint: 'The kind of place I have for you in my heart', stage: 2 }
  ];
  
  // Get words for current stage
  const wordsToGuess = allWordsToGuess.filter(word => word.stage === currentStage);
  
  // Load saved game state
  useEffect(() => {
    const savedGame = localStorage.getItem('shwetha-memory-game');
    if (savedGame) {
      try {
        const gameState = JSON.parse(savedGame);
        setCurrentStage(gameState.stage);
        setCurrentWordIndex(gameState.wordIndex);
        setCompletedWords(gameState.completedWords);
        setGameStarted(gameState.started);
        setGameCompleted(gameState.completed);
      } catch (error) {
        console.error('Error loading saved game:', error);
      }
    }
  }, []);
  
  // Save game state
  useEffect(() => {
    if (gameStarted) {
      const gameState = {
        stage: currentStage,
        wordIndex: currentWordIndex,
        completedWords: completedWords,
        started: gameStarted,
        completed: gameCompleted
      };
      localStorage.setItem('shwetha-memory-game', JSON.stringify(gameState));
    }
  }, [currentStage, currentWordIndex, completedWords, gameStarted, gameCompleted]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    setIsCorrect(null);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userInput.toLowerCase() === wordsToGuess[currentWordIndex].word.toLowerCase()) {
      setIsCorrect(true);
      setCompletedWords([...completedWords, wordsToGuess[currentWordIndex].word]);
      
      setTimeout(() => {
        if (currentWordIndex < wordsToGuess.length - 1) {
          setCurrentWordIndex(currentWordIndex + 1);
          setUserInput('');
          setIsCorrect(null);
          setWrongAttempts(0);
          setShowHint(false);
        } else if (currentStage < paragraphStages.length - 1) {
          // Move to next stage
          setCurrentStage(currentStage + 1);
          setCurrentWordIndex(0);
          setUserInput('');
          setIsCorrect(null);
          setWrongAttempts(0);
          setShowHint(false);
        } else {
          setGameCompleted(true);
        }
      }, 1000);
    } else {
      setIsCorrect(false);
      setWrongAttempts(wrongAttempts + 1);
      
      if (wrongAttempts >= 2) {
        setShowHint(true);
      }
    }
  };
  
  const getParagraphWithBlanks = () => {
    let result = paragraphStages[currentStage];
    
    // Replace each word with blank or completed word
    wordsToGuess.forEach((wordObj, index) => {
      const { word } = wordObj;
      
      if (index < currentWordIndex) {
        // Word has been completed
        result = result.replace(word, `<span class="text-blue-600 font-semibold">${word}</span>`);
      } else if (index === currentWordIndex) {
        // Current word to guess
        result = result.replace(word, '<span class="bg-blue-200 px-1 rounded">_____</span>');
      } else {
        // Future word to guess
        result = result.replace(word, '<span class="bg-gray-200 px-1 rounded">_____</span>');
      }
    });
    
    return result;
  };
  
  
  const getCompletedParagraph = () => {
    let result = paragraphStages.join(' ');
    
    // Replace each word with highlighted word
    allWordsToGuess.forEach(({ word }) => {
      const regex = new RegExp(word, 'g');
      result = result.replace(regex, `<span class="text-blue-600 font-semibold">${word}</span>`);
    });
    
    return result;
  };
  
  const saveImage = async () => {
    setLoading(true);
    if (resultRef.current) {
      try {
        const canvas = await html2canvas(resultRef.current, {
          scale: 2, // Higher resolution
          logging: false,
          backgroundColor: '#ffffff'
        });
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'our-story.png';
        link.click();
      } catch (error) {
        console.error('Error saving image:', error);
      } finally {
        setLoading(false);
      }
    }
  };
  
  const handleStartGame = () => {
    setGameStarted(true);
  };
  
  const handleRestart = () => {
    setGameStarted(true);
    setGameCompleted(false);
    setCurrentStage(0);
    setCurrentWordIndex(0);
    setUserInput('');
    setIsCorrect(null);
    setWrongAttempts(0);
    setShowHint(false);
    setCompletedWords([]);
    // Clear saved game
    localStorage.removeItem('shwetha-memory-game');
  };
  
  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-sky-100 via-blue-200 to-blue-300 touch-fix">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <GlassBox className="p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-600 text-center">You Remembered It All – A Puzzle of Us 🩵</h2>
          <p className="text-blue-700 text-center">Not just a game — a soft retelling of every unspoken moment</p>
        </GlassBox>
        
        {!gameStarted && !gameCompleted && (
          <GlassBox className="p-6 text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">How to Play</h3>
            <p className="text-blue-700 mb-4">
              In this memory game, you'll fill in the blanks with words from our journey together.
              Each word represents a special memory we've shared.
            </p>
            <p className="text-blue-700 mb-6">
              Let's see how well you remember our story. 🩵
            </p>
            
            <motion.button
              onClick={handleStartGame}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-medium shadow-lg touch-fix"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start the Journey
            </motion.button>
          </GlassBox>
        )}
        
        {gameStarted && !gameCompleted && (
          <GlassBox className="p-6">
            <div className="mb-4 flex justify-between items-center">
              <div className="text-blue-600 font-medium">
                Stage {currentStage + 1} of {paragraphStages.length}
              </div>
              <motion.button
                onClick={handleRestart}
                className="text-blue-500 text-sm flex items-center touch-fix"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                  <path d="M3 3v5h5"></path>
                </svg>
                Restart Game
              </motion.button>
            </div>
            
            <div 
              className="mb-6 p-4 bg-white/50 rounded-lg shadow-inner text-blue-800 touch-fix"
              dangerouslySetInnerHTML={{ __html: getParagraphWithBlanks() }}
            ></div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">
                Word {currentWordIndex + 1} of {wordsToGuess.length}
              </h3>
              
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={handleInputChange}
                  className={`flex-1 px-4 py-2 rounded-lg border touch-fix ${
                    isCorrect === true 
                      ? 'border-green-500 bg-green-50' 
                      : isCorrect === false 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-blue-300 bg-white/70'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Type your answer..."
                  autoFocus
                  aria-label="Enter the missing word"
                />
                <motion.button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium touch-fix"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Submit
                </motion.button>
              </form>
            </div>
            
            <AnimatePresence>
              {isCorrect === true && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-3 bg-green-100 text-green-700 rounded-lg mb-4"
                >
                  Perfect! You remembered it correctly! 🎉
                </motion.div>
              )}
              
              {isCorrect === false && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-3 bg-red-100 text-red-700 rounded-lg mb-4"
                >
                  Not quite right. Try again! 💭
                </motion.div>
              )}
              
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-3 bg-blue-100 text-blue-700 rounded-lg mb-4"
                >
                  <span className="font-semibold">Hint:</span> {wordsToGuess[currentWordIndex].hint}
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="mt-6 flex flex-wrap gap-2">
              {completedWords.map((word, index) => (
                <div 
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium"
                >
                  {word}
                </div>
              ))}
            </div>
          </GlassBox>
        )}
        
        {gameCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <GlassBox className="p-6">
              <h3 className="text-xl font-semibold text-blue-600 mb-4 text-center">
                You remembered it all. You lived our story. 🩵
              </h3>
              
              <div 
                ref={resultRef}
                className="mb-6 p-6 bg-white/70 rounded-lg shadow-inner text-blue-800 touch-fix"
                dangerouslySetInnerHTML={{ __html: getCompletedParagraph() }}
              ></div>
              
              <div className="flex justify-center space-x-4">
                <motion.button
                  onClick={saveImage}
                  disabled={loading}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-medium shadow-lg flex items-center disabled:opacity-70 disabled:cursor-not-allowed touch-fix"
                  whileHover={{ scale: loading ? 1 : 1.05 }}
                  whileTap={{ scale: loading ? 1 : 0.95 }}
                  aria-label="Save this memory as an image"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      Save This Memory
                    </>
                  )}
                </motion.button>
                
                <motion.button
                  onClick={handleRestart}
                  className="bg-white hover:bg-gray-100 text-blue-600 px-6 py-2 rounded-full font-medium shadow-lg border border-blue-200 touch-fix"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Play the game again"
                >
                  Play Again
                </motion.button>
              </div>
            </GlassBox>
            
            <GlassBox className="p-6 text-center">
              <p className="text-blue-700 italic">
                "Memories become treasures when they're shared with someone special. Thank you for being part of my journey. 🩵"
              </p>
            </GlassBox>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default GameSection;