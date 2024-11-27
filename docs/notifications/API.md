# Notification System API Documentation

## Endpoints

### Notification Preferences

#### GET /api/notifications/preferences
Retrieves the current notification preferences for the authenticated user.

**Response**
```typescript
{
  email: boolean;
  push: boolean;
  categories: {
    governance: boolean;
    projects: boolean;
    achievements: boolean;
    system: boolean;
  };
}
```

**Example Response**
```json
{
  "email": true,
  "push": false,
  "categories": {
    "governance": true,
    "projects": true,
    "achievements": true,
    "system": false
  }
}
```

#### PUT /api/notifications/preferences
Updates notification preferences for the authenticated user.

**Request Body**
```typescript
{
  email?: boolean;
  push?: boolean;
  categories?: {
    governance?: boolean;
    projects?: boolean;
    achievements?: boolean;
    system?: boolean;
  };
}
```

**Example Request**
```json
{
  "email": true,
  "categories": {
    "governance": false
  }
}
```

### Batch Operations

#### POST /api/notifications/batch
Performs batch operations on multiple notifications.

**Request Body**
```typescript
{
  action: 'markRead' | 'markUnread' | 'delete';
  notificationIds: string[];
}
```

**Example Request**
```json
{
  "action": "markRead",
  "notificationIds": ["notification1", "notification2"]
}
```

### Real-time Events

The notification system uses Pusher for real-time updates. Subscribe to the following events:

#### Channel: `private-user-{userId}`

Events:
- `notification:new` - New notification received
- `notification:updated` - Notification status updated
- `notification:deleted` - Notification deleted
- `preferences:updated` - Notification preferences updated

Example payload for `notification:new`:
```json
{
  "id": "notification1",
  "type": "project_update",
  "message": "New project update available",
  "createdAt": "2024-01-20T12:00:00Z",
  "read": false
}
```

## Error Responses

All API endpoints return standard HTTP status codes:

- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

Error response format:
```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Invalid notification preferences format"
  }
}
```

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- 100 requests per minute for GET endpoints
- 50 requests per minute for POST/PUT endpoints

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1516131940
```

## Authentication

All endpoints require authentication using NextAuth.js. Include the session token in the request headers:

```typescript
headers: {
  'Authorization': `Bearer ${session.token}`
}
```

## Data Models

### Notification
```typescript
interface Notification {
  id: string;
  userId: string;
  type: string;
  message: string;
  read: boolean;
  createdAt: Date;
  metadata?: Record<string, any>;
}
```

### NotificationPreferences
```typescript
interface NotificationPreferences {
  id: string;
  userId: string;
  email: boolean;
  push: boolean;
  categories: {
    governance: boolean;
    projects: boolean;
    achievements: boolean;
    system: boolean;
  };
}
```

## Webhooks

The system can send webhook notifications to configured endpoints when certain events occur.

### Webhook Events
- `notification.created`
- `notification.updated`
- `notification.deleted`
- `preferences.updated`

### Webhook Payload
```json
{
  "event": "notification.created",
  "timestamp": "2024-01-20T12:00:00Z",
  "data": {
    "notification": {
      "id": "notification1",
      "type": "project_update",
      "message": "New project update available"
    }
  }
}
```

## Best Practices

1. **Pagination**
   - Use cursor-based pagination for notification lists
   - Default page size: 20 items
   - Maximum page size: 100 items

2. **Caching**
   - Cache notification preferences (TTL: 5 minutes)
   - Use ETags for notification lists
   - Implement conditional requests

3. **Error Handling**
   - Implement exponential backoff for failed requests
   - Log detailed error information
   - Provide user-friendly error messages

4. **Security**
   - Validate all input data
   - Implement request signing for webhooks
   - Use HTTPS for all API calls

## Examples

### Fetching Notifications with Pagination
```typescript
const response = await fetch('/api/notifications?cursor=notification1&limit=20')
const { notifications, nextCursor } = await response.json()
```

### Updating Multiple Preferences
```typescript
const response = await fetch('/api/notifications/preferences', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: true,
    push: false,
    categories: {
      governance: true,
      projects: false
    }
  })
})
```

### Subscribing to Real-time Updates
```typescript
const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
  cluster: 'eu',
  encrypted: true
})

const channel = pusher.subscribe(`private-user-${userId}`)
channel.bind('notification:new', (data) => {
  // Handle new notification
})
```
