import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Leaf, Trophy, ArrowRight, ShieldCheck, Car, Zap, Utensils, Trash2, Sparkles,
  Sliders, Compass, Building2, TrendingDown, CheckCircle2,
} from 'lucide-react';

/* ─── Animated 3D Globe Hero Element ─────────────────────────── */
function GlobeHero() {
  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: 380, height: 380 }}>

      {/* Outer ambient glow */}
      <div
        className="absolute inset-0 rounded-full animate-pulse-glow"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.18) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Outermost orbit ring */}
      <div
        className="absolute rounded-full border border-dashed border-emerald-300/40 animate-orbit-slow"
        style={{ width: 360, height: 360 }}
      >
        {/* Leaf dot on outer ring */}
        <div
          className="absolute w-8 h-8 rounded-full bg-white flex items-center justify-center"
          style={{
            top: '50%', left: '-16px', transform: 'translateY(-50%)',
            boxShadow: '0 2px 0 #047857, 0 4px 12px rgba(16,185,129,0.30)',
          }}
        >
          <Leaf className="w-4 h-4 text-emerald-600" />
        </div>
      </div>

      {/* Mid orbit ring */}
      <div
        className="absolute rounded-full border border-dashed border-teal-300/50 animate-orbit-reverse"
        style={{ width: 280, height: 280 }}
      >
        {/* CO₂ dot */}
        <div
          className="absolute top-[-14px] left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-white flex items-center justify-center"
          style={{ boxShadow: '0 2px 0 #0f766e, 0 4px 12px rgba(20,184,166,0.25)' }}
        >
          <span className="text-[9px] font-black text-teal-700">CO₂</span>
        </div>
      </div>

      {/* Inner orbit ring */}
      <div
        className="absolute rounded-full border border-emerald-200/60 animate-orbit"
        style={{ width: 200, height: 200, animationDuration: '14s' }}
      >
        <div
          className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-emerald-500"
          style={{ boxShadow: '0 0 8px rgba(16,185,129,0.6)' }}
        />
      </div>

      {/* ── Central 3D Globe ──────────────────────────── */}
      <div className="relative z-10 animate-float" style={{ animationDuration: '7s' }}>
        {/* Globe shadow */}
        <div
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-4 rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.25) 0%, transparent 70%)', filter: 'blur(6px)' }}
        />

        {/* Globe body */}
        <div
          className="relative w-40 h-40 rounded-full overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #d1fae5 0%, #6ee7b7 30%, #10b981 60%, #065f46 100%)',
            boxShadow: `
              inset -12px -8px 24px rgba(0,0,0,0.18),
              inset 8px 8px 16px rgba(255,255,255,0.25),
              0 4px 0 #047857,
              0 16px 48px rgba(16,185,129,0.35),
              0 6px 16px rgba(0,0,0,0.12)
            `,
          }}
        >
          {/* Grid lines SVG */}
          <svg
            viewBox="0 0 160 160"
            className="absolute inset-0 w-full h-full opacity-25"
            style={{ mixBlendMode: 'screen' }}
          >
            {/* Latitude lines */}
            {[30, 55, 80, 105, 130].map((y) => (
              <ellipse key={y} cx="80" cy={y} rx="72" ry="8" fill="none" stroke="white" strokeWidth="1" />
            ))}
            {/* Longitude lines */}
            {[0, 36, 72, 108, 144].map((rot) => (
              <ellipse
                key={rot}
                cx="80" cy="80" rx="72" ry="12"
                fill="none" stroke="white" strokeWidth="1"
                transform={`rotate(${rot} 80 80)`}
              />
            ))}
          </svg>

          {/* Continent-like shapes */}
          <svg viewBox="0 0 160 160" className="absolute inset-0 w-full h-full opacity-40">
            <ellipse cx="60" cy="55" rx="22" ry="14" fill="rgba(255,255,255,0.35)" />
            <ellipse cx="95" cy="75" rx="18" ry="22" fill="rgba(255,255,255,0.30)" />
            <ellipse cx="50" cy="95" rx="14" ry="10" fill="rgba(255,255,255,0.25)" />
            <ellipse cx="115" cy="50" rx="12" ry="8" fill="rgba(255,255,255,0.28)" />
            <ellipse cx="85" cy="115" rx="20" ry="10" fill="rgba(255,255,255,0.22)" />
          </svg>

          {/* Specular highlight */}
          <div
            className="absolute top-4 left-5 w-12 h-10 rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.45) 0%, transparent 70%)' }}
          />
        </div>

        {/* Leaf on top of globe */}
        <div
          className="absolute -top-3 -right-3 w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
            boxShadow: '0 2px 0 #047857, 0 6px 16px rgba(16,185,129,0.30), inset 0 1px 0 rgba(255,255,255,0.9)',
            border: '1px solid rgba(52,211,153,0.40)',
          }}
        >
          <Leaf className="w-6 h-6 text-emerald-700" />
        </div>
      </div>

      {/* Floating stat chips */}
      <div
        className="absolute top-8 right-4 animate-float text-[11px] font-bold px-3 py-1.5 rounded-full"
        style={{
          animationDuration: '5s',
          animationDelay: '0.5s',
          background: 'rgba(255,255,255,0.92)',
          border: '1px solid rgba(52,211,153,0.4)',
          boxShadow: '0 2px 0 rgba(4,120,87,0.15), 0 6px 20px rgba(16,185,129,0.18)',
          color: '#065f46',
        }}
      >
        ↓ 7.9% CO₂
      </div>
      <div
        className="absolute bottom-10 right-2 animate-float text-[11px] font-bold px-3 py-1.5 rounded-full"
        style={{
          animationDuration: '6.5s',
          animationDelay: '1.2s',
          background: 'rgba(255,255,255,0.92)',
          border: '1px solid rgba(20,184,166,0.4)',
          boxShadow: '0 2px 0 rgba(15,118,110,0.15), 0 6px 20px rgba(20,184,166,0.18)',
          color: '#0f766e',
        }}
      >
        1,250 tracked
      </div>
      <div
        className="absolute bottom-16 left-2 animate-float text-[11px] font-bold px-3 py-1.5 rounded-full"
        style={{
          animationDuration: '8s',
          animationDelay: '0.8s',
          background: 'rgba(255,255,255,0.92)',
          border: '1px solid rgba(52,211,153,0.4)',
          boxShadow: '0 2px 0 rgba(4,120,87,0.15), 0 6px 20px rgba(16,185,129,0.18)',
          color: '#065f46',
        }}
      >
        Urban Tracker
      </div>
    </div>
  );
}

