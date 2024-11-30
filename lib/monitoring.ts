export function initMonitoring() {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    // Web Vitals
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    });

    // Error tracking setup (uncomment when ready to add Sentry)
    // if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    //   import('@sentry/nextjs').then(Sentry => {
    //     Sentry.init({
    //       dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    //       tracesSampleRate: 1.0,
    //       debug: false,
    //     });
    //   });
    // }
  }
}

export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    // Analytics tracking (uncomment and modify when ready to add analytics)
    // if (window.gtag) {
    //   window.gtag('event', eventName, properties);
    // }
    // if (window.plausible) {
    //   window.plausible(eventName, { props: properties });
    // }
    console.log('Event tracked:', eventName, properties);
  }
}

export function trackError(error: Error, errorInfo?: React.ErrorInfo) {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    console.error('Error:', error);
    if (errorInfo) {
      console.error('Error Info:', errorInfo);
    }

    // Error tracking (uncomment when ready to add Sentry)
    // if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    //   import('@sentry/nextjs').then(Sentry => {
    //     Sentry.captureException(error, {
    //       extra: errorInfo,
    //     });
    //   });
    // }
  }
}
