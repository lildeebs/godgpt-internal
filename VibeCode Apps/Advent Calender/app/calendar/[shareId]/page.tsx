'use client'

import { useRouter, useParams } from 'next/navigation'
import { useCalendarStore } from '../../store'
import Door from '../../components/Door'
import { useEffect, useState } from 'react'

export default function SharedCalendarPage() {
  const router = useRouter()
  const params = useParams()
  const shareId = params?.shareId as string
  const calendar = useCalendarStore((state) => state.calendar)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // In a real app, you'd fetch the calendar by shareId from a backend
    // For now, we'll use the current calendar if shareId matches
    if (!calendar || calendar.shareId !== shareId) {
      // In production, fetch from backend using shareId
      // For now, redirect to setup if no calendar found
      router.push('/setup')
    }
  }, [calendar, shareId, router])

  if (!mounted || !calendar) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  const { name, length, palette, openedDoors, timezone, createdAt } = calendar

  // Calculate grid columns based on length
  const getGridCols = () => {
    if (length <= 12) return 'grid-cols-3'
    if (length <= 24) return 'grid-cols-4'
    return 'grid-cols-5'
  }

  return (
    <div
      className="min-h-screen p-6"
      style={{
        background: `linear-gradient(135deg, ${palette.colors[3]} 0%, ${palette.colors[2]} 100%)`,
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg font-handwritten"
            style={{ 
              color: palette.colors[0],
              textShadow: '2px 2px 4px rgba(0,0,0,0.2), 0 0 8px rgba(0,0,0,0.1)',
            }}
          >
            {name}
          </h1>
          <p 
            className="text-lg font-semibold drop-shadow"
            style={{ 
              color: palette.colors[1] || '#333333',
              textShadow: '1px 1px 2px rgba(0,0,0,0.15)',
            }}
          >
            Open a door each day! 🎄
          </p>
        </div>

        {/* Calendar Grid */}
        <div className={`grid ${getGridCols()} gap-4 md:gap-6`}>
          {Array.from({ length }, (_, i) => i + 1).map((day) => (
            <Door
              key={day}
              day={day}
              isOpen={openedDoors.includes(day)}
              palette={palette}
              doorStyle={calendar.doorStyle || 'doodle'}
              customPrompt={calendar.doorPrompts?.[day]}
              surprise={calendar.doorSurprises?.[day]}
              isAdmin={false} // Recipients are not admins
              timezone={timezone}
              createdAt={createdAt}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
