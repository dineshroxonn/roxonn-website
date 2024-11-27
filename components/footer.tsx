"use client";

import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  { icon: <Github className="w-5 h-5" />, href: "https://github.com/roxonn" },
  { icon: <Twitter className="w-5 h-5" />, href: "https://twitter.com/roxonn" },
  { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com/company/roxonn" },
  { icon: <Mail className="w-5 h-5" />, href: "mailto:contact@roxonn.com" }
];

export function Footer() {
  return (
    <footer className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 glass-panel p-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold gradient-text mb-4">ROXONN</h3>
            <p className="text-black/70 dark:text-white/70 mb-4">
              Delivering innovative software solutions and exceptional development services to transform your business.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-black dark:text-white">Quick Links</h4>
            <ul className="space-y-2">
              {['Services', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-black dark:text-white">Contact</h4>
            <address className="text-black/70 dark:text-white/70 not-italic">
              <p>123 Tech Avenue</p>
              <p>Innovation District</p>
              <p>contact@roxonn.com</p>
            </address>
          </div>
        </div>

        <div className="mt-8 text-center text-black/50 dark:text-white/50 text-sm">
          <p> {new Date().getFullYear()} Roxonn Software Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}