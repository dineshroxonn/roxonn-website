# Notification System Architecture Diagrams

## System Overview

```mermaid
graph TD
    Client[Client Application]
    API[API Layer]
    DB[(Database)]
    Queue[Message Queue]
    Email[Email Service]
    Push[Push Service]
    WS[WebSocket Server]

    Client -->|HTTP| API
    Client -->|WebSocket| WS
    API -->|Read/Write| DB
    API -->|Publish| Queue
    Queue -->|Consume| Email
    Queue -->|Consume| Push
    WS -->|Subscribe| Queue
    WS -->|Real-time| Client
```

## Notification Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client
    participant A as API
    participant DB as Database
    participant Q as Queue
    participant N as Notification Services

    U->>C: Trigger Action
    C->>A: POST /api/action
    A->>DB: Save Action
    A->>Q: Publish Notification
    Q->>N: Process Notification
    N-->>DB: Update Status
    N-->>C: Real-time Update
    C-->>U: Show Notification
```

## Component Architecture

```mermaid
graph TD
    subgraph "Frontend Components"
        NM[NotificationManager]
        NB[NotificationBell]
        NP[NotificationPanel]
        NI[NotificationItem]
        NPref[NotificationPreferences]
    end

    subgraph "State Management"
        NC[NotificationContext]
        NS[NotificationState]
        NH[NotificationHooks]
    end

    subgraph "API Layer"
        AR[API Routes]
        AH[API Handlers]
        AM[API Middleware]
    end

    NM -->|Provides Context| NC
    NC -->|Uses| NS
    NB -->|Uses| NH
    NP -->|Uses| NH
    NI -->|Uses| NH
    NPref -->|Uses| NH
    NH -->|Calls| AR
    AR -->|Uses| AH
    AH -->|Uses| AM
```

## Data Flow

```mermaid
flowchart TD
    A[Action Triggered] -->|Create| B(New Notification)
    B --> C{Notification Type}
    C -->|Project| D[Project Update]
    C -->|Governance| E[Governance Update]
    C -->|Achievement| F[Achievement Update]
    D --> G[Process Notification]
    E --> G
    F --> G
    G --> H{User Preferences}
    H -->|Email Enabled| I[Send Email]
    H -->|Push Enabled| J[Send Push]
    H -->|Real-time Enabled| K[WebSocket Update]
    I --> L[Mark Sent]
    J --> L
    K --> L
```

## State Management

```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Loading: Fetch
    Loading --> Success: Data Received
    Loading --> Error: API Error
    Error --> Loading: Retry
    Success --> Idle: Reset
    Success --> Loading: Refresh
    Error --> Idle: Reset
```

## Notification Categories

```mermaid
mindmap
    root((Notifications))
        Project
            Updates
            Comments
            Assignments
        Governance
            Proposals
            Votes
            Results
        Achievement
            Unlocked
            Progress
            Rewards
        System
            Maintenance
            Updates
            Alerts
```

## Error Handling

```mermaid
flowchart TD
    A[Error Occurs] --> B{Error Type}
    B -->|Network| C[Retry Request]
    B -->|Validation| D[Show Error Message]
    B -->|Authorization| E[Redirect to Login]
    C --> F{Retry Count}
    F -->|< Max| G[Wait and Retry]
    F -->|>= Max| H[Show Error UI]
    G --> A
    D --> I[Log Error]
    E --> I
    H --> I
```

## Testing Strategy

```mermaid
mindmap
    root((Testing))
        Unit
            Components
            Hooks
            Utils
        Integration
            API
            WebSocket
            State
        E2E
            User Flows
            Performance
            Accessibility
        Load
            Stress
            Volume
            Concurrency
```

## Deployment Architecture

```mermaid
graph TD
    subgraph "Client Layer"
        C1[Next.js App]
        C2[Static Assets]
    end

    subgraph "API Layer"
        A1[API Routes]
        A2[WebSocket Server]
    end

    subgraph "Database Layer"
        D1[(Main DB)]
        D2[(Redis Cache)]
    end

    subgraph "Service Layer"
        S1[Email Service]
        S2[Push Service]
        S3[Analytics Service]
    end

    C1 -->|HTTP| A1
    C1 -->|WS| A2
    A1 -->|Read/Write| D1
    A1 -->|Cache| D2
    A2 -->|Subscribe| D2
    A1 -->|Queue| S1
    A1 -->|Queue| S2
    C1 -->|Track| S3
```

## User Preference Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client
    participant A as API
    participant DB as Database
    participant S as Services

    U->>C: Update Preferences
    C->>A: PUT /api/preferences
    A->>DB: Save Preferences
    A-->>S: Update Services
    S-->>DB: Confirm Update
    A-->>C: Success Response
    C-->>U: Show Confirmation
```

## Analytics Flow

```mermaid
flowchart TD
    A[User Action] -->|Track| B[Analytics Event]
    B --> C{Event Type}
    C -->|View| D[Track View]
    C -->|Click| E[Track Click]
    C -->|Action| F[Track Action]
    D --> G[Process Event]
    E --> G
    F --> G
    G --> H[Store Event]
    G --> I[Real-time Dashboard]
    H --> J[Generate Reports]
```
