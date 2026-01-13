# 2025 Wrap Campaign: "Your 2025 Wrapped, Your 2026 Revealed"

**Status:** 🚨 URGENT - Launch ASAP | **Current Date:** January 12, 2026 | **Owner:** Marketing Team

## 📋 Campaign Overview

**What:** Time-sensitive campaign leveraging users' 2025 Instagram wrapped content to generate personalized 2026 roadmaps with monthly themes and actionable guidance.

**Core Concept:**
- **Input:** Users upload 2025 wrap content (reflections, goals, challenges)
- **Process:** AI analyzes patterns, hidden themes, and growth opportunities
- **Output:** 12 personalized monthly themes + step-by-step action plans

**Key Messaging:**
- Hook: "Your 2025 Wrapped, Your 2026 Revealed"
- Value: "12,847 people discovered their 2026 theme this week"
- Differentiator: "100% personalized based on YOUR journey—not generic predictions"
- Urgency: "Only 247 Free Readings Left This Week"

## 🎯 Goals

**Primary:**
- User Acquisition: 10,000-15,000 new users by end of January
- Engagement: Deep engagement through personalized content
- Conversion: Free January preview → Full 12-month roadmap
- Brand Positioning: Establish GodGPT as personalized AI guidance leader

**Secondary:**
- Build community around 2026 themes (Discord)
- Generate UGC and testimonials
- Create viral potential through shareable themes

## 💡 Why Now?

- **Cultural Moment:** Year-end reflection momentum still strong in January
- **Remaining Window:** ~2-3 weeks of peak relevance (through end of January)
- **Competitive Advantage:** Deep AI personalization vs. generic responses
- **User Need:** People want actionable, personalized guidance

## 🚀 How We're Doing It

### User Journey (In-App Flow)
1. **Awareness:** Banner in app → Tap "Get your Lunar New Year Reading" → In-app feature opens
2. **Engagement:** Upload 2025 wrap content directly in app → AI analysis → Instant January theme preview
3. **Conversion:** Full 12-month roadmap unlock within app → Save themes → Share to community

### Marketing Channels
**Primary:** In-App Banner | Push Notifications | Email Marketing | Social Media (Instagram/TikTok)  
**Secondary:** Discord Community | Influencer Partnerships | Paid Advertising (driving app installs)

### Conversion Funnel
```
Awareness → Interest → Engagement → Value Delivery → Conversion → Retention
```

## 📱 In-App Feature Implementation

### In-App Feature Integration Overview

The campaign will be integrated as an **in-app feature** accessible via a promotional banner positioned at the bottom of the main chat interface. This banner promotes the "Lunar New Year Reading" feature and opens the in-app flow when tapped.

**Screenshot Reference:** 
- Visual example: `marketing/godgpt-banner-screenshot-ready.html` 
- The banner appears at the bottom of the main chat interface with gradient background (purple to pink)
- Shows "✨ Get your Lunar New Year Reading →" as the main CTA
- Tapping the banner opens the in-app feature flow (no external navigation)

### Product Team Brief

**For UI/UX Team:**

**Banner Copy & Navigation:**
- **Banner Text:** "✨ Get your Lunar New Year Reading →"
- **Action:** Tapping banner opens in-app feature flow (modal/screen transition)
- **Positioning:** Fixed at bottom of main chat interface, above keyboard/input area
- **Dismissible:** Yes, with X button on right side (optional - can be persistent for campaign period)

**Banner Components (Left to Right):**
1. **Left Section:** Download prompt with GodGPT logo (Ψ symbol) + "Download now" text
2. **Center Section:** Main CTA button with gradient background (purple to pink)
3. **Right Section:** QR code (desktop/tablet) + dismiss button (X icon)

### Detailed Product Dev Brief

**UI/UX Specifications:**

**Banner Container:**
- **Background:** Gradient from `#1a0a2e` (dark purple) via `#2d1b4e` to `#1a0a2e`
- **Border:** 1px solid with purple glow (`rgba(168,85,247,0.3)`)
- **Border Radius:** 16px (rounded-2xl)
- **Padding:** 16px (p-4)
- **Shadow:** `0 4px 20px rgba(168,85,247,0.3)` for depth
- **Width:** Max-width container, responsive to screen size
- **Position:** Fixed at bottom, above input field/keyboard

**Left Section - Download Prompt:**
- **Logo:** Circular gradient background (purple to pink), white Ψ symbol, 32x32px
- **Text Stack:**
  - "Download now" - white, semibold, 12px
  - "GodGPT" - gray-400, 10px
- **Layout:** Flex row, items-center, gap-12px

**Center Section - Main CTA Button:**
- **Text:** "✨ Get your Lunar New Year Reading →"
- **Background:** Gradient from `#9333ea` (purple-600) to `#db2777` (pink-600)
- **Text Color:** White, semibold, 14px
- **Padding:** 16px horizontal, 10px vertical (px-4 py-2.5)
- **Border Radius:** 12px (rounded-xl)
- **Hover State:** 
  - Scale: 1.05
  - Shadow: `0 0 20px rgba(168,85,247,0.6)`
  - Arrow icon translates right
- **Icon:** Sparkle emoji (✨) + arrow icon (→) on right
- **Action:** Opens in-app feature flow (modal overlay or full-screen transition)

**Right Section - QR Code & Dismiss:**
- **QR Code:** 48x48px white background with black/white pattern, centered Ψ symbol
- **Dismiss Button:** 28x28px circular, gray-800 background, X icon, hover state
- **Visibility:** Hidden on mobile (< 640px), visible on tablet/desktop

**Responsive Behavior:**
- **Mobile:** Banner stacks vertically if needed, QR code hidden
- **Tablet/Desktop:** Full horizontal layout with all elements visible
- **Touch Targets:** Minimum 44x44px for all interactive elements

