# Feature Specification: GodGPT Affiliate Landing Page

**Feature Branch**: `001-landing-page-website`  
**Created**: 2026-02-04  
**Status**: Draft  
**Input**: User description: "refer to code.html and implement the landing page for website"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visitor discovers affiliate program and primary value (Priority: P1)

A prospective affiliate visits the website and immediately understands what GodGPT’s affiliate program is, how much they can earn (30% recurring commission), and how to join.

**Why this priority**: The hero and value proposition are the main conversion driver; without them the page has no clear purpose.

**Independent Test**: Open the landing page and confirm the hero shows the program name, “30% recurring commission,” a primary call-to-action (e.g. “Become an Affiliate”), and optional trust stats (e.g. total earnings, referrals, reach). No login or backend required.

**Acceptance Scenarios**:

1. **Given** a visitor opens the landing page, **When** they view the top section (hero), **Then** they see a clear headline about earning with GodGPT and a prominent CTA to join the affiliate program.
2. **Given** a visitor is on the hero, **When** they read the supporting text, **Then** they see that the offer is 30% recurring commission on referrals.
3. **Given** a visitor is on the hero, **When** they look for social proof, **Then** they see at least one of: total earnings, monthly referrals, or geographic reach (or equivalent metrics).

---

### User Story 2 - Visitor estimates earnings with commission calculator (Priority: P2)

A visitor wants to see how much they could earn. They use an interactive calculator that lets them adjust referral counts per plan (e.g. Weekly, Monthly, Annual, God Mode) and see an estimated total monthly earnings figure.

**Why this priority**: The calculator turns interest into concrete numbers and supports sign-up decisions.

**Independent Test**: Use the calculator by changing referral sliders; confirm the displayed “Total Estimated Earnings” updates correctly and reflects the stated commission (30%) and plan prices.

**Acceptance Scenarios**:

1. **Given** the visitor is on the commission/calculator section, **When** they view it, **Then** they see plan types (e.g. Premium Weekly $5, Premium Monthly $15, Premium Annual $120, God Mode Annual $888) and a control per plan to set number of referrals.
2. **Given** the visitor changes any referral count, **When** the value updates, **Then** the “Total Estimated Earnings” (or equivalent) updates to reflect 30% commission and show a monthly estimate.
3. **Given** the visitor reads the calculator, **When** they look for clarification, **Then** they see a note that the estimate is based on 30% recurring commission.

---

### User Story 3 - Visitor learns how the program works (Priority: P2)

A visitor wants to understand the steps to become an affiliate and earn. They read a “How it works” section that explains join → share → earn in simple steps.

**Why this priority**: Reduces uncertainty and supports conversion.

**Independent Test**: Scroll to “How it works” and confirm three steps are present (e.g. Join program, Share & guide, Earn recurring) with short descriptions. No backend required.

**Acceptance Scenarios**:

1. **Given** the visitor is on the “How it works” section, **When** they read it, **Then** they see at least three steps (e.g. sign up/get link, share with audience, earn recurring commission).
2. **Given** each step, **When** the visitor reads the copy, **Then** the copy is clear and non-technical (suitable for non-developers).

---

### User Story 4 - Visitor explores community and support (Priority: P3)

A visitor wants to know what support and resources they get. They see a “Community” or “We’re committed to your success” section listing benefits (e.g. Discord, assets, case studies, support) and a way to join (e.g. “Join Discord”).

**Why this priority**: Builds trust and reduces friction for sign-up.

**Independent Test**: Scroll to the community/support section and confirm at least two benefits are listed and a CTA (e.g. Join Discord) is present and actionable (link or button).

**Acceptance Scenarios**:

1. **Given** the visitor is on the community/support section, **When** they view it, **Then** they see at least two benefits (e.g. community, media assets, case studies, priority support).
2. **Given** the section includes a CTA to join a community (e.g. Discord), **When** the visitor clicks it, **Then** they are taken to the intended destination (or a placeholder is clearly indicated).

---

### User Story 5 - Visitor gets answers from FAQ (Priority: P3)

A visitor has common questions (who can join, how much they can earn, what counts for commission, promotion rules, support contact). They find an FAQ section where they can expand/collapse answers.

