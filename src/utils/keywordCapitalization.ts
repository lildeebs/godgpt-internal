/**
 * Utility function for keyword capitalization
 * Capitalizes keywords in text based on keyword array
 */

/**
 * Capitalizes specified keywords in a text string
 * @param text - The text to process
 * @param keywords - Array of keywords to capitalize
 * @returns Text with keywords capitalized
 */
export function capitalizeKeywords(text: string, keywords: string[]): string {
  if (!keywords || keywords.length === 0) {
    return text;
  }

  let result = text;

  // Sort keywords by length (longest first) to handle overlapping keywords
  const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length);

  for (const keyword of sortedKeywords) {
    if (!keyword || keyword.trim() === '') {
      continue;
    }

    // Create case-insensitive regex to find the keyword
    // Use word boundaries to match whole words only
    const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    
    // Replace with capitalized version
    result = result.replace(regex, (match) => {
      // Preserve original case pattern but capitalize
      return keyword.split('').map((char, index) => {
        const originalChar = match[index] || char;
        return originalChar.toUpperCase();
      }).join('');
    });
  }

  return result;
}

/**
 * Capitalizes keywords in an array of text strings
 * @param texts - Array of text strings to process
 * @param keywords - Array of keywords to capitalize
 * @returns Array of texts with keywords capitalized
 */
export function capitalizeKeywordsInArray(texts: string[], keywords: string[]): string[] {
  return texts.map(text => capitalizeKeywords(text, keywords));
}
