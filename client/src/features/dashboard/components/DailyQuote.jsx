import React, { useMemo } from 'react';
import { Quote } from 'lucide-react';
import { MOTIVATIONAL_QUOTES } from '@/utils/constants';

export default function DailyQuote() {
  const quote = useMemo(() => {
    const dayOfYear = Math.floor(
      (new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
    );
    return MOTIVATIONAL_QUOTES[dayOfYear % MOTIVATIONAL_QUOTES.length];
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-start gap-3.5">
      <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 shrink-0">
        <Quote className="w-4 h-4" />
      </div>
      <div>
        <p className="text-xs italic text-slate-700 font-medium leading-relaxed">
          "{quote.text}"
        </p>
        <span className="block text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
          — {quote.author}
        </span>
      </div>
    </div>
  );
}
