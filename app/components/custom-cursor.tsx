"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <motion.div
      className="custom-cursor bg-white rounded-full hidden md:block"
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
        scale: 1,
        opacity: 0.5,
      }}
      transition={{
        type: "spring",
        mass: 0.2,
        stiffness: 100,
        damping: 10,
      }}
    />
  );
}