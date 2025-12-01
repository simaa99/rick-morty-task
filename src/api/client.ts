/**
 * Axios HTTP client configured for Rick and Morty API
 * Base URL: https://rickandmortyapi.com/api
 */

import axios, { AxiosError } from 'axios';
import type { ApiError } from '@/types/rickAndMorty';

// Create axios instance with base configuration
export const apiClient = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for consistent error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    // Log errors for debugging
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request made but no response received
      console.error('Network Error:', error.message);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
