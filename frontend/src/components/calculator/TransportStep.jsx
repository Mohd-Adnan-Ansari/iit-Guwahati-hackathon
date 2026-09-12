import React from 'react';
import { Car, Bike, Bus, Train, Footprints, HelpCircle, Info } from 'lucide-react';
import { TRANSPORT_MODES } from '../../utils/validators';

const ICON_MAP = {
  Car: Car,
  Motorcycle: Bike,
  Bus: Bus,
  Train: Train,
  Bicycle: Bike,
  Walking: Footprints,
  Other: HelpCircle,
};

export default function TransportStep({ values, onChange, errors }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Car className="w-6 h-6 text-emerald-600" />
          Transport & Commuting
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Tell us how you commute to campus or travel on daily urban routines.
        </p>
      </div>

      {/* Mode Selection Grid */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          Primary Transport Mode
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TRANSPORT_MODES.map((mode) => {
            const isSelected = values.transportMode === mode.value;
            const IconComponent = ICON_MAP[mode.label] || HelpCircle;

            return (
              <button
                key={mode.value}
                type="button"
                onClick={() => onChange('transportMode', mode.value)}
                className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border transition-all duration-150 text-center ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-sm ring-2 ring-emerald-500/20 font-semibold'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-colors ${
                    isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold">{mode.label}</span>
                {mode.value === 'bicycle' || mode.value === 'walking' ? (
                  <span className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                    Zero Direct CO₂
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
        {errors.transportMode && (
          <p className="text-xs text-red-500 mt-1">{errors.transportMode}</p>
        )}
      </div>

      {/* Distance & Days Input Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Daily distance */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Daily Commute Distance (km / day)
          </label>
          <div className="relative rounded-xl shadow-xs">
            <input
              type="number"
              min="0"
              max="1000"
              step="0.5"
              value={values.dailyDistanceKm}
              onChange={(e) => onChange('dailyDistanceKm', e.target.value)}
              className={`w-full bg-white border rounded-xl py-2.5 px-3.5 text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                errors.dailyDistanceKm
                  ? 'border-red-400 focus:ring-red-400/20'
                  : 'border-slate-300 focus:border-emerald-600 focus:ring-emerald-600/20'
              }`}
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
              km
            </span>
          </div>
          {errors.dailyDistanceKm ? (
            <p className="text-xs text-red-500">{errors.dailyDistanceKm}</p>
          ) : (
            <p className="text-[11px] text-slate-500">
              Round-trip total distance traveled on a regular day.
            </p>
          )}
        </div>

        {/* Travel days per month */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Commute Days per Month
          </label>
          <div className="relative rounded-xl shadow-xs">
            <input
              type="number"
              min="0"
              max="31"
              value={values.travelDaysPerMonth}
              onChange={(e) => onChange('travelDaysPerMonth', e.target.value)}
              className={`w-full bg-white border rounded-xl py-2.5 px-3.5 text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                errors.travelDaysPerMonth
                  ? 'border-red-400 focus:ring-red-400/20'
                  : 'border-slate-300 focus:border-emerald-600 focus:ring-emerald-600/20'
              }`}
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
              days
            </span>
          </div>
          {errors.travelDaysPerMonth ? (
            <p className="text-xs text-red-500">{errors.travelDaysPerMonth}</p>
          ) : (
            <p className="text-[11px] text-slate-500">
              Typical college or work days in a month (usually 20–22 days).
            </p>
          )}
        </div>
      </div>

      {/* Illustrative notice */}
      <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 leading-relaxed">
        <Info className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
        <p>
          Transport emission factors are configured in the central engine (Car ~ 0.21 kg CO₂/km, Bus ~ 0.05 kg CO₂/km/pax). Walking and cycling are evaluated at 0 kg CO₂.
        </p>
      </div>
    </div>
  );
}
