# 🎄 AI-Powered E-Advent Calendar — Visual Preview & Quick Reference

## 📋 What This Builds

A **personalised e-advent calendar** where AI generates:
1. **🎨 Colour palettes** — based on occasion, relationship, mood
2. **✨ Design aesthetic** — door styles, borders, typography
3. **💌 Daily door messages** — personalised prompts for each day
4. **🖼️ Door illustrations** (optional) — image prompts for future AI image generation

---

## 🎯 Target Users & Use Cases

```
┌─────────────┬─────────────────────────────────────┬──────────────────────────────┐
│ User Type   │ Occasions                            │ Personalisation             │
├─────────────┼─────────────────────────────────────┼──────────────────────────────┤
│ 💑 Couples  │ Christmas, Anniversary, Valentine's  │ Inside jokes, memories       │
│ 👥 Friends  │ Christmas, Birthdays, Countdowns    │ Hobbies, shared experiences │
│ 👨‍👩‍👧‍👦 Family  │ Christmas, Hanukkah, Birthdays    │ Age-appropriate, traditions │
└─────────────┴─────────────────────────────────────┴──────────────────────────────┘
```

---

## 🔄 User Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          SETUP PAGE                                      │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │ 1. Calendar Name: "Sarah's Birthday Calendar"                    │   │
│  │ 2. Duration: 24 days                                            │   │
│  │ 3. Timezone: America/New_York                                    │   │
│  │                                                                  │   │
│  │ 🆕 AI PERSONALISATION (NEW)                                      │   │
│  │ 4. Recipient Name: "Sarah"                                      │   │
│  │ 5. Relationship: ○ Couple  ○ Friend  ● Family                   │   │
│  │ 6. Occasion: Christmas | Birthday | Anniversary | Countdown    │   │
│  │ 7. Mood: Festive | Minimalist | Playful | Nostalgic | Luxury    │   │
│  │ 8. Tone: Sweet | Funny | Nostalgic | Adventurous                │   │
│  │ 9. Colour Hint (optional): "red and gold"                       │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                    COLOUR PALETTE SELECTION                       │   │
│  │                                                                  │   │
│  │  [Pink Dreams] [Ocean Breeze] [Sunset Glow] ...                 │   │
│  │                                                                  │   │
│  │  🆕 [✨ Generate with AI] ← NEW BUTTON                            │   │
│  │     → Calls /api/ai/palette                                      │   │
│  │     → Returns: { name: "Festive Gold", colors: [...] }         │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                          THEME PAGE                                      │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                    DOOR STYLE SELECTION                          │   │
│  │                                                                  │   │
│  │  [Sky Scribble] [Floral Pop] [Sunny Grid] ...                   │   │
│  │                                                                  │   │
│  │  🆕 [✨ Suggest Design with AI] ← NEW BUTTON                    │   │
│  │     → Calls /api/ai/design                                       │   │
│  │     → Returns: { doorStyle: "doodle", borderStyle: "hand-drawn" }│   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │              🆕 GENERATE DOOR CONTENT (NEW SECTION)               │   │
│  │                                                                  │   │
│  │  [✨ Generate All Door Messages]                                 │   │
│  │     → Calls /api/ai/door-prompts                                 │   │
│  │     → Returns: { 1: "Today's question: What's one thing...",    │   │
│  │                   2: "Remember our first Christmas...", ... }    │   │
│  │                                                                  │   │
│  │  [✨ Generate Door Illustrations] (optional)                     │   │
│  │     → Calls /api/ai/door-image-prompts                           │   │
│  │     → Returns: { 1: "hand-drawn star, doodle style...", ... }   │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                        CALENDAR PAGE                                     │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │              Sarah's Birthday Calendar                            │   │
│  │                                                                  │   │
│  │  ┌───┐ ┌───┐ ┌───┐ ┌───┐                                        │   │
│  │  │ 1 │ │ 2 │ │ 3 │ │ 4 │  ... (24 doors)                         │   │
│  │  └───┘ └───┘ └───┘ └───┘                                        │   │
│  │                                                                  │   │
│  │  When door opens:                                                │   │
│  │  ┌──────────────────────────────────────────────────────────┐   │   │
│  │  │  ✨                                                       │   │   │
│  │  │  Day 1                                                    │   │   │
│  │  │  "Today's question: What's one thing you're grateful      │   │   │
│  │  │   for about us? 🌟"                                       │   │   │
│  │  │  ← AI-generated message (from doorPrompts[1])            │   │   │
│  │  └──────────────────────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Implementation Phases

### Phase 1: Setup & Data Collection ⭐ START HERE
**What:** Add AI personalisation inputs to Setup page  
**Files:** `app/setup/page.tsx`, `app/store.ts`  
**Adds:** Recipient name, relationship, occasion, mood, tone, colour hint

### Phase 2: AI Colour Palettes 🎨
**What:** Generate palettes with AI  
**Files:** `app/api/ai/palette/route.ts`, `app/setup/page.tsx`  
**Adds:** "Generate with AI" button → API → returns `{ name, colors[] }`

### Phase 3: AI Design Config ✨
**What:** Suggest door style, borders, typography  
**Files:** `app/api/ai/design/route.ts`, `app/theme/page.tsx`  
**Adds:** "Suggest design with AI" → returns `{ doorStyle, borderStyle, ... }`

### Phase 4: AI Door Messages 💌
**What:** Generate personalised messages for each day  
**Files:** `app/api/ai/door-prompts/route.ts`, `app/components/Door.tsx`  
**Adds:** "Generate door messages" → returns `{ 1: "message", 2: "message", ... }`  
**Shows:** When door opens, display `doorPrompts[day]` instead of generic text

