
import axios from 'axios';
import config from '@/config';
import { getLocalStorageItem } from '@/helpers/local-storage';
import * as Sentry from '@/overrides/sentry.override';
import { mapKeysToCamelCase } from '@/helpers/map-key-to-camel-case';
import { mapKeysToSnakeCase } from '@/helpers/map-key-to-snake-case';

// Create an instance of axios with default configuration
const axiosInstance = axios.create({
  baseURL: `${globalThis.location.protocol}//${config.API_HOST}/`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  // @ts-ignore
  withXMLHttpRequest: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
});

// Request interceptor for API calls - transform data to snake_case and add auth token
axiosInstance.interceptors.request.use(
  config => {
    // Add auth token if available
    const token = getLocalStorageItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Transform request data from camelCase to snake_case
    if (config.data) {
      config.data = mapKeysToSnakeCase(config.data);
    }

    return config;
  },
  error => {
    // Log request errors to Sentry
    Sentry.captureException(error);
    return Promise.reject(error);
  }
);

// Response interceptor for API calls - transform data to camelCase and handle errors
axiosInstance.interceptors.response.use(
  response => {
    // Transform response data from snake_case to camelCase
    if (response.data) {
      response.data = mapKeysToCamelCase(response.data);
    }
    return response;
  },
  async error => {
    const originalRequest = error.config;

    // Log the error to Sentry with additional context
    Sentry.withScope(scope => {
      scope.setExtra('request', {
        url: originalRequest?.url,
        method: originalRequest?.method,
        data: originalRequest?.data,
      });
      
      scope.setExtra('response', {
        status: error.response?.status,
        data: error.response?.data,
      });
      
      Sentry.captureException(error);
    });

    // Handle token refresh or authentication errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Clear auth data on authentication error
      localStorage.removeItem('token');
      localStorage.removeItem('tokenRegistered');

      // Redirect to login page
      window.location.href = '/login';
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
