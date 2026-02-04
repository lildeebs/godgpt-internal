'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCalendarStore } from '../store'
import Door from '../components/Door'

export default function ThemePage() {
  const router = useRouter()
  const calendar = useCalendarStore((s) => s.calendar)
  const setCalendar = useCalendarStore((s) => s.setCalendar)
  const [designLoading, setDesignLoading] = useState(false)
  const [designError, setDesignError] = useState('')
  const [promptsLoading, setPromptsLoading] = useState(false)
  const [promptsError, setPromptsError] = useState('')
  const [imgLoading, setImgLoading] = useState(false)
  const [imgError, setImgError] = useState('')

  useEffect(() => {
    if (!calendar) router.push('/setup')
  }, [calendar, router])

  if (!calendar) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  const suggestDesign = async () => {
    setDesignError('')
    setDesignLoading(true)
    try {
      const res = await fetch('/api/ai/design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ occasion: calendar.occasion, relationship: calendar.relationship, mood: calendar.mood }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setCalendar({
        ...calendar,
        doorStyle: data.doorStyle || calendar.doorStyle,
        designConfig: { borderStyle: data.borderStyle, typographyHint: data.typographyHint, stylePrompt: data.stylePrompt },
      })
    } catch (e) {
      setDesignError(e instanceof Error ? e.message : 'Try again.')
    } finally {
      setDesignLoading(false)
    }
  }

  const generateDoorMessages = async () => {
    setPromptsError('')
    setPromptsLoading(true)
    try {
      const res = await fetch('/api/ai/door-prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientName: calendar.recipientName,
          relationship: calendar.relationship,
          occasion: calendar.occasion,
          mood: calendar.mood,
          tone: calendar.tone,
          length: calendar.length,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setCalendar({ ...calendar, doorPrompts: data })
    } catch (e) {
      setPromptsError(e instanceof Error ? e.message : 'Try again.')
    } finally {
      setPromptsLoading(false)
    }
  }

  const generateDoorIllustrations = async () => {
    setImgError('')
    setImgLoading(true)
    try {
      const res = await fetch('/api/ai/door-image-prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientName: calendar.recipientName,
          relationship: calendar.relationship,
          occasion: calendar.occasion,
          palette: calendar.palette,
          stylePrompt: calendar.designConfig?.stylePrompt,
          length: calendar.length,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setCalendar({ ...calendar, doorImagePrompts: data })
    } catch (e) {
      setImgError(e instanceof Error ? e.message : 'Try again.')
    } finally {
      setImgLoading(false)
    }
  }

  const handleContinue = () => {
    router.push('/calendar')
  }

  const styleLabel = [calendar.doorStyle, calendar.designConfig?.borderStyle, calendar.designConfig?.typographyHint].filter(Boolean).join(', ')

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: calendar.palette.colors[4] || calendar.palette.colors[3] }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => router.back()} className="text-2xl hover:opacity-70">←</button>
          <h1 className="text-3xl font-bold" style={{ color: calendar.palette.colors[0] }}>Choose Your Theme</h1>
          <span className="w-8" />
        </div>

        <div className="mb-6 p-4 bg-white rounded-xl">
          <p className="text-sm font-semibold text-gray-600 mb-2">Current Palette</p>
          <p className="text-lg font-bold mb-2" style={{ color: calendar.palette.colors[0] }}>{calendar.palette.name}</p>
          <div className="flex gap-2">
            {calendar.palette.colors.slice(0, 3).map((c, i) => <div key={i} className="w-6 h-6 rounded-full" style={{ backgroundColor: c }} />)}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-600 mb-3">LIVE PREVIEW</p>
          <div className="flex gap-4 flex-wrap">
            {[1, 2, 3].map((d) => (
              <div key={d} className="w-24">
                <Door day={d} isOpen={false} palette={calendar.palette} doorStyle={calendar.doorStyle} imagePrompt={calendar.doorImagePrompts?.[d]} />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6 p-4 bg-white rounded-xl border-2 border-pink-200">
          <p className="font-semibold text-gray-800 mb-1">Suggest design</p>
          <p className="text-sm text-gray-600 mb-3">Door style, borders, typography</p>
          <button onClick={suggestDesign} disabled={designLoading} className="px-4 py-2 rounded-lg font-semibold text-white disabled:opacity-50" style={{ backgroundColor: calendar.palette.colors[0] }}>
            {designLoading ? 'Loading…' : 'Suggest design'}
          </button>
          {designError && <p className="text-red-600 text-sm mt-2">{designError}</p>}
          {styleLabel && <p className="text-sm text-gray-700 mt-2">{styleLabel}</p>}
        </div>

        <div className="mb-6 p-4 bg-white rounded-xl border-2 border-pink-200">
          <p className="font-semibold text-gray-800 mb-1">Generate daily messages</p>
          <p className="text-sm text-gray-600 mb-3">Personalized text for each door</p>
          <button onClick={generateDoorMessages} disabled={promptsLoading} className="px-4 py-2 rounded-lg font-semibold text-white disabled:opacity-50" style={{ backgroundColor: calendar.palette.colors[0] }}>
            {promptsLoading ? 'Generating…' : 'Generate door messages'}
          </button>
          {promptsError && <p className="text-red-600 text-sm mt-2">{promptsError}</p>}
          {calendar.doorPrompts && Object.keys(calendar.doorPrompts).length > 0 && <p className="text-sm text-green-700 mt-2">Generated for {Object.keys(calendar.doorPrompts).length} days</p>}
        </div>

        <div className="mb-6 p-4 bg-white rounded-xl border-2 border-pink-200">
          <p className="font-semibold text-gray-800 mb-1">Generate door illustrations</p>
          <p className="text-sm text-gray-600 mb-3">Image prompts for each door (for future use)</p>
          <button onClick={generateDoorIllustrations} disabled={imgLoading} className="px-4 py-2 rounded-lg font-semibold text-white disabled:opacity-50" style={{ backgroundColor: calendar.palette.colors[0] }}>
            {imgLoading ? 'Generating…' : 'Generate door illustrations'}
          </button>
          {imgError && <p className="text-red-600 text-sm mt-2">{imgError}</p>}
          {calendar.doorImagePrompts && Object.keys(calendar.doorImagePrompts).length > 0 && <p className="text-sm text-green-700 mt-2">Generated for {Object.keys(calendar.doorImagePrompts).length} days</p>}
        </div>

        <button onClick={handleContinue} className="w-full py-4 text-white rounded-full text-xl font-bold" style={{ backgroundColor: calendar.palette.colors[0] }}>
          Continue to Calendar
        </button>
      </div>
    </div>
  )
}
