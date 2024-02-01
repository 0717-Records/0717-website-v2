import React, { useState } from 'react';
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

  const handleIconClick = () => {
    setIsOpen(!isOpen);
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

  const iconSelected = selectedIcon === '';

  return (
    <div className='relative inline-block text-left'>
      <div>
        <button
          type='button'
          className={`inline-flex justify-center items-center w-12 h-12 rounded-full focus:outline-none focus:ring focus:border-blue-300 ${
            iconSelected ? 'border bg-gray-300 hover:bg-gray-400' : ''
          }`}
          onClick={handleIconClick}>
          {iconSelected ? (
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
        <div className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100'>
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
