/**
 * Utility function for word count validation
 * Validates text doesn't exceed word count limits
 */

/**
 * Counts the number of words in a text string
 * @param text - The text to count words in
 * @returns Number of words
 */
export function countWords(text: string): number {
  if (!text || text.trim() === '') {
    return 0;
  }

  // Split by whitespace and filter out empty strings
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  return words.length;
}

/**
 * Validates that text doesn't exceed the maximum word count
 * @param text - The text to validate
 * @param maxWords - Maximum allowed words (default: 200)
 * @returns Object with isValid flag and word count
 */
export function validateWordCount(text: string, maxWords: number = 200): {
  isValid: boolean;
  wordCount: number;
  maxWords: number;
  exceedsBy?: number;
} {
  const wordCount = countWords(text);
  const isValid = wordCount <= maxWords;
  const exceedsBy = isValid ? undefined : wordCount - maxWords;

  return {
    isValid,
    wordCount,
    maxWords,
    exceedsBy,
  };
}

/**
 * Validates word count for multiple text strings
 * @param texts - Array of text strings to validate
 * @param maxWords - Maximum allowed words per text (default: 200)
 * @returns Array of validation results
 */
export function validateWordCounts(texts: string[], maxWords: number = 200): Array<{
  text: string;
  isValid: boolean;
  wordCount: number;
  maxWords: number;
  exceedsBy?: number;
}> {
  return texts.map(text => ({
    text,
    ...validateWordCount(text, maxWords),
  }));
}

/**
 * Validates total word count across multiple text strings
 * @param texts - Array of text strings to validate
 * @param maxTotalWords - Maximum allowed total words (default: 200)
 * @returns Object with isValid flag and total word count
 */
export function validateTotalWordCount(texts: string[], maxTotalWords: number = 200): {
  isValid: boolean;
  totalWordCount: number;
  maxTotalWords: number;
  exceedsBy?: number;
} {
  const totalWordCount = texts.reduce((sum, text) => sum + countWords(text), 0);
  const isValid = totalWordCount <= maxTotalWords;
  const exceedsBy = isValid ? undefined : totalWordCount - maxTotalWords;

  return {
    isValid,
    totalWordCount,
    maxTotalWords,
    exceedsBy,
  };
}