**Animation & Interactions:**
- **Hover:** Button scales and glows on hover (desktop)
- **Tap/Press:** Button feedback with opacity change (mobile)
- **Dismiss:** Smooth fade-out animation when dismissed
- **Loading:** Banner appears with fade-in on app load

**In-App Feature Flow:**
1. **Entry Point:** Banner tap opens feature modal/screen
2. **Input Screen:** User uploads 2025 wrap content (text input, file upload, or chat-based)
3. **Processing:** AI analysis happens in-app with loading state
4. **Preview Screen:** January theme preview displayed immediately
5. **Upsell Screen:** Option to unlock full 12-month roadmap
6. **Results Screen:** Full roadmap viewable in-app, shareable, saveable

**Technical Implementation:**
- **Banner Component:** Reusable banner component for future campaigns
- **Feature Module:** New in-app feature module for "2026 Reading"
- **State Management:** Track feature usage, dismiss state (localStorage for persistence)
- **AI Integration:** In-app API calls for pattern analysis and theme generation
- **Data Storage:** User submissions and themes stored in-app (can sync to backend)
- **Analytics:** Track banner impressions, feature opens, completion rate, conversions
- **A/B Testing:** Test banner copy, feature flow, and conversion points
- **Accessibility:** ARIA labels, keyboard navigation support, screen reader friendly

**Integration Points:**
- **App Location:** Bottom of main chat interface, above input field
- **Feature Access:** Modal overlay or dedicated screen (depending on app architecture)
- **Conditional Display:** Banner shows only during campaign period (Jan 15 - Feb 7)
- **User State:** Can be shown to all users or specific segments
- **Frequency:** Persistent (always visible) or dismissible (one-time per session)
- **Offline Support:** Feature works offline for content input, syncs when online

**Campaign-Specific Details:**
- **Campaign Name:** "Lunar New Year Reading" (positioned as seasonal in-app feature)
- **Timing:** Active Jan 15 - Feb 7, 2026
- **Target Audience:** All active GodGPT users (in-app)
- **Conversion Goal:** Feature completion → Theme unlock → Full roadmap purchase

## ⏰ Timeline

### Phase 1: Launch (Jan 12-15) - 3-4 Days

**Pre-Launch (Jan 12-14):**
- [ ] Finalize in-app feature design and UX flow
- [ ] Build banner component and in-app feature module
- [ ] Integrate AI analysis API for pattern recognition
- [ ] Set up in-app analytics and tracking
- [ ] Test in-app feature flow (upload → analysis → preview → unlock)
- [ ] Prepare push notification copy
- [ ] Quick social media content batch (3-5 posts)
- [ ] Quick influencer outreach (5-10 contacts)
- [ ] Prepare paid ads creative (driving app installs/feature awareness)

**Launch (Jan 15):**
- [ ] Deploy in-app feature to production
- [ ] Activate banner in app
- [ ] Send push notifications to active users
- [ ] Begin organic social media promotion
- [ ] Paid advertising activation (if budget approved)
- [ ] Influencer partnerships go live
- [ ] Community building (Discord)

**Goal:** Live by Jan 15, 500+ submissions by Jan 17

### Phase 2: Scale & Optimize (Jan 16 - Feb 7) - Ongoing

**Daily Execution:**
- [ ] Daily social media posts and engagement
- [ ] Real-time feature usage monitoring
- [ ] Daily optimization based on in-app analytics
- [ ] UGC collection and sharing
- [ ] Testimonial collection
- [ ] Community engagement
- [ ] A/B testing banner and feature flow
- [ ] Conversion optimization (preview → full roadmap unlock)
- [ ] Push notification optimization
- [ ] Scale successful channels
- [ ] Continue theme delivery in-app

**Weekly Focus:**
- [ ] Performance review and optimization
- [ ] Fresh content creation
- [ ] Data analysis and insights
- [ ] Pivot messaging if needed

**Goal:** 10,000+ submissions by Jan 31, 15,000+ by Feb 7

## 📊 Key Milestones

| Date | Milestone | Target |
|------|-----------|--------|
| **Jan 15** | Campaign live | Launch |
| **Jan 17** | First 500 submissions | 500 users |
| **Jan 20** | First 2,000 submissions | 2,000 users |
| **Jan 24** | 5,000+ submissions | 5,000 users |
| **Jan 31** | 10,000+ submissions | 10,000 users |
| **Feb 7** | Campaign review | 15,000+ users |

## 📈 Success Metrics

**Acquisition:** Banner impressions | Feature opens | New user sign-ups | App installs (from ads)  
**Engagement:** Feature completion rate | Theme preview views | Full roadmap unlocks | In-app shares  
**Business:** Free preview → paid roadmap conversion | In-app purchase rate | CAC | LTV | MRR  
**Brand:** Brand awareness | Testimonials | UGC volume | Organic growth | App store ratings

## ✅ Key Success Factors

- ⏱️ **Timing:** Launch during remaining peak reflection period
- 🎯 **Personalization:** Deep AI analysis vs. generic responses
- 💎 **Value:** Free preview + comprehensive roadmap
- 👥 **Community:** Shared journey themes create connection
- 🔥 **Urgency:** Limited-time offer drives action

## 📝 Expected Outcomes

- 10,000-15,000 new users by end of January (3-week window)
- Strong conversion from free to paid
- Vibrant community around 2026 themes
- Enhanced brand positioning as personalized AI guidance leader
- Rich user data for product improvement

**Note:** Aggressive timeline requires fast execution and daily optimization

**Document Version:** 1.2 (In-App Feature Update) | **Last Updated:** January 12, 2026
