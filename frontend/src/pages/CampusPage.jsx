import React, { useState, useEffect } from 'react';
import api from '../services/api';
import DonutChart from '../charts/DonutChart';
import CategoryBarChart from '../charts/CategoryBarChart';
import TrendChart from '../charts/TrendChart';
import { formatCO2, formatNumber } from '../utils/formatters';
import {
  Building2,
  Users,
  Globe2,
  Info,
  TrendingDown,
  Sparkles,
  Layers,
} from 'lucide-react';

export default function CampusPage() {
  const [analytics, setAnalytics] = useState(null);
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/campus/analytics').catch(() => null),
      api.get('/campus/trends').catch(() => null),
    ])
      .then(([analyticsRes, trendsRes]) => {
        if (analyticsRes?.data) {
          setAnalytics(analyticsRes.data);
        }
        if (trendsRes?.data?.trends) {
          setTrends(trendsRes.data.trends);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const data = analytics || {
    totalParticipants: 1250,
    avgTotalEmissions: 285.5,
    avgTransportEmissions: 92.4,
    avgEnergyEmissions: 123.0,
    avgFoodEmissions: 95.0,
    avgWasteEmissions: 21.0,
    totalCampusEmissions: 356875.0,
    isIllustrative: true,
  };

  const donutData = [
    { name: 'Transport', value: data.avgTransportEmissions || 92.4, percentage: (data.avgTransportEmissions / data.avgTotalEmissions) * 100 },
    { name: 'Energy', value: data.avgEnergyEmissions || 123.0, percentage: (data.avgEnergyEmissions / data.avgTotalEmissions) * 100 },
    { name: 'Food', value: data.avgFoodEmissions || 95.0, percentage: (data.avgFoodEmissions / data.avgTotalEmissions) * 100 },
    { name: 'Waste', value: data.avgWasteEmissions || 21.0, percentage: (data.avgWasteEmissions / data.avgTotalEmissions) * 100 },
  ];

  const barData = [
    { name: 'Transport', value: data.avgTransportEmissions || 92.4 },
    { name: 'Energy', value: data.avgEnergyEmissions || 123.0 },
    { name: 'Food', value: data.avgFoodEmissions || 95.0 },
    { name: 'Waste', value: data.avgWasteEmissions || 21.0 },
  ];

  const trendChartData = (trends.length > 0 ? trends : [
    { period: 'Apr', total: 310.0 },
    { period: 'May', total: 302.0 },
    { period: 'Jun', total: 295.0 },
    { period: 'Jul', total: 290.0 },
    { period: 'Aug', total: 287.0 },
    { period: 'Sep', total: 285.5 },
  ]).map((t) => ({
    period: t.period,
    total: t.avgTotalEmissions || t.total || 0,
  }));

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Ambient background blob */}
      <div className="fixed top-16 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none -z-10"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.07) 0%, transparent 65%)', filter: 'blur(2px)' }} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">
            Institutional Decarbonization Intelligence
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Building2 className="w-8 h-8 text-emerald-600" />
            <span>Campus Analytics</span>
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Aggregated institutional benchmarks. Individual user data is strictly protected and never exposed.
          </p>
        </div>

        <div
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700"
          style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(12px)', border: '1px solid rgba(226,232,240,0.8)', boxShadow: 'var(--shadow-3d-xs)' }}
        >
          <Globe2 className="w-4 h-4 text-emerald-600" />
          <span>Campus: Main Campus</span>
        </div>
      </div>

      {/* Demo Data Badge */}
      <div
        className="p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900"
        style={{ background: 'rgba(255,251,235,0.90)', backdropFilter: 'blur(12px)', border: '1px solid rgba(252,211,77,0.4)', boxShadow: 'var(--shadow-3d-xs)' }}
      >
        <div className="flex items-center gap-2.5">
          <Info className="w-5 h-5 flex-shrink-0 text-amber-600" />
          <p>
            <strong>Illustrative Campus Data:</strong> These figures represent simulated metrics for AVINYA 2026 demonstration. They show the platform's ability to aggregate student footprints without compromising individual privacy.
          </p>
        </div>
        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 uppercase flex-shrink-0">
          Illustrative Data
        </span>
      </div>

      {/* TOP LEVEL CAMPUS METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className="p-6 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.90)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.75)', borderBottom: '1px solid rgba(0,0,0,0.05)', boxShadow: 'var(--shadow-3d-sm)', transition: 'transform 0.2s, box-shadow 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-hover)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-3d-sm)'; }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Total Participants</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-black text-slate-900 font-mono metric-3d">{formatNumber(data.totalParticipants)}</p>
          <span className="text-xs text-emerald-700 font-semibold mt-1 block">+12% adoption this month</span>
        </div>

        <div
          className="p-6 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.90)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.75)', borderBottom: '1px solid rgba(0,0,0,0.05)', boxShadow: 'var(--shadow-3d-sm)', transition: 'transform 0.2s, box-shadow 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-hover)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-3d-sm)'; }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Avg Footprint</span>
            <Building2 className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-3xl font-black text-slate-900 font-mono metric-3d">{formatCO2(data.avgTotalEmissions)}</p>
          <span className="text-xs text-slate-500 mt-1 block">kg CO₂ / user / month</span>
        </div>

        <div
          className="p-6 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.90)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.75)', borderBottom: '1px solid rgba(0,0,0,0.05)', boxShadow: 'var(--shadow-3d-sm)', transition: 'transform 0.2s, box-shadow 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-hover)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-3d-sm)'; }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Total Campus CO₂</span>
            <TrendingDown className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-black text-slate-900 font-mono metric-3d">{formatCO2(data.totalCampusEmissions / 1000)}</p>
          <span className="text-xs text-slate-500 mt-1 block">metric tonnes CO₂ / month</span>
        </div>

        <div
          className="p-6 rounded-2xl"
          style={{ background: 'linear-gradient(135deg, rgba(240,253,244,0.95), rgba(209,250,229,0.85))', backdropFilter: 'blur(16px)', border: '1px solid rgba(52,211,153,0.35)', boxShadow: 'var(--shadow-3d-sm), var(--glow-emerald-xs)', transition: 'transform 0.2s, box-shadow 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-hover), var(--glow-emerald-sm)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-3d-sm), var(--glow-emerald-xs)'; }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-emerald-800 uppercase font-bold tracking-wider">Campus Reduction</span>
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-black text-emerald-700 font-mono metric-3d">7.9%</p>
          <span className="text-xs text-emerald-800 font-semibold mt-1 block">Over past 6-month cycle</span>
        </div>
      </div>

      {/* VISUAL BREAKDOWN CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div
          className="p-6 sm:p-8 rounded-3xl space-y-4"
          style={{ background: 'rgba(255,255,255,0.90)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.75)', borderBottom: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow-3d-md)' }}
        >
          <h3 className="text-base font-bold text-slate-900">Campus Emission Weightings</h3>
          <p className="text-xs text-slate-500">Average breakdown per active student/community participant.</p>
          <div className="chart-glow"><DonutChart data={donutData} totalEmissions={data.avgTotalEmissions} /></div>
        </div>

        <div
          className="p-6 sm:p-8 rounded-3xl space-y-4"
          style={{ background: 'rgba(255,255,255,0.90)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.75)', borderBottom: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow-3d-md)' }}
        >
          <h3 className="text-base font-bold text-slate-900">Category Subtotals (Campus Avg)</h3>
          <p className="text-xs text-slate-500">Helps campus facility managers target key interventions.</p>
          <div className="chart-glow"><CategoryBarChart data={barData} /></div>
        </div>
      </div>

      {/* ─────────────────── CAMPUS TREND GRAPH ─────────────────── */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">6-Month Campus Decarbonization Trend</h3>
            <p className="text-xs text-slate-500">
              Average participant emissions decreasing as campus green challenges expand.
            </p>
          </div>
          <span className="text-xs text-emerald-700 font-mono font-bold">↓ 310.0 → 285.5 kg</span>
        </div>
        <TrendChart data={trendChartData} />
      </div>

      {/* ─────────────────── MULTI-CAMPUS EXPANSION ARCHITECTURE ─────────────────── */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 text-emerald-700">
          <Layers className="w-6 h-6" />
          <h3 className="text-lg font-bold text-slate-900">
            Multi-Campus & Global Scaling Architecture
          </h3>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
          CarbonLens is structured with a normalized hierarchical schema ready to scale from individual universities to nationwide networks and international campuses.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Layer 1</span>
            <p className="text-sm font-bold text-slate-900 mt-1">University</p>
            <span className="text-[11px] text-slate-500">e.g. Any University</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-2xs">
            <span className="text-[10px] text-emerald-700 uppercase font-bold">Layer 2</span>
            <p className="text-sm font-bold text-emerald-800 mt-1">Campus</p>
            <span className="text-[11px] text-emerald-700/80">Regional solar factors</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Layer 3</span>
            <p className="text-sm font-bold text-slate-900 mt-1">Users & Hostels</p>
            <span className="text-[11px] text-slate-500">Encrypted personal data</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-2xs">
            <span className="text-[10px] text-emerald-700 uppercase font-bold">Layer 4</span>
            <p className="text-sm font-bold text-emerald-800 mt-1">Aggregated Analytics</p>
            <span className="text-[11px] text-emerald-700/80">Privacy-safe reporting</span>
          </div>
        </div>
      </div>
    </div>
  );
}
