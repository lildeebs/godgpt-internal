# Tasks: Affiliate Onboarding Form

**Input**: Design documents from `/specs/001-affiliate-onboarding-form/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅, quickstart.md ✅

**Tests**: Tests are OPTIONAL per specification - not included in this task list. Add test tasks if TDD approach is desired.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`
- Paths follow the structure defined in plan.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project root structure with frontend/ and backend/ directories
- [x] T002 Initialize Next.js 14+ project in frontend/ with TypeScript 5+
- [x] T003 Initialize Node.js/Express project in backend/ with TypeScript 5+
- [x] T004 [P] Install frontend dependencies: React Hook Form, Zod, Framer Motion, Tailwind CSS in frontend/package.json
- [x] T005 [P] Install backend dependencies: Express.js, Prisma ORM, Resend SDK, validator.js in backend/package.json
- [x] T006 [P] Configure TypeScript for frontend in frontend/tsconfig.json
- [x] T007 [P] Configure TypeScript for backend in backend/tsconfig.json
- [x] T008 [P] Setup ESLint and Prettier configuration in frontend/.eslintrc.json
- [x] T009 [P] Setup ESLint and Prettier configuration in backend/.eslintrc.json
- [x] T010 Create .env.example files for frontend and backend with required environment variables
- [x] T011 Setup Git repository and .gitignore files

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T012 Setup PostgreSQL database connection and Prisma configuration in backend/prisma/schema.prisma
- [x] T013 Create Prisma schema with AffiliateSubmission model in backend/prisma/schema.prisma
- [ ] T014 Run Prisma migrations to create database tables
- [x] T015 [P] Create base Express.js server structure in backend/src/server.ts
- [x] T016 [P] Setup API routing structure in backend/src/api/routes/
- [x] T017 [P] Create error handling middleware in backend/src/api/middleware/error-handler.middleware.ts
- [x] T018 [P] Create validation middleware in backend/src/api/middleware/validation.middleware.ts
- [x] T019 [P] Setup CORS and security middleware in backend/src/api/middleware/security.middleware.ts
- [x] T020 [P] Create base Next.js app structure with App Router in frontend/src/app/
- [x] T021 [P] Configure Tailwind CSS with dark theme in frontend/tailwind.config.js
- [x] T022 [P] Create global styles with dark, futuristic aesthetic in frontend/src/styles/globals.css
- [x] T023 [P] Setup environment configuration management in backend/src/config/env.ts
- [x] T024 [P] Setup environment configuration management in frontend/src/config/env.ts
- [x] T025 Create base API service client in frontend/src/services/api.service.ts

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Submit Affiliate Onboarding Form (Priority: P1) 🎯 MVP

**Goal**: Core form submission functionality that enables the primary business goal of onboarding affiliates. Users can complete the form, submit it, receive confirmation, and trigger email notification.

**Independent Test**: Complete the form with valid data and verify: (1) form accepts all required inputs, (2) validation prevents invalid submissions, (3) success page displays after submission, (4) email notification is sent. This delivers the ability to collect affiliate information and notify the administrator.

### Implementation for User Story 1

- [x] T026 [P] [US1] Create AffiliateSubmission Prisma model in backend/prisma/schema.prisma (if not in T013)
- [x] T027 [US1] Create Prisma client service in backend/src/services/prisma.service.ts
- [x] T028 [P] [US1] Create Zod validation schema for form submission in frontend/src/utils/validation.ts
- [x] T029 [P] [US1] Create Zod validation schema for API request in backend/src/utils/validation.ts
- [x] T030 [US1] Create EmailService with Resend integration in backend/src/services/email.service.ts
- [x] T031 [US1] Create SubmissionService for handling form submissions in backend/src/services/submission.service.ts
- [x] T032 [US1] Create POST /api/submissions endpoint handler in backend/src/api/routes/submissions.routes.ts
- [x] T033 [US1] Implement form submission API route in backend/src/api/routes/submissions.routes.ts
- [x] T034 [US1] Add rate limiting middleware to submissions endpoint in backend/src/api/middleware/rate-limit.middleware.ts
- [x] T035 [P] [US1] Create form page component structure in frontend/src/pages/OnboardingForm.tsx
- [x] T036 [P] [US1] Create form field components: FormField.tsx in frontend/src/components/FormField.tsx
- [x] T037 [US1] Implement form with React Hook Form in frontend/src/pages/OnboardingForm.tsx
- [x] T038 [US1] Add form fields: fullName, email, socialMediaChannels, followerCount in frontend/src/pages/OnboardingForm.tsx (use input type="number" for followerCount to prevent text input, add min="0" and max="999999999" attributes)
- [x] T039 [US1] Implement required field validation and indicators in frontend/src/pages/OnboardingForm.tsx
- [x] T040 [US1] Implement submit button with enabled/disabled state logic in frontend/src/pages/OnboardingForm.tsx
- [x] T041 [US1] Connect form submission to API endpoint in frontend/src/services/api.service.ts
- [x] T042 [US1] Create success page component in frontend/src/pages/Success.tsx
- [x] T043 [US1] Add thank you message content to success page in frontend/src/pages/Success.tsx
- [x] T044 [US1] Implement redirect to success page after form submission in frontend/src/pages/OnboardingForm.tsx
- [x] T045 [US1] Add error handling for form submission failures in frontend/src/pages/OnboardingForm.tsx
- [x] T046 [US1] Implement duplicate submission prevention in frontend/src/pages/OnboardingForm.tsx (disable submit button after click, set loading state, prevent multiple API calls, handle rapid clicks with debouncing)
- [x] T047 [US1] Add logging for submission operations in backend/src/services/submission.service.ts

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently. Users can submit forms and receive email notifications.

