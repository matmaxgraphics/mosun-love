"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const specialQualities = [
  {
    title: "Resilience",
    description:
      "You face challenges with grace and come out stronger every time.",
    year: 2023,
    images: ["2023.jpg", "2023-2.jpg", "2023-3.jpg"],
  },
  {
    title: "Kindness",
    description:
      "Your compassion touches the lives of everyone around you.",
    year: 2024,
    images: ["2024.jpg", "2024-2.jpg", "2024-3.jpg", "2024-4.jpg"],
  },
  {
    title: "Authenticity",
    description:
      "You inspire others by being unapologetically yourself.",
    year: 2025,
    images: ["2025.jpg", "2025-4.jpg"],
  },
  {
    title: "Vision",
    description:
      "You dream big and have the courage to chase those dreams. Also, it was the year I met the most amazing woman, and that's you.",
    year: 2026,
    images: [
      "2026.jpg",
      "2026-2.jpg",
      "2026-3.jpg",
      "2026-4.jpg",
      "2026-5.jpg",
    ],
  },
  {
    title: "Growth",
    description:
      "You embrace change and continuously become a better version of yourself.",
    year: 2025,
    images: ["2025.jpg", "2025-4.jpg"],
  },
];

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
    },
  }),
};

export function SpecialCardsSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="w-full min-h-screen bg-black px-6 py-20 flex flex-col items-center justify-center">
      <motion.h2
        className="font-playfair text-4xl md:text-5xl text-white mb-12 text-center font-light"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        What Makes You Special
      </motion.h2>

      <div className="w-full max-w-2xl space-y-4">
        {specialQualities.map((quality, index) => (
          <motion.button
            key={index}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            onClick={() =>
              setExpandedIndex(
                expandedIndex === index ? null : index
              )
            }
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full text-left"
          >
            <motion.div
              className="rounded-xl p-6 cursor-pointer border border-white/20 bg-white/5 backdrop-blur-md"
              animate={{
                borderColor:
                  expandedIndex === index
                    ? "rgba(212,175,55,0.6)"
                    : "rgba(255,255,255,0.2)",
                backgroundColor:
                  expandedIndex === index
                    ? "rgba(212,175,55,0.08)"
                    : "rgba(255,255,255,0.05)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-playfair text-2xl text-white font-light">
                  {quality.title}
                </h3>

                <motion.div
                  animate={{
                    rotate:
                      expandedIndex === index ? 180 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-[#d4af37]"
                >
                  ◆
                </motion.div>
              </div>

              <motion.div
                initial={false}
                animate={{
                  opacity:
                    expandedIndex === index ? 1 : 0,
                  height:
                    expandedIndex === index
                      ? "auto"
                      : 0,
                }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden"
              >
                <p className="text-gray-300 mt-3 mb-4 text-sm leading-relaxed">
                  {quality.description}
                </p>

                {quality.images?.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">
                      Memories from {quality.year}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {quality.images.map(
                        (image, imgIndex) => (
                          <motion.div
                            key={imgIndex}
                            initial={{
                              opacity: 0,
                              scale: 0.9,
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                            }}
                            transition={{
                              delay:
                                imgIndex * 0.08,
                            }}
                            className="relative aspect-square rounded-lg overflow-hidden"
                          >
                            <Image
                              src={`/images/${image}`}
                              alt={`${quality.year} memory ${
                                imgIndex + 1
                              }`}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </motion.div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}