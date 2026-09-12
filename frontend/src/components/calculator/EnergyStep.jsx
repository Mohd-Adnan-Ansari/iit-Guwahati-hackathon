import React from 'react';
import { Zap, ShieldAlert } from 'lucide-react';

export default function EnergyStep({ values, onChange, errors }) {
  const kwh = parseFloat(values.monthlyElectricityKwh) || 0;
  // Illustrative Indian grid emission factor: 0.82 kg CO2 / kWh
  const estimatedEnergyCO2 = (kwh * 0.82).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Zap className="w-6 h-6 text-amber-500" />
          Household & Campus Energy
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Electricity consumption is often a primary contributor to urban and campus footprints.
        </p>
      </div>

      {/* Electricity kWh Input */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          Monthly Electricity Consumption (kWh)
        </label>
        <div className="relative rounded-xl shadow-xs">
          <input
            type="number"
            min="0"
            max="100000"
            step="1"
            value={values.monthlyElectricityKwh}
            onChange={(e) => onChange('monthlyElectricityKwh', e.target.value)}
            className={`w-full bg-white border rounded-xl py-3 px-4 text-slate-900 text-lg font-bold focus:outline-none focus:ring-2 transition-all ${
              errors.monthlyElectricityKwh
                ? 'border-red-400 focus:ring-red-400/20'
                : 'border-slate-300 focus:border-amber-500 focus:ring-amber-500/20'
            }`}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
            kWh / month
          </span>
        </div>
        {errors.monthlyElectricityKwh ? (
          <p className="text-xs text-red-500">{errors.monthlyElectricityKwh}</p>
        ) : (
          <p className="text-[11px] text-slate-500">
            Check your latest electricity bill or hostel allocation statement (hostel room: ~80–150 kWh/mo; household: ~150–350 kWh/mo).
          </p>
        )}
      </div>

      {/* Dynamic preview card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/80 to-amber-100/40 border border-amber-200 flex items-center justify-between shadow-xs">
        <div>
          <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
            Estimated Monthly Energy CO₂
          </span>
          <p className="text-2xl font-black text-slate-900 mt-0.5 font-mono">
            {estimatedEnergyCO2} <span className="text-sm font-medium text-slate-600">kg CO₂</span>
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-300/60 flex items-center justify-center text-amber-600">
          <Zap className="w-6 h-6" />
        </div>
      </div>

      {/* Transparent Disclaimer Box */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
        <div className="flex items-center gap-2 text-amber-800 font-bold">
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <span>Emission Factor Transparency Notice</span>
        </div>
        <p className="text-slate-600 leading-relaxed">
          <strong className="text-slate-800">Illustrative Factor Used:</strong> 0.82 kg CO₂ / kWh (simulated average for demonstration).
          CarbonLens is architected to seamlessly query verified regional grid baseline datasets from the
          <span className="text-emerald-700 font-semibold"> Central Electricity Authority (CEA) of India</span> upon production deployment.
        </p>
      </div>
    </div>
  );
}
