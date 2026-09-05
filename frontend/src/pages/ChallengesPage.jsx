import React, { useState, useEffect } from 'react';
import ChallengeCard from '../components/ChallengeCard';
import api from '../services/api';
import { Trophy } from 'lucide-react';

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/challenges')
      .then((res) => {
        if (res.data.challenges && res.data.challenges.length > 0) {
          setChallenges(res.data.challenges);
        } else {
          setChallenges(getDefaultChallenges());
        }
      })
      .catch(() => {
        setChallenges(getDefaultChallenges());
      })
      .finally(() => setLoading(false));
  }, []);

  function getDefaultChallenges() {
    return [
      {
        id: 1,
        name: 'Cycle Week Challenge',
        description: 'Switch to cycling for your daily commute for one week. Track your reduced emissions and earn recognition!',
        category: 'transport',
        targetReductionKg: 500,
        status: 'active',
        participantCount: 320,
        progress: 68,
      },
      {
        id: 2,
        name: 'Public Transport Week',
        description: 'Use public transport instead of personal vehicles for a week. Every bus/train ride counts towards our campus goal.',
        category: 'transport',
        targetReductionKg: 750,
        status: 'active',
        participantCount: 450,
        progress: 74,
      },
      {
        id: 3,
        name: 'Energy Saving Challenge',
        description: 'Reduce electricity consumption by 15% this month. Switch off unused lab devices and optimize hostel air conditioning.',
        category: 'energy',
        targetReductionKg: 1000,
        status: 'active',
        participantCount: 280,
        progress: 52,
      },
      {
        id: 4,
        name: 'Zero Waste Challenge',
        description: 'Minimize single-use plastics and boost waste segregation for two weeks. Aim for an 80%+ diversion rate!',
        category: 'waste',
        targetReductionKg: 300,
        status: 'upcoming',
        participantCount: 150,
        progress: 25,
      },
      {
        id: 5,
        name: 'Plant-Based Week',
        description: 'Adopt vegetarian or plant-based meals in the campus cafeteria. Great food with a drastically lower carbon footprint.',
        category: 'food',
        targetReductionKg: 400,
        status: 'completed',
        participantCount: 512,
        progress: 100,
      },
    ];
  }

  const filtered = filter === 'all'
    ? challenges
    : challenges.filter((c) => c.status === filter || c.category === filter);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">
            Collective Campus Action
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Trophy className="w-8 h-8 text-amber-500" />
            <span>Campus Sustainability Challenges</span>
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Join collective student challenges to multiply your individual carbon reduction across the campus community.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {['all', 'active', 'transport', 'energy', 'waste', 'food'].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                filter === f
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Challenge Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((c) => (
          <ChallengeCard key={c.id} challenge={c} />
        ))}
      </div>
    </div>
  );
}