**Why this priority**: FAQ reduces support load and helps hesitant visitors convert.

**Independent Test**: Open the FAQ section and expand at least two questions; confirm answers are readable and relevant (e.g. eligibility, commission, eligibility for commission, promotion rules, contact).

**Acceptance Scenarios**:

1. **Given** the visitor is on the FAQ section, **When** they view it, **Then** they see multiple questions; at least one about who can join, one about earnings/commission, and one about how to get support.
2. **Given** a FAQ item, **When** the visitor expands it (or views the answer), **Then** the answer is visible and understandable without technical knowledge.
3. **Given** the visitor looks for support contact, **When** they read the FAQ, **Then** they can find an email or link for affiliate support (e.g. info@godgpt.com or equivalent).

---

### User Story 6 - Visitor converts via final CTA and footer (Priority: P2)

A visitor who has scrolled the page sees a final “Ready to amplify your influence?” (or equivalent) CTA and a footer with brand, app/company links, social links, and legal links (e.g. Privacy, Terms).

**Why this priority**: The final CTA and footer complete the journey and support trust.

**Independent Test**: Scroll to bottom; confirm one main CTA (e.g. “Start Earning Now”) and a footer with brand, navigation, and legal links. Primary CTA may point to godgpt.tolt.io or equivalent.

**Acceptance Scenarios**:

1. **Given** the visitor scrolls to the bottom CTA block, **When** they view it, **Then** they see a headline and a primary button/link (e.g. “Start Earning Now”) that leads to the affiliate sign-up or intended destination.
2. **Given** the visitor views the footer, **When** they look for navigation, **Then** they see at least: brand name, app-related links (e.g. Features, Learn, Download), company link (e.g. Contact), and social links (e.g. Discord, TikTok, Instagram, YouTube, Telegram, X).
3. **Given** the visitor views the footer, **When** they look for legal information, **Then** they see links or text for Privacy Policy and Terms of Service, and a copyright notice.

---

### User Story 7 - Visitor navigates via header (Priority: P1)

A visitor uses the header to reach key sections (How it works, Commission, Community, FAQ) and to access the main app (e.g. “Get App”) or primary CTA.

**Why this priority**: Header is the main navigation; without it the long page is hard to use.

**Independent Test**: Use header links to jump to each section; confirm targets exist and are correct. On small screens, a menu control may be present instead of full nav links.

**Acceptance Scenarios**:

1. **Given** the visitor is on the page, **When** they view the header, **Then** they see the GodGPT brand/logo and at least one of: inline nav links (How it works, Commission, Community, FAQ) or a menu that reveals them.
2. **Given** the visitor clicks a header nav link (e.g. “How it works”, “Commission”, “Community”, “FAQ”), **When** the page responds, **Then** the corresponding section is brought into view or navigated to.
3. **Given** the visitor views the header, **When** they look for the main app or primary action, **Then** they see a “Get App” or equivalent button; it may link to the main product or stay as a visual CTA.

---

### Edge Cases

