'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MessageSquare, Send, GitBranch, Shield, Rocket } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const contactCategories = [
  {
    title: 'Submit Project',
    description: 'Have a project idea? Lets build together',
    icon: <Rocket className="w-6 h-6 text-[#00C2FF]" />,
    type: 'project',
  },
  {
    title: 'Technical Collaboration',
    description: 'Join our global network of developers',
    icon: <GitBranch className="w-6 h-6 text-[#00C2FF]" />,
    type: 'technical',
  },
  {
    title: 'General Inquiry',
    description: 'Questions about Roxonn',
    icon: <MessageSquare className="w-6 h-6 text-[#00C2FF]" />,
    type: 'general',
  },
];

const projectTypes = [
  'Web3 Development',
  'DeFi Solution',
  'Decentralized Application',
  'Smart Contracts',
  'Other',
];

const developmentStages = [
  'Idea Phase',
  'Initial Planning',
  'Technical Specification',
  'In Development',
  'Ready for Enhancement',
];

export function ContactSection() {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    githubUsername: '',
    projectType: '',
    developmentStage: '',
    budget: '',
    timeline: '',
    projectTitle: '',
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Submission Received!',
      description:
        selectedCategory === 'project'
          ? `We will review your project and get back to you with next steps.`
          : `We will get back to you soon.`,
    });
    setFormData({
      name: '',
      email: '',
      message: '',
      githubUsername: '',
      projectType: '',
      developmentStage: '',
      budget: '',
      timeline: '',
      projectTitle: '',
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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
          <h2 className="text-4xl font-bold mb-4 gradient-text">Let&apos;s Build Together</h2>
          <p className="text-xl text-black/80 dark:text-white/80">
            Whether you have a project idea or want to contribute, we&apos;re here to help
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {contactCategories.map((category) => (
            <motion.div
              key={category.type}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              onClick={() => setSelectedCategory(category.type)}
              className={`glass-card cursor-pointer transition-all ${
                selectedCategory === category.type
                  ? 'ring-2 ring-[#00C2FF] scale-105'
                  : 'hover:scale-105'
              }`}
            >
              <div className="flex items-center space-x-4 p-6">
                {category.icon}
                <div>
                  <h3 className="font-semibold">{category.title}</h3>
                  <p className="text-black/70 dark:text-white/70">{category.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          onSubmit={handleSubmit}
          className="glass-card max-w-2xl mx-auto space-y-6 p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>

          {selectedCategory === 'project' && (
            <>
              <div>
                <label htmlFor="projectTitle" className="block text-sm font-medium mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  id="projectTitle"
                  name="projectTitle"
                  value={formData.projectTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-black/5 dark:bg-white/10 rounded-lg focus:ring-2 focus:ring-[#00C2FF] transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium mb-2">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-black/5 dark:bg-white/10 rounded-lg focus:ring-2 focus:ring-[#00C2FF] transition-all"
                    required
                  >
                    <option value="">Select Type</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="developmentStage" className="block text-sm font-medium mb-2">
                    Development Stage
                  </label>
                  <select
                    id="developmentStage"
                    name="developmentStage"
                    value={formData.developmentStage}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-black/5 dark:bg-white/10 rounded-lg focus:ring-2 focus:ring-[#00C2FF] transition-all"
                    required
                  >
                    <option value="">Select Stage</option>
                    {developmentStages.map((stage) => (
                      <option key={stage} value={stage}>
                        {stage}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium mb-2">
                    Estimated Budget (Optional)
                  </label>
                  <input
                    type="text"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="e.g., $5,000 - $10,000"
                    className="w-full px-4 py-2 bg-black/5 dark:bg-white/10 rounded-lg focus:ring-2 focus:ring-[#00C2FF] transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium mb-2">
                    Expected Timeline (Optional)
                  </label>
                  <input
                    type="text"
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    placeholder="e.g., 3-6 months"
                    className="w-full px-4 py-2 bg-black/5 dark:bg-white/10 rounded-lg focus:ring-2 focus:ring-[#00C2FF] transition-all"
                  />
                </div>
              </div>
            </>
          )}

          {selectedCategory === 'technical' && (
            <div>
              <label htmlFor="githubUsername" className="block text-sm font-medium mb-2">
                GitHub Username
              </label>
              <input
                type="text"
                id="githubUsername"
                name="githubUsername"
                value={formData.githubUsername}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-black/5 dark:bg-white/10 rounded-lg focus:ring-2 focus:ring-[#00C2FF] transition-all"
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              {selectedCategory === 'project' ? 'Project Description' : 'Message'}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 bg-black/5 dark:bg-white/10 rounded-lg focus:ring-2 focus:ring-[#00C2FF] transition-all"
              required
              placeholder={
                selectedCategory === 'project'
                  ? 'Describe your project idea, goals, and any specific requirements...'
                  : 'Your message...'
              }
            />
          </div>

          <div className="bg-black/5 dark:bg-white/5 rounded-lg p-4">
            <p className="text-sm text-black/70 dark:text-white/70">
              {selectedCategory === 'project' &&
                "Share your vision and we'll help bring it to life through our development platform."}
              {selectedCategory === 'technical' &&
                "Share your technical expertise and how you'd like to contribute to our projects."}
              {selectedCategory === 'general' &&
                "We'd love to hear from you. Send us your questions or feedback."}
            </p>
          </div>

          <button
            type="submit"
            className="glass-panel w-full px-6 py-3 inline-flex items-center justify-center hover-glow gap-2"
          >
            <span>Submit {selectedCategory === 'project' ? 'Project' : 'Message'}</span>
            <Send className="w-4 h-4" />
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <a
            href="mailto:connect@roxonn.com"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="w-5 h-5" />
            <span>connect@roxonn.com</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
