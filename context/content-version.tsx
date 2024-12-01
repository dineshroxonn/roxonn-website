'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ContentVersionContextType } from '@/types';

const ContentVersionContext = createContext<ContentVersionContextType>({
  isSimpleVersion: false,
  toggleVersion: () => {},
});

export function ContentVersionProvider({ children }: { children: React.ReactNode }) {
  const [isSimpleVersion, setIsSimpleVersion] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSimpleVersion((prev) => !prev);
    }, 10000); // Switch every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const toggleVersion = () => setIsSimpleVersion((prev) => !prev);

  return (
    <ContentVersionContext.Provider value={{ isSimpleVersion, toggleVersion }}>
      {children}
    </ContentVersionContext.Provider>
  );
}

export const useContentVersion = () => {
  const context = useContext(ContentVersionContext);
  if (context === undefined) {
    throw new Error('useContentVersion must be used within a ContentVersionProvider');
  }
  return context;
};
