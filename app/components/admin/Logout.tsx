'use client';

import { signOut } from 'next-auth/react';
import React from 'react';

const Logout = () => {
  return (
    <button
      onClick={async () => {
        signOut({ callbackUrl: '/' });
      }}>
      Logout
    </button>
  );
};

export default Logout;
