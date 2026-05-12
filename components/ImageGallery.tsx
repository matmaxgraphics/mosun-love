'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  year: number;
  isOpen: boolean;
  onClose: () => void;
  initialImageIndex: number;
}

export function ImageGallery({
  images,
  year,
  isOpen,
  onClose,
  initialImageIndex,
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialImageIndex);

  useEffect(() => {
    setCurrentIndex(initialImageIndex);
  }, [initialImageIndex, isOpen]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, isOpen]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="absolute -top-12 right-0 text-white text-3xl hover:text-[#d4af37] transition-colors z-10"
            >
              ✕
            </motion.button>

            {/* Main image */}
            <div className="relative w-full aspect-square md:aspect-auto md:h-[70vh] rounded-xl overflow-hidden bg-black">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={`/images/${images[currentIndex]}`}
                    alt={`${year} memory ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="mt-6 flex items-center justify-between">
              {/* Left arrow */}
              <motion.button
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevious}
                disabled={images.length <= 1}
                className="text-white text-3xl hover:text-[#d4af37] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ←
              </motion.button>

              {/* Image counter and thumbnails */}
              <div className="flex-1 mx-6">
                <div className="text-center text-gray-300 text-sm mb-4">
                  {currentIndex + 1} / {images.length}
                </div>
                
                {/* Thumbnail strip */}
                <div className="flex gap-2 justify-center overflow-x-auto pb-2">
                  {images.map((image, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                        idx === currentIndex
                          ? 'border-[#d4af37]'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Image
                        src={`/images/${image}`}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Right arrow */}
              <motion.button
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                disabled={images.length <= 1}
                className="text-white text-3xl hover:text-[#d4af37] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                →
              </motion.button>
            </div>

            {/* Info */}
            <p className="text-center text-gray-400 text-sm mt-4">
              Use arrow keys to navigate • ESC to close
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
