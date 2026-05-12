'use client';

import { useState } from 'react';
import Image from 'next/image';

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

  return (
    <div className="relative w-full">
      {timelineYears.map((item, index) => (
        <div
          key={item.year}
          className={`relative w-full min-h-screen bg-gradient-to-b ${item.color} flex items-center justify-center px-6 transition-all duration-300`}
          onMouseEnter={() => setActiveYear(index)}
        >
          <div className="w-full max-w-5xl">
            {/* Year overlay */}
            <div className="text-center mb-12">
              <h3
                className={`font-playfair text-8xl md:text-9xl font-light text-white/20 transition-all duration-300 ${
                  activeYear === index ? 'scale-105 shadow-glow' : ''
                }`}
                style={{
                  textShadow: activeYear === index
                    ? '0 0 30px rgba(212, 175, 55, 0.3)'
                    : 'none'
                }}
              >
                {item.year}
              </h3>

              <p className="font-playfair text-2xl text-white mt-4 font-light">
                {item.caption}
              </p>
            </div>

            {/* Images grid */}
            {item.images && item.images.length > 0 && (
              <div className="mt-8">
                <div className={`grid ${
                  item.images.length === 2 
                    ? 'grid-cols-2' 
                    : item.images.length === 3
                    ? 'grid-cols-3'
                    : 'grid-cols-2 md:grid-cols-4'
                } gap-4 max-w-3xl mx-auto`}>
                  {item.images.map((image, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                    >
                      <Image
                        src={`/images/${image}`}
                        alt={`${item.year} memory ${imgIndex + 1}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Progress indicator */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-2">
              {timelineYears.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    activeYear === i || i < activeYear
                      ? 'w-4 bg-[rgba(212,175,55,0.6)]'
                      : 'w-2 bg-[rgba(255,255,255,0.2)]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
