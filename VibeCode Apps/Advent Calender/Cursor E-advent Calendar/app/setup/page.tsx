'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCalendarStore, ColorPalette, Relationship, Occasion, LayoutType } from '../store'
import PalettePreview from '../components/PalettePreview'

const DEFAULT_PALETTES: ColorPalette[] = [
  { id: '1', name: 'Pink Dreams', colors: ['#FF6B9D', '#C44569', '#FFB6C1', '#FFF5F7', '#FFE5F0'], image: '' },
  { id: '2', name: 'Ocean Breeze', colors: ['#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#E8F8F5'], image: '' },
  { id: '3', name: 'Sunset Glow', colors: ['#FF7675', '#FD79A8', '#FDCB6E', '#E17055', '#FFF4E6'], image: '' },
  { id: '4', name: 'Forest Green', colors: ['#00B894', '#00CEC9', '#55EFC4', '#81ECEC', '#E0F7F4'], image: '' },
  { id: '5', name: 'Purple Haze', colors: ['#A29BFE', '#6C5CE7', '#FD79A8', '#FDCB6E', '#F3F0FF'], image: '' },
  { id: '6', name: 'Coral Sunset', colors: ['#FF6B6B', '#FF8E53', '#FFA07A', '#FFE5B4', '#FFF5F0'], image: '' },
]

const MOODS = ['festive', 'minimalist', 'playful', 'nostalgic', 'luxury'] as const
const TONES = ['sweet', 'funny', 'nostalgic', 'adventurous'] as const
const TIMEZONES = [
  { value: 'America/New_York', label: 'United States Eastern' },
  { value: 'America/Chicago', label: 'United States Central' },
  { value: 'America/Denver', label: 'United States Mountain' },
  { value: 'America/Los_Angeles', label: 'United States Pacific' },
  { value: 'America/Anchorage', label: 'United States Alaska' },
  { value: 'Pacific/Honolulu', label: 'United States Hawaii' },
  { value: 'America/Toronto', label: 'Canada Eastern' },
  { value: 'America/Winnipeg', label: 'Canada Central' },
  { value: 'America/Edmonton', label: 'Canada Mountain' },
  { value: 'America/Vancouver', label: 'Canada Pacific' },
  { value: 'Europe/London', label: 'United Kingdom London' },
  { value: 'Europe/Dublin', label: 'Ireland Dublin' },
  { value: 'Europe/Paris', label: 'France Paris' },
  { value: 'Europe/Berlin', label: 'Germany Berlin' },
  { value: 'Europe/Amsterdam', label: 'Netherlands Amsterdam' },
  { value: 'Europe/Madrid', label: 'Spain Madrid' },
  { value: 'Europe/Rome', label: 'Italy Rome' },
  { value: 'Asia/Tokyo', label: 'Japan Tokyo' },
  { value: 'Asia/Shanghai', label: 'China Shanghai' },
  { value: 'Asia/Singapore', label: 'Singapore Singapore' },
  { value: 'Asia/Seoul', label: 'South Korea Seoul' },
  { value: 'Asia/Kolkata', label: 'India Mumbai' },
  { value: 'Australia/Perth', label: 'Australia Western' },
  { value: 'Australia/Adelaide', label: 'Australia Adelaide' },
  { value: 'Australia/Sydney', label: 'Australia Eastern' },
  { value: 'Australia/Brisbane', label: 'Australia Brisbane' },
  { value: 'Pacific/Auckland', label: 'New Zealand Auckland' },
  { value: 'America/Sao_Paulo', label: 'Brazil São Paulo' },
  { value: 'America/Mexico_City', label: 'Mexico Mexico City' },
  { value: 'Africa/Johannesburg', label: 'South Africa Johannesburg' },
  { value: 'UTC', label: 'UTC UTC' },
]

