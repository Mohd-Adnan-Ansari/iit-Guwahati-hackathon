import React from 'react';
import {
  Calculator,
  TrendingUp,
  Award,
  ArrowDown,
  Star,
  Bike,
  Recycle,
  Leaf,
  Lock
} from 'lucide-react';

const BADGE_ICONS = {
  Calculator: Calculator,
  TrendingUp: TrendingUp,
  Award: Award,
  ArrowDown: ArrowDown,
  Star: Star,
  Bike: Bike,
  Recycle: Recycle,
  Leaf: Leaf,
};

export default function BadgeDisplay({ badges }) {
  const badgeList = badges || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          <span>Milestones & Eco-Badges</span>
        </h3>
        <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          {badgeList.filter((b) => b.earned).length} / {badgeList.length} Unlocked
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {badgeList.map((b) => {
          const Icon = BADGE_ICONS[b.icon] || Award;
          const isEarned = b.earned;

          return (
            <div
              key={b.name}
              className={`p-3.5 rounded-2xl border transition-all relative flex flex-col items-center text-center ${
                isEarned
                  ? 'bg-emerald-50/60 border-emerald-300 text-slate-900 shadow-2xs'
                  : 'bg-slate-50 border-slate-200 text-slate-400 opacity-70'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 shadow-xs ${
                  isEarned
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                {isEarned ? <Icon className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
              </div>
              <p className="text-xs font-bold truncate max-w-full text-slate-900">
                {b.name}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2">
                {b.description || b.criteria}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
