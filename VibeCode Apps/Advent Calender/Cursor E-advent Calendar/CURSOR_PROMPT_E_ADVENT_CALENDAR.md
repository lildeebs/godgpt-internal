# Cursor Prompt & Flow: Personalised E-Advent Calendar (AI-Heavy)

> **Target users:** Couples gifting to one another, friends, family during occasions like Christmas, birthdays, anniversaries, or “countdown to the day” events.

> **AI pillars:** (1) Design / aesthetic, (2) Colour palettes, (3) Each day’s prompts for the doors (and optionally door imagery).

---

## 1. Product Summary

Build a **personalised e-advent calendar** where:

- **Gift-giver** creates a calendar for a **recipient** (partner, friend, family).
- **Design, colours, and daily content** are driven by AI using simple inputs: occasion, relationship, recipient traits, and tone.
- Each **door** has AI-generated **prompts** (and optionally **images**) that feel tailored to that person and that day.

---

## 2. User Types & Occasions

| User type      | Occasion examples                      | Personalisation levers                        |
|----------------|----------------------------------------|-----------------------------------------------|
| Couples        | Christmas, anniversary, Valentine’s    | Inside jokes, shared memories, love language  |
| Friends        | Christmas, birthdays, “countdown to X” | Hobbies, humour, shared experiences           |
| Family         | Christmas, Hanukkah, birthdays         | Age, interests, family traditions, nostalgia  |

---

## 3. AI Touchpoints (Where AI Is Used)

### 3.1 Colour palette generation

**Inputs (from creator):**

- Occasion (e.g. Christmas, birthday, cosy winter)
- Relationship (couple / friend / family)
- Mood (festive, minimalist, playful, nostalgic, luxury)
- Optional: 1–2 colour hints (“love red and gold”, “soft pastels”)

**Output:**

- `ColorPalette`: `{ id, name, colors: string[], image?: string }`
- 4–6 hex colours that work together.
- Optional: AI-generated or selected `image` for the palette (e.g. mood board tile).

**Implementation options:**

- **LLM-only:** Prompt returns JSON with `name` and `colors[]`. No image.
- **LLM + image:** Use an image model (e.g. DALL·E, Imagen, Stable Diffusion) with a text prompt like “small abstract swatch mood board, [mood], [colour keywords]” and/or extract dominant colours from that image.
- **Hybrid:** LLM suggests palettes; user can lock one and optionally “refine” or “vary” with one more AI call.

---

### 3.2 Design / aesthetic (overall “look” of the calendar)

**Inputs:**

- Same as palette: occasion, relationship, mood.
- Plus: `doorStyle` preference (e.g. doodle, classic, watercolour, minimalist, maximalist, retro).

**Output:**

- `designConfig` (or extended `AdventCalendar` fields):
  - `doorStyle`: `'doodle' | 'classic' | 'watercolour' | 'minimal' | 'maximal' | 'retro'`
  - `borderStyle`: `'hand-drawn' | 'clean' | 'ornate'`
  - `typographyHint`: e.g. “playful rounded”, “elegant serif”
  - Optional: `stylePrompt` — short string for downstream image generation (e.g. “soft watercolour, warm lights, winter cosy”).

**Implementation:**

- Single LLM call returning structured JSON. Map to your existing `doorStyle` and any new design fields.

---

### 3.3 Per-door prompts (each day’s “surprise” behind the door)

**Inputs (for the whole calendar, then optionally per door):**

- **Global:** Recipient name/nickname, occasion, relationship, length (e.g. 24), tone (sweet, funny, nostalgic, adventurous).
- **Optional per door:** Overrides (e.g. “Day 7 must be about our first trip”, “Day 24 is the big reveal”).

**Output:**

- `doorPrompts: Record<number, string>` — one string per day.
- Each string can be:
  - **Text-only prompt for the “reveal”** (shown when the door is opened): e.g. a micro-message, a question, a tiny activity, a quote.
  - **And/or an image prompt** for an AI-generated door “face” or “inside” illustration.

**Prompt design (for the LLM):**

- Request **variety**: mix quotes, questions, mini-challenges, memories, wishes.
- Request **appropriateness**: no spoilers for later days; tone matches relationship and age.
- Request **length**: short (e.g. 1–2 sentences for the visible part; image prompt can be 1 short sentence).

**Example outputs:**

- Day 1: `"Today’s question: What’s one thing you’re grateful for about us? 🌟"`  
  Image prompt: `"hand-drawn star and confetti, doodle style, on [palette] background"`
