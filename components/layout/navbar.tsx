'use client';

import Link from "next/link";
import React, { useState, useEffect } from "react";
import UserButton from "../auth/user-btn";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background">
      <div className="flex h-14 items-center justify-between px-4">
        <nav className="flex items-center space-x-4">
          <Link href="/" className="font-bold text-lg md:text-lg">
            career<span className="text-primary">bridge</span>
          </Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/interests">interests</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-primary hover:text-white transition-all duration-200"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <FaSun className="w-5 h-5" />
            ) : (
              <FaMoon className="w-5 h-5" />
            )}
          </button>
        <UserButton />
      </div>
    </div>
  </header>
  );
}
