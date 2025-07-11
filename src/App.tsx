import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';
import { registerServiceWorker } from './registerServiceWorker';

// React Router
import { Routes, Route } from 'react-router-dom';
import GiftUnlock from './components/GiftUnlock';

// Components
import PasswordScreen from './components/PasswordScreen';
import IntroSection from './components/IntroSection';
import ChatReplay from './components/ChatReplay';
import AboutUsSection from './components/AboutUsSection';
import HeartMeaningSection from './components/HeartMeaningSection';
import PhotoGallery from './components/PhotoGallery';
import GameSection from './components/GameSection';
import BirthdayMessage from './components/BirthdayMessage';
import SecretNote from './components/SecretNote';
import MessageBox from './components/MessageBox';
import MessageArchive from './components/MessageArchive';
import NavBar from './components/NavBar';
import PerformanceToggle from './components/PerformanceToggle';
import VisitStats from './components/VisitStats';
import AudioPlayer from './components/AudioPlayer';

// Hooks
import { useRegisterServiceWorker } from './hooks/useRegisterServiceWorker';
import { useTelegramVisitNotification } from './hooks/useTelegramVisitNotification';
import { usePerformanceMode } from './hooks/usePerformanceMode';
import { useVisitCounter } from './hooks/useVisitCounter';
import { useBirthdayReset } from './hooks/useBirthdayReset';

export function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [showUpdate, setShowUpdate] = useState(false);
  const { isLowPerformance, togglePerformanceMode } = usePerformanceMode();
  const visitStats = useVisitCounter();

  useRegisterServiceWorker();
  useTelegramVisitNotification();
  useBirthdayReset();

  useEffect(() => {
    if (isUnlocked) {
      visitStats.increment();
    }
  }, [isUnlocked]);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const localUnlocked = localStorage.getItem('shwetha-unlocked');
    if (localUnlocked === 'true') {
      setIsUnlocked(true);
      setShowIntro(false);
    }

    document.addEventListener('touchstart', function () {}, { passive: true });

    registerServiceWorker(() => setShowUpdate(true));

    return () => {
      document.removeEventListener('touchstart', function () {});
      if (link.parentNode) {
        document.head.removeChild(link);
      }
    };
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
    localStorage.setItem('shwetha-unlocked', 'true');
  };

  const handleContinue = () => {
    setShowIntro(false);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home':
        return <IntroSection onContinue={handleContinue} />;
      case 'chat':
        return <ChatReplay />;
      case 'about':
        return <AboutUsSection />;
      case 'heart':
        return <HeartMeaningSection />;
      case 'photos':
        return <PhotoGallery />;
      case 'game':
        return <GameSection />;
      case 'birthday':
        return <BirthdayMessage />;
      case 'secret':
        return <SecretNote />;
      default:
        return <IntroSection onContinue={handleContinue} />;
    }
  };

  return (
    <>
      <Routes>
        <Route path="/gift" element={<GiftUnlock />} />
        <Route
          path="*"
          element={(
            <div className="relative min-h-screen overflow-x-hidden touch-fix" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {showUpdate && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg z-[9999] flex items-center gap-3 animate-bounce">
                  <span>New version available!</span>
                  <button
                    className="ml-2 bg-white text-blue-600 px-3 py-1 rounded-full font-semibold shadow"
                    onClick={() => window.location.reload()}
                    aria-label="Reload to update"
                  >
                    Reload
                  </button>
                </div>
              )}
              <AnimatePresence mode="wait">
                {!isUnlocked ? (
                  <motion.div
                    key="password"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 overflow-y-auto touch-fix"
                  >
                    <PasswordScreen onUnlock={handleUnlock} />
                  </motion.div>
                ) : showIntro ? (
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 overflow-y-auto touch-fix"
                  >
                    <IntroSection onContinue={handleContinue} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="main-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative overflow-x-hidden touch-fix"
                  >
                    <NavBar
                      activeSection={activeSection}
                      onSectionChange={setActiveSection}
                    />

                    <PerformanceToggle
                      isLowPerformance={isLowPerformance}
                      onToggle={togglePerformanceMode}
                    />

                    <main className="pt-16 overflow-x-hidden touch-fix">
                      {renderActiveSection()}
                    </main>

                    <MessageBox />
                    <MessageArchive />
                    <VisitStats />
                    <AudioPlayer isUnlocked={isUnlocked} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        />
      </Routes>
    </>
  );
}

export default App;
