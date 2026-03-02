# Magician Taxonomy

## Overview

The Four Magicians are distributed system agents that orchestrate complex, multi-stage pathways for Deaf individuals. Each Magician specializes in a distinct career trajectory and coordinates multiple services, resources, and accommodations to guide users from initial exploration to long-term success.

## Design Philosophy

### Distributed System Agents
Magicians are **not** simple recommendation engines or chatbots. They are:
- **Stateful orchestrators** that track user progress across stages
- **Multi-system coordinators** that integrate VR agencies, workforce systems, and external services
- **Accommodation-aware** agents that ensure accessibility at every step
- **Goal-oriented** systems that optimize for long-term outcomes

### GROW Phase Constraints
All Magicians operate under GROW (Guided Resourceful Opportunity Workflow) phase constraints:
- **Max 3-5 next steps** per recommendation
- **Pre-filtered candidates only** from tagged resource directory
- **No new pathways** without explicit user opt-in
- **Accommodation compliance** verified via FibonRose
- **VR coverage awareness** to maximize funding opportunities

## The Four Magicians

### 1. Job Magician

**Purpose**: Distributed system agent for the traditional employment pathway. Orchestrates VR services, workforce development, employer relationships, training programs, and accommodations to move someone from job seeker → stable employment → career growth.

**Lifecycle Stages**:
```
Explore/Aim → Prepare → Search/Apply → Onboarding → Maintain/Grow → Stability/Transition
```

**Stage Details**:
1. **Explore/Aim**: Career exploration, interest assessments, goal setting
2. **Prepare**: Skills training, certifications, resume building, interview prep
3. **Search/Apply**: Job search, applications, employer matching, accommodation requests
4. **Onboarding**: New hire process, workplace accommodations setup, orientation
5. **Maintain/Grow**: Job retention, skills development, performance support
6. **Stability/Transition**: Career advancement, job changes, long-term planning

**What Job Magician Orchestrates**:
- **VR Services**: IPE development, counselor coordination, funding authorization
- **Workforce Systems**: Job boards, training programs, employer partnerships
- **Accommodations**: Workplace setup (visual alerts, ASL interpreters, assistive tech)
- **Training Providers**: Skills courses, certifications, apprenticeships
- **Employers**: Job matching, accommodation negotiation, retention support

**API Endpoint**: `/api/magicians/job`

**Key Methods**:
- `GET /api/magicians/job?clientId={id}` - Get pathway status
- `POST /api/magicians/job` with `action: get_recommendations` - Get next steps
- `POST /api/magicians/job` with `action: update_stage` - Transition to next stage

**Example Use Case**:
```
User: "I want to work in hospitality"
Job Magician:
  Stage: Explore/Aim
  Actions:
    1. Connect with VR counselor for assessment
    2. Complete hospitality interest inventory
    3. Shadow Deaf hospitality workers (3 opportunities)
  
  Next Stage: Prepare
  Planned Actions:
    - Enroll in customer service training
    - Get food handler certification
    - Build resume with accessible template
```

### 2. Business Magician

**Purpose**: Distributed system agent for entrepreneurship and self-employment. Orchestrates self-employment supports, small-business tools, revenue streams, and long-term business health for Deaf entrepreneurs.

**Lifecycle Stages**:
```
Idea → Validate/Justify → Startup → Established → Scale or Exit
```

**Stage Details**:
1. **Idea**: Business ideation, market research, feasibility analysis
2. **Validate/Justify**: Business plan, financial projections, VR self-employment approval
3. **Startup**: Entity formation, initial funding, first customers, systems setup
4. **Established**: Revenue stability, operational efficiency, team building
5. **Scale or Exit**: Growth strategies, expansion, or business sale/closure planning

**What Business Magician Orchestrates**:
- **Self-Employment VR Services**: VR self-employment track, business plan approval
- **Small Business Tools**: Accounting software, CRM, accessible business platforms
- **Revenue Streams**: E-commerce, services, consulting, digital products
- **Business Resources**: SCORE mentorship, SBA programs, Deaf entrepreneur networks
- **Funding**: Microloans, grants, crowdfunding, investor connections

**API Endpoint**: `/api/magicians/business`

**Key Methods**:
- `GET /api/magicians/business?clientId={id}` - Get pathway status
- `POST /api/magicians/business` with `action: get_recommendations` - Get business guidance

