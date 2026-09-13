import React, { useState, useMemo } from 'react';
import { useHabits } from '../hooks/useHabits';
import HabitDeleteModal from '../components/HabitDeleteModal';
import HabitStatsModal from '@/features/analytics/components/HabitStatsModal';
import Spinner from '@/components/ui/Spinner';

export default function HabitsPage() {
  const {
    habits,
    isLoading,
    openCreateModal,
    openEditModal,
    deleteHabit,
    createHabit,
  } = useHabits();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFrequency, setSelectedFrequency] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [deletingHabit, setDeletingHabit] = useState(null);
  const [statsHabit, setStatsHabit] = useState(null);

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'Health', label: 'Health' },
    { id: 'Fitness', label: 'Fitness' },
    { id: 'Learning', label: 'Learning' },
    { id: 'Mindfulness', label: 'Mindfulness' },
    { id: 'Nutrition', label: 'Nutrition' },
    { id: 'Sleep', label: 'Sleep' },
    { id: 'Social', label: 'Social' },
    { id: 'Finance', label: 'Finance' },
    { id: 'Other', label: 'Other' },
  ];

  const quickAdopt = (title, category, freq, description = '') => {
    openEditModal({
      name: title,
      category,
      frequency: freq.toLowerCase(),
      description,
      goalPerMonth: freq.toLowerCase() === 'daily' ? 30 : 12,
      color: '#00652c',
      icon: category === 'Health' ? 'wb_sunny' : category === 'Learning' ? 'menu_book' : 'eco',
      weekdays: freq.toLowerCase() === 'weekly' ? [0] : [],
    });
  };

  const filteredHabits = useMemo(() => {
    return habits.filter((habit) => {
      if (
        selectedCategory !== 'all' &&
        habit.category.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }
      if (
        selectedFrequency !== 'all' &&
        habit.frequency.toLowerCase() !== selectedFrequency.toLowerCase()
      ) {
        return false;
      }
      if (
        searchQuery.trim() &&
        !habit.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) &&
        !habit.description?.toLowerCase().includes(searchQuery.toLowerCase().trim())
      ) {
        return false;
      }
      return true;
    });
  }, [habits, selectedCategory, selectedFrequency, searchQuery]);

  return (
    <div className="flex flex-col w-full gap-space-xl">
      {/* Header Block with Search and Primary Action */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-space-xs mb-1 pt-5">
            <span className="text-[11px] uppercase tracking-widest text-primary font-semibold">
              Architecture
            </span>
            <span className="text-outline-variant text-[11px]">/</span>
            <span className="text-[11px] uppercase tracking-widest text-secondary font-semibold">
              Repository
            </span>
          </div>
          <h1 className="text-[32px] text-on-surface tracking-tight font-bold">
            All Habits
          </h1>
          <p className="text-[14px] text-secondary mt-1">
            Manage your daily disciplines, schedules, and targets.
          </p>
        </div>

     
      </div>

      {/* Category & Frequency Filter Rail */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md p-space-xs rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/10">
        {/* Left Category Scroll Track */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 px-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all duration-150 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-primary text-on-primary font-semibold shadow-sm'
                    : 'text-secondary hover:text-on-surface hover:bg-surface-container-low'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Right Frequency Segment */}
        <div className="flex items-center gap-1 self-start lg:self-center p-1 rounded-lg bg-surface-container-low flex-shrink-0">
          {['all', 'daily', 'weekly'].map((freq) => {
            const isActive = selectedFrequency === freq;
            return (
              <button
                key={freq}
                type="button"
                onClick={() => setSelectedFrequency(freq)}
                className={`px-3 py-1 rounded-md text-[11px] font-medium capitalize transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-sm'
                    : 'text-secondary hover:text-on-surface'
                }`}
              >
                {freq === 'all' ? 'All Freq' : freq}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="py-24 flex flex-col items-center justify-center">
          <Spinner size="lg" className="text-primary mb-3" />
          <p className="text-xs text-secondary font-medium">Loading habits catalogue...</p>
        </div>
      ) : filteredHabits.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
          {filteredHabits.map((habit) => (
            <div
              key={habit._id}
              className="group p-space-md rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-space-sm">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white transition-transform group-hover:scale-105 shadow-xs"
                    style={{ backgroundColor: habit.color || '#00652c' }}
                  >
                    <span className="material-symbols-outlined text-[22px]">
                      {habit.icon || 'eco'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-surface-container-high text-secondary font-medium">
                      {habit.category}
                    </span>
                    <button
                      onClick={() => openEditModal(habit)}
                      className="p-1 rounded text-secondary hover:text-on-surface hover:bg-surface-container cursor-pointer"
                      title="Edit Habit"
                    >
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                    </button>
                    <button
                      onClick={() => setDeletingHabit(habit)}
                      className="p-1 rounded text-secondary hover:text-error hover:bg-surface-container cursor-pointer"
                      title="Delete Habit"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </div>
                </div>
                <h3 className="text-[18px] text-on-surface font-semibold group-hover:text-primary transition-colors">
                  {habit.name}
                </h3>
                <p className="text-[13px] text-secondary mt-1 line-clamp-2">
                  {habit.description || `Repeat ${habit.frequency} • Goal: ${habit.goalPerMonth} days/month`}
                </p>
              </div>

              <div className="mt-space-md pt-space-sm border-t border-outline-variant/10 flex items-center justify-between text-[11px] text-secondary">
                <span className="capitalize">{habit.frequency} · {habit.goalPerMonth || 30}d goal</span>
                <button
                  onClick={() => setStatsHabit(habit)}
                  className="font-semibold text-primary inline-flex items-center gap-0.5 hover:underline cursor-pointer"
                >
                  View stats
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Main Empty State Composition Card */
        <div className="relative w-full overflow-hidden rounded-2xl bg-surface-container-lowest shadow-md py-space-2xl px-space-lg flex flex-col items-center justify-center text-center min-h-[460px] border border-outline-variant/15">
          {/* Background Ambient Geometric SVG */}
          <div className="absolute inset-0 pointer-events-none opacity-40 flex items-center justify-center">
            <svg
              className="w-full h-full max-w-2xl max-h-[380px]"
              fill="none"
              viewBox="0 0 600 380"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="text-surface-container-highest"
                cx="300"
                cy="190"
                r="160"
                stroke="currentColor"
                strokeDasharray="4 8"
                strokeWidth="1.5"
              />
              <circle
                className="text-surface-container-high"
                cx="300"
                cy="190"
                r="230"
                stroke="currentColor"
                strokeWidth="1"
              />
              <circle
                className="text-surface-container-low"
                cx="300"
                cy="190"
                fill="currentColor"
                r="85"
              />
            </svg>
          </div>

          {/* Content Core */}
          <div className="relative z-10 flex flex-col items-center max-w-md mx-auto">
            {/* Botanical Organic Icon Vessel */}
            <div className="relative mb-space-lg group">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary transition-transform duration-300 group-hover:scale-105 group-hover:bg-primary/15">
                <span
                  className="material-symbols-outlined text-[40px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  spa
                </span>
              </div>
              <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-sm">
                <span className="material-symbols-outlined text-[16px]">
                  arrow_back_ios_new
                </span>
              </div>
            </div>

            {/* Typography Core */}
            <h2 className="text-[24px] text-on-surface font-semibold tracking-tight">
              {searchQuery || selectedCategory !== 'all' || selectedFrequency !== 'all'
                ? 'No matching habits found'
                : 'No habits created yet'}
            </h2>
            <p className="text-[16px] text-secondary mt-space-xs mb-space-xl leading-relaxed">
              Start your journey towards personal mastery by creating your first daily or weekly
              habit.
            </p>

            {/* Tactile Action Primary */}
            <button
              onClick={openCreateModal}
              className="inline-flex items-center justify-center gap-2 h-11 px-7 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-[14px] font-semibold shadow-md shadow-primary/20 transition-all duration-200 active:scale-[0.98] cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              <span>Create Your First Habit</span>
            </button>

            {/* Subtle Supportive Insight */}
            <div className="mt-space-2xl inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low text-secondary text-[11px]">
              <span className="material-symbols-outlined text-[16px] text-primary">
                verified
              </span>
              <span>Routine consistency compounds over 66 days</span>
            </div>
          </div>
        </div>
      )}

      {/* Suggested Routine Starters Matrix */}
      <div className="flex flex-col gap-space-md">
        <div className="flex items-center justify-between px-space-xs">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">
              auto_awesome
            </span>
            <span className="text-[14px] text-on-surface font-semibold">
              Recommended Starters
            </span>
          </div>
          <span className="text-[11px] text-secondary">
            Tap to quick-adopt a foundational discipline
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          {/* Starter 1 */}
          <div
            onClick={() =>
              quickAdopt(
                'Morning Sunlight Exposure',
                'Health',
                'Daily',
                '15 minutes of direct optical natural light upon waking.'
              )
            }
            className="group p-space-md rounded-xl bg-surface-container-lowest border border-outline-variant/15 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-space-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined text-[22px]">wb_sunny</span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-surface-container-high text-secondary font-medium">
                  Health
                </span>
              </div>
              <h3 className="text-[18px] text-on-surface font-semibold group-hover:text-primary transition-colors">
                Morning Sunlight
              </h3>
              <p className="text-[13px] text-secondary mt-1">
                15 minutes of direct optical natural light upon waking.
              </p>
            </div>
            <div className="mt-space-md pt-space-sm flex items-center justify-between text-[11px] text-secondary border-t border-outline-variant/10">
              <span>Daily · Morning</span>
              <span className="font-semibold text-primary inline-flex items-center gap-0.5">
                Use template
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </span>
            </div>
          </div>

          {/* Starter 2 */}
          <div
            onClick={() =>
              quickAdopt(
                'Deep Reading Hour',
                'Learning',
                'Daily',
                'Immerse in physical non-fiction without screen interruption.'
              )
            }
            className="group p-space-md rounded-xl bg-surface-container-lowest border border-outline-variant/15 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-space-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined text-[22px]">auto_stories</span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-surface-container-high text-secondary font-medium">
                  Learning
                </span>
              </div>
              <h3 className="text-[18px] text-on-surface font-semibold group-hover:text-primary transition-colors">
                Deep Reading
              </h3>
              <p className="text-[13px] text-secondary mt-1">
                Immerse in physical non-fiction without screen interruption.
              </p>
            </div>
            <div className="mt-space-md pt-space-sm flex items-center justify-between text-[11px] text-secondary border-t border-outline-variant/10">
              <span>Daily · Evening</span>
              <span className="font-semibold text-primary inline-flex items-center gap-0.5">
                Use template
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </span>
            </div>
          </div>

          {/* Starter 3 */}
          <div
            onClick={() =>
              quickAdopt(
                'Digital Sabbath',
                'Mindfulness',
                'Weekly',
                '24-hour conscious disconnection from algorithmic feeds.'
              )
            }
            className="group p-space-md rounded-xl bg-surface-container-lowest border border-outline-variant/15 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-space-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined text-[22px]">
                    phonelink_erase
                  </span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-surface-container-high text-secondary font-medium">
                  Mindfulness
                </span>
              </div>
              <h3 className="text-[18px] text-on-surface font-semibold group-hover:text-primary transition-colors">
                Digital Sabbath
              </h3>
              <p className="text-[13px] text-secondary mt-1">
                24-hour conscious disconnection from algorithmic feeds.
              </p>
            </div>
            <div className="mt-space-md pt-space-sm flex items-center justify-between text-[11px] text-secondary border-t border-outline-variant/10">
              <span>Weekly · Sunday</span>
              <span className="font-semibold text-primary inline-flex items-center gap-0.5">
                Use template
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Delete & Stats Modals */}
      <HabitDeleteModal
        isOpen={Boolean(deletingHabit)}
        onClose={() => setDeletingHabit(null)}
        habit={deletingHabit}
        onConfirm={deleteHabit}
      />

      <HabitStatsModal
        isOpen={Boolean(statsHabit)}
        onClose={() => setStatsHabit(null)}
        habit={statsHabit}
      />
    </div>
  );
}