export default function SetupPage() {
  const router = useRouter()
  const setCalendar = useCalendarStore((s) => s.setCalendar)
  const [name, setName] = useState('')
  const [length, setLength] = useState(24)
  const [recipientName, setRecipientName] = useState('')
  const [relationship, setRelationship] = useState<Relationship | ''>('')
  const [occasion, setOccasion] = useState<Occasion>('christmas')
  const [mood, setMood] = useState<string>(MOODS[0])
  const [tone, setTone] = useState<string>(TONES[0])
  const [colourHint, setColourHint] = useState('')
  const [themePrompt, setThemePrompt] = useState('')
  const [timezone, setTimezone] = useState('America/New_York')
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette | null>(DEFAULT_PALETTES[0])
  const [paletteLoading, setPaletteLoading] = useState(false)
  const [paletteError, setPaletteError] = useState('')
  const [layoutType, setLayoutType] = useState<LayoutType>('building')

  const generatePalette = async () => {
    setPaletteError('')
    setPaletteLoading(true)
    try {
      const res = await fetch('/api/ai/palette', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          occasion, 
          relationship: relationship || 'friend', 
          mood, 
          themePrompt: themePrompt.trim() || undefined,
          colourHint: colourHint.trim() || undefined 
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to generate palette')
      if (!data.name || !Array.isArray(data.colors) || data.colors.length < 4) throw new Error('Invalid palette response')
      setSelectedPalette({ id: 'custom-' + Date.now(), name: data.name, colors: data.colors, image: data.image })
    } catch (e) {
      setPaletteError(e instanceof Error ? e.message : 'Something went wrong. Try again.')
    } finally {
      setPaletteLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !selectedPalette) return

    setCalendar({
      name: name.trim(),
      length,
      palette: selectedPalette,
      openedDoors: [],
      createdAt: new Date().toISOString(),
      timezone,
      doorStyle: 'doodle',
      doorPrompts: {},
      recipientName: recipientName.trim() || undefined,
      relationship: relationship || undefined,
      occasion,
      mood,
      tone,
      colourHint: colourHint.trim() || undefined,
      themePrompt: themePrompt.trim() || undefined,
      layoutType,
    })
    setTimeout(() => router.push('/theme'), 100)
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-pink-600">Create Your E-Advent Calendar</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xl font-semibold mb-2 text-gray-800">Calendar Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sarah's Birthday Advent" className="w-full px-4 py-3 text-lg border-2 border-pink-300 rounded-xl focus:outline-none focus:border-pink-500 bg-white" required />
          </div>

          <div>
            <label className="block text-xl font-semibold mb-2 text-gray-800">Duration (Days)</label>
            <div className="flex justify-between text-sm text-gray-600 mb-1"><span>7</span><span className="font-bold" style={{ color: selectedPalette?.colors[0] }}>{length}</span><span>31</span></div>
            <input type="range" min={7} max={31} value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer" style={{ background: `linear-gradient(to right, ${selectedPalette?.colors[0] || '#FF6B9D'} 0%, ${selectedPalette?.colors[0] || '#FF6B9D'} ${((length - 7) / 24) * 100}%, #E5E7EB 100%)` }} />
          </div>

          <div className="p-4 bg-white/80 rounded-xl border border-pink-200">
            <h2 className="text-lg font-bold text-gray-800 mb-3">For whom</h2>
            <div className="space-y-3">
              <input type="text" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder="Recipient name or nickname" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500" />
              <select value={relationship} onChange={(e) => setRelationship(e.target.value as Relationship | '')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500">
                <option value="">Relationship (optional)</option>
                <option value="couple">Couple</option>
                <option value="friend">Friend</option>
                <option value="family">Family</option>
              </select>
            </div>
          </div>

          <div className="p-4 bg-white/80 rounded-xl border border-pink-200">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Occasion & mood</h2>
            <div className="space-y-3">
              <select value={occasion} onChange={(e) => setOccasion(e.target.value as Occasion)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500">
                <option value="christmas">Christmas</option>
                <option value="birthday">Birthday</option>
                <option value="anniversary">Anniversary</option>
                <option value="countdown">Countdown</option>
                <option value="other">Other</option>
              </select>
              <select value={mood} onChange={(e) => setMood(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500">
                {MOODS.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500">
                {TONES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xl font-semibold mb-2 text-gray-800">Timezone</label>
            <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className="w-full px-4 py-3 border-2 border-pink-300 rounded-xl focus:outline-none focus:border-pink-500 bg-white">
              {TIMEZONES.map((z) => <option key={z.value} value={z.value}>{z.label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xl font-semibold mb-2 text-gray-800">Calendar Layout</label>
            <select value={layoutType} onChange={(e) => setLayoutType(e.target.value as LayoutType)} className="w-full px-4 py-3 border-2 border-pink-300 rounded-xl focus:outline-none focus:border-pink-500 bg-white">
              <option value="building">Building Facade (Creative)</option>
              <option value="scattered">Scattered (Playful)</option>
              <option value="tree">Tree Shape (Festive)</option>
              <option value="wreath">Wreath (Circular)</option>
              <option value="grid">Grid (Classic)</option>
            </select>
            <p className="text-sm text-gray-600 mt-2">Choose a unique layout for your calendar. Doors will be arranged in a fun, non-sequential order!</p>
          </div>

          <div>
            <label className="block text-xl font-semibold mb-2 text-gray-800">Color Palette</label>
            <div className="mb-4 p-4 bg-white/80 rounded-xl border border-pink-200">
              <label className="block text-sm font-semibold mb-2 text-gray-700">Describe your theme or colors</label>
              <input 
                type="text" 
                value={themePrompt} 
                onChange={(e) => setThemePrompt(e.target.value)} 
                placeholder="e.g. strawberry matcha theme, sunset colors, ocean blues, soft pastels"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 mb-3"
              />
              <button 
                type="button" 
                onClick={generatePalette} 
                disabled={paletteLoading || !themePrompt.trim()} 
                className="w-full px-4 py-2 rounded-lg font-semibold bg-pink-500 text-white hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {paletteLoading ? 'Generating…' : 'Generate Palette'}
              </button>
            </div>
            {paletteError && <p className="text-red-600 text-sm mb-2">{paletteError}</p>}
            {selectedPalette && (
              <div className="mb-4 p-4 bg-white rounded-xl border-2" style={{ borderColor: selectedPalette.colors[0] }}>
                <p className="font-bold mb-2" style={{ color: selectedPalette.colors[0] }}>{selectedPalette.name}</p>
                <div className="flex gap-2 flex-wrap">
                  {selectedPalette.colors.map((c, i) => <div key={i} className="w-10 h-10 rounded-lg border border-gray-300" style={{ backgroundColor: c }} />)}
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {DEFAULT_PALETTES.map((p) => (
                <button key={p.id} type="button" onClick={() => { setSelectedPalette(p); setPaletteError('') }} className={`rounded-xl border-2 overflow-hidden ${selectedPalette?.id === p.id ? 'border-pink-500 ring-2 ring-pink-200' : 'border-gray-200'}`}>
                  <div className="aspect-square"><PalettePreview palette={p} /></div>
                  <p className="text-xs font-semibold p-1.5 text-center bg-white/95">{p.name}</p>
                </button>
              ))}
            </div>
          </div>

          <button type="submit" disabled={!name.trim() || !selectedPalette} className="w-full py-4 text-white rounded-full text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed" style={{ backgroundColor: selectedPalette?.colors[0] || '#FF6B9D' }}>
            Create My Calendar
          </button>
        </form>
      </div>
    </div>
  )
}
