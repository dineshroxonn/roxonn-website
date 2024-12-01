# Component Documentation

## Core Sections

### Hero Section

`components/sections/hero.tsx`

The Hero section is the main landing area of the website, featuring:

- Alternating content between technical and simple versions
- 3D animated logo
- Particle background
- Smooth fade transitions

#### Props

None - uses internal state management

#### Usage

```tsx
import { HeroSection } from '@/components/sections/hero';

export default function HomePage() {
  return <HeroSection />;
}
```

### Services Section

`components/sections/services.tsx`

Displays available contribution methods with:

- Dual content versions (technical/simple)
- Responsive grid layout
- Hover animations
- Icon-based features

### Governance Section

`components/sections/governance.tsx`

Explains the platform's decision-making process:

- Simplified explanation of voting
- Coming soon badge
- Feature cards
- Call-to-action

### Staking Section

`components/sections/staking.tsx`

Details the point locking system:

- Tier-based rewards
- Point multiplication explanations
- Lock duration options
- Reward calculations

## UI Components

### LoadingSpinner

`components/ui/loading-spinner.tsx`

A customizable loading indicator:

```tsx
import { LoadingSpinner } from '@/components/ui/loading-spinner';

<LoadingSpinner size="md" />;
```

Props:

- `size`: 'sm' | 'md' | 'lg'
- `className`: Optional custom classes

### CustomCursor

`components/custom-cursor.tsx`

Custom cursor implementation with:

- Smooth following animation
- Hover state changes
- Size transitions

### ErrorBoundary

`components/error-boundary.tsx`

React error boundary for graceful error handling:

```tsx
import { ErrorBoundary } from '@/components/error-boundary';

<ErrorBoundary fallback={<ErrorComponent />}>
  <YourComponent />
</ErrorBoundary>;
```

## Context Providers

### ContentVersionProvider

`context/content-version.tsx`

Manages content switching between technical and simple versions:

```tsx
import { useContentVersion } from '@/context/content-version';

function YourComponent() {
  const { isSimpleVersion, toggleVersion } = useContentVersion();
  // ...
}
```

### ThemeProvider

`components/theme-provider.tsx`

Handles theme switching and system preferences:

```tsx
import { useTheme } from '@/components/theme-provider';

function YourComponent() {
  const { theme, setTheme } = useTheme();
  // ...
}
```

## Best Practices

### Performance

- Use React.memo() for static components
- Implement proper loading states
- Add Suspense boundaries

### Accessibility

- Include ARIA labels
- Maintain heading hierarchy
- Support keyboard navigation

### Testing

- Write unit tests for utilities
- Add component tests
- Test accessibility

### Error Handling

- Use ErrorBoundary components
- Implement fallback UI
- Log errors appropriately
