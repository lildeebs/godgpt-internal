'use client'

interface WigglyBorderProps {
  width: number
  height: number
  color: string
  strokeWidth?: number
  variance?: number
  className?: string
}

/**
 * Generates a wiggly, hand-drawn style border path
 */
export default function WigglyBorder({
  width,
  height,
  color,
  strokeWidth = 3,
  variance = 4,
  className = '',
}: WigglyBorderProps) {
  // Generate wiggly path points
  const segments = 30
  const points: { x: number; y: number }[] = []

  // Top edge
  for (let i = 0; i <= segments; i++) {
    const x = (width / segments) * i
    const y = (Math.random() - 0.5) * variance
    points.push({ x, y })
  }

  // Right edge
  for (let i = 1; i <= segments; i++) {
    const x = width + (Math.random() - 0.5) * variance
    const y = (height / segments) * i
    points.push({ x, y })
  }

  // Bottom edge (reverse)
  for (let i = segments - 1; i >= 0; i--) {
    const x = (width / segments) * i
    const y = height + (Math.random() - 0.5) * variance
    points.push({ x, y })
  }

  // Left edge (reverse)
  for (let i = segments - 1; i > 0; i--) {
    const x = (Math.random() - 0.5) * variance
    const y = (height / segments) * i
    points.push({ x, y })
  }

  // Create smooth path using quadratic curves
  const pathData = points
    .map((point, index) => {
      if (index === 0) return `M ${point.x} ${point.y}`
      const prevPoint = points[index - 1]
      const controlX = (prevPoint.x + point.x) / 2
      const controlY = (prevPoint.y + point.y) / 2
      return `Q ${prevPoint.x} ${prevPoint.y} ${controlX} ${controlY} T ${point.x} ${point.y}`
    })
    .join(' ')

  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ overflow: 'visible' }}
    >
      <path
        d={pathData}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))',
        }}
      />
    </svg>
  )
}
