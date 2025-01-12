import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaSun, FaMoon, FaHome, FaInfoCircle } from "react-icons/fa";

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <nav className="bg-gray-800 dark:bg-gray-900 text-white p-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-green-400">
          Zikr App
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="hover:text-green-400 transition-colors duration-300"
          >
            <FaHome className="inline mr-1" /> Home
          </Link>
          <Link
            href="/about"
            className="hover:text-green-400 transition-colors duration-300"
          >
            <FaInfoCircle className="inline mr-1" /> About
          </Link>
          <motion.button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-700 dark:bg-gray-800 hover:bg-gray-600 dark:hover:bg-gray-700 transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isDarkMode ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-gray-300" />
            )}
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
