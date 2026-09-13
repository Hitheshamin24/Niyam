import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import RegisterForm from '../components/RegisterForm';
import BrandLogo from '@/components/ui/BrandLogo';

export default function RegisterPage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] font-[Inter,sans-serif]">
      {/* Ambient glows */}
      <div className="fixed top-12 -left-20 w-96 h-96 rounded-full bg-[#00652c]/5 blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 -right-20 w-96 h-96 rounded-full bg-[#dae2fd]/30 blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#f8f9ff]/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 max-w-7xl mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrandLogo className="h-8 w-8" />
            <span className="text-lg font-semibold text-[#0b1c30] tracking-tight">Niyam</span>
          </div>
          <nav className="hidden sm:flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-[#565e74] hover:text-[#0b1c30] transition-colors px-2 py-1"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="text-sm font-medium text-[#0b1c30] bg-[#dce9ff] px-3 py-1 rounded-lg"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 pt-16 flex items-center justify-center py-10 px-4 relative">
        <div className="relative w-full max-w-xl mx-auto">

          {/* Card */}
          <div className="bg-white rounded-xl shadow-xl shadow-[#006d30]/5 p-6 sm:p-8">

            {/* Header */}
            <div className="text-center flex flex-col items-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00652c]/10 text-[#00652c] mb-4">
                <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
                <span className="text-[11px] font-semibold tracking-widest uppercase">Start Your 30-Day Ritual</span>
              </div>
              <h1 className="text-[32px] font-semibold text-[#0b1c30] tracking-tight leading-[40px]">
                Create your Niyam account
              </h1>
              <p className="text-sm text-[#565e74] mt-1 max-w-md">
                Design deliberate daily habits and master personal consistency.
              </p>
            </div>

            {/* Register Form */}
            <RegisterForm />

            {/* Reassurance badge */}
            <div className="mt-6 p-3 rounded-lg bg-[#eff4ff] flex items-center justify-center gap-2 text-center">
              <span className="text-sm">✨</span>
              <span className="text-xs font-medium text-[#565e74]">Free forever plan • No credit card required</span>
            </div>

            {/* Switch to login */}
            <div className="mt-4 text-center">
              <p className="text-sm text-[#565e74]">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-sm font-semibold text-[#00652c] hover:underline underline-offset-4 ml-0.5 transition-all"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>

          {/* Preview cards */}
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {[
              { icon: 'wb_twilight', title: 'Morning Core', desc: 'Mindful awakenings' },
              { icon: 'self_improvement', title: 'Deep Focus', desc: 'Frictionless flow' },
              { icon: 'nights_stay', title: 'Evening Calm', desc: 'Restorative wind-down' },
            ].map((item) => (
              <div key={item.title} className="p-3 rounded-lg bg-[#eff4ff]/70">
                <span className="material-symbols-outlined text-[#00652c] text-[20px] mb-1">{item.icon}</span>
                <p className="text-[11px] font-semibold text-[#0b1c30]">{item.title}</p>
                <p className="text-[11px] text-[#565e74]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#f8f9ff] py-6 shadow-[0_-1px_8px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[#3f493f]">© 2024 Niyam Routines. Ambient discipline.</p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Assistance'].map((label) => (
              <a key={label} href="#" className="text-xs text-[#3f493f] hover:text-[#0b1c30] transition-colors">
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
