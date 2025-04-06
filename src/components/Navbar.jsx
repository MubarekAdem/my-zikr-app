"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Home, Info, Sun, Moon, Menu, X } from "lucide-react";
import cn from "@/lib/utils";

export default function Navbar({ isDarkMode, toggleDarkMode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled
            ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md"
            : "bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="h-16 flex justify-between items-center">
            {/* Logo */}
            <Link
              href="/"
              className="text-xl md:text-2xl font-bold text-emerald-600 dark:text-emerald-400 flex items-center"
            >
              <span className="inline-block w-8 h-8 mr-2 rounded-full bg-emerald-600 dark:bg-emerald-700 text-white flex items-center justify-center">
                <span className="text-sm font-arabic">ذ</span>
              </span>
              My-Zikr App
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <NavLink href="/" isActive={pathname === "/"}>
                <Home className="w-4 h-4 mr-1" /> Home
              </NavLink>

              <NavLink href="/about" isActive={pathname === "/about"}>
                <Info className="w-4 h-4 mr-1" /> About
              </NavLink>

              <motion.button
                onClick={toggleDarkMode}
                className={cn(
                  "p-2 ml-2 rounded-full transition-colors duration-300",
                  "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={
                  isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-amber-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-2">
              <motion.button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={
                  isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-amber-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </motion.button>

              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatedMobileMenu isOpen={isMobileMenuOpen} pathname={pathname} />

      {/* Spacer to prevent content from being hidden under the navbar */}
      <div className="h-16"></div>
    </>
  );
}

// NavLink component for consistent styling
function NavLink({ href, children, isActive }) {
  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center",
        isActive
          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      )}
    >
      {children}
    </Link>
  );
}

// Animated Mobile Menu
function AnimatedMobileMenu({ isOpen, pathname }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: isOpen ? 1 : 0,
        height: isOpen ? "auto" : 0,
      }}
      transition={{ duration: 0.2 }}
      className="md:hidden fixed top-16 left-0 right-0 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg overflow-hidden"
    >
      <div className="container mx-auto px-4 py-3 flex flex-col space-y-1">
        <MobileNavLink href="/" isActive={pathname === "/"}>
          <Home className="w-4 h-4 mr-2" /> Home
        </MobileNavLink>

        <MobileNavLink href="/about" isActive={pathname === "/about"}>
          <Info className="w-4 h-4 mr-2" /> About
        </MobileNavLink>
      </div>
    </motion.div>
  );
}

// Mobile NavLink component
function MobileNavLink({ href, children, isActive }) {
  return (
    <Link
      href={href}
      className={cn(
        "px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 flex items-center",
        isActive
          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      )}
    >
      {children}
    </Link>
  );
}
