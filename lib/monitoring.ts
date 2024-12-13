import React from 'react';
import { Metric } from 'web-vitals';

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

// Initialize web vitals monitoring
export function initWebVitals() {
  reportWebVitals((metric) => {
    console.log(`Web Vital: ${metric.name} = ${metric.value}`);
  });
}

// Error tracking
export function trackError(error: Error, errorInfo?: any) {
  console.error('Error:', error);
  if (errorInfo) {
    console.error('Error Info:', errorInfo);
  }
}

// Performance monitoring
export function trackPerformance(metric: string, value: number) {
  console.log(`Performance [${metric}]:`, value);
}

// User interaction tracking
export function trackUserInteraction(action: string, data?: any) {
  console.log(`User Action [${action}]:`, data || {});
}

// API monitoring
export function trackApiCall(endpoint: string, duration: number, status: number) {
  console.log(`API Call [${endpoint}]:`, {
    duration,
    status,
  });
}

// Resource monitoring
export function trackResourceUsage() {
  if (typeof window !== 'undefined' && window.performance?.memory) {
    const { memory } = window.performance;
    console.log('Memory Usage:', {
      used: memory.usedJSHeapSize,
      total: memory.totalJSHeapSize,
      limit: memory.jsHeapSizeLimit,
    });
  }
}

// Initialize all monitoring
export function initMonitoring() {
  // Initialize web vitals
  initWebVitals();

  // Set up error boundary
  window.onerror = (message, source, lineno, colno, error) => {
    trackError(error || new Error(message as string));
  };

  // Set up performance monitoring
  if (typeof window !== 'undefined') {
    // Monitor navigation timing
    window.addEventListener('load', () => {
      const timing = performance.timing;
      trackPerformance('page-load', timing.loadEventEnd - timing.navigationStart);
    });
  }
}
