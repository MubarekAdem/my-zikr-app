import Link from "next/link";
import { motion } from "framer-motion";
import { FaSun, FaMoon, FaPray, FaBook, FaLeaf } from "react-icons/fa";
export default function Hadith() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] text-center">
      <motion.h1
        className="text-5xl font-bold mb-10 text-green-600 dark:text-green-400"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Hadith Collection
      </motion.h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full px-4">
        <motion.div
          key="/hadith/sahih-bukhari"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/hadith/bukhari" className="block">
            <motion.div
              className="p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaBook className="text-4xl mb-4 text-green-600 dark:text-green-400" />
              <h2 className="text-2xl font-semibold">Sahih Bukhari</h2>
            </motion.div>
          </Link>
        </motion.div>
        <motion.div
          key="/hadith/sahih-muslim"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/hadith/sahih-muslim" className="block">
            <motion.div
              className="p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaBook className="text-4xl mb-4 text-green-600 dark:text-green-400" />
              <h2 className="text-2xl font-semibold">Sahih Muslim</h2>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
