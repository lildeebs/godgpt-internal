import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type Relationship = 'couple' | 'friend' | 'family'
export type Occasion = 'christmas' | 'birthday' | 'anniversary' | 'countdown' | 'other'
export type LayoutType = 'grid' | 'building' | 'scattered' | 'tree' | 'wreath'

export interface DoorPosition {
  day: number
  x: number // percentage or grid position
  y: number
  width?: number
  height?: number
  rotation?: number
  zIndex?: number
}

export interface ColorPalette {
  id: string
  name: string
  colors: string[]
  image?: string
}

export interface AdventCalendar {
  name: string
  length: number
  palette: ColorPalette
  openedDoors: number[]
  createdAt: string
  timezone: string
  doorStyle: 'doodle' | 'classic' | 'watercolour' | 'minimal' | 'maximal' | 'retro'
  doorPrompts?: Record<number, string>
  doorImagePrompts?: Record<number, string>
  recipientName?: string
  relationship?: Relationship
  occasion?: Occasion
  mood?: string
  tone?: string
  colourHint?: string
  themePrompt?: string
  designConfig?: { borderStyle?: string; typographyHint?: string; stylePrompt?: string }
  layoutType?: LayoutType
  doorPositions?: DoorPosition[] // Custom positions for creative layouts
}

interface CalendarStore {
  calendar: AdventCalendar | null
  setCalendar: (c: AdventCalendar) => void
  openDoor: (day: number) => void
  resetCalendar: () => void
}

export const useCalendarStore = create<CalendarStore>()(
  persist(
    (set) => ({
      calendar: null,
      setCalendar: (calendar) => set({ calendar }),
      openDoor: (day) =>
        set((s) => {
          if (!s.calendar) return s
          const opened = s.calendar.openedDoors.includes(day) ? s.calendar.openedDoors : [...s.calendar.openedDoors, day]
          return { calendar: { ...s.calendar, openedDoors: opened } }
        }),
      resetCalendar: () => set({ calendar: null }),
    }),
    { name: 'cursor-e-advent-storage', storage: createJSONStorage(() => localStorage) }
  )
)
