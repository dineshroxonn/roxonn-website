"use client";

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, PerspectiveCamera } from '@react-three/drei';
import Particles from 'react-particles';
import { loadSlim } from "tsparticles-slim";

function Logo3D() {
  return (
    <Float
      speed={4}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <mesh>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial
          color="#00C2FF"
          emissive="#7000FF"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const particlesInit = async (engine: any) => {
    await loadSlim(engine);
  };

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          particles: {
            color: {
              value: "#00C2FF",
            },
            links: {
              color: "#00C2FF",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.2,
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
        }}
      />

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 text-center px-4"
      >
        <div className="mb-8 h-64 w-64 mx-auto">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Logo3D />
          </Canvas>
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 gradient-text"
        >
          ROXONN
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-white/80 mb-8"
        >
          Crafting Innovative Software Solutions
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center gap-4"
        >
          <button className="glass-panel px-8 py-3 hover-glow">
            Our Services
          </button>
          <button className="glass-panel px-8 py-3 hover-glow">
            Get Started
          </button>
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-0" />
    </div>
  );
}