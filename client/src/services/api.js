import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://portfolio-hsg3.onrender.com/api' : '/api');

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token for admin routes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      if (window.location.pathname.includes('admin')) {
        window.location.href = '/admin-dashboard';
      }
    }
    return Promise.reject(error);
  }
);

// ---- Contact API ----
export const submitContactForm = async (data) => {
  const response = await api.post('/contact', data);
  return response.data;
};

// ---- Analytics API ----
export const trackEvent = async (event, metadata = {}) => {
  try {
    const sessionId = getSessionId();
    await api.post('/analytics/track', { event, metadata, sessionId, page: window.location.pathname });
  } catch {
    // Fail silently — analytics should never break UX
  }
};

// ---- Admin Auth API ----
export const adminLogin = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const getAdminProfile = async () => {
  const response = await api.get('/auth/profile');
  return response.data;
};

// ---- Admin Messages API ----
export const getMessages = async (params = {}) => {
  const response = await api.get('/admin/messages', { params });
  return response.data;
};

export const getMessage = async (id) => {
  const response = await api.get(`/admin/messages/${id}`);
  return response.data;
};

export const updateMessageStatus = async (id, status) => {
  const response = await api.put(`/admin/messages/${id}/status`, { status });
  return response.data;
};

export const deleteMessage = async (id) => {
  const response = await api.delete(`/admin/messages/${id}`);
  return response.data;
};

// ---- Admin Analytics API ----
export const getAnalytics = async () => {
  const response = await api.get('/admin/analytics');
  return response.data;
};

// ---- Session ID helper ----
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('portfolio_session');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    sessionStorage.setItem('portfolio_session', sessionId);
  }
  return sessionId;
};

export default api;
