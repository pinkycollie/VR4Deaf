# GROW Phase Specification

## Overview

GROW (Guided Resourceful Opportunity Workflow) is the operational framework that governs how the VR4Deaf platform delivers personalized, constrained, and effective pathway recommendations. It ensures that AI-driven guidance remains practical, accessible, and aligned with user goals and VR funding opportunities.

## Core Principles

1. **Guided**: Every recommendation is based on structured pathways, not arbitrary suggestions
2. **Resourceful**: All recommendations reference actual, tagged resources from the directory
3. **Opportunity**: Focus on opportunities with VR coverage and accessibility
4. **Workflow**: Emphasis on actionable next steps, not endless exploration

## PathwayProfile Schema

Every client has a PathwayProfile that tracks their current state:

```typescript
interface PathwayProfile {
  clientId: string;
  pathwayType: 'job' | 'business' | 'developer' | 'creative';
  pathwayStage: PathwayStage;
  goals: string[];
  accommodationsProfile: AccommodationsProfile;
  vrStatus?: string;
  createdAt: Date;
  updatedAt: Date;
}

type PathwayStage = 
  // Job Magician stages
  | 'explore' | 'prepare' | 'search' | 'apply' | 'onboard' | 'maintain' | 'grow' | 'transition'
  // Business Magician stages
  | 'idea' | 'validate' | 'startup' | 'established' | 'scale' | 'exit'
  // Developer Magician stages
  | 'beginner' | 'frontend' | 'backend' | 'fullstack' | 'platform' | 'ai' | 'owner'
  // Creative Magician stages
  | 'spark' | 'craft' | 'audience' | 'income' | 'business' | 'pivot';

interface AccommodationsProfile {
  visualNeeds: boolean;
  aslPreferred: boolean;
  captioningRequired: boolean;
  visualAlerts: boolean;
  customNeeds?: string[];
}
```

## Resource Tagging Schema

All resources in the directory must be tagged to enable Magician filtering:

```typescript
interface Resource {
  id: string;
  title: string;
  description: string;
  pathwayTypes: PathwayType[];        // Which pathways this resource serves
  stages: PathwayStage[];             // Which stages this resource is relevant for
  vrCoverage: boolean;                // Whether VR funding can cover this
  accessTags: AccessTag[];            // Accessibility features
  url?: string;                       // Link to resource
  provider?: string;                  // Resource provider name
  cost?: number;                      // Cost if not VR covered
  durationHours?: number;             // Estimated time commitment
  createdAt: Date;
  updatedAt: Date;
}

type AccessTag =
  | 'asl-available'        // ASL interpretation provided
  | 'visual-friendly'      // Highly visual content
  | 'captioning-included'  // Video captions available
  | 'deaf-led'             // Deaf-owned/operated
  | 'remote-accessible'    // Can be accessed remotely
  | 'text-based'           // Text-heavy, good for reading
  | 'low-barrier'          // Low prerequisites
  | 'high-support'         // Intensive support provided
  | 'peer-network'         // Includes peer community
  | 'hands-on';            // Practical/experiential learning
```

## AI Behavior Constraints

### Constraint 1: Max 3-5 Next Steps

**Rule**: Every recommendation set must contain 3-5 actionable next steps, no more, no less.

**Rationale**: 
- Too few options limit choice and flexibility
- Too many options cause decision paralysis
- 3-5 is the sweet spot for actionable guidance

**Implementation**:
```typescript
function getRecommendations(profile: PathwayProfile): Resource[] {
  const candidates = filterByPathwayAndStage(profile);
  const accessible = filterByAccommodations(candidates, profile.accommodationsProfile);
  const vrPrioritized = sortByVRCoverage(accessible);
  
  // GROW constraint: Return exactly 3-5 items
  const recommendations = vrPrioritized.slice(0, 5);
  
  if (recommendations.length < 3) {
    // Log warning: Not enough resources for this stage
    console.warn(`Insufficient resources for ${profile.pathwayType}/${profile.pathwayStage}`);
  }
  
  return recommendations;
}
```

### Constraint 2: Pre-filtered Candidates Only

**Rule**: All recommendations must come from the tagged resource directory. No arbitrary or AI-generated suggestions.

**Rationale**:
- Ensures quality control and vetting
- Guarantees accessibility features are verified
- Enables VR funding coordination
- Provides accountability (FibonRose can track resources)