**Example Use Case**:
```
User: "I want to start a Deaf-owned coffee shop"
Business Magician:
  Stage: Idea
  Actions:
    1. Complete business idea canvas
    2. Connect with Deaf cafe owner for mentorship
    3. Research local coffee shop market (3 accessible reports)
  
  Next Stage: Validate/Justify
  Planned Actions:
    - Develop business plan with VR counselor
    - Create financial projections
    - Apply for VR self-employment track
```

### 3. Developer Magician

**Purpose**: Distributed system agent for technology career growth. Orchestrates learning pathways, tooling, credentials, and project experiences so Deaf developers can ship real systems and build sustainable tech careers.

**Lifecycle Stages**:
```
Curious/Beginner → Frontend → Backend/Full-stack → Platform Builder → AI-accelerated → System Owner
```

**Stage Details**:
1. **Curious/Beginner**: HTML, CSS, JavaScript basics, first projects
2. **Frontend**: React/Vue/Angular, responsive design, accessibility
3. **Backend/Full-stack**: APIs, databases, server-side languages, deployment
4. **Platform Builder**: Cloud infrastructure, DevOps, system architecture
5. **AI-accelerated**: AI tools, copilots, prompt engineering, AI-enhanced development
6. **System Owner**: Technical leadership, open source, consulting, tech entrepreneurship

**What Developer Magician Orchestrates**:
- **Learning Paths**: Structured curriculum from beginner to advanced
- **Tooling**: IDEs with accessibility, screen readers, visual debuggers, AI assistants
- **Credentials**: Certifications, bootcamps, degrees, portfolio building
- **Project Pathways**: Real-world projects, open source contributions, internships
- **Accommodations**: Accessible development tools, visual documentation, ASL tutorials

**API Endpoint**: `/api/magicians/developer`

**Key Methods**:
- `GET /api/magicians/developer?clientId={id}` - Get pathway status
- `POST /api/magicians/developer` with `action: get_recommendations` - Get learning roadmap

**Example Use Case**:
```
User: "I want to become a web developer"
Developer Magician:
  Stage: Curious/Beginner
  Actions:
    1. Complete freeCodeCamp Responsive Web Design
    2. Build 3 portfolio projects (with visual tutorials)
    3. Join Deaf Developers community
  
  Next Stage: Frontend
  Planned Actions:
    - Learn React with accessible video courses
    - Build interactive web app
    - Get feedback from mentor
```

### 4. Creative Magician

**Purpose**: Distributed system agent for creator careers. Orchestrates gear, platforms, audience growth, income models, and accessibility strategies for Deaf influencers, content creators, and creative professionals.

**Lifecycle Stages**:
```
Creative Spark → Craft/Skills → Audience/Presence → Income Pathways → Creative Business → Scale/Pivot/Exit
```

**Stage Details**:
1. **Creative Spark**: Content ideation, niche discovery, initial experiments
2. **Craft/Skills**: Production quality, editing, storytelling, ASL presentation
3. **Audience/Presence**: Platform strategy, consistent posting, community building
4. **Income Pathways**: Monetization (ads, sponsorships, products, services)
5. **Creative Business**: Brand partnerships, product lines, team building
6. **Scale/Pivot/Exit**: Expansion, diversification, or strategic transition

**What Creative Magician Orchestrates**:
- **Gear**: Cameras, lighting, microphones, accessible editing tools
- **Platforms**: YouTube, TikTok, Instagram, Deaf-friendly platforms
- **Audience Growth**: SEO, ASL-optimized content, cross-promotion, accessibility
- **Income Models**: Ad revenue, sponsorships, Patreon, digital products, courses
- **Accessibility**: Captions, ASL interpretation, visual storytelling, Deaf audience engagement

**API Endpoint**: `/api/magicians/creative`

**Key Methods**:
- `GET /api/magicians/creative?clientId={id}` - Get pathway status
- `POST /api/magicians/creative` with `action: get_recommendations` - Get creator guidance

**Example Use Case**:
```
User: "I want to be a Deaf lifestyle YouTuber"
Creative Magician:
  Stage: Creative Spark
  Actions:
    1. Define content niche (3 options: Deaf travel, cooking, fashion)
    2. Create 5 test videos to find voice
    3. Research successful Deaf creators
  
  Next Stage: Craft/Skills
  Planned Actions:
    - Learn video editing with accessible tools
    - Improve ASL presentation style
    - Develop visual storytelling skills
```

