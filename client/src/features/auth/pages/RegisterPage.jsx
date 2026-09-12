import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import RegisterForm from '../components/RegisterForm';

export default function RegisterPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 p-4 sm:p-6">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-3xl mb-3 shadow-inner">
            🎯
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Niyam</h1>
          <p className="text-sm text-emerald-300/80 mt-1 font-medium">
            Build habits that shape your destiny.
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-7 sm:p-8 border border-white/20">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">Get Started</h2>
            <p className="text-xs text-slate-500 mt-1">
              Create your account to start building routines with Niyam.
            </p>
          </div>

          <RegisterForm onSwitchToLogin={() => navigate('/login')} />
        </div>

        {/* Footer tagline */}
        <p className="text-center text-xs text-slate-400/80 mt-6">
          Free, private, and designed for consistency.
        </p>
      </div>
    </div>
  );
}
