import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const getStrength = (val) => {
  let score = 0;
  if (val.length >= 6) score++;
  if (val.length >= 10) score++;
  if (/[A-Z]/.test(val) && /[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;
  return score;
};

const strengthMeta = [
  { label: 'Enter password', color: 'bg-[#dce9ff]' },
  { label: 'Weak password',  color: 'bg-[#ba1a1a]' },
  { label: 'Fair password',  color: 'bg-[#565e74]' },
  { label: 'Good password',  color: 'bg-[#00652c]' },
  { label: 'Strong password', color: 'bg-[#00652c]' },
];

export default function RegisterForm() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);

  const strengthScore = formData.password.length === 0 ? 0 : getStrength(formData.password);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Name cannot exceed 50 characters';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!agreed) {
      newErrors.agreed = 'You must agree to the terms';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await register({
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
    });
    setIsSubmitting(false);
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const meta = strengthMeta[strengthScore];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Full Name */}
      <div>
        <label className="block text-xs font-medium text-[#0b1c30] mb-1.5" htmlFor="reg-name">
          Full Name
        </label>
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3.5 text-[#565e74] text-[20px] pointer-events-none">person</span>
          <input
            id="reg-name"
            type="text"
            placeholder="Hithesh Amin"
            autoComplete="name"
            required
            value={formData.name}
            onChange={handleChange('name')}
            className={`w-full h-11 pl-11 pr-4 bg-[#eff4ff] focus:bg-white rounded-lg text-sm text-[#0b1c30] placeholder:text-[#6f7a6e] transition-all duration-150 outline-none focus:shadow-md focus:shadow-[#00652c]/10 focus:ring-2 focus:ring-[#00652c]/20 ${errors.name ? 'ring-2 ring-[#ba1a1a]' : ''}`}
          />
        </div>
        {errors.name && <p className="text-[11px] text-[#ba1a1a] mt-1 pl-1">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-medium text-[#0b1c30] mb-1.5" htmlFor="reg-email">
          Email address
        </label>
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3.5 text-[#565e74] text-[20px] pointer-events-none">mail</span>
          <input
            id="reg-email"
            type="email"
            placeholder="hithesh@routine.studio"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange('email')}
            className={`w-full h-11 pl-11 pr-4 bg-[#eff4ff] focus:bg-white rounded-lg text-sm text-[#0b1c30] placeholder:text-[#6f7a6e] transition-all duration-150 outline-none focus:shadow-md focus:shadow-[#00652c]/10 focus:ring-2 focus:ring-[#00652c]/20 ${errors.email ? 'ring-2 ring-[#ba1a1a]' : ''}`}
          />
        </div>
        {errors.email && <p className="text-[11px] text-[#ba1a1a] mt-1 pl-1">{errors.email}</p>}
      </div>

      {/* Password + Strength */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-medium text-[#0b1c30]" htmlFor="reg-password">
            Create Password
          </label>
          <span className={`text-[11px] font-medium ${strengthScore >= 3 ? 'text-[#00652c]' : strengthScore === 2 ? 'text-[#565e74]' : strengthScore === 1 ? 'text-[#ba1a1a]' : 'text-[#6f7a6e]'}`}>
            {meta.label}
          </span>
        </div>
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3.5 text-[#565e74] text-[20px] pointer-events-none">lock</span>
          <input
            id="reg-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••••••"
            autoComplete="new-password"
            required
            value={formData.password}
            onChange={handleChange('password')}
            className={`w-full h-11 pl-11 pr-11 bg-[#eff4ff] focus:bg-white rounded-lg text-sm text-[#0b1c30] placeholder:text-[#6f7a6e] transition-all duration-150 outline-none focus:shadow-md focus:shadow-[#00652c]/10 focus:ring-2 focus:ring-[#00652c]/20 ${errors.password ? 'ring-2 ring-[#ba1a1a]' : ''}`}
          />
          <button
            type="button"
            aria-label="Toggle password visibility"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3.5 p-1 rounded hover:bg-[#dce9ff] transition-colors flex items-center justify-center text-[#565e74] hover:text-[#0b1c30]"
          >
            <span className="material-symbols-outlined text-[18px]">
              {showPassword ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        </div>

        {/* Strength bars */}
        <div className="mt-2 grid grid-cols-4 gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${i < strengthScore ? meta.color : 'bg-[#dce9ff]'}`}
            />
          ))}
        </div>
        {errors.password && <p className="text-[11px] text-[#ba1a1a] mt-1 pl-1">{errors.password}</p>}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-xs font-medium text-[#0b1c30] mb-1.5" htmlFor="reg-confirm-password">
          Confirm Password
        </label>
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3.5 text-[#565e74] text-[20px] pointer-events-none">lock</span>
          <input
            id="reg-confirm-password"
            type="password"
            placeholder="Re-enter your password"
            autoComplete="new-password"
            required
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
            className={`w-full h-11 pl-11 pr-4 bg-[#eff4ff] focus:bg-white rounded-lg text-sm text-[#0b1c30] placeholder:text-[#6f7a6e] transition-all duration-150 outline-none focus:shadow-md focus:shadow-[#00652c]/10 focus:ring-2 focus:ring-[#00652c]/20 ${errors.confirmPassword ? 'ring-2 ring-[#ba1a1a]' : ''}`}
          />
        </div>
        {errors.confirmPassword && <p className="text-[11px] text-[#ba1a1a] mt-1 pl-1">{errors.confirmPassword}</p>}
      </div>

      {/* Terms checkbox */}
      <div className="pt-1">
        <label className="flex items-start gap-3 cursor-pointer select-none group">
          <div className="relative flex items-center justify-center mt-0.5">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="peer sr-only"
            />
            <div className="w-5 h-5 rounded bg-[#dce9ff] peer-checked:bg-[#15803d] transition-colors duration-150 flex items-center justify-center">
              <span className={`material-symbols-outlined text-[16px] text-white transition-transform duration-150 ${agreed ? 'scale-100' : 'scale-0'}`}>check</span>
            </div>
          </div>
          <span className="text-xs text-[#565e74] leading-relaxed">
            I agree to the{' '}
            <a href="#" className="text-[#0b1c30] font-semibold underline decoration-[#00652c]/40 underline-offset-2 hover:text-[#00652c] transition-colors">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="text-[#0b1c30] font-semibold underline decoration-[#00652c]/40 underline-offset-2 hover:text-[#00652c] transition-colors">Privacy Policy</a>.
          </span>
        </label>
        {errors.agreed && <p className="text-[11px] text-[#ba1a1a] mt-1 pl-1">{errors.agreed}</p>}
      </div>

      {/* Submit CTA */}
      <div className="pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 rounded-lg bg-[#15803d] text-white font-semibold text-[15px] flex items-center justify-center gap-2 shadow-md shadow-[#15803d]/20 hover:opacity-95 active:scale-[0.99] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
              <span>Creating your sanctuary...</span>
            </>
          ) : (
            <>
              <span>Create Account</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