---

## Phase 4: User Story 2 - Real-time Validation and Auto-save Draft (Priority: P2)

**Goal**: Enhanced user experience with real-time validation feedback and automatic draft saving to prevent data loss. Users get immediate validation feedback and can resume filling forms after navigating away.

**Independent Test**: Enter data and verify real-time validation messages appear, fill partial form and close browser, return and verify data is restored. This delivers improved user experience and data protection.

### Implementation for User Story 2

- [ ] T048 [P] [US2] Create useFormValidation hook for real-time validation in frontend/src/hooks/useFormValidation.ts
- [ ] T049 [P] [US2] Create useAutoSave hook for draft functionality in frontend/src/hooks/useAutoSave.ts
- [ ] T050 [US2] Implement real-time email validation in frontend/src/hooks/useFormValidation.ts
- [ ] T051 [US2] Implement real-time follower count validation in frontend/src/hooks/useFormValidation.ts
- [ ] T052 [US2] Create ValidationMessage component for error display in frontend/src/components/ValidationMessage.tsx
- [ ] T053 [US2] Integrate real-time validation with form fields in frontend/src/pages/OnboardingForm.tsx
- [ ] T054 [US2] Implement auto-save draft functionality with localStorage in frontend/src/hooks/useAutoSave.ts
- [ ] T055 [US2] Add debouncing to auto-save (2 second delay) in frontend/src/hooks/useAutoSave.ts
- [ ] T056 [US2] Implement draft restoration on form load in frontend/src/pages/OnboardingForm.tsx
- [ ] T057 [US2] Clear draft data after successful submission in frontend/src/pages/OnboardingForm.tsx
- [ ] T058 [US2] Handle localStorage quota exceeded errors gracefully in frontend/src/hooks/useAutoSave.ts (implement fallback to sessionStorage if localStorage fails, or gracefully degrade with user notification if both fail, handle private/incognito mode limitations)
- [ ] T059 [US2] Add visual indicator for draft save status (optional) in frontend/src/components/DraftIndicator.tsx

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently. Form has real-time validation and auto-save functionality.

---

## Phase 5: User Story 3 - Success Page with Animation and Sharing Message (Priority: P2)

**Goal**: Polished user experience with engaging success animation and compelling sharing message. Completes the user journey with positive closing experience and encourages viral sharing.

**Independent Test**: Submit a form and verify: (1) success page displays with animation, (2) message text is correct and readable, (3) contact email is displayed. This delivers a polished user experience and encourages sharing.

### Implementation for User Story 3

- [ ] T060 [P] [US3] Enhance success page component with animation features in frontend/src/pages/Success.tsx (T042 creates basic structure, this task adds animation capabilities)
- [ ] T061 [US3] Implement success animation with Framer Motion in frontend/src/pages/Success.tsx
- [ ] T062 [US3] Add reduced motion support for accessibility in frontend/src/pages/Success.tsx
- [ ] T063 [US3] Implement complete thank you message with sharing prompt in frontend/src/pages/Success.tsx
- [ ] T064 [US3] Add contact email display (dionne.ng@aelf.io) in frontend/src/pages/Success.tsx
- [ ] T065 [US3] Ensure success page is responsive for mobile and desktop in frontend/src/pages/Success.tsx
- [ ] T066 [US3] Add loading state for animation initialization in frontend/src/pages/Success.tsx
- [ ] T067 [US3] Test animation performance (60fps requirement) in frontend/src/pages/Success.tsx

**Checkpoint**: All user stories should now be independently functional. Complete form experience with success page animation.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and ensure quality standards

