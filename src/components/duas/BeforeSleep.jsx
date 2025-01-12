"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const duas = [
  "Surah as-Sajdah & Surah-al-Mulk",
  "Surah as-Sajdah",
  "Surah al-Mulk",
  "Ayat al-Kursi",
  "Last two Ayah of Surah-al Baqrah: Will suffice you",
  "Surah-al Kafirun: Negation of Shirk",
  "3 Quls",
  "Tasbih, Tahmid and Takbir",
  "Mercy & Protection",
  "Protection from Punishment",
  "Thank Allah for Blessing you",
  "Protect yourself from the 4 Evils",
  "Protection from Evil and Settling of Debts",
  "Ask Allah to Protect you from evil",
  "Protection, Well-being and Forgiveness",
  "Forgiveness & Protection",
  "Praise Allah with the Praises of the Entire Creation",
  "Sleep in the name of your Lord",
  "Get Forgiven before going to Sleep",
  "Die upon the Fitrah",
];

const DuasComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRefs = useRef([]);

  // Scroll to the selected dua
  const handleScrollTo = (index) => {
    setActiveIndex(index);
    contentRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Highlight active dua on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = contentRefs.current.indexOf(entry.target);
            if (index !== -1) {
              setActiveIndex(index);
            }
          }
        });
      },
      { threshold: 0.6 }
    );

    contentRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar/Table of Contents */}
      <div className="w-1/4 bg-gray-100 p-4 border-r overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
        <ul>
          {duas.map((dua, index) => (
            <li
              key={index}
              onClick={() => handleScrollTo(index)}
              className={`p-2 cursor-pointer rounded-md ${
                activeIndex === index
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {dua}
            </li>
          ))}
        </ul>
      </div>

      {/* Content Area */}
      <div className="w-3/4 p-4 overflow-y-auto">
        {duas.map((dua, index) => (
          <motion.div
            key={index}
            ref={(el) => (contentRefs.current[index] = el)}
            className="mb-6 p-4 border rounded-md shadow-sm bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <h3 className="text-xl font-bold mb-2">{dua}</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              nec iaculis mauris. Duis vehicula orci a lacus malesuada, nec
              bibendum lorem pellentesque.
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DuasComponent;
