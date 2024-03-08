// components/YesNoSwitch.tsx
import { useState } from 'react';

interface YesNoSwitchProps {
  label?: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
}

const YesNoSwitch: React.FC<YesNoSwitchProps> = ({
  label,
  value = false,
  onChange,
  disabled = false,
}) => {
  return (
    <div className='flex items-center space-x-3'>
      {label && <span className='text-lg w-28'>{label}</span>}
      <div
        className={`w-16 h-8 flex items-center rounded-full p-1 ${
          value ? 'bg-gray-500' : 'bg-gray-300'
        } ${disabled ? 'pointer-events-none' : 'cursor-pointer'}`}
        onClick={() => onChange?.(!value)}>
        <div
          className={`transform transition-all duration-300 ${
            value ? 'translate-x-8' : 'translate-x-0'
          } w-6 h-6 bg-white rounded-full shadow-md`}></div>
      </div>
      <span className='text-lg'>{value ? 'Yes' : 'No'}</span>
    </div>
  );
};

export default YesNoSwitch;
