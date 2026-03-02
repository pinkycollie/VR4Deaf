/**
 * Type definitions for Magician Module Template
 * @module @vr4deaf/magician-engine-template
 */

/**
 * Configuration options for the module
 */
export interface ModuleConfig {
  /**
   * Enable visual-first mode (recommended for Deaf users)
   * @default true
   */
  visualFirst?: boolean;

  /**
   * Enable ASL support integration
   * @default true
   */
  aslSupport?: boolean;

  /**
   * Enable high-contrast mode
   * @default false
   */
  highContrast?: boolean;

  /**
   * Debug mode for verbose logging
   * @default false
   */
  debug?: boolean;
}

/**
 * Runtime options for module operations
 */
export interface ModuleOptions {
  /**
   * Timeout in milliseconds
   * @default 5000
   */
  timeout?: number;

  /**
   * Enable caching
   * @default true
   */
  cache?: boolean;
}

/**
 * Result of module operations
 */
export interface ModuleResult<T = any> {
  /**
   * Operation success status
   */
  success: boolean;

  /**
   * Result data (if successful)
   */
  data?: T;

  /**
   * Error information (if failed)
   */
  error?: {
    code: string;
    message: string;
    details?: any;
  };

  /**
   * Visual feedback for Deaf users
   */
  visualFeedback?: {
    icon: string;
    color: string;
    message: string;
  };
}
