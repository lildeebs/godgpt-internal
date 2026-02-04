# Quickstart: GodGPT Affiliate Landing Page

**Feature**: 001-landing-page-website

## Prerequisites

- A modern browser (Chrome, Firefox, Safari, Edge).
- No Node/npm required if using CDN-only (reference `code.html`).
- Optional: Node 18+ and npm if you add a Tailwind build later.

## Run locally

The landing page is static HTML. Use any of the following:

1. **Open file directly**  
   Open `index.html` (or `code.html` as reference) in the browser.  
   Note: Some CDN or `file://` restrictions may apply; prefer a local server for full behavior.

2. **Local HTTP server (recommended)**  
   From the repository root:

   ```bash
   # npx (no install)
   npx serve .

   # or Python 3
   python3 -m http.server 8000
   ```

   Then open `http://localhost:3000` (serve) or `http://localhost:8000` (Python).

3. **VS Code / Cursor**  
   Use “Live Server” or similar extension: right-click `index.html` → “Open with Live Server”.

## Verify

- **Hero**: Headline, “30% recurring commission”, primary CTA visible.
- **Calculator**: Change sliders; “Total Estimated Earnings” updates (monthly, 30%).
- **Nav**: Header links scroll to How it works, Commission, Community, FAQ.
- **FAQ**: Expand/collapse at least one item.
- **CTAs**: “Become an Affiliate”, “Start Earning Now” point to `contracts/external-links.md` URLs (e.g. godgpt.tolt.io).
- **Responsive**: Resize to ~320px width; no horizontal scroll; nav collapses if implemented.

## Build (optional)

If you introduce a Tailwind build (e.g. `npm run build`):

```bash
npm install
npm run build
```

Then serve the `dist/` (or configured output) directory. Until then, CDN-only is sufficient.

## Reference

- **Spec**: [spec.md](./spec.md)  
- **Plan**: [plan.md](./plan.md)  
- **Links**: [contracts/external-links.md](./contracts/external-links.md)
