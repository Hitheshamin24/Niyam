import React, { createContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { habitsApi } from '../api/habitsApi';

export const HabitsContext = createContext(null);

export const HabitsProvider = ({ children }) => {
  const [habits, setHabits] = useState([]);
  const [todayHabits, setTodayHabits] = useState([]);
  const [todaySummary, setTodaySummary] = useState({
    totalToday: 0,
    completedToday: 0,
    remaining: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);

  // Fetch all habits
  const fetchHabits = useCallback(async () => {
    try {
      const data = await habitsApi.getAll();
      if (data.success) {
        setHabits(data.habits || []);
      }
    } catch (err) {
      console.error('Error fetching habits:', err);
      toast.error('Failed to load habits');
    }
  }, []);

  // Fetch today habits and summary
  const fetchTodayHabits = useCallback(async () => {
    try {
      const data = await habitsApi.getTodayHabits();
      if (data.success) {
        setTodayHabits(data.habits || []);
        setTodaySummary(data.summary || { totalToday: 0, completedToday: 0, remaining: 0 });
      }
    } catch (err) {
      console.error('Error fetching today habits:', err);
    }
  }, []);

  // Refresh all habit state
  const refreshAll = useCallback(async () => {
    setIsLoading(true);
    await Promise.all([fetchHabits(), fetchTodayHabits()]);
    setIsLoading(false);
  }, [fetchHabits, fetchTodayHabits]);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  // Create habit
  const createHabit = async (habitData) => {
    try {
      const data = await habitsApi.create(habitData);
      if (data.success) {
        toast.success(`Habit "${data.habit.name}" created!`);
        await refreshAll();
        closeFormModal();
        return { success: true };
      }
      return { success: false };
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to create habit';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  // Update habit
  const updateHabit = async (id, habitData) => {
    try {
      const data = await habitsApi.update(id, habitData);
      if (data.success) {
        toast.success('Habit updated successfully!');
        await refreshAll();
        closeFormModal();
        return { success: true };
      }
      return { success: false };
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update habit';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  // Delete habit
  const deleteHabit = async (id) => {
    try {
      const data = await habitsApi.delete(id);
      if (data.success) {
        toast.success('Habit deleted');
        setHabits((prev) => prev.filter((h) => h._id !== id));
        setTodayHabits((prev) => prev.filter((h) => h._id !== id));
        fetchTodayHabits();
        return { success: true };
      }
      return { success: false };
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to delete habit';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  // Optimistic toggle for today habit completion
  const toggleHabitToday = async (habitId, isCurrentlyCompleted) => {
    // 1. Optimistic state update
    const nextStatus = !isCurrentlyCompleted;
    setTodayHabits((prev) =>
      prev.map((h) =>
        h._id === habitId ? { ...h, completedToday: nextStatus } : h
      )
    );
    setTodaySummary((prev) => {
      const completedDelta = nextStatus ? 1 : -1;
      const completedToday = Math.max(0, prev.completedToday + completedDelta);
      const remaining = Math.max(0, prev.totalToday - completedToday);
      return { ...prev, completedToday, remaining };
    });

    // 2. Call backend API
    try {
      if (nextStatus) {
        await habitsApi.logHabit(habitId);
        toast.success('Habit completed for today! 🔥');
      } else {
        await habitsApi.unLogHabit(habitId);
        toast('Habit unmarked for today', { icon: '↩️' });
      }
    } catch (err) {
      // Revert optimistic update on failure
      console.error('Failed to toggle habit:', err);
      toast.error('Failed to update habit status');
      setTodayHabits((prev) =>
        prev.map((h) =>
          h._id === habitId ? { ...h, completedToday: isCurrentlyCompleted } : h
        )
      );
      fetchTodayHabits();
    }
  };

  const openCreateModal = () => {
    setEditingHabit(null);
    setIsFormModalOpen(true);
  };

  const openEditModal = (habit) => {
    setEditingHabit(habit);
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    setEditingHabit(null);
    setIsFormModalOpen(false);
  };

  const value = {
    habits,
    todayHabits,
    todaySummary,
    isLoading,
    isFormModalOpen,
    editingHabit,
    openCreateModal,
    openEditModal,
    closeFormModal,
    fetchHabits,
    fetchTodayHabits,
    refreshAll,
    createHabit,
    updateHabit,
    deleteHabit,
    toggleHabitToday,
  };

  return (
    <HabitsContext.Provider value={value}>{children}</HabitsContext.Provider>
  );
};
