'use client'

import { useRouter } from 'next/navigation'
import { useCalendarStore } from '../store'
import { useEffect, useState } from 'react'
import CreativeCalendar from '../components/CreativeCalendar'

export default function CalendarPage() {
  const router = useRouter()
  const calendar = useCalendarStore((s) => s.calendar)
  const [mounted, setMounted] = useState(false)
  const [layoutType, setLayoutType] = useState<'grid' | 'building' | 'scattered' | 'tree' | 'wreath'>('building')

  useEffect(() => {
    setMounted(true)
    if (!calendar) router.push('/setup')
    if (calendar?.layoutType) setLayoutType(calendar.layoutType)
  }, [calendar, router])

  if (!mounted || !calendar) return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>

  const { name, length, palette } = calendar

  const handleLayoutChange = (newLayout: typeof layoutType) => {
    setLayoutType(newLayout)
    if (calendar) {
      useCalendarStore.getState().setCalendar({ ...calendar, layoutType: newLayout })
    }
  }

  return (
    <div className="min-h-screen p-6" style={{ background: `linear-gradient(135deg, ${palette.colors[3]} 0%, ${palette.colors[2]} 100%)` }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ color: palette.colors[0] }}>{name}</h1>
          <p className="text-lg text-gray-700 mb-4">Open a door each day! 🎄</p>
          
          {/* Layout selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {(['grid', 'building', 'scattered', 'tree', 'wreath'] as const).map((layout) => (
              <button
                key={layout}
                onClick={() => handleLayoutChange(layout)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  layoutType === layout
                    ? 'text-white shadow-lg'
                    : 'bg-white/80 text-gray-700 hover:bg-white'
                }`}
                style={layoutType === layout ? { backgroundColor: palette.colors[0] } : {}}
              >
                {layout.charAt(0).toUpperCase() + layout.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Creative Calendar Layout */}
        <div className="bg-white/20 rounded-2xl p-4 md:p-8 backdrop-blur-sm">
          <CreativeCalendar 
            length={length} 
            layoutType={layoutType}
            doorPositions={calendar.doorPositions}
          />
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => { if (confirm('Reset calendar?')) { useCalendarStore.getState().resetCalendar(); router.push('/setup') } }}
            className="px-6 py-2 bg-white/80 text-gray-700 rounded-full font-semibold hover:bg-white"
          >
            Reset Calendar
          </button>
        </div>
      </div>
    </div>
  )
}
