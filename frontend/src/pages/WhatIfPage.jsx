import React, { useState, useEffect } from 'react';
import ComparisonChart from '../charts/ComparisonChart';
import { formatCO2 } from '../utils/formatters';
import { TRANSPORT_MODES, DIET_TYPES } from '../utils/validators';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import {
  BookmarkPlus,
  Trophy,
  Trash2,
  Car,
  Zap,
  Utensils,
  Sliders,
  TrendingDown,
  Recycle,
  Check,
} from 'lucide-react';

function simulateCalculation(inputs) {
  const dist = Math.max(0, parseFloat(inputs.dailyDistanceKm) || 0);
  const days = Math.max(0, Math.min(31, parseInt(inputs.travelDaysPerMonth) || 0));
  const factors = { car: 0.21, motorcycle: 0.11, bus: 0.05, train: 0.03, bicycle: 0, walking: 0, other: 0.15 };
  const transportFactor = factors[inputs.transportMode] !== undefined ? factors[inputs.transportMode] : 0.15;
  const transportEmissions = parseFloat((dist * transportFactor * days).toFixed(2));

  const kwh = Math.max(0, parseFloat(inputs.monthlyElectricityKwh) || 0);
  const energyEmissions = parseFloat((kwh * 0.82).toFixed(2));

  const foodFactors = { regular: 150, vegetarian: 95, mostly_plant_based: 60 };
  const foodEmissions = parseFloat((foodFactors[inputs.dietType] || 150).toFixed(2));

  const wasteKg = Math.max(0, parseFloat(inputs.dailyWasteKg) || 0);
  const recPct = Math.max(0, Math.min(100, parseFloat(inputs.recyclingPercentage) || 0));
  const baseWaste = wasteKg * 0.5 * 30;
  const wasteEmissions = parseFloat((baseWaste * (1 - (recPct / 100) * 0.7)).toFixed(2));

  const totalEmissions = parseFloat((transportEmissions + energyEmissions + foodEmissions + wasteEmissions).toFixed(2));

  return {
    totalEmissions,
    transportEmissions,
    energyEmissions,
    foodEmissions,
    wasteEmissions,
  };
}

