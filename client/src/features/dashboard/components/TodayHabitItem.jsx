import React from 'react';
import { Check } from 'lucide-react';
import { CATEGORY_COLORS } from '@/utils/constants';

export default function TodayHabitItem({ habit, onToggle }) {
  const isDone = Boolean(habit.completedToday);
  const categoryStyle = CATEGORY_COLORS[habit.category] || CATEGORY_COLORS.Other;

  return (
    <div
      onClick={() => onToggle(habit._id, isDone)}
      className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 cursor-pointer select-none ${
        isDone
          ? 'bg-emerald-50/50 border-emerald-200/80 shadow-xs'
          : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xs hover:bg-slate-50/50'
      }`}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        {/* Toggle Checkbox Button */}
        <button
          type="button"
          aria-label={isDone ? 'Mark habit as incomplete' : 'Mark habit as complete'}
          className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0 ${
            isDone
              ? 'bg-emerald-600 text-white shadow-xs scale-105'
              : 'border-2 border-slate-300 group-hover:border-emerald-500 text-transparent hover:scale-105'
          }`}
        >
          <Check className={`w-4 h-4 stroke-[3] transition-transform ${isDone ? 'scale-100' : 'scale-50'}`} />
        </button>

        {/* Icon & Color Badge */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 transition-transform group-hover:scale-105"
          style={{
            backgroundColor: `${habit.color}15`,
            border: `1px solid ${habit.color}30`,
          }}
        >
          <span>{habit.icon || '⭐'}</span>
        </div>

        {/* Habit Name & Details */}
        <div className="min-w-0">
          <h4
            className={`text-sm font-bold truncate transition-colors ${
              isDone ? 'line-through text-slate-400' : 'text-slate-900 group-hover:text-emerald-800'
            }`}
          >
            {habit.name}
          </h4>
          <div className="flex items-center gap-2 mt-0.5">
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${categoryStyle.bg}`}
            >
              {habit.category}
            </span>
            {habit.description && (
              <span className="text-[11px] text-slate-400 truncate max-w-[200px] hidden sm:inline">
                {habit.description}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Status indicator */}
      <div className="shrink-0 pl-3">
        {isDone ? (
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full border border-emerald-200">
            Done Today
          </span>
        ) : (
          <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-600">
            Tap to complete
          </span>
        )}
      </div>
    </div>
  );
}
