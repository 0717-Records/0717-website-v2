'use client';

import useLockBodyScroll from '@/app/hooks/useLockBodyScroll';
import { useModal } from '@/app/hooks/useModal';
import React, { useEffect, useRef } from 'react';

export enum ModalVariants {
  Default,
  Warning,
}
// to add: Info, Success, Danger (or Error)

export interface ModalProps {
  title: string;
  variant?: ModalVariants;
  description: string | React.ReactNode;
  cancelLabel?: string;
  confirmLabel?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const Modal = () => {
  const { isOpen, content, node, closeModal } = useModal();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isBodyScrollLocked = useLockBodyScroll();

  const {
    title,
    variant = ModalVariants.Default,
    description,
    cancelLabel = 'Cancel',
    confirmLabel = 'Confirm',
    onCancel = () => {},
    onConfirm = () => {},
  } = content;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      isBodyScrollLocked(true);
    } else {
      dialog.close();
      isBodyScrollLocked(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    closeModal();
    onCancel();
  };

  const handleConfirm = () => {
    closeModal();
    onConfirm();
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleOutsideClick = (e: MouseEvent) => {
      const dialogDimensions = dialog.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        handleClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose();
    };

    if (isOpen) {
      dialog.addEventListener('click', handleOutsideClick);
      window.addEventListener('keydown', handleKeyDown);
    } else {
      dialog.removeEventListener('click', handleOutsideClick);
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      dialog.removeEventListener('click', handleOutsideClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  return (
    <dialog ref={dialogRef} data-model className='bg-transparent'>
      {node ? (
        node
      ) : (
        <div className='bg-white rounded-lg p-4 max-w-sm mx-auto'>
          <h2
            className={`text-lg font-bold ${
              variant === ModalVariants.Warning ? 'text-red-600' : 'text-black'
            }`}>
            {title}
          </h2>
          <p className='mt-2'>{description}</p>
          <div className='flex justify-end mt-4'>
            <button
              className='bg-gray-200 hover:bg-gray-300 text-black rounded px-4 py-2 mr-2'
              onClick={handleClose}>
              {cancelLabel}
            </button>
            <button
              className={`hover:bg-opacity-90 rounded px-4 py-2 ${
                variant === ModalVariants.Warning
                  ? 'bg-red-600 text-white'
                  : 'bg-blue-600 text-white'
              }`}
              onClick={handleConfirm}>
              {confirmLabel}
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
};

export default Modal;
