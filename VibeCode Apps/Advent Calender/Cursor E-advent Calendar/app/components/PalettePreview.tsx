'use client'

import { ColorPalette } from '../store'

export default function PalettePreview({ palette }: { palette: ColorPalette }) {
  const previewDoors = [1, 2, 3, 4, 5, 6, 7, 8]
  const rotations = [-2, 1, -1, 2, -1.5, 1.5, -2, 1]
  const scales = [0.95, 1.0, 0.98, 1.02, 0.96, 1.01, 0.97, 1.03]

  return (
    <div className="w-full h-full flex flex-col relative" style={{ backgroundColor: palette.colors[4] || palette.colors[3] }}>
      <div className="grid grid-cols-4 gap-1.5 p-3 flex-1">
        {previewDoors.map((day) => (
          <div key={day} className="relative aspect-square" style={{ transform: `rotate(${rotations[day - 1]}deg) scale(${scales[day - 1]})` }}>
            <div
              className="relative w-full h-full rounded-lg overflow-hidden"
              style={{ backgroundColor: palette.colors[1], border: `2px solid ${palette.colors[0]}`, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
            >
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${palette.colors[0]} 0%, ${palette.colors[1]} 100%)` }}>
                <span className="text-[10px] font-bold text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.4)', transform: `rotate(${-rotations[day - 1]}deg)`, fontFamily: 'Courier Prime, Courier New, monospace' }}>{day}</span>
              </div>
              <div className="absolute top-0.5 right-0.5 text-[8px] opacity-70" style={{ transform: `rotate(${-rotations[day - 1] + 3}deg)` }}>
                {['🎄', '✨', '⭐', '🎁', '🎅', '❄️', '🦌', '🕯️'][day - 1]}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-3 pb-2 text-center">
        <p className="text-[10px] font-medium italic" style={{ color: palette.colors[0], opacity: 0.8 }}>Daily Magic awaits...</p>
      </div>
    </div>
  )
}
