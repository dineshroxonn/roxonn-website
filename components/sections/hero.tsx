'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, PerspectiveCamera } from '@react-three/drei';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CustomButton } from '@/components/ui/custom-button';

function Logo3D() {
  return (
    <Float speed={4} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial
          color="#00C2FF"
          emissive="#7000FF"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
          wireframe={false}
          transparent={true}
          opacity={0.9}
        />
      </mesh>
      <mesh scale={1.1}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial
          color="#7000FF"
          emissive="#00C2FF"
          emissiveIntensity={0.2}
          metalness={0.9}
          roughness={0.1}
          wireframe={true}
          transparent={true}
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
}

const technicalContent = {
  title: 'Decentralizing Innovation',
  subtitle:
    "Join the Future of Software with Roxonn DSO - Where Global Contributors Shape Tomorrow's Technology",
  features: [
    {
      title: 'Community Governed',
      description: 'Decisions driven by token holders and contributors',
    },
    {
      title: 'Token Rewards',
      description: 'Earn tokens for your valuable contributions',
    },
    {
      title: 'Global Impact',
      description: 'Shape the future of decentralized software',
    },
  ],
  buttons: [
    {
      text: 'Learn About Governance',
      href: '#governance',
      primary: true,
    },
    {
      text: 'Join Our Community',
      href: 'https://discord.gg/roxonn',
      primary: false,
    },
  ],
};

const simpleContent = {
  title: 'Earn Rewards for Your Software Skills',
  subtitle:
    'Join Roxonn and get paid for helping build software. Share your programming skills, solve problems, and earn rewards for your contributions.',
  features: [
    {
      title: 'Simple to Start',
      description: 'Sign up with your email and start contributing right away',
    },
    {
      title: 'Get Paid in Points',
      description: 'Earn reward points for every approved contribution',
    },
    {
      title: 'Secure Rewards',
      description: 'Your points are safely stored and can be converted to rewards',
    },
  ],
  buttons: [
    {
      text: 'Start Earning Now',
      href: '#services',
      primary: true,
    },
    {
      text: 'Learn How It Works',
      href: '#services',
      primary: false,
    },
  ],
};

export function HeroSection() {
  const [showTechnical, setShowTechnical] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowTechnical((prev) => !prev);
    }, 10000); // Switch every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const particlesInit = async (engine: any) => {
    await loadSlim(engine);
  };

  const currentContent = showTechnical ? technicalContent : simpleContent;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-zinc-100/50 to-zinc-100 dark:from-zinc-900 dark:via-zinc-900/50 dark:to-black">
      {/* Animated background grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-slate/[0.02] dark:bg-grid-white/[0.05]" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 animate-gradient" />
      </div>

      {/* Particle effect */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: 'transparent',
            },
          },
          fpsLimit: 120,
          particles: {
            color: {
              value: ['#00C2FF', '#7000FF'],
            },
            links: {
              color: '#4F46E5',
              distance: 150,
              enable: true,
              opacity: 0.1,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1,
              direction: 'none',
              random: true,
              straight: false,
              outModes: {
                default: 'bounce',
              },
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
              random: true,
              animation: {
                enable: true,
                speed: 1,
                minimumValue: 0.1,
                sync: false,
              },
            },
            size: {
              value: { min: 1, max: 3 },
              random: true,
              animation: {
                enable: true,
                speed: 2,
                minimumValue: 0.1,
                sync: false,
              },
            },
          },
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* 3D Logo with enhanced lighting */}
        <div className="mb-16 h-72 w-72 mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <pointLight position={[-10, -10, -10]} color="#7000FF" intensity={0.5} />
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
            className="relative"
          >
            {/* Decorative elements */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00C2FF] to-[#7000FF] leading-tight">
              {currentContent.title}
            </h1>

            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              {currentContent.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6 items-center mb-20">
              {currentContent.buttons.map((button, index) => (
                <Link key={index} href={button.href}>
                  <CustomButton
                    variant={button.primary ? 'primary' : 'secondary'}
                    className={`w-full sm:w-auto text-lg px-8 py-3 ${
                      button.primary ? 'shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30' : ''
                    }`}
                  >
                    <span>{button.text}</span>
                    {button.primary && <ArrowRight className="w-5 h-5 ml-2" />}
                  </CustomButton>
                </Link>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {currentContent.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="group backdrop-blur-sm bg-white/40 dark:bg-black/20 border border-zinc-200/50 dark:border-white/10 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <h3 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />
    </div>
  );
}
