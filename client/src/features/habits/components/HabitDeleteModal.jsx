import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';

export default function HabitDeleteModal({
  isOpen,
  onClose,
  habit,
  onConfirm,
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!habit) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    await onConfirm(habit._id);
    setIsDeleting(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Habit"
      maxWidth="max-w-sm"
    >
      <div className="text-center py-2">
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h4 className="text-base font-bold text-slate-900 mb-1">
          Are you sure?
        </h4>
        <p className="text-xs text-slate-500 mb-5 leading-relaxed">
          Deleting <span className="font-semibold text-slate-800">"{habit.name}"</span> will remove it from your active habits and archive its historical logs.
        </p>

        <div className="flex items-center justify-center gap-2.5">
          <Button variant="outline" size="md" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="danger"
            size="md"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete Habit
          </Button>
        </div>
      </div>
    </Modal>
  );
}