- Day 12: `"Remember our first Christmas together? Here’s to many more. ❄️"`  
  Image prompt: `"cosy winter scene, two mugs, doodle style"`

---

## 4. Data Model (Extend Existing Store)

Extend `AdventCalendar` in `app/store.ts` along these lines:

```ts
// Relationship / occasion (for AI)
export type Relationship = 'couple' | 'friend' | 'family'
export type Occasion = 'christmas' | 'birthday' | 'anniversary' | 'countdown' | 'other'

export interface AdventCalendar {
  name: string
  length: number
  palette: ColorPalette
  openedDoors: number[]
  createdAt: string
  timezone: string
  doorStyle: 'doodle' | 'classic' | 'watercolour' | 'minimal' | 'maximal' | 'retro'
  doorPrompts?: Record<number, string>       // AI: text shown when door opens
  doorImagePrompts?: Record<number, string>  // AI: prompt for door illustration (optional)
  // --- New for AI personalisation
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
}
```

`ColorPalette` can stay; add optional `image` if you generate or pick palette images via AI.

---

## 5. Cursor Flow (Step-by-Step)

Use these as **separate Cursor prompts** or **phases** in order.

---

### Phase 1: Onboarding & AI Inputs (Setup)

**Cursor prompt:**

> In the Advent Calendar app, extend the **Setup** flow (`app/setup/page.tsx`) to collect AI personalisation inputs:
>
> - **Recipient name** (or nickname)
> - **Relationship:** couple / friend / family
> - **Occasion:** Christmas / birthday / anniversary / countdown / other
> - **Mood:** e.g. festive, minimalist, playful, nostalgic, luxury (dropdown or tags)
> - **Tone for door content:** sweet, funny, nostalgic, adventurous (optional)
> - **Colour hint:** optional free text, e.g. “red and gold”, “soft pastels”
>
> Keep existing: calendar name, length, timezone. Add a step or section **before** palette selection for “For whom” and “Occasion & mood”. Persist these in the Zustand store (`AdventCalendar`). Validate: recipient name and relationship required when “AI personalisation” is enabled.

---

### Phase 2: AI Colour Palette Generation

**Cursor prompt:**

> Add **AI-generated colour palettes** to the Advent Calendar:
>
> 1. **API route** `app/api/ai/palette/route.ts` (or `route.js`). It receives: `{ occasion, relationship, mood, colourHint? }`. It calls an LLM (e.g. OpenAI, Anthropic, or a model we specify) with a system + user prompt that:
>    - Explains the product (e-advent calendar for [relationship] for [occasion])
>    - Asks for one palette as JSON: `{ name: string, colors: string[] }` with 4–6 hex codes, cohesive and on-theme.
> 2. **Setup UI:** Next to or above the existing static palettes, add “Generate with AI”:
>    - Button “Generate palette” that sends the above inputs to the API, shows loading, then displays the result as a selectable `ColorPalette` (reuse `PalettePreview` if it fits).
> 3. **Error and retry:** If the LLM returns invalid JSON or missing fields, retry once or show “Try again”. Use `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` from env; do not hardcode keys.

---

### Phase 3: AI Design / Aesthetic Config

**Cursor prompt:**

> Add **AI-generated design config** for the calendar:
>
> 1. **API route** `app/api/ai/design/route.ts`. Inputs: `{ occasion, relationship, mood, doorStylePreference? }`. The LLM returns JSON: `{ doorStyle, borderStyle?, typographyHint?, stylePrompt? }` where `doorStyle` is one of: doodle, classic, watercolour, minimal, maximal, retro.
> 2. **Theme page** (`app/theme/page.tsx`): Add “Suggest design with AI” that:
>    - Calls this API with the stored occasion/relationship/mood
>    - Updates the calendar’s `doorStyle` and `designConfig` in the store
>    - Optionally pre-selects the matching hand-drawn series tile (or a new one) and shows a short summary: e.g. “Doodle, hand-drawn borders, playful feel.”
> 3. **Fallback:** If the user skips this, keep current behaviour (e.g. default `doodle`).

---

### Phase 4: AI Per-Door Prompts (Text for Reveals)

**Cursor prompt:**

