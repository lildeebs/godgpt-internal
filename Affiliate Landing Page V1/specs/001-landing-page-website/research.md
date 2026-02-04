# Research: GodGPT Affiliate Landing Page

**Feature**: 001-landing-page-website  
**Phase**: 0 (Outline & Research)

## 1. Technology stack (match reference vs. framework)

**Decision**: Implement as static HTML + Tailwind CSS + Alpine.js, aligned with the reference `code.html`.

**Rationale**:
- Spec and user request explicitly reference `code.html`; matching its stack minimizes drift and rework.
- Tailwind (CDN or build) supports the existing dark theme, gradients, and responsive layout without custom CSS.
- Alpine.js provides reactive state for the commission calculator and declarative expand/collapse for FAQ with minimal JS surface.
- No backend or build step is required for MVP; the page can be served as static files.

**Alternatives considered**:
- **React/Next/Vue**: Rejected for this scope; adds tooling and deployment complexity without a spec requirement for components or routing.
- **Vanilla JS only**: Acceptable; would require manual DOM updates for calculator and FAQ. Alpine keeps the reference behavior with less code.
- **Tailwind build (npm)**: Optional later for smaller CSS; CDN is sufficient for initial delivery and matches code.html.

---

## 2. Commission calculator formula and defaults

**Decision**: Use the same formula and defaults as in `code.html`: 30% commission; Premium Weekly $5, Monthly $15, Annual $120, God Mode $888; monthly total = (weekly × 5 × 0.30 × 4.33) + (monthly × 15 × 0.30) + (annual × 120 × 0.30 / 12) + (godMode × 888 × 0.30 / 12). Default referral counts: Weekly 10, Monthly 15, Annual 2, God Mode 0.

**Rationale**: Spec and reference fix plan names, prices, and commission; consistency with code.html avoids re-deriving and keeps numbers comparable.

**Alternatives considered**: None; spec and reference are explicit.

---

## 3. Responsive and no-JS behavior

**Decision**: 
- Layout and typography responsive 320px–1920px (Tailwind breakpoints); header nav collapses to a menu on small viewports.
- Without JavaScript: all sections and copy are still in the DOM and readable; calculator shows a static default total and note that sliders require JS; FAQ answers can be shown by default (all open) or in a single “FAQ” block so content is never hidden.

**Rationale**: Spec edge cases require content available without JS and usable on mobile; progressive enhancement keeps core message and CTAs always available.

**Alternatives considered**: FAQ “all collapsed” with no JS would hide answers; rejected. “All expanded” or static list is acceptable and accessible.

---

## 4. External links and CTA destinations

**Decision**: Document all primary CTA and footer links in `contracts/` (or a single doc) as the source of truth: affiliate sign-up URL (e.g. godgpt.tolt.io), Get App, Join Discord, footer app/company/social, and legal (Privacy, Terms). Use placeholders (e.g. `#`) where URLs are TBD; replace when business provides final links.

**Rationale**: Spec requires correct destinations for CTAs and footer; a single contracts/doc file avoids hardcoding and supports quick updates.

**Alternatives considered**: Hardcoding only in HTML is acceptable but harder to audit; a contracts list improves clarity for implementation and content updates.
