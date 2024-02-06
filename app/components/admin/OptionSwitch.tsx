import React, { useState } from 'react';

interface OptionSwitchProps {
  value: any;
  options: any[];
  onChange: (value: any) => void;
}

const OptionSwitch: React.FC<OptionSwitchProps> = ({ value, options, onChange }) => {
  const [selectedVal, setSelectedVal] = useState(value);

  const handleButtonClick = (newValue: any) => {
    setSelectedVal(newValue);
    onChange(newValue);
  };

  return (
    <div className='flex space-x-4'>
      {options.map((option) => (
        <>
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
            className={`py-1 px-4 cursor-pointer rounded focus:outline-none ${
              selectedVal === option ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-700'
            }`}>
            {option}
          </label>
        </>
      ))}
    </div>
  );
};

export default OptionSwitch;
