'use state';

import { useEffect, useState } from 'react';

const useLockBodyScroll = () => {
  const [isBodyScrollLocked, setIsBodyScrollLocked] = useState(false);

  useEffect(() => {
    if (isBodyScrollLocked) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isBodyScrollLocked]);

  return setIsBodyScrollLocked;
};

export default useLockBodyScroll;
