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
};
