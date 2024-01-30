'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
  id: string;
  label: string;
  type?: 'text' | 'password' | 'number';
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input = ({ id, label, type = 'text', disabled, required, register, errors }: InputProps) => {
  return (
    <div className='w-full mb-4'>
      <label
        className={`
          text-md
          ${errors[id] ? 'text-red-500' : 'text-zinc-400'}
        `}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=' '
        className={`
          peer
          w-full
          p-2
          font-light
          bg-white
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled-cursor-not-allowed 
          disabled:text-gray-400 
          disabled:bg-gray-200 
          ${errors[id] ? 'border-red-500' : 'border-neutral-200'}
          ${errors[id] ? 'focus:border-red-500' : 'focus:border-neutral-400'}
        `}
      />
    </div>
  );
};

export default Input;
