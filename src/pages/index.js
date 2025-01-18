import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaSun,
  FaMoon,
  FaPray,
  FaBook,
  FaLeaf,
  FaQuoteRight,
} from "react-icons/fa";

const menuItems = [
  {
    href: "/morning",
    title: "Morning Zikr",
    subtitle: "የጠዋት ዚክር",
    icon: FaSun,
  },
  { href: "/night", title: "Night Zikr", subtitle: "የማታ ዚክር", icon: FaMoon },
  { href: "/dua", title: "Dua", subtitle: "ዱዓ", icon: FaPray },
  { href: "/quran", title: "Quran", subtitle: "ቁርአንአን", icon: FaBook },
  { href: "/tasbeeh", title: "Tasbeeh", subtitle: "ተስቢህ", icon: FaLeaf },
  { href: "/hadith", title: "Hadith", subtitle: "ሐዲስ", icon: FaQuoteRight }, // New menu item for Hadith
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] text-center">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full px-4">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={item.href} className="block">
              <motion.div
                className="p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="text-4xl mb-4 text-green-600 dark:text-green-400" />
                <h2 className="text-2xl font-semibold">{item.title}</h2>
                {item.subtitle && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {item.subtitle}
                  </p>
                )}
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
