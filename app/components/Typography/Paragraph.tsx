// components/TextComponent.tsx
import React, { FC, ReactNode } from 'react';

interface TextProps {
  className?: string;
  text: string;
  multiLine?: boolean;
}

const Paragraph: FC<TextProps> = ({ className, text, multiLine = false }) => {
  const props = {
    className,
  };

  return multiLine ? (
    <p {...props} dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br>') }} />
  ) : (
    <p {...props}>{text}</p>
  );
};

export default Paragraph;