- What happens when the visitor has JavaScript disabled? The page must still show all content and structure; the commission calculator may show default values only (no live calculation) or a static example.
- What happens when the visitor uses a small viewport (mobile)? Navigation may collapse to a menu; sections remain readable; buttons and links remain usable (e.g. minimum touch target 44px equivalent).
- What happens when the visitor uses keyboard or screen reader? Headings and landmarks (e.g. header, main, sections, footer) support logical order and section identification; interactive elements (links, buttons, FAQ toggles) are focusable and operable.
- What happens when an external resource (e.g. font, image, Discord/CTA link) fails to load? Core message and CTAs remain visible; broken assets do not block access to primary actions.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide a single-page website that presents the GodGPT affiliate program as the primary subject.
- **FR-002**: The system MUST display a hero section with a headline referencing earning with GodGPT, a 30% recurring commission message, and at least one primary CTA (e.g. “Become an Affiliate”).
- **FR-003**: The system MUST display an earnings/commission calculator that allows users to adjust referral counts for at least: Premium Weekly ($5), Premium Monthly ($15), Premium Annual ($120), and God Mode Annual ($888), and MUST display a total estimated monthly earnings value based on 30% recurring commission.
- **FR-004**: The system MUST display a “How it works” section with at least three steps (e.g. join program, share & guide, earn recurring) and short descriptive text for each.
- **FR-005**: The system MUST display a community/support section with at least two benefits (e.g. community, media assets, case studies, priority support) and a CTA to join (e.g. Join Discord).
- **FR-006**: The system MUST display an FAQ section with expandable or visible answers covering at least: who can join, how much can be earned, what is eligible for commission, and how to contact affiliate support (e.g. email).
- **FR-007**: The system MUST provide a sticky or fixed header with GodGPT branding and navigation to sections: How it works, Commission, Community, FAQ; and a primary action (e.g. Get App).
- **FR-008**: The system MUST provide a final CTA block (e.g. “Ready to amplify your influence?”) with a primary button/link to the affiliate sign-up or intended destination (e.g. godgpt.tolt.io).
- **FR-009**: The system MUST provide a footer with: GodGPT brand and short tagline; app links (e.g. Features, Learn, Download); company link (e.g. Contact); social links (e.g. Discord, TikTok, Instagram, YouTube, Telegram, X); and links or text for Privacy Policy, Terms of Service, and copyright.
- **FR-010**: The system MUST support optional trust/social proof in the hero (e.g. total earnings, monthly referrals, countries) with visible labels so numbers are interpretable.
- **FR-011**: The system MUST ensure all primary CTAs (Become an Affiliate, Start Earning Now, Join Discord, Get App) are implemented as links or buttons that point to the correct destinations or placeholders.
- **FR-012**: The system MUST present content in a way that works across common viewport sizes (e.g. mobile and desktop) with readable text and usable controls.

### Key Entities

- **Landing page**: The single-page website that represents the GodGPT affiliate program; composed of sections (hero, commission, how it works, community, FAQ, final CTA, footer) and a header.
- **Commission calculator**: Logical entity that takes inputs (referral counts per plan) and plan pricing and commission rate (30%) and produces a total estimated monthly earnings value for display.
- **FAQ item**: A question and its answer, shown in the FAQ section; no persistence required.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can identify the offer (30% recurring commission) and find a primary CTA to join within 10 seconds of landing on the page.
- **SC-002**: A visitor can use the commission calculator to change referral counts and see an updated estimated monthly earnings value that matches the stated 30% commission and plan prices.
- **SC-003**: A visitor can reach each of the sections (How it works, Commission, Community, FAQ) from the header (or mobile menu) in one click or tap.
- **SC-004**: The page loads and displays all critical content (hero, calculator, how it works, community, FAQ, CTA, footer) so that 95% of users on typical networks see the full layout within 5 seconds.
- **SC-005**: The page is usable on viewports from 320px to 1920px width without horizontal scrolling and with readable text and tappable/clickable CTAs (e.g. minimum 44px touch target for primary actions).
- **SC-006**: At least 90% of FAQ questions (who can join, earnings, commission eligibility, support contact) are answerable from the FAQ section without leaving the page.

## Assumptions

- The reference design (code.html) defines the desired content and structure; the spec captures behavior and content, not a specific technology stack.
- Plan names and prices (Premium Weekly $5, Premium Monthly $15, Premium Annual $120, God Mode Annual $888) and 30% commission are fixed for this feature unless the product changes.
- “Get App” and “Start Earning Now” / “Become an Affiliate” may point to existing URLs (e.g. godgpt.tolt.io) or placeholders; the spec does not require a specific backend or auth.
- Trust metrics (e.g. $120k+ earnings, 5000+ monthly referrals, 95+ countries) may be placeholders or updated by the business; the requirement is to show labeled stats, not live data.
- Affiliate support email (e.g. info@godgpt.com) is correct per business; the spec requires a visible contact method in FAQ.
- Footer social and app links may point to placeholders or real URLs; the requirement is that the links exist and are correct in content and structure.
- Accessibility and responsiveness are interpreted as: logical structure, readable text, usable controls, and no horizontal scroll on small screens; full WCAG 2.1 AA can be a separate initiative.
