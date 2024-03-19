// components/TextComponent.tsx
import React, { FC, ReactNode } from 'react';

interface TextProps {
  size?: 'large' | 'medium' | 'small';
  text: string;
  multiLine?: boolean;
}

const Paragraph: FC<TextProps> = ({ size = 'medium', text, multiLine = false }) => {
  const textSizeClass = {
    large: 'text-lg',
    medium: 'text-md',
    small: 'text-sm',
  }[size];

  const props = {
    className: `font-normal ${textSizeClass}`,
  };

  return multiLine ? (
    <p {...props} dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br>') }} />
  ) : (
    <p {...props}>{text}</p>
  );
};

export default Paragraph;
