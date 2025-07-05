import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassBox from './GlassBox';

interface ArchivedMessage {
  text: string;
  timestamp: string;
}

const MessageArchive = () => {
  const [messages, setMessages] = useState<ArchivedMessage[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    // Load messages from localStorage
    const savedMessages = localStorage.getItem('shwetha-messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
    
    // Check if we're on the birthday (July 4th)
    const now = new Date();
    const month = now.getMonth() + 1; // JavaScript months are 0-indexed
    const day = now.getDate();
    
    if (month === 7 && day === 4) {
      // Update the UI to show it's a special birthday archive
      setIsOpen(true); // Auto-open the archive on birthday
    }
  }, []);
  
  if (messages.length === 0) {
    return null;
  }
  
  return (
    <div className="fixed bottom-6 left-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="mb-4 w-80"
          >
            <GlassBox className="p-4">
              <h3 className="text-lg font-semibold text-blue-600 mb-2 flex items-center">
                <span className="mr-2">📖</span>
                {new Date().getMonth() === 6 && new Date().getDate() === 4 
                  ? "Birthday Heart Vault 🎂" 
                  : "Your Heart Vault"}
              </h3>
              
              <div className="h-48 overflow-y-auto mb-2 p-2 bg-white/30 rounded-lg">
                {messages.length > 0 ? (
                  <div className="space-y-3">
                    {messages.map((msg, index) => (
                      <div key={index} className="p-2 bg-white/50 rounded-lg">
                        <p className="text-blue-800 mb-1">{msg.text}</p>
                        <p className="text-xs text-blue-600">{msg.timestamp}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-blue-500 text-sm text-center italic">
                    No messages yet. Your words will appear here.
                  </div>
                )}
              </div>
              
              <div className="text-xs text-blue-600 italic text-center">
                These are the thoughts you've shared. They've been safely delivered. 🩵
              </div>
            </GlassBox>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open message archive"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </motion.button>
    </div>
  );
};

export default MessageArchive;
