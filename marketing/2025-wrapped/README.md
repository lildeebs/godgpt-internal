# 2025 Wrapped Campaign - Lunar New Year Reading Integration

This folder contains all files related to the 2025 Wrapped campaign and Lunar New Year Reading integration into the GodGPT chatbot interface.

## 📁 Folder Structure

```
2025-wrapped/
├── README.md (this file)
├── HTML Mockups/
│   ├── godgpt-banner-screenshot-ready.html (Desktop version with integrated form)
│   ├── godgpt-mobile-with-form.html (Mobile version with scrollable cards)
│   ├── godgpt-app-with-banner.html (Full app mockup with banner)
│   └── download-banner-mockup.html (Original banner mockup)
├── Documentation/
│   ├── BANNER_MOCKUP_README.md (Banner component documentation)
│   ├── CHATBOT_INTEGRATION_GUIDE.md (Integration guide for chatbot)
│   └── SCREENSHOT_INSTRUCTIONS.md (How to take screenshots)
└── React Components/ (in src/components/)
    ├── DownloadBanner.tsx
    ├── LunarNewYearBanner.tsx
    ├── ChatbotJanuaryForm.tsx
    └── ChatbotIntegrationExample.tsx
```

## 🎯 Campaign Overview

**Campaign Name:** Lunar New Year Reading (2025 Wrapped)
**Duration:** January 15 - February 7, 2026
**Goal:** Integrate January reading form directly into GodGPT chatbot interface

## 📱 Files Description

### HTML Mockups

1. **`godgpt-mobile-with-form.html`** ⭐ **PRIMARY**
   - Mobile app interface matching the screenshot
   - Lunar New Year card as first card in scrollable row
   - Integrated form that appears when card is clicked
   - **Use this for:** Mobile app integration reference

2. **`godgpt-banner-screenshot-ready.html`**
   - Desktop version with banner at bottom
   - Integrated form functionality
   - Optimized for screenshots
   - **Use this for:** Desktop/web integration reference

3. **`godgpt-app-with-banner.html`**
   - Full app interface mockup
   - Shows banner in context
   - **Use this for:** Visual reference

4. **`download-banner-mockup.html`**
   - Original banner mockup
   - Standalone version
   - **Use this for:** Initial design reference

### Documentation

1. **`BANNER_MOCKUP_README.md`**
   - Banner component usage
   - Customization guide
   - Integration points

2. **`CHATBOT_INTEGRATION_GUIDE.md`**
   - Step-by-step integration guide
   - Code examples
   - Backend API setup
   - User flow documentation

3. **`SCREENSHOT_INSTRUCTIONS.md`**
   - How to take screenshots
   - Browser DevTools methods
   - Tips for best results

## 🔧 React Components

Located in `src/components/`:

- **`LunarNewYearBanner.tsx`** - Banner component for chatbot
- **`ChatbotJanuaryForm.tsx`** - Form component for chatbot integration
- **`DownloadBanner.tsx`** - Original download banner (legacy)
- **`ChatbotIntegrationExample.tsx`** - Complete integration example

## 🚀 Quick Start

### For Mobile App Integration

1. Open `godgpt-mobile-with-form.html` as reference
2. Use `LunarNewYearBanner.tsx` and `ChatbotJanuaryForm.tsx` components
3. Follow `CHATBOT_INTEGRATION_GUIDE.md` for step-by-step instructions

### For Desktop/Web Integration

1. Open `godgpt-banner-screenshot-ready.html` as reference
2. Use the same React components
3. Adapt layout for desktop viewport

## 📋 Integration Checklist

- [x] Banner component created
- [x] Form component created
- [x] Mobile mockup created
- [x] Desktop mockup created
- [x] Integration guide written
- [ ] Backend API endpoint created
- [ ] Integrated into main GodGPT app
- [ ] Testing completed
- [ ] Deployed to production

## 🎨 Design Elements

- **Colors:** Purple/pink gradient (`from-purple-600 to-pink-600`)
- **Banner Text:** "✨ Get Your Lunar New Year Reading (Limited Time)"
- **Card Label:** "Limited" badge (yellow)
- **Form:** 3 questions (email required, 2 optional)

## 📝 Notes

- All HTML files use Tailwind CSS CDN
- React components use Next.js and TypeScript
- Form data is stored in localStorage as backup
- Backend endpoint: `/api/january-reading` (POST)

## 🔗 Related Files

- Main landing page: `src/app/2025-wrapped/page.tsx`
- Original form: `src/components/JanuaryReadingForm.tsx`
- Campaign details: `2025-wrapped/campaign-overview/2025-wrap-campaign-lark.md`

## 📞 Support

For questions about integration, refer to:
- `CHATBOT_INTEGRATION_GUIDE.md` for technical details
- `BANNER_MOCKUP_README.md` for component usage
