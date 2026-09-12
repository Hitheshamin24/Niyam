import apiClient from '@/services/apiClient';

export const analyticsApi = {
  // GET /api/habits/:id/stats
  getHabitStats: async (id) => {
    const response = await apiClient.get(`/habits/${id}/stats`);
    return response.data;
  },

  // Fetch stats for all active habits
  getAllStats: async (habits) => {
    if (!habits || habits.length === 0) return [];
    const promises = habits.map(async (habit) => {
      try {
        const res = await apiClient.get(`/habits/${habit._id}/stats`);
        return {
          habit,
          stats: res.data?.stats || {
            currentStreak: 0,
            longestStreak: 0,
            completedThisMonth: 0,
            goalPerMonth: habit.goalPerMonth || 30,
            progressPercent: 0,
            totalCompletions: 0,
          },
        };
      } catch (err) {
        console.error(`Failed to fetch stats for habit ${habit._id}:`, err);
        return {
          habit,
          stats: {
            currentStreak: 0,
            longestStreak: 0,
            completedThisMonth: 0,
            goalPerMonth: habit.goalPerMonth || 30,
            progressPercent: 0,
            totalCompletions: 0,
          },
        };
      }
    });
    return Promise.all(promises);
  },
};
