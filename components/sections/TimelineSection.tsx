'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { ImageGallery } from '@/components/ImageGallery';

const timelineYears = [
 
  {
    year: 2023,
    caption: 'Growth & Discovery',
    color: 'from-blue-900 to-black',
    images: ['2023.jpg', '2023-2.jpg', '2023-3.jpg'],
  },
  {
    year: 2024,
    caption: 'Strength & Resilience',
    color: 'from-gray-800 to-black',
    images: ['2024.jpg', '2024-2.jpg', '2024-3.jpg', '2024-4.jpg'],
  },
  {
    year: 2025,
    caption: 'New Horizons',
    color: 'from-green-900 to-black',
    images: ['2025.jpg', '2025-4.jpg'],
  },
  {
    year: 2026,
    caption: 'Your Story Continues',
    color: 'from-amber-900 to-black',
    images: ['2026.jpg', '2026-2.jpg', '2026-3.jpg', '2026-4.jpg', '2026-5.jpg'],
  },
];

export function TimelineSection() {
  const [activeYear, setActiveYear] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="relative w-full">
      {timelineYears.map((item, index) => (
        <motion.div
          key={item.year}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className={`relative w-full min-h-screen bg-gradient-to-b ${item.color} flex items-center justify-center px-6`}
          onMouseEnter={() => setActiveYear(index)}
        >
          <div className="w-full max-w-5xl">
            {/* Year overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false }}
              className="text-center mb-12"
            >
              <motion.h3
                className="font-playfair text-8xl md:text-9xl font-light text-white/20"
                animate={{
                  scale: activeYear === index ? 1.05 : 1,
                  textShadow:
                    activeYear === index
                      ? '0 0 30px rgba(212, 175, 55, 0.3)'
                      : '0 0 0px rgba(212, 175, 55, 0)',
                }}
                transition={{ duration: 0.3 }}
              >
                {item.year}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: false }}
                className="font-playfair text-2xl text-white mt-4 font-light"
              >
                {item.caption}
              </motion.p>
            </motion.div>

            {/* Images grid */}
            {item.images && item.images.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false }}
                className="mt-8"
              >
                <div className={`grid ${
                  item.images.length === 2 
                    ? 'grid-cols-2' 
                    : item.images.length === 3
                    ? 'grid-cols-3'
                    : 'grid-cols-2 md:grid-cols-4'
                } gap-4 max-w-3xl mx-auto`}>
                  {item.images.map((image, imgIndex) => (
                    <motion.button
                      key={imgIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: imgIndex * 0.1 }}
                      viewport={{ once: false }}
                      className="relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-2xl group cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => {
                        setSelectedYear(index);
                        setSelectedImageIndex(imgIndex);
                        setGalleryOpen(true);
                      }}
                    >
                      <Image
                        src={`/images/${image}`}
                        alt={`${item.year} memory ${imgIndex + 1}`}
                        fill
                        className="object-cover"
                      />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/20 to-transparent"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Click indicator */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <div className="text-white text-4xl">🔍</div>
                      </motion.div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Progress indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex gap-2">
              {timelineYears.map((_, i) => (
                <motion.div
                  key={i}
                  className="h-1 bg-white/20 rounded-full"
                  animate={{
                    width: activeYear === i || i < activeYear ? '16px' : '8px',
                    backgroundColor:
                      i <= index ? 'rgba(212, 175, 55, 0.6)' : 'rgba(255, 255, 255, 0.2)',
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Image Gallery Modal */}
      <ImageGallery
        images={timelineYears[selectedYear]?.images || []}
        year={timelineYears[selectedYear]?.year || 0}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        initialImageIndex={selectedImageIndex}
      />
    </div>
  );
}
