"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaFingerprint, FaArrowLeft } from "react-icons/fa";

export default function Tasbeeh() {
  const [counter, setCounter] = useState(0); // Counter for tasbeeh clicks
  const [textCounter, setTextCounter] = useState(0); // Counter to switch tasbeeh text after 33 counts
  const [clickCount, setClickCount] = useState(0); // Click counter for display

  // Tasbeeh text array
  const tasbeehTexts = ["سبحان الله", "الحمد لله", "الله أكبر"];

  // Handle click event on the fingerprint button
  const handleClick = () => {
    if (counter < 32) {
      setCounter(counter + 1);
      setClickCount(clickCount + 1); // Increment the click counter
    } else {
      setCounter(0); // Reset counter after 33 clicks
      setClickCount(0); // Reset click counter
      setTextCounter((prev) => (prev + 1) % tasbeehTexts.length); // Move to the next tasbeeh text
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 ">
      {/* Back to Home */}
      <div className="flex justify-start mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-green-600 hover:text-green-700"
        >
          <FaArrowLeft className="mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Tasbeeh Title */}
      <motion.h1
        className="text-4xl font-bold text-center text-green-600 mb-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Tasbeeh Counter
      </motion.h1>

      {/* Tasbeeh Text */}
      <motion.div
        className="text-3xl font-bold text-center text-green-600 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {tasbeehTexts[textCounter]}
      </motion.div>

      {/* Click Counter */}
      <div className="text-lg font-medium text-center mb-6">
        Count: {clickCount}/33
      </div>

      {/* Circle Indicators */}
      <div className="relative flex flex-col items-center h-60 w-full overflow-hidden">
        {[...Array(4)].map((_, i) => {
          const index = (i + counter) % 4; // Loop through 4 circles
          const yPosition = (index - 1.5) * 70; // Adjust for 4 circles

          const sizeClass = index === 1 ? "w-16 h-16" : "w-12 h-12";
          const colorClass = index === 1 ? "bg-green-600" : "bg-green-300";

          return (
            <motion.div
              key={i}
              className={`rounded-full ${sizeClass} ${colorClass} transition-all duration-300`}
              style={{
                transform: `translateY(${yPosition}px)`,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          );
        })}
      </div>

      {/* Fingerprint Icon */}
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2">
        <motion.button
          onClick={handleClick}
          className="text-green-700 text-6xl bg-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaFingerprint />
        </motion.button>
      </div>
    </div>
  );
}
