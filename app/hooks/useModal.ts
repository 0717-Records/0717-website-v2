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
  openModal: (content: Omit<ModalState['content'], 'isOpen'>) => void;
  closeModal: () => void;
}

export const useModal = create<ModalState>((set) => ({
  isOpen: false,
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
    })),
  closeModal: () =>
    set(() => ({
      isOpen: false,
    })),
}));
