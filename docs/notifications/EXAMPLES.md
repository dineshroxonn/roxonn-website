# Notification System Examples

## Common Use Cases

### 1. Project Update Notification
```typescript
// Send a notification when a project is updated
async function notifyProjectUpdate(projectId: string, changes: ProjectChanges) {
  const notification = await prisma.notification.create({
    data: {
      type: 'project_update',
      userId: project.ownerId,
      message: `Project "${project.name}" has been updated`,
      metadata: {
        projectId,
        changes,
        timestamp: new Date().toISOString()
      }
    }
  })

  // Trigger real-time update
  await pusher.trigger(`private-user-${project.ownerId}`, 'notification:new', {
    notification
  })

  // Send email if user has email notifications enabled
  const preferences = await getNotificationPreferences(project.ownerId)
  if (preferences.email && preferences.categories.projects) {
    await sendEmail({
      to: user.email,
      template: 'project-update',
      data: { project, changes }
    })
  }
}
```

### 2. Batch Notification Processing
```typescript
// Mark multiple notifications as read and update UI
function BatchNotificationProcessor() {
  const { notifications, markAsRead } = useNotifications()
  const [selected, setSelected] = useState<string[]>([])

  const handleBatchMarkAsRead = async () => {
    try {
      await markAsRead(selected)
      toast.success(`Marked ${selected.length} notifications as read`)
      setSelected([])
    } catch (error) {
      toast.error('Failed to update notifications')
      console.error('Batch operation failed:', error)
    }
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <span>{selected.length} selected</span>
        <button
          onClick={handleBatchMarkAsRead}
          disabled={selected.length === 0}
        >
          Mark Selected as Read
        </button>
      </div>
      {notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          selected={selected.includes(notification.id)}
          onSelect={() => {
            setSelected(prev => 
              prev.includes(notification.id)
                ? prev.filter(id => id !== notification.id)
                : [...prev, notification.id]
            )
          }}
        />
      ))}
    </div>
  )
}
```

### 3. Custom Notification Templates
```typescript
// Define notification templates
const notificationTemplates = {
  project_update: {
    icon: '📝',
    color: 'blue',
    getMessage: (data: any) => `Project "${data.projectName}" has been updated`,
    getAction: (data: any) => `/projects/${data.projectId}`
  },
  achievement_unlocked: {
    icon: '🏆',
    color: 'gold',
    getMessage: (data: any) => `Achievement unlocked: ${data.achievementName}`,
    getAction: (data: any) => `/achievements/${data.achievementId}`
  },
  governance_vote: {
    icon: '🗳️',
    color: 'purple',
    getMessage: (data: any) => `New governance proposal: ${data.proposalTitle}`,
    getAction: (data: any) => `/governance/${data.proposalId}`
  }
} as const

// Use templates in notification component
function NotificationItem({ notification }: { notification: Notification }) {
  const template = notificationTemplates[notification.type]
  
  return (
    <div className={`notification-item ${template.color}`}>
      <span className="icon">{template.icon}</span>
      <p>{template.getMessage(notification.metadata)}</p>
      <Link href={template.getAction(notification.metadata)}>
        View Details
      </Link>
    </div>
  )
}
```

### 4. Real-time Notification Counter
```typescript
function NotificationCounter() {
  const { unreadCount } = useNotifications()
  const [showAnimation, setShowAnimation] = useState(false)
  const prevCount = usePrevious(unreadCount)

  // Animate counter when count increases
  useEffect(() => {
    if (prevCount !== undefined && unreadCount > prevCount) {
      setShowAnimation(true)
      const timer = setTimeout(() => setShowAnimation(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [unreadCount, prevCount])

  return (
    <div className={`counter ${showAnimation ? 'pulse' : ''}`}>
      {unreadCount > 99 ? '99+' : unreadCount}
    </div>
  )
}
```

### 5. Notification Preferences Form
```typescript
function NotificationPreferencesForm() {
  const { preferences, updatePreferences } = useNotifications()
  const form = useForm<NotificationPreferences>({
    defaultValues: preferences
  })

  const onSubmit = async (data: NotificationPreferences) => {
    try {
      await updatePreferences(data)
      toast.success('Preferences updated successfully')
    } catch (error) {
      toast.error('Failed to update preferences')
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Switch {...form.register('email')} />
          <Label htmlFor="email">Email Notifications</Label>
        </div>

        <div className="flex items-center gap-2">
          <Switch {...form.register('push')} />
          <Label htmlFor="push">Push Notifications</Label>
        </div>

        <div className="space-y-2">
          <h3>Categories</h3>
          {Object.entries(preferences.categories).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <Switch {...form.register(`categories.${key}`)} />
              <Label htmlFor={`categories.${key}`}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Label>
            </div>
          ))}
        </div>

        <Button type="submit">Save Preferences</Button>
      </div>
    </form>
  )
}
```

