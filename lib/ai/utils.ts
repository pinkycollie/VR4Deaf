/**
 * AI Service Utilities
 * Shared utility functions for AI services.
 */

/**
 * Generate a unique request ID with the given prefix
 * @param prefix - The prefix for the request ID (e.g., 'vr', 'report', 'learn', 'partner')
 * @returns A unique request ID string
 */
export function generateRequestId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Constants for skill assessment scoring
 */
export const SKILL_ASSESSMENT = {
  /** Minimum score for skill assessment (0-100 scale) */
  MIN_SCORE: 60,
  /** Maximum score for skill assessment (0-100 scale) */
  MAX_SCORE: 100,
  /** Score range for random generation */
  SCORE_RANGE: 40, // MAX_SCORE - MIN_SCORE
} as const;
