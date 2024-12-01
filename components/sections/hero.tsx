"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, PerspectiveCamera } from '@react-three/drei';
import Particles from 'react-particles';
import { loadSlim } from "tsparticles-slim";
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

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

const technicalContent = {
  title: "Decentralizing Innovation",
  subtitle: "Join the Future of Software with Roxonn DSO - Where Global Contributors Shape Tomorrow's Technology",
  features: [
    {
      title: "Community Governed",
      description: "Decisions driven by token holders and contributors"
    },
    {
      title: "Token Rewards",
      description: "Earn tokens for your valuable contributions"
    },
    {
      title: "Global Impact",
      description: "Shape the future of decentralized software"
    }
  ],
  buttons: [
    {
      text: "Learn About Governance",
      href: "#governance",
      primary: true
    },
    {
      text: "Join Our Community",
      href: "https://discord.gg/roxonn",
      primary: false
    }
  ]
};

const simpleContent = {
  title: "Earn Rewards for Your Software Skills",
  subtitle: "Join Roxonn and get paid for helping build software. Share your programming skills, solve problems, and earn rewards for your contributions.",
  features: [
    {
      title: "Simple to Start",
      description: "Sign up with your email and start contributing right away"
    },
    {
      title: "Get Paid in Points",
      description: "Earn reward points for every approved contribution"
    },
    {
      title: "Secure Rewards",
      description: "Your points are safely stored and can be converted to rewards"
    }
  ],
  buttons: [
    {
      text: "Start Earning Now",
      href: "#services",
      primary: true
    },
    {
      text: "Learn How It Works",
      href: "#services",
      primary: false
    }
  ]
};

export function HeroSection() {
  const [showTechnical, setShowTechnical] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowTechnical(prev => !prev);
    }, 10000); // Switch every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const particlesInit = async (engine: any) => {
    await loadSlim(engine);
  };

  const currentContent = showTechnical ? technicalContent : simpleContent;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
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

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-55 h-64 w-64 mx-auto">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Logo3D />
          </Canvas>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={showTechnical ? 'technical' : 'simple'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
              {currentContent.title}
            </h1>

            <p className="text-xl md:text-2xl text-black/80 dark:text-white/80 mb-8">
              {currentContent.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 items-center mb-16">
              {currentContent.buttons.map((button, index) => (
                <Link key={index} href={button.href}>
                  <Button 
                    className={`glass-panel px-8 py-3 hover-glow w-full sm:w-auto flex items-center justify-center gap-2 ${
                      button.primary ? '' : 'variant-outline'
                    }`}
                  >
                    <span>{button.text}</span>
                    {button.primary && <ArrowRight className="w-4 h-4" />}
                  </Button>
                </Link>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {currentContent.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card"
                >
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-black/70 dark:text-white/70">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-0" />
    </div>
  );
}