## Integration with AUTH-SYNC-TRUST Spine

### DeafAUTH Integration
All Magicians read user accommodations from DeafAUTH:
```javascript
const user = await fetch('/api/deafauth/profile');
const accommodations = user.accommodations;

// Apply accommodations to recommendations
if (accommodations.aslPreferred) {
  filterResourcesByTag('asl-available');
}
if (accommodations.visualNeeds) {
  prioritizeVisualLearningResources();
}
```

### PinkSync Integration
Magicians subscribe to PinkSync events:
```javascript
// When user accommodations change, update pathway recommendations
pinkSyncListener.on('accommodations_changed', (event) => {
  refreshPathwayRecommendations(event.userId);
});
```

### FibonRose Integration
Magicians log to FibonRose when recommendations are followed:
```javascript
// User completes recommended action
await fetch('/api/fibonrose', {
  method: 'POST',
  body: JSON.stringify({
    entityId: resourceId,
    entityType: 'service',
    eventType: 'service_provided',
    accommodationsHonored: true,
    details: { pathway: 'job', stage: 'prepare', action: 'training_completed' }
  })
});
```

## Resource Tagging Schema

All resources in the directory must be tagged for Magician filtering:

```typescript
interface Resource {
  id: string;
  title: string;
  pathwayTypes: ['job' | 'business' | 'developer' | 'creative'];
  stages: PathwayStage[];
  vrCoverage: boolean;
  accessTags: [
    'asl-available',
    'visual-friendly',
    'captioning-included',
    'deaf-led',
    'remote-accessible'
  ];
}
```

**Example Resource**:
```json
{
  "id": "res_123",
  "title": "React Fundamentals Video Course",
  "pathwayTypes": ["developer"],
  "stages": ["frontend"],
  "vrCoverage": true,
  "accessTags": ["asl-available", "captioning-included", "visual-friendly"]
}
```

## AI Behavior Constraints (GROW Phase)

### Max 3-5 Next Steps
```javascript
function getRecommendations(client, stage) {
  const allCandidates = filterResourcesByStage(stage);
  const filtered = applyAccessibilityFilters(allCandidates, client.accommodations);
  const vrPreferred = prioritizeVRCoverage(filtered);
  
  // GROW constraint: Return max 5
  return vrPreferred.slice(0, 5);
}
```

### Pre-filtered Candidates Only
```javascript
// ❌ WRONG: Generate arbitrary recommendations
const recommendation = "You should try learning Python";

// ✅ RIGHT: Select from tagged resource directory
const resources = database.resources.find({
  pathwayTypes: 'developer',
  stages: 'beginner',
  accessTags: { $in: client.accessNeeds }
});
```

### No New Pathways Without Opt-in
```javascript
// ❌ WRONG: Suggest different pathway unsolicited
if (jobPathwayStalled) {
  suggest('business'); // Don't do this!
}

// ✅ RIGHT: Stay in current pathway, ask permission to explore others
if (jobPathwayStalled) {
  askUserPermission('explore_alternative_pathways');
}
```

## Workflow Diagram

```
User Request
    ↓
┌─────────────────────┐
│ Magician Selector   │
│ (Which Magician?)   │
└──────┬──────────────┘
       │
       ├─→ Job Magician ────────→ VR + Workforce + Training
       ├─→ Business Magician ───→ Self-employment + Tools + Funding
       ├─→ Developer Magician ──→ Learning + Tooling + Projects
       └─→ Creative Magician ───→ Platforms + Gear + Audience
                ↓
        Apply GROW Constraints
                ↓
        Filter by Accommodations (DeafAUTH)
                ↓
        Return 3-5 Next Steps
                ↓
        Log Progress (FibonRose)
```

## Future Enhancements

- **Cross-Magician Transitions**: Smooth handoffs between pathways (e.g., Job → Business for former employee turned entrepreneur)
- **Multi-Pathway Support**: Users pursuing multiple pathways simultaneously
- **AI Learning**: Magicians learn from successful pathways to improve recommendations
- **Community Integration**: Connect users at similar stages for peer support
- **Employer/Partner API**: External systems can query Magicians for candidate matches
