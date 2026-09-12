import React, { useState, useEffect } from 'react';
import { WEEKDAYS } from '@/utils/constants';

const ICONS = [
  { id: 'eco', label: 'Leaf' },
  { id: 'star', label: 'Star' },
  { id: 'water_drop', label: 'Water' },
  { id: 'directions_run', label: 'Running' },
  { id: 'menu_book', label: 'Books' },
  { id: 'restaurant', label: 'Nutrition' },
  { id: 'favorite', label: 'Heart' },
  { id: 'pool', label: 'Swimming' },
  { id: 'fitness_center', label: 'Fitness' },
  { id: 'adjust', label: 'Target' },
  { id: 'sports_gymnastics', label: 'Agility' },
  { id: 'pedal_bike', label: 'Bicycle' },
  { id: 'bed', label: 'Sleep' },
  { id: 'sentiment_satisfied', label: 'Smile' },
  { id: 'wb_sunny', label: 'Sun' },
];

const COLORS = [
  { id: 'green', color: '#00652c', label: 'Emerald Green', bgClass: 'bg-primary' },
  { id: 'cyan', color: '#0284c7', label: 'Cyan Azure', bgClass: 'bg-sky-600' },
  { id: 'purple', color: '#7c3aed', label: 'Deep Purple', bgClass: 'bg-purple-600' },
  { id: 'orange', color: '#f59e0b', label: 'Amber Glow', bgClass: 'bg-amber-500' },
  { id: 'red', color: '#e11d48', label: 'Red Crimson', bgClass: 'bg-rose-600' },
  { id: 'teal', color: '#0d9488', label: 'Teal Mint', bgClass: 'bg-teal-600' },
  { id: 'indigo', color: '#334155', label: 'Indigo Slate', bgClass: 'bg-slate-700' },
];

