import React from 'react';

interface SiteButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const siteButtonStyles =
  'bg-primary_yellow_dark border-none text-white px-4 py-2 rounded-md flex justify-center transition-all duration-100 ease-in-out hover:cursor-pointer hover:text-black hover:bg-primary_yellow hover:filter hover:drop-shadow-md active:text-white active:bg-primary_yellow_dark';

const SiteButton: React.FC<SiteButtonProps> = ({ children, onClick, className }) => {
  return (
    <button onClick={onClick} className={`${siteButtonStyles} ${className}`}>
      {children}
    </button>
  );
};

export default SiteButton;
