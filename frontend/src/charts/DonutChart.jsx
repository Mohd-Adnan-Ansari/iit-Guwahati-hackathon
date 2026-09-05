import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#f43f5e'];
const LIGHT_COLORS = ['#dbeafe', '#fef3c7', '#d1fae5', '#ffe4e6'];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(226,232,240,0.9)',
        boxShadow: '0 8px 32px -4px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,1)',
        borderRadius: 14,
        padding: '10px 14px',
        minWidth: 140,
      }}
    >
      <p style={{ fontWeight: 800, fontSize: 12, color: '#0f172a', marginBottom: 2 }}>{d.name}</p>
      <p style={{ fontWeight: 700, fontSize: 13, color: d.payload.fill, fontFamily: 'monospace' }}>
        {d.value.toFixed(1)} kg CO₂
      </p>
      <p style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>
        {d.payload.percentage?.toFixed(1)}% of total
      </p>
    </div>
  );
}

function CustomLabel({ cx, cy, totalEmissions }) {
  return (
    <g>
      <text x={cx} y={cy - 10} textAnchor="middle" style={{ fill: '#0f172a', fontSize: 22, fontWeight: 900, fontFamily: 'Outfit, sans-serif' }}>
        {totalEmissions?.toFixed(0)}
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" style={{ fill: '#64748b', fontSize: 10, fontWeight: 600, letterSpacing: 1 }}>
        kg CO₂ / mo
      </text>
    </g>
  );
}

export default function DonutChart({ data = [], totalEmissions = 0 }) {
  const validData = data.filter((d) => d.value > 0);
  if (!validData.length) {
    return (
      <div className="flex items-center justify-center h-56 text-sm text-slate-400">
        No emission data to display.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <defs>
            {COLORS.map((c, i) => (
              <radialGradient key={i} id={`donut-grad-${i}`} cx="30%" cy="30%">
                <stop offset="0%" stopColor={LIGHT_COLORS[i]} stopOpacity={0.8} />
                <stop offset="100%" stopColor={c} stopOpacity={1} />
              </radialGradient>
            ))}
            <filter id="donut-shadow">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(0,0,0,0.12)" />
            </filter>
          </defs>
          <Pie
            data={validData}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
            isAnimationActive
            animationBegin={0}
            animationDuration={800}
            animationEasing="ease-out"
            filter="url(#donut-shadow)"
            label={<CustomLabel totalEmissions={totalEmissions} />}
            labelLine={false}
          >
            {validData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#donut-grad-${index})`}
                stroke="rgba(255,255,255,0.9)"
                strokeWidth={3}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2">
        {validData.map((d, i) => (
          <div
            key={d.name}
            className="flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{
              background: `${LIGHT_COLORS[i]}50`,
              border: `1px solid ${COLORS[i]}30`,
            }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: COLORS[i], boxShadow: `0 0 6px ${COLORS[i]}60` }}
            />
            <span className="text-xs font-semibold text-slate-700 truncate">{d.name}</span>
            <span className="ml-auto text-xs font-mono font-bold" style={{ color: COLORS[i] }}>
              {d.percentage?.toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
