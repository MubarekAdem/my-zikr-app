"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Roboto_Slab } from "next/font/google";
import Link from "next/link";
import { FaSpinner, FaArrowLeft } from "react-icons/fa";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

// Morning Zikr data (unchanged)
const morningZikr = [
  {
    text: `اَللّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَّعَلَىٰ اٰلِ مُحَمَّدٍ ، كَمَا صَلَّيْتَ عَلَىٰ إِبْرَاهِيْمَ وَعَلَىٰ اٰلِ إِبْرَاهِيْمَ ، إِنَّكَ حَمِيْدٌ مَّجِيْدٌ ، اَللّٰهُمَّ بَارِكْ عَلَىٰ مُحَمَّدٍ وَّعَلَىٰ اٰلِ مُحَمَّدٍ ، كَمَا بَارَكْتَ عَلَىٰ إِبْرَاهِيْمَ وَعَلَىٰ اٰلِ إِبْرَاهِيْمَ ، إِنَّكَ حَمِيْدٌ مَّجِيْدٌ.`,

    count: 1,
  }, // Subhanallah
  // Alhamdulillah
  {
    text: `اَللّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَّعَلَىٰ اٰلِ بَيْتِهِ ، كَمَا صَلَّيْتَ عَلَىٰ اٰلِ إِبْرَاهِيْمَ ، إِنَّكَ حَمِيْدٌ مَّجِيْدٌ ، اَللّٰهُمَّ صَلِّ عَلَيْنَا مَعَهُمْ ، اَللّٰهُمَّ بَارِكْ عَلَىٰ مُحَمَّدٍ وَّعَلَىٰ اٰلِ بَيْتِهِ ، كَمَا بَارَكْتَ عَلَىٰ اٰلِ إِبْرَاهِيْمَ ، إِنَّكَ حَمِيْدٌ مَّجِيْدٌ ، اَللّٰهُمَّ بَارِكْ عَلَيْنَا مَعَهُمْ ، صَلَوَاتُ اللّٰهِ وَصَلَاةُ الْمُؤْمِنِيْنَ عَلَىٰ مُحَمَّدٍ النَّبيِّ الْأُمِّيِّ.`,
    count: 1,
  }, // Alhamdulillah
  {
    text: `اَللّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَّأَزْوَاجِهِ وَذُرِّيَّتِهِ ، كَمَا صَلَّيْتَ عَلَىٰ اٰلِ إِبْرَاهِيْمَ ، وَبَارِكْ عَلَىٰ مُحَمَّدٍ وَّأَزْوَاجِهِ وَذُرِّيَّتِهِ ، كَمَا بَارَكْتَ عَلَىٰ اٰلِ إِبْرَاهِيْمَ ، إِنَّكَ حَمِيْدٌ مَّجِيْدٌ.`,
    count: 1,
  }, // Alhamdulillah
  {
    text: `اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَّعَلَىٰ اٰلِ مُحَمَّدٍ ، كَمَا صَلَّيْتَ عَلَىٰ اٰلِ إِبْرَاهِيْمَ ، وَبَارِكْ عَلَىٰ مُحَمَّدٍ وَّعَلَىٰ اٰلِ مُحَمَّدٍ ، كَمَا بَارَكْتَ عَلَىٰ اٰلِ إِبْرَاهِيْمَ فِي الْعَالَمِيْنَ ، إِنَّكَ حَمِيْدٌ مَّجِيْدٌ.`,
    count: 1,
  }, // Alhamdulillah
  {
    text: `اَللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَّعَلَىٰ اٰلِ مُحَمَّدٍ ، وَبَارِكْ عَلَىٰ مُحَمَّدٍ وَّعَلَىٰ اٰلِ مُحَمَّدٍ ، كَمَا بَارَكْتَ عَلَىٰ إبْرَاهِيْمَ فِي الْعَالَمِيْنَ ، إِنَّكَ حَمِيْدٌ مَجِيْدٌ.`,
    count: 1,
  }, // Alhamdulillah
  {
    text: `اَللّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ عَبْدِكَ وَرَسُوْلِكَ ، كَمَا صَلَّيْتَ عَلَىٰ اٰلِ إبْراهِيْمَ ، وَبَارِكْ عَلَىٰ مُحَمَّدٍ وَّعَلَىٰ اٰلِ مُحَمَّدٍ ، كَمَا بَارَكْتَ عَلَىٰ إبْرَاهِيْمَ.`,
    count: 1,
  }, // Alhamdulillah
  {
    text: `اَللّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَّعَلَىٰ اٰلِ مُحَمَّدٍ ، كَما صَلَّيْتَ عَلَىٰ اٰلِ إبْراهِيْمَ إنَّكَ حَمِيْدٌ مَّجِيْدٌ ، اَللّٰهُمَّ بَارِكْ عَلَىٰ مُحَمَّدٍ وَّعَلَىٰ اٰلِ مُحَمَّدٍ ، كَمَا بارَكْتَ عَلَىٰ اٰلِ إِبْرَاهِيْمَ ، إِنَّكَ حَمِيْدٌ مَّجِيْدٌ.`,
    count: 1,
  }, // Alhamdulillah
  {
    text: `اَللّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ النَّبِيِّ الأُمِّيِّ وَعَلَىٰ اٰلِ مُحَمَّدٍ ، كَمَا صَلَّيْتَ عَلَىٰ إبْرَاهِيْمَ وَاٰلِ إبْرَاهِيْمَ ، وَبَارِكْ عَلَىٰ مُحَمَّدٍ النَّبِيِّ الأُمِّيِّ ، كَمَا بارَكْتَ عَلَىٰ إبْرَاهِيْمَ وَعَلَىٰ اٰلِ إِبْرَاهِيْمَ ، إِنَّكَ حَمِيْدٌ مَّجِيْدٌ`,
    count: 1,
  }, // Alhamdulillah
  {
    text: `اَللّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَّعَلَىٰ اٰلِ مُحَمَّدٍ.`,
    count: 1,
  }, // Alhamdulillah
];

