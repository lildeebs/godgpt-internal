'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCalendarStore, ColorPalette, PREDEFINED_PALETTES } from '../store'
import PalettePreview from '../components/PalettePreview'

// Timezones grouped by country for easier selection
const TIMEZONES_BY_COUNTRY: { country: string; flag: string; zones: { value: string; label: string }[] }[] = [
  {
    country: 'United States',
    flag: '🇺🇸',
    zones: [
      { value: 'America/New_York', label: 'Eastern (New York, Miami)' },
      { value: 'America/Chicago', label: 'Central (Chicago, Dallas)' },
      { value: 'America/Denver', label: 'Mountain (Denver, Phoenix)' },
      { value: 'America/Los_Angeles', label: 'Pacific (Los Angeles, Seattle)' },
      { value: 'America/Anchorage', label: 'Alaska' },
      { value: 'Pacific/Honolulu', label: 'Hawaii' },
    ],
  },
  {
    country: 'United Kingdom',
    flag: '🇬🇧',
    zones: [
      { value: 'Europe/London', label: 'London (GMT/BST)' },
    ],
  },
  {
    country: 'Canada',
    flag: '🇨🇦',
    zones: [
      { value: 'America/Toronto', label: 'Eastern (Toronto, Montreal)' },
      { value: 'America/Winnipeg', label: 'Central (Winnipeg)' },
      { value: 'America/Edmonton', label: 'Mountain (Calgary, Edmonton)' },
      { value: 'America/Vancouver', label: 'Pacific (Vancouver)' },
    ],
  },
  {
    country: 'Australia',
    flag: '🇦🇺',
    zones: [
      { value: 'Australia/Perth', label: 'Western (Perth)' },
      { value: 'Australia/Adelaide', label: 'Adelaide' },
      { value: 'Australia/Sydney', label: 'Eastern (Sydney, Melbourne)' },
      { value: 'Australia/Brisbane', label: 'Brisbane' },
    ],
  },
  {
    country: 'Germany',
    flag: '🇩🇪',
    zones: [{ value: 'Europe/Berlin', label: 'Berlin' }],
  },
  {
    country: 'France',
    flag: '🇫🇷',
    zones: [{ value: 'Europe/Paris', label: 'Paris' }],
  },
  {
    country: 'Japan',
    flag: '🇯🇵',
    zones: [{ value: 'Asia/Tokyo', label: 'Tokyo' }],
  },
  {
    country: 'China',
    flag: '🇨🇳',
    zones: [  { value: 'Asia/Shanghai', label: 'Shanghai, Beijing' }],
  },
  {
    country: 'Ireland',
    flag: '🇮🇪',
    zones: [{ value: 'Europe/Dublin', label: 'Dublin' }],
  },
  {
    country: 'India',
    flag: '🇮🇳',
    zones: [{ value: 'Asia/Kolkata', label: 'India (Mumbai, Delhi)' }],
  },
  {
    country: 'Brazil',
    flag: '🇧🇷',
    zones: [
      { value: 'America/Sao_Paulo', label: 'São Paulo, Rio' },
      { value: 'America/Manaus', label: 'Amazon (Manaus)' },
    ],
  },
  {
    country: 'Mexico',
    flag: '🇲🇽',
    zones: [
      { value: 'America/Mexico_City', label: 'Mexico City' },
      { value: 'America/Tijuana', label: 'Tijuana (Pacific)' },
    ],
  },
  {
    country: 'South Africa',
    flag: '🇿🇦',
    zones: [{ value: 'Africa/Johannesburg', label: 'Johannesburg' }],
  },
  {
    country: 'Singapore',
    flag: '🇸🇬',
    zones: [{ value: 'Asia/Singapore', label: 'Singapore' }],
  },
  {
    country: 'South Korea',
    flag: '🇰🇷',
    zones: [{ value: 'Asia/Seoul', label: 'Seoul' }],
  },
  {
    country: 'New Zealand',
    flag: '🇳🇿',
    zones: [{ value: 'Pacific/Auckland', label: 'Auckland, Wellington' }],
  },
  {
    country: 'Netherlands',
    flag: '🇳🇱',
    zones: [{ value: 'Europe/Amsterdam', label: 'Amsterdam' }],
  },
  {
    country: 'Spain',
    flag: '🇪🇸',
    zones: [{ value: 'Europe/Madrid', label: 'Madrid' }],
  },
  {
    country: 'Italy',
    flag: '🇮🇹',
    zones: [{ value: 'Europe/Rome', label: 'Rome' }],
  },
  {
    country: 'Other / UTC',
    flag: '🌐',
    zones: [{ value: 'UTC', label: 'UTC (Coordinated Universal Time)' }],
  },
]

