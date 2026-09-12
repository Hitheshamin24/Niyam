import { useState, useEffect, useMemo, useCallback } from 'react';
import { useHabits } from '@/features/habits/hooks/useHabits';
import { analyticsApi } from '../api/analyticsApi';

export const useAnalytics = () => {
  const { habits, isLoading: habitsLoading } = useHabits();
  const [statsList, setStatsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllAnalytics = useCallback(async () => {
    if (habits.length === 0) {
      setStatsList([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const data = await analyticsApi.getAllStats(habits);
    setStatsList(data);
    setIsLoading(false);
  }, [habits]);

  useEffect(() => {
    if (!habitsLoading) {
      fetchAllAnalytics();
    }
  }, [habits, habitsLoading, fetchAllAnalytics]);

  // Aggregated calculations
  const overview = useMemo(() => {
    let totalCompletions = 0;
    let maxCurrentStreak = 0;
    let maxLongestStreak = 0;
    let bestHabit = null;

    statsList.forEach(({ habit, stats }) => {
      totalCompletions += stats?.totalCompletions || 0;
      if ((stats?.currentStreak || 0) > maxCurrentStreak) {
        maxCurrentStreak = stats?.currentStreak || 0;
        bestHabit = habit?.name;
      }
      if ((stats?.longestStreak || 0) > maxLongestStreak) {
        maxLongestStreak = stats?.longestStreak || 0;
      }
    });

    return {
      totalCompletions,
      maxCurrentStreak,
      maxLongestStreak,
      bestHabit: bestHabit || 'N/A',
      totalHabits: habits.length,
    };
  }, [statsList, habits]);

  // Chart data: Habit monthly progress
  const habitProgressData = useMemo(() => {
    return statsList.map(({ habit, stats }) => ({
      name: habit?.name?.length > 12 ? habit.name.substring(0, 12) + '...' : (habit?.name || ''),
      fullName: habit?.name || '',
      completed: stats?.completedThisMonth || 0,
      goal: stats?.goalPerMonth || 30,
      percent: stats?.progressPercent || 0,
      color: habit?.color || '#10b981',
    }));
  }, [statsList]);

  // Chart data: Category breakdown
  const categoryData = useMemo(() => {
    const counts = {};
    habits.forEach((h) => {
      counts[h.category] = (counts[h.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
    }));
  }, [habits]);

  return {
    statsList,
    overview,
    habitProgressData,
    categoryData,
    isLoading: isLoading || habitsLoading,
    refreshAnalytics: fetchAllAnalytics,
  };
};
