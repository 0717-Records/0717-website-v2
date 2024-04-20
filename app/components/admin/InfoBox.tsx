import React from 'react';
import { FiInfo } from 'react-icons/fi'; // Using Feather Icons as an example

interface InfoBoxProps {
  text: string;
  className?: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({ text, className = '' }) => {
  return (
    <div className={`bg-blue-100 text-sm p-4 rounded-md flex items-center space-x-3 ${className}`}>
      <FiInfo className='text-lg text-blue-600' />{' '}
      {/* Icon size can be controlled by text-size utilities */}
      <span>{text}</span>
    </div>
  );
};

export default InfoBox;
