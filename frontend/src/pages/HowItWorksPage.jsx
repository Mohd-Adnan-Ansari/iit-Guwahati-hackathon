import React from 'react';
import {
  ArrowRight,
  Car,
  Zap,
  Utensils,
  Trash2,
  ShieldCheck,
} from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">
          Methodology & Mathematical Engine
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          How CarbonLens Works
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
          An open, transparent accounting framework connecting individual urban daily activities with scientifically modeled greenhouse gas emissions.
        </p>
      </div>

      {/* ─────────────────── CORE ARCHITECTURE PIPELINE ─────────────────── */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-slate-900 text-center">
          The 6-Stage Carbon Accounting Pipeline
        </h3>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-bold text-center">
          {[
            { label: 'INPUT', desc: 'Commuting, Power, Food, Waste' },
            { label: 'CALCULATION ENGINE', desc: 'Centralized Factors' },
            { label: 'CO₂ RESULT', desc: 'Normalized Metrics' },
            { label: 'DASHBOARD', desc: 'Category Breakdown' },
            { label: 'INSIGHTS', desc: 'Root Cause Detection' },
            { label: 'ACTION', desc: 'What-If Simulations' },
          ].map((s, idx, arr) => (
            <React.Fragment key={s.label}>
              <div className="p-3.5 px-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs">
                <span className="font-extrabold text-emerald-700 block text-xs">{s.label}</span>
                <span className="text-[10px] text-slate-500 font-medium">{s.desc}</span>
              </div>
              {idx < arr.length - 1 && (
                <ArrowRight className="w-4 h-4 text-slate-300 hidden sm:block" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ─────────────────── DETAILED CATEGORY METHODOLOGY ─────────────────── */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900">Category Methodologies</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Transport */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-3 text-blue-600">
              <Car className="w-6 h-6" />
              <h3 className="text-base font-bold text-slate-900">1. Transport & Commuting</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Calculated dynamically via daily commute distance multiplied by mode-specific carbon intensity factors and monthly commute days.
            </p>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] text-blue-800 font-semibold">
              Monthly CO₂ = Distance (km) × Factor (kg/km) × Commute Days
            </div>
            <p className="text-[11px] text-slate-500">
              * Walking and cycling produce zero direct operational tailpipe emissions.
            </p>
          </div>

          {/* Energy */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-3 text-amber-600">
              <Zap className="w-6 h-6" />
              <h3 className="text-base font-bold text-slate-900">2. Electricity & Energy</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Driven by monthly kilowatt-hour consumption multiplied by the regional grid carbon intensity baseline.
            </p>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] text-amber-800 font-semibold">
              Monthly CO₂ = kWh × Grid Emission Factor (kg CO₂/kWh)
            </div>
            <p className="text-[11px] text-slate-500">
              * Configured to integrate verified Central Electricity Authority (CEA) grid baseline databases for Indian regions.
            </p>
          </div>

          {/* Food */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-3 text-emerald-700">
              <Utensils className="w-6 h-6" />
              <h3 className="text-base font-bold text-slate-900">3. Dietary Footprint</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Models embodied lifecycle carbon from agricultural inputs, livestock ruminant emissions, and cold-chain transit.
            </p>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] text-emerald-800 font-semibold">
              Monthly CO₂ = Diet Baseline Profile (kg CO₂ / month)
            </div>
            <p className="text-[11px] text-slate-500">
              * Plant-based and lacto-vegetarian diets avoid high methane livestock supply chains.
            </p>
          </div>

          {/* Waste */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-3 text-rose-600">
              <Trash2 className="w-6 h-6" />
              <h3 className="text-base font-bold text-slate-900">4. Municipal Solid Waste</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Simulates methane release from unsegregated landfill decomposition, discounted by active recycling and diversion rates.
            </p>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] text-rose-800 font-semibold">
              Monthly CO₂ = (Waste kg/day × 0.5 × 30) × [1 - (Recycle % × 0.7)]
            </div>
            <p className="text-[11px] text-slate-500">
              * Higher recycling rates directly mitigate net landfill greenhouse gas generation.
            </p>
          </div>
        </div>
      </div>

      {/* ─────────────────── EMISSION FACTOR TRANSPARENCY SYSTEM ─────────────────── */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl space-y-6 border border-emerald-200 shadow-sm">
        <div className="flex items-center gap-3 text-emerald-700">
          <ShieldCheck className="w-6 h-6" />
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Centralized Emission Factor System & Transparency Notice
            </h3>
            <span className="text-xs text-slate-500">
              All factors are configurable and decoupled from application code.
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs text-slate-700 leading-relaxed space-y-2.5">
          <p className="font-bold text-emerald-900">
            ⚠️ Scientific Integrity Disclaimer:
          </p>
          <p>
            All emission factors present in this version are <strong className="text-slate-900">illustrative estimates for demonstration purposes</strong>. They are NOT official government certifications.
          </p>
          <p>
            Before real-world municipal or institutional deployment, these factors must be swapped with verified localized coefficients from:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-600 pl-2">
            <li><strong className="text-slate-800">Central Electricity Authority (CEA)</strong> — India CO₂ Baseline Database for Power Grids</li>
            <li><strong className="text-slate-800">FAO / IPCC</strong> — Regional dietary Life Cycle Assessment (LCA) tables</li>
            <li><strong className="text-slate-800">CPCB</strong> — Municipal Solid Waste emission averages for Indian urban local bodies</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
