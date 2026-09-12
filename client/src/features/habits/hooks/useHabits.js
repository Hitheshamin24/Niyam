import { useContext } from 'react';
import { HabitsContext } from '../state/HabitsContext';

export const useHabits = () => {
  const context = useContext(HabitsContext);
  if (!context) {
    throw new Error('useHabits must be used within a HabitsProvider');
  }
  return context;
};
