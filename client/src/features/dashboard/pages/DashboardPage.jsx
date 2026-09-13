import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useTodayHabits } from '../hooks/useTodayHabits';
import { getGreeting } from '@/utils/dateUtils';
import Spinner from '@/components/ui/Spinner';

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    todayHabits,
    todaySummary,
    isLoading,
    toggleHabitToday,
    openCreateModal,
  } = useTodayHabits();

  const [filterState, setFilterState] = useState('all'); // 'all' | 'pending' | 'done'

  const greeting = getGreeting();
  const userName = user?.name ? user.name.split(' ')[0] : 'Hithesh';

  const { totalToday = 0, completedToday = 0, remaining = 0 } = todaySummary;
  const percentage = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0;

  const filteredHabits = useMemo(() => {
    if (filterState === 'pending') {
      return todayHabits.filter((h) => !h.completedToday);
    }
    if (filterState === 'done') {
      return todayHabits.filter((h) => h.completedToday);
    }
    return todayHabits;
  }, [todayHabits, filterState]);

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto space-y-4">
      {/* Top Greeting & Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4">
        <div className="space-y-0.5">
          <h1 className="text-[22px] sm:text-[26px] text-on-surface tracking-tight font-semibold">
            {greeting}, {userName} 👋
          </h1>
          <p className="text-[13px] text-secondary">
            Here is your daily routine for today. Let's make it count.
          </p>
        </div>
      </div>

      {/* Bento Grid: Main Progress Card + Quote */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Main Progress Spotlight Card */}
        <div className="lg:col-span-8 rounded-xl bg-primary-container text-on-primary px-5 py-4 relative overflow-hidden shadow-md flex flex-col justify-between">
          <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-on-primary-container/10 blur-3xl pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-tertiary-fixed-dim/10 blur-2xl pointer-events-none" />

          {/* Upper Row */}
          <div className="relative z-10 flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-tertiary-fixed animate-pulse" />
              <span className="text-[10px] uppercase tracking-wider text-on-primary-container font-semibold">
                Today's Progress
              </span>
            </div>
            <div className="px-2.5 py-0.5 rounded-full bg-on-primary/10 backdrop-blur-sm text-on-primary text-[11px] font-medium">
              {completedToday} of {totalToday} Done
            </div>
          </div>

          {/* Metric */}
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
              <span className="text-[38px] sm:text-[44px] leading-none text-on-primary font-bold tracking-tight">
                {percentage}%
              </span>
              <span className="text-[15px] text-on-primary/90 font-medium">Completed</span>
            </div>
            <p className="text-[12px] text-on-primary-container/80 mt-1">
              {totalToday === 0
                ? 'No habits scheduled for today.'
                : percentage === 100
                ? 'All daily disciplines accomplished! Outstanding consistency.'
                : `${remaining} more habit${remaining > 1 ? 's' : ''} to complete today.`}
            </p>
            <div className="w-full bg-on-primary/20 h-2 rounded-full mt-4 overflow-hidden">
              <div
                className="bg-tertiary-fixed h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Tri-stat Strip */}
          <div className="relative z-10 mt-4 grid grid-cols-3 gap-2 bg-on-primary/10 rounded-lg px-4 py-2.5">
            {[
              { label: 'Total', value: totalToday, cls: 'text-on-primary' },
              { label: 'Completed', value: completedToday, cls: 'text-tertiary-fixed' },
              { label: 'Remaining', value: remaining, cls: 'text-on-primary' },
            ].map(({ label, value, cls }) => (
              <div key={label} className="flex flex-col items-center sm:items-start">
                <span className="text-[10px] uppercase text-on-primary-container/80 font-medium tracking-wider">{label}</span>
                <span className={`text-[16px] font-semibold mt-0.5 ${cls}`}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quote Card */}
        <div className="lg:col-span-4 rounded-xl bg-surface-container-lowest px-5 py-4 shadow-sm flex flex-col justify-between relative overflow-hidden border border-outline-variant/10">
          <div className="flex items-center justify-between mb-3">
            <div className="w-7 h-7 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[16px]">format_quote</span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-secondary font-semibold">Daily Reflection</span>
          </div>
          <p className="text-[14px] text-on-surface leading-relaxed font-medium flex-1">
            "We are what we repeatedly do. Excellence, then, is not an act, but a habit."
          </p>
          <p className="text-[10px] tracking-widest uppercase font-semibold text-secondary mt-3">
            — Will Durant
          </p>
        </div>
      </div>

      {/* Today's Habits Section */}
      <section className="rounded-xl bg-surface-container-lowest shadow-sm px-5 py-4 border border-outline-variant/10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[15px] font-bold text-on-surface tracking-tight">Today's Habits</h2>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] font-semibold">
                {todayHabits.length} Scheduled
              </span>
            </div>
            <p className="text-[12px] text-secondary mt-0.5">
              Check off tasks as you complete them throughout the day.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="inline-flex items-center p-0.5 rounded-lg bg-surface-container-low self-start sm:self-auto">
            {[
              { key: 'all', label: `All (${todayHabits.length})` },
              { key: 'pending', label: `Pending (${remaining})` },
              { key: 'done', label: `Done (${completedToday})` },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilterState(key)}
                className={`px-3 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                  filterState === key
                    ? 'bg-surface-container-lowest text-primary font-semibold shadow-sm'
                    : 'text-secondary hover:text-on-surface'
                }`}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-surface-container-high mb-3" />

        {/* Content */}
        {isLoading ? (
          <div className="py-10 flex flex-col items-center justify-center">
            <Spinner size="lg" className="text-primary mb-2" />
            <p className="text-xs text-secondary font-medium">Loading today's schedule...</p>
          </div>
        ) : filteredHabits.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {filteredHabits.map((habit) => {
              const isDone = Boolean(habit.completedToday);
              return (
                <div
                  key={habit._id}
                  onClick={() => toggleHabitToday(habit._id, isDone)}
                  className={`group p-3 rounded-xl border transition-all duration-200 flex flex-col gap-2.5 cursor-pointer select-none ${
                    isDone
                      ? 'bg-surface-container-low/50 border-primary/20'
                      : 'bg-surface-container-lowest border-outline-variant/20 hover:border-outline-variant/50 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: isDone ? '#00652c' : '#eff4ff',
                        color: isDone ? '#ffffff' : '#00652c',
                      }}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {habit.icon || 'eco'}
                      </span>
                    </div>
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                        isDone
                          ? 'bg-primary text-on-primary'
                          : 'border-2 border-outline-variant/60 group-hover:border-primary text-transparent'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[12px]">check</span>
                    </span>
                  </div>

                  <div>
                    <h3 className={`text-[13px] font-semibold leading-tight ${isDone ? 'line-through text-secondary' : 'text-on-surface'}`}>
                      {habit.name}
                    </h3>
                    <p className="text-[11px] text-secondary mt-0.5 line-clamp-1">
                      {habit.description || `${habit.category} • ${habit.frequency}`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-8 flex flex-col items-center text-center">
            <div className="relative mb-3">
              <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-sm">
                <span className="material-symbols-outlined text-[10px]">auto_awesome</span>
              </div>
            </div>
            <h3 className="text-[15px] text-on-surface font-semibold">No habits scheduled for today</h3>
            <p className="text-[12px] text-secondary mt-1 max-w-xs leading-relaxed">
              Create daily or weekly habits to see them appear on your schedule.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row items-center gap-2">
              <button
                onClick={openCreateModal}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-[13px] font-medium shadow-sm transition-all active:scale-[0.98] cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Create Habit</span>
              </button>
              <button
                onClick={() => navigate('/habits')}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-secondary hover:text-on-surface text-[13px] font-medium transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">explore</span>
                <span>Explore Routine Library</span>
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
