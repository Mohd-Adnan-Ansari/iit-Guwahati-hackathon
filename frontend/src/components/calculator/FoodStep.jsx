import React, { useEffect, useMemo } from 'react';
import {
  Utensils, Wheat, Leaf, Apple, Drumstick, Egg, ShieldAlert, ChevronRight,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Per-item emission factors (kg CO₂ per unit per day).
// Multiply factor × quantity × 30 = kg CO₂/month for that item.
// All values are illustrative estimates (same convention as backend).
// ─────────────────────────────────────────────────────────────────────────────
const FOOD_ITEM_FACTORS = {
  // Grains
  rice:                { factor: 0.0027,   unit: 'g/day',      label: 'Rice' },
  roti_chapati:        { factor: 0.050,    unit: 'pcs/day',    label: 'Roti / Chapati' },
  bread:               { factor: 0.0015,   unit: 'g/day',      label: 'Bread' },
  oats:                { factor: 0.0012,   unit: 'g/day',      label: 'Oats' },
  // Vegetables
  potato:              { factor: 0.00046,  unit: 'g/day',      label: 'Potato' },
  tomato:              { factor: 0.00060,  unit: 'g/day',      label: 'Tomato' },
  onion:               { factor: 0.00050,  unit: 'g/day',      label: 'Onion' },
  other_vegetables:    { factor: 0.00055,  unit: 'g/day',      label: 'Other Vegetables' },
  // Pulses
  dal:                 { factor: 0.0016,   unit: 'g/day',      label: 'Dal' },
  rajma:               { factor: 0.0018,   unit: 'g/day',      label: 'Rajma' },
  chana:               { factor: 0.0017,   unit: 'g/day',      label: 'Chana' },
  other_legumes:       { factor: 0.0016,   unit: 'g/day',      label: 'Other Legumes' },
  // Fruits
  banana:              { factor: 0.080,    unit: 'pcs/day',    label: 'Banana' },
  apple:               { factor: 0.090,    unit: 'pcs/day',    label: 'Apple' },
  mango:               { factor: 0.120,    unit: 'pcs/day',    label: 'Mango' },
  other_fruits:        { factor: 0.00070,  unit: 'g/day',      label: 'Other Fruits' },
  // Non-Veg
  chicken:             { factor: 0.0069,   unit: 'g/day',      label: 'Chicken' },
  fish:                { factor: 0.0050,   unit: 'g/day',      label: 'Fish' },
  mutton:              { factor: 0.0390,   unit: 'g/day',      label: 'Mutton' },
  other_meat:          { factor: 0.0150,   unit: 'g/day',      label: 'Other Meat' },
  // Other
  egg:                 { factor: 0.196,    unit: 'pcs/day',    label: 'Egg' },
  milk:                { factor: 0.00094,  unit: 'ml/day',     label: 'Milk' },
  curd_yogurt:         { factor: 0.00080,  unit: 'g/day',      label: 'Curd / Yogurt' },
  paneer:              { factor: 0.0040,   unit: 'g/day',      label: 'Paneer' },
  cheese:              { factor: 0.0138,   unit: 'g/day',      label: 'Cheese' },
  butter:              { factor: 0.0120,   unit: 'g/day',      label: 'Butter' },
  nuts:                { factor: 0.0028,   unit: 'g/day',      label: 'Nuts' },
  packaged_processed:  { factor: 0.0035,   unit: 'g/day',      label: 'Packaged / Processed Food' },
  other_food:          { factor: 0.0020,   unit: 'g/day',      label: 'Other Food' },
};

// ─────────────────────────────────────────────────────────────────────────────
// Category definitions — determines section grouping and styling
// ─────────────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    key: 'grains',
    label: 'Grains & Staples',
    Icon: Wheat,
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    ring: 'ring-amber-400/30',
    accent: 'bg-amber-100',
    items: ['rice', 'roti_chapati', 'bread', 'oats'],
  },
  {
    key: 'vegetables',
    label: 'Vegetables',
    Icon: Leaf,
    color: 'text-green-700',
    bg: 'bg-green-50',
    border: 'border-green-200',
    ring: 'ring-green-400/30',
    accent: 'bg-green-100',
    items: ['potato', 'tomato', 'onion', 'other_vegetables'],
  },
  {
    key: 'pulses',
    label: 'Pulses & Legumes',
    Icon: Utensils,
    color: 'text-lime-800',
    bg: 'bg-lime-50',
    border: 'border-lime-200',
    ring: 'ring-lime-400/30',
    accent: 'bg-lime-100',
    items: ['dal', 'rajma', 'chana', 'other_legumes'],
  },
  {
    key: 'fruits',
    label: 'Fruits',
    Icon: Apple,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    ring: 'ring-rose-400/30',
    accent: 'bg-rose-100',
    items: ['banana', 'apple', 'mango', 'other_fruits'],
  },
  {
    key: 'nonveg',
    label: 'Non-Vegetarian',
    Icon: Drumstick,
    color: 'text-orange-700',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    ring: 'ring-orange-400/30',
    accent: 'bg-orange-100',
    items: ['chicken', 'fish', 'mutton', 'other_meat'],
  },
  {
    key: 'other',
    label: 'Dairy, Eggs & Other',
    Icon: Egg,
    color: 'text-sky-700',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    ring: 'ring-sky-400/30',
    accent: 'bg-sky-100',
    items: ['egg', 'milk', 'curd_yogurt', 'paneer', 'cheese', 'butter', 'nuts', 'packaged_processed', 'other_food'],
  },
];

