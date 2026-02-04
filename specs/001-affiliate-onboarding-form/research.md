# Research & Technical Decisions

**Feature**: Affiliate Onboarding Form  
**Date**: 2026-01-07  
**Purpose**: Resolve all NEEDS CLARIFICATION items from Technical Context

## Frontend Framework Decision

**Decision**: Next.js 14+ with React 18+

**Rationale**:
- Next.js provides excellent form handling capabilities with built-in API routes
- Server-side rendering improves initial load performance (<2s requirement)
- Built-in optimization for animations and modern web features
- Strong TypeScript support for type safety
- Excellent developer experience and ecosystem
- Easy deployment options (Vercel, self-hosted)

**Alternatives Considered**:
- **React (CRA/Vite)**: More setup required, no built-in API routes, would need separate backend
- **Vue.js/Nuxt**: Less common in ecosystem, team familiarity may be lower
- **Vanilla JS**: Too much boilerplate, harder to maintain, no component reusability

**Implementation Notes**:
- Use App Router (Next.js 13+ pattern)
- Client components for form interactivity
- Server components for static content

---

## Backend Language & Framework Decision

**Decision**: Node.js 20+ with Express.js

**Rationale**:
- Same language as frontend (JavaScript/TypeScript) reduces context switching
- Express.js is lightweight, fast, and well-documented
- Excellent ecosystem for form handling, validation, and email services
- Easy integration with frontend (shared types possible)
- Good performance for API endpoints
- Large community and extensive middleware options

**Alternatives Considered**:
- **Python/FastAPI**: More verbose for simple API, different language ecosystem
- **Go**: Overkill for this use case, steeper learning curve
- **Ruby on Rails**: Heavier framework, more opinionated structure

**Implementation Notes**:
- Use TypeScript for type safety
- Express middleware for validation and error handling
- RESTful API design

---

## Form Validation Library Decision

**Decision**: React Hook Form with Zod for schema validation

**Rationale**:
- React Hook Form provides excellent performance with minimal re-renders
- Built-in real-time validation support
- Small bundle size
- Excellent TypeScript support
- Zod provides runtime type validation and schema definition
- Easy integration with auto-save functionality

**Alternatives Considered**:
- **Formik**: Larger bundle size, more re-renders, less performant
- **Yup**: Good but Zod has better TypeScript inference
- **Custom validation**: Too much boilerplate, error-prone

**Implementation Notes**:
- Use `useForm` hook from React Hook Form
- Zod schema for validation rules
- Custom validation messages for accessibility

---

## Animation Library Decision

**Decision**: Framer Motion

**Rationale**:
- Excellent performance (60fps requirement)
- Declarative API, easy to use
- Built-in support for reduced motion (accessibility requirement)
- Smooth animations for form interactions and success page
- Good documentation and examples
- Small bundle size when tree-shaken

**Alternatives Considered**:
- **React Spring**: More complex API, steeper learning curve
- **GSAP**: Overkill for this use case, larger bundle
- **CSS Animations**: Less flexible, harder to coordinate with React state

**Implementation Notes**:
- Use `motion` components for animated elements
- Respect `prefers-reduced-motion` media query
- Animate form field focus, validation errors, success page

---

## Styling Solution Decision

**Decision**: Tailwind CSS with custom dark theme

**Rationale**:
- Utility-first approach enables rapid development
- Excellent dark mode support (constitution requirement)
- Responsive design utilities (mobile-first requirement)
- Small production bundle when purged
- Easy to maintain consistent spacing (8px base unit requirement)
- Good accessibility utilities

**Alternatives Considered**:
- **CSS Modules**: More verbose, harder to maintain consistency
- **Styled Components**: Runtime overhead, larger bundle
- **Material UI**: Too opinionated, doesn't match futuristic aesthetic

**Implementation Notes**:
- Custom dark theme with moody, futuristic color palette
- Consistent spacing scale (4px, 8px, 16px, 24px, 32px, 48px, 64px)
- High contrast ratios for WCAG AA compliance

---

## Email Service Decision

**Decision**: Resend API

**Rationale**:
- Simple, developer-friendly API
- Excellent deliverability
- Built-in React email templates support
- Good free tier for initial usage
- Fast setup and integration
- TypeScript support

**Alternatives Considered**:
- **SendGrid**: More complex setup, larger API surface
- **AWS SES**: Requires AWS account setup, more configuration
- **SMTP directly**: Requires email server management, less reliable
- **Nodemailer with SMTP**: More setup, less reliable delivery

**Implementation Notes**:
- Use Resend SDK for Node.js
- Create email template with submission data
- Handle email delivery failures gracefully
- Log email send status

---

## Database Decision

**Decision**: PostgreSQL with Prisma ORM

**Rationale**:
- Robust, production-ready database
- Excellent for structured data (form submissions)
- Prisma provides type-safe database access
- Good migration system
- Scalable for future growth
- ACID compliance for data integrity

**Alternatives Considered**:
- **SQLite**: Good for MVP but less scalable, no concurrent writes
- **MongoDB**: Overkill for structured form data, less type safety
- **Supabase**: Good option but adds external dependency

**Implementation Notes**:
- Use Prisma for schema definition and migrations
- Store submissions with timestamp and status
- Index on email and timestamp for queries
- Consider connection pooling for production

---

## Testing Framework Decision

**Decision**: 
- **Frontend**: Jest + React Testing Library + Playwright
- **Backend**: Jest + Supertest

**Rationale**:
- Jest is standard for JavaScript/TypeScript projects
- React Testing Library encourages accessible testing patterns
- Playwright provides excellent E2E testing with real browser automation
- Supertest enables API endpoint testing
- All tools have excellent TypeScript support
- Good coverage reporting

**Alternatives Considered**:
- **Vitest**: Faster but less mature ecosystem
- **Cypress**: Good but Playwright has better multi-browser support
- **Mocha/Chai**: More setup required, less modern

**Implementation Notes**:
- Unit tests for validation logic and utilities
- Integration tests for API endpoints
- E2E tests for complete user flows
- Accessibility testing with jest-axe

---

## Auto-save Implementation Decision

**Decision**: localStorage with debounced saves

**Rationale**:
- localStorage is available in all modern browsers
- No server round-trip needed (performance requirement)
- Works offline
- Simple implementation
- Debouncing prevents excessive writes

**Alternatives Considered**:
- **IndexedDB**: Overkill for simple form data
- **Server-side drafts**: Requires authentication, more complex
- **Session storage**: Lost on tab close, not suitable

**Implementation Notes**:
- Debounce saves to 2 seconds after last input
- Store draft data with timestamp
- Clear draft after successful submission
- Handle storage quota exceeded errors gracefully

---

## Security Implementation Decision

**Decision**: 
- CSRF protection via SameSite cookies and token validation
- Input sanitization with DOMPurify (frontend) and validator.js (backend)
- HTTPS enforcement
- Rate limiting on submission endpoint

**Rationale**:
- Multiple layers of security (defense in depth)
- Standard practices for web forms
- Prevents common attacks (XSS, CSRF, injection)

**Implementation Notes**:
- Validate all inputs on backend (never trust client)
- Sanitize before storing or displaying
- Use HTTPS in production
- Implement rate limiting (e.g., 5 submissions per hour per IP)

---

## Summary

All technical decisions align with:
- Constitution principles (mobile-friendly, accessible, secure)
- Performance requirements (<2s load, <500ms validation, 60fps animations)
- Success criteria (form completion, email delivery)
- Non-functional requirements (WCAG AA, security, responsive design)

No blocking issues identified. Ready to proceed to Phase 1 design.
