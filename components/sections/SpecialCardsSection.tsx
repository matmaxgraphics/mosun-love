"use client";

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

export function SpecialCardsSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="w-full min-h-screen bg-black px-6 py-20 flex flex-col items-center justify-center">
      <h2 className="font-playfair text-4xl md:text-5xl text-white mb-12 text-center font-light">
        What Makes You Special
      </h2>

      <div className="w-full max-w-2xl space-y-4">
        {specialQualities.map((quality, index) => (
          <button
            key={index}
            onClick={() =>
              setExpandedIndex(
                expandedIndex === index ? null : index
              )
            }
            className="w-full text-left"
          >
            <div
              className={`rounded-xl p-6 cursor-pointer border transition-all duration-300 ${
                expandedIndex === index
                  ? "border-[#d4af37] border-opacity-60 bg-[#d4af37] bg-opacity-8"
                  : "border-white border-opacity-20 bg-white bg-opacity-5"
              } backdrop-blur-md`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-playfair text-2xl text-white font-light">
                  {quality.title}
                </h3>

                <div
                  className={`text-[#d4af37] transition-transform duration-300 ${
                    expandedIndex === index ? "rotate-180" : ""
                  }`}
                >
                  ◆
                </div>
              </div>

              {expandedIndex === index && (
                <p className="text-gray-300 mt-3 text-sm leading-relaxed">
                  {quality.description}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
