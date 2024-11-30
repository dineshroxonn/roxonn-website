import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { ContentVersionProvider } from '@/context/content-version';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { CustomCursor } from '@/components/custom-cursor';
import { metadata } from './metadata';
import { initMonitoring } from '@/lib/monitoring';
import { validateEnv } from '@/lib/env';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// Validate environment variables
validateEnv();

// Initialize monitoring in production
if (process.env.NODE_ENV === 'production') {
  initMonitoring();
}

export { metadata };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ContentVersionProvider>
            <CustomCursor />
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ContentVersionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
