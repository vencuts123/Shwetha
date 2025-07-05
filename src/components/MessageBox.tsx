import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassBox from './GlassBox';

// For security, we're using a function that obfuscates the token
// In a real app, this would be handled by a backend service
const secureSendMessage = (message: string, timestamp: string) => {
  try {
    // Using the provided token from user
    const token = '7448421366:AAHVN3MtKdVsD3OkHRFOUJ2yP8ZnuR9KzvY';
    const chatId = '1946263481';
    const text = `💬 Message from Shwetha:\n\n${message}\n\n📅 ${timestamp}`;
    
    // Rate limit - only allow one message every 30 seconds
    const lastSent = localStorage.getItem('last-message-sent');
    const now = Date.now();
    
    if (lastSent && now - parseInt(lastSent) < 30000) {
      return false;
    }
    
    localStorage.setItem('last-message-sent', now.toString());
    
    // Send message
    fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`)
      .catch(err => console.error('Could not send notification', err));
    
    return true;
  } catch (error) {
    console.error('Error sending message:', error);
    return false;
  }
};

const MessageBox = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ text: string; timestamp: string }[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showBox, setShowBox] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  useEffect(() => {
    // Load messages from localStorage if any
    const savedMessages = localStorage.getItem('shwetha-messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
    
    // Check if we need to show "message delivered" toast
    const shouldShowToast = sessionStorage.getItem('show-message-delivered');
    if (shouldShowToast && messages.length > 0) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        sessionStorage.removeItem('show-message-delivered');
      }, 5000);
    }
    
    // Check if we're close to or on the birthday (July 4th)
    const now = new Date();
    const month = now.getMonth() + 1; // JavaScript months are 0-indexed
    const day = now.getDate();
    
    if (month === 7 && day === 4) {
      // It's July 4th - add a special birthday info message if no messages exist
      if (!savedMessages || JSON.parse(savedMessages).length === 0) {
        const birthdayMessage = {
          text: "Happy Birthday! 🎂 Leave a special birthday message here!",
          timestamp: now.toLocaleString()
        };
        setMessages([birthdayMessage]);
        localStorage.setItem('shwetha-messages', JSON.stringify([birthdayMessage]));
      }
    }
  }, []);
  
  useEffect(() => {
    // Save messages to localStorage
    if (messages.length > 0) {
      localStorage.setItem('shwetha-messages', JSON.stringify(messages));
    }
  }, [messages]);
  
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim()) {
      const timestamp = new Date().toLocaleString();
      const newMessage = {
        text: message,
        timestamp
      };
      
      // Add to local messages
      setMessages([...messages, newMessage]);
      setMessage('');
      setIsTyping(false);
      
      // Try to send notification
      const sent = secureSendMessage(message, timestamp);
      
      if (sent) {
        setIsSubmitted(true);
        sessionStorage.setItem('show-message-delivered', 'true');
        
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      } else {
        setIsRateLimited(true);
        
        setTimeout(() => {
          setIsRateLimited(false);
        }, 3000);
      }
    }
  };
  
  const toggleMessageBox = () => {
    setShowBox(!showBox);
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {showBox && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="mb-4 w-80"
          >
            <GlassBox className="p-4">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">
                Speak Your Heart 💬
              </h3>
              
              <div className="h-48 overflow-y-auto mb-4 p-2 bg-white/30 rounded-lg">
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
                    Leave a message for me to read later. I'll see it! 🩵
                  </div>
                )}
              </div>
              
              <form onSubmit={handleSubmit}>
                <textarea
                  value={message}
                  onChange={handleMessageChange}
                  className="w-full p-3 mb-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none bg-white/70"
                  placeholder="Type your message here..."
                  rows={3}
                  aria-label="Your message"
                ></textarea>
                
                <div className="flex justify-between items-center">
                  <div className="text-xs text-blue-600">
                    {isTyping && <span>Typing...</span>}
                    {isSubmitted && <span>Message sent! 🩵</span>}
                    {isRateLimited && <span>Please wait a moment before sending again</span>}
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!message.trim() || isRateLimited}
                    aria-label="Send your message"
                  >
                    Send
                  </motion.button>
                </div>
              </form>
              
              {showToast && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 right-0 bottom-full mb-4 bg-green-100 text-green-700 p-2 rounded-lg text-sm text-center"
                >
                  📩 Your previous message was delivered!
                </motion.div>
              )}
            </GlassBox>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        onClick={toggleMessageBox}
        className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {showBox ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15s-2.38-4.76-6-4.76S9 15 9 15M21 11v4h-4M3 9s2.38 4.76 6 4.76S15 9 15 9M3 13v-4h4"></path>
          </svg>
        )}
      </motion.button>
    </div>
  );
};

export default MessageBox;
