# Notification System Documentation

## Overview
The notification system provides a comprehensive solution for managing user notifications in the Roxonn platform. It supports real-time updates, preference management, and batch operations.

## Features
- Real-time notification delivery
- Customizable notification preferences
- Batch operations (mark read/unread, delete)
- Error handling and recovery
- Analytics tracking
- Email and push notification channels

## Architecture

### Components
1. **NotificationManager**
   - Central state management using React Context
   - Handles real-time updates via Pusher
   - Manages notification preferences

2. **NotificationBell**
   - UI component for displaying notifications
   - Supports batch operations
   - Real-time counter updates

3. **NotificationPreferences**
   - User interface for managing notification settings
   - Category-based preferences
   - Channel selection (email/push)

4. **ErrorBoundary**
   - Graceful error handling
   - Retry mechanism
   - Fallback UI

### API Endpoints

#### Notification Preferences
```typescript
GET /api/notifications/preferences
POST /api/notifications/preferences
```

#### Batch Operations
```typescript
POST /api/notifications/batch
Body: {
  action: 'markRead' | 'markUnread' | 'delete',
  notificationIds: string[]
}
```

## Usage Examples

### Setting Up NotificationManager
```tsx
// In your app's root component
import { NotificationProvider } from '@/components/notifications/NotificationManager'

function App() {
  return (
    <NotificationProvider>
      {/* Your app components */}
    </NotificationProvider>
  )
}
```

### Using Notifications in Components
```tsx
import { useNotifications } from '@/components/notifications/NotificationManager'

function MyComponent() {
  const { notifications, markAsRead } = useNotifications()

  return (
    <div>
      {notifications.map(notification => (
        <div key={notification.id}>
          {notification.message}
          <button onClick={() => markAsRead([notification.id])}>
            Mark as Read
          </button>
        </div>
      ))}
    </div>
  )
}
```

### Managing Preferences
```tsx
import { NotificationPreferences } from '@/components/notifications/NotificationPreferences'

function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>
      <NotificationPreferences />
    </div>
  )
}
```

## Analytics Integration

The system tracks the following events:
- `notification_viewed`
- `notification_clicked`
- `notification_marked_read`
- `notification_preferences_updated`
- `notification_error`

Example:
```typescript
import { trackNotificationEvent } from '@/lib/analytics'

trackNotificationEvent('notification_clicked', {
  notificationId: '123',
  type: 'project_update'
})
```

## Error Handling

### Using Error Boundaries
```tsx
import { ErrorBoundary } from '@/components/ErrorBoundary'

function MyComponent() {
  return (
    <ErrorBoundary>
      <NotificationBell />
    </ErrorBoundary>
  )
}
```

### Custom Error Handling
```typescript
try {
  await updatePreferences(newPrefs)
} catch (error) {
  console.error('Failed to update preferences:', error)
  toast.error('Failed to update preferences')
}
```

## Testing

### Component Tests
```typescript
import { render, fireEvent } from '@testing-library/react'
import { NotificationPreferences } from './NotificationPreferences'

describe('NotificationPreferences', () => {
  it('updates preferences correctly', async () => {
    const { getByLabelText } = render(<NotificationPreferences />)
    fireEvent.click(getByLabelText('Email Notifications'))
    // Add assertions
  })
})
```

### API Tests
```typescript
describe('Notification API', () => {
  it('handles batch operations', async () => {
    const response = await fetch('/api/notifications/batch', {
      method: 'POST',
      body: JSON.stringify({
        action: 'markRead',
        notificationIds: ['123']
      })
    })
    expect(response.ok).toBe(true)
  })
})
```

## Configuration

### Environment Variables
```env
NEXT_PUBLIC_PUSHER_APP_KEY=your_pusher_key
PUSHER_APP_ID=your_pusher_app_id
PUSHER_SECRET=your_pusher_secret
```

### Prisma Schema
```prisma
model Notification {
  id        String   @id @default(cuid())
  userId    String
  message   String
  type      String
  read      Boolean  @default(false)
  createdAt DateTime @default(now())
}

model NotificationPreferences {
  id         String  @id @default(cuid())
  userId     String  @unique
  email      Boolean @default(true)
  push       Boolean @default(false)
  categories Json
}
```

## Best Practices

1. **Real-time Updates**
   - Use Pusher for immediate notification delivery
   - Implement reconnection logic
   - Handle offline scenarios

2. **Performance**
   - Implement pagination for notification lists
   - Use optimistic updates for better UX
   - Cache notification preferences

3. **Security**
   - Validate user permissions
   - Sanitize notification content
   - Rate limit API endpoints

4. **Accessibility**
   - Use ARIA labels
   - Ensure keyboard navigation
   - Provide visual and audio feedback

## Troubleshooting

### Common Issues

1. **Notifications not appearing**
   - Check Pusher connection
   - Verify user authentication
   - Check notification permissions

2. **Preferences not saving**
   - Validate API response
   - Check database connection
   - Verify user session

3. **Real-time updates not working**
   - Check WebSocket connection
   - Verify Pusher configuration
   - Check browser compatibility

## Contributing

1. Follow TypeScript best practices
2. Add tests for new features
3. Update documentation
4. Follow the existing code style

## License
MIT License - See LICENSE file for details
