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
  selectedIcon: React.ReactNode;
}> = ({ onSelect, selectedIcon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIconClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (name: string) => {
    onSelect(name);
    setIsOpen(false);
  };

  return (
    <div className='relative inline-block text-left'>
      <div>
        <button
          type='button'
          className='inline-flex justify-center items-center w-12 h-12 border rounded-full bg-gray-300 text-gray-600 hover:bg-gray-400 focus:outline-none focus:ring focus:border-blue-300'
          onClick={handleIconClick}>
          {selectedIcon}
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
