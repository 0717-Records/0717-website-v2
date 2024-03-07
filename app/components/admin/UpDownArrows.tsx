import React from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

interface UpDownArrowsProps {
  index: number;
  onUpClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onDownClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  numRows: number;
}

const UpDownArrows = ({
  index,
  onUpClick,
  onDownClick,
  disabled = false,
  numRows,
}: UpDownArrowsProps) => {
  return (
    <>
      {index + 1}
      <button
        className={`mx-2 ${index === 0 && 'pointer-events-none invisible'}`}
        onClick={onUpClick}
        disabled={disabled}>
        <FaArrowUp />
      </button>
      <button
        className={`ml-2 ${index === numRows - 1 && 'pointer-events-none invisible'}`}
        onClick={onDownClick}
        disabled={disabled}>
        <FaArrowDown />
      </button>
    </>
  );
};

export default UpDownArrows;
