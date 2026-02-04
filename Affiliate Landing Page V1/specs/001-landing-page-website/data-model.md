# Data Model: GodGPT Affiliate Landing Page

**Feature**: 001-landing-page-website  
**Phase**: 1

This feature has no persistent storage or backend. All “data” is either static content (copy, links) or transient UI state.

---

## 1. Static content (no persistence)

| Concept | Description | Where it lives |
|--------|-------------|----------------|
| **Page copy** | Headlines, body text, FAQ Q&A, plan names and prices | In the HTML (or optional static JSON/CMS later) |
| **CTA and link destinations** | Affiliate sign-up URL, Get App, Discord, footer links, legal URLs | Documented in [contracts/external-links.md](./contracts/external-links.md); implemented as `href` values |
| **Trust metrics** | e.g. $120k+ earnings, 5000+ referrals, 95+ countries | Static text in hero; no live data |

No database or API; no validation rules beyond what is documented in the spec (e.g. plan prices and commission rate).

---

## 2. Transient UI state (client-only)

| Entity | Purpose | Fields / behavior |
|--------|---------|-------------------|
| **Commission calculator** | User-adjustable referral counts and derived total | **Inputs**: `referralsWeekly`, `referralsMonthly`, `referralsAnnual`, `referralsGodMode` (integers 0–100). **Output**: `totalEstimatedEarnings` (monthly $), computed as in [research.md](./research.md). State is in-memory only (e.g. Alpine.js `x-data`); no persistence. |
| **FAQ section** | Expand/collapse answers | Per-item open/closed state (e.g. `<details>` or Alpine). No persistence. |

No state transitions beyond: slider change → recompute total; click summary → toggle open/closed.

---

## 3. Validation rules (from spec)

- **Calculator**: Total MUST reflect 30% commission and fixed plan prices (Premium Weekly $5, Monthly $15, Annual $120, God Mode $888). Formula and defaults are in research.md.
- **Links**: Primary CTAs and footer links MUST point to the destinations listed in `contracts/external-links.md` (or placeholders when URL TBD).

No other entities or validation rules apply.
