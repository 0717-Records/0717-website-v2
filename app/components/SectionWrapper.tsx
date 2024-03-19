import React, { ReactNode } from 'react';
import Heading from './Typography/Heading';
import Paragraph from './Typography/Paragraph';

interface SectionWrapperProps {
  children: ReactNode;
  custom?: boolean;
  className?: string;
  title?: string;
  subTitle?: string;
}

const SectionWrapper = ({
  title,
  subTitle,
  className,
  children,
  custom = false,
}: SectionWrapperProps) => {
  return custom ? (
    <section className={className}>{children}</section>
  ) : (
    <section
      className={`bg-opacity-40 shadow-md rounded-xl py-12 flex flex-col justify-center items-center text-center sm:w-[85vw] w-[90vw] mx-auto max-w-screen-2xl ${className}`}>
      {title && <Heading title={title} type='h2' />}
      {subTitle && <Paragraph text={subTitle} multiLine />}
      {children}
    </section>
  );
};

export default SectionWrapper;
