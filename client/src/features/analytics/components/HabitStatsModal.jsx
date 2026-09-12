import React, { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import Spinner from '@/components/ui/Spinner';
import ProgressBar from '@/components/ui/ProgressBar';
import { Flame, Trophy, Calendar, CheckCircle2, Target } from 'lucide-react';
import { analyticsApi } from '../api/analyticsApi';

export default function HabitStatsModal({ isOpen, onClose, habit }) {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (habit && isOpen) {
      setIsLoading(true);
      analyticsApi
        .getHabitStats(habit._id)
        .then((res) => {
          if (res.success) {
            setStats(res.stats);
          }
        })
        .catch((err) => {
          console.error('Failed to load habit stats:', err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setStats(null);
    }
  }, [habit, isOpen]);

  if (!habit) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={habit.name}
      subtitle={`Statistics and streak insights for ${habit.category} habit`}
      maxWidth="max-w-md"
    >
      {isLoading ? (
        <div className="py-12 flex flex-col items-center justify-center">
          <Spinner size="lg" className="text-emerald-600 mb-2" />
          <p className="text-xs text-slate-400 font-medium">Calculating streak metrics...</p>
        </div>
      ) : stats ? (
        <div className="space-y-5">
          {/* Top Streak Tiles */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 text-center">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-2">
                <Flame className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                Current Streak
              </span>
              <span className="text-2xl font-black text-amber-950 mt-0.5 block">
                {stats.currentStreak} {stats.currentStreak === 1 ? 'day' : 'days'}
              </span>
            </div>

            <div className="bg-yellow-50/70 border border-yellow-200/80 rounded-2xl p-4 text-center">
              <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center mx-auto mb-2">
                <Trophy className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-[11px] font-bold text-yellow-800 uppercase tracking-wider block">
                Best Streak
              </span>
              <span className="text-2xl font-black text-yellow-950 mt-0.5 block">
                {stats.longestStreak} {stats.longestStreak === 1 ? 'day' : 'days'}
              </span>
            </div>
          </div>

          {/* Monthly Progress */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-bold text-slate-700">Monthly Goal Completion</span>
              <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[11px]">
                {stats.completedThisMonth} / {stats.goalPerMonth} days
              </span>
            </div>
            <ProgressBar
              value={stats.completedThisMonth}
              max={stats.goalPerMonth}
              showValue={false}
              color="bg-emerald-500"
            />
            <p className="text-[11px] text-slate-400 mt-2 text-right">
              {stats.progressPercent}% of target achieved this month
            </p>
          </div>

          {/* Details list */}
          <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
            <div className="flex justify-between py-1 text-slate-600">
              <span className="flex items-center gap-1.5 text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                All-time check-ins
              </span>
              <span className="font-bold text-slate-900">{stats.totalCompletions}</span>
            </div>
            <div className="flex justify-between py-1 text-slate-600">
              <span className="flex items-center gap-1.5 text-slate-500">
                <Calendar className="w-4 h-4 text-sky-600" />
                Frequency
              </span>
              <span className="font-bold text-slate-900 capitalize">{habit.frequency}</span>
            </div>
            <div className="flex justify-between py-1 text-slate-600">
              <span className="flex items-center gap-1.5 text-slate-500">
                <Target className="w-4 h-4 text-purple-600" />
                Monthly Target
              </span>
              <span className="font-bold text-slate-900">{stats.goalPerMonth} days/month</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-6 text-slate-500 text-xs">
          No stats available for this habit.
        </div>
      )}
    </Modal>
  );
}
