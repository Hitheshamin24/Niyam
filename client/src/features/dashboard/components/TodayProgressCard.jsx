import React from 'react';
import { Flame, CheckCircle, Clock } from 'lucide-react';
import ProgressBar from '@/components/ui/ProgressBar';

export default function TodayProgressCard({ summary }) {
  const { totalToday = 0, completedToday = 0, remaining = 0 } = summary;
  const percentage = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0;

  const getStatusMessage = () => {
    if (totalToday === 0) return 'No habits scheduled for today.';
    if (percentage === 100) return 'Incredible! You completed all habits today! 🎉';
    if (percentage >= 50) return 'Halfway through! Keep the momentum alive. 🔥';
    return 'Start your daily routine and build your streaks! 🚀';
  };

  return (
    <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute right-20 -top-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <span className="text-xs uppercase tracking-widest text-emerald-200 font-bold">
              Today's Progress
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-1 tracking-tight">
              {percentage}% Completed
            </h2>
            <p className="text-xs text-emerald-100/90 mt-1 font-medium">
              {getStatusMessage()}
            </p>
          </div>

          {/* Quick Pill Counter */}
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15 self-start sm:self-auto">
            <CheckCircle className="w-4 h-4 text-emerald-300" />
            <span className="text-sm font-bold tracking-tight">
              {completedToday} of {totalToday} Done
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-black/20 rounded-full h-3 overflow-hidden p-0.5 backdrop-blur-xs">
          <div
            className="h-full bg-gradient-to-r from-emerald-300 to-teal-200 rounded-full transition-all duration-700 ease-out shadow-sm"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Stats footer row */}
        <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-white/10 text-center">
          <div>
            <span className="block text-[11px] text-emerald-200 font-medium">Total</span>
            <span className="text-base font-bold text-white">{totalToday}</span>
          </div>
          <div>
            <span className="block text-[11px] text-emerald-200 font-medium">Completed</span>
            <span className="text-base font-bold text-emerald-300">{completedToday}</span>
          </div>
          <div>
            <span className="block text-[11px] text-emerald-200 font-medium">Remaining</span>
            <span className="text-base font-bold text-amber-200">{remaining}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
