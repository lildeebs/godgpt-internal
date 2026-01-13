# Download Banner with Marketing Landing Page Integration

## Overview

This banner component integrates the marketing landing page (`https://lildeebs.github.io/GodGPT-Marketing/godgpt-info/`) as a clickable call-to-action in the "Download now" section at the bottom of the GodGPT app interface.

## Features

✨ **Prominent Marketing CTA**
- "Get Your 2026 Reading" button that links to the marketing landing page
- Glowing purple/pink gradient design matching brand colors
- Hover effects and smooth transitions

📱 **Responsive Design**
- Desktop: Full banner with phone mockups, QR code, and CTA
- Mobile: Simplified layout with prominent CTA button
- Adapts seamlessly to all screen sizes

🎨 **Design Elements**
- Matches existing GodGPT dark theme
- Purple/pink gradient backgrounds
- Animated phone mockups (floating effect)
- QR code with Ψ symbol
- Dismissible with close button

## Preview Options

### Option 1: Standalone HTML Mockup
Open the standalone HTML file to see the banner in context:
```bash
open marketing/download-banner-mockup.html
```
Or visit: `marketing/download-banner-mockup.html`

### Option 2: Next.js Preview Page
Run the dev server and visit:
```bash
npm run dev
# Then visit: http://localhost:3000/banner-preview
```

## Component Usage

### Import the Component
```tsx
import DownloadBanner from '@/components/DownloadBanner';
```

### Add to Your Layout
```tsx
export default function Layout({ children }) {
  return (
    <div>
      {children}
      <DownloadBanner />
    </div>
  );
}
```

### Or Add to Specific Pages
```tsx
export default function HomePage() {
  return (
    <div>
      {/* Your page content */}
      <DownloadBanner />
    </div>
  );
}
```

## Banner Structure

### Desktop Layout
```
[Download Now + Logo] [Marketing CTA Button] [Phone Mockups] [QR Code] [Close Button]
```

### Mobile Layout
```
[Download Now + Logo]
[Marketing CTA Button - Full Width]
[Close Button]
```

## Customization

### Change Marketing URL
Edit `src/components/DownloadBanner.tsx`:
```tsx
href="https://lildeebs.github.io/GodGPT-Marketing/godgpt-info/"
```

### Adjust Colors
The banner uses Tailwind classes:
- Background: `from-[#1a0a2e] via-[#2d1b4e] to-[#1a0a2e]`
- CTA Button: `from-purple-600 to-pink-600`
- Border: `border-purple-500/30`

### Modify Text
Update the button text:
```tsx
<span>Get Your 2026 Reading</span>
```

## Integration Points

### Web Application
Add to your main layout or homepage:
- `src/app/layout.tsx` (global)
- `src/app/page.tsx` (homepage only)

### Mobile Application
For React Native or mobile web:
- Use the same component structure
- Adjust styling for mobile-specific UI patterns
- Consider native navigation for the link

## Behavior

- **Dismissible**: Users can close the banner with the X button
- **State Management**: Uses React `useState` to track dismissal
- **External Link**: Opens marketing page in new tab
- **Responsive**: Adapts layout based on screen size

## Analytics Tracking

To track banner clicks, add analytics to the link:
```tsx
onClick={() => {
  // Track event
  gtag('event', 'banner_click', {
    'banner_location': 'download_section',
    'destination': 'marketing_landing_page'
  });
}}
```

## Testing

1. **Desktop View**: Test at 1024px+ width
2. **Mobile View**: Test at 375px width
3. **Link Functionality**: Verify external link opens correctly
4. **Dismissal**: Test close button functionality
5. **Responsive Breakpoints**: Test at tablet sizes (768px)

## Next Steps

1. ✅ Component created
2. ✅ Mockup HTML created
3. ✅ Preview page created
4. ⏳ Integrate into main app layout
5. ⏳ Add analytics tracking
6. ⏳ Test on real devices
7. ⏳ Deploy to production

## Files Created

- `src/components/DownloadBanner.tsx` - Main banner component
- `src/app/banner-preview/page.tsx` - Preview page
- `marketing/download-banner-mockup.html` - Standalone HTML mockup
- `marketing/BANNER_MOCKUP_README.md` - This file

## Live Preview Links

- **Standalone Mockup**: Open `marketing/download-banner-mockup.html` in browser
- **Next.js Preview**: http://localhost:3000/banner-preview (when dev server running)
- **Marketing Landing Page**: https://lildeebs.github.io/GodGPT-Marketing/godgpt-info/
