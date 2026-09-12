import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Leaf, Trophy, ArrowRight, ShieldCheck, Car, Zap, Utensils, Trash2, Sparkles,
  Sliders, Compass, Building2, TrendingDown, CheckCircle2,
} from 'lucide-react';

/* ─── Enhanced Nature Background ──────────────────────────────── */
function NatureBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* ══ HERO soft green radial glow — left side behind hero text ══ */}
      <div style={{
        position: 'absolute',
        top: '5%',
        left: '-8%',
        width: '55vw',
        height: '70vh',
        background: 'radial-gradient(ellipse at 20% 40%, rgba(134,239,172,0.22) 0%, rgba(74,222,128,0.10) 38%, rgba(52,211,153,0.04) 65%, transparent 80%)',
        filter: 'blur(40px)',
      }} />
      {/* ══ HERO soft green radial glow — right side behind globe ══ */}
      <div style={{
        position: 'absolute',
        top: '2%',
        right: '-6%',
        width: '45vw',
        height: '60vh',
        background: 'radial-gradient(ellipse at 80% 30%, rgba(167,243,208,0.18) 0%, rgba(110,231,183,0.08) 40%, transparent 70%)',
        filter: 'blur(48px)',
      }} />

      {/* ══ TOP-LEFT corner — large tree cluster ══ */}
      <svg
        viewBox="0 0 280 400"
        width="280"
        height="400"
        style={{ position: 'absolute', top: 44, left: 0, opacity: 0.28 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Tall tree — main */}
        <rect x="22" y="295" width="11" height="105" rx="5.5" fill="#1b5e20" />
        <ellipse cx="27" cy="240" rx="28" ry="62" fill="#2e7d32" />
        <ellipse cx="27" cy="208" rx="20" ry="44" fill="#388e3c" />
        <ellipse cx="27" cy="185" rx="14" ry="32" fill="#43a047" />
        <ellipse cx="27" cy="167" rx="9" ry="22" fill="#66bb6a" />
        <ellipse cx="27" cy="155" rx="6" ry="14" fill="#81c784" />

        {/* Second tree — medium */}
        <rect x="74" y="315" width="9" height="85" rx="4.5" fill="#1b5e20" />
        <ellipse cx="78" cy="265" rx="22" ry="55" fill="#2e7d32" />
        <ellipse cx="78" cy="238" rx="16" ry="38" fill="#388e3c" />
        <ellipse cx="78" cy="218" rx="11" ry="27" fill="#4caf50" />
        <ellipse cx="78" cy="204" rx="7" ry="18" fill="#66bb6a" />

        {/* Third tree — short */}
        <rect x="120" y="340" width="7" height="60" rx="3.5" fill="#2e7d32" />
        <ellipse cx="123" cy="302" rx="17" ry="42" fill="#388e3c" />
        <ellipse cx="123" cy="280" rx="12" ry="28" fill="#43a047" />
        <ellipse cx="123" cy="265" rx="8" ry="19" fill="#66bb6a" />

        {/* Ground cover / bushes */}
        <ellipse cx="35" cy="370" rx="36" ry="16" fill="#a5d6a7" />
        <ellipse cx="85" cy="378" rx="30" ry="13" fill="#b9dfba" />
        <ellipse cx="135" cy="382" rx="22" ry="10" fill="#c8e6c9" />
        <ellipse cx="175" cy="388" rx="16" ry="8" fill="#dcedc8" />

        {/* Scattered leaves */}
        <ellipse cx="155" cy="295" rx="11" ry="6" fill="#66bb6a" transform="rotate(-28 155 295)" />
        <ellipse cx="170" cy="318" rx="9" ry="5" fill="#81c784" transform="rotate(18 170 318)" />
        <ellipse cx="148" cy="332" rx="8" ry="4.5" fill="#a5d6a7" transform="rotate(-12 148 332)" />
        <ellipse cx="185" cy="308" rx="7" ry="4" fill="#c8e6c9" transform="rotate(8 185 308)" />

        {/* Branch arcs */}
        <path d="M10 330 Q50 295 88 310" stroke="#388e3c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M18 280 Q58 260 90 272" stroke="#4caf50" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </svg>

      {/* ══ TOP-RIGHT corner — tree + leaf fan ══ */}
      <svg
        viewBox="0 0 260 380"
        width="260"
        height="380"
        style={{ position: 'absolute', top: 44, right: 0, opacity: 0.26, transform: 'scaleX(-1)' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main tree */}
        <rect x="22" y="275" width="10" height="105" rx="5" fill="#1b5e20" />
        <ellipse cx="27" cy="222" rx="26" ry="58" fill="#2e7d32" />
        <ellipse cx="27" cy="193" rx="18" ry="40" fill="#388e3c" />
        <ellipse cx="27" cy="173" rx="12" ry="28" fill="#43a047" />
        <ellipse cx="27" cy="157" rx="8" ry="19" fill="#66bb6a" />

        {/* Companion tree */}
        <rect x="70" y="300" width="8" height="80" rx="4" fill="#1b5e20" />
        <ellipse cx="74" cy="255" rx="20" ry="48" fill="#2e7d32" />
        <ellipse cx="74" cy="228" rx="14" ry="33" fill="#4caf50" />
        <ellipse cx="74" cy="210" rx="9" ry="22" fill="#66bb6a" />

        {/* Leaf fan top right */}
        <ellipse cx="105" cy="100" rx="22" ry="12" fill="#4caf50" transform="rotate(-22 105 100)" />
        <ellipse cx="138" cy="80" rx="18" ry="10" fill="#43a047" transform="rotate(12 138 80)" />
        <ellipse cx="120" cy="130" rx="16" ry="9" fill="#66bb6a" transform="rotate(-35 120 130)" />
        <ellipse cx="155" cy="108" rx="14" ry="8" fill="#81c784" transform="rotate(20 155 108)" />
        <ellipse cx="170" cy="82" rx="11" ry="6" fill="#a5d6a7" transform="rotate(-8 170 82)" />
        <ellipse cx="145" cy="145" rx="12" ry="7" fill="#b9dfba" transform="rotate(15 145 145)" />

        {/* Stem to fan */}
        <path d="M90 175 Q112 140 140 115" stroke="#388e3c" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M92 165 Q125 130 155 118" stroke="#4caf50" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* Ground cover */}
        <ellipse cx="38" cy="358" rx="34" ry="14" fill="#a5d6a7" />
        <ellipse cx="90" cy="365" rx="26" ry="11" fill="#c8e6c9" />
        <ellipse cx="140" cy="370" rx="20" ry="9" fill="#dcedc8" />
      </svg>

      {/* ══ BOTTOM-LEFT corner — tall tree group + ferns ══ */}
      <svg
        viewBox="0 0 320 360"
        width="320"
        height="360"
        style={{ position: 'absolute', bottom: 0, left: 0, opacity: 0.27 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main tall tree */}
        <rect x="32" y="215" width="12" height="145" rx="6" fill="#1b5e20" />
        <ellipse cx="38" cy="165" rx="32" ry="58" fill="#2e7d32" />
        <ellipse cx="38" cy="132" rx="22" ry="40" fill="#388e3c" />
        <ellipse cx="38" cy="108" rx="15" ry="28" fill="#43a047" />
        <ellipse cx="38" cy="90" rx="10" ry="19" fill="#66bb6a" />
        <ellipse cx="38" cy="76" rx="6" ry="12" fill="#81c784" />

        {/* Medium tree */}
        <rect x="90" y="235" width="10" height="125" rx="5" fill="#1b5e20" />
        <ellipse cx="95" cy="188" rx="25" ry="52" fill="#2e7d32" />
        <ellipse cx="95" cy="158" rx="17" ry="36" fill="#388e3c" />
        <ellipse cx="95" cy="136" rx="12" ry="25" fill="#4caf50" />
        <ellipse cx="95" cy="120" rx="7" ry="16" fill="#66bb6a" />

        {/* Small tree */}
        <rect x="148" y="258" width="8" height="102" rx="4" fill="#2e7d32" />
        <ellipse cx="152" cy="218" rx="19" ry="44" fill="#388e3c" />
        <ellipse cx="152" cy="193" rx="13" ry="30" fill="#43a047" />
        <ellipse cx="152" cy="176" rx="8" ry="20" fill="#66bb6a" />

        {/* Fern ground cover */}
        <ellipse cx="20" cy="332" rx="38" ry="16" fill="#a5d6a7" />
        <ellipse cx="72" cy="340" rx="32" ry="14" fill="#b9dfba" />
        <ellipse cx="130" cy="346" rx="28" ry="12" fill="#c8e6c9" />
        <ellipse cx="185" cy="350" rx="22" ry="10" fill="#dcedc8" />
        <ellipse cx="230" cy="354" rx="16" ry="8" fill="#e8f5e9" />

        {/* Leaf scatter */}
        <ellipse cx="192" cy="270" rx="12" ry="6.5" fill="#66bb6a" transform="rotate(-22 192 270)" />
        <ellipse cx="212" cy="292" rx="10" ry="5.5" fill="#81c784" transform="rotate(16 212 292)" />
        <ellipse cx="198" cy="308" rx="8" ry="4.5" fill="#a5d6a7" transform="rotate(-8 198 308)" />
        <ellipse cx="225" cy="280" rx="9" ry="5" fill="#b9dfba" transform="rotate(25 225 280)" />

        {/* Branch arcs */}
        <path d="M15 255 Q60 220 98 238" stroke="#388e3c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M22 200 Q65 175 100 190" stroke="#4caf50" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>

      {/* ══ BOTTOM-RIGHT corner — tree + leaf scatter ══ */}
      <svg
        viewBox="0 0 300 340"
        width="300"
        height="340"
        style={{ position: 'absolute', bottom: 0, right: 0, opacity: 0.26, transform: 'scaleX(-1)' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main tree */}
        <rect x="32" y="210" width="12" height="130" rx="6" fill="#1b5e20" />
        <ellipse cx="38" cy="160" rx="30" ry="56" fill="#2e7d32" />
        <ellipse cx="38" cy="128" rx="21" ry="38" fill="#388e3c" />
        <ellipse cx="38" cy="106" rx="14" ry="26" fill="#43a047" />
        <ellipse cx="38" cy="88" rx="9" ry="18" fill="#66bb6a" />

        {/* Companion tree */}
        <rect x="90" y="232" width="10" height="108" rx="5" fill="#1b5e20" />
        <ellipse cx="95" cy="185" rx="24" ry="50" fill="#2e7d32" />
        <ellipse cx="95" cy="156" rx="16" ry="34" fill="#4caf50" />
        <ellipse cx="95" cy="136" rx="11" ry="23" fill="#66bb6a" />
        <ellipse cx="95" cy="120" rx="6.5" ry="14" fill="#81c784" />

        {/* Small tree */}
        <rect x="148" y="255" width="8" height="85" rx="4" fill="#2e7d32" />
        <ellipse cx="152" cy="215" rx="18" ry="43" fill="#388e3c" />
        <ellipse cx="152" cy="190" rx="12" ry="29" fill="#43a047" />

        {/* Ground cover */}
        <ellipse cx="22" cy="316" rx="36" ry="15" fill="#a5d6a7" />
        <ellipse cx="75" cy="324" rx="28" ry="12" fill="#c8e6c9" />
        <ellipse cx="135" cy="330" rx="22" ry="10" fill="#dcedc8" />
        <ellipse cx="188" cy="334" rx="18" ry="8" fill="#e8f5e9" />

        {/* Leaf scatter */}
        <ellipse cx="195" cy="265" rx="11" ry="6" fill="#66bb6a" transform="rotate(22 195 265)" />
        <ellipse cx="215" cy="285" rx="9" ry="5" fill="#81c784" transform="rotate(-18 215 285)" />
        <ellipse cx="200" cy="302" rx="8" ry="4.5" fill="#a5d6a7" transform="rotate(10 200 302)" />
      </svg>

      {/* ══ Left mid-page — fuller branch panel ══ */}
      <svg
        viewBox="0 0 110 340"
        width="110"
        height="340"
        style={{ position: 'absolute', top: '36%', left: 0, opacity: 0.20 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main stem */}
        <path d="M12 340 Q18 240 26 130" stroke="#2e7d32" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* Upper branch right */}
        <path d="M26 190 Q55 165 78 155" stroke="#388e3c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <ellipse cx="82" cy="152" rx="14" ry="7.5" fill="#4caf50" transform="rotate(-22 82 152)" />
        <ellipse cx="95" cy="145" rx="11" ry="6" fill="#66bb6a" transform="rotate(10 95 145)" />
        <ellipse cx="75" cy="138" rx="10" ry="5.5" fill="#81c784" transform="rotate(-15 75 138)" />
        {/* Lower branch right */}
        <path d="M22 258 Q50 232 70 220" stroke="#388e3c" strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="73" cy="217" rx="13" ry="7" fill="#43a047" transform="rotate(-18 73 217)" />
        <ellipse cx="86" cy="210" rx="10" ry="5.5" fill="#66bb6a" transform="rotate(12 86 210)" />
        {/* Tip branch */}
        <path d="M27 145 Q52 122 68 112" stroke="#4caf50" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <ellipse cx="71" cy="109" rx="11" ry="6" fill="#81c784" transform="rotate(-8 71 109)" />
        <ellipse cx="83" cy="102" rx="9" ry="5" fill="#a5d6a7" transform="rotate(18 83 102)" />
        {/* Leaf dots on stem */}
        <ellipse cx="30" cy="130" rx="9" ry="5" fill="#b9dfba" transform="rotate(-30 30 130)" />
        <ellipse cx="18" cy="100" rx="8" ry="4.5" fill="#c8e6c9" transform="rotate(20 18 100)" />
      </svg>

      {/* ══ Right mid-page — fuller branch panel (mirrored) ══ */}
      <svg
        viewBox="0 0 110 340"
        width="110"
        height="340"
        style={{ position: 'absolute', top: '33%', right: 0, opacity: 0.20, transform: 'scaleX(-1)' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 340 Q18 240 26 130" stroke="#2e7d32" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M26 190 Q55 165 78 155" stroke="#388e3c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <ellipse cx="82" cy="152" rx="14" ry="7.5" fill="#4caf50" transform="rotate(-22 82 152)" />
        <ellipse cx="95" cy="145" rx="11" ry="6" fill="#66bb6a" transform="rotate(10 95 145)" />
        <ellipse cx="75" cy="138" rx="10" ry="5.5" fill="#81c784" transform="rotate(-15 75 138)" />
        <path d="M22 258 Q50 232 70 220" stroke="#388e3c" strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="73" cy="217" rx="13" ry="7" fill="#43a047" transform="rotate(-18 73 217)" />
        <ellipse cx="86" cy="210" rx="10" ry="5.5" fill="#66bb6a" transform="rotate(12 86 210)" />
        <path d="M27 145 Q52 122 68 112" stroke="#4caf50" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <ellipse cx="71" cy="109" rx="11" ry="6" fill="#81c784" transform="rotate(-8 71 109)" />
        <ellipse cx="83" cy="102" rx="9" ry="5" fill="#a5d6a7" transform="rotate(18 83 102)" />
        <ellipse cx="30" cy="130" rx="9" ry="5" fill="#b9dfba" transform="rotate(-30 30 130)" />
        <ellipse cx="18" cy="100" rx="8" ry="4.5" fill="#c8e6c9" transform="rotate(20 18 100)" />
      </svg>

      {/* ══ Scattered floating leaves — more visible, more spread ══ */}
      <svg
        viewBox="0 0 1440 900"
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0, opacity: 0.18 }}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left edge scatter */}
        <ellipse cx="20" cy="380" rx="14" ry="8" fill="#4caf50" transform="rotate(-18 20 380)" />
        <ellipse cx="26" cy="420" rx="11" ry="6" fill="#66bb6a" transform="rotate(22 26 420)" />
        <ellipse cx="16" cy="460" rx="10" ry="5.5" fill="#81c784" transform="rotate(-10 16 460)" />
        <ellipse cx="28" cy="500" rx="9" ry="5" fill="#a5d6a7" transform="rotate(15 28 500)" />
        {/* Right edge scatter */}
        <ellipse cx="1420" cy="340" rx="14" ry="8" fill="#4caf50" transform="rotate(18 1420 340)" />
        <ellipse cx="1414" cy="380" rx="11" ry="6" fill="#66bb6a" transform="rotate(-22 1414 380)" />
        <ellipse cx="1424" cy="420" rx="10" ry="5.5" fill="#81c784" transform="rotate(10 1424 420)" />
        <ellipse cx="1412" cy="460" rx="9" ry="5" fill="#a5d6a7" transform="rotate(-15 1412 460)" />
        {/* Top area — left of hero */}
        <ellipse cx="185" cy="72" rx="13" ry="7.5" fill="#43a047" transform="rotate(-14 185 72)" />
        <ellipse cx="225" cy="58" rx="10" ry="6" fill="#66bb6a" transform="rotate(28 225 58)" />
        <ellipse cx="262" cy="78" rx="9" ry="5" fill="#81c784" transform="rotate(-8 262 78)" />
        {/* Top area — right */}
        <ellipse cx="1215" cy="68" rx="13" ry="7.5" fill="#43a047" transform="rotate(14 1215 68)" />
        <ellipse cx="1175" cy="55" rx="10" ry="6" fill="#66bb6a" transform="rotate(-28 1175 55)" />
        <ellipse cx="1148" cy="80" rx="9" ry="5" fill="#81c784" transform="rotate(8 1148 80)" />
        {/* Bottom area */}
        <ellipse cx="265" cy="856" rx="13" ry="7.5" fill="#66bb6a" transform="rotate(10 265 856)" />
        <ellipse cx="310" cy="870" rx="10" ry="5.5" fill="#81c784" transform="rotate(-18 310 870)" />
        <ellipse cx="1190" cy="852" rx="13" ry="7.5" fill="#66bb6a" transform="rotate(-10 1190 852)" />
        <ellipse cx="1148" cy="866" rx="10" ry="5.5" fill="#81c784" transform="rotate(18 1148 866)" />
      </svg>
    </div>
  );
}

/* ─── Animated 3D Globe Hero Element ─────────────────────────── */
function GlobeHero() {
  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: 380, height: 380 }}>

      {/* Deep ambient glow — two-layer */}
      <div
        className="absolute inset-0 rounded-full animate-pulse-glow"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(15,175,122,0.22) 0%, rgba(16,185,129,0.08) 45%, transparent 70%)',
          filter: 'blur(28px)',
        }}
      />
      <div
        className="absolute rounded-full animate-pulse-glow"
        style={{
          width: 420, height: 420, top: -20, left: -20,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(20,184,166,0.10) 0%, transparent 65%)',
          filter: 'blur(40px)',
          animationDelay: '2s',
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

      {/* Extra innermost pulsing ring */}
      <div
        className="absolute rounded-full border border-emerald-400/30 animate-orbit-reverse"
        style={{ width: 144, height: 144, animationDuration: '9s' }}
      />

      {/* ── Central 3D Globe ──────────────────────────── */}
      <div className="relative z-10 animate-float" style={{ animationDuration: '7s' }}>
        {/* Globe shadow */}
        <div
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-28 h-5 rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.30) 0%, transparent 70%)', filter: 'blur(8px)' }}
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
          {/* Second highlight shimmer */}
          <div
            className="absolute top-2 left-8 w-5 h-4 rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.60) 0%, transparent 70%)' }}
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
      {/* New chip: CO₂ offset */}
      <div
        className="absolute top-16 left-4 animate-float text-[11px] font-bold px-3 py-1.5 rounded-full"
        style={{
          animationDuration: '7s',
          animationDelay: '2s',
          background: 'rgba(255,255,255,0.92)',
          border: '1px solid rgba(52,211,153,0.35)',
          boxShadow: '0 2px 0 rgba(4,120,87,0.12), 0 6px 20px rgba(16,185,129,0.15)',
          color: '#065f46',
        }}
      >
        🌿 +85 trees saved
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
    <div
      className="relative overflow-hidden pt-16 min-h-screen home-bg-gradient"
      style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #E8F5E9 45%, #C8E6C9 100%)',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* ── Subtle nature background (trees, leaves at corners/edges) ── */}
      <NatureBackground />

      {/* Floating eco decorative particles (very low opacity) */}
      <div className="eco-particle" style={{ width: 180, height: 180, top: '22%', left: '5%', animationDelay: '0s',   animationDuration: '14s', opacity: 0.06 }} />
      <div className="eco-particle" style={{ width: 120, height: 120, top: '55%', right: '8%', animationDelay: '4s',  animationDuration: '11s', opacity: 0.05 }} />
      <div className="eco-particle" style={{ width: 220, height: 220, top: '75%', left: '50%', animationDelay: '7s', animationDuration: '16s', opacity: 0.04 }} />

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

            {/* CTAs — enhanced prominence */}
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up delay-300 justify-center lg:justify-start">
              {/* Primary CTA with pulse ring */}
              <div className="relative inline-flex">
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg,#10b981,#059669)',
                    filter: 'blur(10px)',
                    opacity: 0.45,
                    animation: 'ctaPulse 2.8s ease-in-out infinite',
                    transform: 'scale(1.05)',
                  }}
                />
                <Link
                  to="/calculate"
                  className="relative flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-black text-white btn-3d-primary group"
                >
                  <Leaf className="w-5 h-5" />
                  <span>Calculate My Footprint</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 animate-bounce-caret" />
                </Link>
              </div>
              <Link
                to="/what-if"
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-semibold text-slate-700 btn-3d-secondary"
              >
                <Sliders className="w-5 h-5 text-emerald-600" />
                <span>Explore What-If</span>
              </Link>
            </div>

            {/* Trust micro-stats row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 animate-fade-in-up delay-500 justify-center lg:justify-start">
              {[
                { icon: '🌿', label: '1,250+ users tracked' },
                { icon: '📉', label: 'Avg −7.9% CO₂/mo' },
                { icon: '🔒', label: 'Privacy-safe' },
              ].map(({ icon, label }) => (
                <span key={label} className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <span>{icon}</span>
                  <span>{label}</span>
                </span>
              ))}
            </div>

            {/* Philosophy — upgraded icon cards */}
            <div className="animate-fade-in-up delay-400">
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {[
                  { label: 'TRACK',      icon: Car,        desc: 'Log transport, energy, food & waste',   color: '#0FAF7A', bg: 'rgba(15,175,122,0.08)' },
                  { label: 'UNDERSTAND', icon: Compass,    desc: 'See your biggest carbon contributors',  color: '#0d9488', bg: 'rgba(13,148,136,0.08)' },
                  { label: 'REDUCE',     icon: TrendingDown, desc: 'Simulate changes & shrink footprint', color: '#059669', bg: 'rgba(5,150,105,0.08)' },
                ].map(({ label, icon: Icon, desc, color, bg }, i) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl flex-1 min-w-[140px]"
                    style={{
                      background: 'rgba(255,255,255,0.88)',
                      border: `1px solid ${color}22`,
                      boxShadow: `0 2px 8px ${color}18, inset 0 1px 0 rgba(255,255,255,0.9)`,
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: bg, border: `1px solid ${color}30` }}
                    >
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black tracking-widest uppercase" style={{ color }}>{label}</p>
                      <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
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
        className="py-20 relative"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(240,253,244,0.55) 25%, rgba(221,247,234,0.40) 50%, rgba(240,253,244,0.55) 75%, rgba(255,255,255,0) 100%)',
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

      {/* ══════════════════ MAKE EVERY CHOICE COUNT ══════════════════ */}
      <section
        aria-label="Sustainability call to action"
        className="pb-24 pt-4"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealCard>
            <div
              className="rounded-3xl p-8 sm:p-12 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(232,245,233,0.90) 60%, rgba(200,230,201,0.60) 100%)',
                border: '1px solid rgba(76,175,80,0.25)',
                boxShadow: '0 20px 60px -15px rgba(46,125,50,0.12), inset 0 1px 0 rgba(255,255,255,1)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                <div className="max-w-2xl space-y-4 text-center lg:text-left">
                  {/* Eyebrow */}
                  <span
                    className="text-xs font-black uppercase tracking-[0.22em] block"
                    style={{ color: '#2e7d32' }}
                  >
                    Sustainability Starts Here
                  </span>

                  {/* Main Heading */}
                  <h2
                    className="text-3xl sm:text-4xl font-black tracking-tight leading-[1.1]"
                    style={{ color: '#0f172a' }}
                  >
                    Make Every{' '}
                    <span
                      style={{
                        background: 'linear-gradient(135deg, #2e7d32 0%, #10b981 50%, #059669 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      Choice
                    </span>
                    {' '}Count.
                  </h2>

                  {/* Description */}
                  <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                    Every commute, every meal, every habit shapes the planet's future. CarbonLens
                    translates your daily routine into measurable CO₂ data — then shows you the{' '}
                    <span className="font-semibold" style={{ color: '#2e7d32' }}>
                      exact changes that matter most
                    </span>.
                    Take the first step toward a lighter footprint today.
                  </p>

                  {/* Stat pills */}
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2">
                    {[
                      { value: '1,250+', label: 'Users Tracked' },
                      { value: '−7.9%', label: 'Avg Monthly CO₂' },
                      { value: '4 min',  label: 'To Complete' },
                    ].map(({ value, label }) => (
                      <div
                        key={label}
                        className="flex flex-col items-center px-4 py-2.5 rounded-2xl"
                        style={{
                          background: 'rgba(255,255,255,0.9)',
                          border: '1px solid rgba(76,175,80,0.20)',
                          boxShadow: '0 2px 8px rgba(46,125,50,0.08)',
                          minWidth: 80,
                        }}
                      >
                        <span className="text-lg font-black" style={{ color: '#2e7d32' }}>{value}</span>
                        <span className="text-[10px] font-semibold text-slate-500 mt-0.5">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right CTA */}
                <div className="flex flex-col items-center flex-shrink-0 space-y-3">
                  <div className="relative inline-flex">
                    <div
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: 'linear-gradient(135deg,#2e7d32,#10b981)',
                        filter: 'blur(12px)',
                        opacity: 0.40,
                        animation: 'ctaPulse 2.8s ease-in-out infinite',
                      }}
                    />
                    <Link
                      to="/calculate"
                      className="relative flex items-center gap-2.5 px-8 py-4 rounded-xl text-base font-black text-white btn-3d-primary group"
                    >
                      <Leaf className="w-5 h-5" />
                      <span>Calculate Your Footprint</span>
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    Free, private, and takes under 4 minutes.
                  </p>
                </div>
              </div>
            </div>
          </RevealCard>
        </div>
      </section>

    </div>
  );
}

