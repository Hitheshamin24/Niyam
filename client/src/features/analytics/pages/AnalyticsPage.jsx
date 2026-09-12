import React, { useState } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';
import { useHabits } from '@/features/habits/hooks/useHabits';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import Spinner from '@/components/ui/Spinner';

const PIE_COLORS = [
  '#00652c', // primary emerald
  '#15803d', // container
  '#0284c7', // sky
  '#7c3aed', // purple
  '#f59e0b', // amber
  '#e11d48', // rose
  '#0d9488', // teal
  '#565e74', // secondary
];

export default function AnalyticsPage() {
  const {
    overview,
    statsList,
    habitProgressData,
    categoryData,
    isLoading,
  } = useAnalytics();
  const { openCreateModal } = useHabits();

  const [timePeriod, setTimePeriod] = useState('7d');

  if (isLoading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center">
        <Spinner size="lg" className="text-primary mb-3" />
        <p className="text-xs text-secondary font-medium">
          Gathering analytics & streak data...
        </p>
      </div>
    );
  }

  const hasData = habitProgressData && habitProgressData.length > 0;

  return (
    <div className="flex flex-col w-full gap-space-xl">
      {/* Header Banner & Ambient Horizon */}
      <section className="relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm p-space-xl flex flex-col md:flex-row md:items-center justify-between gap-space-md border border-outline-variant/15">
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="flex flex-col gap-space-xs relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-container-low text-primary w-fit">
            <span className="material-symbols-outlined text-[16px]">insights</span>
            <span className="text-[11px] uppercase tracking-wider font-semibold">
              Metrics Hub
            </span>
          </div>
          <h1 className="text-[32px] text-on-surface tracking-tight font-bold">
            Performance & Analytics
          </h1>
          <p className="text-[16px] text-on-surface-variant">
            Detailed breakdown of your consistency, active streaks, and goal targets.
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-space-sm self-start md:self-auto">
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container text-on-surface-variant text-[14px] shadow-sm">
            <span className="material-symbols-outlined text-primary text-[18px]">cloud_sync</span>
            <span>Auto-synced: Live</span>
          </div>
        </div>
      </section>

      {/* Top 4 Metric Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-lg">
        {/* Card 1: Current Streak */}
        <div className="group relative rounded-xl bg-surface-container-lowest p-space-lg shadow-sm transition-all duration-200 hover:shadow-md flex flex-col justify-between overflow-hidden border border-outline-variant/10">
          <div className="absolute top-0 left-0 h-1 w-full bg-surface-container">
            <div className="h-full bg-amber-500/80 w-0 group-hover:w-full transition-all duration-500" />
          </div>
          <div className="flex items-center justify-between mb-space-md">
            <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
              CURRENT STREAK
            </span>
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shadow-sm">
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-[44px] text-on-surface tracking-tight font-bold">
                {overview.maxCurrentStreak || 0}
              </span>
              <span className="text-[18px] text-on-surface-variant font-medium">days</span>
            </div>
            <div className="flex items-center gap-1.5 mt-space-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[14px]">cloud_upload</span>
              <span className="text-[13px]">
                {overview.bestHabit !== 'N/A' ? `Best: ${overview.bestHabit}` : 'Active streak'}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Longest Streak */}
        <div className="group relative rounded-xl bg-surface-container-lowest p-space-lg shadow-sm transition-all duration-200 hover:shadow-md flex flex-col justify-between overflow-hidden border border-outline-variant/10">
          <div className="absolute top-0 left-0 h-1 w-full bg-surface-container">
            <div className="h-full bg-yellow-500/80 w-0 group-hover:w-full transition-all duration-500" />
          </div>
          <div className="flex items-center justify-between mb-space-md">
            <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
              LONGEST STREAK
            </span>
            <div className="w-10 h-10 rounded-lg bg-yellow-50 text-yellow-600 flex items-center justify-center shadow-sm">
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                military_tech
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-[44px] text-on-surface tracking-tight font-bold">
                {overview.maxLongestStreak || 0}
              </span>
              <span className="text-[18px] text-on-surface-variant font-medium">days</span>
            </div>
            <div className="flex items-center gap-1.5 mt-space-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[14px]">award_star</span>
              <span className="text-[13px]">Personal record</span>
            </div>
          </div>
        </div>

        {/* Card 3: All-Time Completions */}
        <div className="group relative rounded-xl bg-surface-container-lowest p-space-lg shadow-sm transition-all duration-200 hover:shadow-md flex flex-col justify-between overflow-hidden border border-outline-variant/10">
          <div className="absolute top-0 left-0 h-1 w-full bg-surface-container">
            <div className="h-full bg-primary-container w-0 group-hover:w-full transition-all duration-500" />
          </div>
          <div className="flex items-center justify-between mb-space-md">
            <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
              ALL-TIME COMPLETIONS
            </span>
            <div className="w-10 h-10 rounded-lg bg-surface-container text-primary flex items-center justify-center shadow-sm">
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                task_alt
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-[44px] text-on-surface tracking-tight font-bold">
                {overview.totalCompletions || 0}
              </span>
              <span className="text-[14px] text-on-surface-variant font-normal">units</span>
            </div>
            <div className="flex items-center gap-1.5 mt-space-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[14px]">history</span>
              <span className="text-[13px]">Total check-ins logged</span>
            </div>
          </div>
        </div>

        {/* Card 4: Active Habits */}
        <div className="group relative rounded-xl bg-surface-container-lowest p-space-lg shadow-sm transition-all duration-200 hover:shadow-md flex flex-col justify-between overflow-hidden border border-outline-variant/10">
          <div className="absolute top-0 left-0 h-1 w-full bg-surface-container">
            <div className="h-full bg-secondary w-0 group-hover:w-full transition-all duration-500" />
          </div>
          <div className="flex items-center justify-between mb-space-md">
            <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
              ACTIVE HABITS
            </span>
            <div className="w-10 h-10 rounded-lg bg-secondary-container/40 text-secondary flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[20px]">adjust</span>
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-[44px] text-on-surface tracking-tight font-bold">
                {overview.totalHabits || 0}
              </span>
              <span className="text-[14px] text-on-surface-variant font-normal">rituals</span>
            </div>
            <div className="flex items-center gap-1.5 mt-space-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[14px]">track_changes</span>
              <span className="text-[13px]">Disciplines being built</span>
            </div>
          </div>
        </div>
      </section>

      {/* Middle Row: 2 Analytics Panels Side-by-Side */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Left Panel: Consistency Overview */}
        <div className="lg:col-span-7 flex flex-col rounded-xl bg-surface-container-lowest p-space-lg shadow-sm min-h-[380px] border border-outline-variant/10">
          <div className="flex flex-wrap items-center justify-between gap-space-sm mb-space-lg">
            <div className="flex flex-col">
              <h2 className="text-[18px] text-on-surface font-semibold">
                Consistency Overview
              </h2>
              <span className="text-[13px] text-on-surface-variant">
                Daily adherence & performance velocity
              </span>
            </div>
            {/* Time Filter Pills */}
            <div className="inline-flex p-1 rounded-lg bg-surface-container text-on-surface-variant">
              {['7d', '30d', '90d'].map((period) => (
                <button
                  key={period}
                  onClick={() => setTimePeriod(period)}
                  className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                    timePeriod === period
                      ? 'bg-surface-container-lowest text-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  type="button"
                >
                  {period.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Chart Display Area / Empty State */}
          {hasData ? (
            <div className="relative flex-1 rounded-xl bg-surface-container-low/40 p-space-md flex flex-col items-center justify-center min-h-[260px]">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={habitProgressData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.6} />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: '#565e74', fontSize: 11 }}
                    tickLine={false}
                    axisLine={{ stroke: '#cbd5e1' }}
                  />
                  <YAxis
                    tick={{ fill: '#565e74', fontSize: 11 }}
                    tickLine={false}
                    axisLine={{ stroke: '#cbd5e1' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0b1c30',
                      borderRadius: '0.5rem',
                      color: '#fff',
                      border: 'none',
                      fontSize: '12px',
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                    formatter={(val) => (
                      <span className="text-on-surface font-medium capitalize">{val}</span>
                    )}
                  />
                  <Bar
                    dataKey="completed"
                    name="Completed Days"
                    fill="#00652c"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={30}
                  />
                  <Bar
                    dataKey="goal"
                    name="Monthly Target"
                    fill="#dae2fd"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="relative flex-1 rounded-xl bg-surface-container-low/40 p-space-md flex flex-col items-center justify-center overflow-hidden min-h-[260px]">
              {/* Subtle Chart Grid Skeleton Lines */}
              <div className="absolute inset-0 px-6 py-8 flex flex-col justify-between pointer-events-none opacity-40">
                <div className="w-full h-px bg-surface-container-high border-dashed" />
                <div className="w-full h-px bg-surface-container-high" />
                <div className="w-full h-px bg-surface-container-high border-dashed" />
                <div className="w-full h-px bg-surface-container-high" />
                <div className="w-full h-px bg-surface-container-high border-dashed" />
              </div>
              <div className="absolute inset-0 px-10 py-6 flex justify-between pointer-events-none opacity-30">
                <div className="h-full w-px bg-surface-container-high" />
                <div className="h-full w-px bg-surface-container-high" />
                <div className="h-full w-px bg-surface-container-high" />
                <div className="h-full w-px bg-surface-container-high" />
                <div className="h-full w-px bg-surface-container-high" />
              </div>
              <svg
                className="absolute inset-x-0 bottom-6 w-full h-28 opacity-15 text-primary"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 400 100"
              >
                <path
                  d="M0 80 Q 100 75, 200 85 T 400 70"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="4 4"
                  strokeWidth="2"
                />
              </svg>
              <div className="relative z-10 flex flex-col items-center text-center max-w-sm px-space-md">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant mb-space-sm shadow-sm">
                  <span className="material-symbols-outlined text-[22px]">show_chart</span>
                </div>
                <p className="text-[18px] text-on-surface font-semibold">
                  No habit data available for chart visualization.
                </p>
                <p className="text-[13px] text-on-surface-variant mt-1">
                  Log completions to unlock trend analysis and daily cadence curves.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel: Category Distribution */}
        <div className="lg:col-span-5 flex flex-col rounded-xl bg-surface-container-lowest p-space-lg shadow-sm min-h-[380px] border border-outline-variant/10">
          <div className="flex items-center justify-between mb-space-lg">
            <div className="flex flex-col">
              <h2 className="text-[18px] text-on-surface font-semibold">
                Category Distribution
              </h2>
              <span className="text-[13px] text-on-surface-variant">
                Focus balance across domains
              </span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px]">pie_chart</span>
            </div>
          </div>

          {categoryData && categoryData.length > 0 ? (
            <div className="relative flex-1 rounded-xl bg-surface-container-low/40 p-space-md flex flex-col items-center justify-center min-h-[260px]">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                        stroke="transparent"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val, name) => [`${val} habits`, name]}
                    contentStyle={{
                      backgroundColor: '#0b1c30',
                      borderRadius: '0.5rem',
                      color: '#fff',
                      fontSize: '12px',
                      border: 'none',
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                    formatter={(val) => (
                      <span className="text-on-surface font-medium capitalize">{val}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="relative flex-1 rounded-xl bg-surface-container-low/40 p-space-md flex flex-col items-center justify-center overflow-hidden min-h-[260px]">
              <div className="relative w-44 h-44 flex items-center justify-center mb-space-sm">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    className="text-surface-container-high"
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="38"
                    stroke="currentColor"
                    strokeWidth="8"
                  />
                  <circle
                    className="text-primary/20"
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="38"
                    stroke="currentColor"
                    strokeDasharray="10 8"
                    strokeWidth="8"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="material-symbols-outlined text-outline-variant text-[28px]">
                    donut_large
                  </span>
                  <span className="text-[11px] text-on-surface-variant font-medium mt-1">
                    0%
                  </span>
                </div>
              </div>
              <div className="relative z-10 flex flex-col items-center text-center max-w-xs">
                <p className="text-[14px] font-semibold text-on-surface">
                  No category distribution data available.
                </p>
                <p className="text-[13px] text-on-surface-variant mt-1">
                  Categorized habits will appear here once configured.
                </p>
              </div>
              <div className="flex items-center justify-center gap-space-md mt-space-md pt-space-sm">
                <div className="inline-flex items-center gap-1.5 opacity-40">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="text-[11px] text-on-surface-variant font-medium">Health</span>
                </div>
                <div className="inline-flex items-center gap-1.5 opacity-40">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                  <span className="text-[11px] text-on-surface-variant font-medium">Mind</span>
                </div>
                <div className="inline-flex items-center gap-1.5 opacity-40">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-[11px] text-on-surface-variant font-medium">Focus</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bottom Full-Width Section: Habit Consistency Breakdown */}
      <section className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col border border-outline-variant/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-lg">
          <div className="flex flex-col">
            <h2 className="text-[18px] text-on-surface font-semibold">
              Habit Consistency Breakdown
            </h2>
            <p className="text-[13px] text-on-surface-variant">
              Individual streak records and month completion rates.
            </p>
          </div>
          <div className="flex items-center gap-space-xs self-start sm:self-auto">
            <span className="text-[11px] uppercase tracking-wider text-on-surface-variant px-2.5 py-1 rounded-full bg-surface-container-low font-semibold">
              {statsList.length} Total Habits
            </span>
          </div>
        </div>

        {/* Table Container */}
        <div className="w-full overflow-x-auto rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold rounded-l-lg">Habit</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Frequency</th>
                <th className="py-3 px-4 font-semibold">Streak</th>
                <th className="py-3 px-4 font-semibold">Completion Rate</th>
                <th className="py-3 px-4 font-semibold text-right rounded-r-lg">Status</th>
              </tr>
            </thead>
            <tbody>
              {statsList.length > 0 ? (
                statsList.map(({ habit, stats }) => (
                  <tr
                    key={habit._id}
                    className="border-b border-outline-variant/10 hover:bg-surface-container-low/50 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-semibold text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[20px]">
                        {habit.icon || 'eco'}
                      </span>
                      <span>{habit.name}</span>
                    </td>
                    <td className="py-3.5 px-4 text-on-surface-variant text-[13px]">
                      <span className="px-2 py-0.5 rounded-full bg-surface-container text-secondary text-[11px] font-medium">
                        {habit.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-on-surface-variant text-[13px] capitalize">
                      {habit.frequency}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-amber-600 text-[13px]">
                      🔥 {stats?.currentStreak || 0} d
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2 max-w-[160px]">
                        <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-primary h-full rounded-full transition-all duration-500"
                            style={{ width: `${stats?.progressPercent || 0}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-secondary font-medium">
                          {stats?.progressPercent || 0}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center gap-1 text-primary text-[11px] font-semibold bg-primary/10 px-2 py-0.5 rounded-full">
                        <span className="material-symbols-outlined text-[14px]">verified</span>
                        <span>Active</span>
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                /* Empty State Row */
                <tr>
                  <td className="py-16 px-4" colSpan={6}>
                    <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
                      <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant mb-space-md shadow-sm">
                        <span className="material-symbols-outlined text-[26px]">inbox</span>
                      </div>
                      <h3 className="text-[18px] text-on-surface font-semibold">
                        No habits recorded
                      </h3>
                      <p className="text-[13px] text-on-surface-variant mt-1.5 leading-relaxed">
                        No active habits found to display in the consistency breakdown.
                      </p>
                      <div className="mt-space-lg flex items-center gap-space-sm">
                        <button
                          onClick={openCreateModal}
                          className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-[14px] font-medium transition-all shadow-sm active:scale-[0.98] cursor-pointer"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">add_circle</span>
                          <span>Create Your First Habit</span>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Subtle Table Metadata Footer */}
        <div className="mt-space-md pt-space-sm flex flex-wrap items-center justify-between gap-space-sm text-on-surface-variant text-[13px]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
            <span>Metrics calculate dynamically every 24 hours</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px]">Displaying page 1 of 1</span>
          </div>
        </div>
      </section>
    </div>
  );
}