**Implementation**:
```typescript
// ❌ WRONG: AI generates arbitrary suggestion
function getRecommendations_WRONG(profile: PathwayProfile) {
  return {
    title: "Learn Python online",  // Where? Which course? Is it accessible?
    description: "Python is a great language for beginners"
  };
}

// ✅ RIGHT: Select from pre-tagged resources
function getRecommendations_RIGHT(profile: PathwayProfile) {
  const resources = database.resources.find({
    pathwayTypes: { $in: [profile.pathwayType] },
    stages: { $in: [profile.pathwayStage] },
    accessTags: { $all: getRequiredAccessTags(profile.accommodationsProfile) }
  });
  
  return resources.map(r => ({
    id: r.id,
    title: r.title,
    description: r.description,
    vrCoverage: r.vrCoverage,
    accessTags: r.accessTags,
    url: r.url
  }));
}
```

### Constraint 3: No New Pathways Without Explicit Opt-in

**Rule**: Magicians cannot suggest switching pathways unless the user explicitly requests pathway exploration.

**Rationale**:
- Respects user autonomy and goals
- Prevents overwhelming users with too many options
- Maintains focus on current pathway
- Avoids second-guessing user's initial choice

**Implementation**:
```typescript
// ❌ WRONG: Unsolicited pathway switch
function handleUserStruggles_WRONG(profile: PathwayProfile) {
  if (profile.struggles > 3) {
    return {
      message: "It seems like the job pathway isn't working. Have you considered business?",
      newPathway: 'business'  // Don't do this!
    };
  }
}

// ✅ RIGHT: Offer to explore alternatives with permission
function handleUserStruggles_RIGHT(profile: PathwayProfile) {
  if (profile.struggles > 3) {
    return {
      message: "I notice you're facing challenges. Would you like to:",
      options: [
        "Continue with adjusted strategy in current pathway",
        "Explore alternative pathways (requires new assessment)"
      ],
      requiresUserChoice: true
    };
  }
}
```

### Constraint 4: VR Coverage Prioritization

**Rule**: When multiple resources are available, prioritize those with VR funding coverage.

**Rationale**:
- Reduces financial barriers
- Increases completion rates
- Aligns with VR mission
- Maximizes public investment impact

**Implementation**:
```typescript
function sortByVRCoverage(resources: Resource[]): Resource[] {
  return resources.sort((a, b) => {
    // VR-covered resources first
    if (a.vrCoverage && !b.vrCoverage) return -1;
    if (!a.vrCoverage && b.vrCoverage) return 1;
    
    // Then by cost (lower first)
    if (a.cost !== b.cost) return (a.cost || 0) - (b.cost || 0);
    
    // Then by accessibility (more tags = better)
    return b.accessTags.length - a.accessTags.length;
  });
}
```

### Constraint 5: Accommodation Compliance Verification

**Rule**: All recommended resources must match user's accessibility requirements.

**Rationale**:
- Ensures usability and completion
- Honors user accommodations
- Prevents wasted time and frustration
- Supports FibonRose trust scoring

**Implementation**:
```typescript
function filterByAccommodations(
  resources: Resource[],
  accommodations: AccommodationsProfile
): Resource[] {
  return resources.filter(resource => {
    // If user needs ASL, resource must have ASL
    if (accommodations.aslPreferred && !resource.accessTags.includes('asl-available')) {
      return false;
    }
    
    // If user needs captions, resource must have captions
    if (accommodations.captioningRequired && !resource.accessTags.includes('captioning-included')) {
      return false;
    }
    
    // If user needs visual learning, prioritize visual-friendly
    if (accommodations.visualNeeds && !resource.accessTags.includes('visual-friendly')) {
      // Don't exclude, but deprioritize
      resource.priority = (resource.priority || 0) - 10;
    }
    
    return true;
  });
}
```

## Workflow Examples

### Example 1: Job Seeker - Explore Stage

**User**: Deaf individual interested in employment, just starting  
**PathwayProfile**:
```json
{
  "clientId": "user_123",
  "pathwayType": "job",
  "pathwayStage": "explore",
  "goals": ["Find stable employment", "Use my visual skills"],
  "accommodationsProfile": {
    "visualNeeds": true,
    "aslPreferred": true,
    "captioningRequired": false,
    "visualAlerts": true
  },
  "vrStatus": "eligible"
}
```

**Query to Resource Directory**:
```typescript
database.resources.find({
  pathwayTypes: { $in: ['job'] },
  stages: { $in: ['explore'] },
  accessTags: { $all: ['asl-available', 'visual-friendly'] },
  vrCoverage: true
}).limit(5)
```

**Returned Recommendations** (3-5 items):
1. **VR Career Assessment** - VR-covered, ASL available, visual-friendly
2. **O*NET Interest Profiler** - Free, visual-friendly, remote-accessible
3. **Deaf Job Seeker Workshop** - VR-covered, deaf-led, peer-network
4. **Visual Strengths Inventory** - VR-covered, visual-friendly
5. **Job Shadow Program** - VR-covered, hands-on, high-support

