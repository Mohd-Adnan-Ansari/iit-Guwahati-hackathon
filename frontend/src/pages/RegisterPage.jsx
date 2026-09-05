import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Leaf, Lock, User, Mail, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) { setError('Please fill out all required fields.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true); setError('');
    try {
      await register(username, email, password, displayName || username);
      navigate('/calculate');
    } catch (err) {
      setError(err.friendlyMessage || 'Failed to create account. Username or email may already be taken.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center relative overflow-hidden">
      {/* Floating blobs */}
      <div className="fixed top-16 right-1/3 w-96 h-96 rounded-full pointer-events-none -z-10 animate-pulse-glow"
        style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.10) 0%, transparent 70%)', filter: 'blur(48px)' }} />
      <div className="fixed bottom-10 left-1/4 w-64 h-64 rounded-full pointer-events-none -z-10"
        style={{ background: 'radial-gradient(ellipse, rgba(20,184,166,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="w-full max-w-md animate-scale-in">
        <div
          className="p-8 sm:p-10 rounded-3xl space-y-5"
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
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-2">Create Your Account</h2>
            <p className="text-xs text-slate-500">Join the campus decarbonization movement for AVINYA 2026.</p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl text-xs text-red-700"
              style={{ background: 'rgba(255,237,237,0.9)', border: '1px solid rgba(252,165,165,0.6)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {[
              { label: 'Full / Display Name', type: 'text', val: displayName, set: setDisplayName, ph: 'e.g. Priya Sharma', icon: null, required: false },
              { label: 'Username *', type: 'text', val: username, set: setUsername, ph: 'e.g. priya_iitg', icon: User, required: true },
              { label: 'Email Address *', type: 'email', val: email, set: setEmail, ph: 'e.g. priya@iitg.ac.in', icon: Mail, required: true },
              { label: 'Password * (min 6 characters)', type: 'password', val: password, set: setPassword, ph: '••••••••', icon: Lock, required: true },
            ].map(({ label, type, val, set, ph, icon: Icon, required }) => (
              <div key={label} className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">{label}</label>
                <div className="relative">
                  <input
                    type={type}
                    value={val}
                    onChange={(e) => set(e.target.value)}
                    placeholder={ph}
                    required={required}
                    className={`w-full rounded-xl py-2.5 px-3.5 text-sm text-slate-900 placeholder-slate-400 input-3d ${Icon ? 'pl-9' : ''}`}
                  />
                  {Icon && <Icon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />}
                </div>
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-xl text-sm font-bold text-white btn-3d-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Privacy note */}
          <div
            className="p-3 rounded-xl flex items-center gap-2 text-[11px] text-slate-500"
            style={{ background: 'rgba(240,253,244,0.7)', border: '1px solid rgba(52,211,153,0.20)' }}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Passwords are salted and hashed. Personal data is never sold or shared.</span>
          </div>

          <div className="text-center text-xs text-slate-500 pt-1 border-t border-slate-100">
            <span>Already have an account? </span>
            <Link to="/login" className="text-emerald-700 font-bold hover:underline">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
