# Auth / Sync / Trust Doctrine

## Overview

The VR4Deaf platform is built on three foundational services that ensure consistent, trustworthy handling of user identity and accommodations across all systems.

## DeafAUTH (AUTH - Source of Truth)

### Purpose
DeafAUTH is the authoritative source for user identity, disabilities/access needs, accommodations profiles, and consents.

### Principle
**"If it's about who this person is and what accommodations they're entitled to, DeafAUTH is authoritative."**

### Implementation
- **Technology**: Supabase OAuth
- **Location**: `/app/api/deafauth/`
- **Data Owned**:
  - User identity (email, name, ID)
  - Disability declarations
  - Access needs and preferences
  - Accommodations profile (visual needs, ASL preference, captioning requirements)
  - User consents and permissions

### Key Responsibilities
1. **Authentication**: OAuth flows for user login/logout
2. **Profile Management**: CRUD operations for user accommodations
3. **Consent Management**: Track user permissions and data sharing consents
4. **Authoritative Source**: All downstream systems read from DeafAUTH, never write

### API Endpoints
- `GET /api/deafauth` - Get current authenticated user
- `POST /api/deafauth` - Login/logout actions
- `GET /api/deafauth/profile` - Get user profile and accommodations
- `PUT /api/deafauth/profile` - Update profile and accommodations

## PinkSync (SYNC - Synchronizer)

### Purpose
PinkSync reads from DeafAUTH and pushes settings, flags, roles, and profiles to all downstream systems.

### Principle
**"When accommodations change in DeafAUTH, PinkSync ensures every connected system knows about it."**

### Implementation
- **Location**: `/app/api/pinksync/`
- **Pattern**: Event-driven synchronization

### Key Responsibilities
1. **Event Propagation**: Listen for changes in DeafAUTH, broadcast to subscribers
2. **Conflict Resolution**: When conflicts occur, DeafAUTH always wins
3. **System Integration**: Maintain connections to all downstream systems
4. **Retry Logic**: Ensure eventual consistency across all systems

### How It Works
```
DeafAUTH (User updates accommodations)
    ↓
PinkSync (Detects change event)
    ↓
Broadcast to all subscribers:
    - Magicians (Job, Business, Developer, Creative)
    - Agency systems
    - External integrations (VR agencies, employers)
    - Notification system
```

### Sync Events
- `user_updated` - Basic user information changed
- `accommodations_changed` - Accessibility needs updated
- `pathway_updated` - User changed pathways
- `resource_added` - New resource relevant to user

### API Endpoints
- `GET /api/pinksync` - Get sync status
- `POST /api/pinksync` - Trigger manual sync event

## FibonRose (TRUST - Accountability)

### Purpose
FibonRose watches the system and marks which entities honor accommodations, logs events, and produces trust signals/badges.

### Principle
**"Trust is earned through consistent accommodation compliance and verified through transparent logging."**

### Implementation
- **Location**: `/app/api/fibonrose/`
- **Pattern**: Observability and accountability logging

### Key Responsibilities
1. **Event Logging**: Record all accommodation-related events
2. **Compliance Tracking**: Monitor whether accommodations were honored
3. **Trust Scoring**: Calculate trust scores for agencies, employers, services
4. **Badge System**: Award badges for consistent compliance
5. **Reporting**: Generate trust reports and visualizations

### Trust Events
```typescript
interface TrustEvent {
  entityId: string;           // Agency, employer, or service ID
  entityType: string;          // 'agency' | 'employer' | 'service'
  eventType: string;           // Event classification
  accommodationsHonored: boolean;
  details: Record<string, any>;
  timestamp: Date;
}
```

### Trust Score Calculation
- **Base Score**: Starts at 0
- **Positive Events**: +10 points per accommodation honored
- **Negative Events**: -25 points per accommodation violated
- **Consistency Bonus**: +5% for 10+ consecutive positive events
- **Badges**: Awarded at score thresholds (Bronze: 100, Silver: 500, Gold: 1000)

### API Endpoints
- `GET /api/fibonrose` - Get trust events or scores
- `POST /api/fibonrose` - Log a trust event

### Badge System
- **Bronze Badge**: 100+ trust score, 10+ positive events
- **Silver Badge**: 500+ trust score, 50+ positive events, 95% compliance
- **Gold Badge**: 1000+ trust score, 100+ positive events, 98% compliance
- **Platinum Badge**: 2500+ trust score, 250+ positive events, 99% compliance

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        VR4Deaf Platform                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐                                            │
│  │  DeafAUTH    │ ← Source of Truth                          │
│  │  (AUTH)      │   - User Identity                          │
│  └──────┬───────┘   - Accommodations                         │
│         │           - Consents                                │
│         ↓                                                     │
│  ┌──────────────┐                                            │
│  │  PinkSync    │ ← Synchronizer                             │
│  │  (SYNC)      │   - Event Distribution                     │
│  └──────┬───────┘   - Conflict Resolution                    │
│         │           - System Integration                      │
│         ↓                                                     │
│  ┌──────────────────────────────────────┐                    │
│  │  Downstream Systems                  │                    │
│  ├──────────────────────────────────────┤                    │
│  │  • Job Magician                      │                    │
│  │  • Business Magician                 │                    │
│  │  • Developer Magician                │                    │
│  │  • Creative Magician                 │                    │
│  │  • Agency Systems                    │                    │
│  │  • Notification System               │                    │
│  └──────────────────────────────────────┘                    │
│         │                                                     │
│         ↓                                                     │
│  ┌──────────────┐                                            │
│  │  FibonRose   │ ← Accountability                           │
│  │  (TRUST)     │   - Event Logging                          │
│  └──────────────┘   - Trust Scoring                          │
│                      - Badge Awards                           │
└─────────────────────────────────────────────────────────────┘
```

## Integration Guidelines

### For New System Integrations

When integrating a new system into the VR4Deaf ecosystem:

1. **Read from DeafAUTH**: Always fetch user accommodations from DeafAUTH
2. **Subscribe to PinkSync**: Register for sync events to stay updated
3. **Log to FibonRose**: Report accommodation compliance events
4. **Never Override**: Don't create local copies of accommodation data

### Example Integration Flow

```javascript
// 1. Get user accommodations from DeafAUTH
const user = await fetch('/api/deafauth/profile').then(r => r.json());

// 2. Subscribe to changes via PinkSync
// (WebSocket or webhook integration)

// 3. Apply accommodations in your system
applyAccessibilitySettings(user.accommodations);

// 4. Log compliance to FibonRose
await fetch('/api/fibonrose', {
  method: 'POST',
  body: JSON.stringify({
    entityId: 'your_system_id',
    entityType: 'service',
    eventType: 'accommodation_honored',
    accommodationsHonored: true,
    details: { setting: 'visual_alerts', applied: true }
  })
});
```

## Security Considerations

1. **DeafAUTH Security**:
   - OAuth 2.0 with PKCE flow
   - JWT tokens with short expiration
   - Supabase RLS (Row Level Security) policies

2. **PinkSync Security**:
   - Event verification with signatures
   - Rate limiting on sync triggers
   - Idempotent event processing

3. **FibonRose Security**:
   - Immutable event logs
   - Access controls on trust scores
   - Audit trail for all compliance events

## Future Enhancements

- **Real-time Sync**: WebSocket connections for instant updates
- **Conflict Resolution UI**: Administrative interface for manual conflict resolution
- **Trust Marketplace**: Public directory of high-trust agencies/employers
- **Automated Compliance Testing**: Synthetic tests to verify accommodation compliance
