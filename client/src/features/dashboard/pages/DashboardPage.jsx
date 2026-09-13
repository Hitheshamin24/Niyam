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
    <div className="flex flex-col w-full max-w-6xl mx-auto space-y-space-xl">
      {/* Top Greeting & Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md  pt-5">
        <div className="space-y-space-xs">
          <div className="inline-flex items-center gap-2">
            <h1 className="text-[28px] sm:text-[32px] text-on-surface tracking-tight font-semibold">
              {greeting}, {userName} 👋
            </h1>
          </div>
          <p className="text-[16px] text-secondary">
            Here is your daily routine for today. Let's make it count.
          </p>
        </div>
      
      </div>

      {/* Bento Grid: Main Emerald Progress Card + Editorial Quote */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
        {/* Main Progress Spotlight Card */}
        <div className="lg:col-span-8 rounded-xl bg-primary-container text-on-primary p-space-lg sm:p-space-xl relative overflow-hidden shadow-md flex flex-col justify-between">
          {/* Background Ambient Aura */}
          <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-on-primary-container/10 blur-3xl pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-tertiary-fixed-dim/10 blur-2xl pointer-events-none" />

          {/* Card Upper Row */}
          <div className="relative z-10 flex items-center justify-between mb-space-lg">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-tertiary-fixed animate-pulse" />
              <span className="text-[11px] uppercase tracking-wider text-on-primary-container font-semibold">
                Today's Progress
              </span>
            </div>
            <div className="px-3 py-1 rounded-full bg-on-primary/10 backdrop-blur-sm text-on-primary text-[11px] font-medium tracking-tight">
              {completedToday} of {totalToday} Done
            </div>
          </div>

          {/* Metric Visual & Headline */}
          <div className="relative z-10 my-auto py-space-sm">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
              <span className="text-[44px] sm:text-[52px] leading-none text-on-primary font-bold tracking-tight">
                {percentage}%
              </span>
              <span className="text-[18px] text-on-primary/90 font-medium">
                Completed
              </span>
            </div>
            <p className="text-[14px] text-on-primary-container/80 mt-2">
              {totalToday === 0
                ? 'No habits scheduled for today.'
                : percentage === 100
                ? 'All daily disciplines accomplished! Outstanding consistency.'
                : `${remaining} more habit${remaining > 1 ? 's' : ''} to complete today.`}
            </p>

            {/* Dynamic High-contrast Progress Track */}
            <div className="w-full bg-on-primary/20 h-2.5 rounded-full mt-space-lg overflow-hidden p-0.5">
              <div
                className="bg-tertiary-fixed h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Tri-stat Matrix Strip */}
          <div className="relative z-10 mt-space-xl pt-space-md grid grid-cols-3 gap-space-sm bg-on-primary/10 rounded-lg p-space-md">
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <span className="text-[11px] uppercase text-on-primary-container/80 font-medium tracking-wider">
                Total
              </span>
              <span className="text-[18px] font-semibold text-on-primary mt-0.5">
                {totalToday}
              </span>
            </div>
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <span className="text-[11px] uppercase text-on-primary-container/80 font-medium tracking-wider">
                Completed
              </span>
              <span className="text-[18px] font-semibold text-tertiary-fixed mt-0.5">
                {completedToday}
              </span>
            </div>
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <span className="text-[11px] uppercase text-on-primary-container/80 font-medium tracking-wider">
                Remaining
              </span>
              <span className="text-[18px] font-semibold text-on-primary mt-0.5">
                {remaining}
              </span>
            </div>
          </div>
        </div>

        {/* Motivational Anchor Card */}
        <div className="lg:col-span-4 rounded-xl bg-surface-container-lowest p-space-lg sm:p-space-xl shadow-sm flex flex-col justify-between relative overflow-hidden border border-outline-variant/10">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">format_quote</span>
            </div>
            <span className="text-[11px] uppercase tracking-widest text-secondary font-semibold">
              Daily Reflection
            </span>
          </div>
          <div className="my-space-md">
            <p className="text-[18px] text-on-surface leading-relaxed font-medium">
              “We are what we repeatedly do. Excellence, then, is not an act, but a habit.”
            </p>
          </div>
          <div className="pt-space-md">
            <p className="text-[11px] tracking-widest uppercase font-semibold text-secondary">
              — Will Durant
            </p>
          </div>
        </div>
      </div>

      {/* Today's Habits Section Container */}
      <section className="rounded-xl bg-surface-container-lowest shadow-sm p-space-lg sm:p-space-xl border border-outline-variant/10">
        {/* Header with Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pb-space-lg">
          <div className="space-y-space-xs">
            <div className="flex items-center gap-2">
              <h2 className="text-[20px] font-bold text-on-surface tracking-tight">
                Today's Habits
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[11px] font-semibold">
                {todayHabits.length} Scheduled
              </span>
            </div>
            <p className="text-[14px] text-secondary">
              Check off tasks as you complete them throughout the day.
            </p>
          </div>

          {/* Segmented State Filters */}
          <div className="inline-flex items-center p-1 rounded-lg bg-surface-container-low self-start sm:self-auto">
            <button
              onClick={() => setFilterState('all')}
              className={`px-3.5 py-1.5 rounded-md text-[12px] font-medium transition-colors cursor-pointer ${
                filterState === 'all'
                  ? 'bg-surface-container-lowest text-primary font-semibold shadow-sm'
                  : 'text-secondary hover:text-on-surface'
              }`}
              type="button"
            >
              All ({todayHabits.length})
            </button>
            <button
              onClick={() => setFilterState('pending')}
              className={`px-3.5 py-1.5 rounded-md text-[12px] font-medium transition-colors cursor-pointer ${
                filterState === 'pending'
                  ? 'bg-surface-container-lowest text-primary font-semibold shadow-sm'
                  : 'text-secondary hover:text-on-surface'
              }`}
              type="button"
            >
              Pending ({remaining})
            </button>
            <button
              onClick={() => setFilterState('done')}
              className={`px-3.5 py-1.5 rounded-md text-[12px] font-medium transition-colors cursor-pointer ${
                filterState === 'done'
                  ? 'bg-surface-container-lowest text-primary font-semibold shadow-sm'
                  : 'text-secondary hover:text-on-surface'
              }`}
              type="button"
            >
              Done ({completedToday})
            </button>
          </div>
        </div>

        {/* Thin Divider */}
        <div className="w-full h-px bg-surface-container-high my-space-md" />

        {/* Content */}
        {isLoading ? (
          <div className="py-16 flex flex-col items-center justify-center">
            <Spinner size="lg" className="text-primary mb-2" />
            <p className="text-xs text-secondary font-medium">Loading today's schedule...</p>
          </div>
        ) : filteredHabits.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md pt-2">
            {filteredHabits.map((habit) => {
              const isDone = Boolean(habit.completedToday);
              return (
                <div
                  key={habit._id}
                  onClick={() => toggleHabitToday(habit._id, isDone)}
                  className={`group p-space-md rounded-xl border transition-all duration-200 flex flex-col justify-between h-44 cursor-pointer select-none ${
                    isDone
                      ? 'bg-surface-container-low/50 border-primary/20 shadow-xs'
                      : 'bg-surface-container-lowest border-outline-variant/20 hover:border-outline-variant/50 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: isDone ? '#00652c' : '#eff4ff',
                        color: isDone ? '#ffffff' : '#00652c',
                      }}
                    >
                      <span className="material-symbols-outlined text-[22px]">
                        {habit.icon || 'eco'}
                      </span>
                    </div>
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        isDone
                          ? 'bg-primary text-on-primary shadow-xs scale-105'
                          : 'border-2 border-outline-variant/60 group-hover:border-primary text-transparent'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px] stroke-[2.5]">
                        check
                      </span>
                    </span>
                  </div>

                  <div>
                    <h3
                      className={`text-[18px] font-semibold transition-colors ${
                        isDone ? 'line-through text-secondary' : 'text-on-surface'
                      }`}
                    >
                      {habit.name}
                    </h3>
                    <p className="text-[13px] text-secondary mt-0.5 line-clamp-1">
                      {habit.description || `${habit.category} • ${habit.frequency}`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Quiet Restorative Empty State Composition */
          <div className="py-space-2xl px-space-md flex flex-col items-center text-center">
            <div className="relative mb-space-md">
              <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center text-primary relative z-10 transition-transform duration-300 hover:scale-105">
                <span
                  className="material-symbols-outlined text-[36px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  eco
                </span>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-on-primary z-20 shadow-sm">
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              </div>
            </div>

            <div className="max-w-md space-y-space-xs">
              <h3 className="text-[18px] text-on-surface font-semibold tracking-tight">
                No habits scheduled for today
              </h3>
              <p className="text-[14px] text-secondary leading-relaxed">
                Create daily or weekly habits to see them appear on your schedule. Start small to
                build compounding momentum.
              </p>
            </div>

            <div className="mt-space-lg flex flex-col sm:flex-row items-center gap-space-sm">
              <button
                onClick={openCreateModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-[14px] font-medium shadow-sm transition-all duration-200 active:scale-[0.98] cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">add</span>
                <span>Create Habit</span>
              </button>
              <button
                onClick={() => navigate('/habits')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-secondary hover:text-on-surface text-[14px] font-medium transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">explore</span>
                <span>Explore Routine Library</span>
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
