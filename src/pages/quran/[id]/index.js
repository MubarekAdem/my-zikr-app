"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSpinner, FaArrowLeft } from "react-icons/fa";
import { Amiri, Scheherazade_New } from "next/font/google";
import Link from "next/link";
import DecorativeFrame from "@/components/DecorativeFrame";

const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] });
const scheherazade = Scheherazade_New({
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export default function Surah() {
  const params = useParams();
  const id = params?.id;

  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      async function fetchSurah() {
        try {
          const response = await fetch(
            `https://api.alquran.cloud/v1/surah/${id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch Surah");
          }
          const data = await response.json();
          setSurah(data.data);
        } catch (error) {
          console.error("Error fetching Surah:", error);
          setError(
            "An error occurred while fetching the Surah. Please try again later."
          );
        } finally {
          setLoading(false);
        }
      }
      fetchSurah();
    } else {
      setLoading(false);
      setError("Invalid Surah ID.");
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-green-600" />
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

  if (!surah) {
    return null;
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center ${amiri.className} p-4 bg-[#f8f3e9]`}
    >
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/quran"
          className="inline-flex items-center text-green-700 hover:text-green-800 mb-4"
        >
          <FaArrowLeft className="mr-2" />
          Back to Surah List
        </Link>
        <motion.h1
          className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-4 text-center text-green-700 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {surah.englishName} - {surah.name}
        </motion.h1>
        <DecorativeFrame>
          <p className="text-center text-gray-600 mb-4">
            {surah.englishNameTranslation} • {surah.numberOfAyahs} verses •{" "}
            {surah.revelationType}
          </p>
          <div className="mt-6 px-2 sm:px-4 lg:px-6" dir="rtl">
            {surah.number !== 9 && (
              <motion.div
                className={`text-center mb-8 text-3xl ${scheherazade.className}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                ﷽
              </motion.div>
            )}
            {surah.ayahs.length > 0 ? (
              <div
                className={`leading-relaxed text-lg sm:text-xl space-y-4 text-justify ${scheherazade.className}`}
              >
                {surah.ayahs.map((ayah, index) => (
                  <motion.div
                    key={ayah.number}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="relative group"
                  >
                    <span className="text-gray-800">{ayah.text}</span>{" "}
                    <span className="inline-flex items-center justify-center w-8 h-8 text-sm bg-green-100 text-green-700 rounded-full ml-2 transition-transform group-hover:scale-110">
                      {ayah.numberInSurah}
                    </span>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p>No verses found.</p>
            )}
          </div>
        </DecorativeFrame>
      </div>
    </div>
  );
}
