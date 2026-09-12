import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import BrandLogo from '@/components/ui/BrandLogo';

export default function Sidebar({ onClose }) {
  const { user, logout } = useAuth();

  const navItems = [
    {
      to: '/dashboard',
      label: 'Today',
      icon: 'check_circle',
      badge: 'Focus',
    },
    {
      to: '/habits',
      label: 'All Habits',
      icon: 'grid_view',
    },
    {
      to: '/analytics',
      label: 'Analytics',
      icon: 'bar_chart',
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-[230px] bg-surface-container-lowest border-r border-outline-variant/30 z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.02)]">
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="h-16 px-space-md flex items-center gap-space-sm border-b border-outline-variant/20">
          <BrandLogo className="h-8 w-auto object-contain" />
          <div className="flex flex-col min-w-0">
            <span className="text-[18px] text-on-surface leading-tight tracking-tight font-semibold">
              Niyam
            </span>
            <span className="text-[11px] text-on-surface-variant leading-none font-medium">
              Habit Routine
            </span>
          </div>
        </div>

        {/* Menu Navigation */}
        <div className="px-space-md pt-space-lg">
          <div className="px-space-xs mb-space-sm">
            <span className="text-[11px] tracking-wider uppercase text-on-surface-variant font-semibold">
              Menu
            </span>
          </div>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 transition-all duration-150 rounded-lg ${
                    isActive
                      ? 'bg-on-primary-container/40 text-primary font-semibold border-l-2 border-primary rounded-r-lg rounded-l-none'
                      : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface font-medium'
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px]">
                    {item.icon}
                  </span>
                  <span className="text-[14px]">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* User Info & Logout Strip */}
      <div className="p-space-md border-t border-outline-variant/20 bg-surface-container-lowest">
        <div className="flex items-center justify-between p-2 rounded-xl bg-surface-container-low/60 border border-outline-variant/20">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary text-[12px] font-semibold flex-shrink-0">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'H'}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[12px] font-semibold text-on-surface truncate leading-tight">
                {user?.name || 'Hithesh'}
              </span>
              <span className="text-[11px] text-on-surface-variant truncate leading-tight">
                {user?.email || 'user@example.com'}
              </span>
            </div>
          </div>
          <button
            onClick={logout}
            className="p-1 text-on-surface-variant hover:text-error hover:bg-surface-container-high rounded-md transition-colors flex-shrink-0 ml-1 cursor-pointer"
            title="Sign Out"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
