import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null

export async function POST(req: Request) {
  if (!openai) return NextResponse.json({ error: 'OPENAI_API_KEY not set' }, { status: 500 })
  try {
    const { occasion = 'christmas', relationship = 'friend', mood = 'festive', themePrompt, colourHint } = await req.json()
    
    // Build the prompt - prioritize themePrompt if provided
    let userPrompt = ''
    if (themePrompt && themePrompt.trim()) {
      userPrompt = `Create a color palette based on this theme: "${themePrompt.trim()}".`
      if (occasion) userPrompt += ` The occasion is ${occasion}.`
      if (relationship) userPrompt += ` For a ${relationship} relationship.`
      if (mood) userPrompt += ` The mood should be ${mood}.`
    } else {
      userPrompt = `Occasion: ${occasion}. Relationship: ${relationship}. Mood: ${mood}.`
      if (colourHint) userPrompt += ` Colour preference: ${colourHint}.`
    }
    
    const res = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { 
          role: 'system', 
          content: 'You are a color designer. Respond with exactly one JSON object: { "name": "Palette Name", "colors": ["#hex", "#hex", ...] }. Use 4-6 hex colors that work together harmoniously. Return valid hex codes (e.g., #FF5733). No other text.' 
        },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
    })
    
    const raw = res.choices[0]?.message?.content
    if (!raw) return NextResponse.json({ error: 'Empty response from API' }, { status: 502 })
    
    const data = JSON.parse(raw)
    if (!data.name || !Array.isArray(data.colors)) {
      return NextResponse.json({ error: 'Invalid palette structure' }, { status: 502 })
    }
    
    // Validate and clean colors
    const validColors = data.colors
      .filter((c: any) => typeof c === 'string' && /^#[0-9A-Fa-f]{6}$/.test(c.trim()))
      .slice(0, 6)
    
    if (validColors.length < 4) {
      return NextResponse.json({ error: 'Not enough valid colors generated' }, { status: 502 })
    }
    
    return NextResponse.json({ name: data.name, colors: validColors })
  } catch (e) {
    console.error('Palette generation error:', e)
    const msg = e instanceof Error ? e.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
