'use client';

import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Button from '../ui/Button';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal = ({
  isOpen = false,
  onClose = () => {},
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}: ModalProps) => {
  const [showModal, setShowModal] = useState<boolean>(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  // wrap in useCallback?
  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => onClose(), 300);
  };

  // wrap in useCallback?
  const handleSubmit = () => {
    if (disabled) return;
    onSubmit();
  };

  // wrap in useCallback?
  const handleSecondaryAction = () => {
    if (disabled || !secondaryAction) return;
    secondaryAction();
  };

  if (!isOpen) return;

  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none bg-neutral-800/70'>
        <div className='relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 mx-auto h-full lg:h-auto md:h-auto'>
          {/* CONTENT */}
          <div
            className={`translate duration-300 h-full 
              ${showModal ? 'translate-y-0' : 'translate-y-full'} 
              ${showModal ? 'opacity-100' : 'opacity-0'}`}>
            <div className='translate md:max-h-[90vh] h-full border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
              {/* HEADER */}
              <div className='flex items-center p-6 rounded-t justify-center relative border-b-[1px]'>
                <button
                  onClick={handleClose}
                  className='p-1 border-0 hover:opacity-70 transition absolute left-9'>
                  <IoMdClose size={18} />
                </button>
                <div className='text-lg font-semibold'>{title}</div>
              </div>
              <div className='overflow-y-auto'>
                {/* BODY */}
                <div className='relative p-6 flex-auto'>{body}</div>
                {/* FOOTER */}
                <div className='flex flex-col gap-2 p-6'>
                  <div className='flex flex-row items-center gap-4 w-full'>
                    {secondaryAction && secondaryActionLabel && (
                      <Button disabled={disabled} onClick={handleSecondaryAction} outline>
                        {secondaryActionLabel}
                      </Button>
                    )}
                    <Button disabled={disabled} onClick={handleSubmit}>
                      {actionLabel}
                    </Button>
                  </div>
                  {footer}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
