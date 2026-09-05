import { Link } from 'react-router-dom';
import { Leaf, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.6)',
        boxShadow: '0 -8px 32px -8px rgba(16,185,129,0.06), 0 -1px 0 rgba(226,232,240,0.6)',
        position: 'relative',
      }}
    >
      {/* Subtle top green gradient accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.30) 30%, rgba(20,184,166,0.30) 70%, transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-3 group">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center group-hover:-translate-y-0.5 transition-transform"
                style={{
                  background: 'linear-gradient(135deg, #10b981, #0d9488)',
                  boxShadow: '0 2px 0 #047857, 0 4px 12px rgba(16,185,129,0.25)',
                }}
              >
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span
                className="text-lg font-bold"
                style={{
                  background: 'linear-gradient(135deg, #065f46, #0d9488)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                CarbonLens
              </span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed">
              Track. Understand. Reduce.<br />
              Your campus and urban carbon footprint calculator.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">Platform</h4>
            <ul className="space-y-2">
              {[
                { to: '/calculate', label: 'Calculator' },
                { to: '/what-if', label: 'What-If Simulator' },
                { to: '/campus', label: 'Campus Analytics' },
                { to: '/challenges', label: 'Challenges' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-xs text-slate-600 hover:text-emerald-700 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Methodology */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">Methodology</h4>
            <ul className="space-y-2">
              {[
                { to: '/how-it-works', label: 'How It Works' },
                { to: '/how-it-works', label: 'Accounting Framework' },
                { to: '/how-it-works', label: 'Emission Factor Data' },
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.to} className="text-xs text-slate-600 hover:text-emerald-700 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">About</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong className="text-emerald-700 font-semibold">CarbonLens</strong><br />
              Urban Carbon Footprint Calculator<br />
              Track &bull; Understand &bull; Reduce
            </p>
            <p className="text-xs text-slate-400 mt-2">Measure your daily emissions and discover personalized ways to reduce your carbon footprint.</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-slate-100/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; 2026 CarbonLens. Urban Carbon Footprint Calculator.
          </p>
          <p className="text-xs text-slate-500 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-emerald-600 fill-emerald-600" /> for a sustainable future
          </p>
        </div>

        {/* Privacy note */}
        <div
          className="mt-4 p-3 rounded-xl text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(240,253,244,0.7), rgba(236,253,245,0.5))',
            border: '1px solid rgba(52,211,153,0.20)',
          }}
        >
          <p className="text-[11px] text-slate-600 leading-relaxed">
            🔒 <strong>Privacy First:</strong> Individual personal activity data is strictly confidential.
            Campus benchmarks use aggregated calculations only. Passwords are salted and hashed.
          </p>
        </div>
      </div>
    </footer>
  );
}
