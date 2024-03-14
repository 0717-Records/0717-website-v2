// components/TextComponent.tsx
import React, { FC, ReactNode } from 'react';

interface TextProps {
  size?: 'large' | 'medium' | 'small';
  children: ReactNode;
}

const TextComponent: FC<TextProps> = ({ size = 'medium', children }) => {
  const textSizeClass = {
    large: 'text-lg',
    medium: 'text-md',
    small: 'text-sm',
  }[size];

  return <p className={`font-normal ${textSizeClass}`}>{children}</p>;
};

export default TextComponent;
