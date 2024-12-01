import React from 'react';
import { getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals';
import { captureException, setTag } from '@sentry/nextjs';

// Web Vitals reporting
export const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getLCP(onPerfEntry);
    getFCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
};

// Error tracking
export const trackError = (error: Error, errorInfo?: any) => {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', error);
    if (errorInfo) {
      console.error('Error Info:', errorInfo);
    }
  }

  // Track in Sentry
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    setTag('environment', process.env.NODE_ENV);
    captureException(error, { extra: errorInfo });
  }
};

// Performance monitoring
export const trackPerformance = (name: string, value: number) => {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`Performance [${name}]:`, value);
  }

  // Here you can add additional performance tracking:
  // - Custom metrics to Sentry
  // - Google Analytics
  // - Custom monitoring solution
};

// User interaction tracking
export const trackUserInteraction = (action: string, data?: any) => {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`User Action [${action}]:`, data);
  }

  // Here you can add:
  // - Analytics tracking
  // - Event logging
  // - User behavior analysis
};

// API monitoring
export const trackApiCall = (endpoint: string, duration: number, status: number) => {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`API Call [${endpoint}]:`, { duration, status });
  }

  // Track slow API calls
  if (duration > 1000) {
    trackPerformance(`slow-api-${endpoint}`, duration);
  }
};

// Resource monitoring
export const trackResourceUsage = () => {
  if (typeof window !== 'undefined') {
    // Memory usage
    if (performance.memory) {
      const { usedJSHeapSize, totalJSHeapSize } = performance.memory;
      trackPerformance('memory-usage', usedJSHeapSize / totalJSHeapSize);
    }

    // CPU usage (if available)
    // Network usage
    // etc.
  }
};
