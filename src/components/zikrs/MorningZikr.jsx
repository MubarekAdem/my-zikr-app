"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Home,
  Sunrise,
} from "lucide-react";
import cn from "@/lib/utils";
// Replace the useTheme hook import and usage with a different approach that works with the existing navbar
// At the top of the file, replace:
// import { useTheme } from "next-themes"
// With:
// import { useEffect } from "react" // Removed duplicate import

// Morning Zikr data
const morningZikr = [
  {
    text: "أَعُوْذُ بِاللّٰهِ مِنَ الشَّيْطَانِ الرَّجِيْمِ. اَللّٰهُ لَآ إِلٰهَ إِلَّا هُوَ الْحَىُّ الْقَيُّوْمُ ، لَا تَأْخُذُهُۥ سِنَةٌ وَّلَا نَوْمٌ ، لَهُ مَا فِى السَّمٰـوٰتِ وَمَا فِى الْأَرْضِ ، مَنْ ذَا الَّذِىْ يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِۦ ، يَعْلَمُ مَا بَيْنَ أَيْدِيْهِمْ وَمَا خَلْفَهُمْ ، وَلَا يُحِيْطُوْنَ بِشَىْءٍ مِّنْ عِلْمِهِٓ إِلَّا بِمَا شَآءَ ، وَسِعَ كُرْسِيُّهُ السَّمٰـوٰتِ وَالْأَرْضَ، وَلَا يَئُوْدُهُۥ حِفْظُهُمَا ، وَهُوَ الْعَلِىُّ الْعَظِيْمُ",
    translation: "Ayatul Kursi - The Verse of the Throne",
    count: 1,
  },
  {
    text: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ. قُلْ هُوَ اللّٰهُ أَحَدٌ ، اَللّٰهُ الصَّمَدُ ، لَمْ يَلِدْ وَلَمْ يُوْلَدْ ، وَلَمْ يَكُنْ لَّهُ كُفُوًا أَحَدٌ.",
    translation: "Surah Al-Ikhlas",
    count: 3,
  },
  {
    text: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ. قُلْ أَعُوْذُ بِرَبِّ الْفَلَقِ ، مِنْ شَرِّ مَا خَلَقَ ، وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ، وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ، وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ.",
    translation: "Surah Al-Falaq",
    count: 3,
  },
  {
    text: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ. قُلْ أَعُوْذُ بِرَبِّ النَّاسِ ، مَلِكِ النَّاسِ ، إِلٰهِ النَّاسِ ، مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ، اَلَّذِيْ يُوَسْوِسُ فِيْ صُدُوْرِ النَّاسِ ، مِنَ الْجِنَّةِ وَالنَّاسِ.",
    translation: "Surah An-Nas",
    count: 3,
  },
  {
    text: " اَللّٰهُمَّ أَنْتَ رَبِّيْ لَا إِلٰهَ إِلَّا أَنْتَ ، خَلَقْتَنِيْ وَأَنَا عَبْدُكَ ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ ، أَعُوْذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ ، أَبُوْءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوْءُ لَكَ بِذَنْبِيْ ، فَاغْفِرْ لِيْ فَإِنَّهُ لَا يَغْفِرُ الذُّنُوْبَ إِلَّا أَنْتَ.",
    translation: "Sayyidul Istighfar - The Master of Seeking Forgiveness",
    count: 4,
  },
  {
    text: "اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ ، وَأَعُوْذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوْذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ ، وَأَعُوْذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ.",
    translation: "Seeking refuge from anxiety and laziness",
    count: 1,
  },
  {
    text: "اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ ، اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِيْ دِيْنِيْ وَدُنْيَايَ وَأَهْلِيْ وَمَالِيْ ، اَللّٰهُمَّ اسْتُرْ عَوْرَاتِيْ وَآمِنْ رَوْعَاتِيْ ، اَللّٰهُمَّ احْفَظْنِيْ مِنْ بَيْنِ يَدَيَّ ، وَمِنْ خَلْفِيْ ، وَعَنْ يَّمِيْنِيْ ، وَعَنْ شِمَالِيْ ، وَمِنْ فَوْقِيْ ، وَأَعُوْذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِيْ.",
    translation: "Seeking well-being in this world and the Hereafter",
    count: 1,
  },
  {
    text: "اَللّٰهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ ، فَاطِرَ السَّمٰوَاتِ وَالْأَرْضِ ، رَبَّ كُلِّ شَيْءٍ وَمَلِيْكَهُ ، أَشْهَدُ أَنْ لَّا إِلٰهَ إِلَّا أَنْتَ ، أَعُوْذُ بِكَ مِنْ شَرِّ نَفْسِيْ ، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ ، وَأَنْ أَقْتَرِفَ عَلَىٰ نَفْسِيْ سُوْءًا ، أَوْ أَجُرَّهُ إِلَىٰ مُسْلِمٍ.",
    translation: "Seeking protection from the evil of oneself and Satan",
    count: 1,
  },
  {
    text: "يَا حَيُّ يَا قَيُّوْمُ ، بِرَحْمَتِكَ أَسْتَغِيْثُ ، أَصْلِحْ لِيْ شَأْنِيْ كُلَّهُ ، وَلَا تَكِلْنِيْ إِلَىٰ نَفْسِيْ طَرْفَةَ عَيْنٍ.",
    translation:
      "O Ever-Living, O Self-Subsisting, by Your mercy I seek assistance",
    count: 1,
  },
  {
    text: "اَللّٰهُمَّ مَا أَصْبَحَ بِيْ مِنْ نِّعْمَةٍ أَوْ بِأَحَدٍ مِّنْ خَلْقِكَ ، فَمِنْكَ وَحْدَكَ لَا شَرِيْكَ لَكَ ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ.",
    translation: "Acknowledging that all blessings are from Allah alone",
    count: 1,
  },
  {
    text: "أَصْبَحْنَا عَلَىٰ فِطْرَةِ الْإِسْلَامِ ، وَعَلَىٰ كَلِمَةِ الْإِخْلَاصِ ، وَعَلَىٰ دِيْنِ نَبِيِّنَا مُحَمَّدٍ ، وَعَلَىٰ مِلَّةِ أَبِيْنَا إِبْرَاهِيْمَ حَنِيْفًا مُّسْلِمًا وَّمَا كَانَ مِنَ الْمُشْرِكِيْنَ.",
    translation: "We have reached the morning upon the natural way of Islam",
    count: 1,
  },
  {
    text: "أَمْسَيْتُ أُثْنِيْ عَلَيْكَ حَمْدًا ، وَأَشْهَدُ أَنْ لَّا إِلٰهَ إِلَّا اللّٰهُ.",
    translation: "I have reached the evening praising You",
    count: 4,
  },
  {
    text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلهِ وَالْحَمْدُ لِلهِ ، لَا إِلٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيْكَ لَهُ ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيْرٌ ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِيْ هٰذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا ، وَأَعُوْذُ بِكَ مِنْ شَرِّ مَا فِيْ هٰذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا ، رَبِّ أَعُوْذُ بِكَ مِنَ الْكَسَلِ وَسُوْءِ الْكِبَرِ ، رَبِّ أَعُوْذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ.",
    translation:
      "We have reached the evening and the dominion belongs to Allah",
    count: 3,
  },
  {
    text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ للهِ رَبِّ الْعَالَمِيْنَ ، اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ خَيْرَ هـٰذِهِ اللَّيْلَةِ ، فَتْحَهَا وَنَصْرَهَا وَنُوْرَهـَا وَبَرَكَتَهَا وَهُدَاهـَا وَأَعُوْذُ بِكَ مِنْ شَرِّ مَا فِيْهَا وَشَرِّ مَا بَعْدَهَا",
    translation:
      "We have reached the evening and the dominion belongs to Allah, Lord of the worlds",
    count: 1,
  },
  {
    text: "اَللّٰهُمَّ إِنِّيْ أَصْبَحْتُ أُشْهِدُكَ ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ وَمَلَائِكَتَكَ وَجَمِيْعَ خَلْقِكَ ، أَنَّكَ أَنْتَ اللّٰهُ لَا إِلٰهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيْكَ لَكَ ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُوْلُكَ.",
    translation: "I have reached the morning and call upon You to witness",
    count: 1,
  },
  {
    text: "اَللّٰهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوْتُ وَإِلَيْكَ النُّشُوْرُ.",
    translation:
      "O Allah, by You we enter the morning and by You we enter the evening",
    count: 1,
  },
  {
    text: "اَللّٰهُمَّ عَافِنِيْ فِيْ بَدَنِيْ ، اَللّٰهُمَّ عَافِنِيْ فِيْ سَمْعِيْ ، اَللّٰهُمَّ عَافِنِيْ فِيْ بَصَرِيْ ، لَا إِلٰهَ إِلَّا أَنْتَ ، اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، وأَعُوْذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلٰهَ إِلَّا أَنْتَ.",
    translation: "O Allah, grant me health in my body",
    count: 3,
  },
  {
    text: "حَسْبِيَ اللّٰهُ لَا إِلٰهَ إِلَّا هُوَ ، عَلَيْهِ تَوَكَّلْتُ ، وَهُوَ رَبُّ الْعَرْشِ الْعَظِيْمِ.",
    translation: "Allah is sufficient for me, there is no deity except Him",
    count: 7,
  },
  {
    text: "رَضِيْتُ بِاللّٰهِ رَبًّا ، وَبِالْإِسْلَامِ دِيْنًا ، وَبِمُحَمَّدٍ نَّبِيًّا.",
    translation:
      "I am pleased with Allah as my Lord, with Islam as my religion",
    count: 3,
  },
  {
    text: "بِسْمِ اللّٰهِ الَّذِيْ لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ ، وَهُوَ السَّمِيْعُ الْعَلِيْمُ.",
    translation: "In the name of Allah, with whose name nothing can harm",
    count: 3,
  },
  {
    text: "سُبْحَانَ اللّٰهِ وَبِحَمْدِهِ.",
    translation: "Glory be to Allah and praise Him",
    count: 100,
  },
  {
    text: "لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيْرٌ.",
    translation: "There is no deity except Allah alone, with no partner",
    count: 100,
  },
  {
    text: "سُبْحَانَ اللّٰهِ ، اَلْحَمْدُ لِلّٰهِ ، اَللّٰهُ أَكْبَرُ.",
    translation: "Glory be to Allah, praise be to Allah, Allah is the Greatest",
    count: 100,
  },
  {
    text: "اَللّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَّعَلَىٰ اٰلِ مُحَمَّدٍ ، كَمَا صَلَّيْتَ عَلَىٰ إِبْرَاهِيْمَ وَعَلَىٰ اٰلِ إِبْرَاهِيْمَ ، إِنَّكَ حَمِيْدٌ مَّجِيْدٌ ، اَللّٰهُمَّ بَارِكْ عَلَىٰ مُحَمَّدٍ وَّعَلَىٰ اٰلِ مُحَمَّدٍ ، كَمَا بَارَكْتَ عَلَىٰ إِبْرَاهِيْمَ وَعَلَىٰ اٰلِ إِبْرَاهِيْمَ ، إِنَّكَ حَمِيْدٌ مَّجِيْدٌ.",
    translation:
      "O Allah, send prayers upon Muhammad and the family of Muhammad",
    count: 10,
  },
];

