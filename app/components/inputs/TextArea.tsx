'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface TextAreaProps {
  id: string;
  label: string;
  cols?: number;
  rows?: number;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const TextArea = ({
  id,
  label,
  cols,
  rows,
  disabled,
  required,
  register,
  errors,
}: TextAreaProps) => {
  return (
    <div className='w-full relative'>
      <label
        className={`
          text-md
          duration-150 
          transform 
          -translate-y-3 
          top-5 
          z-10 
          origin-[0] 
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}>
        {label}
      </label>
      <textarea
        cols={cols || 30}
        rows={rows || 10}
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=' '
        className={`
          p-2
          peer
          w-full
          font-light
          bg-white
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled-cursor-not-allowed
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        `}></textarea>
    </div>
  );
};

export default TextArea;
