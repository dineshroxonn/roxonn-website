# Notification System Testing Guide

## Testing Strategy

### 1. Unit Tests

#### Component Tests
```typescript
import { render, fireEvent, waitFor } from '@testing-library/react'
import { NotificationBell } from './NotificationBell'

describe('NotificationBell', () => {
  it('displays correct unread count', () => {
    const { getByTestId } = render(<NotificationBell unreadCount={5} />)
    expect(getByTestId('notification-count')).toHaveTextContent('5')
  })

  it('truncates large numbers', () => {
    const { getByTestId } = render(<NotificationBell unreadCount={100} />)
    expect(getByTestId('notification-count')).toHaveTextContent('99+')
  })

  it('handles click events', () => {
    const onClickMock = jest.fn()
    const { getByRole } = render(
      <NotificationBell onClick={onClickMock} />
    )
    fireEvent.click(getByRole('button'))
    expect(onClickMock).toHaveBeenCalled()
  })
})
```

#### Hook Tests
```typescript
import { renderHook, act } from '@testing-library/react-hooks'
import { useNotifications } from './useNotifications'

describe('useNotifications', () => {
  it('loads notifications', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useNotifications())
    
    expect(result.current.loading).toBe(true)
    await waitForNextUpdate()
    expect(result.current.notifications).toHaveLength(2)
    expect(result.current.loading).toBe(false)
  })

  it('marks notification as read', async () => {
    const { result } = renderHook(() => useNotifications())
    
    await act(async () => {
      await result.current.markAsRead(['notification1'])
    })

    expect(result.current.notifications[0].read).toBe(true)
  })
})
```

#### Context Tests
```typescript
import { render, act } from '@testing-library/react'
import { NotificationProvider, useNotifications } from './NotificationContext'

describe('NotificationContext', () => {
  it('provides notification state to children', () => {
    const TestComponent = () => {
      const { notifications } = useNotifications()
      return <div>{notifications.length}</div>
    }

    const { getByText } = render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    )

    expect(getByText('0')).toBeInTheDocument()
  })
})
```

### 2. Integration Tests

#### API Integration
```typescript
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, waitFor } from '@testing-library/react'
import { NotificationList } from './NotificationList'

const server = setupServer(
  rest.get('/api/notifications', (req, res, ctx) => {
    return res(
      ctx.json({
        notifications: [
          {
            id: '1',
            message: 'Test notification',
            read: false
          }
        ]
      })
    )
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and displays notifications', async () => {
  const { getByText } = render(<NotificationList />)
  
  await waitFor(() => {
    expect(getByText('Test notification')).toBeInTheDocument()
  })
})
```

#### WebSocket Integration
```typescript
import { act, render, waitFor } from '@testing-library/react'
import { NotificationRealtime } from './NotificationRealtime'
import { WebSocket, Server } from 'mock-socket'

describe('NotificationRealtime', () => {
  let mockServer: Server

  beforeEach(() => {
    mockServer = new Server('ws://localhost:1234')
    ;(global as any).WebSocket = WebSocket
  })

  afterEach(() => {
    mockServer.close()
  })

  it('receives real-time notifications', async () => {
    const { getByText } = render(<NotificationRealtime />)

    act(() => {
      mockServer.emit('message', JSON.stringify({
        type: 'notification',
        data: { message: 'Real-time notification' }
      }))
    })

    await waitFor(() => {
      expect(getByText('Real-time notification')).toBeInTheDocument()
    })
  })
})
```

### 3. End-to-End Tests

```typescript
import { test, expect } from '@playwright/test'

test.describe('Notification System', () => {
  test('displays notifications', async ({ page }) => {
    await page.goto('/')
    await page.click('[data-testid="notification-bell"]')
    await expect(page.locator('.notification-list')).toBeVisible()
  })

  test('marks notification as read', async ({ page }) => {
    await page.goto('/')
    await page.click('[data-testid="notification-bell"]')
    await page.click('[data-testid="notification-item"]')
    await expect(page.locator('[data-testid="unread-indicator"]')).not.toBeVisible()
  })

  test('updates preferences', async ({ page }) => {
    await page.goto('/settings')
    await page.click('[data-testid="email-toggle"]')
    await page.click('[data-testid="save-preferences"]')
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
  })
})
```

### 4. Performance Tests

```typescript
import { render } from '@testing-library/react'
import { NotificationList } from './NotificationList'

describe('NotificationList Performance', () => {
  it('renders large lists efficiently', async () => {
    const notifications = Array.from({ length: 1000 }, (_, i) => ({
      id: `${i}`,
      message: `Notification ${i}`,
      read: false
    }))

    const startTime = performance.now()
    render(<NotificationList notifications={notifications} />)
    const endTime = performance.now()

    expect(endTime - startTime).toBeLessThan(100) // Should render in under 100ms
  })

  it('handles frequent updates', async () => {
    const { rerender } = render(<NotificationList notifications={[]} />)
    
    const updates = Array.from({ length: 100 }, (_, i) => [{
      id: `${i}`,
      message: `Notification ${i}`,
      read: false
    }])

    const startTime = performance.now()
    for (const update of updates) {
      rerender(<NotificationList notifications={update} />)
    }
    const endTime = performance.now()

    expect(endTime - startTime).toBeLessThan(1000) // Should handle 100 updates in under 1s
  })
})
```

