import { render, screen } from '@testing-library/react';
import { HeroSection } from '@/components/sections/hero';
import { ContentVersionProvider } from '@/context/content-version';

jest.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('@react-three/drei', () => ({
  OrbitControls: () => null,
}));

describe('HeroSection', () => {
  it('renders both technical and simple content', () => {
    render(
      <ContentVersionProvider>
        <HeroSection />
      </ContentVersionProvider>
    );

    // Check for common elements
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
