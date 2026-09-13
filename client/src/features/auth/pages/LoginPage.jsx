import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/LoginForm';
import BrandLogo from '@/components/ui/BrandLogo';

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] font-[Inter,sans-serif]">
      {/* Ambient glows */}
      <div className="fixed -top-32 -left-32 w-96 h-96 rounded-full bg-[#79db8d]/20 blur-3xl pointer-events-none" />
      <div className="fixed top-1/2 -right-40 w-[30rem] h-[30rem] rounded-full bg-[#d3e4fe]/60 blur-3xl pointer-events-none" />
      <div className="fixed -bottom-24 left-1/3 w-80 h-80 rounded-full bg-[#6bff8f]/20 blur-3xl pointer-events-none" />

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
              className="text-sm font-medium text-[#0b1c30] bg-[#dce9ff] px-3 py-1 rounded-lg"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="text-sm font-medium text-[#565e74] hover:text-[#0b1c30] transition-colors px-2 py-1"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 pt-16 relative">
        <div className="w-full relative overflow-hidden py-10 flex items-center justify-center min-h-[calc(100vh-8rem)]">
          <div className="w-full max-w-6xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-center gap-12">

            {/* Left column — philosophy */}
            <div className="hidden lg:flex flex-col max-w-md space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#eff4ff] text-[#00652c] shadow-sm self-start">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
                <span className="text-[11px] font-semibold tracking-widest uppercase">Neuroplastic Cadence</span>
              </div>

              <div className="space-y-4">
                <h2 className="text-[44px] font-semibold text-[#0b1c30] leading-[52px] tracking-tight">
                  Consistency compounds over{' '}
                  <span className="text-[#00652c] underline decoration-[#79db8d] decoration-4 underline-offset-8">
                    66 days
                  </span>.
                </h2>
                <p className="text-base text-[#3f493f] leading-relaxed">
                  True transformation lives not in monumental leaps, but in quiet, unbroken daily rituals designed to sustain cognitive calm.
                </p>
              </div>

              {/* Habit preview card */}
              <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#00652c]/10 flex items-center justify-center text-[#00652c]">
                      <span className="material-symbols-outlined text-[20px]">self_improvement</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0b1c30]">Vipassana Sit</p>
                      <p className="text-xs text-[#3f493f]">Morning • 20 mins</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-[#6bff8f]/30 text-[#005323] px-2 py-0.5 rounded-full text-[11px] font-semibold">
                    <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                    42 Day Streak
                  </div>
                </div>

                {/* Weekly rings */}
                <div className="pt-1 flex items-center justify-between">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <span className={`text-[11px] font-semibold ${i === 6 ? 'text-[#00652c]' : 'text-[#3f493f]'}`}>{day}</span>
                      {i < 6 ? (
                        <span className="w-6 h-6 rounded-full bg-[#00652c] flex items-center justify-center text-white">
                          <span className="material-symbols-outlined text-[14px]">check</span>
                        </span>
                      ) : (
                        <span className="w-6 h-6 rounded-full bg-[#dce9ff] flex items-center justify-center text-[#00652c] animate-pulse">
                          <span className="w-2 h-2 rounded-full bg-[#00652c]" />
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-4 pt-1">
                <div className="flex -space-x-2">
                  {[
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuAaqkl_k1d8PjiBGMsbIVt6FZQmJm7XM6Ig_CTSpJhvgee229qSBZ7_rpq2Fxv1dQY66GXltzbqDhQqkJiNF_Wp-nIlVYGjzap-t2CzTUPbDSjWVLM0HHXoWg5-jtcXThyniRWwJ_AHjybZJOt2iCKdIqudWT48upjw3t5FHHLZ6jfT92PLbhDEc1jc21cch3EH1CrInklsE3FqyCrIp-4Wam8sO42pu7rM2VVZUYSxzDk7D9tL9ZqMNQ',
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuAsqpoU4dTkjxqATRFjPcbHB73oSae06dBw89PNFeVZClLtXo-K7CAsbwLNqTRwxZmOuDIN7VFWsCvV1L9Yj-5n5oTlZA3UnoEJSlRSWYHJKSab4jZSDvZ-mJZz-BA5SolKzfDHUc9tlpUX16FyixmMP4OPxGOGCwNL6vWDVjVMwetUCwYocJPxm1rfU5m1PeDWJNZ9o281wClJOU0XljsfC-Cut_MAHGSrh_utZdgmaZRDzhEiSs6Lwg',
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuBhP8TQ1_O2EE0t7xxtSmHKJIsuAkM_YX2ODTHyMHYpXWdCgpuwTIEuclnZpQID8GW-ElZktHEZFwtkPCJ3DB-GdIfmJTQBCWQBjxH_UDIhWndcORHzR4-3J01hyRdoYT0tsrPEqrxkEN2BrreSuuoc7xXWR5C_ewERBFHqOYtkka7TG0c5tgUs4QJFrZ40SvIoOwPcsMWFFVQ4ki9cZcvR5hGrBvwul0-FN_IiTbTtj2_ug2hOZoBT1Q',
                  ].map((src, i) => (
                    <img key={i} src={src} alt="user" className="w-9 h-9 rounded-full object-cover shadow-sm ring-2 ring-white" />
                  ))}
                </div>
                <p className="text-sm text-[#3f493f]">
                  Joined by <span className="font-semibold text-[#0b1c30]">14,200+</span> daily routine architects.
                </p>
              </div>
            </div>

            {/* Right column — login card */}
            <div className="w-full max-w-md">
              <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 relative">
                {/* Card header */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#95f8a7]/30 text-[#005323] mb-3">
                    <span className="w-2 h-2 rounded-full bg-[#00652c]" />
                    <span className="text-[11px] font-semibold uppercase tracking-wide">Daily Routine Awaits</span>
                  </div>
                  <h1 className="text-[32px] font-semibold text-[#0b1c30] tracking-tight mt-1 leading-[40px]">
                    Sign in to Niyam
                  </h1>
                  <p className="text-xs text-[#3f493f] mt-1.5 max-w-xs mx-auto">
                    Continue building steady disciplines and tracking your daily habits.
                  </p>
                </div>

                <LoginForm />

                {/* Bottom switcher */}
                <div className="mt-6 text-center pt-4 bg-[#eff4ff]/50 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 pb-6 rounded-b-xl">
                  <p className="text-xs text-[#3f493f]">
                    Don't have an account?{' '}
                    <Link
                      to="/register"
                      className="text-sm font-semibold text-[#00652c] hover:underline ml-0.5"
                    >
                      Create an account
                    </Link>
                  </p>
                </div>
              </div>

              {/* Assurance */}
              <div className="mt-4 text-center flex items-center justify-center gap-2 text-[#3f493f]">
                <span className="material-symbols-outlined text-[15px]">verified_user</span>
                <span className="text-[11px] font-semibold tracking-wide">256-bit encrypted routine telemetry</span>
              </div>
            </div>
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
