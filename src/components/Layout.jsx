import Navbar from "./Navbar";
import { Roboto_Slab } from "next/font/google";
import { useState, useEffect } from "react";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

export default function Layout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  return (
    <div
      className={`${robotoSlab.className} min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white`}
    >
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
