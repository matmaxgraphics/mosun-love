"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const specialQualities = [
  {
    title: "Resilience",
    description:
      "You face challenges with grace and come out stronger every time.",
  },
  {
    title: "Kindness",
    description:
      "Your compassion touches the lives of everyone around you.",
  },
  {
    title: "Authenticity",
    description:
      "You inspire others by being unapologetically yourself.",
  },
  {
    title: "Vision",
    description:
      "You dream big and have the courage to chase those dreams. Also, it was the year I met the most amazing woman, and that's you.",
  },
  {
    title: "Growth",
    description:
      "You embrace change and continuously become a better version of yourself.",
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
    <motion.div 
      className="w-full min-h-screen bg-black px-6 py-20 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false }}
    >
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
              className="rounded-xl p-6 cursor-pointer border backdrop-blur-md"
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
                <p className="text-gray-300 mt-3 text-sm leading-relaxed">
                  {quality.description}
                </p>
              </motion.div>
            </motion.div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
