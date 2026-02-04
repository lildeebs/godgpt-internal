# Cursor E-Advent Calendar

Personalised e-advent calendar with AI-driven design, colour palettes, and daily door messages.

## Features

- **Setup**: Calendar name, duration, recipient, relationship, occasion, mood, tone, colour hint, timezone, and colour palette (static or **Generate with AI**).
- **Theme**: **Suggest design** (door style, border, typography), **Generate door messages** (per-day text), **Generate door illustrations** (image prompts for future use).
- **Calendar**: Open doors to reveal AI-generated or fallback messages.

## Run

```bash
cd "Cursor E-advent Calendar"
npm install
```

Add `.env.local` with:

```
OPENAI_API_KEY=sk-...
```

Then:

```bash
npm run dev
```

App runs at `http://localhost:3001`.

## API routes

- `POST /api/ai/palette` — `{ occasion, relationship, mood, colourHint? }` → `{ name, colors }`
- `POST /api/ai/design` — `{ occasion, relationship, mood, doorStylePreference? }` → `{ doorStyle, borderStyle, typographyHint, stylePrompt }`
- `POST /api/ai/door-prompts` — `{ recipientName, relationship, occasion, mood, tone, length }` → `Record<number, string>`
- `POST /api/ai/door-image-prompts` — `{ recipientName, relationship, occasion, palette, stylePrompt, length }` → `Record<number, string>`

All require `OPENAI_API_KEY`. Uses `gpt-4o-mini` and `response_format: { type: 'json_object' }`.
