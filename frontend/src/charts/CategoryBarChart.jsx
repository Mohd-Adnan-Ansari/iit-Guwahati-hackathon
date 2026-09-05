import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

const CAT_COLORS = {
  Transport: { main: '#3b82f6', light: '#dbeafe', glow: 'rgba(59,130,246,0.25)' },
  Energy:    { main: '#f59e0b', light: '#fef3c7', glow: 'rgba(245,158,11,0.25)' },
  Food:      { main: '#10b981', light: '#d1fae5', glow: 'rgba(16,185,129,0.25)' },
  Waste:     { main: '#f43f5e', light: '#ffe4e6', glow: 'rgba(244,63,94,0.25)' },
};

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const cat = CAT_COLORS[label] || { main: '#10b981', light: '#d1fae5' };
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(16px)',
        border: `1px solid ${cat.main}30`,
        boxShadow: `0 8px 32px -4px rgba(0,0,0,0.12), 0 0 0 1px ${cat.main}20, inset 0 1px 0 rgba(255,255,255,1)`,
        borderRadius: 14,
        padding: '10px 14px',
      }}
    >
      <p style={{ fontWeight: 800, fontSize: 11, color: cat.main, marginBottom: 3, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</p>
      <p style={{ fontWeight: 700, fontSize: 14, color: '#0f172a', fontFamily: 'monospace' }}>
        {payload[0].value?.toFixed(1)} kg CO₂
      </p>
    </div>
  );
}

export default function CategoryBarChart({ data = [] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} barCategoryGap="30%" margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          {data.map((d, i) => {
            const cat = CAT_COLORS[d.name] || { main: '#10b981', light: '#d1fae5' };
            return (
              <linearGradient key={i} id={`bar-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={cat.main} stopOpacity={0.9} />
                <stop offset="100%" stopColor={cat.main} stopOpacity={0.5} />
              </linearGradient>
            );
          })}
        </defs>
        <CartesianGrid vertical={false} stroke="rgba(226,232,240,0.7)" strokeDasharray="4 4" />
        <XAxis
          dataKey="name"
          tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#94a3b8', fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          width={40}
          tickFormatter={(v) => `${v}`}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(16,185,129,0.05)', radius: 8 }} />
        <Bar dataKey="value" radius={[8, 8, 0, 0]} isAnimationActive animationDuration={700}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={`url(#bar-grad-${index})`} />
          ))}
          <LabelList
            dataKey="value"
            position="top"
            formatter={(v) => v > 0 ? `${v.toFixed(0)}` : ''}
            style={{ fill: '#475569', fontSize: 10, fontWeight: 700 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
