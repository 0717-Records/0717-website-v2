import toSentenceCase from '@/app/libs/toSentenceCase';
import React, { useState, useRef, useEffect } from 'react';
import {
  FaFacebook,
  FaBandcamp,
  FaSpotify,
  FaGlobe,
  FaInstagramSquare,
  FaLink,
  FaYoutube,
  FaTiktok,
} from 'react-icons/fa';
import { ImSoundcloud2 } from 'react-icons/im';
import { SiItunes } from 'react-icons/si';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { FaSquareXTwitter } from 'react-icons/fa6';

const iconOptions = [
  { icon: <FaGlobe />, name: 'website' },
  { icon: <FaLink />, name: 'general link' },
  { icon: <FaFacebook />, name: 'facebook' },
  { icon: <FaInstagramSquare />, name: 'instagram' },
  { icon: <AiFillTwitterCircle />, name: 'twitter' },
  { icon: <FaSquareXTwitter />, name: 'twitter X' },
  { icon: <FaTiktok />, name: 'tiktok' },
  { icon: <FaBandcamp />, name: 'bandcamp' },
  { icon: <FaSpotify />, name: 'spotify' },
  { icon: <SiItunes />, name: 'apple iTunes' },
  { icon: <ImSoundcloud2 />, name: 'soundcloud' },
  { icon: <FaYoutube />, name: 'youtube' },
];

export const getIconByName = (name: string, disabled: boolean = false) => {
  const foundOption = iconOptions.find((option) => option.name === name);
  const iconToReturn = foundOption ? foundOption.icon : <FaGlobe />;
  return React.cloneElement(iconToReturn, {
    style: { width: '100%', height: '100%' },
    className: disabled ? '' : 'hover:text-gray-500',
  });
};

const IconDropdown: React.FC<{
  onSelect: (name: string) => void;
  selectedIcon: string;
  disabled?: boolean;
}> = ({ onSelect, selectedIcon, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

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
      setShow(true);
    }
  };

  const handleOptionClick = (name: string) => {
    onSelect(name);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleRePos = () => {
      if (isOpen) calculateDropdownPosition();
    };

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    handleRePos();

    window.addEventListener('resize', handleRePos);
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      window.removeEventListener('resize', handleRePos);
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  return (
    <div className={`relative inline-block text-left`}>
      <div>
        <button
          disabled={disabled}
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
              {getIconByName(selectedIcon, disabled)}
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
            show ? '' : 'invisible'
          }`}>
          {iconOptions.map((option, index) => (
            <div
              key={index}
              className='flex items-center p-2 cursor-pointer hover:bg-gray-100'
              onClick={() => handleOptionClick(option.name)}>
              {option.icon}
              <span className='ml-4'>{toSentenceCase(option.name)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IconDropdown;
