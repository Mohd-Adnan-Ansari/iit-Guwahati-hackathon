import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { formatCO2 } from '../utils/formatters';

export default function ComparisonChart({ before, after }) {
  const chartData = [
    {
      category: 'Transport',
      Current: before?.transportEmissions || 0,
      Simulated: after?.transportEmissions || 0,
    },
    {
      category: 'Energy',
      Current: before?.energyEmissions || 0,
      Simulated: after?.energyEmissions || 0,
    },
    {
      category: 'Food',
      Current: before?.foodEmissions || 0,
      Simulated: after?.foodEmissions || 0,
    },
    {
      category: 'Waste',
      Current: before?.wasteEmissions || 0,
      Simulated: after?.wasteEmissions || 0,
    },
    {
      category: 'Total',
      Current: before?.totalEmissions || 0,
      Simulated: after?.totalEmissions || 0,
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-xl text-xs space-y-1">
          <p className="font-bold text-slate-900 border-b border-slate-100 pb-1">{label}</p>
          <p className="text-slate-600 flex justify-between gap-4">
            <span>Current:</span>
            <span className="font-mono font-semibold text-slate-700">{formatCO2(payload[0]?.value)} kg</span>
          </p>
          <p className="text-emerald-700 flex justify-between gap-4">
            <span>Simulated:</span>
            <span className="font-mono font-bold text-emerald-600">{formatCO2(payload[1]?.value)} kg</span>
          </p>
          {payload[0]?.value && payload[1]?.value && (
            <p className="text-xs pt-1 border-t border-slate-100 text-emerald-800 font-semibold">
              Diff: {formatCO2(payload[0].value - payload[1].value)} kg (
              {((payload[0].value - payload[1].value) / payload[0].value * 100).toFixed(1)}%)
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 20, left: -10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="category"
            tick={{ fill: '#64748b', fontSize: 12 }}
            axisLine={{ stroke: '#cbd5e1' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#64748b', fontSize: 12 }}
            axisLine={{ stroke: '#cbd5e1' }}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            formatter={(value) => (
              <span className="text-xs text-slate-700 mr-2 font-medium">
                {value}
              </span>
            )}
          />
          <Bar dataKey="Current" fill="#94a3b8" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Simulated" fill="#059669" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
