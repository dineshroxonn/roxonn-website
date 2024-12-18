'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export function GDPR() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('gdpr-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptConsent = () => {
    localStorage.setItem('gdpr-consent', 'accepted');
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-sm z-50 p-4 shadow-lg"
          role="alert"
          aria-label="Cookie Consent Banner"
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm text-gray-300 mb-4">
                By clicking &ldquo;Accept&rdquo;, you agree to our use of cookies and similar
                technologies.
              </p>
              <p className="text-white text-sm">
                We use cookies to enhance your browsing experience and analyze our traffic.
                <a
                  href="/privacy-policy"
                  className="text-purple-400 hover:text-purple-300 ml-2 underline"
                  aria-label="View Privacy Policy"
                >
                  Learn more
                </a>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={acceptConsent}
                className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                aria-label="Accept Cookies"
              >
                Accept
              </button>
              <button
                onClick={() => setShowBanner(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close Cookie Banner"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default GDPR;
