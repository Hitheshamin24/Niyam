import { useHabits } from '@/features/habits/hooks/useHabits';

export const useTodayHabits = () => {
  const {
    todayHabits,
    todaySummary,
    isLoading,
    toggleHabitToday,
    fetchTodayHabits,
    openCreateModal,
  } = useHabits();

  return {
    todayHabits,
    todaySummary,
    isLoading,
    toggleHabitToday,
    fetchTodayHabits,
    openCreateModal,
  };
};
