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
    text: `أَسْتَغْفِرُ اللهَ (3) اَللّٰهُمَّ أَنْتَ السَّلَامُ ، وَمِنْكَ السَّلَامُ ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ`,

    count: 1,
  }, // Subhanallah
  // Alhamdulillah
  {
    text: `لَا إِلٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيْكَ لَهُ ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيْرٌ ، اَللّٰهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ ، وَلَا مُعْطِيَ لِمَا مَنَعْتَ ، وَلَا يَنْفَعُ ذَا الْجَـدِّ مِنْكَ الْجَـدُّ
`,
    count: 1,
  }, // Alhamdulillah
  {
    text: `لَا إِلٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيْكَ لَهُ ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيْرٌ ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ ، لَا إِلٰهَ إِلَّا اللهُ ، وَلَا نَعْبُدُ إِلَّا إيَّاهُ ، لَهُ النِّعْمَةُ وَلَهُ الْفَضْلُ وَلَهُ الثَّنَاءُ الْحَسَنُ ، لَا إِلٰهَ إِلَّا اللهُ مُخْلِصِيْنَ لَهُ الدِّيْنَ ، وَلَوْ كَرِهَ الْكَافِرُوْنَ
`,
    count: 1,
  }, // Alhamdulillah
  {
    text: `اَللَّٰهُمَّ أَعِنِّيْ عَلَىٰ ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ`,
    count: 1,
  }, // Alhamdulillah
  {
    text: `اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنَ الْبُخْلِ ، وَأَعُوْذُ بِكَ مِنَ الْجُبْنِ ، وَأَعُوْذُ بِكَ مِنْ أَنْ أُرَدَّ إِلََىٰ أَرْذَلِ الْعُمُرِ ، وَأَعُوْذُ بِكَ مِنْ فِتْنَةِ الدُّنْيَا ، وأَعُوْذُ بِكَ مِنْ عَذَابِ الْقَبْرِ
`,
    count: 1,
  }, // Alhamdulillah
  {
    text: `سُبْحَانَ اللهِ (x33) ، اَلْحَمْدُ للهِ (x33)، اَللهُ أَكْبَرُ (x33)`,
    count: 1,
  }, // Alhamdulillah
  {
    text: `لَا إِلٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيْكَ لَهُ ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيْرٌ`,
    count: 1,
  }, // Alhamdulillah
  {
    text: `اَللهُ لَا إِلٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ، لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ، لَهُ مَا فِي السَّمٰوَاتِ وَمَا فِي الْأَرْضِ ، مَنْ ذَا الَّذِيْ يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ، يَعْلَمُ مَا بَيْنَ أَيْدِيْهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيْطُوْنَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ، وَسِعَ كُرْسِيُّهُ السَّمٰوَاتِ وَالْأَرْضَ وَلَا يَئُوْدُهُُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيْ`,
    count: 1,
  }, // Alhamdulillah
  {
    text: `قُلْ هُوَ اللهُ أَحَدٌ ، اَللهُ الصَّمَدُ ، لَمْ يَلِدْ وَلَمْ يُوْلَدْ ، وَلَمْ يَكُنْ لَّهُ كُفُوًا أَحَدٌ`,
    count: 1,
  }, // Alhamdulillah
  {
    text: `قُلْ أَعُوْذُ بِرَبِّ الْفَلَقِ ، مِنْ شَرِّ مَا خَلَقَ ، وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ، وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ، وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ`,
    count: 1,
  }, // Alhamdulillah
  {
    text: `قُلْ أَعُوْذُ بِرَبِّ النَّاسِ ، مَلِكِ النَّاسِ ، إِلٰهِ النَّاسِ ، مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ، اَلَّذِيْ يُوَسْوِسُ فِيْ صُدُوْرِ النَّاسِ ، مِنَ الْجِنَّةِ وَالنَّاسِ
`,
    count: 1,
  }, // Alhamdulillah
  {
    text: `سُبْحَانَكَ وَبِحَمْدِكَ ، لَا إِلٰه إِلَّا أَنْتَ ، أَسْتَغْفِرُكَ وَأَتُوْبُ إِلَيْكَ`,
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
        Dua After salah
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