export default function WhatIfPage() {
  const { isAuthenticated } = useAuth();

  const [beforeInputs] = useState({
    dailyDistanceKm: 20,
    transportMode: 'car',
    travelDaysPerMonth: 22,
    monthlyElectricityKwh: 150,
    dietType: 'regular',
    dailyWasteKg: 2,
    recyclingPercentage: 60,
  });

  const [afterInputs, setAfterInputs] = useState({
    dailyDistanceKm: 20,
    transportMode: 'bus',
    travelDaysPerMonth: 22,
    monthlyElectricityKwh: 120,
    dietType: 'vegetarian',
    dailyWasteKg: 1.5,
    recyclingPercentage: 80,
  });

  const [savedScenarios, setSavedScenarios] = useState([]);
  const [scenarioName, setScenarioName] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      api.get('/scenarios')
        .then((res) => {
          if (res.data.scenarios && res.data.scenarios.length > 0) {
            setSavedScenarios(res.data.scenarios);
          }
        })
        .catch(() => {});
    }

    const defaultScenarios = [
      {
        id: 'default-1',
        name: 'Public Transit Shift',
        inputs: { transportMode: 'bus', dailyDistanceKm: 20, travelDaysPerMonth: 22, monthlyElectricityKwh: 150, dietType: 'regular', dailyWasteKg: 2, recyclingPercentage: 60 },
        results: simulateCalculation({ transportMode: 'bus', dailyDistanceKm: 20, travelDaysPerMonth: 22, monthlyElectricityKwh: 150, dietType: 'regular', dailyWasteKg: 2, recyclingPercentage: 60 })
      },
      {
        id: 'default-2',
        name: 'Eco Campus Champion',
        inputs: { transportMode: 'bicycle', dailyDistanceKm: 20, travelDaysPerMonth: 22, monthlyElectricityKwh: 100, dietType: 'mostly_plant_based', dailyWasteKg: 1, recyclingPercentage: 90 },
        results: simulateCalculation({ transportMode: 'bicycle', dailyDistanceKm: 20, travelDaysPerMonth: 22, monthlyElectricityKwh: 100, dietType: 'mostly_plant_based', dailyWasteKg: 1, recyclingPercentage: 90 })
      },
    ];

    setSavedScenarios((prev) => (prev.length === 0 ? defaultScenarios : prev));
  }, [isAuthenticated]);

  const beforeResults = simulateCalculation(beforeInputs);
  const afterResults = simulateCalculation(afterInputs);

  const reductionAmount = Math.max(0, parseFloat((beforeResults.totalEmissions - afterResults.totalEmissions).toFixed(2)));
  const reductionPercentage = beforeResults.totalEmissions > 0
    ? parseFloat(((reductionAmount / beforeResults.totalEmissions) * 100).toFixed(1))
    : 0;

  const handleAfterChange = (field, value) => {
    setAfterInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveScenario = async () => {
    const name = scenarioName.trim() || `Simulation ${savedScenarios.length + 1}`;
    const newScenario = {
      id: `local-${Date.now()}`,
      name,
      inputs: afterInputs,
      results: afterResults,
    };

    if (isAuthenticated) {
      try {
        const res = await api.post('/scenarios', {
          name,
          inputs: afterInputs,
        });
        setSavedScenarios((prev) => [res.data.scenario, ...prev]);
      } catch {
        setSavedScenarios((prev) => [newScenario, ...prev]);
      }
    } else {
      setSavedScenarios((prev) => [newScenario, ...prev]);
    }

    setScenarioName('');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDeleteScenario = (id) => {
    setSavedScenarios((prev) => prev.filter((s) => s.id !== id));
    if (isAuthenticated && typeof id === 'number') {
      api.delete(`/scenarios/${id}`).catch(() => {});
    }
  };

  const bestScenario = savedScenarios.length > 0
    ? savedScenarios.reduce((min, s) => {
        const total = s.results?.totalEmissions || s.total_emissions || 999999;
        const minTotal = min.results?.totalEmissions || min.total_emissions || 999999;
        return total < minTotal ? s : min;
      }, savedScenarios[0])
    : null;

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 relative">
      {/* Ambient background blob */}
      <div
        className="fixed top-16 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none -z-10"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.08) 0%, transparent 65%)', filter: 'blur(2px)' }}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">
            Lifestyle Intervention Sandbox
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Sliders className="w-8 h-8 text-emerald-600" />
            <span>WHAT-IF SIMULATOR</span>
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Experiment with lifestyle changes and see your predicted footprint reduction in real time.
          </p>
        </div>

        {/* Real-Time Reduction Pill */}
        <div
          className="flex items-center gap-3 p-3 px-5 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(240,253,244,0.95), rgba(209,250,229,0.90))',
            border: '1px solid rgba(52,211,153,0.4)',
            boxShadow: '0 4px 16px rgba(16,185,129,0.18), inset 0 1px 0 rgba(255,255,255,0.9)',
          }}
        >
          <TrendingDown className="w-6 h-6 text-emerald-700 animate-bounce" />
          <div>
            <span className="text-[10px] uppercase font-black tracking-wider text-emerald-800 block">
              Simulated Reduction
            </span>
            <span className="text-xl font-black text-emerald-700 font-mono metric-3d">
              -{formatCO2(reductionAmount)} kg ({reductionPercentage}%)
            </span>
          </div>
        </div>
      </div>

      {/* ─────────────────── BEFORE vs AFTER COMPARISON CARDS ─────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div
          className="p-6 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.90)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.75)',
            borderBottom: '1px solid rgba(0,0,0,0.05)',
            boxShadow: 'var(--shadow-3d-sm)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-hover)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-3d-sm)'; }}
        >
          <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">BEFORE</span>
          <p className="text-3xl font-black text-slate-900 font-mono mt-1 metric-3d">
            {formatCO2(beforeResults.totalEmissions)}
          </p>
          <span className="text-xs text-slate-500">kg CO₂ / month</span>
        </div>

        <div
          className="p-6 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(240,253,244,0.90), rgba(255,255,255,0.90))',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(52,211,153,0.35)',
            borderBottom: '1px solid rgba(4,120,87,0.10)',
            boxShadow: 'var(--shadow-3d-sm), var(--glow-emerald-xs)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-hover), var(--glow-emerald-sm)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-3d-sm), var(--glow-emerald-xs)'; }}
        >
          <span className="text-xs text-emerald-800 uppercase font-bold tracking-wider">AFTER (SIMULATED)</span>
          <p className="text-3xl font-black text-emerald-900 font-mono mt-1 metric-3d">
            {formatCO2(afterResults.totalEmissions)}
          </p>
          <span className="text-xs text-emerald-700">kg CO₂ / month</span>
        </div>

        <div
          className="p-6 rounded-2xl text-white"
          style={{
            background: 'linear-gradient(180deg, #10b981 0%, #059669 100%)',
            borderBottom: '3px solid #047857',
            boxShadow: '0 8px 24px rgba(16,185,129,0.35), 0 2px 4px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.25)',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <span className="text-xs text-emerald-100 uppercase font-bold tracking-wider">NET REDUCTION</span>
          <p className="text-3xl font-black text-white font-mono mt-1 metric-3d">
            -{formatCO2(reductionAmount)}
          </p>
          <span className="text-xs text-emerald-100">kg CO₂ saved / month</span>
        </div>

        <div
          className="p-6 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(240,253,250,0.95), rgba(204,251,241,0.85))',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(45,212,191,0.35)',
            borderBottom: '1px solid rgba(15,118,110,0.10)',
            boxShadow: 'var(--shadow-3d-sm)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-hover)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-3d-sm)'; }}
        >
          <span className="text-xs text-teal-800 uppercase font-bold tracking-wider">PERCENTAGE DROP</span>
          <p className="text-3xl font-black text-teal-800 font-mono mt-1 metric-3d">
            {reductionPercentage}%
          </p>
          <span className="text-xs text-teal-600">relative decrease</span>
        </div>
      </div>

      {/* ─────────────────── SIMULATOR CONTROLS ─────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sliders and Controls */}
        <div
          className="p-6 sm:p-8 rounded-3xl space-y-6"
          style={{
            background: 'rgba(255,255,255,0.90)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.75)',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
            boxShadow: 'var(--shadow-3d-md)',
          }}
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-emerald-600" />
              <span>Modify Lifestyle Variables</span>
            </h3>
            <span className="text-xs font-semibold text-emerald-800 badge-3d px-2.5 py-0.5 rounded-full">
              Live Recalculation
            </span>
          </div>

          {/* 1. Transport Mode */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Car className="w-4 h-4 text-emerald-600" />
              <span>Transport Mode</span>
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {TRANSPORT_MODES.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => handleAfterChange('transportMode', m.value)}
                  className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                    afterInputs.transportMode === m.value
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Commute Distance */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-slate-700">Daily Travel Distance</span>
              <span className="font-mono font-black text-emerald-700">{afterInputs.dailyDistanceKm} km/day</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={afterInputs.dailyDistanceKm}
              onChange={(e) => handleAfterChange('dailyDistanceKm', e.target.value)}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          {/* 3. Electricity */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Monthly Electricity</span>
              </span>
              <span className="font-mono font-black text-amber-600">{afterInputs.monthlyElectricityKwh} kWh</span>
            </div>
            <input
              type="range"
              min="20"
              max="500"
              step="5"
              value={afterInputs.monthlyElectricityKwh}
              onChange={(e) => handleAfterChange('monthlyElectricityKwh', e.target.value)}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* 4. Diet */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Utensils className="w-4 h-4 text-emerald-600" />
              <span>Dietary Mix</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {DIET_TYPES.map((d) => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => handleAfterChange('dietType', d.value)}
                  className={`p-2.5 rounded-xl text-xs font-bold border text-center transition-all ${
                    afterInputs.dietType === d.value
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {d.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Recycling Rate */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <Recycle className="w-4 h-4 text-emerald-600" />
                <span>Recycling Rate</span>
              </span>
              <span className="font-mono font-black text-emerald-700">{afterInputs.recyclingPercentage}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={afterInputs.recyclingPercentage}
              onChange={(e) => handleAfterChange('recyclingPercentage', e.target.value)}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          {/* Save Scenario Input */}
          <div className="pt-4 border-t border-slate-100 flex gap-2">
            <input
              type="text"
              placeholder="e.g. Scenario B — Cycling + 80% Recycling"
              value={scenarioName}
              onChange={(e) => setScenarioName(e.target.value)}
              className="flex-1 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 input-3d"
            />
            <button
              type="button"
              onClick={handleSaveScenario}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white btn-3d-primary flex items-center gap-1.5"
            >
              {saveSuccess ? <Check className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />}
              <span>{saveSuccess ? 'Saved!' : 'Save Scenario'}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Comparison Chart */}
        <div
          className="p-6 sm:p-8 rounded-3xl space-y-4 flex flex-col justify-between"
          style={{
            background: 'rgba(255,255,255,0.90)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.75)',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
            boxShadow: 'var(--shadow-3d-md)',
          }}
        >
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Category Comparison: Current vs Simulated
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Real calculated differences between your current habits and this simulated scenario.
            </p>
            <div className="chart-glow">
              <ComparisonChart before={beforeResults} after={afterResults} />
            </div>
          </div>

          {/* Category Delta breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-slate-100 text-center">
            {[
              { cat: 'Transport', diff: beforeResults.transportEmissions - afterResults.transportEmissions },
              { cat: 'Energy', diff: beforeResults.energyEmissions - afterResults.energyEmissions },
              { cat: 'Food', diff: beforeResults.foodEmissions - afterResults.foodEmissions },
              { cat: 'Waste', diff: beforeResults.wasteEmissions - afterResults.wasteEmissions },
            ].map((d) => (
              <div
                key={d.cat}
                className="p-2.5 rounded-xl"
                style={{
                  background: 'rgba(248,250,252,0.85)',
                  border: '1px solid rgba(226,232,240,0.8)',
                  boxShadow: 'var(--shadow-3d-xs)',
                }}
              >
                <span className="text-[10px] text-slate-500 block font-semibold">{d.cat}</span>
                <span className={`text-xs font-mono font-bold ${d.diff > 0 ? 'text-emerald-700' : d.diff < 0 ? 'text-rose-600' : 'text-slate-500'}`}>
                  {d.diff > 0 ? `-${formatCO2(d.diff)}` : d.diff < 0 ? `+${formatCO2(Math.abs(d.diff))}` : '0.0'} kg
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────────── SCENARIO COMPARISON TABLE ─────────────────── */}
      <div
        className="p-6 sm:p-8 rounded-3xl space-y-6"
        style={{
          background: 'rgba(255,255,255,0.90)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.75)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          boxShadow: 'var(--shadow-3d-md)',
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>Saved Scenario Comparison Matrix</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Compare multiple lifestyle setups side-by-side to choose your optimal decarbonization commitment.
            </p>
          </div>

          {bestScenario && (
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-3d text-xs text-emerald-900 font-semibold">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>
                <strong>Best Reduction Scenario:</strong> {bestScenario.name} (
                {formatCO2(bestScenario.results?.totalEmissions || bestScenario.total_emissions)} kg)
              </span>
            </div>
          )}
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 uppercase text-[10px] tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Scenario Name</th>
                <th className="py-3 px-3">Transit</th>
                <th className="py-3 px-3">Energy</th>
                <th className="py-3 px-3">Diet</th>
                <th className="py-3 px-3">Recycling</th>
                <th className="py-3 px-4 font-bold text-right text-emerald-700">Total CO₂</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {savedScenarios.map((sc) => {
                const isBest = bestScenario && bestScenario.id === sc.id;
                const scTotal = sc.results?.totalEmissions || sc.total_emissions || 0;
                const scInputs = sc.inputs || {};

                return (
                  <tr
                    key={sc.id}
                    className={`hover:bg-slate-50 transition-colors ${
                      isBest ? 'bg-emerald-50/40 font-semibold text-slate-900' : ''
                    }`}
                  >
                    <td className="py-3 px-4 flex items-center gap-2">
                      {isBest && <Trophy className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />}
                      <span className="text-slate-900 font-bold">{sc.name}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-600 capitalize">
                      {scInputs.transportMode || 'car'} ({scInputs.dailyDistanceKm || 20}km)
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      {scInputs.monthlyElectricityKwh || 150} kWh
                    </td>
                    <td className="py-3 px-3 text-slate-600 capitalize">
                      {(scInputs.dietType || 'regular').replace('_', ' ')}
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      {scInputs.recyclingPercentage || 60}%
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-black text-slate-900 text-sm metric-3d">
                      {formatCO2(scTotal)} <span className="text-[10px] text-slate-400 font-normal">kg</span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleDeleteScenario(sc.id)}
                        className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                        title="Delete Scenario"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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
