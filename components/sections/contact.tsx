'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Message Sent!',
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">Get in Touch</h2>
          <p className="text-xl text-black/80 dark:text-white/80">
            Let&apos;s discuss your software project
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="glass-card flex items-center space-x-4">
              <Mail className="w-6 h-6 text-[#00C2FF]" />
              <div>
                <h3 className="font-semibold">Email Us</h3>
                <p className="text-black/70 dark:text-white/70">contact@roxonn.com</p>
              </div>
            </div>

            <div className="glass-card flex items-center space-x-4">
              <MessageSquare className="w-6 h-6 text-[#00C2FF]" />
              <div>
                <h3 className="font-semibold">Live Chat</h3>
                <p className="text-black/70 dark:text-white/70">Available 24/7</p>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
            className="glass-card space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-black/5 dark:bg-white/10 rounded-lg focus:ring-2 focus:ring-[#00C2FF] transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-black/5 dark:bg-white/10 rounded-lg focus:ring-2 focus:ring-[#00C2FF] transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 bg-black/5 dark:bg-white/10 rounded-lg focus:ring-2 focus:ring-[#00C2FF] transition-all"
                required
              />
            </div>

            <p className="mt-4 text-lg text-muted-foreground">
              We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as
              possible.
            </p>

            <button
              type="submit"
              className="w-full glass-panel py-3 flex items-center justify-center space-x-2 hover-glow"
            >
              <span>Send Message</span>
              <Send className="w-4 h-4" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