### Example 2: Developer - Frontend Stage

**User**: Deaf developer learning React  
**PathwayProfile**:
```json
{
  "clientId": "user_456",
  "pathwayType": "developer",
  "pathwayStage": "frontend",
  "goals": ["Build interactive web apps", "Get hired as frontend developer"],
  "accommodationsProfile": {
    "visualNeeds": true,
    "aslPreferred": false,
    "captioningRequired": true,
    "visualAlerts": false
  },
  "vrStatus": "in_service"
}
```

**Query**:
```typescript
database.resources.find({
  pathwayTypes: { $in: ['developer'] },
  stages: { $in: ['frontend'] },
  accessTags: { $all: ['captioning-included', 'visual-friendly'] }
}).sort({ vrCoverage: -1 }).limit(5)
```

**Returned Recommendations**:
1. **React Course with Captions** - VR-covered, captioning-included, visual-friendly
2. **Frontend Project Portfolio** - Free, visual-friendly, hands-on
3. **Accessible UI Components Library** - Free, visual-friendly, text-based
4. **React Developer Mentorship** - VR-covered, high-support, peer-network

(Note: Only 4 results because not enough matching resources; system should log this gap)

### Example 3: Creative - Audience Stage

**User**: Deaf YouTuber growing channel  
**PathwayProfile**:
```json
{
  "clientId": "user_789",
  "pathwayType": "creative",
  "pathwayStage": "audience",
  "goals": ["Grow to 10k subscribers", "Build Deaf audience"],
  "accommodationsProfile": {
    "visualNeeds": true,
    "aslPreferred": true,
    "captioningRequired": false,
    "visualAlerts": false
  }
}
```

**Query**:
```typescript
database.resources.find({
  pathwayTypes: { $in: ['creative'] },
  stages: { $in: ['audience'] },
  accessTags: { $in: ['asl-available', 'visual-friendly', 'deaf-led'] }
}).limit(5)
```

**Returned Recommendations**:
1. **Deaf Creator SEO Workshop** - VR-covered, deaf-led, asl-available
2. **ASL Content Optimization Guide** - Free, text-based, deaf-led
3. **Cross-Platform Growth Strategy** - Paid ($99), visual-friendly
4. **Deaf Influencer Network** - Free, peer-network, deaf-led
5. **Analytics for Visual Content** - Free, visual-friendly, remote-accessible

## Database Schema

### PathwayProfiles Collection
```typescript
{
  _id: ObjectId,
  clientId: string,           // References User
  pathwayType: string,
  pathwayStage: string,
  goals: string[],
  accommodationsProfile: {
    visualNeeds: boolean,
    aslPreferred: boolean,
    captioningRequired: boolean,
    visualAlerts: boolean,
    customNeeds: string[]
  },
  vrStatus: string,
  progress: {
    completedResources: string[],  // Resource IDs
    currentResources: string[],
    stageStartDate: Date,
    daysInStage: number
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Resources Collection
```typescript
{
  _id: ObjectId,
  id: string,
  title: string,
  description: string,
  pathwayTypes: string[],
  stages: string[],
  vrCoverage: boolean,
  accessTags: string[],
  url: string,
  provider: string,
  cost: number,
  durationHours: number,
  trustScore: number,         // From FibonRose
  completionRate: number,
  createdAt: Date,
  updatedAt: Date
}
```

## Monitoring and Analytics

### Key Metrics

1. **Recommendation Coverage**: Percentage of stage/accommodation combinations with 3+ resources
2. **Completion Rates**: How often users complete recommended resources
3. **VR Funding Utilization**: Percentage of recommendations that are VR-covered
4. **Accommodation Match Rate**: How well resources match user needs
5. **Pathway Switching Rate**: How often users change pathways (should be low)

### Alerts

- **Insufficient Resources**: Alert when any stage has < 3 matching resources
- **Low Completion**: Alert when resource completion rate < 50%
- **Accessibility Gaps**: Alert when accommodation combinations have no matching resources
- **VR Coverage Decline**: Alert when VR-covered recommendations drop below target

## Future Enhancements

- **Dynamic Staging**: AI-driven stage transitions based on progress
- **Personalized Sequencing**: Order recommendations based on user preferences and history
- **Cohort Learning**: Group users at similar stages for peer support
- **Outcome Tracking**: Measure long-term success (employment, business revenue, etc.)
- **Resource Marketplace**: Allow providers to submit resources for review and tagging
