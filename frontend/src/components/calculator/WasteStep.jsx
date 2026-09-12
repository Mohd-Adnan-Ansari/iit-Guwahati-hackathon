import React from 'react';
import { Trash2, Recycle, Info } from 'lucide-react';

export default function WasteStep({ values, onChange, errors }) {
  const wasteKg = parseFloat(values.dailyWasteKg) || 0;
  const recyclingPct = parseFloat(values.recyclingPercentage) || 0;

  const baseMonthly = wasteKg * 0.5 * 30;
  const recyclingEffect = (recyclingPct / 100) * 0.7;
  const monthlyWasteCO2 = (baseMonthly * (1 - recyclingEffect)).toFixed(1);
  const avoidedCO2 = (baseMonthly * recyclingEffect).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Trash2 className="w-6 h-6 text-rose-500" />
          Waste Generation & Recycling
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Landfilled solid waste releases methane gas. Recycling diverts waste and directly lowers your footprint.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Daily Waste (kg) */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Daily Waste Generated (kg / day)
          </label>
          <div className="relative rounded-xl shadow-xs">
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={values.dailyWasteKg}
              onChange={(e) => onChange('dailyWasteKg', e.target.value)}
              className={`w-full bg-white border rounded-xl py-2.5 px-3.5 text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                errors.dailyWasteKg
                  ? 'border-red-400 focus:ring-red-400/20'
                  : 'border-slate-300 focus:border-emerald-600 focus:ring-emerald-600/20'
              }`}
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
              kg / day
            </span>
          </div>
          {errors.dailyWasteKg ? (
            <p className="text-xs text-red-500">{errors.dailyWasteKg}</p>
          ) : (
            <p className="text-[11px] text-slate-500">
              Average urban Indian student/individual generates ~1.0 – 2.5 kg of waste daily.
            </p>
          )}
        </div>

        {/* Recycling Percentage */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Recycling / Diversion Rate
            </label>
            <span className="text-sm font-black font-mono text-emerald-700">
              {recyclingPct}%
            </span>
          </div>
          <div className="pt-2">
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={values.recyclingPercentage}
              onChange={(e) => onChange('recyclingPercentage', e.target.value)}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-500">
            <span>0% (All Landfill)</span>
            <span>50%</span>
            <span>100% (Zero Waste)</span>
          </div>
          {errors.recyclingPercentage && (
            <p className="text-xs text-red-500">{errors.recyclingPercentage}</p>
          )}
        </div>
      </div>

      {/* Dynamic Impact Display Card */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3.5 w-full sm:w-auto">
          <div className="w-11 h-11 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
            <Trash2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Monthly Waste CO₂</span>
            <p className="text-2xl font-black text-slate-900 font-mono">
              {monthlyWasteCO2} <span className="text-xs text-slate-500 font-normal">kg CO₂/mo</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-6">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <Recycle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">CO₂ Avoided via Recycling</span>
            <p className="text-2xl font-black text-emerald-700 font-mono">
              -{avoidedCO2} <span className="text-xs text-slate-500 font-normal">kg CO₂/mo</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 leading-relaxed">
        <Info className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
        <p>
          Notice how sliding the recycling percentage from 20% to 60% immediately reduces net emissions. This illustrates the real mathematical leverage of waste segregation and composting.
        </p>
      </div>
    </div>
  );
}
