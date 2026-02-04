'use client'

const FLAKES = 28
const SNOW_CHARS = ['❄', '❅', '❆', '✻', '•']

export default function Snowflakes() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
      aria-hidden
    >
      {Array.from({ length: FLAKES }).map((_, i) => {
        const left = (i * 4.5 + (i % 5) * 3) % 100
        const delay = (i * 0.4 + (i % 7)) % 8
        const duration = 6 + (i % 5) * 2
        const size = 0.6 + (i % 4) * 0.2
        const char = SNOW_CHARS[i % SNOW_CHARS.length]
        const opacity = 0.4 + (i % 4) * 0.15

        return (
          <div
            key={i}
            className="absolute text-white"
            style={{
              animation: `snowfall ${duration}s linear ${delay}s infinite`,
              left: `${left}%`,
              top: '-1rem',
              fontSize: `${size}rem`,
              opacity: Math.min(opacity, 0.9),
              color: 'rgba(200, 228, 255, 0.95)',
              textShadow: '0 0 6px rgba(255,255,255,0.8), 0 1px 2px rgba(0,0,0,0.1)',
            }}
          >
            {char}
          </div>
        )
      })}
    </div>
  )
}
