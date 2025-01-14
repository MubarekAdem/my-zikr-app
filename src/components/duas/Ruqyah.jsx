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
    text: `بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ. اَلْحَمْدُ لِلّٰهِ رَبِّ الْعَالَمِيْنَ ، الرَّحْمٰنِ الرَّحِيْمِ ، مٰلِكِ يَوْمِ الدِّيْنِ ، إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِيْنُ ، اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيْمَ ، صِرَاطَ الَّذِيْنَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوْبِ عَلَيْهِمْ وَلَا الضَّآلِّيْنَ.`,

    count: 1,
  }, // Subhanallah
  // Alhamdulillah
  {
    text: `أَعُوْذُ بِاللّٰهِ مِنَ الشَّيْطَانِ الرَّجِيْمِ. اَللّٰهُ لَآ إِلٰهَ إِلَّا هُوَ الْحَىُّ الْقَيُّوْمُ ، لَا تَأْخُذُهُۥ سِنَةٌ وَّلَا نَوْمٌ ، لَهُ مَا فِى السَّمٰـوٰتِ وَمَا فِى الْأَرْضِ ، مَنْ ذَا الَّذِىْ يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِۦ ، يَعْلَمُ مَا بَيْنَ أَيْدِيْهِمْ وَمَا خَلْفَهُمْ ، وَلَا يُحِيْطُوْنَ بِشَىْءٍ مِّنْ عِلْمِهِٓ إِلَّا بِمَا شَآءَ ، وَسِعَ كُرْسِيُّهُ السَّمٰـوٰتِ وَالْأَرْضَ، وَلَا يَئُوْدُهُۥ حِفْظُهُمَا ، وَهُوَ الْعَلِىُّ الْعَظِيْمُ.`,
    count: 1,
  }, // Alhamdulillah
  {
    text: `ٱللَّهُ لَآ إِلَـٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌۭ وَلَا نَوْمٌۭ ۚ لَّهُۥ مَا فِى ٱلسَّمَـٰوَٰتِ وَمَا فِى ٱلْأَرْضِ ۗ مَن ذَا ٱلَّذِى يَشْفَعُ عِندَهُۥٓ إِلَّا بِإِذْنِهِۦ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَىْءٍۢ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ ۚ وَسِعَ كُرْسِيُّهُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضَ ۖ وَلَا يَـُٔودُهُۥ حِفْظُهُمَا ۚ وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ
`,
    count: 1,
  }, // Alhamdulillah
  {
    text: `أَعُوْذُ بِاللّٰهِ مِنَ الشَّيْطَانِ الرَّجِيْمِ. اٰمَنَ الرَّسُوْلُ بِمَآ أُنْزِلَ إِلَيْهِ مِنْ رَّبِّهِ وَالْمُؤْمِنُوْنَ ، كُلٌّ اٰمَنَ بِاللّٰهِ وَمَلآئِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ ، لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّنْ رُّسُلِهِ ، وَقَالُوْا سَمِعْنَا وَأَطَعْنَا غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيْرُ. لَا يُكَلِّفُ اللّٰهُ نَفْسًا إِلَّا وُسْعَهَا ، لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ، رَبَّنَا لَا تُؤَاخِذْنَآ إِنْ نَّسِينَآ أَوْ أَخْطَأْنَا ، رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَآ إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِيْنَ مِنْ قَبْلِنَا ، رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ، وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ، أَنْتَ مَوْلَانَا فَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِيْنَ.`,
    count: 1,
  }, // Alhamdulillah
  {
    text: `بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ. قُلْ هُوَ اللّٰهُ أَحَدٌ ، اَللّٰهُ الصَّمَدُ ، لَمْ يَلِدْ وَلَمْ يُوْلَدْ ، وَلَمْ يَكُنْ لَّهُ كُفُوًا أَحَدٌ.`,
    count: 3,
  }, // Alhamdulillah
  {
    text: `بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ. قُلْ أَعُوْذُ بِرَبِّ الْفَلَقِ ، مِنْ شَرِّ مَا خَلَقَ ، وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ، وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ، وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ.`,
    count: 3,
  }, // Alhamdulillah
  {
    text: `بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ. قُلْ أَعُوْذُ بِرَبِّ النَّاسِ ، مَلِكِ النَّاسِ ، إِلٰهِ النَّاسِ ، مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ، اَلَّذِيْ يُوَسْوِسُ فِيْ صُدُوْرِ النَّاسِ ، مِنَ الْجِنَّةِ وَالنَّاسِ.`,
    count: 3,
  }, // Alhamdulillah
  {
    text: `حَسْبِيَ اللّٰهُ لَا إِلٰهَ إِلَّا هُوَ ، عَلَيْهِ تَوَكَّلْتُ ، وَهُوَ رَبُّ الْعَرْشِ الْعَظِيْمِ.`,
    count: 7,
  }, // Alhamdulillah
  {
    text: `سورة البقرة`,
    count: 1,
  }, // Alhamdulillah
  {
    text: `أَعُوْذُ بِكَلِمَاتِ اللّٰهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ.`,
    count: 3,
  }, // Alhamdulillah
  {
    text: `أَعُوْذُ بِكَلِمَاتِ اللّٰهِ التَّامَّاتِ الَّتِيْ لَا يُجَاوِزُهُنَّ بَرٌّ وَلَا فَاجِرٌ مِنْ شَرِّ مَا خَلَقَ وَبَرَأَ وَذَرَأَ ، وَمِنْ شَرِّ مَا يَنْزِلُ مِنَ السَّمَاءِ وَمِنْ شَرِّ مَا يَعْرُجُ فِيْهَا ، وَمِنْ شَرِّ مَا ذَرَأَ فِي الْأَرْضِ وَمِنْ شَرِّ مَا يَخْرُجُ مِنْهَا ، وَمِنْ شَرِّ فِتَنِ اللَّيْلِ وَالنَّهَارِ ، وَمِنْ شَرِّ كُلِّ طَارِقٍ إِلَّا طَارِقًا يَطْرُقُ بِخَيْرٍ ، يَا رَحْمٰنُ.`,
    count: 1,
  }, // Alhamdulillah
  {
    text: `أَعُوْذُ بِوَجْهِ اللّٰهِ الْعَظِيْمِ ، الَّذِيْ لَيْسَ شَيْءٌ أَعْظَمَ مِنْهُ وَبِكَلِمَاتِ اللّٰهِ التَّامَّاتِ الَّتِيْ لَا يُجَاوِزُهُنَّ بَرٌّ وَلَا فَاجِرٌ ، وَبِأَسْمَاءِ اللّٰهِ الْحُسْنىٰ كُلِّهَا مَا عَلِمْتُ مِنْهَا وَمَا لَمْ أَعْلَمْ ، مِنْ شَرِّ مَا خَلَقَ وَبَرَأَ وَذَرَأَ.`,
    count: 1,
  }, // Alhamdulillah
  {
    text: `أَعُوْذُ بِكَلِمَاتِ اللّٰهِ التَّامَّاتِ مِنْ غَضَبِهِ وَعِقَابِهِ ، وَشَرِّ عِبَادِهِ ، وَمِنْ هَمَزَاتِ الشَّيَاطِيْنِ وَأَنْ يَّحْضُرُوْنِ.`,
    count: 1,
  }, // Alhamdulillah
  {
    text: `أَعُوْذُ بِوَجْهِ اللّٰهِ الْعَظِيْمِ ، الَّذِيْ لَيْسَ شَيْءٌ أَعْظَمَ مِنْهُ وَبِكَلِمَاتِ اللّٰهِ التَّامَّاتِ الَّتِيْ لَا يُجَاوِزُهُنَّ بَرٌّ وَلَا فَاجِرٌ ، وَبِأَسْمَاءِ اللّٰهِ الْحُسْنىٰ كُلِّهَا مَا عَلِمْتُ مِنْهَا وَمَا لَمْ أَعْلَمْ ، مِنْ شَرِّ مَا خَلَقَ وَبَرَأَ وَذَرَأَ.`,
    count: 1,
  }, // Alhamdulillah
  {
    text: `أَعُوْذُ بِكَلِمَاتِ اللّٰهِ التَّامَّاتِ مِنْ غَضَبِهِ وَعِقَابِهِ ، وَشَرِّ عِبَادِهِ ، وَمِنْ هَمَزَاتِ الشَّيَاطِيْنِ وَأَنْ يَّحْضُرُوْنِ.`,
    count: 1,
  }, // Alhamdulillah
  {
    text: `اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنَ الْبَرَصِ ، وَالْجُنُوْنِ ، وَالْجُذَامِ ، وَمِنْ سَيِّئِ الْأَسْقَامِ.`,
    count: 1,
  }, // Alhamdulillah
  {
    text: `أُعِيْذُكُمَا (أُعِيْذُكَ) بِكَلِمَاتِ اللّٰهِ التَّامَّةِ ، مِنْ كُلِّ شَيْطَانٍ وَّهَامَّةٍ ، وَمِنْ كُلِّ عَيْنٍ لَّامَّةٍّّ`,
    count: 1,
  }, // Alhamdulillah
  {
    text: `رَبُّنَا اللهُ الَّذِيْ فِي السَّمَاءِ تَقَدَّسَ اسْمُكَ ، أَمْرُكَ فِي السَّمَاءِ وَالْأَرْضِ ، كَمَا رَحْمَتُكَ فِي السَّمَاءِ ، فَاجْعَلْ رَحْمَتَكَ فِي الْأَرْضِ ، وَاغْفِرْ لَنَا حُوْبَنَا وَخَطَايَانَا أَنْتَ رَبُّ الطَّيِّبِيْنَ ، فَأَنْزِلْ رَحْمَةً مِنْ رَحْمَتِكَ ، وَشِفَاءً مِنْ شِفَائِكَ عَلَىٰ هٰذَا الْوَجَعِ فَيَبْرَأَ.`,
    count: 1,
  }, // Alhamdulillah
  {
    text: `اَللّٰهُمَّ رَبَّ النَّاسِ ، أَذْهِبِ الْبَأْسَ ، اِشْفِ أَنْتَ الشَّافِيْ ، لَا شِفَاءَ إِلَّا شِفَاؤُكَ ، شِفَاءً لَا يُغَادِرُ سَقَمًا.`,
    count: 1,
  }, // Alhamdulillah
  {
    text: `بِسْمِ اللّٰهِ أَرْقِيْكَ مِنْ كُلِّ شَيْءٍ يُؤْذِيْكَ ، مِنْ شَرِّ كُلِّ نَفْسٍ أَوْ عَيْنِ حَاسِدٍ ، اَللّٰهُ يَشْفِيْكَ ، بِسْمِ اللّٰهِ أَرْقِيْكَ.`,
    count: 1,
  }, // Alhamdulillah
  {
    text: `بِسْمِ اللّٰهِ تُرْبَةُ أَرْضِنَا بِرِيْقَةِ بَعْضِنَا ، يُشْفَىٰ سَقِيْمُنَا بِإِذْنِ رَبِّنَا.`,
    count: 1,
  },
  {
    text: `أَسْأَلُ اللّٰهَ الْعَظِيْمَ ، رَبَّ الْعَرْشِ الْعَظِيْمِ ، أَنْ يَشْفِيَكَ.`,
    count: 7,
  },
  {
    text: `لَا بَأْسَ طَهُوْرٌ ، إِنْ شَاءَ اللّٰهُ.`,
    count: 1,
  },
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
