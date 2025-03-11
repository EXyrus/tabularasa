
import axios from 'axios';
import * as Sentry from '@/overrides/sentry.override';
import { getLocalStorageItem } from '@/helpers/local-storage';
import { mapKeyToCamelCase } from '@/helpers/map-key-to-camel-case';
import { mapKeyToSnakeCase } from '@/helpers/map-key-to-snake-case';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

// Add request interceptor to transform data to snake_case and add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    // Transform request data to snake_case
    if (config.data) {
      config.data = mapKeyToSnakeCase(config.data);
    }

    // Get token from local storage and add to headers if it exists
    const token = getLocalStorageItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Log request errors to Sentry
    Sentry.captureException(error, {
      extra: {
        type: 'axios_request_error',
        url: error.config?.url,
        method: error.config?.method,
      },
    });
    return Promise.reject(error);
  }
);

// Add response interceptor to transform data to camelCase
axiosInstance.interceptors.response.use(
  (response) => {
    // Transform response data to camelCase
    if (response.data) {
      response.data = mapKeyToCamelCase(response.data);
    }
    return response;
  },
  (error) => {
    // Log response errors to Sentry
    Sentry.captureException(error, {
      extra: {
        type: 'axios_response_error',
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
      },
    });
    return Promise.reject(error);
  }
);

export default axiosInstance;
