import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassBox from './GlassBox';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  emoji: string;
  isExpanded?: boolean;
}

const AboutUsSection = () => {
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([
    {
      date: "August 02, 2023",
      title: "Our First Phone Call",
      description: "Our very first phone call on Snapchat. The beginning of hearing each other's voices.",
      emoji: "📞",
      isExpanded: true
    },
    {
      date: "August 03, 2023",
      title: "WhatsApp Connection",
      description: "We moved our conversations to WhatsApp and started texting more regularly.",
      emoji: "💬",
      isExpanded: false
    },
    {
      date: "August 06, 2023",
      title: "Long Conversation",
      description: "We talked for 2.5 hours on call. Time seemed to fly by as we got to know each other better.",
      emoji: "⏱️",
      isExpanded: false
    },
    {
      date: "August 18, 2023",
      title: "Blue Heart Connection",
      description: "We changed our red heart to blue heart. A special moment symbolizing our deepening bond.",
      emoji: "🩵",
      isExpanded: false
    },
    {
      date: "September 10, 2023",
      title: "Hilarious Chat",
      description: "Check this date on our WhatsApp chat. A moment of pure laughter and joy between us.",
      emoji: "😂",
      isExpanded: false
    },
    {
      date: "June 24, 2024",
      title: "Ludo Masters",
      description: "We played Ludo together for the first time. The beginning of our friendly competition.",
      emoji: "🎲",
      isExpanded: false
    },
    {
      date: "June 25, 2024",
      title: "GROIC Session",
      description: "We listened to songs together in GROIC for the first time. Music bringing us closer.",
      emoji: "🎵",
      isExpanded: false
    },
    {
      date: "July 15, 2024",
      title: "First Meet",
      description: "Our first meeting at Phoenix Mall. Finally seeing each other face to face after months of calls and messages.",
      emoji: "🫂",
      isExpanded: false
    },
    {
      date: "July 04, 2024",
      title: "This Gift",
      description: "Creating this digital memory vault for your birthday - a collection of our moments together.",
      emoji: "🎁",
      isExpanded: false
    }
  ]);

  const toggleExpand = (index: number) => {
    const updatedEvents = [...timelineEvents];
    updatedEvents[index].isExpanded = !updatedEvents[index].isExpanded;
    setTimelineEvents(updatedEvents);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-sky-100 via-blue-200 to-blue-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <GlassBox className="p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-600 text-center">📅 Our Timeline</h2>
          <p className="text-blue-700 text-center">
            Every important moment, captured in time
          </p>
        </GlassBox>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {timelineEvents.map((event, index) => (
            <motion.div key={index} variants={item}>
              <GlassBox 
                className={`p-4 relative ${event.isExpanded ? 'border-blue-300' : ''}`}
                onClick={() => toggleExpand(index)}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
                    {event.emoji}
                  </div>
                  <div className="ml-4 flex-grow">
                    <div className="text-sm text-blue-500">{event.date}</div>
                    <div className="font-medium text-blue-700">{event.title}</div>
                  </div>
                  <div className="ml-2">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className={`text-blue-500 transition-transform ${event.isExpanded ? 'rotate-180' : ''}`}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
                
                {event.isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 text-blue-700"
                  >
                    <p>{event.description}</p>
                  </motion.div>
                )}
              </GlassBox>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <div className="text-blue-600 italic">
            "Time is measured not by clocks, but by moments shared with you. 🩵"
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutUsSection;
