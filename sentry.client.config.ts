// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { BrowserTracing } from '@sentry/browser';
import { Replay } from '@sentry/replay';

Sentry.init({
  dsn: 'https://101c65998635c682d16ee2d21f49705d@o4508373996994560.ingest.us.sentry.io/4508390784368640',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: process.env.NODE_ENV === 'development',

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // If the entire session is not sampled, use the below sample rate to sample
  // sessions when an error occurs.
  replaysOnErrorSampleRate: 1.0,

  integrations: [
    new BrowserTracing({
      tracePropagationTargets: ['localhost', /^https:\/\/[^/]*roxonn\.com/],
    }),
    new Replay(),
  ],
});
