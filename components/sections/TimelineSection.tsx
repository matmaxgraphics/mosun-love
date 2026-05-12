'use client';

import { motion } from 'framer-motion';
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
        <motion.div
          key={item.year}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className={`relative w-full min-h-screen bg-gradient-to-b ${item.color} flex items-center justify-center px-6`}
          onMouseEnter={() => setActiveYear(index)}
        >
          {/* Year overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false }}
            className="text-center"
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
    </div>
  );
}