- [ ] T068 [P] Implement mobile-responsive design for all pages (320px+ breakpoints) in frontend/src/
- [ ] T069 [P] Add keyboard navigation support throughout the form in frontend/src/pages/OnboardingForm.tsx
- [ ] T070 [P] Add screen reader support with ARIA labels in frontend/src/components/
- [ ] T071 [P] Ensure all interactive elements meet 44x44px touch target requirement in frontend/src/components/
- [ ] T072 [P] Verify WCAG 2.1 AA color contrast ratios (4.5:1 minimum) in frontend/src/styles/
- [ ] T073 [P] Add focus indicators for keyboard navigation in frontend/src/styles/globals.css
- [ ] T074 [P] Implement error message announcements for screen readers in frontend/src/components/ValidationMessage.tsx
- [ ] T075 [P] Add loading states and spinners for async operations in frontend/src/components/
- [ ] T076 [P] Implement network error handling with user-friendly messages in frontend/src/pages/OnboardingForm.tsx
- [ ] T077 [P] Add input sanitization on backend before database storage in backend/src/services/submission.service.ts
- [ ] T078 [P] Implement CSRF protection for form submissions in backend/src/api/middleware/security.middleware.ts
- [ ] T079 [P] Add request logging and monitoring in backend/src/api/middleware/
- [ ] T080 [P] Optimize form page load time (<2s requirement) in frontend/
- [ ] T081 [P] Optimize validation response time (<500ms requirement) in frontend/src/hooks/useFormValidation.ts
- [ ] T082 [P] Ensure animations run at 60fps in frontend/src/pages/Success.tsx
- [ ] T083 [P] Add error boundary components for React error handling in frontend/src/components/
- [ ] T084 [P] Update documentation with setup and usage instructions in README.md
- [ ] T085 Run quickstart.md validation scenarios to verify all functionality

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P2)
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Enhances US1 but independently testable
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Completes US1 flow but independently testable

### Within Each User Story

- Models/services before endpoints/components
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Models/services within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all parallel tasks for User Story 1 together:
Task: "Create Zod validation schema for form submission in frontend/src/utils/validation.ts"
Task: "Create Zod validation schema for API request in backend/src/utils/validation.ts"
Task: "Create form page component structure in frontend/src/pages/OnboardingForm.tsx"
Task: "Create form field components: FormField.tsx in frontend/src/components/FormField.tsx"
```

---

## Parallel Example: User Story 2

```bash
# Launch all parallel tasks for User Story 2 together:
Task: "Create useFormValidation hook for real-time validation in frontend/src/hooks/useFormValidation.ts"
Task: "Create useAutoSave hook for draft functionality in frontend/src/hooks/useAutoSave.ts"
Task: "Create ValidationMessage component for error display in frontend/src/components/ValidationMessage.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add Polish phase → Final quality improvements → Deploy
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (MVP)
   - Developer B: User Story 2 (can start in parallel)
   - Developer C: User Story 3 (can start in parallel)
3. Stories complete and integrate independently
4. All developers: Polish phase tasks

---

## Task Summary

- **Total Tasks**: 85 tasks
- **Setup Phase**: 11 tasks
- **Foundational Phase**: 14 tasks
- **User Story 1 (P1)**: 22 tasks
- **User Story 2 (P2)**: 12 tasks
- **User Story 3 (P2)**: 8 tasks
- **Polish Phase**: 18 tasks

### Task Count per User Story

- **User Story 1**: 22 tasks (MVP - core functionality)
- **User Story 2**: 12 tasks (enhancement - validation & auto-save)
- **User Story 3**: 8 tasks (enhancement - success page)

### Parallel Opportunities Identified

- **Setup Phase**: 6 parallel tasks (T004-T009)
- **Foundational Phase**: 12 parallel tasks (T015-T025)
- **User Story 1**: 4 parallel tasks (T028, T029, T035, T036)
- **User Story 2**: 3 parallel tasks (T048, T049, T052)
- **User Story 3**: 1 parallel task (T060)
- **Polish Phase**: 18 parallel tasks (all marked [P])

### Independent Test Criteria

- **User Story 1**: Complete form with valid data → verify submission, success page, email sent
- **User Story 2**: Enter data → verify real-time validation, close browser → verify draft restored
- **User Story 3**: Submit form → verify success page displays with animation and message

### Suggested MVP Scope

**MVP = User Story 1 Only** (22 tasks after Setup + Foundational)

This delivers:
- Complete form with all required fields
- Form submission functionality
- Email notification to dionne.ng@aelf.io
- Basic success page with thank you message
- Core validation (required fields)

**Estimated MVP Tasks**: 47 tasks (11 Setup + 14 Foundational + 22 US1)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- All file paths are relative to project root (frontend/ or backend/)
- Follow constitution principles: mobile-friendly, accessible, secure, required fields enforced
