'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCalendarStore } from '../store'
import Door from '../components/Door'
import SurpriseEditor from '../components/SurpriseEditor'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminPage() {
  const router = useRouter()
  const calendar = useCalendarStore((state) => state.calendar)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  if (!calendar || !calendar.isAdmin) {
    router.push('/setup')
    return null
  }

  const { name, length, palette } = calendar

  // Calculate grid columns based on length
  const getGridCols = () => {
    if (length <= 12) return 'grid-cols-3'
    if (length <= 24) return 'grid-cols-4'
    return 'grid-cols-5'
  }

  const handleDoorClick = (day: number) => {
    setSelectedDay(day)
  }

  const handleCloseEditor = () => {
    setSelectedDay(null)
  }

  const handleFinish = () => {
    // Generate a unique share ID
    const shareId = `calendar-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    useCalendarStore.getState().setCalendar({
      ...calendar,
      shareId,
    })
    router.push(`/preview/${shareId}`)
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
            className="text-lg font-semibold drop-shadow mb-4"
            style={{ 
              color: palette.colors[1] || '#333333',
              textShadow: '1px 1px 2px rgba(0,0,0,0.15)',
            }}
          >
            Click a door to add a surprise! 🎁
          </p>
        </div>

        {/* Admin Grid */}
        <div className={`grid ${getGridCols()} gap-4 md:gap-6 mb-8`}>
          {Array.from({ length }, (_, i) => i + 1).map((day) => {
            const hasSurprise = calendar.doorSurprises?.[day]
            return (
              <div key={day} className="relative">
                <button
                  onClick={() => handleDoorClick(day)}
                  className="w-full relative"
                >
                  <Door
                    day={day}
                    isOpen={false}
                    palette={palette}
                    doorStyle={calendar.doorStyle || 'doodle'}
                    customPrompt={calendar.doorPrompts?.[day]}
                  />
                  {/* Indicator if door has surprise */}
                  {hasSurprise && (
                    <div className="absolute top-1 right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg z-10">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </button>
              </div>
            )
          })}
        </div>

        {/* Finish Button */}
        <div className="text-center">
          <button
            onClick={handleFinish}
            className="px-8 py-4 text-white rounded-full text-xl font-bold hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform font-handwritten"
            style={{ backgroundColor: palette.colors[0] }}
          >
            Preview & Share ✨
          </button>
        </div>

        {/* Surprise Editor Modal */}
        <AnimatePresence>
          {selectedDay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={handleCloseEditor}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold font-handwritten" style={{ color: palette.colors[0] }}>
                    Door {selectedDay}
                  </h2>
                  <button
                    onClick={handleCloseEditor}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-2xl"
                  >
                    ✕
                  </button>
                </div>
                <SurpriseEditor
                  day={selectedDay}
                  palette={palette}
                  currentSurprise={calendar.doorSurprises?.[selectedDay]}
                  onSave={(surprise) => {
                    const doorSurprises = calendar.doorSurprises || {}
                    useCalendarStore.getState().setCalendar({
                      ...calendar,
                      doorSurprises: {
                        ...doorSurprises,
                        [selectedDay]: surprise,
                      },
                    })
                    handleCloseEditor()
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
