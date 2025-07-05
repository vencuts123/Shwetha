import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassBox from './GlassBox';

interface Message {
  id: number;
  sender: 'me' | 'shwetha';
  text: string;
  timestamp: string;
}

// Use our actual first chat image
const firstChatImage = 'https://mocha-cdn.com/0197aef3-9ca1-7076-bf4c-c94633eb0b0a/Our-First-Chat.jpeg';

// Fixed chat messages to remove duplicates
const messages: Message[] = [
  {
    id: 1,
    sender: 'shwetha',
    text: 'Hiii',
    timestamp: '4:26 PM'
  },
  {
    id: 2,
    sender: 'me',
    text: 'Streaks',
    timestamp: '4:26 PM'
  },
  {
    id: 3,
    sender: 'shwetha',
    text: 'Yeah sure',
    timestamp: '4:27 PM'
  },
  {
    id: 4,
    sender: 'me',
    text: 'Yup !!!',
    timestamp: '4:27 PM'
  },
  {
    id: 5,
    sender: 'shwetha',
    text: 'Hmm',
    timestamp: '4:28 PM'
  },
  {
    id: 6,
    sender: 'me',
    text: 'Ur name',
    timestamp: '4:28 PM'
  },
  {
    id: 7,
    sender: 'shwetha',
    text: 'Shweetha',
    timestamp: '4:29 PM'
  },
  {
    id: 8,
    sender: 'shwetha',
    text: 'Urs',
    timestamp: '4:29 PM'
  },
  {
    id: 9,
    sender: 'me',
    text: 'Venkat',
    timestamp: '4:30 PM'
  },
  {
    id: 10,
    sender: 'me',
    text: 'Nice',
    timestamp: '4:30 PM'
  }
];

const ChatReplay = () => {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setVisibleMessages([]); // Clear previous messages on mount
    const showMessages = async () => {
      for (let i = 0; i < messages.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setVisibleMessages(prev => {
          // Prevent duplicate messages
          if (prev.find(m => m.id === messages[i].id)) return prev;
          return [...prev, messages[i]];
        });
      }
    };
    
    showMessages();
  }, []);
  
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleMessages]);

  return (
    <div className="min-h-screen flex flex-col px-4 py-12 bg-gradient-to-br from-sky-100 via-blue-200 to-blue-300 touch-fix">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full mx-auto mb-8"
      >
        <GlassBox className="p-6">
          <h2 className="text-2xl font-bold text-blue-600 mb-2 text-center">💬 Chat Replay</h2>
          <p className="text-blue-700 text-center">
            Where it all began on July 15, 2023
          </p>
        </GlassBox>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-md w-full mx-auto mb-6"
      >
        <GlassBox className="p-4 text-center">
          <img 
            src={firstChatImage} 
            alt="Screenshot of our first chat" 
            className="w-full h-auto rounded-lg mb-2 shadow-md"
            loading="lazy"
          />
          <p className="text-sm text-blue-600 italic">The actual screenshot from our first conversation</p>
        </GlassBox>
      </motion.div>

      <div className="max-w-md w-full mx-auto mb-24 flex-grow touch-fix">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-t-2xl overflow-hidden">
          <div className="bg-blue-500 text-white p-4 flex items-center">
            <button className="mr-2" aria-label="Back">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden mr-2">
                <img src="/virtual-gift.png" alt="Profile" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div>
                <div className="font-semibold">SHWEETHA _04</div>
              </div>
            </div>
          </div>
          
          <div className="p-4 h-96 overflow-y-auto bg-white/10 backdrop-blur-sm" aria-label="Chat conversation">
            <div className="text-center text-sm text-gray-500 mb-4">JULY 15, 2023</div>
            
            <AnimatePresence>
              {visibleMessages.map(message => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mb-4 flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  role="listitem"
                  aria-label={`Message from ${message.sender === 'me' ? 'Venkat' : 'Shwetha'}: ${message.text}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.sender === 'me' 
                        ? 'bg-blue-500 text-white ml-auto' 
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    <div className="mb-1">{message.text}</div>
                    <div className="text-xs opacity-70 text-right">{message.timestamp}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            <div ref={chatEndRef} />
          </div>
          
          <div className="p-3 border-t border-gray-200 bg-white/30 backdrop-blur-sm flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Send a chat"
              className="flex-grow py-2 px-4 bg-white/50 backdrop-blur-sm rounded-full border border-gray-200 focus:outline-none touch-fix"
              disabled
            />
            <div className="w-10 h-10 flex items-center justify-center ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 10 }}
          className="mt-8 text-center text-blue-600 font-medium"
        >
          "It all started with a Hi… but became everything over time 🩵"
        </motion.div>
      </div>
    </div>
  );
};

export default ChatReplay;
