/**
 * Timezone utilities for door unlocking logic
 */

/**
 * Check if a door is unlocked based on the recipient's timezone
 * @param day - The day number (1-based)
 * @param timezone - The recipient's timezone (e.g., 'America/New_York')
 * @param createdAt - ISO string of when the calendar was created
 * @returns true if the door should be unlocked
 */
export function isDoorUnlocked(day: number, timezone: string, createdAt: string): boolean {
  try {
    const now = new Date()
    const createdDate = new Date(createdAt)
    
    // Get current date in the recipient's timezone
    const nowInTimezone = new Date(now.toLocaleString('en-US', { timeZone: timezone }))
    const createdInTimezone = new Date(createdDate.toLocaleString('en-US', { timeZone: timezone }))
    
    // Calculate the target date for this door (day - 1 days after creation)
    const targetDate = new Date(createdInTimezone)
    targetDate.setDate(createdInTimezone.getDate() + (day - 1))
    
    // Set to midnight in the recipient's timezone
    targetDate.setHours(0, 0, 0, 0)
    nowInTimezone.setHours(0, 0, 0, 0)
    
    // Door is unlocked if current date >= target date
    return nowInTimezone >= targetDate
  } catch (error) {
    console.error('Error checking door unlock status:', error)
    // Fallback: unlock all doors if there's an error
    return true
  }
}

/**
 * Get the number of hours until a door unlocks
 * @param day - The day number (1-based)
 * @param timezone - The recipient's timezone
 * @param createdAt - ISO string of when the calendar was created
 * @returns Number of hours until unlock, or 0 if already unlocked
 */
export function getHoursUntilUnlock(day: number, timezone: string, createdAt: string): number {
  try {
    const now = new Date()
    const createdDate = new Date(createdAt)
    
    const nowInTimezone = new Date(now.toLocaleString('en-US', { timeZone: timezone }))
    const createdInTimezone = new Date(createdDate.toLocaleString('en-US', { timeZone: timezone }))
    
    const targetDate = new Date(createdInTimezone)
    targetDate.setDate(createdInTimezone.getDate() + (day - 1))
    targetDate.setHours(0, 0, 0, 0)
    
    if (nowInTimezone >= targetDate) {
      return 0
    }
    
    const diffMs = targetDate.getTime() - nowInTimezone.getTime()
    return Math.ceil(diffMs / (1000 * 60 * 60))
  } catch (error) {
    console.error('Error calculating hours until unlock:', error)
    return 0
  }
}

/**
 * Get a human-readable countdown string
 * @param hours - Number of hours until unlock
 * @returns Formatted string like "2 hours" or "1 day, 3 hours"
 */
export function getCountdownString(hours: number): string {
  if (hours === 0) return 'Now!'
  
  const days = Math.floor(hours / 24)
  const remainingHours = hours % 24
  
  if (days > 0) {
    if (remainingHours > 0) {
      return `${days} day${days > 1 ? 's' : ''}, ${remainingHours} hour${remainingHours > 1 ? 's' : ''}`
    }
    return `${days} day${days > 1 ? 's' : ''}`
  }
  
  return `${hours} hour${hours > 1 ? 's' : ''}`
}
