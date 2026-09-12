import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 text-white px-3.5 py-2.5 rounded-xl shadow-lg text-xs space-y-1 border border-slate-700">
        <p className="font-bold text-white text-sm">{data.fullName || label}</p>
        <p className="text-emerald-400">
          Completed: <span className="font-semibold text-white">{data.completed} days</span>
        </p>
        <p className="text-slate-400">
          Monthly Goal: <span className="font-semibold text-white">{data.goal} days</span>
        </p>
        <p className="text-sky-300">
          Progress: <span className="font-semibold text-white">{data.percent}%</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function CompletionTrendChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 text-center text-slate-400 text-xs py-16">
        No habit data available for chart visualization.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
      <div className="mb-6">
        <h3 className="text-base font-bold text-slate-900">
          Monthly Habit Progress
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Days completed vs target goal for this calendar month.
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#64748b', fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis
              tick={{ fill: '#64748b', fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: 16, fontSize: 12 }}
              formatter={(value) => <span className="text-slate-700 font-medium capitalize">{value}</span>}
            />
            <Bar
              dataKey="completed"
              name="Completed Days"
              fill="#10b981"
              radius={[6, 6, 0, 0]}
              maxBarSize={32}
            />
            <Bar
              dataKey="goal"
              name="Monthly Target"
              fill="#e2e8f0"
              radius={[6, 6, 0, 0]}
              maxBarSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
