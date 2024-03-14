import { ReactNode } from 'react';
import { create } from 'zustand';
import { ModalProps, ModalVariants } from '../components/Modal/Modal';

interface ModalState {
  isOpen: boolean;
  content: ModalProps;
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
    description: '',
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
