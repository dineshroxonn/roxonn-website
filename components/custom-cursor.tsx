'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div className="hidden md:block">
      {/* Main dot */}
      <motion.div
        className="cursor-dot"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          mass: 0.3,
          stiffness: 1000,
          damping: 20,
        }}
      />

      {/* Trailing circle */}
      <motion.div
        className={`cursor-ring ${isHovering ? 'hovering' : ''}`}
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          mass: 0.5,
          stiffness: 200,
          damping: 15,
        }}
      />

      {/* Glow effect */}
      <motion.div
        className="cursor-glow"
        animate={{
          x: mousePosition.x - 75,
          y: mousePosition.y - 75,
          scale: isHovering ? 1.2 : 1,
          opacity: isHovering ? 0.15 : 0.1,
        }}
        transition={{
          type: 'spring',
          mass: 0.7,
          stiffness: 150,
          damping: 15,
        }}
      />
    </div>
  );
}
