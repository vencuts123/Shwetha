import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Volume2, VolumeX, AlertCircle } from 'lucide-react';
import GlassBox from './GlassBox';

interface AudioPlayerProps {
  isUnlocked: boolean;
}

const AudioPlayer = ({ isUnlocked }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Create the audio element
  useEffect(() => {
    if (isUnlocked && !audioRef.current) {
      const audio = new Audio('/Anirudh.mp3');
      audio.loop = true;
      audio.volume = volume;
      audio.addEventListener('canplaythrough', () => {
        setAudioLoaded(true);
      });
      audio.addEventListener('error', () => {
        setAudioError('Audio file could not be loaded. Please check the file path or try again.');
      });
      audioRef.current = audio;

      // Load volume from localStorage if available
      const savedVolume = localStorage.getItem('shwetha-music-volume');
      if (savedVolume) {
        const parsedVolume = parseFloat(savedVolume);
        setVolume(parsedVolume);
        if (audioRef.current) {
          audioRef.current.volume = parsedVolume;
        }
      }

      const savedMuted = localStorage.getItem('shwetha-music-muted');
      if (savedMuted === 'true') {
        setIsMuted(true);
        if (audioRef.current) {
          audioRef.current.muted = true;
        }
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isUnlocked]);

  // Play/pause functionality
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(err => setAudioError('Error playing audio: ' + err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Update volume
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    localStorage.setItem('shwetha-music-volume', volume.toString());
  }, [volume]);

  // Update muted state
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = isMuted;
    localStorage.setItem('shwetha-music-muted', isMuted.toString());
  }, [isMuted]);

  // Handle toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
    }
    if (newVolume === 0) {
      setIsMuted(true);
    }
  };

  // Handle play/pause when clicking the Music button
  const handleMusicButtonClick = () => {
    setShowControls(!showControls);
    // Only play/pause if audio is loaded
    if (audioLoaded && !audioError) {
      setIsPlaying(prev => !prev);
    }
  };

  // Audio visualization bars (simple version)
  const AudioWaveform = () => {
    return (
      <div className="flex items-center justify-center h-4 gap-[2px] mx-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-[3px] bg-blue-400/70 rounded-full"
            animate={{
              height: isPlaying && !isMuted ? 
                [8, 12 + Math.random() * 8, 8] : 
                4
            }}
            transition={{
              duration: 0.8 + Math.random() * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    );
  };

  // Show error if audio fails to load
  if (audioError) {
    return (
      <div className="fixed bottom-6 right-1/2 transform translate-x-1/2 z-50">
        <GlassBox className="p-4 flex items-center gap-2 bg-red-100 border border-red-400">
          <AlertCircle className="text-red-500" size={20} />
          <span className="text-red-700 font-medium">{audioError}</span>
        </GlassBox>
      </div>
    );
  }

  if (!isUnlocked || !audioLoaded || audioError) return null;

  return (
    <div className="fixed bottom-6 right-1/2 transform translate-x-1/2 z-50">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <GlassBox 
          className={`p-2 px-3 relative overflow-hidden transition-all duration-300 ${
            showControls ? 'min-w-[240px]' : 'min-w-[50px]'
          }`}
          whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(0,150,255,0.2)" }}
        >
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.button
              onClick={handleMusicButtonClick}
              className={`text-blue-500 mr-2 hover:text-blue-600 transition-colors duration-200 relative ${isMuted ? 'opacity-50' : ''}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={isMuted ? 'Unmute and play the sound of our memory 💙' : 'This song describes our bond 🎶'}
            >
              <Music size={18} />
              {!showControls && (
                <motion.div 
                  className="absolute -right-1 -top-1 w-2 h-2 bg-blue-500 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.7, 1] 
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              )}
              {isMuted && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs text-blue-400">Muted</span>
              )}
            </motion.button>
            <AnimatePresence>
              {showControls && (
                <motion.div 
                  className="flex items-center"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                >
                  <motion.button 
                    onClick={toggleMute}
                    className="text-blue-500 hover:text-blue-600 transition-colors duration-200 flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title={isMuted ? "Unmute the sound of our memory 💙" : "Silence the sound, but not the memory 💙"}
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </motion.button>
                  <div className="relative mx-3 flex-grow min-w-[120px]" title="Adjust the volume of our story…">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume * 100}%, #e2e8f0 ${volume * 100}%, #e2e8f0 100%)`,
                      }}
                    />
                    <div className="mt-1 text-xs text-blue-500 text-center font-medium">
                      {Math.round(volume * 100)}%
                    </div>
                  </div>
                  <AudioWaveform />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </GlassBox>
      </motion.div>
    </div>
  );
};

export default AudioPlayer;
