import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import { Leaf, Lock, User, ArrowRight, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) { setError('Please enter your username and password.'); return; }
    setLoading(true); setError('');
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.friendlyMessage || 'Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async () => {
    setLoading(true); setError('');
    try {
      try { await login('demouser', 'password123'); }
      catch {
        await api.post('/auth/register', { username: 'demouser', email: 'demo@carbonlens.org', password: 'password123', displayName: 'Campus Demo User' });
        await login('demouser', 'password123');
      }
      navigate('/dashboard');
    } catch {
      setError('Failed to initiate demo login. Please sign up a new account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center relative overflow-hidden"
    >
      {/* Floating background blobs */}
      <div className="fixed top-20 left-1/4 w-80 h-80 rounded-full pointer-events-none -z-10 animate-pulse-glow"
        style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="fixed bottom-20 right-1/4 w-64 h-64 rounded-full pointer-events-none -z-10"
        style={{ background: 'radial-gradient(ellipse, rgba(20,184,166,0.10) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="w-full max-w-md animate-scale-in">
        <div
          className="p-8 sm:p-10 rounded-3xl space-y-6"
          style={{
            background: 'rgba(255,255,255,0.90)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.80)',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 8px 10px rgba(0,0,0,0.04), 0 32px 80px -12px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,1), 0 0 0 1px rgba(52,211,153,0.06)',
          }}
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto"
              style={{
                background: 'linear-gradient(135deg, #10b981, #0d9488)',
                boxShadow: '0 4px 0 #047857, 0 12px 32px rgba(16,185,129,0.30), inset 0 1px 0 rgba(255,255,255,0.20)',
              }}
            >
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-2">Welcome Back</h2>
            <p className="text-xs text-slate-500">Sign in to access your footprint records and simulator scenarios.</p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl text-xs text-red-700"
              style={{ background: 'rgba(255,237,237,0.9)', border: '1px solid rgba(252,165,165,0.6)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Username or Email</label>
              <div className="relative">
                <input
                  type="text" value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="off"
                  className="w-full rounded-xl py-2.5 px-3.5 pl-10 text-sm text-slate-900 input-3d"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Password</label>
              <div className="relative">
                <input
                  type="password" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  className="w-full rounded-xl py-2.5 px-3.5 pl-10 text-sm text-slate-900 input-3d"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-bold text-white btn-3d-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div>
            <button
              type="button"
              onClick={handleQuickDemo}
              disabled={loading}
              className="w-full py-2.5 rounded-xl text-xs font-bold badge-3d text-emerald-800 btn-3d-secondary flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Quick Demo Sign In (1-Click)</span>
            </button>
          </div>

          <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>Don&apos;t have an account? </span>
            <Link to="/register" className="text-emerald-700 font-bold hover:underline">Create one now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
