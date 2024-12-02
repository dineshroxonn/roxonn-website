'use client';

import React from 'react';
import { trackError } from '@/lib/monitoring';

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    trackError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

const ErrorFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Oops! Something went wrong</h2>
      <p className="text-gray-600 mb-8">
        We&apos;re sorry for the inconvenience. Please try refreshing the page.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Refresh Page
      </button>
    </div>
  </div>
);

export const GlobalErrorHandler: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ErrorBoundary fallback={<ErrorFallback />}>{children}</ErrorBoundary>;
};
