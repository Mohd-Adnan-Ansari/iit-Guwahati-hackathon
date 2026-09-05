import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor — attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('carbonlens_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem('carbonlens_token');
        if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
          window.location.href = '/login';
        }
      }
      const message = error.response.data?.error || 'An unexpected error occurred.';
      error.friendlyMessage = message;
    } else if (error.request) {
      error.friendlyMessage = 'Unable to connect to the server. Please check your connection.';
    } else {
      error.friendlyMessage = 'An unexpected error occurred.';
    }
    return Promise.reject(error);
  }
);

export default api;
