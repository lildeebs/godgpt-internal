import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface ColorPalette {
  id: string
  name: string
  colors: string[] // [Primary, Accent, Secondary, Background, Surface]
  image: string
}

export type SurpriseType = 'text' | 'image' | 'link'

export interface DoorSurprise {
  type: SurpriseType
  content: string // Text content, image URL, or link URL
  title?: string // Optional title for links
}

export interface AdventCalendar {
  name: string
  length: number
  palette: ColorPalette
  openedDoors: number[]
  createdAt: string // Store as ISO string for serialization
  timezone: string // Recipient's timezone
  doorStyle: 'doodle' | 'classic' // Door style preference
  doorPrompts?: Record<number, string> // AI prompts for custom door designs
  doorSurprises?: Record<number, DoorSurprise> // Surprises behind each door
  isAdmin?: boolean // Whether current user is admin/creator
  shareId?: string // Unique ID for sharing
}

// Predefined color palettes matching the requirements
export const PREDEFINED_PALETTES: ColorPalette[] = [
  {
    id: 'strawberry-matcha',
    name: 'Strawberry Matcha',
    colors: ['#4A6644', '#C66F80', '#FBEFF1', '#FBEFF1', '#FFFFFF'], // Primary, Accent, BG, BG, Surface
    image: '',
  },
  {
    id: 'lavender-fields',
    name: 'Lavender Fields',
    colors: ['#5B506C', '#B1A4C3', '#E6DDF0', '#E6DDF0', '#FFFFFF'],
    image: '',
  },
  {
    id: 'ocean-blues',
    name: 'Ocean Blues',
    colors: ['#006064', '#4DB6AC', '#E0F2F1', '#E0F2F1', '#FFFFFF'],
    image: '',
  },
  {
    id: 'hot-espresso',
    name: 'Hot Espresso',
    colors: ['#3E2723', '#8D6E63', '#F5F5DC', '#F5F5DC', '#FFFFFF'],
    image: '',
  },
]

interface CalendarStore {
  calendar: AdventCalendar | null
  setCalendar: (calendar: AdventCalendar) => void
  openDoor: (day: number) => void
  resetCalendar: () => void
}

export const useCalendarStore = create<CalendarStore>()(
  persist(
    (set) => ({
      calendar: null,
      setCalendar: (calendar) => set({ calendar }),
      openDoor: (day) =>
        set((state) => {
          if (!state.calendar) return state
          const openedDoors = state.calendar.openedDoors.includes(day)
            ? state.calendar.openedDoors
            : [...state.calendar.openedDoors, day]
          return {
            calendar: {
              ...state.calendar,
              openedDoors,
            },
          }
        }),
      resetCalendar: () => set({ calendar: null }),
    }),
    {
      name: 'advent-calendar-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
