import React, { useState, useRef, useEffect } from 'react';
import { FaFacebook, FaBandcamp, FaSpotify, FaGlobe, FaInstagram } from 'react-icons/fa';

const iconOptions = [
  { icon: <FaFacebook />, name: 'Facebook' },
  { icon: <FaBandcamp />, name: 'Bandcamp' },
  { icon: <FaSpotify />, name: 'Spotify' },
  { icon: <FaGlobe />, name: 'Web' },
  { icon: <FaInstagram />, name: 'Instagram' },
];

const IconDropdown: React.FC<{
  onSelect: (name: string) => void;
  selectedIcon: string;
}> = ({ onSelect, selectedIcon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const calculateDropdownPosition = () => {
    if (buttonRef.current && dropDownRef.current) {
      const dropDownRect = dropDownRef.current.getBoundingClientRect();
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const isAbove = innerHeight - buttonRect.bottom < dropDownRect.height;
      const isRight = innerWidth - buttonRect.right > dropDownRect.width;
      setPosition({
        top: isAbove ? -dropDownRect.height : buttonRect.height,
        left: isRight ? buttonRect.height : -dropDownRect.width,
      });
    }
  };

  const handleOptionClick = (name: string) => {
    onSelect(name);
    setIsOpen(false);
  };

  const getIconByName = (name: string) => {
    const foundOption = iconOptions.find((option) => option.name === name);
    return foundOption
      ? React.cloneElement(foundOption.icon, {
          style: { width: '100%', height: '100%' },
          className: 'hover:text-gray-500',
        })
      : '';
  };

  useEffect(() => {
    if (buttonRef.current && dropDownRef.current) calculateDropdownPosition();
  }, [buttonRef.current, dropDownRef.current]);

  useEffect(() => {
    const handleResize = () => {
      if (isOpen) calculateDropdownPosition();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  return (
    <div className='relative inline-block text-left'>
      <div>
        <button
          ref={buttonRef}
          type='button'
          className={`inline-flex justify-center items-center w-12 h-12 rounded-full focus:outline-none focus:ring focus:border-blue-300 ${
            selectedIcon === '' ? 'border bg-gray-300 hover:bg-gray-400' : ''
          }`}
          onClick={() => setIsOpen(!isOpen)}>
          {selectedIcon === '' ? (
            <div className='w-full h-full flex items-center justify-center text-xs'>
              Select Icon
            </div>
          ) : (
            <div className='w-full h-full flex items-center justify-center'>
              {getIconByName(selectedIcon)}
            </div>
          )}
        </button>
      </div>

      {isOpen && (
        <div
          ref={dropDownRef}
          style={{
            position: 'absolute',
            top: position.top,
            left: position.left,
            zIndex: 1000,
          }}
          className={`origin-top-right mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 ${
            dropDownRef.current ? '' : 'invisible'
          }`}>
          {iconOptions.map((option, index) => (
            <div
              key={index}
              className='flex items-center p-2 cursor-pointer hover:bg-gray-100'
              onClick={() => handleOptionClick(option.name)}>
              {option.icon}
              <span className='ml-2'>{option.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IconDropdown;
