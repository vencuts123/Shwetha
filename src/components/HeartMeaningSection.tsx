import { motion } from 'framer-motion';
import GlassBox from './GlassBox';

const HeartMeaningSection = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col px-4 py-12 bg-gradient-to-br from-sky-100 via-blue-200 to-blue-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full mx-auto"
      >
        <GlassBox className="p-8 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 -z-10 opacity-10"
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <div className="w-full h-full flex items-center justify-center text-[400px]">
              🩵
            </div>
          </motion.div>
          
          <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
            🩵 What This Heart Truly Means to Us
          </h2>
          
          <div className="text-blue-700 mb-8">
            <p className="mb-4">
              In a world full of emojis and empty hearts, 🩵 became ours.
            </p>
            <p className="mb-4">
              It's not just a blue heart. It's the only heart I ever chose for you.
            </p>
            <p className="mb-4">
              You know this. I know this. Because this heart is reserved, sacred, and spoken only in our language.
            </p>
          </div>
          
          <h3 className="text-xl font-semibold text-blue-600 mb-4 text-center">
            🩵 A Symbol of Us
          </h3>
          
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <motion.div variants={item} className="backdrop-blur-sm bg-white/30 rounded-xl p-4 border border-white/30">
              <h4 className="font-semibold text-blue-600 mb-1">Loyal, Like Distance Can't Break It</h4>
              <p className="text-blue-700">
                Even when we're far, this heart stayed constant. It became the anchor in our long-distance tides.
              </p>
            </motion.div>
            
            <motion.div variants={item} className="backdrop-blur-sm bg-white/30 rounded-xl p-4 border border-white/30">
              <h4 className="font-semibold text-blue-600 mb-1">Calm, Like the Way You Make Me Feel</h4>
              <p className="text-blue-700">
                No chaos. No drama. Just peace. This heart reflects the calmness of your presence, even in silence.
              </p>
            </motion.div>
            
            <motion.div variants={item} className="backdrop-blur-sm bg-white/30 rounded-xl p-4 border border-white/30">
              <h4 className="font-semibold text-blue-600 mb-1">Steady, Like I Always Will Be</h4>
              <p className="text-blue-700">
                This isn't a temporary flame — it's a gentle, consistent warmth that never fades. A reminder that my heart is with you, even when I'm not.
              </p>
            </motion.div>
            
            <motion.div variants={item} className="backdrop-blur-sm bg-white/30 rounded-xl p-4 border border-white/30">
              <h4 className="font-semibold text-blue-600 mb-1">Unique, Because I Never Sent It to Anyone Else</h4>
              <p className="text-blue-700">
                You know this already — I never used 🩵 with anyone. It's our mark, our proof that something pure and private exists.
              </p>
            </motion.div>
            
            <motion.div variants={item} className="backdrop-blur-sm bg-white/30 rounded-xl p-4 border border-white/30">
              <h4 className="font-semibold text-blue-600 mb-1">A Digital Fingerprint of My Emotions for You</h4>
              <p className="text-blue-700">
                In texts, captions, or just that one emoji reply — when I send 🩵, it carries a hundred unsaid words. And you always understood.
              </p>
            </motion.div>
          </motion.div>
          
          <div className="mt-8 text-blue-700">
            <h3 className="text-xl font-semibold text-blue-600 mb-4 text-center">
              🩵 In This Website, It's Everywhere For a Reason
            </h3>
            
            <p className="mb-4">
              Because this gift is made entirely for you, And because everything here is built with the same emotion I feel when I send that heart.
            </p>
            
            <p>
              So every time you see 🩵 in this surprise, know that it's not design — it's memory. love. and us.
            </p>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-8 text-center"
          >
            <div className="text-xl font-medium text-blue-600">
              "I never needed red to show my heart. 🩵 was always enough — because only you ever got it."
            </div>
          </motion.div>
        </GlassBox>
      </motion.div>
    </div>
  );
};

export default HeartMeaningSection;
