"use client";

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
                <div className="overflow-hidden">
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
                            <div
                              key={imgIndex}
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
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
