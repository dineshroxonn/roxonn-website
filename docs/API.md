# API Documentation

## Overview

Roxonn's API is built using Next.js API routes with TypeScript. This document outlines the available endpoints and their usage.

## Authentication

All authenticated endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### GitHub OAuth

```
GET /api/auth/github
```

Initiates GitHub OAuth flow

```
GET /api/auth/callback/github
```

Handles GitHub OAuth callback

### User Management

#### Get User Profile

```
GET /api/user/profile
```

Returns authenticated user's profile

Response:

```typescript
interface UserProfile {
  id: string;
  username: string;
  email: string;
  points: number;
  contributions: number;
  joinedAt: string;
}
```

### Contributions

#### List Contributions

```
GET /api/contributions
```

Lists user's contributions

Query Parameters:

- `page`: number (default: 1)
- `limit`: number (default: 10)
- `status`: 'pending' | 'approved' | 'rejected'

#### Submit Contribution

```
POST /api/contributions
```

Submit a new contribution

Request Body:

```typescript
interface ContributionSubmission {
  title: string;
  description: string;
  repositoryUrl: string;
  pullRequestUrl: string;
  type: 'code' | 'documentation' | 'testing' | 'design';
}
```

### Points System

#### Get Point Balance

```
GET /api/points/balance
```

Returns user's current point balance

#### Lock Points

```
POST /api/points/lock
```

Lock points for rewards

Request Body:

```typescript
interface PointLock {
  amount: number;
  duration: number; // in months
}
```

### Governance

#### List Proposals

```
GET /api/governance/proposals
```

Lists active governance proposals

#### Submit Vote

```
POST /api/governance/vote
```

Submit vote on a proposal

Request Body:

```typescript
interface Vote {
  proposalId: string;
  vote: 'yes' | 'no' | 'abstain';
  weight: number;
}
```

## Error Handling

### Error Responses

All API errors follow this format:

```typescript
interface ApiError {
  code: string;
  message: string;
  details?: any;
}
```

### Common Error Codes

- `AUTH_REQUIRED`: Authentication required
- `INVALID_TOKEN`: Invalid authentication token
- `NOT_FOUND`: Resource not found
- `VALIDATION_ERROR`: Invalid request data
- `RATE_LIMITED`: Too many requests

## Rate Limiting

- 100 requests per minute per IP
- 1000 requests per hour per user

## Webhooks

Coming soon - will support notifications for:

- Contribution status changes
- Point transactions
- Governance events

## Development Guidelines

### Testing

- Write tests for all endpoints
- Use supertest for integration testing
- Mock external services

### Security

- Validate all inputs
- Sanitize responses
- Use proper authentication
- Implement rate limiting

### Performance

- Cache responses where appropriate
- Use database indexes
- Implement pagination

### Monitoring

- Log all errors
- Track response times
- Monitor rate limits
