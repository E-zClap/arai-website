import axios from 'axios';

// In production the API is served same-origin behind nginx at /api.
// For local dev you can point at another host with REACT_APP_API_URL.
export const API_BASE = process.env.REACT_APP_API_URL || '/api';

export const TOKEN_KEY = 'arai_admin_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export const api = axios.create({ baseURL: API_BASE });

// Attach the admin token to every request when present.
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// On auth failure, drop the token and bounce to the login page (admin only).
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      clearToken();
      if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
        if (window.location.pathname !== '/admin/login') {
          window.location.assign('/admin/login');
        }
      }
    }
    return Promise.reject(error);
  }
);
