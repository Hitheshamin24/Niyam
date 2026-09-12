import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import HabitFormModal from '@/features/habits/components/HabitFormModal';
import { useHabits } from '@/features/habits/hooks/useHabits';

export default function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    isFormModalOpen,
    editingHabit,
    openCreateModal,
    closeFormModal,
    createHabit,
    updateHabit,
  } = useHabits();

  const handleHabitSubmit = async (formData) => {
    if (editingHabit) {
      const res = await updateHabit(editingHabit._id, formData);
      return res?.success;
    } else {
      const res = await createHabit(formData);
      return res?.success;
    }
  };

  return (
    <div className="bg-surface text-on-surface antialiased min-h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-[230px] h-full bg-surface-container-lowest z-10 shadow-2xl">
            <Sidebar onClose={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="lg:pl-[230px]">
        <Navbar
          onMenuToggle={() => setMobileMenuOpen((prev) => !prev)}
          onOpenNewHabitModal={openCreateModal}
        />

        <main className="w-full pt-16 bg-surface min-h-screen px-4 sm:px-space-lg py-space-lg">
          <Outlet />
        </main>
      </div>

      {/* Global Habit Creation / Edit Modal */}
      <HabitFormModal
        isOpen={isFormModalOpen}
        onClose={closeFormModal}
        onSubmit={handleHabitSubmit}
        initialData={editingHabit}
      />
    </div>
  );
}
