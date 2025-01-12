"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaBook, FaSpinner, FaSearch, FaArrowLeft } from "react-icons/fa";
import { Amiri } from "next/font/google";

const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] });

export default function Quran() {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSurahs, setFilteredSurahs] = useState([]);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);

  useEffect(() => {
    async function fetchSurahs() {
      try {
        const response = await fetch("https://api.alquran.cloud/v1/surah");
        if (!response.ok) {
          throw new Error("Failed to fetch Surahs");
        }
        const data = await response.json();
        setSurahs(data.data);
        setFilteredSurahs(data.data); // Initialize filteredSurahs
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

  useEffect(() => {
    // Filter Surahs based on search term
    const filtered = surahs.filter(
      (surah) =>
        surah.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        surah.name.includes(searchTerm)
    );
    setFilteredSurahs(filtered);

    // Generate autocomplete suggestions
    setAutocompleteSuggestions(
      filtered.map((surah) => ({
        number: surah.number,
        englishName: surah.englishName,
        name: surah.name,
      }))
    );
  }, [searchTerm, surahs]);

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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4 text-gray-900 dark:text-white">
      <Link
        href="/"
        className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-500 mb-4"
      >
        <FaArrowLeft className="mr-2" />
        Back to Home
      </Link>
      <motion.h1
        className="text-4xl font-bold text-center text-green-600 dark:text-green-400 mb-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        The Noble Quran
      </motion.h1>

      {/* Search Bar */}
      <div className="max-w-6xl mx-auto mb-6 relative">
        <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <FaSearch className="text-green-600 dark:text-green-400 text-xl mr-3" />
          <input
            type="text"
            placeholder="Search for a Surah..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border-none focus:outline-none text-gray-700 dark:text-gray-300 bg-transparent"
          />
        </div>
        {searchTerm && (
          <ul className="absolute bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg mt-2 w-full z-10 max-h-40 overflow-y-auto shadow-md">
            {autocompleteSuggestions.map((suggestion) => (
              <li
                key={suggestion.number}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Link href={`/quran/${suggestion.number}`}>
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 dark:text-green-400 font-bold">
                      {suggestion.number}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {suggestion.englishName}
                    </span>
                    <span
                      className={`${amiri.className} text-lg text-right dark:text-gray-200`}
                    >
                      {suggestion.name}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Surah List */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSurahs.map((surah, index) => (
          <motion.div
            key={surah.number}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Link href={`/quran/${surah.number}`} className="block">
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {surah.number}
                    </span>
                    <FaBook className="text-2xl text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2 dark:text-gray-300">
                    {surah.englishName}
                  </h2>
                  <p
                    className={`${amiri.className} text-2xl font-bold text-right mb-2 dark:text-gray-200`}
                  >
                    {surah.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {surah.englishNameTranslation}
                  </p>
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
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
