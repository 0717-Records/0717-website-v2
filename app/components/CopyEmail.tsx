'use client';

import React, { useState } from 'react';
import Paragraph from './Typography/Paragraph';
import SiteButton from './ui/SiteButton';
import { FaRegCopy } from 'react-icons/fa';

const CopyEmail = ({ email }: { email: string | null }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(email || '');
    setIsCopied(true);
  };

  return (
    <>
      <Paragraph className='my-2' text={email || ''} />
      <SiteButton className='flex items-center' onClick={copyEmail}>
        <FaRegCopy className='mr-2' />
        {isCopied ? 'Copied!' : 'Copy Email'}
      </SiteButton>
    </>
  );
};

export default CopyEmail;
