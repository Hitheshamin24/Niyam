import React from 'react';
import { Pencil, Trash2, Calendar, Target, Award } from 'lucide-react';
import { CATEGORY_COLORS } from '@/utils/constants';
import { formatWeekday } from '@/utils/dateUtils';
import Badge from '@/components/ui/Badge';

export default function HabitCard({
  habit,
  onEdit,
  onDelete,
  onViewStats,
}) {
  const categoryStyle = CATEGORY_COLORS[habit.category] || CATEGORY_COLORS.Other;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between group">
      <div>
        {/* Top bar: Icon, Name & Actions */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shadow-xs shrink-0"
              style={{
                backgroundColor: `${habit.color}18`,
                border: `1.5px solid ${habit.color}35`,
              }}
            >
              <span>{habit.icon || '⭐'}</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                {habit.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${categoryStyle.bg}`}
                >
                  {habit.category}
                </span>
                <span className="text-[11px] text-slate-400 capitalize font-medium">
                  {habit.frequency}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(habit)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Edit Habit"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(habit)}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              title="Delete Habit"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Description */}
        {habit.description && (
          <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">
            {habit.description}
          </p>
        )}

        {/* Weekly days pills (if weekly) */}
        {habit.frequency === 'weekly' && habit.weekdays && habit.weekdays.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {habit.weekdays.map((dayNum) => (
              <span
                key={dayNum}
                className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600"
              >
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayNum]}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer: Target goal & stats trigger */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-2">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Target className="w-3.5 h-3.5 text-emerald-600" />
          <span>Goal: {habit.goalPerMonth || 30} days/mo</span>
        </div>

        {onViewStats && (
          <button
            onClick={() => onViewStats(habit)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Stats</span>
          </button>
        )}
      </div>
    </div>
  );
}
