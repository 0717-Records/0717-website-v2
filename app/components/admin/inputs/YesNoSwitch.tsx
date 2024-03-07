// components/YesNoSwitch.tsx
import { useState } from 'react';

interface YesNoSwitchProps {
  label?: string;
  yesDefault?: boolean;
  onChange?: (value: boolean) => void;
}

const YesNoSwitch: React.FC<YesNoSwitchProps> = ({ label, yesDefault = false, onChange }) => {
  const [isYes, setIsYes] = useState(yesDefault);

  const toggleSwitch = () => {
    const newValue = !isYes;
    setIsYes(newValue);
    onChange?.(newValue);
  };

  return (
    <div className='flex items-center space-x-3'>
      {label && <span className='text-lg w-28'>{label}</span>}
      <div
        className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer ${
          isYes ? 'bg-gray-500' : 'bg-gray-300'
        }`}
        onClick={toggleSwitch}>
        <div
          className={`transform transition-all duration-300 ${
            isYes ? 'translate-x-8' : 'translate-x-0'
          } w-6 h-6 bg-white rounded-full shadow-md`}></div>
      </div>
      <span className='text-lg'>{isYes ? 'Yes' : 'No'}</span>
    </div>
  );
};

export default YesNoSwitch;
