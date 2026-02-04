import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null

const DOOR_STYLES = ['doodle', 'classic', 'watercolour', 'minimal', 'maximal', 'retro'] as const
const BORDERS = ['hand-drawn', 'clean', 'ornate'] as const

export async function POST(req: Request) {
  if (!openai) return NextResponse.json({ error: 'OPENAI_API_KEY not set' }, { status: 500 })
  try {
    const { occasion = 'christmas', relationship = 'friend', mood = 'festive', doorStylePreference } = await req.json()
    const pref = doorStylePreference && DOOR_STYLES.includes(doorStylePreference) ? doorStylePreference : 'any'
    const res = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: `You are a design consultant for an e-advent calendar. Respond with exactly one JSON: { "doorStyle": "doodle|classic|watercolour|minimal|maximal|retro", "borderStyle": "hand-drawn|clean|ornate", "typographyHint": "short phrase", "stylePrompt": "short phrase for image generation" }. No other text.` },
        { role: 'user', content: `Occasion: ${occasion}. Relationship: ${relationship}. Mood: ${mood}. User preference for door style: ${pref}.` },
      ],
      response_format: { type: 'json_object' },
    })
    const raw = res.choices[0]?.message?.content
    if (!raw) return NextResponse.json({ error: 'Empty response' }, { status: 502 })
    const data = JSON.parse(raw)
    const doorStyle = DOOR_STYLES.includes(data.doorStyle as typeof DOOR_STYLES[number]) ? data.doorStyle : 'doodle'
    const borderStyle = BORDERS.includes(data.borderStyle as typeof BORDERS[number]) ? data.borderStyle : 'hand-drawn'
    return NextResponse.json({
      doorStyle,
      borderStyle,
      typographyHint: String(data.typographyHint || 'playful rounded'),
      stylePrompt: String(data.stylePrompt || 'soft, warm, cosy'),
    })
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Unknown error' }, { status: 500 })
  }
}
