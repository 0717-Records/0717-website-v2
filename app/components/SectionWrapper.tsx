import React, { ReactNode } from 'react';
import Heading from './Typography/Heading';
import Paragraph from './Typography/Paragraph';

interface SectionWrapperProps {
  children: ReactNode;
  custom?: boolean;
  className?: string;
  title?: string;
  subTitle?: string;
  id?: string;
}

const SectionWrapper = ({
  title,
  subTitle,
  className,
  children,
  custom = false,
  id,
}: SectionWrapperProps) => {
  return custom ? (
    <section id={id} className={className}>
      {children}
    </section>
  ) : (
    <section
      id={id}
      className={`my-8 bg-opacity-40 shadow-md rounded-xl py-12 px-3 flex flex-col justify-center items-center text-center sm:w-[85vw] w-[90vw] mx-auto max-w-screen-2xl ${className}`}>
      {title && <Heading title={title} type='h2' className='text-5xl' />}
      {subTitle && <Paragraph text={subTitle} multiLine className='text-2xl mb-8' />}
      {children}
    </section>
  );
};

export default SectionWrapper;
