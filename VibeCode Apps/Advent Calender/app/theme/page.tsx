'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCalendarStore } from '../store'
import Door from '../components/Door'

const DOOR_STYLES = [
  {
    id: 'sky-scribble',
    name: 'Sky Scribble',
    icon: '☁️',
    description: 'Cloudy, dreamy style',
  },
  {
    id: 'floral-pop',
    name: 'Floral Pop',
    icon: '🌸',
    description: 'Floral illustrations',
  },
  {
    id: 'sunny-grid',
    name: 'Sunny Grid',
    icon: '☀️',
    description: 'Bright, geometric',
  },
  {
    id: 'minty-fir',
    name: 'Minty Fir',
    icon: '🌲',
    description: 'Nature-inspired',
  },
  {
    id: 'retro-clay',
    name: 'Retro Clay',
    icon: '🟠',
    description: 'Vintage, earthy',
  },
  {
    id: 'dreamy-blobs',
    name: 'Dreamy Blobs',
    icon: '💭',
    description: 'Abstract, flowing',
  },
]

export default function ThemePage() {
  const router = useRouter()
  const calendar = useCalendarStore((state) => state.calendar)
  const setCalendar = useCalendarStore((state) => state.setCalendar)
  const [selectedStyle, setSelectedStyle] = useState<string>('sky-scribble')

  if (!calendar) {
    router.push('/setup')
    return null
  }

  const handleContinue = () => {
    if (calendar) {
      setCalendar({
        ...calendar,
        doorStyle: 'doodle', // Use doodle style for hand-drawn
      })
      router.push('/admin') // Redirect to admin grid for editing doors
    }
  }

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: calendar.palette.colors[4] || calendar.palette.colors[3] }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="text-2xl hover:opacity-70 transition-opacity"
          >
            ←
          </button>
          <h1 className="text-3xl font-bold" style={{ color: calendar.palette.colors[0] }}>
            Choose Your Theme
          </h1>
          <button className="text-2xl hover:opacity-70 transition-opacity">?</button>
        </div>

        {/* Current Palette */}
        <div className="mb-6 p-4 bg-white rounded-xl">
          <p className="text-sm font-semibold text-gray-600 mb-2">Current Palette</p>
          <p className="text-lg font-bold mb-2" style={{ color: calendar.palette.colors[0] }}>
            {calendar.palette.name}
          </p>
          <div className="flex gap-2">
            {calendar.palette.colors.slice(0, 3).map((color, idx) => (
              <div
                key={idx}
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Live Preview */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-600 mb-3">LIVE PREVIEW</p>
          <div className="flex gap-4">
            {[1, 2, 3].map((day) => (
              <div key={day} className="flex-1">
                <Door
                  day={day}
                  isOpen={false}
                  palette={calendar.palette}
                  doorStyle="doodle"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Hand-Drawn Series */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-600 mb-3">HAND-DRAWN SERIES</p>
          <div className="grid grid-cols-3 gap-4">
            {DOOR_STYLES.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`relative p-4 bg-white rounded-xl border-2 transition-all ${
                  selectedStyle === style.id
                    ? 'border-pink-500 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-pink-300'
                }`}
              >
                <div className="text-4xl mb-2">{style.icon}</div>
                <p className="text-sm font-semibold text-gray-700">{style.name}</p>
                {selectedStyle === style.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Magic Creator */}
        <div className="mb-6 p-4 bg-white rounded-xl border-2 border-pink-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-800 mb-1">Magic Creator</p>
              <p className="text-sm text-gray-600">Generate unique door icons with AI</p>
            </div>
            <button
              onClick={() => router.push('/magic-creator')}
              className="px-4 py-2 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition-colors flex items-center gap-2"
            >
              Try it
              <span>✨</span>
            </button>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full py-4 text-white rounded-full text-xl font-bold hover:opacity-90 transition-opacity shadow-lg"
          style={{ backgroundColor: calendar.palette.colors[0] }}
        >
          Continue to Calendar
        </button>
      </div>
    </div>
  )
}
