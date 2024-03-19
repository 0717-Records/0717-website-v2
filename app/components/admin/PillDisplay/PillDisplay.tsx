import React from 'react';

interface PillDisplayProps {
  color: 'green' | 'gray';
  text: string;
  className?: string;
}

const PillDisplay = ({ className, color, text }: PillDisplayProps) => {
  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${color}-100 text-${color}-800 ${className}`}>
      {text}
    </span>
  );
};

export default PillDisplay;
