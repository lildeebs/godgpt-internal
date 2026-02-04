# Tasks: GodGPT Affiliate Landing Page

**Input**: Design documents from `specs/001-landing-page-website/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/external-links.md, quickstart.md  
**Reference**: Implement to match `screen.png` and `code.html` (structure, copy, and visuals).

**Tests**: Not requested in spec; manual verification per quickstart.md.

**Organization**: Tasks grouped by user story so each story can be implemented and verified independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different areas of same file or no dependencies)
- **[Story]**: User story (US1–US7) for traceability
- All implementation targets `index.html` at repository root unless noted

## Path Conventions

- **Single static site**: `index.html` at repo root; optional `assets/` if needed
- **Contracts**: `specs/001-landing-page-website/contracts/external-links.md` for CTA/footer URLs

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Create the landing page file and load stack (Tailwind, Alpine.js) so sections can be built to match screen.png and code.html.

- [x] T001 Create index.html at repository root using code.html as the base structure and align section order with screen.png
- [x] T002 [P] Add Tailwind CSS and Alpine.js via CDN in index.html head/body per research.md and code.html
- [x] T003 [P] Add dark theme config (primary, background-dark, surface-dark, accent) and global styles (scrollbar, fonts) in index.html to match screen.png and code.html

---

## Phase 2: Foundational (Page Shell)

**Purpose**: Document shell and sticky header layout so every section shares the same chrome and section IDs for nav. Required before any user-story section work.

**⚠️ CRITICAL**: Section IDs and header shell must exist before US7/US1 content.

- [x] T004 Add document shell: doctype, html class="dark", viewport, title "GodGPT Affiliate Landing Page", and semantic regions (header, main with sections, footer) in index.html
- [x] T005 Add section IDs for nav targets: id="commission", id="how-it-works", id="community", id="faq" on the corresponding section containers in index.html
- [x] T006 Apply sticky header bar (sticky top-0, backdrop blur, border) and base typography (Inter/display) in index.html so all sections inherit consistent look from screen.png

**Checkpoint**: Page has header shell and empty/skeleton sections with correct IDs; nav can be wired next.

---

## Phase 3: User Story 7 – Visitor navigates via header (Priority: P1)

**Goal**: Visitor sees GodGPT branding and can jump to How it works, Commission, Community, FAQ; sees Get App CTA; on mobile, nav collapses to a menu.

**Independent Test**: Open page; header shows logo + nav links + Get App; clicking a nav link scrolls to the right section; at narrow width, menu control appears and reveals links.

### Implementation for User Story 7

- [x] T007 [P] [US7] Add GodGPT logo (circle + cross icon) and "GodGPT" brand text in header in index.html
- [x] T008 [P] [US7] Add nav links "How It Works", "Commission", "Community", "FAQ" with href="#how-it-works", #commission, #community, #faq in index.html
- [x] T009 [US7] Add "Get App" CTA button in header and mobile menu trigger (e.g. hamburger) that shows/hides nav on small viewports in index.html
- [x] T010 [US7] Ensure header nav scrolls to section IDs and mobile menu is usable (min 44px touch target) in index.html

**Checkpoint**: Header is fully functional; navigation and Get App match screen.png and code.html.

---

## Phase 4: User Story 1 – Visitor discovers affiliate program and primary value (Priority: P1) 🎯 MVP

**Goal**: Visitor immediately sees headline about earning with GodGPT, 30% recurring commission, primary CTA "Become an Affiliate", and trust stats (e.g. $120k+ Total Earnings, 5000+ Monthly Referrals, 95+ Countries).

**Independent Test**: Open page; hero shows "Turn Clarity Into Cash With GodGPT", "30% recurring commission", "Become an Affiliate" button, and at least one trust stat with label. No login required.

### Implementation for User Story 1

- [x] T011 [P] [US1] Add hero section with "Join the GodGPT Inner Circle" pill/badge and cosmic/starry background treatment in index.html to match screen.png
- [x] T012 [US1] Add hero headline "Turn Clarity Into Cash With" and "GodGPT" in gradient text, plus subcopy with "30% recurring commission on every referral" in index.html
- [x] T013 [US1] Add "Become an Affiliate" primary CTA button in hero linking to https://godgpt.tolt.io (per contracts/external-links.md) in index.html
- [x] T014 [US1] Add trust stats block: $120k+ Total Earnings, 5000+ Monthly Referrals, 95+ Countries with labels in index.html to match screen.png

**Checkpoint**: Hero matches screen.png and code.html; US1 acceptance scenarios pass. MVP deliverable.

---

## Phase 5: User Story 2 – Visitor estimates earnings with commission calculator (Priority: P2)

**Goal**: Visitor sees "Calculate Your Potential", total estimated monthly earnings display, and four plan sliders (Premium Weekly $5, Monthly $15, Annual $120, God Mode $888); changing sliders updates the total using 30% commission formula.

**Independent Test**: Change each slider; "Total Estimated Earnings" updates to match formula in research.md; note "Based on 30% recurring commission" is visible.

### Implementation for User Story 2

- [x] T015 [US2] Add "Calculate Your Potential" section with "Real numbers. Real income. Real impact." and total estimated earnings card (e.g. "TOTAL ESTIMATED EARNINGS" / $XXX /mo) in index.html to match screen.png
- [x] T016 [US2] Implement calculator state (referralsWeekly, referralsMonthly, referralsAnnual, referralsGodMode) and formula per research.md in index.html using Alpine.js or vanilla JS
- [x] T017 [US2] Add four plan rows with sliders (0–100): Premium Weekly $5/week, Premium Monthly $15/month, Premium Annual $120/year, God Mode Annual $888/year with referral count display per row in index.html
- [x] T018 [US2] Wire sliders to live total and add "Based on 30% recurring commission" note below total in index.html

**Checkpoint**: Calculator matches screen.png and code.html; formula and defaults match research.md.

---

## Phase 6: User Story 3 – Visitor learns how the program works (Priority: P2)

**Goal**: Visitor sees "How It Works" with three steps: 1. Join Program, 2. Share & Guide, 3. Earn Recurring, each with icon and short description.

**Independent Test**: Scroll to How it works; three step cards with icons and copy are visible; copy is clear and non-technical.

### Implementation for User Story 3

- [x] T019 [P] [US3] Add "How It Works" section with title and subtext "Start earning in three simple steps..." in index.html to match screen.png
- [x] T020 [US3] Add three step cards: (1) Join Program – sign up, get link; (2) Share & Guide – introduce GodGPT, earn when they sign up; (3) Earn Recurring – commission on every subscription, no limits; with icons and copy from code.html/screen.png in index.html

**Checkpoint**: How it works section matches screen.png and code.html.

---

## Phase 7: User Story 6 – Visitor converts via final CTA and footer (Priority: P2)

**Goal**: Visitor sees final CTA block "Ready to amplify your influence?" with "Start Earning Now" button, and footer with GodGPT brand, tagline, App links (Features, Learn, Download), Company (Contact), social icons, Privacy/Terms, and copyright.

**Independent Test**: Scroll to bottom; CTA block and footer present; "Start Earning Now" links to godgpt.tolt.io; footer has all link groups and legal line.

### Implementation for User Story 6

- [x] T021 [US6] Add final CTA block with headline "Ready to amplify your influence?", subcopy, and "Start Earning Now" button linking to https://godgpt.tolt.io in index.html to match screen.png
- [x] T022 [US6] Add footer: GodGPT logo and tagline "Empowering spiritual wellness with divine intelligence..."; App (Features, Learn, Download); Company (Contact) in index.html
- [x] T023 [US6] Add footer social icons (Discord, TikTok, Instagram, YouTube, Telegram, X) and legal row: © 2026 GodGPT, Privacy Policy, Terms of Service in index.html; use contracts/external-links.md for hrefs or placeholders

**Checkpoint**: Final CTA and footer match screen.png and code.html; links match contracts.

---

## Phase 8: User Story 4 – Visitor explores community and support (Priority: P3)

**Goal**: Visitor sees "We're committed to your success" with Join Discord CTA and four benefit cards (Community, Media Assets, Case Studies, Priority Support).

**Independent Test**: Scroll to community section; at least two benefits and "Join Discord" CTA are present and link/button is actionable.

### Implementation for User Story 4

- [x] T024 [US4] Add "We're committed to your success" section with title, subtext, and "Join Discord" link (per contracts/external-links.md or placeholder) in index.html to match screen.png
- [x] T025 [US4] Add four benefit cards: Community (Discord, real-time support), Media Assets (graphics, templates), Case Studies (strategies from top earners), Priority Support (direct line to team) with icons and copy from code.html in index.html

**Checkpoint**: Community section matches screen.png and code.html.

---

## Phase 9: User Story 5 – Visitor gets answers from FAQ (Priority: P3)

**Goal**: Visitor sees FAQ section with expandable items covering who can join, how much they can earn, what is eligible for commission, promotion rules, and how to contact affiliate support (e.g. info@godgpt.com).

**Independent Test**: Expand at least two FAQ items; answers are readable; support contact (email/link) is findable.

### Implementation for User Story 5

- [x] T026 [US5] Add FAQ section with "Frequently Asked Questions" heading and accordion/list structure (details/summary or Alpine) in index.html to match screen.png
- [x] T027 [US5] Add all seven FAQ items and answers from code.html including who can join, how much to earn, what is eligible for commission, GodGPT user requirement, promotion restrictions, how GodGPT differs, and affiliate support contact (mailto:info@godgpt.com) in index.html

**Checkpoint**: FAQ matches screen.png and code.html; content readable without JS where possible (e.g. details/summary or all-expanded fallback).

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Link audit, responsiveness, and quickstart validation so the page meets spec and matches screen.png/code.html end-to-end.

- [x] T028 [P] Audit all CTAs and footer links in index.html against specs/001-landing-page-website/contracts/external-links.md and set hrefs (godgpt.tolt.io for primary CTAs, placeholders where TBD)
- [x] T029 Verify responsive layout 320px–1920px: no horizontal scroll, readable text, primary CTAs at least 44px touch target, header nav collapses to menu on small viewport in index.html
- [x] T030 Run quickstart.md validation: serve page (e.g. npx serve .), spot-check hero, calculator, header nav, FAQ expand/collapse, and CTA/footer links

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies; start first.
- **Phase 2 (Foundational)**: Depends on Phase 1; blocks all user story phases.
- **Phases 3–9 (User stories)**: Depend on Phase 2. Phase 3 (US7) and Phase 4 (US1) are P1; Phases 5–7 are P2; Phases 8–9 are P3. Can be done sequentially in phase order.
- **Phase 10 (Polish)**: Depends on Phases 3–9 being complete.

### User Story Dependencies

- **US7 (Header)**: After Phase 2; no dependency on other stories.
- **US1 (Hero)**: After Phase 2; no dependency on other stories (MVP).
- **US2, US3, US6**: After Phase 2; can be built in any order after US1/US7.
- **US4, US5**: After Phase 2; can be built in any order.

### Parallel Opportunities

- T002 and T003 can run in parallel (Phase 1).
- Within US7: T007 and T008 can run in parallel.
- Within US1: T011 can run in parallel with later tasks once hero structure exists.
- T028 can run in parallel with T029 once all sections exist.

---

## Parallel Example: Phase 1

```bash
# After T001 (index.html created from code.html):
Task T002: "Add Tailwind CSS and Alpine.js via CDN in index.html"
Task T003: "Add dark theme config and global styles in index.html"
```

---

## Implementation Strategy

### MVP First (User Stories 1 + 7)

1. Complete Phase 1: Setup  
2. Complete Phase 2: Foundational  
3. Complete Phase 3: US7 Header  
4. Complete Phase 4: US1 Hero  
5. **STOP and VALIDATE**: Open page; hero and header match screen.png; primary CTA works.  
6. Deploy or hand off for review.

### Incremental Delivery

1. Setup + Foundational → page shell and nav targets ready  
2. US7 + US1 → MVP (header + hero)  
3. US2 → Calculator  
4. US3 → How it works  
5. US6 → Final CTA + footer  
6. US4 → Community  
7. US5 → FAQ  
8. Polish → Links, responsive, quickstart check  

### Reference Compliance

- Use **screen.png** for layout, section order, copy, and visual hierarchy.  
- Use **code.html** for markup patterns, Tailwind classes, Alpine.js calculator and FAQ behavior, and exact copy.  
- Use **specs/001-landing-page-website/contracts/external-links.md** for all CTA and footer URLs.

---

## Notes

- [P] = parallelizable where noted.  
- [USn] = task belongs to that user story for traceability.  
- Each user story phase is independently testable per "Independent Test" and "Checkpoint".  
- Commit after each task or logical group.  
- Keep index.html under ~400 lines per file guideline by splitting only if necessary (e.g. optional assets/css or assets/js for calculator/FAQ if extracted later).
