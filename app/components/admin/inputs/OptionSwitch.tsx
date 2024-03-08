import React, { useState } from 'react';

interface OptionSwitchProps {
  value?: any;
  label?: string;
  options: any[];
  labels: string[];
  onChange: (value: any) => void;
  disabled?: boolean;
}

const OptionSwitch: React.FC<OptionSwitchProps> = ({
  value,
  label,
  options,
  labels,
  onChange,
  disabled = false,
}) => {
  const [selectedVal, setSelectedVal] = useState(value);

  const handleButtonClick = (newValue: any) => {
    setSelectedVal(newValue);
    onChange(newValue);
  };

  return (
    <div className='flex space-x-4'>
      {label && <span className='text-lg w-28'>{label}</span>}
      {options.map((option, index) => (
        <div key={index}>
          <input
            type='radio'
            id={option}
            name='switchOptions'
            value={option}
            checked={selectedVal === option}
            onChange={() => handleButtonClick(option)}
            className='hidden'
          />
          <label
            htmlFor={option}
            className={`
                py-1 px-4 rounded focus:outline-none 
                ${selectedVal === option ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-700'} 
                ${disabled ? 'pointer-events-none' : 'cursor-pointer'}
              `}>
            {labels[index]}
          </label>
        </div>
      ))}
    </div>
  );
};

export default OptionSwitch;
