import type { DoorPosition, LayoutType } from '../store'

// Shuffle array using Fisher-Yates
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function generateLayout(length: number, layoutType: LayoutType = 'grid'): DoorPosition[] {
  const days = Array.from({ length }, (_, i) => i + 1)
  const shuffledDays = shuffleArray(days)
  
  switch (layoutType) {
    case 'building':
      return generateBuildingLayout(shuffledDays, length)
    case 'scattered':
      return generateScatteredLayout(shuffledDays, length)
    case 'tree':
      return generateTreeLayout(shuffledDays, length)
    case 'wreath':
      return generateWreathLayout(shuffledDays, length)
    default:
      return generateGridLayout(days, length)
  }
}

function generateBuildingLayout(shuffledDays: number[], length: number): DoorPosition[] {
  const positions: DoorPosition[] = []
  const windowsPerFloor = 3 // Exactly 3 windows per floor like reference
  const floors = Math.ceil(length / windowsPerFloor)
  
  // Building dimensions - centered on page
  const buildingWidth = 50 // percentage of container
  const buildingLeft = 25 // start position
  const buildingTop = 10 // start position
  const buildingHeight = 75 // total building height
  
  // Window dimensions - fixed size to prevent overlap
  const windowWidth = buildingWidth / windowsPerFloor - 2 // 2% gap between windows
  const windowHeight = (buildingHeight / floors) - 3 // 3% gap between floors
  
  // Spacing calculations
  const floorSpacing = buildingHeight / floors
  const windowSpacing = buildingWidth / windowsPerFloor
  
  let dayIndex = 0
  for (let floor = 0; floor < floors && dayIndex < length; floor++) {
    const windowsThisFloor = Math.min(windowsPerFloor, length - dayIndex)
    const floorY = buildingTop + (floors - floor - 1) * floorSpacing + 1.5 // Center vertically in floor space
    
    // Center windows horizontally if less than 3
    const totalWindowsWidth = windowsThisFloor * windowSpacing
    const startX = buildingLeft + (buildingWidth - totalWindowsWidth) / 2
    
    for (let window = 0; window < windowsThisFloor && dayIndex < length; window++) {
      const x = startX + window * windowSpacing
      positions.push({
        day: shuffledDays[dayIndex],
        x,
        y: floorY,
        width: windowWidth,
        height: windowHeight,
        rotation: 0, // No rotation to prevent overlap
        zIndex: floor,
      })
      dayIndex++
    }
  }
  
  return positions
}

function generateScatteredLayout(shuffledDays: number[], length: number): DoorPosition[] {
  const positions: DoorPosition[] = []
  const doorSize = 12 // Fixed size to prevent overlap
  const centerX = 50
  const centerY = 50
  const minRadius = 20
  const maxRadius = 40
  const rings = Math.ceil(Math.sqrt(length))
  
  let dayIndex = 0
  for (let ring = 0; ring < rings && dayIndex < length; ring++) {
    const radius = minRadius + (ring / rings) * (maxRadius - minRadius)
    const doorsInRing = Math.min(Math.ceil((ring + 1) * 2.5), length - dayIndex)
    
    for (let i = 0; i < doorsInRing && dayIndex < length; i++) {
      const angle = (i / doorsInRing) * Math.PI * 2
      const x = centerX + Math.cos(angle) * radius - doorSize / 2
      const y = centerY + Math.sin(angle) * radius - doorSize / 2
      
      positions.push({
        day: shuffledDays[dayIndex],
        x,
        y,
        width: doorSize,
        height: doorSize,
        rotation: 0, // No rotation to prevent overlap
        zIndex: ring,
      })
      dayIndex++
    }
  }
  
  return positions
}

function generateTreeLayout(shuffledDays: number[], length: number): DoorPosition[] {
  const positions: DoorPosition[] = []
  const levels = Math.ceil(Math.sqrt(length))
  const doorWidth = 12
  const doorHeight = 10
  const levelHeight = 14
  const horizontalSpacing = 14
  
  let dayIndex = 0
  for (let level = 0; level < levels && dayIndex < length; level++) {
    const doorsInLevel = Math.min(level + 1, length - dayIndex)
    const totalWidth = doorsInLevel * horizontalSpacing
    const startX = 50 - totalWidth / 2 + horizontalSpacing / 2
    const y = 15 + level * levelHeight
    
    for (let i = 0; i < doorsInLevel && dayIndex < length; i++) {
      positions.push({
        day: shuffledDays[dayIndex],
        x: startX + i * horizontalSpacing - doorWidth / 2,
        y,
        width: doorWidth,
        height: doorHeight,
        rotation: 0,
        zIndex: level,
      })
      dayIndex++
    }
  }
  
  return positions
}

function generateWreathLayout(shuffledDays: number[], length: number): DoorPosition[] {
  const positions: DoorPosition[] = []
  const centerX = 50
  const centerY = 50
  const radius = 35
  const doorSize = 12
  
  shuffledDays.forEach((day, i) => {
    const angle = (i / length) * Math.PI * 2 - Math.PI / 2 // Start from top
    // Calculate position ensuring no overlap
    const x = centerX + Math.cos(angle) * radius - doorSize / 2
    const y = centerY + Math.sin(angle) * radius - doorSize / 2
    
    positions.push({
      day,
      x,
      y,
      width: doorSize,
      height: doorSize,
      rotation: 0, // No rotation to prevent overlap issues
      zIndex: i,
    })
  })
  
  return positions
}

function generateGridLayout(days: number[], length: number): DoorPosition[] {
  const cols = length <= 12 ? 3 : length <= 24 ? 4 : 5
  const rows = Math.ceil(length / cols)
  const positions: DoorPosition[] = []
  
  days.forEach((day, i) => {
    const col = i % cols
    const row = Math.floor(i / cols)
    positions.push({
      day,
      x: (col / cols) * 100,
      y: (row / rows) * 100,
      width: 100 / cols,
      height: 100 / rows,
      zIndex: 0,
    })
  })
  
  return positions
}
