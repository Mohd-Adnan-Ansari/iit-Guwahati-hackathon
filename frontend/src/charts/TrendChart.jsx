import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from 'recharts';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(52,211,153,0.35)',
        boxShadow: '0 8px 32px -4px rgba(0,0,0,0.12), 0 0 16px rgba(16,185,129,0.10), inset 0 1px 0 rgba(255,255,255,1)',
        borderRadius: 14,
        padding: '10px 14px',
      }}
    >
      <p style={{ fontWeight: 700, fontSize: 11, color: '#64748b', marginBottom: 3 }}>{label}</p>
      <p style={{ fontWeight: 800, fontSize: 15, color: '#059669', fontFamily: 'monospace' }}>
        {payload[0].value?.toFixed(1)} kg CO₂
      </p>
    </div>
  );
}

function ActiveDotCustom(props) {
  const { cx, cy, fill } = props;
  return (
    <g>
      <circle cx={cx} cy={cy} r={8} fill={fill} fillOpacity={0.15} />
      <circle cx={cx} cy={cy} r={5} fill={fill} stroke="white" strokeWidth={2} />
    </g>
  );
}

export default function TrendChart({ data = [] }) {
  if (!data.length) return (
    <div className="h-52 flex items-center justify-center text-sm text-slate-400">
      No trend data yet.
    </div>
  );

  const values = data.map((d) => d.total);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#10b981" stopOpacity={0.25} />
            <stop offset="60%"  stopColor="#10b981" stopOpacity={0.08} />
            <stop offset="100%" stopColor="#10b981" stopOpacity={0.00} />
          </linearGradient>
          <filter id="line-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <CartesianGrid stroke="rgba(226,232,240,0.7)" strokeDasharray="4 4" vertical={false} />
        <XAxis
          dataKey="period"
          tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#94a3b8', fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          width={45}
          tickFormatter={(v) => `${v}`}
        />
        <Tooltip content={<CustomTooltip />} />

        {/* Average reference line */}
        <ReferenceLine
          y={avg}
          stroke="rgba(16,185,129,0.35)"
          strokeDasharray="6 3"
          label={{ value: `Avg: ${avg.toFixed(0)}`, fill: '#059669', fontSize: 10, fontWeight: 700, position: 'insideTopRight' }}
        />

        <Area
          type="monotone"
          dataKey="total"
          stroke="#10b981"
          strokeWidth={2.5}
          fill="url(#trend-fill)"
          dot={false}
          activeDot={<ActiveDotCustom fill="#10b981" />}
          isAnimationActive
          animationDuration={900}
          animationEasing="ease-out"
          filter="url(#line-glow)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
