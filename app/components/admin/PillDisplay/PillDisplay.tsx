import React from 'react';

interface PillDisplayProps {
  color: 'green' | 'gray';
  text: string;
  className?: string;
}

const PillDisplay = ({ className = '', color, text }: PillDisplayProps) => {
  const colorStylesMap = {
    green: 'bg-green-100 text-green-800',
    gray: 'bg-gray-100 text-gray-800',
  };
  const colorStyles = colorStylesMap[color] || '';

  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorStyles} ${className}`}>
      {text}
    </span>
  );
};

export default PillDisplay;
