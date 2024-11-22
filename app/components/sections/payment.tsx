"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Wallet, Shield, PieChart, ArrowRight } from 'lucide-react';

const paymentFeatures = [
  {
    title: "Transparent Revenue Share",
    description: "90% of project revenue goes directly to contributors, with complete transparency in distribution.",
    icon: <PieChart className="w-12 h-12" />
  },
  {
    title: "Secure Payments",
    description: "Multiple payment options including UPI and cryptocurrency, with enterprise-grade security.",
    icon: <Shield className="w-12 h-12" />
  },
  {
    title: "Automated Payouts",
    description: "Regular, automated payments based on contribution and project milestones.",
    icon: <Wallet className="w-12 h-12" />
  }
];

export function PaymentSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="payment" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">Payment & Transparency</h2>
          <p className="text-xl text-white/80">
            Fair, secure, and transparent compensation for all contributors
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {paymentFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="glass-card text-center"
            >
              <div className="text-[#00C2FF] mb-6 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass-card max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Revenue Distribution</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Contributors</span>
                  <span className="text-[#00C2FF]">90%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-[#00C2FF] h-full rounded-full" style={{ width: '90%' }} />
                </div>
                <div className="flex items-center justify-between">
                  <span>Platform Maintenance</span>
                  <span className="text-[#00C2FF]">10%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-[#00C2FF] h-full rounded-full" style={{ width: '10%' }} />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6">Payment Methods</h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-5 h-5 text-[#00C2FF]" />
                  <span>Direct Bank Transfer</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-5 h-5 text-[#00C2FF]" />
                  <span>UPI Payments</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-5 h-5 text-[#00C2FF]" />
                  <span>Cryptocurrency</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-5 h-5 text-[#00C2FF]" />
                  <span>International Wire Transfer</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}