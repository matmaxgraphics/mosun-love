"use client";

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
    <div className="w-full min-h-screen bg-black px-6 py-20 flex flex-col items-center justify-center">
      <div className="max-w-md w-full">
        <div className="mb-8">
          <div className="glassmorphism rounded-2xl p-8">
            <p className="text-center text-[#d4af37] font-light text-sm mb-6 font-playfair">
              I picked this for you
            </p>

            <button
              onClick={handlePlayPause}
              className="w-full h-20 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8860b] flex items-center justify-center mb-6 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <span className="text-3xl text-black">
                {isPlaying ? "❙❙" : "▶"}
              </span>
            </button>

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
        </div>

        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        >
          <source src="/audio/birthday-song.mp3" type="audio/mpeg" />
        </audio>

        <p className="text-center text-gray-400 text-sm font-light mt-8">
          Take a moment to pause and listen
        </p>
      </div>
    </div>
  );
}
