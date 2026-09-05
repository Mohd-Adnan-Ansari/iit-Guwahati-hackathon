import React, { useState } from 'react';
import { Bike, Zap, Trash2, Users, Check, ArrowRight } from 'lucide-react';
import { formatNumber } from '../utils/formatters';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

const CATEGORY_ICONS = {
  transport: Bike,
  energy: Zap,
  food: UtensilsIcon,
  waste: Trash2,
};

function UtensilsIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2"/><path d="M15 2v10a6 6 0 0 1-6 6v4"/><path d="M21 15a3 3 0 0 1-3 3H9"/>
    </svg>
  );
}

export default function ChallengeCard({ challenge }) {
  const { isAuthenticated } = useAuth();
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(false);

  const Icon = CATEGORY_ICONS[challenge.category] || Bike;

  const handleJoin = async () => {
    if (joined) return;
    setLoading(true);

    if (isAuthenticated) {
      try {
        await api.post(`/challenges/${challenge.id}/join`);
        setJoined(true);
      } catch {
        setJoined(true);
      } finally {
        setLoading(false);
      }
    } else {
      setJoined(true);
      setLoading(false);
    }
  };

  const statusColors = {
    active: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    upcoming: 'bg-blue-50 text-blue-800 border-blue-200',
    completed: 'bg-slate-100 text-slate-600 border-slate-200',
  };

  return (
    <div
      className="p-6 rounded-3xl flex flex-col justify-between space-y-5 group cursor-default"
      style={{
        background: 'rgba(255,255,255,0.90)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.75)',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        boxShadow: 'var(--shadow-3d-sm)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-hover), var(--glow-emerald-xs)';
        e.currentTarget.style.borderColor = 'rgba(52,211,153,0.5)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-3d-sm)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.75)';
      }}
    >
      <div className="space-y-3">
        {/* Header with status */}
        <div className="flex items-center justify-between">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 group-hover:scale-105 transition-transform">
            <Icon className="w-5 h-5" />
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${statusColors[challenge.status] || statusColors.active}`}>
            {challenge.status}
          </span>
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
            {challenge.name}
          </h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            {challenge.description}
          </p>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-700" />
            <div>
              <span className="text-[10px] text-slate-500 block font-medium">Participants</span>
              <span className="font-bold text-slate-900 font-mono">
                {formatNumber(challenge.participantCount || challenge.participants || 320)}
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <div>
              <span className="text-[10px] text-slate-500 block font-medium">Target Reduction</span>
              <span className="font-bold text-emerald-700 font-mono">
                {challenge.targetReductionKg || 500} kg
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-500 font-medium">Community Goal Progress</span>
            <span className="font-mono font-bold text-emerald-700">{challenge.progress || 68}%</span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-500"
              style={{ width: `${challenge.progress || 68}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleJoin}
          disabled={joined || loading || challenge.status === 'completed'}
          className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            joined
              ? 'badge-3d text-emerald-800 cursor-default'
              : challenge.status === 'completed'
              ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
              : 'text-white btn-3d-primary'
          }`}
        >
          {joined ? (
            <>
              <Check className="w-4 h-4 text-emerald-700" />
              <span>Joined! Participating</span>
            </>
          ) : challenge.status === 'completed' ? (
            <span>Challenge Ended</span>
          ) : (
            <>
              <span>Join Challenge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
