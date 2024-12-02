'use client';

import * as React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement actual email subscription logic
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call

      toast({
        title: 'Successfully subscribed!',
        description: "You'll receive updates about new features and launches.",
      });

      setEmail('');
    } catch (error) {
      toast({
        title: 'Subscription failed',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-white/90 dark:bg-white/10 text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/20 px-8 py-3 rounded-lg hover:bg-white dark:hover:bg-white/20 transition-all duration-200 disabled:opacity-50"
        >
          {isLoading ? 'Subscribing...' : 'Subscribe for Updates'}
        </Button>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Stay updated with our latest features and token launch details.
      </p>
    </form>
  );
}
