import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaBed,
  FaPray,
  FaSun,
  FaMoon,
  FaHeart,
  FaShieldAlt,
  FaChild,
  FaHome,
  FaUtensils,
  FaShoppingCart,
  FaPlane,
  FaHands,
  FaKaaba,
  FaMosque,
  FaBook,
} from "react-icons/fa";

const duaCategories = [
  { href: "/dua/before-sleep", title: "Before Sleep Dhikr", icon: FaBed },
  { href: "/dua/salah", title: "Salah Dhikr", icon: FaPray },
  { href: "/dua/after-salah", title: "After Salah Dhikr", icon: FaPray },
  { href: "/dua/ruqyah", title: "Ruqyah & Illness", icon: FaShieldAlt },
  { href: "/praises", title: "Praises Of Allah", icon: FaHeart },
  { href: "/salawat", title: "Salawat", icon: FaMosque },
  { href: "/istighfar", title: "Istighfar", icon: FaHands },
  { href: "/all-time", title: "Dhikr For All Time", icon: FaMoon },
  { href: "/quranic", title: "Quranic Duas", icon: FaBook },
  { href: "/sunnah", title: "Sunnah Duas", icon: FaBook },
  { href: "/waking-up", title: "Waking Up", icon: FaSun },
  { href: "/nightmares", title: "Nightmares", icon: FaShieldAlt },
  { href: "/clothes", title: "Clothes", icon: FaChild },
  { href: "/lavatory", title: "Lavatory & Wudu", icon: FaUtensils },
  { href: "/food-drinks", title: "Food & Drinks", icon: FaUtensils },
  { href: "/home", title: "Home", icon: FaHome },
  { href: "/adhan", title: "Adhan & Masjid", icon: FaMosque },
  { href: "/istikharah", title: "Istikharah", icon: FaPray },
  { href: "/gatherings", title: "Gatherings", icon: FaHands },
  {
    href: "/difficult-situation",
    title: "Difficult Situation",
    icon: FaShieldAlt,
  },
  { href: "/protection-iman", title: "Protection of Iman", icon: FaShieldAlt },
  { href: "/hajj-umrah", title: "Hajj & Umrah", icon: FaKaaba },
  { href: "/travelling", title: "Travelling", icon: FaPlane },
  { href: "/money-shopping", title: "Money & Shopping", icon: FaShoppingCart },
  { href: "/social-interactions", title: "Social Interactions", icon: FaHands },
  { href: "/marriage-children", title: "Marriage & Children", icon: FaChild },
  { href: "/death", title: "Death", icon: FaShieldAlt },
  { href: "/nature", title: "Nature", icon: FaSun },
];

export default function DuaCategory() {
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gray-800 dark:bg-gray-900 text-white p-4 fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-green-400">
            Zikr App
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="flex flex-col items-center justify-center pt-20 min-h-[calc(100vh-64px)] text-center">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full px-4">
          {duaCategories.map((item, index) => (
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
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
