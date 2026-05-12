'use client';

import { motion } from 'framer-motion';
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
    <motion.div
      className="relative w-full min-h-screen bg-black flex items-center justify-center px-6 py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false }}
    >
      {/* Confetti */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {confettiPieces.map((piece: Confetti) => (
            <motion.div
              key={piece.id}
              className="absolute rounded-full bg-[#d4af37]"
              style={{
                left: `${piece.left}%`,
                top: -20,
                width: piece.size,
                height: piece.size,
              }}
              animate={{
                y: window.innerHeight + 40,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: 'easeIn',
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <motion.div
        className="max-w-2xl w-full text-center z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false }}
      >
        {/* Glowing text */}
        <motion.div
          className="mb-12"
          animate={{
            boxShadow: [
              '0 0 20px rgba(212, 175, 55, 0.3)',
              '0 0 40px rgba(212, 175, 55, 0.5)',
              '0 0 20px rgba(212, 175, 55, 0.3)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <h2 className="font-playfair text-4xl md:text-5xl text-white font-light leading-relaxed min-h-32">
            {displayedText}
            {displayedText.length < revelText.length && (
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-[#d4af37]"
              >
                |
              </motion.span>
            )}
          </h2>
        </motion.div>

        {/* Share message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          viewport={{ once: false }}
          className="space-y-4"
        >
          <p className="text-gray-400 font-light">
            Open this on your phone for the full experience
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button
              onClick={() => {
                const url = window.location.href;
                const text = "Look what I made for you 🎂";
                if (navigator.share) {
                  navigator.share({ title: 'Birthday Message', text, url });
                }
              }}
              className="px-8 py-3 bg-[#d4af37] text-black rounded-lg font-light hover:bg-[#f0e68c] transition-colors"
            >
              Share this moment
            </button>
          </motion.div>
        </motion.div>

        {/* Final message */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          viewport={{ once: false }}
          className="text-xs text-gray-600 mt-12 font-light"
        >
          Made with care
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
