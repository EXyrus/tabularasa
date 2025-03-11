import axios from 'axios';
import config from '@/config';
import { getLocalStorageItem } from '@/helpers/local-storage';

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

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  config => {
    const token = getLocalStorageItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

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
