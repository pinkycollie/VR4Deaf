# API Integration Guide

## Overview

This document provides detailed information about integrating with the VR4DEAF platform APIs, including endpoint specifications, authentication patterns, and integration examples.

## Base URLs

- **API Gateway:** `https://api.vr4deaf.org`
- **AI Tools:** `https://aitools.vr4deaf.org`
- **WebSocket:** `wss://ws.vr4deaf.org`

## Authentication

### Token-Based Authentication

All authenticated API requests require a Bearer token in the Authorization header:

```typescript
const response = await fetch('https://api.vr4deaf.org/v1/clients/me', {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
});
```

### Authentication Flow

```typescript
// 1. Login to get access token
const loginResponse = await fetch('https://api.vr4deaf.org/v1/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123',
  }),
});

const { accessToken, refreshToken, user } = await loginResponse.json();

// 2. Store tokens securely
sessionStorage.setItem('accessToken', accessToken);
localStorage.setItem('refreshToken', refreshToken);

// 3. Refresh token when expired
const refreshResponse = await fetch('https://api.vr4deaf.org/v1/auth/refresh', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ refreshToken }),
});

const { accessToken: newToken } = await refreshResponse.json();
```

## API Endpoints

### Authentication Endpoints

#### POST /v1/auth/login
Login with email and password.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "role": "client",
    "profile": { ... }
  }
}
```

#### POST /v1/auth/register
Register a new user account.

**Request:**
```json
{
  "email": "newuser@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "client"
}
```

#### POST /v1/auth/refresh
Refresh an expired access token.

**Request:**
```json
{
  "refreshToken": "eyJhbGc..."
}
```

### Client Endpoints

#### GET /v1/clients/me
Get current authenticated client profile.

**Response:**
```json
{
  "id": "client_123",
  "email": "client@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "address": { ... },
  "assessments": [ ... ],
  "trainingPrograms": [ ... ],
  "applications": [ ... ]
}
```

#### PUT /v1/clients/me
Update current client profile.

**Request:**
```json
{
  "phone": "+1987654321",
  "address": {
    "street": "123 Main St",
    "city": "Austin",
    "state": "TX",
    "zip": "78701"
  }
}
```

#### GET /v1/clients/{id}/assessments
Get client assessment history.

**Response:**
```json
{
  "assessments": [
    {
      "id": "assessment_123",
      "type": "skills",
      "completedAt": "2024-12-01T10:00:00Z",
      "results": {
        "technicalSkills": 75,
        "communication": 85,
        "problemSolving": 70
      },
      "recommendations": [ ... ]
    }
  ]
}
```

### Job Endpoints

#### GET /v1/jobs
Search and filter job postings.

**Query Parameters:**
- `keyword` - Search term
- `location` - City or state
- `type` - Job type (full_time, part_time, contract)
- `salary_min` - Minimum salary
- `page` - Page number
- `per_page` - Results per page (max 100)

**Response:**
```json
{
  "jobs": [
    {
      "id": "job_123",
      "title": "Administrative Assistant",
      "company": "ABC Corporation",
      "location": "Austin, TX",
      "type": "full_time",
      "salary": {
        "min": 35000,
        "max": 45000,
        "currency": "USD"
      },
      "description": "...",
      "requirements": [ ... ],
      "postedAt": "2024-12-10T08:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 156,
    "total_pages": 8
  }
}
```

#### GET /v1/jobs/{id}
Get detailed job posting information.

#### POST /v1/jobs/{id}/apply
Submit a job application.

**Request:**
```json
{
  "resumeUrl": "https://storage.vr4deaf.org/resumes/client_123.pdf",
  "coverLetter": "I am excited to apply...",
  "customAnswers": {
    "question1": "Answer to custom question 1",
    "question2": "Answer to custom question 2"
  }
}
```

#### GET /v1/jobs/recommendations
Get AI-powered job recommendations for current user.

**Response:**
```json
{
  "recommendations": [
    {
      "job": { ... },
      "matchScore": 92,
      "reasons": [
        "Skills match: Technical writing, MS Office",
        "Experience level: 2-3 years preferred",
        "Location: Austin area"
      ]
    }
  ]
}
```

### Assessment Endpoints

#### POST /v1/assessments/start
Start a new assessment.

**Request:**
```json
{
  "type": "skills",
  "category": "technical"
}
```

**Response:**
```json
{
  "assessmentId": "assessment_456",
  "questions": [
    {
      "id": "q1",
      "text": "Rate your proficiency in Microsoft Excel",
      "type": "scale",
      "options": [1, 2, 3, 4, 5]
    }
  ]
}
```

#### POST /v1/assessments/{id}/submit
Submit assessment answers.

**Request:**
```json
{
  "answers": [
    { "questionId": "q1", "answer": 4 },
    { "questionId": "q2", "answer": 3 }
  ]
}
```

#### GET /v1/assessments/{id}/results
Get assessment results.

**Response:**
```json
{
  "id": "assessment_456",
  "status": "completed",
  "scores": {
    "technicalSkills": 78,
    "communication": 85,
    "problemSolving": 72
  },
  "recommendations": [
    "Consider Microsoft Office Specialist certification",
    "Explore IT support roles"
  ],
  "careerPaths": [ ... ]
}
```

### Training Endpoints

#### GET /v1/training/programs
Get available training programs.

**Response:**
```json
{
  "programs": [
    {
      "id": "program_123",
      "title": "Microsoft Office Specialist",
      "provider": "Texas Workforce Solutions",
      "duration": "40 hours",
      "format": "online",
      "cost": 0,
      "prerequisites": [],
      "modules": [ ... ]
    }
  ]
}
```

#### POST /v1/training/programs/{id}/enroll
Enroll in a training program.

**Response:**
```json
{
  "enrollmentId": "enrollment_789",
  "programId": "program_123",
  "status": "enrolled",
  "startDate": "2024-12-20",
  "expectedCompletionDate": "2025-01-31"
}
```

#### GET /v1/training/progress
Get training progress for current user.

**Response:**
```json
{
  "enrollments": [
    {
      "program": { ... },
      "progress": 65,
      "completedModules": 13,
      "totalModules": 20,
      "lastActivityAt": "2024-12-15T14:30:00Z"
    }
  ]
}
```

### Messaging Endpoints

#### GET /v1/messages/conversations
Get list of message conversations.

**Response:**
```json
{
  "conversations": [
    {
      "id": "conv_123",
      "participant": {
        "id": "specialist_456",
        "name": "Sarah Johnson",
        "role": "job_specialist"
      },
      "lastMessage": {
        "text": "I've scheduled your assessment for tomorrow",
        "sentAt": "2024-12-15T16:45:00Z"
      },
      "unreadCount": 2
    }
  ]
}
```

#### GET /v1/messages/conversations/{id}
Get messages in a conversation.

**Response:**
```json
{
  "messages": [
    {
      "id": "msg_789",
      "senderId": "specialist_456",
      "text": "How did your interview go?",
      "sentAt": "2024-12-15T10:00:00Z",
      "read": true
    }
  ]
}
```

#### POST /v1/messages/conversations/{id}/messages
Send a new message.

**Request:**
```json
{
  "text": "It went really well! Thank you for the preparation tips."
}
```

## AI Tools API

### Career Matching

#### POST /ai/v1/match-jobs
Get AI-powered job matches based on profile.

**Request:**
```json
{
  "clientId": "client_123",
  "preferences": {
    "location": "Austin, TX",
    "remote": true,
    "minSalary": 40000
  }
}
```

**Response:**
```json
{
  "matches": [
    {
      "job": { ... },
      "score": 95,
      "reasoning": {
        "skillsMatch": 92,
        "experienceMatch": 90,
        "locationMatch": 100,
        "culturalFit": 88
      }
    }
  ]
}
```

### Skills Analysis

#### POST /ai/v1/analyze-skills
Analyze skills from assessment data.

**Request:**
```json
{
  "assessmentId": "assessment_456",
  "resume": "base64_encoded_resume_content"
}
```

**Response:**
```json
{
  "identifiedSkills": [
    { "name": "Microsoft Excel", "level": "intermediate" },
    { "name": "Customer Service", "level": "advanced" }
  ],
  "skillGaps": [
    { "name": "Data Analysis", "importance": "high" }
  ],
  "recommendations": [ ... ]
}
```

### Resume Optimization

#### POST /ai/v1/optimize-resume
Optimize resume for specific job posting.

**Request:**
```json
{
  "resume": "base64_encoded_resume",
  "jobId": "job_123"
}
```

**Response:**
```json
{
  "suggestions": [
    {
      "section": "summary",
      "current": "Experienced professional...",
      "suggested": "Detail-oriented administrative professional with 3+ years...",
      "reason": "Matches job requirements more closely"
    }
  ],
  "keywordMatch": 78,
  "overallScore": 85
}
```

## WebSocket API

### Connection

```typescript
const ws = new WebSocket('wss://ws.vr4deaf.org?token=ACCESS_TOKEN');

ws.onopen = () => {
  console.log('Connected to WebSocket');
  
  // Subscribe to notifications
  ws.send(JSON.stringify({
    type: 'subscribe',
    channel: 'notifications'
  }));
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  
  switch (message.type) {
    case 'notification':
      handleNotification(message.payload);
      break;
    case 'message':
      handleChatMessage(message.payload);
      break;
    case 'update':
      handleDataUpdate(message.payload);
      break;
  }
};
```

### Message Types

#### Notification
```json
{
  "type": "notification",
  "payload": {
    "id": "notif_123",
    "title": "New Job Match",
    "message": "A new job matching your profile has been posted",
    "priority": "high",
    "actionUrl": "/client/jobs/job_789"
  }
}
```

#### Chat Message
```json
{
  "type": "message",
  "payload": {
    "conversationId": "conv_123",
    "senderId": "specialist_456",
    "text": "Let's schedule a follow-up call",
    "sentAt": "2024-12-15T14:30:00Z"
  }
}
```

#### Data Update
```json
{
  "type": "update",
  "payload": {
    "entity": "application",
    "entityId": "app_789",
    "action": "status_changed",
    "data": {
      "status": "interview_scheduled",
      "interviewDate": "2024-12-20T10:00:00Z"
    }
  }
}
```

## Error Handling

### Error Response Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### Common Error Codes

- `UNAUTHORIZED` (401) - Missing or invalid authentication token
- `FORBIDDEN` (403) - Insufficient permissions for requested resource
- `NOT_FOUND` (404) - Requested resource does not exist
- `VALIDATION_ERROR` (400) - Invalid input data
- `RATE_LIMIT_EXCEEDED` (429) - Too many requests
- `INTERNAL_ERROR` (500) - Server error

### Error Handling Example

```typescript
async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`https://api.vr4deaf.org${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${getAccessToken()}`,
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      
      if (response.status === 401) {
        // Token expired, try to refresh
        await refreshToken();
        return apiRequest(endpoint, options); // Retry
      }
      
      throw new APIError(error.error.code, error.error.message);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError('NETWORK_ERROR', 'Failed to connect to API');
  }
}
```

## Rate Limiting

### Rate Limit Headers

All API responses include rate limiting information:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1639584000
```

