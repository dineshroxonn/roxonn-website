import { ReactNode } from 'react';

export interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface ContentVersion {
  title: string;
  subtitle: string;
  features: Feature[];
  cta?: {
    title: string;
    description: string;
    buttonText: string;
  };
}

export interface Tier {
  name: string;
  requirement: string;
  benefits: string[];
}

export interface StakingContent extends ContentVersion {
  tiers: Tier[];
}

export interface MetaProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

export interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: string;
}

export interface ContentVersionContextType {
  isSimpleVersion: boolean;
  toggleVersion: () => void;
}
