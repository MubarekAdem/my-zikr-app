"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Navbar from "@/components/navbar";

export default function NavbarWrapper() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDarkMode = theme === "dark";

  const toggleDarkMode = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />;
}
