# Implementation Plan: Affiliate Onboarding Form

**Branch**: `001-affiliate-onboarding-form` | **Date**: 2026-01-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-affiliate-onboarding-form/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build a 2-page affiliate onboarding form with real-time validation, auto-save draft functionality, and email notifications. The form collects affiliate information (name, email, social media channels, follower count) and sends notifications to dionne.ng@aelf.io upon submission. The design features a modern, dark, futuristic aesthetic with smooth animations. 

**Technical Approach**: Next.js 14+ frontend with React Hook Form for validation, Framer Motion for animations, and Tailwind CSS for styling. Node.js/Express backend API with PostgreSQL database and Resend for email notifications. All decisions documented in [research.md](./research.md).

## Technical Context

**Language/Version**: Frontend: Next.js 14+ (React 18+), TypeScript 5+. Backend: Node.js 20+, TypeScript 5+  
**Primary Dependencies**: Frontend: React Hook Form, Zod, Framer Motion, Tailwind CSS. Backend: Express.js, Prisma ORM, Resend SDK, validator.js  
**Storage**: PostgreSQL for submissions (via Prisma), localStorage for draft data (client-side)  
**Testing**: Jest + React Testing Library (frontend), Jest + Supertest (backend), Playwright (E2E)  
**Target Platform**: Web browsers (Chrome, Firefox, Safari, Edge), mobile-responsive (iOS Safari, Chrome Mobile)  
**Project Type**: web (frontend + backend)  
**Performance Goals**: Form page loads in <2s, validation responds in <500ms, animations at 60fps, email delivery within 30s  
**Constraints**: HTTPS required, WCAG 2.1 AA compliance, mobile-first responsive design, real-time validation, auto-save without performance degradation  
**Scale/Scope**: Initial scope: single form, 2 pages, email notifications. Expected: hundreds of submissions per month initially, scalable architecture

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Research Check (Initial)

### Principle I: Mobile & Web Friendly Design with Clear Communication
✅ **PASS**: Form designed with mobile-first approach, responsive breakpoints at 768px and 1024px. Clear, jargon-free messaging. Visual hierarchy guides users through 2-page flow.

### Principle II: Accessibility & User-Friendliness (NON-NEGOTIABLE)
✅ **PASS**: WCAG 2.1 AA compliance required. All interactive elements meet 44x44px touch targets. Full keyboard navigation. Screen reader support. Clear error messages.

### Principle III: Security & Data Privacy Priority
✅ **PASS**: HTTPS required for all data transmission. Input validation and sanitization. CSRF protection. Email sent securely. Privacy-by-design principles applied.

### Principle IV: Required Fields Enforcement
✅ **PASS**: All form fields marked as required with visible indicators. Real-time validation prevents submission with missing/invalid fields. Clear error messaging.

**Gate Status**: ✅ ALL GATES PASSED - Proceeded to Phase 0 research

---

### Post-Design Check (After Phase 1)

### Principle I: Mobile & Web Friendly Design with Clear Communication
✅ **PASS**: Tailwind CSS with responsive utilities, mobile-first breakpoints implemented. Clear messaging in form labels and success page. Visual hierarchy defined in design system.

### Principle II: Accessibility & User-Friendliness (NON-NEGOTIABLE)
✅ **PASS**: React Hook Form with accessible error announcements. Framer Motion respects `prefers-reduced-motion`. Semantic HTML structure. Screen reader testing included in quickstart. Touch targets meet 44x44px requirement.

### Principle III: Security & Data Privacy Priority
✅ **PASS**: Input validation with Zod schema on both frontend and backend. CSRF protection via SameSite cookies. Rate limiting on API endpoint. HTTPS enforced. Data sanitization before storage. Privacy considerations documented in data model.

### Principle IV: Required Fields Enforcement
✅ **PASS**: All fields marked as required in data model. Real-time validation with React Hook Form + Zod. Validation rules defined in data-model.md. Error messages are clear and actionable.

**Gate Status**: ✅ ALL GATES PASSED - Ready for Phase 2 (Task Generation)

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── models/
│   │   └── submission.ts (or .py)
│   ├── services/
│   │   ├── email.service.ts (or .py)
│   │   └── submission.service.ts (or .py)
│   └── api/
│       ├── routes/
│       │   └── submissions.routes.ts (or .py)
│       └── middleware/
│           ├── validation.middleware.ts (or .py)
│           └── error-handler.middleware.ts (or .py)
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── package.json (or requirements.txt)

frontend/
├── src/
│   ├── components/
│   │   ├── FormPage.tsx
│   │   ├── SuccessPage.tsx
│   │   ├── FormField.tsx
│   │   └── ValidationMessage.tsx
│   ├── pages/
│   │   ├── OnboardingForm.tsx
│   │   └── Success.tsx
│   ├── services/
│   │   ├── api.service.ts
│   │   └── draft.service.ts
│   ├── hooks/
│   │   ├── useFormValidation.ts
│   │   └── useAutoSave.ts
│   ├── styles/
│   │   └── globals.css
│   └── utils/
│       └── validation.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── package.json
```

**Structure Decision**: Web application structure with separate frontend and backend directories. Frontend handles UI, validation, animations, and draft storage (localStorage). Backend handles form submission processing, data persistence, and email notifications. This separation allows independent deployment and scaling.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations identified. All complexity is justified by feature requirements and constitution principles.

---

## Phase Completion Summary

### Phase 0: Research & Technical Decisions ✅ COMPLETE

**Output**: [research.md](./research.md)

**Resolved Decisions**:
- ✅ Frontend: Next.js 14+ with React 18+, TypeScript 5+
- ✅ Backend: Node.js 20+ with Express.js, TypeScript 5+
- ✅ Form Validation: React Hook Form + Zod
- ✅ Animations: Framer Motion
- ✅ Styling: Tailwind CSS
- ✅ Email Service: Resend API
- ✅ Database: PostgreSQL with Prisma ORM
- ✅ Testing: Jest + React Testing Library + Playwright
- ✅ Auto-save: localStorage with debouncing
- ✅ Security: CSRF protection, input sanitization, rate limiting

All NEEDS CLARIFICATION items resolved.

---

### Phase 1: Design & Contracts ✅ COMPLETE

**Generated Artifacts**:

1. **Data Model**: [data-model.md](./data-model.md)
   - AffiliateSubmission entity with full schema
   - DraftData structure (client-side)
   - Prisma schema definition
   - Validation rules and indexes

2. **API Contracts**: [contracts/api.yaml](./contracts/api.yaml)
   - OpenAPI 3.0.3 specification
   - POST /api/submissions endpoint
   - Request/response schemas
   - Error handling definitions

3. **Quickstart Guide**: [quickstart.md](./quickstart.md)
   - 12 test scenarios covering all user stories
   - Setup instructions
   - Manual testing checklist
   - Troubleshooting guide

4. **Agent Context**: Updated via `update-agent-context.sh`
   - Cursor IDE context file updated with technology stack
   - Location: `.cursor/rules/specify-rules.mdc`

**Constitution Check**: ✅ All gates passed (re-evaluated post-design)

---

### Phase 2: Task Generation

**Status**: Ready to proceed

**Next Command**: `/speckit.tasks`

This will generate the task breakdown based on user stories and implementation plan.
