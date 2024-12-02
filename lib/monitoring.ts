import React from 'react';
import { Metric } from 'web-vitals';
import { captureException, setTag } from '@sentry/nextjs';

interface ExtendedPerformance extends Performance {
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

declare global {
  interface Window {
    performance: ExtendedPerformance;
  }
}

// Web Vitals reporting
export function reportWebVitals(onPerfEntry?: (metric: Metric) => void) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      onCLS(onPerfEntry);
      onFID(onPerfEntry);
      onFCP(onPerfEntry);
      onLCP(onPerfEntry);
      onTTFB(onPerfEntry);
    });
  }
}

export function initWebVitals() {
  try {
    reportWebVitals((metric) => {
      console.log(metric);
    });
  } catch (e) {
    console.error('Failed to init web vitals:', e);
  }
}

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
export function trackPerformance(metric: string, value: number) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`Performance [${metric}]:`, value);
  }

  // Here you can add additional performance tracking:
  // - Custom metrics to Sentry
  // - Google Analytics
  // - Custom monitoring solution
  console.log(`[Performance] ${metric}: ${value}`);
}

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
export function trackResourceUsage() {
  if (typeof window !== 'undefined') {
    // Memory usage
    const perf = window.performance as ExtendedPerformance;
    if (perf.memory) {
      const { usedJSHeapSize, totalJSHeapSize } = perf.memory;
      trackPerformance('memory-usage', usedJSHeapSize / totalJSHeapSize);
    }

    // CPU usage (if available)
    // Network usage
    // etc.
  }
}

export function initMonitoring() {
  if (typeof window !== 'undefined') {
    // Memory usage
    const perf = window.performance as ExtendedPerformance;
    if (perf.memory) {
      const { usedJSHeapSize, totalJSHeapSize } = perf.memory;
      trackPerformance('memory-usage', usedJSHeapSize / totalJSHeapSize);
    }

    // Page load timing
    window.addEventListener('load', () => {
      const timing = performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      trackPerformance('page-load', loadTime);
    });

    // Initialize web vitals
    reportWebVitals((metric) => {
      trackPerformance(metric.name, metric.value);
    });
  }
}
