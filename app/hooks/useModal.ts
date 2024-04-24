import { ReactNode } from 'react';
import { create } from 'zustand';
import { ModalProps, ModalVariants } from '../components/Modal/Modal';

interface ModalState {
  isOpen: boolean;
  content: ModalProps;
  node: React.ReactNode | null;
  openModal: (content: ModalState['content']) => void;
  openCustomModal: ({ node, onClose }: CustomModalProps) => void;
  closeModal: () => void;
  onClose: () => void;
}

interface CustomModalProps {
  node: React.ReactNode;
  onClose?: () => void;
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
  openCustomModal: ({ node, onClose }) => set(() => ({ isOpen: true, node, onClose })),
  closeModal: () =>
    set(() => ({
      isOpen: false,
    })),
  onClose: () => {},
}));
