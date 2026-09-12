import { habitsApi } from '@/features/habits/api/habitsApi';

export const dashboardApi = {
  getToday: habitsApi.getTodayHabits,
  logHabit: habitsApi.logHabit,
  unLogHabit: habitsApi.unLogHabit,
};
