import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fixed interceptor for Auth0
api.interceptors.request.use(
  async (config) => {
    if (typeof window !== 'undefined') {
      try {
        // Use the correct Auth0 endpoint to get access token
        const tokenRes = await fetch('/api/auth/token');
        if (tokenRes.ok) {
          const { accessToken } = await tokenRes.json();
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
        }
      } catch (error) {
        console.error('Failed to get access token:', error);
        // Don't block the request if token fetch fails
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login if unauthorized
      if (typeof window !== 'undefined') {
        window.location.href = '/api/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
