import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Menu, X, Leaf, Bell, LogOut, ChevronDown } from 'lucide-react';
import NotificationPanel from './NotificationPanel';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/calculate', label: 'Calculate' },
    { to: '/dashboard', label: 'Dashboard', auth: true },
    { to: '/what-if', label: 'What-If' },
    { to: '/progress', label: 'Progress', auth: true },
    { to: '/campus', label: 'Campus' },
    { to: '/challenges', label: 'Challenges' },
    { to: '/how-it-works', label: 'How It Works' },
  ];

  const visibleLinks = navLinks.filter((l) => !l.auth || isAuthenticated);
  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-xl border-b border-white/60 shadow-lg shadow-slate-200/60'
          : 'bg-white/75 backdrop-blur-md border-b border-white/50 shadow-md shadow-slate-100/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ─────────────────────────────────────── */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            {/* 3D logo mark */}
            <div className="relative w-9 h-9">
              <div
                className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center
                  shadow-lg shadow-emerald-500/30
                  group-hover:shadow-emerald-500/50 group-hover:-translate-y-0.5
                  transition-all duration-200"
                style={{
                  boxShadow: '0 2px 0 #047857, 0 6px 16px rgba(16,185,129,0.30), inset 0 1px 0 rgba(255,255,255,0.25)',
                }}
              >
                <Leaf className="w-5 h-5 text-white drop-shadow-sm" />
              </div>
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-xl ring-2 ring-emerald-400/0 group-hover:ring-emerald-400/30 transition-all duration-300" />
            </div>
            <span
              className="text-xl font-extrabold tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #065f46 0%, #0d9488 60%, #059669 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              CarbonLens
            </span>
          </Link>

          {/* ── Desktop Nav Links ─────────────────────────── */}
          <div className="hidden lg:flex items-center gap-0.5">
            {visibleLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive(link.to)
                    ? 'text-emerald-800 font-semibold'
                    : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/60'
                }`}
              >
                {isActive(link.to) && (
                  <span
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: 'rgba(240,253,244,0.90)',
                      border: '1px solid rgba(52,211,153,0.35)',
                      boxShadow: '0 1px 3px rgba(16,185,129,0.12), inset 0 1px 0 rgba(255,255,255,0.9)',
                    }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* ── Right Side ───────────────────────────────── */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => { setShowNotifs(!showNotifs); setShowProfile(false); }}
                    className="relative p-2 rounded-xl text-slate-500 hover:text-emerald-700 hover:bg-emerald-50/60 transition-colors"
                    aria-label="Notifications"
                  >
                    <Bell className="w-5 h-5" />
                    <span
                      className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white"
                      style={{ boxShadow: '0 0 4px rgba(16,185,129,0.6)' }}
                    />
                  </button>
                  {showNotifs && (
                    <div className="absolute right-0 mt-2 w-80 z-50">
                      <NotificationPanel onClose={() => setShowNotifs(false)} />
                    </div>
                  )}
                </div>

                {/* Profile dropdown */}
                <div className="relative">
                  <button
                    onClick={() => { setShowProfile(!showProfile); setShowNotifs(false); }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200/80 text-slate-700 hover:bg-slate-50/70 transition-all shadow-xs"
                    style={{ backdropFilter: 'blur(8px)' }}
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs text-white"
                      style={{
                        background: 'linear-gradient(135deg, #10b981, #0d9488)',
                        boxShadow: '0 1px 0 #047857, 0 2px 6px rgba(16,185,129,0.3)',
                      }}
                    >
                      {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="hidden sm:inline text-sm font-medium">
                      {user?.displayName || user?.username}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {showProfile && (
                    <div
                      className="absolute right-0 mt-2 w-52 rounded-2xl overflow-hidden z-50"
                      style={{
                        background: 'rgba(255,255,255,0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.7)',
                        boxShadow: '0 20px 60px -10px rgba(0,0,0,0.18), 0 4px 8px rgba(0,0,0,0.06)',
                      }}
                    >
                      <div className="p-3.5 border-b border-slate-100/80 bg-slate-50/60">
                        <p className="text-sm font-bold text-slate-900">{user?.displayName || user?.username}</p>
                        <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                      </div>
                      <button
                        onClick={() => { logout(); setShowProfile(false); }}
                        className="flex items-center gap-2 w-full px-3.5 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50/80 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/60 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all btn-3d-primary"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/60 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ──────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="lg:hidden border-t border-white/50"
          style={{
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="px-4 py-3 space-y-0.5">
            {visibleLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200/60'
                    : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {!isAuthenticated && (
              <div className="pt-3 border-t border-slate-100 flex gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 border border-slate-200 hover:bg-slate-50 btn-3d-secondary"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white btn-3d-primary"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
