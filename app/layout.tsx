import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { GlobalErrorHandler } from '@/components/error-handler';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { CustomCursor } from '@/components/custom-cursor';
import { ContentVersionProvider } from '@/components/content-version-provider';
import { initMonitoring } from '@/lib/monitoring';
import { validateEnv } from '@/lib/env';

const inter = Inter({ subsets: ['latin'] });

// Validate environment variables
validateEnv();

// Initialize monitoring in production
if (process.env.NODE_ENV === 'production') {
  initMonitoring();
}

export const metadata: Metadata = {
  metadataBase: new URL('https://roxonn.com'),
  title: 'Roxonn - Decentralized Contribution Platform',
  description: 'Contribute to open source projects and earn rewards through our decentralized platform.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background antialiased', inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ContentVersionProvider>
            <GlobalErrorHandler>
              <CustomCursor />
              <div className="relative flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Analytics />
              <Toaster />
            </GlobalErrorHandler>
          </ContentVersionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