export default function HabitFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) {
  const isEdit = Boolean(initialData);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Health',
    frequency: 'daily',
    weekdays: [],
    goalPerMonth: 30,
    color: '#00652c',
    icon: 'eco',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        category: initialData.category || 'Health',
        frequency: initialData.frequency || 'daily',
        weekdays: initialData.weekdays || [],
        goalPerMonth: initialData.goalPerMonth || 30,
        color: initialData.color || '#00652c',
        icon: initialData.icon || 'eco',
      });
    } else {
      setFormData({
        name: '',
        description: '',
        category: 'Health',
        frequency: 'daily',
        weekdays: [],
        goalPerMonth: 30,
        color: '#00652c',
        icon: 'eco',
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const toggleWeekday = (dayValue) => {
    setFormData((prev) => {
      const exists = prev.weekdays.includes(dayValue);
      const nextDays = exists
        ? prev.weekdays.filter((d) => d !== dayValue)
        : [...prev.weekdays, dayValue].sort();
      return { ...prev, weekdays: nextDays };
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Habit name is required';
    }
    if (formData.frequency === 'weekly' && formData.weekdays.length === 0) {
      newErrors.weekdays = 'Please select at least one day';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const success = await onSubmit(formData);
    setIsSubmitting(false);
    if (success) {
      onClose();
    }
  };

  const selectedIconObj = ICONS.find((i) => i.id === formData.icon) || ICONS[0];
  const selectedColorObj = COLORS.find((c) => c.color === formData.color) || COLORS[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-inverse-surface/40 backdrop-blur-sm transition-opacity duration-200 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-[540px] max-h-[92vh] overflow-y-auto bg-surface-container-lowest rounded-xl shadow-2xl p-6 sm:p-8 flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200 my-auto"
      >
        {/* Ambient Glow Decorator */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 relative">
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-wider text-primary font-semibold mb-1">
              Intentional Practice
            </span>
            <h2 className="text-[24px] font-bold text-on-surface leading-tight">
              {isEdit ? 'Edit Habit' : 'Create New Habit'}
            </h2>
            <p className="text-[14px] text-secondary mt-1">
              {isEdit
                ? 'Update your habit schedule and target'
                : 'Define a routine that you want to practice regularly'}
            </p>
          </div>
          <button
            aria-label="Close dialog"
            onClick={onClose}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-secondary hover:text-on-surface hover:bg-surface-container transition-all flex-shrink-0 cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Field 1: Habit Name */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold"
              htmlFor="habit-name"
            >
              Habit Name
            </label>
            <input
              id="habit-name"
              type="text"
              placeholder="e.g., Morning Meditation, 30m Workout"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              className="w-full h-11 px-4 rounded-lg bg-surface-container-low text-on-surface text-[14px] placeholder:text-secondary/60 focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all"
              autoFocus
            />
            {errors.name && (
              <p className="text-xs text-error font-medium">{errors.name}</p>
            )}
          </div>

          {/* Field 2: Description (Optional) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold"
                htmlFor="habit-description"
              >
                Description (Optional)
              </label>
              <span className="text-[11px] text-secondary font-medium">Purpose Anchor</span>
            </div>
            <textarea
              id="habit-description"
              rows={2}
              placeholder="Why is this habit important to you?"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-lg bg-surface-container-low text-on-surface text-[14px] placeholder:text-secondary/60 focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary resize-none transition-all"
            />
          </div>

          {/* Field 3: Two-column row (Category & Frequency) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold"
                htmlFor="habit-category"
              >
                Category
              </label>
              <div className="relative flex items-center">
                <select
                  id="habit-category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full h-11 px-4 pr-10 rounded-lg bg-surface-container-low text-on-surface text-[14px] appearance-none focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary cursor-pointer transition-all"
                >
                  <option value="Health">Health</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Learning">Learning</option>
                  <option value="Mindfulness">Mindfulness</option>
                  <option value="Nutrition">Nutrition</option>
                  <option value="Sleep">Sleep</option>
                  <option value="Social">Social</option>
                  <option value="Finance">Finance</option>
                  <option value="Other">Other</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 pointer-events-none text-secondary text-[20px]">
                  expand_more
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold"
                htmlFor="habit-frequency"
              >
                Frequency
              </label>
              <div className="relative flex items-center">
                <select
                  id="habit-frequency"
                  value={formData.frequency}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      frequency: e.target.value,
                      goalPerMonth: e.target.value === 'daily' ? 30 : 12,
                    })
                  }
                  className="w-full h-11 px-4 pr-10 rounded-lg bg-surface-container-low text-on-surface text-[14px] appearance-none focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary cursor-pointer transition-all"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 pointer-events-none text-secondary text-[20px]">
                  expand_more
                </span>
              </div>
            </div>
          </div>

          {/* If Weekly: Weekday Selection */}
          {formData.frequency === 'weekly' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
                Repeat on days
              </label>
              <div className="grid grid-cols-7 gap-1.5">
                {WEEKDAYS.map((day) => {
                  const isSelected = formData.weekdays.includes(day.value);
                  return (
                    <button
                      key={day.value}
                      type="button"
                      onClick={() => toggleWeekday(day.value)}
                      className={`h-9 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-primary text-on-primary shadow-xs'
                          : 'bg-surface-container-low text-secondary hover:bg-surface-container hover:text-on-surface'
                      }`}
                    >
                      {day.label}
                    </button>
                  );
                })}
              </div>
              {errors.weekdays && (
                <p className="text-xs text-error font-medium">{errors.weekdays}</p>
              )}
            </div>
          )}

          {/* Field 4: Choose Icon & Color */}
          <div className="flex flex-col gap-3 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
                Choose Icon & Color
              </span>
              <span className="text-[11px] text-primary font-medium">
                {selectedIconObj.label} • {selectedColorObj.label}
              </span>
            </div>

            {/* Selectable Icons Grid */}
            <div className="grid grid-cols-5 sm:grid-cols-8 gap-2 p-2.5 rounded-lg bg-surface-container-low/70">
              {ICONS.map((item) => {
                const isSelected = formData.icon === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={item.label}
                    onClick={() => setFormData({ ...formData, icon: item.id })}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-primary text-on-primary shadow-sm ring-2 ring-primary/30 scale-105'
                        : 'text-secondary hover:bg-surface-container hover:text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {item.id}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Circular Color Palette Choices */}
            <div className="flex items-center justify-between px-2 pt-1">
              {COLORS.map((swatch) => {
                const isSelected = formData.color === swatch.color;
                return (
                  <button
                    key={swatch.id}
                    type="button"
                    aria-label={swatch.label}
                    onClick={() => setFormData({ ...formData, color: swatch.color })}
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'ring-4 ring-primary/20 scale-110 shadow-sm'
                        : 'hover:scale-105 opacity-90 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: swatch.color }}
                  >
                    {isSelected && (
                      <span className="material-symbols-outlined text-[14px] text-white">
                        check
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Field 5: Monthly Goal Target Slider */}
          <div className="flex flex-col gap-2.5 p-4 rounded-xl bg-surface-container-low/60">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
                Monthly Goal Target
              </span>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/15 text-primary text-[12px] font-semibold">
                <span>{formData.goalPerMonth}</span>
                <span>days / month</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <input
                type="range"
                min="1"
                max="31"
                value={formData.goalPerMonth}
                onChange={(e) =>
                  setFormData({ ...formData, goalPerMonth: Number(e.target.value) })
                }
                className="w-full h-2 bg-outline-variant/40 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
              />
              <div className="flex items-center justify-between text-secondary text-[11px] px-1 font-medium">
                <span>Minimal (1d)</span>
                <span>Consistent (15d)</span>
                <span className="font-semibold text-primary">Unstoppable (30d)</span>
              </div>
            </div>
          </div>

          {/* Visual Preview Card */}
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/20">
            <div
              className="w-10 h-10 rounded-lg text-white flex items-center justify-center transition-colors shadow-xs"
              style={{ backgroundColor: formData.color }}
            >
              <span className="material-symbols-outlined text-[22px]">
                {formData.icon || 'eco'}
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[16px] font-semibold text-on-surface truncate">
                {formData.name.trim() || 'Morning Routine'}
              </span>
              <span className="text-[12px] text-secondary truncate">
                {formData.category} • {formData.frequency === 'daily' ? 'Daily' : 'Weekly'} •{' '}
                {formData.goalPerMonth} days targeted
              </span>
            </div>
            <div className="ml-auto flex items-center gap-1 text-primary text-[12px] font-semibold bg-primary/10 px-2.5 py-1 rounded-full">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Active</span>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="h-11 px-5 rounded-lg bg-transparent text-secondary hover:bg-surface-container hover:text-on-surface text-[14px] font-medium transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-11 px-6 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-[14px] font-medium shadow-sm transition-all flex items-center gap-2 active:scale-[0.98] cursor-pointer disabled:opacity-60"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isSubmitting ? 'progress_activity' : 'add_task'}
              </span>
              <span>{isEdit ? 'Save Changes' : 'Create Habit'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
