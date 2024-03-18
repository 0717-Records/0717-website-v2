'use client';

import { useEffect } from 'react';
import EmptyState from './components/admin/EmptyState';

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EmptyState
      title='Unhandled Error'
      subtitle='Looks like something went wrong with what you tried to do.  Please try to replicate this error, note down the exact steps to reproduce, and let a developer know.  Thanks! (and sorry!)'
    />
  );
};

export default ErrorState;
