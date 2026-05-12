'use client';

import { useEffect, useState } from 'react';
import { confettiPieces } from '@/lib/animations';

interface Confetti {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

const revelText = "Happy Birthday. Here's to another year of being extraordinary.";

export function FinalRevealSection() {
  const [displayedText, setDisplayedText] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < revelText.length) {
        setDisplayedText(revelText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setShowConfetti(true);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Confetti */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {confettiPieces.map((piece: Confetti) => (
            <div
              key={piece.id}
              className="absolute rounded-full bg-[#d4af37]"
              style={{
                left: `${piece.left}%`,
                top: -20,
                width: piece.size,
                height: piece.size,
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="max-w-2xl w-full text-center z-10">
        {/* Glowing text */}
        <div className="mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl text-white font-light leading-relaxed min-h-32">
            {displayedText}
            {displayedText.length < revelText.length && (
              <span className="text-[#d4af37]">|</span>
            )}
          </h2>
        </div>

        {/* Share message */}
        <div className="space-y-4">
          <p className="text-gray-400 font-light">
            Open this on your phone for the full experience
          </p>
          <div className="inline-block">
            <button
              onClick={() => {
                const url = window.location.href;
                const text = "Look what I made for you 🎂";
                if (navigator.share) {
                  navigator.share({ title: 'Birthday Message', text, url });
                }
              }}
              className="px-8 py-3 bg-[#d4af37] text-black rounded-lg font-light hover:bg-[#f0e68c] hover:scale-105 active:scale-95 transition-all"
            >
              Share this moment
            </button>
          </div>
        </div>

        {/* Final message */}
        <p className="text-xs text-gray-600 mt-12 font-light">
          Made with care
        </p>
      </div>
    </div>
  );
}
