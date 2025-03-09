
/**
 * Returns the current environment name
 * @returns The current environment name (production, development, etc.)
 */
export function getEnvironment(): string {
  return import.meta.env.MODE || 'development';
}

/**
 * Checks if the current environment is production
 * @returns True if the current environment is production
 */
export function isProduction(): boolean {
  return getEnvironment() === 'production';
}

/**
 * Checks if the current environment is development
 * @returns True if the current environment is development
 */
export function isDevelopment(): boolean {
  return getEnvironment() === 'development';
}

/**
 * Checks if the current environment is test
 * @returns True if the current environment is test
 */
export function isTest(): boolean {
  return getEnvironment() === 'test';
}
