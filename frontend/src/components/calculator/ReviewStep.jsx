import React from 'react';
import { Car, Zap, Utensils, Trash2, Edit3, CheckCircle2, AlertCircle } from 'lucide-react';
import { formatCO2 } from '../../utils/formatters';

export default function ReviewStep({ values, setStep, isSubmitting, isDemo }) {
  const dist = parseFloat(values.dailyDistanceKm) || 0;
  const days = parseInt(values.travelDaysPerMonth) || 0;
  const factors = { car: 0.21, motorcycle: 0.11, bus: 0.05, train: 0.03, bicycle: 0, walking: 0, other: 0.15 };
  const estTransport = dist * (factors[values.transportMode] || 0.15) * days;
  const estEnergy = (parseFloat(values.monthlyElectricityKwh) || 0) * 0.82;
  // Use pre-computed quantity-based food CO₂ if available, else fall back to diet-type benchmarks
  const foodFactors = { regular: 150, vegetarian: 95, mostly_plant_based: 60, quantity_based: 0 };
  const estFood = values.foodEmissionsKgMonth !== undefined && values.foodEmissionsKgMonth !== null
    ? parseFloat(values.foodEmissionsKgMonth) || 0
    : (foodFactors[values.dietType] ?? 150);
  const wasteKg = parseFloat(values.dailyWasteKg) || 0;
  const recPct = parseFloat(values.recyclingPercentage) || 0;
  const estWaste = wasteKg * 0.5 * 30 * (1 - (recPct / 100) * 0.7);
  const totalEstimated = estTransport + estEnergy + estFood + estWaste;

  // Count non-zero food items for summary
  const FOOD_ITEM_KEYS = [
    'rice','roti_chapati','bread','oats',
    'potato','tomato','onion','other_vegetables',
    'dal','rajma','chana','other_legumes',
    'banana','apple','mango','other_fruits',
    'chicken','fish','mutton','other_meat',
    'egg','milk','curd_yogurt','paneer','cheese','butter','nuts','packaged_processed','other_food',
  ];
  const nonZeroFoodItems = FOOD_ITEM_KEYS.filter((key) => {
    const v = parseFloat(values[`food_${key}`]);
    return !isNaN(v) && v > 0;
  }).length;
  const isQuantityBased = values.dietType === 'quantity_based' ||
    (values.foodEmissionsKgMonth !== undefined && values.foodEmissionsKgMonth !== null);

  const reviewItems = [
    {
      step: 1,
      title: 'Transport',
      icon: Car,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      details: [
        { label: 'Mode', value: values.transportMode.toUpperCase() },
        { label: 'Daily Distance', value: `${values.dailyDistanceKm} km/day` },
        { label: 'Travel Days', value: `${values.travelDaysPerMonth} days/mo` },
      ],
      estimatedCO2: estTransport,
    },
    {
      step: 2,
      title: 'Energy',
      icon: Zap,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      details: [
        { label: 'Electricity Consumption', value: `${values.monthlyElectricityKwh} kWh/month` },
        { label: 'Grid Factor', value: '0.82 kg/kWh (Demo)' },
      ],
      estimatedCO2: estEnergy,
    },
    {
      step: 3,
      title: 'Food',
      icon: Utensils,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      details: isQuantityBased
        ? [
            { label: 'Method', value: 'Quantity-Based' },
            { label: 'Items Entered', value: `${nonZeroFoodItems} food items` },
            { label: 'Monthly CO₂', value: `${estFood.toFixed(2)} kg` },
          ]
        : [
            { label: 'Pattern', value: (values.dietType || 'regular').replace(/_/g, ' ').toUpperCase() },
            { label: 'Benchmark', value: 'IPCC / FAO Profile' },
          ],
      estimatedCO2: estFood,
    },
    {
      step: 4,
      title: 'Waste',
      icon: Trash2,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      details: [
        { label: 'Daily Waste', value: `${values.dailyWasteKg} kg/day` },
        { label: 'Recycling Rate', value: `${values.recyclingPercentage}%` },
      ],
      estimatedCO2: estWaste,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            Review Your Lifestyle Inputs
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Verify all details before calculating your comprehensive footprint and analytics.
          </p>
        </div>
        {isDemo && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            Demo Mode Active
          </span>
        )}
      </div>

      {/* Summary Total Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">
            Total Projected Monthly Footprint
          </span>
          <p className="text-3xl sm:text-4xl font-black text-white mt-1 font-mono">
            {formatCO2(totalEstimated)}{' '}
            <span className="text-sm font-medium text-emerald-100">kg CO₂ / month</span>
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <span className="text-xs text-emerald-100">Annualized Run Rate</span>
          <p className="text-base font-bold text-white font-mono">
            ~{formatCO2((totalEstimated * 12) / 1000)} tonnes/yr
          </p>
        </div>
      </div>

      {/* Grid of Step Summaries with Edit Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviewItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs relative"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl ${item.bg} ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(item.step)}
                  className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-emerald-700 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                {item.details.map((d, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className="text-slate-500">{d.label}:</span>
                    <span className="font-semibold text-slate-800">{d.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex justify-between items-center text-xs">
                <span className="text-slate-500">Subtotal CO₂:</span>
                <span className={`font-mono font-bold ${item.color}`}>
                  {formatCO2(item.estimatedCO2)} kg/mo
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Transparency Note */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
        <AlertCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
        <p>
          Submitting will execute the calculation engine, save your record to your secure timeline, evaluate unlocked badges, and generate your personalized reduction plan.
        </p>
      </div>
    </div>
  );
}