> Implement **AI-generated per-door prompts** for the Advent Calendar:
>
> 1. **API route** `app/api/ai/door-prompts/route.ts`. Inputs: `{ recipientName, relationship, occasion, mood, tone?, length }`. The LLM returns `Record<number, string>`: one short, personalised message per day (1–24 or 1–length). Rules for the prompt:
>    - Varied: mix tiny questions, micro-activities, quotes, wishes, gentle references to the relationship.
>    - Appropriate for the relationship and occasion; no spoilers for later days.
>    - Each value is 1–2 sentences; safe for all ages if family.
> 2. **Where to generate:** In **Theme** page, after “Continue to Calendar”, add an optional step **“Generate daily messages”** (or a section on Theme): button “Generate all door messages with AI”. On click: call the API, then write `doorPrompts` into the store.
> 3. **Door component:** When a door is **open**, if `doorPrompts[day]` exists, show that text instead of the generic “You opened door X!”. Fallback to the current message if missing.
> 4. **Optional:** Allow “Regenerate Day X” later (would need a small editor/modal and a single-day API or a partial regeneration contract).

---

### Phase 5: AI Image Prompts for Doors (Optional)

**Cursor prompt:**

> Add **AI-generated image prompts** for each door (for future image generation or to pass to an image model):
>
> 1. **API route** `app/api/ai/door-image-prompts/route.ts`. Inputs: `{ recipientName, relationship, occasion, palette, stylePrompt?, length }`. Returns `Record<number, string>`: one short image prompt per day (e.g. “hand-drawn [X], doodle style, [palette colours], on cream background”). Prompts should be non-overlapping and fit the `designConfig.stylePrompt` if present.
> 2. **Store:** Persist in `doorImagePrompts`. **Theme** or a new “Customise doors” step: “Generate door illustrations” that calls this and saves.
> 3. **Door component:** For now, **do not** call an image API. Only store and pass `doorImagePrompts[day]` into `Door` (e.g. as `imagePrompt`). In the UI, you can show a placeholder or “Illustration prompt: …” in a tooltip or admin view. The actual image generation can be a later phase (e.g. with DALL·E or Imagen).

---

### Phase 6: Sharing & Gifting (Optional)

**Cursor prompt:**

> Add a **gifting** path so the creator can share the calendar with the recipient:
>
> 1. **Share by link:** Generate a read-only, shareable link (e.g. ` /c/[id]` ) that loads the calendar from the backend or from a stored blob (e.g. Supabase, Vercel Blob, or a simple JSON in DB). The recipient sees the calendar (and opens doors) but cannot edit.
> 2. **Optional: “From / To”:** On the calendar view, show “From [Creator]” and “For [Recipient]” when in shared mode. Collect creator name in Setup if “This is a gift” is checked.
>
> For a first version, sharing can be “export as JSON” or “copy link” that includes an encoded calendar payload (and decodes on `/c/[id]`). Full backend DB can come later.

---

## 6. API Design Conventions

- **Env:** `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` (or both; you can support either).
- **Structured output:** Prefer asking the LLM for JSON and parse with `JSON.parse`; if you have access to structured outputs (e.g. OpenAI `response_format: { type: "json_object" }`), use them.
- **Idempotency / caching:** Optional: cache palette and design by `hash(occasion, relationship, mood, colourHint)` for a few hours to avoid duplicate calls during setup.
- **Errors:** Return `{ error: string }` and 4xx/5xx; in the UI, show “Something went wrong. Try again.” and a retry button.

---

## 7. Example LLM Prompt Skeletons

### Palette

```
You are a colour designer for a personalised e-advent calendar. Given:
- Occasion: {occasion}
- Relationship: {relationship}
- Mood: {mood}
- Optional colour hint: {colourHint or "none"}

Respond with exactly one JSON object: { "name": "Palette Name", "colors": ["#hex", "#hex", ...] }.
Use 4-6 hex colours. They must work together and fit the occasion and mood. No other text.
```

### Design

```
You are a design consultant for an e-advent calendar. Given:
- Occasion: {occasion}, Relationship: {relationship}, Mood: {mood}
- User preference for door style: {doorStylePreference or "any"}

Respond with exactly one JSON: { "doorStyle": "doodle|classic|watercolour|minimal|maximal|retro", "borderStyle": "hand-drawn|clean|ornate", "typographyHint": "short phrase", "stylePrompt": "short phrase for image generation" }. No other text.
```

### Door prompts (text)

```
You write short, personalised messages for each day of an e-advent calendar. Given:
- Recipient: {recipientName}, Relationship: {relationship}, Occasion: {occasion}, Mood: {mood}, Tone: {tone}
- Number of days: {length}

Return a JSON object: { "1": "message for day 1", "2": "message for day 2", ... }.
Each message: 1-2 sentences, warm, varied (questions, micro-activities, quotes, wishes). No spoilers. Safe for all ages. No other text.
```

