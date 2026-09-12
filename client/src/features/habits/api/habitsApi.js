import apiClient from '@/services/apiClient';

export const habitsApi = {
  // GET /api/habits
  getAll: async () => {
    const response = await apiClient.get('/habits');
    return response.data;
  },

  // GET /api/habits/:id
  getById: async (id) => {
    const response = await apiClient.get(`/habits/${id}`);
    return response.data;
  },

  // POST /api/habits
  create: async (habitData) => {
    const response = await apiClient.post('/habits', habitData);
    return response.data;
  },

  // PUT /api/habits/:id
  update: async (id, habitData) => {
    const response = await apiClient.put(`/habits/${id}`, habitData);
    return response.data;
  },

  // DELETE /api/habits/:id
  delete: async (id) => {
    const response = await apiClient.delete(`/habits/${id}`);
    return response.data;
  },

  // GET /api/habits/today
  getTodayHabits: async () => {
    const response = await apiClient.get('/habits/today');
    return response.data;
  },

  // POST /api/habits/:id/log (mark complete today)
  logHabit: async (id, note = '') => {
    const response = await apiClient.post(`/habits/${id}/log`, { note });
    return response.data;
  },

  // DELETE /api/habits/:id/log (unmark complete today)
  unLogHabit: async (id) => {
    const response = await apiClient.delete(`/habits/${id}/log`);
    return response.data;
  },

  // GET /api/habits/:id/stats
  getStats: async (id) => {
    const response = await apiClient.get(`/habits/${id}/stats`);
    return response.data;
  },
};