// Helper: compute monthly CO₂ for one item (factor × quantity × 30 days)
function itemMonthlyKg(itemKey, quantity) {
  const q = Math.max(0, parseFloat(quantity) || 0);
  const meta = FOOD_ITEM_FACTORS[itemKey];
  if (!meta) return 0;
  return meta.factor * q * 30;
}

// Helper: compute total food monthly CO₂ from all food values in formData
function computeTotalFoodCO2(values) {
  return Object.keys(FOOD_ITEM_FACTORS).reduce((sum, key) => {
    const fieldKey = `food_${key}`;
    return sum + itemMonthlyKg(key, values[fieldKey]);
  }, 0);
}

// ─────────────────────────────────────────────────────────────────────────────
// Single item input row
// ─────────────────────────────────────────────────────────────────────────────
function FoodItemRow({ itemKey, value, onChange, accent }) {
  const meta = FOOD_ITEM_FACTORS[itemKey];
  const co2 = itemMonthlyKg(itemKey, value);
  const fieldKey = `food_${itemKey}`;

  const handleChange = (e) => {
    const raw = e.target.value;
    // Allow empty string (blank = 0), reject negatives
    if (raw === '' || raw === null) {
      onChange(fieldKey, '');
      return;
    }
    const num = parseFloat(raw);
    if (!isNaN(num) && num >= 0) {
      onChange(fieldKey, raw);
    }
  };

  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-0 group">
      {/* Label */}
      <label
        htmlFor={`food-item-${itemKey}`}
        className="flex-1 text-sm text-slate-700 font-medium leading-snug cursor-pointer"
      >
        {meta.label}
      </label>

      {/* Input + unit badge */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <input
          id={`food-item-${itemKey}`}
          type="number"
          min="0"
          step={meta.unit.startsWith('pcs') || meta.unit.startsWith('pieces') ? '1' : '1'}
          value={value === undefined || value === null ? '' : value}
          onChange={handleChange}
          className="w-24 text-right px-3 py-1.5 text-sm font-mono rounded-lg border border-slate-200 bg-white
                     focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400
                     hover:border-slate-300 transition-colors"
        />
        <span className={`text-xs font-semibold px-2 py-1 rounded-md ${accent} text-slate-600 w-20 text-center flex-shrink-0`}>
          {meta.unit}
        </span>
      </div>

      {/* Per-item CO₂ badge */}
      <div className="w-24 text-right flex-shrink-0">
        {co2 > 0 ? (
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            {co2 < 0.1 ? co2.toFixed(3) : co2.toFixed(2)} kg
          </span>
        ) : (
          <span className="text-xs text-slate-300 font-mono">—</span>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Category section card
// ─────────────────────────────────────────────────────────────────────────────
function CategorySection({ category, values, onChange }) {
  const { Icon, label, color, bg, border, ring, accent, items } = category;

  const categoryTotal = items.reduce((sum, key) => sum + itemMonthlyKg(key, values[`food_${key}`]), 0);

  return (
    <div
      className={`rounded-2xl border ${border} overflow-hidden`}
      style={{ boxShadow: `0 2px 8px rgba(0,0,0,0.04)` }}
    >
      {/* Category Header */}
      <div className={`flex items-center justify-between px-5 py-3 ${bg}`}>
        <div className="flex items-center gap-2.5">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${bg} ${color} border ${border}`}>
            <Icon className="w-4 h-4" />
          </div>
          <span className={`text-sm font-bold ${color}`}>{label}</span>
        </div>
        {categoryTotal > 0 && (
          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full">
            {categoryTotal.toFixed(2)} kg CO₂/mo
          </span>
        )}
      </div>

      {/* Column header */}
      <div className="flex items-center gap-3 px-5 py-1.5 bg-slate-50 border-b border-slate-100">
        <span className="flex-1 text-xs font-bold uppercase tracking-wider text-slate-400">Item</span>
        <span className="w-24 text-right text-xs font-bold uppercase tracking-wider text-slate-400">Quantity</span>
        <span className="w-20 text-center text-xs font-bold uppercase tracking-wider text-slate-400">Unit</span>
        <span className="w-24 text-right text-xs font-bold uppercase tracking-wider text-slate-400">CO₂/month</span>
      </div>

      {/* Items */}
      <div className="px-5 pb-1 bg-white">
        {items.map((itemKey) => (
          <FoodItemRow
            key={itemKey}
            itemKey={itemKey}
            value={values[`food_${itemKey}`]}
            onChange={onChange}
            accent={accent}
          />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main FoodStep component
// ─────────────────────────────────────────────────────────────────────────────
export default function FoodStep({ values, onChange, errors }) {
  // Compute total and sync foodEmissionsKgMonth whenever values change
  const totalFoodCO2 = useMemo(() => computeTotalFoodCO2(values), [values]);

  useEffect(() => {
    const rounded = Math.round(totalFoodCO2 * 100) / 100;
    // Only update if changed to avoid infinite loop
    if (values.foodEmissionsKgMonth !== rounded) {
      onChange('foodEmissionsKgMonth', rounded);
      // Also set a sentinel dietType so backend doesn't reject the request
      onChange('dietType', 'quantity_based');
    }
  }, [totalFoodCO2]); // eslint-disable-line react-hooks/exhaustive-deps

  const filledItemCount = Object.keys(FOOD_ITEM_FACTORS).filter((key) => {
    const v = parseFloat(values[`food_${key}`]);
    return !isNaN(v) && v > 0;
  }).length;

  return (
    <div className="space-y-5">
      {/* Section header */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Utensils className="w-6 h-6 text-emerald-600" />
          Food Consumption
        </h3>
        <p className="text-sm text-slate-500 mt-1 leading-relaxed">
          Enter your average daily consumption for each item. Leave fields blank or 0 if you don't consume that food.
          CO₂ is calculated monthly (daily × 30 days).
        </p>
      </div>

      {/* Live total banner */}
      <div
        className="flex items-center justify-between p-4 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
          boxShadow: '0 4px 16px rgba(5,150,105,0.25)',
        }}
      >
        <div>
          <span className="text-xs font-bold text-emerald-100 uppercase tracking-wider">
            Total Food CO₂
          </span>
          <p className="text-2xl font-black text-white font-mono mt-0.5">
            {totalFoodCO2.toFixed(2)}{' '}
            <span className="text-sm font-medium text-emerald-100">kg CO₂ / month</span>
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-emerald-200">Items entered</span>
          <p className="text-lg font-bold text-white">
            {filledItemCount} <span className="text-sm font-normal text-emerald-100">/ {Object.keys(FOOD_ITEM_FACTORS).length}</span>
          </p>
        </div>
      </div>

      {/* Category sections */}
      {CATEGORIES.map((cat) => (
        <CategorySection
          key={cat.key}
          category={cat}
          values={values}
          onChange={onChange}
        />
      ))}

      {/* Methodology note */}
      <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5 text-xs">
        <div className="flex items-center gap-2 text-emerald-900 font-bold">
          <ShieldAlert className="w-4 h-4 text-emerald-700 flex-shrink-0" />
          <span>Emission Factor Methodology Notice</span>
        </div>
        <p className="text-slate-600 leading-relaxed">
          Per-item emission factors are <strong>illustrative estimates</strong> inspired by Poore &amp; Nemecek (2018)
          lifecycle data and FAO / IPCC food system guidance. They are calibrated to be broadly consistent with
          established Indian dietary footprint benchmarks. CarbonLens is designed to incorporate verified,
          peer-reviewed per-food-item data for regional Indian dietary mixes in future versions.
        </p>
        <div className="flex items-center gap-1.5 text-emerald-700 font-semibold mt-1">
          <ChevronRight className="w-3 h-3" />
          <span>Formula: daily quantity × emission factor × 30 days = monthly CO₂</span>
        </div>
      </div>
    </div>
  );
}
