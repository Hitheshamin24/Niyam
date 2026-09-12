import React from 'react';
import { HABIT_CATEGORIES } from '@/utils/constants';

export default function HabitFilter({
  selectedCategory,
  onSelectCategory,
  selectedFrequency,
  onSelectFrequency,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
        <button
          onClick={() => onSelectCategory('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All Categories
        </button>
        {HABIT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Frequency Toggle */}
      <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200/80 text-xs">
        {['all', 'daily', 'weekly'].map((freq) => (
          <button
            key={freq}
            onClick={() => onSelectFrequency(freq)}
            className={`px-3 py-1 rounded-lg font-medium capitalize transition-all cursor-pointer ${
              selectedFrequency === freq
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {freq === 'all' ? 'All Freq' : freq}
          </button>
        ))}
      </div>
    </div>
  );
}