### Door image prompts

```
You write short image generation prompts for each door of an e-advent calendar. Given:
- Recipient: {recipientName}, Relationship: {relationship}, Occasion: {occasion}
- Palette colours: {palette hex list}, Style: {stylePrompt}
- Number of days: {length}

Return JSON: { "1": "image prompt for day 1", ... }. Each prompt: one sentence, hand-drawn/doodle style, non-overlapping motifs (stars, gifts, nature, etc.), mention palette or “warm/cool” if needed. No other text.
```

---

## 8. File Checklist (Where to Add/Edit)

| Area                | Files to add/change                                                                 |
|---------------------|--------------------------------------------------------------------------------------|
| Store               | `app/store.ts` — extend `AdventCalendar`, add `Relationship`, `Occasion`, `designConfig`, `doorImagePrompts` |
| Setup               | `app/setup/page.tsx` — recipient, relationship, occasion, mood, tone, colour hint   |
| API: palette        | `app/api/ai/palette/route.ts` (new)                                                 |
| API: design         | `app/api/ai/design/route.ts` (new)                                                  |
| API: door prompts   | `app/api/ai/door-prompts/route.ts` (new)                                            |
| API: door images    | `app/api/ai/door-image-prompts/route.ts` (new)                                      |
| Theme               | `app/theme/page.tsx` — “Suggest design”, “Generate door messages”, “Generate door illustrations” |
| Door                | `app/components/Door.tsx` — use `doorPrompts[day]` for open state; accept `imagePrompt` prop for later |
| DoorCustomizer      | `app/components/DoorCustomizer.tsx` — optionally wire to `doorPrompts` / `doorImagePrompts` and AI APIs |

---

## 9. Quick-Start Cursor Prompt (All-in-One)

Use this when you want to bootstrap the whole AI layer in one go:

> **Personalised e-advent calendar — AI layer**
>
> Using the existing Advent Calendar app (Next.js, Zustand, Framer Motion):
>
> 1. **Extend the store** (`app/store.ts`): Add `recipientName`, `relationship` (couple|friend|family), `occasion` (christmas|birthday|anniversary|countdown|other), `mood`, `tone`, `designConfig`, `doorImagePrompts`. Extend `doorStyle` with watercolour, minimal, maximal, retro.
>
> 2. **Setup** (`app/setup/page.tsx`): Add fields for recipient name, relationship, occasion, mood, tone, and optional colour hint. Persist to the calendar in the store.
>
> 3. **Create 4 API routes:**
>    - `app/api/ai/palette/route.ts`: input occasion, relationship, mood, colourHint → JSON `{ name, colors[] }`.
>    - `app/api/ai/design/route.ts`: input occasion, relationship, mood, doorStylePreference → JSON `{ doorStyle, borderStyle, typographyHint, stylePrompt }`.
>    - `app/api/ai/door-prompts/route.ts`: input recipientName, relationship, occasion, mood, tone, length → JSON `Record<number, string>`.
>    - `app/api/ai/door-image-prompts/route.ts`: input recipientName, relationship, occasion, palette, stylePrompt, length → JSON `Record<number, string>`.
>
> 4. **Theme page** (`app/theme/page.tsx`): Add “Generate palette” (if not done in Setup), “Suggest design”, “Generate door messages”, “Generate door illustrations”. Wire each to the right API and store.
>
> 5. **Door** (`app/components/Door.tsx`): When open, show `doorPrompts[day]` if present, else “You opened door X!”. Accept `imagePrompt` for future use.
>
> Use `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` from env. All LLM responses must be valid JSON; handle parse errors and surface “Try again” in the UI. Keep existing flows working when AI steps are skipped.

---

## 10. Order of Implementation (Suggested)

1. **Store + Setup** (Phase 1) — so every AI call has the right inputs.
2. **Palette API + UI** (Phase 2) — high impact, low risk.
3. **Door prompts API + Door display** (Phase 4) — makes the calendar feel personalised quickly.
4. **Design API + Theme** (Phase 3) — refines look.
5. **Door image prompts API + storage** (Phase 5) — prep for future image generation.
6. **Sharing / gifting** (Phase 6) — when you’re ready for a “create for someone else” flow.

---

*Last updated for the Advent Calendar codebase (Next.js 14, Zustand, Framer Motion, Tailwind).*
