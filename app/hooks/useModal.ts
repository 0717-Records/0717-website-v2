import { ReactNode } from 'react';
import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  content: {
    title: string;
    variant: 'default' | 'danger';
    description: string;
    cancelLabel: string;
    confirmLabel: string;
    onCancel: () => void;
    onConfirm: () => void;
  };
  node: React.ReactNode | null;
  openModal: (content: ModalState['content']) => void;
  openCustomModal: (node: ModalState['node']) => void;
  closeModal: () => void;
}

export const useModal = create<ModalState>((set) => ({
  isOpen: false,
  node: null,
  content: {
    title: '',
    variant: 'default',
    description: '',
    cancelLabel: 'Cancel',
    confirmLabel: 'Confirm',
    onCancel: () => {},
    onConfirm: () => {},
  },
  openModal: (content) =>
    set(() => ({
      isOpen: true,
      content,
      node: null,
    })),
  openCustomModal: (node: ReactNode) => set(() => ({ isOpen: true, node })),
  closeModal: () =>
    set(() => ({
      isOpen: false,
    })),
}));