/* ─── Intersection Observer Hook ─────────────────────────────── */
function useReveal(ref, delay = 0) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, delay);
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, delay]);
}

function RevealCard({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  useReveal(ref, delay);
  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
    >
      {children}
    </div>
  );
}

/* ─── Main LandingPage ────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div className="relative overflow-hidden pt-16">

      {/* Page-level ambient blobs */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none -z-10 animate-pulse-glow"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.10) 0%, transparent 65%)',
          filter: 'blur(2px)',
        }}
      />
      <div
        className="fixed top-1/3 right-0 w-[500px] h-[500px] pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse, rgba(20,184,166,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* ══════════════════ HERO SECTION ══════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text + CTAs */}
          <div className="text-center lg:text-left space-y-6">
            {/* CarbonLens Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold badge-3d text-emerald-800 animate-fade-in-up">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>Urban Carbon Footprint Calculator</span>
            </div>

            {/* Wordmark */}
            <div className="animate-fade-in-up delay-100">
              <span
                className="block text-sm sm:text-base font-black tracking-[0.25em] uppercase mb-1"
                style={{ color: '#059669' }}
              >
                CarbonLens
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.08]">
                Track.{' '}
                <span className="gradient-text-green">Understand.</span>
                {' '}Reduce.
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed animate-fade-in-up delay-200 max-w-lg">
              Universities and urban communities generate hidden emissions through everyday transport,
              energy, food, and waste. CarbonLens maps your impact — and shows you exactly how to shrink it.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up delay-300 justify-center lg:justify-start">
              <Link
                to="/calculate"
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold text-white btn-3d-primary group"
              >
                <span>Calculate My Footprint</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 animate-bounce-caret" />
              </Link>
              <Link
                to="/what-if"
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-slate-700 btn-3d-secondary"
              >
                <Sliders className="w-5 h-5 text-emerald-600" />
                <span>Explore What-If</span>
              </Link>
            </div>

            {/* Philosophy pill bar */}
            <div className="flex items-center gap-4 pt-2 animate-fade-in-up delay-400 justify-center lg:justify-start">
              {['TRACK', 'UNDERSTAND', 'REDUCE'].map((label, i) => (
                <React.Fragment key={label}>
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest px-3 py-1.5 rounded-full badge-3d text-emerald-800"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {label}
                  </span>
                  {i < 2 && <span className="text-slate-300 font-bold">→</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Right: 3D Globe */}
          <div className="flex justify-center lg:justify-end animate-fade-in-right delay-300">
            <GlobeHero />
          </div>
        </div>
      </section>

      {/* ══════════════════ WHY CARBONLENS ══════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Frosted divider */}
        <hr className="frosted-divider mb-16" />

        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Why CarbonLens?</span>
          <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">
            More Than Just a Carbon Number
          </p>
          <p className="text-slate-600 mt-3 text-base leading-relaxed">
            Most footprint tools stop at a single number with generic tips. CarbonLens uncovers root causes,
            simulates interventions, and mobilizes campus-wide action.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Compass, color: 'text-blue-600', bg: 'from-blue-50 to-blue-50/30', border: 'rgba(147,197,253,0.5)',
              title: 'Root Cause Detection',
              desc: 'Dynamically evaluates transport, electricity, dietary choices, and waste habits to single out your biggest carbon source.',
            },
            {
              icon: Sliders, color: 'text-emerald-700', bg: 'from-emerald-50 to-emerald-50/30', border: 'rgba(52,211,153,0.4)',
              title: 'Real-Time What-If Engine',
              desc: 'Test lifestyle changes before committing. Swap car for bus, dial down electricity, or boost recycling to see instant savings.',
            },
            {
              icon: Building2, color: 'text-teal-700', bg: 'from-teal-50 to-teal-50/30', border: 'rgba(45,212,191,0.4)',
              title: 'Privacy-Safe Campus Aggregation',
              desc: 'Zero individual data exposure. Collects anonymous metrics to give campus administrations actionable decarbonization intelligence.',
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <RevealCard key={i} delay={i * 120} className="card-3d rounded-3xl p-8 space-y-4">
                <div
                  className={`w-13 h-13 w-12 h-12 rounded-2xl bg-gradient-to-br ${item.bg} flex items-center justify-center ${item.color}`}
                  style={{ border: `1px solid ${item.border}`, boxShadow: `0 2px 8px ${item.border}` }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </RevealCard>
            );
          })}
        </div>
      </section>

      {/* ══════════════════ HOW IT WORKS ══════════════════ */}
      <section
        className="py-20"
        style={{
          background: 'linear-gradient(180deg, rgba(240,253,244,0.6) 0%, rgba(255,255,255,0.4) 100%)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">The Flow</span>
            <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">
              How CarbonLens Works
            </p>
            <p className="text-slate-600 mt-2 text-sm">
              An end-to-end pipeline transforming raw habits into measurable reduction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: '01', title: 'Enter Inputs', desc: 'Log commuting, power bills, food habits, and waste in under 2 minutes.', icon: Car, grad: 'from-blue-50 to-blue-50/50', color: 'text-blue-600', accent: 'rgba(147,197,253,0.5)' },
              { step: '02', title: 'Engine Calculates', desc: 'Centralized emission factors dynamically compute monthly CO₂ and category weightings.', icon: Zap, grad: 'from-amber-50 to-amber-50/50', color: 'text-amber-600', accent: 'rgba(252,211,77,0.5)' },
              { step: '03', title: 'Personalized Insights', desc: 'Identifies your heaviest contributor and creates a tailored data-backed roadmap.', icon: Utensils, grad: 'from-emerald-50 to-emerald-50/50', color: 'text-emerald-600', accent: 'rgba(52,211,153,0.5)' },
              { step: '04', title: 'Simulate & Scale', desc: 'Run What-If scenarios, join challenges, track milestones, and inspire your campus.', icon: Trash2, grad: 'from-teal-50 to-teal-50/50', color: 'text-teal-600', accent: 'rgba(45,212,191,0.5)' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <RevealCard key={item.step} delay={i * 100}>
                  <div
                    className="relative p-6 rounded-3xl h-full"
                    style={{
                      background: 'rgba(255,255,255,0.88)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255,255,255,0.75)',
                      borderBottom: '1px solid rgba(0,0,0,0.06)',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.03), 0 12px 32px -8px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,1)',
                      transition: 'transform 0.25s, box-shadow 0.25s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 16px 48px -8px rgba(0,0,0,0.15), 0 4px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,1)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.03), 0 12px 32px -8px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,1)';
                    }}
                  >
                    {/* Step number watermark */}
                    <span className="absolute top-4 right-4 text-4xl font-black text-slate-100/80 font-mono select-none">
                      {item.step}
                    </span>
                    <div
                      className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${item.grad} flex items-center justify-center ${item.color} mb-4`}
                      style={{ border: `1px solid ${item.accent}`, boxShadow: `0 2px 8px ${item.accent}` }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-1.5">{item.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </RevealCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════ KEY FEATURES ══════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Engineered For Impact</span>
          <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">Platform Capabilities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { title: 'What-If Lifestyle Simulator', desc: 'Interactive sliders dynamically recalculate before/after carbon changes with category breakdown charts.', icon: Sliders },
            { title: 'Historical Progress Tracking', desc: 'Classify month-over-month trajectory with automated badge milestones.', icon: TrendingDown },
            { title: 'Institutional Analytics', desc: 'Aggregates campus participation and reduction milestones without individual data leaks.', icon: Building2 },
            { title: 'Multi-Campus Scalability', desc: 'Built on a University → Campus → User hierarchy supporting regional emission overrides.', icon: Compass },
            { title: 'Gamified Challenges', desc: 'Join Cycle Week, Energy Saving, and Zero Waste campaigns with non-shaming badges.', icon: Trophy },
            { title: 'Factor Transparency', desc: 'Open methodology distinguishing illustrative demo datasets from official CEA/IPCC baselines.', icon: ShieldCheck },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <RevealCard key={i} delay={i * 80}>
                <div
                  className="flex items-start gap-4 p-6 rounded-2xl cursor-default"
                  style={{
                    background: 'rgba(255,255,255,0.85)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(226,232,240,0.8)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.03), 0 8px 24px -6px rgba(0,0,0,0.08)',
                    transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.borderColor = 'rgba(52,211,153,0.45)';
                    e.currentTarget.style.boxShadow = '0 8px 30px -6px rgba(0,0,0,0.12), 0 0 0 1px rgba(52,211,153,0.15)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(226,232,240,0.8)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.03), 0 8px 24px -6px rgba(0,0,0,0.08)';
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-emerald-700"
                    style={{
                      background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
                      border: '1px solid rgba(52,211,153,0.35)',
                      boxShadow: '0 2px 0 rgba(4,120,87,0.15), 0 4px 12px rgba(16,185,129,0.15)',
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">{f.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </RevealCard>
            );
          })}
        </div>
      </section>

      {/* ══════════════════ CAMPUS IMPACT ══════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <RevealCard>
          <div
            className="p-8 sm:p-12 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(240,253,244,0.95) 0%, rgba(255,255,255,0.90) 50%, rgba(240,253,250,0.95) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(52,211,153,0.25)',
              boxShadow: '0 8px 10px rgba(0,0,0,0.03), 0 24px 60px -10px rgba(0,0,0,0.10), 0 0 0 1px rgba(255,255,255,0.8) inset, var(--glow-emerald-sm)',
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Institutional Scalability</span>
                <h3 className="text-3xl font-black text-slate-900 mt-2 mb-4 tracking-tight">
                  Empowering Universities to Benchmark & Reduce
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Universities house tens of thousands of active urban citizens. By combining micro-level personal
                  awareness with macro-level institutional aggregation, CarbonLens empowers campus sustainability
                  heads to launch data-backed solar, transit, and canteen initiatives.
                </p>
                <div className="space-y-2.5 text-xs text-slate-700 mb-8">
                  {[
                    'Zero exposure of individual students or faculty data',
                    'Support for campus-specific solar microgrid emission factors',
                    'Automated tracking of green initiatives and bike-share uptake',
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/campus"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white btn-3d-primary"
                >
                  <Building2 className="w-4 h-4" />
                  <span>View Campus Dashboard</span>
                </Link>
              </div>

              {/* Stat snapshot grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Participants Tracked', value: '1,250', sub: 'Across Hostels & Labs', accent: '#059669' },
                  { label: 'Avg Campus Footprint', value: '285.5', sub: 'kg CO₂ / participant / mo', accent: '#0d9488' },
                  { label: 'Est. Campus Total', value: '356.8', sub: 'tonnes CO₂ / month', accent: '#0d9488' },
                  { label: 'Annualized Savings', value: '14.2%', sub: 'Targeted Reduction', accent: '#059669' },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl"
                    style={{
                      background: 'rgba(255,255,255,0.90)',
                      border: '1px solid rgba(255,255,255,0.8)',
                      boxShadow: '0 2px 0 rgba(0,0,0,0.04), 0 8px 24px -6px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,1)',
                    }}
                  >
                    <span className="text-xs text-slate-500 font-medium">{s.label}</span>
                    <p className="text-3xl font-black mt-1 font-mono metric-3d" style={{ color: s.accent }}>
                      {s.value}
                    </p>
                    <span className="text-[10px] text-slate-500 font-medium">{s.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealCard>
      </section>

      {/* ══════════════════ FOOTER CTA ══════════════════ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <hr className="frosted-divider mb-16" />
        <RevealCard>
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-700"
            style={{
              background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
              boxShadow: '0 4px 0 #047857, 0 12px 32px rgba(16,185,129,0.25), inset 0 1px 0 rgba(255,255,255,0.9)',
              border: '1px solid rgba(52,211,153,0.3)',
            }}
          >
            <Leaf className="w-8 h-8" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
            CARBONLENS
          </h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">
            <span className="text-emerald-700 font-semibold">Urban Carbon Footprint Calculator</span>
            <br />
            <strong className="text-slate-900">Track • Understand • Reduce</strong>
            <br />
            Measure your daily emissions and discover personalized ways to reduce your carbon footprint.
          </p>
          <Link
            to="/calculate"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white btn-3d-primary"
          >
            <span>Begin Your Assessment Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </RevealCard>
      </section>
    </div>
  );
}