export default function MorningZikr() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCount, setCurrentCount] = useState(morningZikr[0].count);
  const [showTranslation, setShowTranslation] = useState(false);
  const [totalProgress, setTotalProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  // Then replace the theme-related code:
  // const [mounted, setMounted] = useState(false)
  // const { theme } = useTheme()

  // Handle mounting to avoid hydration mismatch
  // useEffect(() => {
  //   setMounted(true)
  // }, [])
  // With this code that detects theme changes from the document:
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Handle mounting and theme detection
  useEffect(() => {
    setMounted(true);

    // Initial theme detection
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);

    // Create a mutation observer to watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isDark = document.documentElement.classList.contains("dark");
          setIsDarkMode(isDark);
        }
      });
    });

    // Start observing the document element for class changes
    observer.observe(document.documentElement, { attributes: true });

    // Cleanup observer on unmount
    return () => observer.disconnect();
  }, []);

  // Calculate total progress
  useEffect(() => {
    const totalZikrs = morningZikr.reduce((acc, zikr) => acc + zikr.count, 0);
    let completedZikrs = 0;

    // Count completed zikrs
    for (let i = 0; i < currentIndex; i++) {
      completedZikrs += morningZikr[i].count;
    }

    // Add current progress
    completedZikrs += morningZikr[currentIndex].count - currentCount;

    const progress = (completedZikrs / totalZikrs) * 100;
    setTotalProgress(progress);

    // Check if all zikrs are completed
    if (currentIndex === morningZikr.length - 1 && currentCount === 0) {
      setIsCompleted(true);
    }
  }, [currentIndex, currentCount]);

  const nextZikr = () => {
    if (currentCount > 1) {
      setCurrentCount(currentCount - 1);
    } else if (currentIndex < morningZikr.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentCount(morningZikr[currentIndex + 1].count);
    } else if (currentIndex === morningZikr.length - 1 && currentCount === 1) {
      // Complete the last zikr
      setCurrentCount(0);
    }
  };

  const prevZikr = () => {
    if (currentCount < morningZikr[currentIndex].count) {
      setCurrentCount(currentCount + 1);
    } else if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentCount(1);
    }
  };

  const progress =
    ((morningZikr[currentIndex].count - currentCount) /
      morningZikr[currentIndex].count) *
    100;

  const remainingCount =
    morningZikr[currentIndex].count > 1
      ? `${currentCount} ${currentCount === 1 ? "time" : "times"} remaining`
      : "";

  // If not mounted yet, return null to avoid hydration mismatch
  if (!mounted) return null;

  // Determine if we're in dark mode
  // Then replace:
  // const isDarkMode = theme === 'dark'
  // With:
  // (No need to replace this line as we're now directly setting isDarkMode in the useEffect)

  return (
    <div
      className={cn(
        "min-h-screen pt-16",
        isDarkMode
          ? "bg-gradient-to-b from-emerald-900 to-gray-900 text-white"
          : "bg-gradient-to-b from-emerald-50 to-white text-gray-800"
      )}
    >
      {/* Header with navigation */}
      <header
        className={cn(
          "border-b",
          isDarkMode
            ? "bg-emerald-900/70 border-emerald-800"
            : "bg-emerald-100/70 border-emerald-200"
        )}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className={cn(
              "inline-flex items-center transition-colors",
              isDarkMode
                ? "text-emerald-300 hover:text-emerald-200"
                : "text-emerald-700 hover:text-emerald-800"
            )}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span className="font-medium">Back</span>
          </Link>

          <div className="flex items-center gap-2">
            <Sunrise
              className={
                isDarkMode ? "h-5 w-5 text-amber-300" : "h-5 w-5 text-amber-500"
              }
            />
            <h1
              className={cn(
                "text-xl font-bold",
                isDarkMode ? "text-white" : "text-gray-800"
              )}
            >
              Morning Zikr
            </h1>
          </div>

          <div
            className={cn(
              "w-20 text-xs",
              isDarkMode ? "text-emerald-300" : "text-emerald-700"
            )}
          >
            {Math.round(totalProgress)}% Complete
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 flex flex-col items-center">
        {/* Progress bar */}
        <div
          className={cn(
            "w-full max-w-3xl mb-6 rounded-full h-2.5 overflow-hidden",
            isDarkMode ? "bg-gray-700/30" : "bg-gray-200"
          )}
        >
          <div
            className="bg-gradient-to-r from-emerald-500 to-emerald-300 h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${totalProgress}%` }}
          />
        </div>

        {/* Main content */}
        <div className="w-full max-w-3xl">
          {isCompleted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn(
                "p-8 rounded-2xl backdrop-blur-md shadow-xl text-center",
                isDarkMode
                  ? "bg-gradient-to-br from-emerald-700/70 to-emerald-900/70"
                  : "bg-gradient-to-br from-emerald-100/70 to-emerald-200/70"
              )}
            >
              <div
                className={cn(
                  "mb-6 mx-auto w-20 h-20 rounded-full flex items-center justify-center",
                  isDarkMode ? "bg-emerald-200/20" : "bg-emerald-500/20"
                )}
              >
                <Sunrise
                  className={
                    isDarkMode
                      ? "h-10 w-10 text-emerald-200"
                      : "h-10 w-10 text-emerald-600"
                  }
                />
              </div>
              <h2
                className={cn(
                  "text-2xl font-bold mb-4",
                  isDarkMode ? "text-emerald-200" : "text-emerald-700"
                )}
              >
                Completed!
              </h2>
              <p
                className={cn(
                  "mb-6",
                  isDarkMode ? "text-emerald-100" : "text-emerald-800"
                )}
              >
                You have completed all your morning zikr. May Allah accept your
                worship.
              </p>
              <Link
                href="/"
                className={cn(
                  "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors",
                  isDarkMode
                    ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                )}
              >
                <Home className="mr-2 h-5 w-5" />
                Return Home
              </Link>
            </motion.div>
          ) : (
            <>
              {/* Counter and navigation */}
              <div className="flex justify-between items-center mb-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevZikr}
                  className={cn(
                    "p-4 rounded-full shadow-lg transition-colors",
                    isDarkMode
                      ? "bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600"
                      : "bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    isDarkMode
                      ? "disabled:from-gray-600 disabled:to-gray-700"
                      : "disabled:from-gray-300 disabled:to-gray-400"
                  )}
                  disabled={
                    currentIndex === 0 && currentCount === morningZikr[0].count
                  }
                >
                  <ChevronLeft className="h-6 w-6" />
                </motion.button>

                <div className="relative w-24 h-24">
                  <CircularProgressbar
                    value={progress}
                    text={`${currentCount}`}
                    styles={buildStyles({
                      textSize: "2rem",
                      textColor: isDarkMode ? "#fff" : "#065f46",
                      pathColor: "#10B981",
                      trailColor: isDarkMode
                        ? "rgba(255, 255, 255, 0.2)"
                        : "rgba(16, 185, 129, 0.2)",
                    })}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className={cn(
                        "w-20 h-20 rounded-full border-2",
                        isDarkMode
                          ? "border-emerald-500/20"
                          : "border-emerald-500/30"
                      )}
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextZikr}
                  className={cn(
                    "p-4 rounded-full shadow-lg",
                    isDarkMode
                      ? "bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600"
                      : "bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500"
                  )}
                >
                  <ChevronRight className="h-6 w-6" />
                </motion.button>
              </div>

              {/* Zikr card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentIndex}-${currentCount}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative overflow-hidden rounded-2xl shadow-2xl"
                >
                  <div
                    className={cn(
                      "absolute inset-0 backdrop-blur-md",
                      isDarkMode
                        ? "bg-gradient-to-br from-emerald-700/70 to-emerald-900/70"
                        : "bg-gradient-to-br from-emerald-100/70 to-emerald-200/70"
                    )}
                  />
                  <div className="relative p-6 md:p-8">
                    {/* Zikr number indicator */}
                    <div
                      className={cn(
                        "absolute top-4 right-4 text-xs font-medium px-2.5 py-1 rounded-full",
                        isDarkMode
                          ? "bg-emerald-800/50 text-emerald-200"
                          : "bg-emerald-200/50 text-emerald-800"
                      )}
                    >
                      {currentIndex + 1} / {morningZikr.length}
                    </div>

                    {/* Arabic text */}
                    <div
                      className={cn(
                        "p-6 mb-4 rounded-xl border",
                        isDarkMode
                          ? "bg-emerald-800/30 border-emerald-700/30"
                          : "bg-emerald-50/50 border-emerald-200/50"
                      )}
                      dir="rtl"
                    >
                      <p
                        className={cn(
                          "text-xl md:text-2xl leading-relaxed font-arabic",
                          isDarkMode ? "text-white" : "text-gray-800"
                        )}
                      >
                        {morningZikr[currentIndex].text}
                      </p>
                    </div>

                    {/* Translation toggle */}
                    <button
                      onClick={() => setShowTranslation(!showTranslation)}
                      className={cn(
                        "mb-4 text-sm underline underline-offset-2",
                        isDarkMode
                          ? "text-emerald-300 hover:text-emerald-200"
                          : "text-emerald-700 hover:text-emerald-800"
                      )}
                    >
                      {showTranslation
                        ? "Hide translation"
                        : "Show translation"}
                    </button>

                    {/* Translation */}
                    {showTranslation && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className={cn(
                          "mb-4 p-4 rounded-lg text-sm",
                          isDarkMode
                            ? "bg-emerald-800/20 text-emerald-100"
                            : "bg-emerald-100/50 text-emerald-900"
                        )}
                      >
                        {morningZikr[currentIndex].translation}
                      </motion.div>
                    )}

                    {/* Counter info */}
                    <div
                      className={cn(
                        "flex items-center justify-between text-sm",
                        isDarkMode ? "text-emerald-200" : "text-emerald-700"
                      )}
                    >
                      <div>{remainingCount}</div>
                      <div>
                        {morningZikr[currentIndex].count > 1 && (
                          <span>Total: {morningZikr[currentIndex].count}x</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
