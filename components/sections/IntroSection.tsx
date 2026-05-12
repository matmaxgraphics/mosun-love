'use client';

import Image from 'next/image';

export function IntroSection() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-b from-gray-900 via-black to-black" />
      </div>

      {/* Content */}
      <div className="relative w-full h-full flex flex-col items-center justify-center px-6">
        {/* Fade-in text from bottom */}
        <div className="text-center max-w-2xl">
          <h2 className="font-playfair text-5xl md:text-6xl font-light text-white mb-6 leading-tight">
            Celebrate
          </h2>
          <p className="text-lg text-gray-300 font-light leading-relaxed max-w-lg mx-auto">
            Every year brings new stories, new memories, and new reasons to be grateful for who you've become.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
