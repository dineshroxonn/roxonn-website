const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
};

const sentryWebpackPluginOptions = {
  org: "roxonn",
  project: "roxonn-website",
  silent: true,
};

module.exports = withSentryConfig(
  nextConfig,
  sentryWebpackPluginOptions
);
