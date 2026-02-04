import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null

export async function POST(req: Request) {
  if (!openai) return NextResponse.json({ error: 'OPENAI_API_KEY not set' }, { status: 500 })
  try {
    const { recipientName = 'you', relationship = 'friend', occasion = 'christmas', palette, stylePrompt = 'doodle style', length = 24 } = await req.json()
    const len = Math.min(31, Math.max(1, Number(length) || 24))
    const colors = Array.isArray(palette?.colors) ? palette.colors.slice(0, 4).join(', ') : (palette || 'warm, soft')
    const res = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You write short image generation prompts for each door of an e-advent calendar. Return JSON: { "1": "image prompt for day 1", ... }. Each prompt: one sentence, hand-drawn/doodle style, non-overlapping motifs (stars, gifts, nature, etc.). Mention palette or "warm/cool" if needed. No other text.' },
        { role: 'user', content: `Recipient: ${recipientName}. Relationship: ${relationship}. Occasion: ${occasion}. Palette: ${colors}. Style: ${stylePrompt}. Days: ${len}.` },
      ],
      response_format: { type: 'json_object' },
    })
    const raw = res.choices[0]?.message?.content
    if (!raw) return NextResponse.json({ error: 'Empty response' }, { status: 502 })
    const obj = JSON.parse(raw)
    const out: Record<number, string> = {}
    for (let i = 1; i <= len; i++) {
      const v = obj[String(i)] ?? obj[i]
      if (typeof v === 'string') out[i] = v
    }
    return NextResponse.json(out)
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Unknown error' }, { status: 500 })
  }
}