### 5. Accessibility Tests

```typescript
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { NotificationPanel } from './NotificationPanel'

expect.extend(toHaveNoViolations)

describe('NotificationPanel Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<NotificationPanel />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('handles keyboard navigation', async () => {
    const { getByRole } = render(<NotificationPanel />)
    const list = getByRole('list')
    expect(list).toHaveAttribute('role', 'list')
    expect(list).toHaveAttribute('aria-label', 'Notifications')
  })
})
```

### 6. Error Handling Tests

```typescript
describe('Error Handling', () => {
  it('handles API errors gracefully', async () => {
    server.use(
      rest.get('/api/notifications', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    const { getByText } = render(<NotificationList />)
    await waitFor(() => {
      expect(getByText('Failed to load notifications')).toBeInTheDocument()
    })
  })

  it('retries failed requests', async () => {
    const fetchMock = jest.fn()
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce({ notifications: [] })

    const { getByText } = render(
      <NotificationList fetchNotifications={fetchMock} />
    )

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(2)
    })
  })
})
```

### 7. State Management Tests

```typescript
import { renderHook } from '@testing-library/react-hooks'
import { useNotificationState } from './useNotificationState'

describe('Notification State Management', () => {
  it('maintains correct unread count', () => {
    const { result } = renderHook(() => useNotificationState())

    act(() => {
      result.current.addNotification({
        id: '1',
        read: false,
        message: 'Test'
      })
    })

    expect(result.current.unreadCount).toBe(1)

    act(() => {
      result.current.markAsRead(['1'])
    })

    expect(result.current.unreadCount).toBe(0)
  })

  it('handles batch operations', () => {
    const { result } = renderHook(() => useNotificationState())

    act(() => {
      result.current.addNotifications([
        { id: '1', read: false, message: 'Test 1' },
        { id: '2', read: false, message: 'Test 2' }
      ])
    })

    act(() => {
      result.current.markAsRead(['1', '2'])
    })

    expect(result.current.unreadCount).toBe(0)
    expect(result.current.notifications.every(n => n.read)).toBe(true)
  })
})
```

### 8. Analytics Tests

```typescript
describe('Notification Analytics', () => {
  let analyticsMock: jest.Mock

  beforeEach(() => {
    analyticsMock = jest.fn()
    global.analytics = { track: analyticsMock }
  })

  it('tracks notification views', async () => {
    render(<NotificationList />)
    await waitFor(() => {
      expect(analyticsMock).toHaveBeenCalledWith(
        'notification_viewed',
        expect.any(Object)
      )
    })
  })

  it('tracks notification interactions', async () => {
    const { getByTestId } = render(<NotificationList />)
    fireEvent.click(getByTestId('notification-action'))
    
    expect(analyticsMock).toHaveBeenCalledWith(
      'notification_action',
      expect.objectContaining({
        action: 'click',
        notificationId: expect.any(String)
      })
    )
  })
})
```

### 9. Snapshot Tests

```typescript
import renderer from 'react-test-renderer'

describe('Notification Components', () => {
  it('NotificationBell matches snapshot', () => {
    const tree = renderer
      .create(<NotificationBell unreadCount={5} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('NotificationItem matches snapshot', () => {
    const notification = {
      id: '1',
      message: 'Test notification',
      read: false
    }
    const tree = renderer
      .create(<NotificationItem notification={notification} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
```

### 10. Load Tests

```typescript
import { performance } from 'perf_hooks'
import { render, act } from '@testing-library/react'
import { NotificationList } from './NotificationList'

describe('Notification Load Testing', () => {
  it('handles large datasets', async () => {
    const largeDataset = Array.from({ length: 10000 }, (_, i) => ({
      id: `${i}`,
      message: `Notification ${i}`,
      read: false
    }))

    const { container } = render(<NotificationList />)
    
    const start = performance.now()
    act(() => {
      // @ts-ignore
      container.props.onLoadData(largeDataset)
    })
    const end = performance.now()

    expect(end - start).toBeLessThan(1000) // Should process 10k items in under 1s
  })

  it('maintains performance with frequent updates', async () => {
    const { rerender } = render(<NotificationList />)
    const updates = Array.from({ length: 100 }, () => ({
      id: Math.random().toString(),
      message: 'New notification',
      read: false
    }))

    const times: number[] = []
    for (const update of updates) {
      const start = performance.now()
      act(() => {
        rerender(<NotificationList notifications={[update]} />)
      })
      times.push(performance.now() - start)
    }

    const averageTime = times.reduce((a, b) => a + b) / times.length
    expect(averageTime).toBeLessThan(16.67) // Should maintain 60fps
  })
})
```
