import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

interface NavBarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const NavBar = ({ activeSection, onSectionChange }: NavBarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sections = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'chat', label: 'Chat Replay', icon: '💬' },
    { id: 'about', label: 'Timeline', icon: '📅' },
    { id: 'heart', label: 'Meaning', icon: '🩵' },
    { id: 'photos', label: 'Photos', icon: '📷' },
    { id: 'game', label: 'Memory Game', icon: '🎮' },
    { id: 'birthday', label: 'Birthday Letter', icon: '✉️' },
    { id: 'secret', label: 'Secret Note', icon: '🤫' },
    { id: 'gallery', label: 'Gallery', icon: '🖼️' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSectionChange = (sectionId: string) => {
    onSectionChange(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-white/20 border-b border-white/30 touch-fix">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex items-center"
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSectionChange('home')}
          >
            <Logo className="w-8 h-8 mr-2" />
            <span className="text-blue-600 font-bold text-lg">Shwetha🩵</span>
          </motion.div>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-1">
              {sections.map(section => (
                <li key={section.id}>
                  <motion.button
                    onClick={() => handleSectionChange(section.id)}
                    className={`px-3 py-2 rounded-lg text-sm ${
                      activeSection === section.id
                        ? 'bg-blue-500 text-white'
                        : 'text-blue-600 hover:bg-white/30'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Navigate to ${section.label}`}
                  >
                    <span className="mr-1">{section.icon}</span> {section.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="md:hidden">
            <motion.button
              className="text-blue-600 hover:text-blue-800 p-2"
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </>
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 backdrop-blur-md bg-white/20 border-b border-white/30">
              {sections.map(section => (
                <motion.button
                  key={section.id}
                  onClick={() => handleSectionChange(section.id)}
                  className={`block w-full text-left px-3 py-3 rounded-lg text-sm ${
                    activeSection === section.id
                      ? 'bg-blue-500 text-white'
                      : 'text-blue-600 hover:bg-white/30'
                  }`}
                  whileTap={{ scale: 0.97 }}
                  aria-label={`Navigate to ${section.label}`}
                >
                  <span className="mr-2">{section.icon}</span>
                  {section.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;
