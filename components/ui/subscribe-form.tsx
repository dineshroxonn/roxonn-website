'use client';

import * as React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { SubscriptionRequest, SubscriptionResponse } from '@/lib/types/subscription';

export function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          gdprConsent,
        } as SubscriptionRequest),
      });

      const data: SubscriptionResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      toast({
        title: 'Subscription initiated!',
        description: data.message,
      });

      setEmail('');
      setGdprConsent(false);
    } catch (error: any) {
      toast({
        title: 'Subscription failed',
        description: error.message || 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 relative">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 gradient-text"
        >
          Stay Updated
        </motion.h2>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-card/50"
            />
            <Button
              type="submit"
              disabled={isLoading || !gdprConsent}
              className="whitespace-nowrap"
            >
              Subscribe
            </Button>
          </div>

          <div className="flex items-center gap-2 justify-center text-sm text-muted-foreground">
            <Checkbox
              id="gdpr"
              checked={gdprConsent}
              onCheckedChange={(checked) => setGdprConsent(checked as boolean)}
              required
            />
            <Label htmlFor="gdpr" className="text-xs">
              I consent to receiving updates and understand that my data will be processed in
              accordance with the Privacy Policy. I can unsubscribe at any time.
            </Label>
          </div>

          <p className="text-sm text-muted-foreground">
            Stay updated with our latest features and token launch details.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