export default function MorningZikr() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCount, setCurrentCount] = useState(morningZikr[0].count);

  const nextZikr = () => {
    if (currentCount > 1) {
      setCurrentCount(currentCount - 1);
    } else if (currentIndex < morningZikr.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentCount(morningZikr[currentIndex + 1].count);
    }
  };

  const prevZikr = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentCount(morningZikr[currentIndex].count);
    }
  };

  const progress =
    ((morningZikr[currentIndex].count - currentCount + 1) /
      morningZikr[currentIndex].count) *
    100;

  return (
    <div
      className={`${robotoSlab.className} flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 mt-[20px]`}
    >
      <Link
        href="/dua"
        className="inline-flex items-center text-green-600 hover:text-green-700 mb-4"
      >
        <FaArrowLeft className="mr-2" />
        Back to Home.
      </Link>
      <h1 className="text-4xl font-bold mb-8 text-green-400">
        Ruqyah and Illness
      </h1>
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevZikr}
            className="p-4 bg-green-600 rounded-full shadow-lg"
            disabled={
              currentIndex === 0 && currentCount === morningZikr[0].count
            }
          >
            <FaChevronLeft className="text-2xl" />
          </motion.button>
          <div className="w-24 h-24">
            <CircularProgressbar
              value={progress}
              text={`${currentCount}`}
              styles={buildStyles({
                textColor: "#fff",
                pathColor: "#10B981",
                trailColor: "#374151",
              })}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextZikr}
            className="p-4 bg-green-600 rounded-full shadow-lg"
          >
            <FaChevronRight className="text-2xl" />
          </motion.button>
        </div>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="p-8 bg-gray-800 rounded-lg shadow-2xl text-center"
        >
          <p className="text-2xl mb-4" dir="rtl">
            {morningZikr[currentIndex].text}
          </p>
          <p className="text-sm text-gray-400">
            Repeat {currentCount} more {currentCount === 1 ? "time" : "times"}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
