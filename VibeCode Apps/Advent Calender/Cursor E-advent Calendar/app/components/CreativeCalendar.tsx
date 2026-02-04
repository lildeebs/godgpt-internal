'use client'

import { useCalendarStore } from '../store'
import Door from './Door'
import { generateLayout } from '../utils/layoutGenerator'
import type { LayoutType } from '../store'
import { useMemo } from 'react'

interface CreativeCalendarProps {
  length: number
  layoutType?: LayoutType
  doorPositions?: Array<{ day: number; x: number; y: number; width?: number; height?: number; rotation?: number; zIndex?: number }>
}

export default function CreativeCalendar({ length, layoutType = 'building', doorPositions }: CreativeCalendarProps) {
  const calendar = useCalendarStore((s) => s.calendar)
  
  const positions = useMemo(() => {
    if (doorPositions && doorPositions.length === length) {
      return doorPositions
    }
    return generateLayout(length, layoutType)
  }, [length, layoutType, doorPositions])

  if (!calendar) return null

  const { palette, openedDoors, doorStyle } = calendar

  return (
    <div className="relative w-full" style={{ minHeight: '700px', padding: '1rem' }}>
      {layoutType === 'building' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Building facade decoration - subtle background */}
          <svg className="w-full h-full" style={{ opacity: 0.08 }}>
            {/* Building outline with hand-drawn feel */}
            <path 
              d={`M 12% 8% L 12% 92% L 88% 92% L 88% 8% Z`} 
              fill="none" 
              stroke={palette.colors[0]} 
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Floor lines with slight waviness for hand-drawn effect */}
            {Array.from({ length: Math.ceil(length / 3) - 1 }).map((_, i) => {
              const yPos = 10 + (Math.ceil(length / 3) - i - 1) * 18
              return (
                <path
                  key={i}
                  d={`M 12% ${yPos}% Q 50% ${yPos + 0.5}% 88% ${yPos}%`}
                  fill="none"
                  stroke={palette.colors[0]}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )
            })}
          </svg>
        </div>
      )}

      <div className="relative w-full h-full" style={{ minHeight: '700px' }}>
        {positions.map((pos) => {
          // Calculate actual pixel dimensions to prevent overlap
          const containerWidth = typeof window !== 'undefined' ? window.innerWidth * 0.9 : 1200
          const containerHeight = 700
          const doorWidth = containerWidth * (pos.width || 12) / 100
          const doorHeight = containerHeight * (pos.height || 12) / 100
          const maxDoorSize = Math.min(doorWidth, doorHeight, 140) // Cap at 140px
          
          return (
            <div
              key={pos.day}
              className="absolute"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                width: `${maxDoorSize}px`,
                height: `${maxDoorSize}px`,
                transform: `translate(-50%, -50%) ${pos.rotation ? `rotate(${pos.rotation}deg)` : ''}`,
                zIndex: (pos.zIndex ?? 0) + 10,
                pointerEvents: 'auto',
              }}
            >
              <div className="w-full h-full">
                <Door
                  day={pos.day}
                  isOpen={openedDoors.includes(pos.day)}
                  palette={palette}
                  doorStyle={doorStyle || 'doodle'}
                  customPrompt={calendar.doorPrompts?.[pos.day]}
                  imagePrompt={calendar.doorImagePrompts?.[pos.day]}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