### 6. Error Recovery
```typescript
function NotificationErrorRecovery() {
  const [error, setError] = useState<Error | null>(null)
  const [retrying, setRetrying] = useState(false)

  const handleRetry = async () => {
    setRetrying(true)
    try {
      await refetchNotifications()
      setError(null)
    } catch (e) {
      setError(e as Error)
    } finally {
      setRetrying(false)
    }
  }

  if (error) {
    return (
      <div className="error-container">
        <Icon name="warning" className="text-red-500" />
        <p>Failed to load notifications</p>
        <Button
          onClick={handleRetry}
          disabled={retrying}
        >
          {retrying ? 'Retrying...' : 'Retry'}
        </Button>
      </div>
    )
  }

  return <NotificationList />
}
```

### 7. Notification Analytics
```typescript
// Track notification interactions
function NotificationAnalytics() {
  const trackNotificationView = (notification: Notification) => {
    analytics.track('notification_viewed', {
      notificationId: notification.id,
      type: notification.type,
      timeToView: Date.now() - new Date(notification.createdAt).getTime()
    })
  }

  const trackNotificationAction = (notification: Notification, action: string) => {
    analytics.track('notification_action', {
      notificationId: notification.id,
      type: notification.type,
      action,
      timestamp: Date.now()
    })
  }

  return (
    <NotificationList
      onNotificationView={trackNotificationView}
      onNotificationAction={trackNotificationAction}
    />
  )
}
```

### 8. Custom Notification Filters
```typescript
function NotificationFilters() {
  const [filters, setFilters] = useState({
    type: 'all',
    timeRange: '7days',
    read: 'all'
  })

  const filterNotifications = (notifications: Notification[]) => {
    return notifications.filter(notification => {
      // Filter by type
      if (filters.type !== 'all' && notification.type !== filters.type) {
        return false
      }

      // Filter by time range
      const notificationDate = new Date(notification.createdAt)
      const now = new Date()
      const daysDiff = differenceInDays(now, notificationDate)
      if (filters.timeRange === '7days' && daysDiff > 7) {
        return false
      }

      // Filter by read status
      if (filters.read !== 'all') {
        if (filters.read === 'read' && !notification.read) {
          return false
        }
        if (filters.read === 'unread' && notification.read) {
          return false
        }
      }

      return true
    })
  }

  return (
    <div className="filters">
      <Select
        value={filters.type}
        onChange={(value) => setFilters(prev => ({ ...prev, type: value }))}
        options={[
          { value: 'all', label: 'All Types' },
          { value: 'project_update', label: 'Project Updates' },
          { value: 'achievement', label: 'Achievements' },
          { value: 'governance', label: 'Governance' }
        ]}
      />

      <Select
        value={filters.timeRange}
        onChange={(value) => setFilters(prev => ({ ...prev, timeRange: value }))}
        options={[
          { value: 'all', label: 'All Time' },
          { value: '7days', label: 'Last 7 Days' },
          { value: '30days', label: 'Last 30 Days' }
        ]}
      />

      <Select
        value={filters.read}
        onChange={(value) => setFilters(prev => ({ ...prev, read: value }))}
        options={[
          { value: 'all', label: 'All' },
          { value: 'read', label: 'Read' },
          { value: 'unread', label: 'Unread' }
        ]}
      />
    </div>
  )
}
```

### 9. Notification Groups
```typescript
function NotificationGroups() {
  const { notifications } = useNotifications()

  const groupedNotifications = useMemo(() => {
    return notifications.reduce((groups, notification) => {
      const date = format(new Date(notification.createdAt), 'yyyy-MM-dd')
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(notification)
      return groups
    }, {} as Record<string, Notification[]>)
  }, [notifications])

  return (
    <div className="notification-groups">
      {Object.entries(groupedNotifications).map(([date, notifications]) => (
        <div key={date} className="notification-group">
          <div className="date-header">
            {format(new Date(date), 'MMMM d, yyyy')}
          </div>
          {notifications.map(notification => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
```

### 10. Notification Search
```typescript
function NotificationSearch() {
  const { notifications } = useNotifications()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredNotifications = useMemo(() => {
    if (!searchQuery.trim()) return notifications

    const query = searchQuery.toLowerCase()
    return notifications.filter(notification => 
      notification.message.toLowerCase().includes(query) ||
      notification.type.toLowerCase().includes(query) ||
      (notification.metadata && 
        JSON.stringify(notification.metadata).toLowerCase().includes(query))
    )
  }, [notifications, searchQuery])

  return (
    <div>
      <div className="search-container">
        <Input
          type="search"
          placeholder="Search notifications..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <NotificationList notifications={filteredNotifications} />
    </div>
  )
}
```