### Rate Limits by Endpoint Type

- **Authentication:** 5 requests per minute
- **Read Operations:** 100 requests per minute
- **Write Operations:** 30 requests per minute
- **AI Operations:** 20 requests per minute

## Pagination

### Request Parameters

```
GET /v1/jobs?page=2&per_page=50
```

### Response Format

```json
{
  "data": [ ... ],
  "pagination": {
    "page": 2,
    "per_page": 50,
    "total": 234,
    "total_pages": 5,
    "has_next": true,
    "has_prev": true
  }
}
```

## Webhooks

### Registering Webhooks

```typescript
POST /v1/webhooks/register
{
  "url": "https://yourapp.com/webhooks/vr4deaf",
  "events": [
    "job.matched",
    "application.status_changed",
    "training.completed",
    "assessment.completed"
  ],
  "secret": "your_webhook_secret"
}
```

### Webhook Payload

```json
{
  "event": "application.status_changed",
  "timestamp": "2024-12-15T14:30:00Z",
  "data": {
    "applicationId": "app_789",
    "jobId": "job_123",
    "oldStatus": "submitted",
    "newStatus": "interview_scheduled",
    "scheduledFor": "2024-12-20T10:00:00Z"
  }
}
```

### Signature Verification

```typescript
import crypto from 'crypto';

function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}
```

