'use client';

import { useModal } from '@/app/hooks/useModal';
import React, { useEffect, useRef } from 'react';

const Modal = () => {
  const { isOpen, content, closeModal } = useModal();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      document.body.classList.add('overflow-hidden');
    } else {
      dialog.close();
      document.body.classList.remove('overflow-hidden');
    }
  }, [isOpen]);

  const onClose = () => {
    closeModal();
    if (content?.onCancel) {
      content.onCancel();
    }
  };

  const onConfirm = () => {
    closeModal();
    if (content?.onConfirm) {
      content.onConfirm();
    }
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
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
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
  }, [isOpen, onClose]);

  return (
    <dialog ref={dialogRef} data-model className='bg-white rounded-lg p-4 max-w-sm mx-auto'>
      <h2
        className={`text-lg font-bold ${
          content.variant === 'danger' ? 'text-red-600' : 'text-black'
        }`}>
        {content.title}
      </h2>
      <p className='mt-2'>{content.description}</p>
      <div className='flex justify-end mt-4'>
        <button
          className='bg-gray-200 hover:bg-gray-300 text-black rounded px-4 py-2 mr-2'
          onClick={onClose}>
          {content.cancelLabel}
        </button>
        <button
          className={`hover:bg-opacity-90 rounded px-4 py-2 ${
            content.variant === 'danger' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'
          }`}
          onClick={onConfirm}>
          {content.confirmLabel}
        </button>
      </div>
    </dialog>
  );
};

export default Modal;
