import React from 'react';
import { Flame, Trophy, CheckCircle2, Target } from 'lucide-react';

export default function StreakStatsCard({ overview }) {
  const cards = [
    {
      title: 'Current Streak',
      value: `${overview.maxCurrentStreak || 0} days`,
      subtitle: overview.bestHabit !== 'N/A' ? `Best: ${overview.bestHabit}` : 'Active streak',
      icon: Flame,
      color: 'text-amber-500 bg-amber-50 border-amber-200/80',
    },
    {
      title: 'Longest Streak',
      value: `${overview.maxLongestStreak || 0} days`,
      subtitle: 'Personal record',
      icon: Trophy,
      color: 'text-yellow-600 bg-yellow-50 border-yellow-200/80',
    },
    {
      title: 'All-Time Completions',
      value: `${overview.totalCompletions || 0}`,
      subtitle: 'Total check-ins logged',
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200/80',
    },
    {
      title: 'Active Habits',
      value: `${overview.totalHabits || 0}`,
      subtitle: 'Disciplines being built',
      icon: Target,
      color: 'text-sky-600 bg-sky-50 border-sky-200/80',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center gap-4"
          >
            <div
              className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-xl shrink-0 ${card.color}`}
            >
              <Icon className="w-6 h-6 stroke-[2]" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block truncate">
                {card.title}
              </span>
              <h3 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
                {card.value}
              </h3>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">
                {card.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
