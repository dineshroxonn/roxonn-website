'use client';

import React, { createContext, useContext, useState } from 'react';

type ContentVersion = 'v1' | 'v2';

interface ContentVersionContextType {
  version: ContentVersion;
  setVersion: (version: ContentVersion) => void;
}

const ContentVersionContext = createContext<ContentVersionContextType | undefined>(undefined);

export function useContentVersion() {
  const context = useContext(ContentVersionContext);
  if (!context) {
    throw new Error('useContentVersion must be used within a ContentVersionProvider');
  }
  return context;
}

export function ContentVersionProvider({ children }: { children: React.ReactNode }) {
  const [version, setVersion] = useState<ContentVersion>('v1');

  return (
    <ContentVersionContext.Provider value={{ version, setVersion }}>
      {children}
    </ContentVersionContext.Provider>
  );
}
