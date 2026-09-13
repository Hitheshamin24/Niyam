import apiClient from '@/services/apiClient';

export const authApi = {
  // POST /api/auth/login
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  // POST /api/auth/register
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  // GET /api/auth/me
  getMe: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  // POST /api/auth/refresh — uses httpOnly cookie automatically
  refresh: async () => {
    const response = await apiClient.post('/auth/refresh');
    return response.data;
  },

  // POST /api/auth/logout — clears the httpOnly cookie
  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },
};
