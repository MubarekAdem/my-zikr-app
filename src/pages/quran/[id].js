"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSpinner, FaArrowLeft } from "react-icons/fa";
import { Amiri } from "next/font/google";
import Link from "next/link";

const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] });

export default function Surah() {
  const params = useParams();
  const { id } = params;

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
    }
  }, [id]);

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

  if (!surah) {
    return null;
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center ${amiri.className} p-4 bg-gray-100`}
    >
      <div className="w-full max-w-3xl">
        <Link
          href="/quran"
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-4"
        >
          <FaArrowLeft className="mr-2" />
          Back to Surah List
        </Link>
        <motion.h1
          className="text-3xl font-bold mt-4 text-center text-green-600 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {surah.englishName} - {surah.name}
        </motion.h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-center text-gray-600 mb-4">
            {surah.englishNameTranslation} • {surah.numberOfAyahs} verses •{" "}
            {surah.revelationType}
          </p>
          <div className="mt-6" dir="rtl">
            {surah.ayahs.length > 0 ? (
              <div className="leading-loose text-xl space-y-4 text-justify">
                {surah.ayahs.map((ayah) => (
                  <motion.div
                    key={ayah.number}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-gray-800">{ayah.text}</span>{" "}
                    <span className="text-green-500 text-sm">
                      ({ayah.numberInSurah})
                    </span>{" "}
                  </motion.div>
                ))}
              </div>
            ) : (
              <p>No verses found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
