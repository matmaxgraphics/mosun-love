'use client';

import { useState } from 'react';

const timelineYears = [
 
  {
    year: 2023,
    caption: 'Growth & Discovery',
    color: 'from-blue-900 to-black',
  },
  {
    year: 2024,
    caption: 'Strength & Resilience',
    color: 'from-gray-800 to-black',
  },
  {
    year: 2025,
    caption: 'New Horizons',
    color: 'from-green-900 to-black',
  },
  {
    year: 2026,
    caption: 'Your Story Continues',
    color: 'from-amber-900 to-black',
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
          {/* Year overlay */}
          <div className="text-center">
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
