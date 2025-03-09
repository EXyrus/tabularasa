
/**
 * Checks if the app is running in Cypress test environment
 */
export const isCypress = (): boolean => {
  return typeof window !== 'undefined' && window.Cypress !== undefined;
};

/**
 * Checks if the app is running in a development environment
 */
export const isDevelopment = (): boolean => {
  return import.meta.env.MODE === 'development';
};

/**
 * Checks if the app is running in a production environment
 */
export const isProduction = (): boolean => {
  return import.meta.env.MODE === 'production';
};
