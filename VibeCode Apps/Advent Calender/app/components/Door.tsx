'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ColorPalette, DoorSurprise } from '../store'
import { useCalendarStore } from '../store'
import { getReadableTextColor, isLightColor } from '../utils/contrast'
import { isDoorUnlocked, getHoursUntilUnlock, getCountdownString } from '../utils/timezone'

interface DoorProps {
  day: number
  isOpen: boolean
  palette: ColorPalette
  doorStyle?: 'doodle' | 'classic'
  customPrompt?: string
  surprise?: DoorSurprise
  isAdmin?: boolean
  timezone?: string
  createdAt?: string
}

export default function Door({ 
  day, 
  isOpen, 
  palette, 
  doorStyle = 'doodle', 
  customPrompt,
  surprise,
  isAdmin = false,
  timezone,
  createdAt,
}: DoorProps) {
  const openDoor = useCalendarStore((state) => state.openDoor)
  const calendar = useCalendarStore((state) => state.calendar)
  const [isAnimating, setIsAnimating] = useState(false)
  const [countdown, setCountdown] = useState<string>('')

  // Check if door is locked (only for recipients, not admins)
  const isLocked = !isAdmin && timezone && createdAt && !isDoorUnlocked(day, timezone, createdAt)

  // Update countdown for locked doors
  useEffect(() => {
    if (isLocked && timezone && createdAt) {
      const updateCountdown = () => {
        const hours = getHoursUntilUnlock(day, timezone, createdAt!)
        setCountdown(getCountdownString(hours))
      }
      updateCountdown()
      const interval = setInterval(updateCountdown, 60000) // Update every minute
      return () => clearInterval(interval)
    }
  }, [isLocked, day, timezone, createdAt])

  const handleClick = () => {
    if (isOpen || isAnimating) return

    if (isLocked) {
      // Show "Patience!" animation
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 2000)
      return
    }

    setIsAnimating(true)
    openDoor(day)
    setTimeout(() => setIsAnimating(false), 1500)
  }

  // Hand-drawn style variations
  const rotations = [-8, -5, -3, 2, 4, 6, 8, -4, 3, -2]
  const scales = [0.9, 0.95, 1.0, 1.05, 1.1, 0.92, 0.98, 1.02]

  // Random decorative elements
  const decorations = ['🎄', '✨', '⭐', '🎁', '🎅', '❄️', '🦌', '🕯️', '🎊', '🌟']
  const decoration = decorations[day % decorations.length]

  // Calculate readable text colors
  const closedDoorBg = doorStyle === 'doodle' 
    ? (palette.colors[4] || palette.colors[3] || '#FFFFFF')
    : (palette.colors[1] || '#FFFFFF')
  
  const openDoorBg = palette.colors[3] || palette.colors[2] || '#FFFFFF'
  
  const closedDoorTextColor = getReadableTextColor(closedDoorBg, [palette.colors[0], '#000000', '#FFFFFF'])
  const openDoorTextColor = getReadableTextColor(openDoorBg, [palette.colors[0], palette.colors[1], '#000000', '#FFFFFF'])


  return (
    <div className="relative aspect-square">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="closed"
            onClick={handleClick}
            whileHover={!isLocked ? { scale: 1.05, rotate: (day % 3) * 1 } : {}}
            whileTap={!isLocked ? { scale: 0.95 } : {}}
            disabled={isLocked && isAnimating ? true : undefined}
            className="w-full h-full relative overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer disabled:cursor-not-allowed"
            style={{
              backgroundColor: doorStyle === 'doodle' ? palette.colors[4] || '#FFFBF0' : palette.colors[1],
              borderRadius: doorStyle === 'doodle' ? '16px' : '20px',
              opacity: isLocked ? 0.7 : 1,
            }}
          >
            {/* Wiggly hand-drawn border */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ opacity: 0.8 }}
            >
              <rect
                x="3"
                y="3"
                width="calc(100% - 6px)"
                height="calc(100% - 6px)"
                fill="none"
                stroke={palette.colors[0]}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                rx="12"
                style={{
                  filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))',
                }}
              />
            </svg>

            {/* Background gradient */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${palette.colors[3]} 0%, ${palette.colors[4] || palette.colors[3]} 100%)`,
              }}
            />

            {/* Door Number - hand-drawn style */}
            <div
              className="absolute inset-0 flex items-center justify-center z-10"
              style={{
                transform: `rotate(${rotations[day % rotations.length] * 0.3}deg)`,
              }}
            >
              <span
                className="font-bold relative font-handwritten"
                style={{
                  color: closedDoorTextColor,
                  fontSize: `${2.5 + (day % 3) * 0.2}rem`,
                  fontFamily: 'var(--font-gaegu), cursive',
                  textShadow: isLightColor(closedDoorBg)
                    ? '2px 2px 4px rgba(0,0,0,0.3), 0 0 8px rgba(0,0,0,0.2)'
                    : '2px 2px 4px rgba(255,255,255,0.3), 0 0 8px rgba(255,255,255,0.2)',
                  filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.2))',
                  transform: `rotate(${-rotations[day % rotations.length] * 0.3 + (day % 2 === 0 ? -2 : 2)}deg) scale(${scales[day % scales.length]})`,
                  fontWeight: 700,
                }}
              >
                {day}
              </span>
            </div>

            {/* Locked indicator */}
            {isLocked && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute bottom-2 left-0 right-0 text-center z-20"
              >
                <div className="text-xs font-semibold font-handwritten px-2 py-1 rounded-full inline-block" style={{
                  backgroundColor: `${palette.colors[0]}20`,
                  color: palette.colors[0],
                }}>
                  🔒 Locked
                </div>
              </motion.div>
            )}

            {/* Decorative element */}
            <div
              className="absolute top-2 right-2 text-lg opacity-40 z-0"
              style={{
                transform: `rotate(${(day % 5) * 3}deg)`,
              }}
            >
              {decoration}
            </div>
          </motion.button>
        ) : (
          <motion.div
            key="open"
            initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full rounded-2xl p-4 flex flex-col items-center justify-center shadow-lg relative overflow-hidden"
            style={{
              backgroundColor: openDoorBg,
              border: `4px solid ${palette.colors[0]}`,
            }}
          >
            {/* Paper Unfolding Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ 
                delay: 0.2, 
                type: 'spring', 
                stiffness: 200,
                damping: 15,
              }}
              className="w-full h-full flex flex-col items-center justify-center z-10"
            >
              {/* Decoration */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className="text-5xl md:text-6xl mb-4"
              >
                {decoration}
              </motion.div>

              {/* Surprise Content */}
              {surprise ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="w-full flex-1 flex flex-col items-center justify-center"
                >
                  {surprise.type === 'text' && (
                    <p
                      className="text-lg md:text-xl font-bold text-center px-3 font-handwritten"
                      style={{ 
                        color: openDoorTextColor,
                        fontFamily: 'var(--font-gaegu), cursive',
                        textShadow: isLightColor(openDoorBg)
                          ? '1px 1px 2px rgba(0,0,0,0.2)'
                          : '1px 1px 2px rgba(255,255,255,0.2)',
                      }}
                    >
                      {surprise.content}
                    </p>
                  )}

                  {surprise.type === 'image' && (
                    <div className="w-full h-full flex items-center justify-center">
                      <img 
                        src={surprise.content} 
                        alt={`Surprise for day ${day}`}
                        className="max-w-full max-h-full rounded-lg shadow-lg object-contain"
                      />
                    </div>
                  )}

                  {surprise.type === 'link' && (
                    <div className="w-full text-center space-y-2">
                      <p
                        className="text-lg md:text-xl font-bold font-handwritten"
                        style={{ 
                          color: openDoorTextColor,
                          fontFamily: 'var(--font-gaegu), cursive',
                        }}
                      >
                        {surprise.title || 'Click to open!'}
                      </p>
                      <a
                        href={surprise.content}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity font-handwritten"
                        style={{ 
                          backgroundColor: palette.colors[0],
                          color: '#FFFFFF',
                        }}
                      >
                        Open Link 🔗
                      </a>
                    </div>
                  )}
                </motion.div>
              ) : (
                <>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl md:text-2xl font-bold mb-2 font-handwritten"
                    style={{ 
                      color: openDoorTextColor,
                      fontFamily: 'var(--font-gaegu), cursive',
                      textShadow: isLightColor(openDoorBg)
                        ? '1px 1px 2px rgba(0,0,0,0.2)'
                        : '1px 1px 2px rgba(255,255,255,0.2)',
                    }}
                  >
                    Day {day}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-base md:text-lg mt-1 text-center px-3 font-handwritten"
                    style={{ 
                      color: openDoorTextColor,
                      fontFamily: 'var(--font-gaegu), cursive',
                    }}
                  >
                    {customPrompt || 'You opened door ' + day + '! 🎉'}
                  </motion.p>
                </>
              )}
            </motion.div>

            {/* Subtle decorative elements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute top-1 left-1 text-lg opacity-40 z-0"
            >
              ✨
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="absolute top-1 right-1 text-lg opacity-40 z-0"
            >
              ⭐
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Patience! Countdown Modal for Locked Doors */}
      <AnimatePresence>
        {isLocked && isAnimating && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute inset-0 flex items-center justify-center z-30 bg-black/20 rounded-2xl"
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              className="bg-white rounded-2xl p-6 shadow-2xl text-center"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 10, 0] }}
                transition={{ duration: 0.5, repeat: 2 }}
                className="text-4xl mb-2"
              >
                ⏰
              </motion.div>
              <p className="text-xl font-bold font-handwritten mb-2" style={{ color: palette.colors[0] }}>
                Patience!
              </p>
              <p className="text-sm text-gray-600 font-handwritten">
                {countdown || 'This door unlocks soon!'}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
