
/**
 * Utility functions to build API URIs
 */
import config from '../config';

type UriParams = {
  [key: string]: string | number;
};

/**
 * Builds a complete API URI
 * 
 * @param endpoint API endpoint path
 * @param params Query parameters
 * @returns Complete API URI
 */
export const buildUri = (endpoint: string, params?: UriParams): string => {
  const baseUrl = `https://${config.API_HOST}`;
  const uri = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  if (!params || Object.keys(params).length === 0) {
    return uri;
  }
  
  const queryString = Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');
  
  return `${uri}?${queryString}`;
};

/**
 * Common API endpoints
 */
export const ApiEndpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },
  
  profile: {
    get: (appType: string) => `/${appType}/profile`,
    update: (appType: string) => `/${appType}/profile/update`,
  },
  
  institution: {
    employees: {
      list: '/institution/employees',
      get: (id: string) => `/institution/employees/${id}`,
      create: '/institution/employees',
      update: (id: string) => `/institution/employees/${id}`,
    },
    students: {
      list: '/institution/students',
      get: (id: string) => `/institution/students/${id}`,
      create: '/institution/students',
      update: (id: string) => `/institution/students/${id}`,
    },
  },
  
  guardian: {
    students: {
      list: '/guardian/students',
      get: (id: string) => `/guardian/students/${id}`,
    },
    finances: '/guardian/finances',
    notifications: '/guardian/notifications',
  },
};
