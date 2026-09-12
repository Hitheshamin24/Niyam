import React from 'react';
import { formatDisplayDate } from '@/utils/dateUtils';

export default function Navbar({ onMenuToggle, onOpenNewHabitModal }) {
  const todayFormatted = formatDisplayDate();

  return (
    <header className="fixed top-0 left-0 lg:left-[230px] right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant/20 z-40 flex items-center justify-between px-4 sm:px-space-lg shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
      <div className="flex items-center gap-space-sm">
        {/* Mobile menu button */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg text-secondary hover:bg-surface-container-low transition-colors"
          aria-label="Open menu"
        >
          <span className="material-symbols-outlined text-[20px]">menu</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low border border-outline-variant/30 text-on-surface">
          <span className="material-symbols-outlined text-primary text-[18px]">
            calendar_today
          </span>
          <span className="text-[12px] font-medium">{todayFormatted}</span>
        </div>
      </div>

      <div className="flex items-center gap-space-md">
        {onOpenNewHabitModal && (
          <button
            onClick={onOpenNewHabitModal}
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-[14px] font-medium transition-all shadow-[0_1px_3px_rgba(15,23,42,0.08)] active:scale-[0.98] cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>New Habit</span>
          </button>
        )}

        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <span className="material-symbols-outlined text-on-primary text-[18px]">
            person
          </span>
        </div>
      </div>
    </header>
  );
}
