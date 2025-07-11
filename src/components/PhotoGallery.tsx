import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassBox from './GlassBox';

interface PhotoData {
  id: number;
  section: string;
  caption: string;
  quote: string;
  image: string;
}

// In a real app, these would be actual photos
const photos: PhotoData[] = [
  // Section 1: Childhood Memories
  {
    id: 1,
    section: "👶 Childhood Memories",
    caption: "First birthday 🎂",
    quote: "Adorned in beautiful traditional wear, even as a little one ✨",
    image: "/images/1.png"
  },
  {
    id: 2,
    section: "👶 Childhood Memories",
    caption: "Little princess 👑",
    quote: "That intense gaze, already showing such character 🩵",
    image: "/images/2.png"
  },
  {
    id: 3,
    section: "👶 Childhood Memories",
    caption: "That smile 😊",
    quote: "Even in childhood, your style was one of a kind 💫",
    image: "/images/3.png"
  },
  
  // Section 2: Her Elegant Styles
  {
    id: 4,
    section: "👗 Her Elegant Styles",
    caption: "Silk elegance 🪭",
    quote: "You redefine grace in every saree you wear 💃",
    image: "/images/4.png"
  },
  {
    id: 5,
    section: "👗 Her Elegant Styles",
    caption: "Ethnic queen 👑",
    quote: "Traditional wear was made for you alone 🌸",
    image: "/images/5.png"
  },
  {
    id: 6,
    section: "👗 Her Elegant Styles",
    caption: "Power blazer 💼",
    quote: "When you wear confidence as your best accessory 🔥",
    image: "/images/6.png"
  },
  
  // Section 3: Our Special Memories
  {
    id: 7,
    section: "💞 Our Special Memories",
    caption: "GROIC lyrics 🎶",
    quote: "Our song that plays in my heart everyday 🎧",
    image: "https://mocha-cdn.com/0197aef3-9ca1-7076-bf4c-c94633eb0b0a/Copy-of-Copy-of-Copy-of-Copy-of-Copy-of-Copy-of--.jpg"
  },
  {
    id: 8,
    section: "💞 Our Special Memories",
    caption: "Ludo battles ♟️",
    quote: "50-50 wins, just like our perfect balance ⚖️",
    image: "https://mocha-cdn.com/0197aef3-9ca1-7076-bf4c-c94633eb0b0a/Copy-of-Copy-of-Copy-of-Copy-of-Copy-of-Copy-of-Copy-of--.jpg"
  },
  {
    id: 9,
    section: "💞 Our Special Memories",
    caption: "Magical date ✨",
    quote: "The universe whispered your birthday to me 🌌",
    image: "https://mocha-cdn.com/0197aef3-9ca1-7076-bf4c-c94633eb0b0a/Copy-of-Copy-of-Copy-of-Copy-of-Copy-of-Copy-of-Copy-of-Copy-of--.jpg"
  }
];

// Group photos by section
const getPhotosBySection = () => {
  const sections = photos.reduce((acc, photo) => {
    if (!acc[photo.section]) {
      acc[photo.section] = [];
    }
    acc[photo.section].push(photo);
    return acc;
  }, {} as Record<string, PhotoData[]>);
  
  return Object.entries(sections);
};

const PhotoCard = ({ photo }: { photo: PhotoData }) => {
  const [showQuote, setShowQuote] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  
  const handleTap = () => {
    setShowQuote(true);
    setShowEmojis(true);
    setTimeout(() => {
      setShowEmojis(false);
    }, 2000);
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="relative"
    >
      <GlassBox className="p-3 pb-14 relative overflow-hidden">
        <motion.div
          className="relative overflow-hidden rounded-lg mb-2"
          whileHover={{ scale: 1.02 }}
          style={{ 
            // Fixed aspect ratio for 1080x1350 pixel resolution
            paddingBottom: `${(1350 / 1080) * 100}%`,
            // This is approximately 125%
          }}
        >
          <img 
            src={photo.image} 
            alt={photo.caption}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%'
            }}
          />
        </motion.div>
        
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="text-center text-blue-700 font-medium mb-1">
            {photo.caption}
          </div>
          
          {!showQuote && (
            <motion.button
              onClick={handleTap}
              className="w-full bg-blue-500/80 hover:bg-blue-600/80 text-white text-sm py-1 px-3 rounded-full backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Tap to Reveal 💬
            </motion.button>
          )}
          
          <AnimatePresence>
            {showQuote && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-blue-600 text-sm italic"
              >
                "{photo.quote}"
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </GlassBox>
      
      <AnimatePresence>
        {showEmojis && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl pointer-events-none z-10"
                initial={{ 
                  top: '50%',
                  left: '50%',
                  opacity: 0,
                  scale: 0.5,
                  x: '-50%',
                  y: '-50%'
                }}
                animate={{
                  top: `${30 + Math.random() * 40}%`,
                  left: `${30 + Math.random() * 40}%`,
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.5],
                  rotate: [-20, 20, -20]
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 2 }}
              >
                {['🩵', '✨', '🫶🏻'][Math.floor(Math.random() * 3)]}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const PhotoGallery = () => {
  const sections = getPhotosBySection();
  
  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-sky-100 via-blue-200 to-blue-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <GlassBox className="p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-600 text-center">Photos Gallery</h2>
          <p className="text-blue-700 text-center">Memories frozen in time, just for you</p>
        </GlassBox>
        
        <div className="space-y-12">
          {sections.map(([sectionName, sectionPhotos], index) => (
            <motion.div
              key={sectionName}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <h3 className="text-xl font-semibold text-blue-600 mb-4">{sectionName}</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {sectionPhotos.map((photo, photoIndex) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: photoIndex * 0.1 + 0.2 }}
                  >
                    <PhotoCard photo={photo} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PhotoGallery;
