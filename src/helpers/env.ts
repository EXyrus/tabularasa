
/**
 * Get the current environment
 * @returns The current environment
 */
export const getEnvironment = (): 'development' | 'production' | 'test' => {
  // Check if Cypress is defined on the window object with optional chaining
  if (typeof window !== 'undefined' && (window as any)?.Cypress) {
    return 'test';
  }

  if (import.meta.env.DEV) {
    return 'development';
  }

  return 'production';
};

/**
 * Check if the current environment is development
 * @returns True if the current environment is development
 */
export const isDevelopment = (): boolean => {
  return getEnvironment() === 'development';
};

/**
 * Check if the current environment is production
 * @returns True if the current environment is production
 */
export const isProduction = (): boolean => {
  return getEnvironment() === 'production';
};

/**
 * Check if the current environment is test
 * @returns True if the current environment is test
 */
export const isTest = (): boolean => {
  return getEnvironment() === 'test';
};
