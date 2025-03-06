
/**
 * Utility functions to build route paths
 */

type RouteParams = {
  [key: string]: string | number;
};

/**
 * Builds a route path by replacing parameter placeholders with actual values
 * 
 * @param route Base route with placeholders (e.g., "/users/:userId")
 * @param params Object containing parameter values
 * @returns Constructed route path
 */
export const buildRoute = (route: string, params?: RouteParams): string => {
  if (!params) return route;
  
  let result = route;
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`:${key}`, String(value));
  });
  
  return result;
};

/**
 * Common route builders for the application
 */
export const Routes = {
  // Common routes
  dashboard: (appType: 'vendor' | 'institution' | 'guardian') => `/${appType}/dashboard`,
  profile: (appType: 'vendor' | 'institution' | 'guardian') => `/${appType}/profile`,
  settings: (appType: 'vendor' | 'institution' | 'guardian') => `/${appType}/settings`,
  
  // Institution specific routes
  employees: {
    list: () => '/institution/employees',
    view: (employeeId: string) => `/institution/employees/${employeeId}`,
  },
  
  students: {
    list: (appType: 'institution' | 'guardian') => `/${appType}/students`,
    view: (appType: 'institution' | 'guardian', studentId: string) => `/${appType}/students/${studentId}`,
  },
  
  // Guardian specific routes
  finances: () => '/guardian/finances',
  notifications: () => '/guardian/notifications',
};


/**
 * Chains multiple route segments into a single route.
 * Ensures that each segment is properly separated by a single slash.
 *
 * @param routes An array of route segments
 * @returns Combined route path
 */
export const createRouteChain = (...routes: string[]): string => {
  return '/' + routes
    .map(segment => segment.replace(/(^\/+|\/+$)/g, ''))
    .filter(Boolean)
    .join('/');
};
