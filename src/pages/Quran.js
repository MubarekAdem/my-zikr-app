"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaBook, FaSpinner } from "react-icons/fa";
import { Amiri } from "next/font/google";

const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] });

export default function Quran() {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSurahs() {
      try {
        const response = await fetch("https://api.alquran.cloud/v1/surah");
        if (!response.ok) {
          throw new Error("Failed to fetch Surahs");
        }
        const data = await response.json();
        setSurahs(data.data);
      } catch (err) {
        setError(
          "An error occurred while fetching the Surahs. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    }
    fetchSurahs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-green-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <motion.h1
        className="text-4xl font-bold text-center text-green-600 mb-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        The Noble Quran
      </motion.h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {surahs.map((surah, index) => (
          <motion.div
            key={surah.number}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Link href={`/quran/${surah.number}`} className="block">
              <motion.div
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-green-600">
                      {surah.number}
                    </span>
                    <FaBook className="text-2xl text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">
                    {surah.englishName}
                  </h2>
                  <p
                    className={`${amiri.className} text-2xl font-bold text-right mb-2`}
                  >
                    {surah.name}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    {surah.englishNameTranslation}
                  </p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{surah.numberOfAyahs} verses</span>
                    <span>{surah.revelationType}</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
