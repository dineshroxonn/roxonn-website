"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const themes = [
    { name: "light", icon: <Sun className="w-4 h-4" /> },
    { name: "dark", icon: <Moon className="w-4 h-4" /> },
    { name: "system", icon: <Monitor className="w-4 h-4" /> },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="glass-panel p-2 hover-glow"
        aria-label="Toggle theme"
      >
        {theme === "dark" && <Moon className="w-4 h-4" />}
        {theme === "light" && <Sun className="w-4 h-4" />}
        {theme === "system" && <Monitor className="w-4 h-4" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 glass-panel py-2"
          >
            {themes.map(({ name, icon }) => (
              <button
                key={name}
                className={`w-full px-4 py-2 flex items-center space-x-2 hover:bg-white/5 transition-colors ${
                  theme === name ? "text-[#00C2FF]" : ""
                }`}
                onClick={() => {
                  setTheme(name);
                  setIsOpen(false);
                }}
              >
                {icon}
                <span className="capitalize">{name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}