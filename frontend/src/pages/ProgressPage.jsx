import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';
import TrendChart from '../charts/TrendChart';
import { formatCO2, getTrendIcon, getTrendColor, getTrendLabel } from '../utils/formatters';
import { Calendar, History } from 'lucide-react';

export default function ProgressPage() {
  const { isAuthenticated } = useAuth();
  const [history, setHistory] = useState([]);
  const [trend, setTrend] = useState('stable');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      api.get('/calculations/history')
        .then((res) => {
          setHistory(res.data.history || []);
          setTrend(res.data.trend || 'stable');
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      const demoHistory = [
        {
          id: 'hist-1',
          created_at: '2026-01-15T10:00:00Z',
          results: { totalEmissions: 320.0, transportEmissions: 138.6, energyEmissions: 123.0, foodEmissions: 150.0, wasteEmissions: 21.0 }
        },
        {
          id: 'hist-2',
          created_at: '2026-02-14T10:00:00Z',
          results: { totalEmissions: 305.0, transportEmissions: 120.0, energyEmissions: 110.0, foodEmissions: 150.0, wasteEmissions: 20.0 }
        },
        {
          id: 'hist-3',
          created_at: '2026-03-01T10:00:00Z',
          results: { totalEmissions: 285.0, transportEmissions: 95.0, energyEmissions: 105.0, foodEmissions: 95.0, wasteEmissions: 15.0 }
        },
      ];
      setHistory(demoHistory);
      setTrend('decreasing');
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const chartData = [...history].reverse().map((h) => ({
    period: new Date(h.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    total: h.results?.totalEmissions || h.total_emissions || 0,
  }));

  const latest = history[0];
  const previous = history[1];
  const latestTotal = latest?.results?.totalEmissions || latest?.total_emissions || 0;
  const prevTotal = previous?.results?.totalEmissions || previous?.total_emissions || 0;
  const diff = prevTotal > 0 ? parseFloat((prevTotal - latestTotal).toFixed(1)) : 0;
  const diffPct = prevTotal > 0 ? parseFloat(((diff / prevTotal) * 100).toFixed(1)) : 0;

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">
            Trajectory & Milestones
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <History className="w-7 h-7 text-emerald-600" />
            <span>Progress Tracking</span>
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Monitor historical calculations, track overall reductions, and verify your habit transformations.
          </p>
        </div>

        {/* Trajectory Status */}
        <div className="flex items-center gap-3 p-3 px-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className={`text-2xl font-bold ${getTrendColor(trend)}`}>
            {getTrendIcon(trend)}
          </span>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
              Trajectory Status
            </span>
            <span className={`text-sm font-bold ${getTrendColor(trend)}`}>
              {getTrendLabel(trend)}
            </span>
          </div>
        </div>
      </div>

      {!isAuthenticated && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
          <span>
            Showing illustrative historical records for demonstration. <Link to="/register" className="underline font-bold text-emerald-700">Sign up</Link> to preserve your personal timeline across sessions.
          </span>
        </div>
      )}

      {/* ─────────────────── TOP STATS CARDS ─────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Current Footprint</span>
          <p className="text-3xl font-black text-slate-900 font-mono mt-1">
            {formatCO2(latestTotal)} <span className="text-xs font-normal text-slate-500">kg CO₂</span>
          </p>
          <span className="text-xs text-slate-500 mt-1 block">Latest logged assessment</span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Previous Footprint</span>
          <p className="text-3xl font-black text-slate-700 font-mono mt-1">
            {formatCO2(prevTotal)} <span className="text-xs font-normal text-slate-500">kg CO₂</span>
          </p>
          <span className="text-xs text-slate-500 mt-1 block">Prior recorded baseline</span>
        </div>

        <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-300 shadow-xs">
          <span className="text-xs text-emerald-800 uppercase font-bold tracking-wider">Progress Achieved</span>
          <p className="text-3xl font-black text-emerald-700 font-mono mt-1">
            {diff > 0 ? `-${formatCO2(diff)} kg` : diff < 0 ? `+${formatCO2(Math.abs(diff))} kg` : '0 kg'}
          </p>
          <span className="text-xs text-emerald-800 font-semibold mt-1 block">
            {diff > 0 ? `${diffPct}% reduction vs previous` : 'Stable performance'}
          </span>
        </div>
      </div>

      {/* ─────────────────── HISTORICAL TREND GRAPH ─────────────────── */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Historical Emission Trajectory</h3>
          <span className="text-xs text-slate-500 font-mono">{history.length} Calculations</span>
        </div>
        <TrendChart data={chartData} />
      </div>

      {/* ─────────────────── HISTORICAL RECORDS LOG ─────────────────── */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">Calculation History Log</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 uppercase text-[10px] tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-3">Transit</th>
                <th className="py-3 px-3">Energy</th>
                <th className="py-3 px-3">Food</th>
                <th className="py-3 px-3">Waste</th>
                <th className="py-3 px-4 text-right font-bold text-emerald-700">Total Monthly CO₂</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {history.map((h, idx) => {
                const res = h.results || h;
                const d = new Date(h.created_at);
                const isLatest = idx === 0;

                return (
                  <tr key={h.id || idx} className={`hover:bg-slate-50 transition-colors ${isLatest ? 'bg-emerald-50/40 font-semibold' : ''}`}>
                    <td className="py-3.5 px-4 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-slate-900 font-semibold">
                        {d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                      {isLatest && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                          Latest
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-slate-600">{formatCO2(res.transportEmissions)} kg</td>
                    <td className="py-3.5 px-3 font-mono text-slate-600">{formatCO2(res.energyEmissions)} kg</td>
                    <td className="py-3.5 px-3 font-mono text-slate-600">{formatCO2(res.foodEmissions)} kg</td>
                    <td className="py-3.5 px-3 font-mono text-slate-600">{formatCO2(res.wasteEmissions)} kg</td>
                    <td className="py-3.5 px-4 text-right font-mono font-black text-slate-900 text-sm">
                      {formatCO2(res.totalEmissions)} <span className="text-[10px] text-slate-400 font-normal">kg</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
