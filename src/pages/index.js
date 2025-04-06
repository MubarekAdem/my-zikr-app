"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sunrise,
  Sunset,
  HandIcon as PrayingHands,
  BookOpen,
  Leaf,
  Quote,
} from "lucide-react";
import cn from "@/lib/utils";

const menuItems = [
  {
    href: "/morning",
    title: "Morning Zikr",
    subtitle: "የጠዋት ዚክር",
    icon: Sunrise,
    color:
      "from-amber-100 to-amber-50 dark:from-amber-950/40 dark:to-amber-900/20",
    iconColor: "text-amber-500 dark:text-amber-400",
    borderColor: "border-amber-200 dark:border-amber-800/30",
  },
  {
    href: "/night",
    title: "Night Zikr",
    subtitle: "የማታ ዚክር",
    icon: Sunset,
    color:
      "from-indigo-100 to-indigo-50 dark:from-indigo-950/40 dark:to-indigo-900/20",
    iconColor: "text-indigo-500 dark:text-indigo-400",
    borderColor: "border-indigo-200 dark:border-indigo-800/30",
  },
  {
    href: "/dua",
    title: "Dua",
    subtitle: "ዱዓ",
    icon: PrayingHands,
    color:
      "from-emerald-100 to-emerald-50 dark:from-emerald-950/40 dark:to-emerald-900/20",
    iconColor: "text-emerald-500 dark:text-emerald-400",
    borderColor: "border-emerald-200 dark:border-emerald-800/30",
  },
  {
    href: "/quran",
    title: "Quran",
    subtitle: "ቁርአንአን",
    icon: BookOpen,
    color: "from-teal-100 to-teal-50 dark:from-teal-950/40 dark:to-teal-900/20",
    iconColor: "text-teal-500 dark:text-teal-400",
    borderColor: "border-teal-200 dark:border-teal-800/30",
  },
  {
    href: "/tasbeeh",
    title: "Tasbeeh",
    subtitle: "ተስቢህ",
    icon: Leaf,
    color:
      "from-green-100 to-green-50 dark:from-green-950/40 dark:to-green-900/20",
    iconColor: "text-green-500 dark:text-green-400",
    borderColor: "border-green-200 dark:border-green-800/30",
  },
  {
    href: "/hadith/bukhari",
    title: "Hadith",
    subtitle: "ሐዲስ",
    icon: Quote,
    color: "from-cyan-100 to-cyan-50 dark:from-cyan-950/40 dark:to-cyan-900/20",
    iconColor: "text-cyan-500 dark:text-cyan-400",
    borderColor: "border-cyan-200 dark:border-cyan-800/30",
  },
];

export default function IslamicMenu() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] py-12 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center bg-fixed">
      <div className="max-w-6xl w-full px-4 mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          <span className="inline-block border-b-2 border-emerald-500 pb-2">
            Islamic Guidance
          </span>
        </h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={item.href} className="block h-full">
                <motion.div
                  className={cn(
                    "h-full p-6 rounded-xl border backdrop-blur-sm bg-gradient-to-br shadow-md",
                    "transition-all duration-300 flex flex-col items-center justify-center",
                    "hover:shadow-lg hover:translate-y-[-4px]",
                    item.color,
                    item.borderColor
                  )}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center mb-4",
                      "bg-white/80 dark:bg-gray-800/80 shadow-inner",
                      "border border-opacity-20",
                      item.borderColor
                    )}
                  >
                    <item.icon
                      className={cn("w-8 h-8", item.iconColor)}
                      strokeWidth={1.5}
                    />
                  </div>

                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 text-center">
                    {item.title}
                  </h2>

                  {item.subtitle && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 font-medium opacity-80">
                      {item.subtitle}
                    </p>
                  )}

                  <div className="mt-4 w-12 h-1 rounded-full bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent opacity-60"></div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
