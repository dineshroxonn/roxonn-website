# Notification System Components Documentation

## Overview
This document provides detailed information about the React components that make up the notification system.

## Components

### NotificationManager
The core component that manages the notification state and provides context to child components.

#### Props
```typescript
interface NotificationManagerProps {
  children: React.ReactNode;
}
```

#### Context Values
```typescript
interface NotificationContext {
  notifications: Notification[];
  unreadCount: number;
  preferences: NotificationPreferences;
  markAsRead: (ids: string[]) => Promise<void>;
  markAsUnread: (ids: string[]) => Promise<void>;
  deleteNotifications: (ids: string[]) => Promise<void>;
  updatePreferences: (prefs: Partial<NotificationPreferences>) => Promise<void>;
}
```

#### Usage
```tsx
import { NotificationProvider, useNotifications } from './NotificationManager'

// Wrap your app
function App() {
  return (
    <NotificationProvider>
      <YourApp />
    </NotificationProvider>
  )
}

// Use in components
function NotificationList() {
  const { notifications, markAsRead } = useNotifications()
  return (
    <ul>
      {notifications.map(notification => (
        <li key={notification.id}>
          {notification.message}
          <button onClick={() => markAsRead([notification.id])}>
            Mark as Read
          </button>
        </li>
      ))}
    </ul>
  )
}
```

### NotificationBell
A button component that displays the current number of unread notifications and opens the notification panel.

#### Props
```typescript
interface NotificationBellProps {
  className?: string;
  showCount?: boolean;
  maxCount?: number;
}
```

#### Features
- Displays unread notification count
- Animates on new notifications
- Opens notification panel on click
- Supports keyboard navigation
- ARIA-compliant

#### Usage
```tsx
import { NotificationBell } from './NotificationBell'

function Header() {
  return (
    <header>
      <NotificationBell 
        showCount={true}
        maxCount={99}
      />
    </header>
  )
}
```

### NotificationPanel
The dropdown panel that displays the list of notifications.

#### Props
```typescript
interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}
```

#### Features
- Infinite scroll for notification list
- Batch selection and actions
- Filter by notification type
- Sort by date or priority
- Mark all as read functionality

#### Usage
```tsx
import { NotificationPanel } from './NotificationPanel'

function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <NotificationPanel
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    />
  )
}
```

### NotificationPreferences
Component for managing notification settings and preferences.

#### Props
```typescript
interface NotificationPreferencesProps {
  className?: string;
  onSave?: (preferences: NotificationPreferences) => void;
  onCancel?: () => void;
}
```

#### Features
- Toggle email notifications
- Toggle push notifications
- Category-based preferences
- Real-time preference updates
- Form validation

#### Usage
```tsx
import { NotificationPreferences } from './NotificationPreferences'

function SettingsPage() {
  return (
    <div>
      <h1>Notification Settings</h1>
      <NotificationPreferences
        onSave={(prefs) => console.log('Saved:', prefs)}
      />
    </div>
  )
}
```

### NotificationToast
Component for displaying temporary notification messages.

#### Props
```typescript
interface NotificationToastProps {
  notification: Notification;
  duration?: number;
  onClose?: () => void;
  onClick?: () => void;
}
```

#### Features
- Auto-dismiss after duration
- Click to dismiss
- Action buttons
- Progress indicator
- Accessibility support

#### Usage
```tsx
import { NotificationToast } from './NotificationToast'

function ToastContainer() {
  return (
    <NotificationToast
      notification={{
        id: '1',
        message: 'New project update',
        type: 'info'
      }}
      duration={5000}
    />
  )
}
```

## Styling

The components use Tailwind CSS for styling and shadcn/ui for base components.

### Theme Customization
```typescript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        notification: {
          unread: 'var(--notification-unread)',
          hover: 'var(--notification-hover)',
          selected: 'var(--notification-selected)',
        }
      }
    }
  }
}
```

### CSS Variables
```css
:root {
  --notification-unread: theme('colors.blue.50');
  --notification-hover: theme('colors.gray.50');
  --notification-selected: theme('colors.blue.100');
}

.dark {
  --notification-unread: theme('colors.blue.900');
  --notification-hover: theme('colors.gray.800');
  --notification-selected: theme('colors.blue.800');
}
```

## Accessibility

### ARIA Attributes
```tsx
<button
  role="button"
  aria-label="Notifications"
  aria-expanded={isOpen}
  aria-haspopup="true"
  aria-controls="notification-panel"
>
  {/* Bell icon */}
</button>

<div
  role="dialog"
  aria-label="Notifications panel"
  id="notification-panel"
>
  {/* Notification list */}
</div>
```

### Keyboard Navigation
- `Enter` or `Space`: Open/close notification panel
- `Tab`: Navigate through notifications
- `Escape`: Close panel
- `Arrow keys`: Navigate notification list
- `Shift + Tab`: Navigate backwards

## Error Handling

### Error Boundary
```tsx
import { ErrorBoundary } from '@/components/ErrorBoundary'

function NotificationWrapper() {
  return (
    <ErrorBoundary
      fallback={<NotificationErrorState />}
    >
      <NotificationBell />
    </ErrorBoundary>
  )
}
```

### Loading States
```tsx
function NotificationList() {
  const { notifications, loading } = useNotifications()

  if (loading) {
    return <NotificationSkeleton />
  }

  return (
    <ul>
      {notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
        />
      ))}
    </ul>
  )
}
```

## Testing

### Unit Tests
```typescript
import { render, fireEvent } from '@testing-library/react'
import { NotificationBell } from './NotificationBell'

describe('NotificationBell', () => {
  it('displays correct unread count', () => {
    const { getByText } = render(
      <NotificationBell count={5} />
    )
    expect(getByText('5')).toBeInTheDocument()
  })

  it('opens panel on click', () => {
    const { getByRole, getByTestId } = render(
      <NotificationBell />
    )
    fireEvent.click(getByRole('button'))
    expect(getByTestId('notification-panel')).toBeVisible()
  })
})
```

### Integration Tests
```typescript
describe('NotificationSystem', () => {
  it('marks notification as read', async () => {
    const { getByText, queryByText } = render(
      <NotificationProvider>
        <NotificationPanel />
      </NotificationProvider>
    )

    fireEvent.click(getByText('Mark as Read'))
    await waitFor(() => {
      expect(queryByText('New notification')).not.toHaveClass('unread')
    })
  })
})
```

## Performance Optimization

### Memoization
```typescript
const MemoizedNotificationItem = React.memo(
  NotificationItem,
  (prev, next) => prev.notification.id === next.notification.id
)
```

### Virtual Scrolling
```tsx
import { VirtualList } from '@/components/VirtualList'

function NotificationList() {
  return (
    <VirtualList
      items={notifications}
      height={400}
      itemHeight={64}
      renderItem={(notification) => (
        <NotificationItem notification={notification} />
      )}
    />
  )
}
```

## Best Practices

1. **State Management**
   - Use context for global notification state
   - Implement optimistic updates
   - Cache notification data

2. **Accessibility**
   - Include proper ARIA labels
   - Support keyboard navigation
   - Maintain focus management

3. **Performance**
   - Implement virtual scrolling for long lists
   - Memoize expensive components
   - Use proper React hooks

4. **Testing**
   - Write comprehensive unit tests
   - Include integration tests
   - Test error scenarios
