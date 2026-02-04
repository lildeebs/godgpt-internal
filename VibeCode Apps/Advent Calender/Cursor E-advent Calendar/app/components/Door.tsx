'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ColorPalette } from '../store'
import { useCalendarStore } from '../store'

type DoorStyle = 'doodle' | 'classic' | 'watercolour' | 'minimal' | 'maximal' | 'retro'

interface DoorProps {
  day: number
  isOpen: boolean
  palette: ColorPalette
  doorStyle?: DoorStyle
  customPrompt?: string
  imagePrompt?: string
}

export default function Door({ day, isOpen, palette, doorStyle = 'doodle', customPrompt, imagePrompt }: DoorProps) {
  const openDoor = useCalendarStore((s) => s.openDoor)
  const [animating, setAnimating] = useState(false)
  const visualStyle = doorStyle === 'classic' ? 'classic' : 'doodle'

  const handleClick = () => {
    if (isOpen || animating) return
    setAnimating(true)
    openDoor(day)
    setTimeout(() => setAnimating(false), 1000)
  }

  const rotations = [-8, -5, -3, 2, 4, 6, 8, -4, 3, -2]
  const scales = [0.9, 0.95, 1.0, 1.05, 1.1, 0.92, 0.98, 1.02]
  const decorations = ['🎄', '✨', '⭐', '🎁', '🎅', '❄️', '🦌', '🕯️', '🎊', '🌟']
  const deco = decorations[day % decorations.length]

  const revealText = customPrompt || `You opened door ${day}! 🎉`

  return (
    <div className="relative aspect-square">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="closed"
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full h-full relative overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer"
            style={{
              backgroundColor: visualStyle === 'doodle' ? palette.colors[4] || '#FFFBF0' : palette.colors[1],
              border: `3px solid ${palette.colors[0]}`,
              borderRadius: '12px',
            }}
          >
            {visualStyle === 'doodle' ? (
              <>
                <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${palette.colors[3]} 0%, ${palette.colors[4] || palette.colors[3]} 100%)` }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-bold" style={{ color: palette.colors[0], fontSize: '2rem', fontFamily: 'Courier Prime, Courier New, monospace', transform: `rotate(${rotations[day % rotations.length] * 0.3}deg)` }}>{day}</span>
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2" style={{ borderColor: palette.colors[0], opacity: 0.8 }} />
              </>
            ) : (
              <>
                <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${palette.colors[0]} 0%, ${palette.colors[1]} 100%)` }} />
                <div className="absolute inset-0 flex items-center justify-center font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>{day}</div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full" style={{ backgroundColor: palette.colors[2] }} />
              </>
            )}
          </motion.button>
        ) : (
          <motion.div
            key="open"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full rounded-2xl p-4 flex flex-col items-center justify-center shadow-lg"
            style={{ backgroundColor: palette.colors[3], border: `4px solid ${palette.colors[0]}` }}
          >
            <span className="text-4xl md:text-5xl mb-2">{deco}</span>
            <p className="text-lg md:text-xl font-bold mb-1" style={{ color: palette.colors[0] }}>Day {day}</p>
            <p className="text-sm md:text-base text-center px-1" style={{ color: palette.colors[1] }}>{revealText}</p>
            {imagePrompt && <p className="text-[10px] text-gray-500 mt-2 max-w-full truncate" title={imagePrompt}>Illustration: {imagePrompt.slice(0, 30)}…</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
