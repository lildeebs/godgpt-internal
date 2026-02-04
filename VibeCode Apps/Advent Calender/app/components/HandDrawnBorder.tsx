'use client'

interface HandDrawnBorderProps {
  children: React.ReactNode
  color?: string
  className?: string
}

export default function HandDrawnBorder({
  children,
  color = '#000',
  className = '',
}: HandDrawnBorderProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        filter: `drop-shadow(2px 2px 0 ${color}) drop-shadow(-2px -2px 0 ${color}) drop-shadow(2px -2px 0 ${color}) drop-shadow(-2px 2px 0 ${color})`,
      }}
    >
      {children}
    </div>
  )
}
