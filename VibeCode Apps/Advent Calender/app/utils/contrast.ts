/**
 * Utility functions for ensuring text contrast meets WCAG AA standards (4.5:1 minimum)
 */

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

/**
 * Calculate relative luminance (0-1)
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((val) => {
    val = val / 255
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

/**
 * Calculate contrast ratio between two colors
 */
function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)

  if (!rgb1 || !rgb2) return 1

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b)
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b)

  const lighter = Math.max(lum1, lum2)
  const darker = Math.min(lum1, lum2)

  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Get a high-contrast text color for a given background
 * Returns either black (#000000) or white (#FFFFFF) based on which has better contrast
 */
export function getContrastText(backgroundColor: string): string {
  const black = '#000000'
  const white = '#FFFFFF'

  const contrastWithBlack = getContrastRatio(backgroundColor, black)
  const contrastWithWhite = getContrastRatio(backgroundColor, white)

  // Prefer black if both meet minimum (4.5:1), otherwise choose the better one
  if (contrastWithBlack >= 4.5 && contrastWithBlack >= contrastWithWhite) {
    return black
  }
  if (contrastWithWhite >= 4.5) {
    return white
  }

  // If neither meets 4.5:1, choose the one with better contrast
  return contrastWithBlack > contrastWithWhite ? black : white
}

/**
 * Get a readable text color from palette colors
 * Tries to find the darkest color in the palette that contrasts well with the background
 */
export function getReadableTextColor(
  backgroundColor: string,
  paletteColors: string[]
): string {
  // Try each palette color and find the one with best contrast
  let bestColor = '#000000'
  let bestContrast = 0

  for (const color of paletteColors) {
    const contrast = getContrastRatio(backgroundColor, color)
    if (contrast > bestContrast && contrast >= 4.5) {
      bestContrast = contrast
      bestColor = color
    }
  }

  // If no palette color meets 4.5:1, use black or white
  if (bestContrast < 4.5) {
    return getContrastText(backgroundColor)
  }

  return bestColor
}

/**
 * Check if a color is light (luminance > 0.5)
 */
export function isLightColor(color: string): boolean {
  const rgb = hexToRgb(color)
  if (!rgb) return false
  return getLuminance(rgb.r, rgb.g, rgb.b) > 0.5
}