## SDK Examples

### TypeScript/JavaScript

```typescript
import { VR4DeafClient } from '@vr4deaf/api-client';

const client = new VR4DeafClient({
  apiKey: process.env.VR4DEAF_API_KEY,
  baseURL: 'https://api.vr4deaf.org',
});

// Get client profile
const profile = await client.clients.getProfile();

// Search jobs
const jobs = await client.jobs.search({
  keyword: 'administrative',
  location: 'Austin, TX',
  type: 'full_time',
});

// Apply to job
const application = await client.jobs.apply(jobId, {
  resumeUrl: 'https://example.com/resume.pdf',
  coverLetter: 'I am interested in...',
});
```

### Python

```python
from vr4deaf import VR4DeafClient

client = VR4DeafClient(
    api_key=os.environ['VR4DEAF_API_KEY'],
    base_url='https://api.vr4deaf.org'
)

# Get client profile
profile = client.clients.get_profile()

# Search jobs
jobs = client.jobs.search(
    keyword='administrative',
    location='Austin, TX',
    type='full_time'
)

# Apply to job
application = client.jobs.apply(
    job_id,
    resume_url='https://example.com/resume.pdf',
    cover_letter='I am interested in...'
)
```

## Testing

### Test Environment

- **Base URL:** `https://api-staging.vr4deaf.org`
- **Test Credentials:** Available upon request

### Mock Server

For local development, use the mock server:

```bash
npm install -g @vr4deaf/mock-api
vr4deaf-mock-api --port 3001
```

## Support

For API support:
- **Documentation:** https://api.vr4deaf.org/docs
- **Email:** api-support@vr4deaf.org
- **Developer Forum:** https://forum.vr4deaf.org

---

**Last Updated:** December 2024
