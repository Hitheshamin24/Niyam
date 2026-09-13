import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function LoginForm() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await login({ email: formData.email.trim(), password: formData.password });
    setIsSubmitting(false);
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email */}
      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-[#0b1c30]" htmlFor="login-email">
          Email address
        </label>
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-[18px] text-[#3f493f] pointer-events-none">mail</span>
          <input
            id="login-email"
            type="email"
            placeholder="you@domain.com"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange('email')}
            className={`w-full h-[42px] pl-10 pr-3 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-sm placeholder:text-[#6f7a6e]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00652c]/20 transition-colors ${errors.email ? 'ring-2 ring-[#ba1a1a]' : ''}`}
          />
        </div>
        {errors.email && <p className="text-[11px] text-[#ba1a1a] pl-1">{errors.email}</p>}
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-medium text-[#0b1c30]" htmlFor="login-password">
            Password
          </label>
          <a href="#" className="text-xs font-medium text-[#00652c] hover:underline">
            Forgot password?
          </a>
        </div>
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-[18px] text-[#3f493f] pointer-events-none">lock</span>
          <input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••••••"
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={handleChange('password')}
            className={`w-full h-[42px] pl-10 pr-10 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-sm placeholder:text-[#6f7a6e]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00652c]/20 transition-colors ${errors.password ? 'ring-2 ring-[#ba1a1a]' : ''}`}
          />
          <button
            type="button"
            aria-label="Toggle password visibility"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-2.5 p-1 rounded-md text-[#3f493f] hover:text-[#0b1c30] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">
              {showPassword ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        </div>
        {errors.password && <p className="text-[11px] text-[#ba1a1a] pl-1">{errors.password}</p>}
      </div>

      {/* Remember me */}
      <div className="flex items-center gap-2 pt-1">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <div className="relative flex items-center">
            <input id="remember" type="checkbox" className="peer sr-only" defaultChecked />
            <div className="w-5 h-5 rounded bg-[#eff4ff] peer-checked:bg-[#00652c] transition-colors flex items-center justify-center shadow-inner">
              <span className="material-symbols-outlined text-[16px] text-white opacity-0 peer-checked:opacity-100 transition-opacity">check</span>
            </div>
          </div>
          <span className="text-xs text-[#3f493f]">Keep me signed in for 30 days</span>
        </label>
      </div>

      {/* Submit */}
      <div className="pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-[44px] rounded-lg bg-[#15803d] text-white font-semibold text-[15px] hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
              <span>Entering sanctuary...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
