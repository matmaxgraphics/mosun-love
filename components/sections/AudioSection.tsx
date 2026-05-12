"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export function AudioSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Play error:", error);
        });
        setIsPlaying(true);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      className="w-full min-h-screen bg-black px-6 py-20 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false }}
    >
      <motion.div
        className="max-w-md w-full"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mb-8"
        >
          <div className="glassmorphism rounded-2xl p-8">
            <p className="text-center text-[#d4af37] font-light text-sm mb-6 font-playfair">
              I picked this for you
            </p>

            <motion.button
              onClick={handlePlayPause}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full h-20 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8860b] flex items-center justify-center mb-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 0.6,
                  repeat: isPlaying ? Infinity : 0,
                }}
              >
                <span className="text-3xl text-black">
                  {isPlaying ? "❙❙" : "▶"}
                </span>
              </motion.div>
            </motion.button>

            <div className="space-y-4">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={progress}
                onChange={handleProgressChange}
                className="w-full h-1 bg-white/20 rounded-full cursor-pointer accent-[#d4af37]"
              />

              <div className="flex justify-between text-xs text-gray-400 font-light">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        >
          <source src="/audio/birthday-song.mp3" type="audio/mpeg" />
        </audio>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: false }}
          className="text-center text-gray-400 text-sm font-light mt-8"
        >
          Take a moment to pause and listen
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
