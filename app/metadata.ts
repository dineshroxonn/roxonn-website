import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Roxonn - Decentralized Contribution Platform',
    template: '%s | Roxonn',
  },
  description: 'Earn rewards for your software contributions in a decentralized ecosystem',
  keywords: [
    'software development',
    'decentralized',
    'contribution platform',
    'developer rewards',
    'open source',
    'blockchain',
    'community',
  ],
  authors: [{ name: 'Roxonn Team' }],
  creator: 'Roxonn',
  publisher: 'Roxonn',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://roxonn.com',
    siteName: 'Roxonn',
    title: 'Roxonn - Decentralized Contribution Platform',
    description: 'Earn rewards for your software contributions in a decentralized ecosystem',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Roxonn Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roxonn - Decentralized Contribution Platform',
    description: 'Earn rewards for your software contributions in a decentralized ecosystem',
    images: ['/og-image.png'],
    creator: '@roxonn',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