export default function SetupPage() {
  const router = useRouter()
  const setCalendar = useCalendarStore((state) => state.setCalendar)
  const [name, setName] = useState('')
  const [length, setLength] = useState(24)
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette | null>(
    PREDEFINED_PALETTES[0]
  )
  const [timezone, setTimezone] = useState(() => {
    try {
      const tz = Intl?.DateTimeFormat?.()?.resolvedOptions?.()?.timeZone
      const values = TIMEZONES_BY_COUNTRY.flatMap((c) => c.zones.map((z) => z.value))
      return tz && values.includes(tz) ? tz : 'America/New_York'
    } catch {
      return 'America/New_York'
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !selectedPalette) {
      console.log('Form validation failed:', { name: name.trim(), selectedPalette })
      return
    }

    try {
        setCalendar({
          name: name.trim(),
          length,
          palette: selectedPalette,
          openedDoors: [],
          createdAt: new Date().toISOString(),
          timezone,
          doorStyle: 'doodle', // Default to doodle style
          doorPrompts: {},
          doorSurprises: {},
          isAdmin: true, // Creator is admin
        })

      // Small delay to ensure state is saved
      setTimeout(() => {
        router.push('/theme')
      }, 100)
    } catch (error) {
      console.error('Error creating calendar:', error)
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-pink-600">
          Create Your Advent Calendar
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name Input */}
          <div>
            <label className="block text-xl font-semibold mb-3 text-gray-800">
              Calendar Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Sarah's Birthday Advent Calendar"
              className="w-full px-4 py-3 text-lg border-2 border-pink-300 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 bg-white"
              required
            />
          </div>

          {/* Duration Slider - matching wireframe */}
          <div>
            <label className="block text-xl font-semibold mb-3 text-gray-800">
              Duration (Days)
            </label>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>7 days</span>
                <span className="font-bold text-lg" style={{ color: selectedPalette?.colors[0] || '#FF6B9D' }}>
                  {length} days
                </span>
                <span>31 days</span>
              </div>
              <input
                type="range"
                min="7"
                max="31"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${selectedPalette?.colors[0] || '#FF6B9D'} 0%, ${selectedPalette?.colors[0] || '#FF6B9D'} ${((length - 7) / 24) * 100}%, #E5E7EB ${((length - 7) / 24) * 100}%, #E5E7EB 100%)`,
                }}
              />
            </div>
          </div>

          {/* Timezone by Country */}
          <div>
            <label className="block text-xl font-semibold mb-3 text-gray-800">
              Your Country / Region
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-4 py-3 text-lg border-2 border-pink-300 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 bg-white"
            >
              {TIMEZONES_BY_COUNTRY.map(({ country, flag, zones }) => (
                <optgroup key={country} label={`${flag} ${country}`}>
                  {zones.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <p className="text-sm text-gray-600 mt-2">
              Choose your location — this sets when each day&apos;s door unlocks
            </p>
          </div>

          {/* Color Palette Selection - matching wireframe */}
          <div>
            <label className="block text-xl font-semibold mb-3 text-gray-800">
              Color Palette
            </label>
            {selectedPalette && (
              <div className="mb-4 p-4 bg-white rounded-xl border-2" style={{ borderColor: selectedPalette.colors[0] }}>
                <p className="text-lg font-bold mb-3" style={{ color: selectedPalette.colors[0] }}>
                  {selectedPalette.name}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {selectedPalette.colors.map((color, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div
                        className="w-12 h-12 rounded-lg border-2 border-gray-300"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-xs mt-1 font-mono text-gray-600">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {PREDEFINED_PALETTES.map((palette) => (
                <button
                  key={palette.id}
                  type="button"
                  onClick={() => setSelectedPalette(palette)}
                  className={`relative rounded-xl border-4 overflow-hidden transition-all ${
                    selectedPalette?.id === palette.id
                      ? 'border-pink-500 shadow-xl scale-105 ring-4 ring-pink-200'
                      : 'border-gray-200 hover:border-pink-300'
                  }`}
                >
                  {/* Palette Preview Mockup */}
                  <div className="aspect-square relative pointer-events-none">
                    <PalettePreview palette={palette} />
                    {/* Palette name overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-white/95 p-2 rounded-b-lg pointer-events-none">
                      <p className="text-xs font-semibold text-center text-gray-700">
                        {palette.name}
                      </p>
                    </div>
                    {/* Selected indicator */}
                    {selectedPalette?.id === palette.id && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center shadow-lg z-10 pointer-events-none">
                        <span className="text-white text-sm">✓</span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Style Preview Section - matching wireframe */}
          {selectedPalette && (
            <div>
              <label className="block text-xl font-semibold mb-3 text-gray-800">
                Style Preview
              </label>
              <div className="relative bg-white rounded-xl p-4 border-2" style={{ borderColor: selectedPalette.colors[0] }}>
                <PalettePreview palette={selectedPalette} />
                {/* "Daily Magic awaits..." overlay text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <p
                    className="text-lg font-medium italic opacity-60"
                    style={{ color: selectedPalette.colors[0] }}
                  >
                    Daily Magic awaits...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button - matching wireframe */}
          <button
            type="submit"
            disabled={!name.trim() || !selectedPalette}
            className="w-full py-4 text-white rounded-full text-xl font-bold hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100 disabled:hover:shadow-lg"
            style={{
              backgroundColor: selectedPalette?.colors[0] || '#FF6B9D',
            }}
            onClick={(e) => {
              if (!name.trim() || !selectedPalette) {
                e.preventDefault()
                alert('Please fill in the calendar name and select a color theme')
              }
            }}
          >
            Create My Calendar ✨
          </button>
          <p className="text-center text-sm text-gray-600 mt-2">
            You can add your digital gifts on the next screen.
          </p>
        </form>
      </div>
    </div>
  )
}