### Phase 5: AI Door Image Prompts 🖼️ (Optional)
**What:** Generate image prompts for future AI image generation  
**Files:** `app/api/ai/door-image-prompts/route.ts`  
**Adds:** Stores prompts in `doorImagePrompts` (not used for images yet, just stored)

### Phase 6: Sharing & Gifting 🎁 (Optional)
**What:** Share calendar with recipient via link  
**Files:** New route `/c/[id]`, backend/DB for sharing

---

## 📦 Data Model Changes

### Extended `AdventCalendar` in `app/store.ts`:

```typescript
export type Relationship = 'couple' | 'friend' | 'family'
export type Occasion = 'christmas' | 'birthday' | 'anniversary' | 'countdown' | 'other'

export interface AdventCalendar {
  // Existing fields
  name: string
  length: number
  palette: ColorPalette
  openedDoors: number[]
  createdAt: string
  timezone: string
  doorStyle: 'doodle' | 'classic' | 'watercolour' | 'minimal' | 'maximal' | 'retro'
  doorPrompts?: Record<number, string>
  
  // 🆕 NEW AI fields
  recipientName?: string
  relationship?: Relationship
  occasion?: Occasion
  mood?: string
  tone?: string
  designConfig?: {
    borderStyle?: string
    typographyHint?: string
    stylePrompt?: string
  }
  doorImagePrompts?: Record<number, string>
}
```

---

## 🔌 API Routes to Create

| Route | Input | Output | Purpose |
|-------|-------|--------|---------|
| `/api/ai/palette` | `{ occasion, relationship, mood, colourHint? }` | `{ name, colors[] }` | Generate colour palette |
| `/api/ai/design` | `{ occasion, relationship, mood, doorStylePreference? }` | `{ doorStyle, borderStyle, typographyHint, stylePrompt }` | Suggest design config |
| `/api/ai/door-prompts` | `{ recipientName, relationship, occasion, mood, tone?, length }` | `Record<number, string>` | Generate all door messages |
| `/api/ai/door-image-prompts` | `{ recipientName, relationship, occasion, palette, stylePrompt?, length }` | `Record<number, string>` | Generate image prompts |

**All routes:**
- Use `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` from env
- Return JSON only (parse with `JSON.parse`)
- Handle errors gracefully with "Try again" UI

---

## 🎨 Example AI Outputs

### Palette Generation
**Input:** `{ occasion: "christmas", relationship: "couple", mood: "festive", colourHint: "red and gold" }`  
**Output:**
```json
{
  "name": "Festive Gold & Crimson",
  "colors": ["#DC143C", "#FFD700", "#8B0000", "#FFF8DC", "#FFE4E1"]
}
```

### Design Config
**Input:** `{ occasion: "christmas", relationship: "couple", mood: "playful" }`  
**Output:**
```json
{
  "doorStyle": "doodle",
  "borderStyle": "hand-drawn",
  "typographyHint": "playful rounded",
  "stylePrompt": "soft watercolour, warm lights, winter cosy"
}
```

### Door Prompts
**Input:** `{ recipientName: "Sarah", relationship: "family", occasion: "birthday", mood: "sweet", tone: "nostalgic", length: 24 }`  
**Output:**
```json
{
  "1": "Today's question: What's one thing you're grateful for about us? 🌟",
  "2": "Remember our first Christmas together? Here's to many more. ❄️",
  "3": "A little reminder: You're loved more than you know. 💕",
  ...
}
```

---

## 🚀 Quick Start Commands

### Copy-paste into Cursor:

**Option A: Step-by-step**
1. Open `CURSOR_PROMPT_E_ADVENT_CALENDAR.md`
2. Copy **Phase 1** prompt → paste into Cursor → implement
3. Copy **Phase 2** prompt → paste into Cursor → implement
4. Continue through Phase 6

**Option B: All-at-once**
1. Open `CURSOR_PROMPT_E_ADVENT_CALENDAR.md`
2. Scroll to **Section 9: Quick-Start Cursor Prompt (All-in-One)**
3. Copy the entire prompt → paste into Cursor → let it build everything

---

## 📁 Files Checklist

```
app/
├── store.ts                    ← Extend AdventCalendar interface
├── setup/
│   └── page.tsx                ← Add AI inputs (recipient, relationship, etc.)
├── theme/
│   └── page.tsx                ← Add "Generate" buttons
├── components/
│   └── Door.tsx                ← Show doorPrompts[day] when open
└── api/
    └── ai/
        ├── palette/
        │   └── route.ts        ← NEW: Generate palette
        ├── design/
        │   └── route.ts        ← NEW: Suggest design
        ├── door-prompts/
        │   └── route.ts        ← NEW: Generate messages
        └── door-image-prompts/
            └── route.ts        ← NEW: Generate image prompts
```

---

## 💡 Key Features

✅ **AI-driven personalisation** — no manual content creation  
✅ **Multiple user types** — couples, friends, family  
✅ **Flexible occasions** — Christmas, birthdays, anniversaries, countdowns  
✅ **Progressive enhancement** — works without AI, better with AI  
✅ **Extensible** — easy to add image generation later  

---

## 📖 Full Documentation

See **`CURSOR_PROMPT_E_ADVENT_CALENDAR.md`** for:
- Detailed LLM prompt templates
- Error handling strategies
- Implementation notes
- Complete code examples

---

*Ready to build? Start with Phase 1! 🚀*
