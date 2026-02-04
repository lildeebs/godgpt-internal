<!--
Sync Impact Report:
Version: 0.0.0 → 1.0.0 (MAJOR: Initial constitution creation)
Modified Principles: N/A (new file)
Added Sections: Core Principles, Marketing Standards, Research & Data Standards, Governance
Removed Sections: N/A
Templates Requiring Updates:
  ✅ plan-template.md - Constitution Check section exists, no changes needed
  ✅ spec-template.md - No constitution-specific constraints, no changes needed
  ✅ tasks-template.md - No constitution-specific task types, no changes needed
  ⚠️ README.md - May need update to reference constitution (manual review recommended)
Follow-up TODOs:
  - RATIFICATION_DATE: Unknown - marked as TODO
-->

# GodGPT Marketing Research Platform Constitution

## Core Principles

### I. Marketing-First Design
All features and content MUST prioritize marketing effectiveness and user conversion. Every component serves a clear marketing purpose: awareness, engagement, or conversion. Design decisions are validated against marketing metrics (engagement rates, conversion rates, completion rates) rather than technical elegance alone. Mobile-first responsive design is mandatory for all marketing materials.

### II. Research-Driven Content Strategy
Content creation MUST be informed by data and research. All marketing materials reference source research, performance data, or user insights. Content hooks, messaging, and CTAs are tested and iterated based on measurable outcomes. Generic or untested content is prohibited—every piece must have a research-backed rationale or testing plan.

### III. Brand Consistency & Authenticity
All marketing materials MUST maintain GodGPT brand identity: mystical/spiritual aesthetic, purple/pink color scheme, authentic voice, and community-focused messaging. Content creators and affiliates are guided by brand guidelines that ensure consistency while allowing authentic personal expression. Brand guidelines supersede individual preferences.

### IV. Accessibility & User Experience (NON-NEGOTIABLE)
All marketing presentations, forms, and landing pages MUST meet WCAG 2.1 AA accessibility standards. Mobile responsiveness is mandatory. Touch targets minimum 44x44px. Form validation must be real-time and user-friendly. Error states must be clear and actionable. Performance targets: <3s load time, 60fps animations.

### V. Data Privacy & Security
All user data collection (forms, analytics, tracking) MUST comply with privacy regulations (GDPR, CCPA). Data collection must be transparent with clear opt-in/opt-out mechanisms. Security measures (HTTPS, input sanitization, CSRF protection) are mandatory for all forms and data submission points.

## Marketing Standards

### Content Quality Requirements
- All marketing content must align with GodGPT brand voice: contemplative, authentic, community-focused
- Content hooks must follow the 3-second rule: capture attention within 3 seconds
- Performance targets: >80% completion rate, >5% engagement rate, >2% share rate
- Content must be tested or based on proven patterns from research

### Platform-Specific Optimization
- TikTok/YouTube Shorts: 15-60 second videos (optimized for 15-30s sweet spot)
- Landing pages: Mobile-first, fast load times, clear CTAs
- Forms: Progressive enhancement, auto-save drafts, clear validation
- All content must be optimized for US, UK, and AU markets

### Affiliate & Influencer Guidelines
- All affiliate content must include mandatory tags and hashtags
- Content must follow brand guidelines while allowing authentic expression
- Performance tracking and reporting required for affiliate partnerships
- Clear onboarding materials and brand briefs must be provided

## Research & Data Standards

### Research Documentation
- All marketing research (video analysis, hook testing, content patterns) MUST be documented
- Research findings must be accessible to content creators and marketing team
- Performance data must be tracked and analyzed regularly
- A/B testing results must be documented and shared

### Data Collection & Analysis
- Marketing metrics must be tracked: views, engagement, conversion, completion rates
- User feedback and testimonials must be collected and validated
- Content performance data must inform future content strategy
- Research findings must be actionable and specific

## Development Workflow

### Content Creation Process
1. Research phase: Analyze trends, performance data, user insights
2. Concept validation: Test hooks, validate messaging against brand guidelines
3. Production: Create content following platform-specific best practices
4. Testing: A/B test variations, measure performance
5. Iteration: Refine based on data, double down on what works

### Code & Design Standards
- All code must follow TypeScript/React best practices
- Design must follow mobile-first UI/UX principles
- Components must be reusable and maintainable
- Documentation must be clear and accessible

### Review & Approval Process
- All marketing materials must be reviewed for brand consistency
- Content must be validated against research and performance data
- Accessibility and security must be verified before deployment
- Performance metrics must be reviewed post-deployment

## Governance

This constitution supersedes all other practices and guidelines. All marketing materials, code, and content must comply with these principles.

**Amendment Procedure**: Constitution amendments require documentation of rationale, impact assessment, and approval from project stakeholders. Version must be incremented according to semantic versioning (MAJOR.MINOR.PATCH).

**Compliance Review**: All PRs and content submissions must verify compliance with constitution principles. Violations must be justified or corrected before approval.

**Complexity Justification**: Any deviation from simplicity or standard practices must be documented with clear rationale and rejected alternatives.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): Original adoption date unknown - needs historical research | **Last Amended**: 2026-01-08
