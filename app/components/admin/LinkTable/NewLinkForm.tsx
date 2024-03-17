import { Link } from '@/app/types';
import React, { useEffect, useRef, useState } from 'react';
import IconDropdown from './IconDropDown';
import Button from '../ui/Button';

interface NewLinkFormProps {
  onSaveNewLink: (newLink: Link) => void;
  onCancelNewLink: () => void;
  forEvents?: boolean;
}

const NewLinkForm = ({ onSaveNewLink, onCancelNewLink, forEvents = false }: NewLinkFormProps) => {
  const [newLink, setNewLink] = useState<Link>({ url: '', iconType: '' });
  const [saveError, setSaveError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const handleClickSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    handleSaveNewLink();
  };

  const handleKeySubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSaveNewLink();
    }
  };

  const handleSaveNewLink = () => {
    if (forEvents) {
      if (newLink.label && newLink.url) {
        onSaveNewLink(newLink);
        setNewLink({ label: '', url: '' });
        setSaveError(null);
      } else {
        setSaveError('Both Label and Url must be filled in to save.');
      }
      return;
    }
    if (newLink.url && newLink.iconType) {
      onSaveNewLink(newLink);
      setNewLink({ url: '', iconType: '' });
      setSaveError(null);
    } else {
      setSaveError('Both URL and Icon must be filled in to save.');
    }
  };

  return (
    <div className='flex flex-col mt-4 pl-6'>
      <div className='flex items-center mb-2'>
        <div className='flex flex-col'>
          {forEvents && (
            <input
              ref={inputRef}
              type='text'
              className='border rounded px-2 py-1 mr-2 mb-2 flex-shrink-0 w-[21rem]'
              placeholder='Enter Label'
              value={newLink.label || ''}
              onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
              onKeyDown={handleKeySubmit}
            />
          )}
          <input
            ref={!forEvents ? inputRef : null}
            type='text'
            className='border rounded px-2 py-1 mr-2 flex-shrink-0 w-[21rem]'
            placeholder='Enter URL'
            value={newLink.url}
            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
            onKeyDown={handleKeySubmit}
          />
        </div>

        {!forEvents && (
          <IconDropdown
            selectedIcon={newLink.iconType || ''}
            onSelect={(iconType) => setNewLink({ ...newLink, iconType })}
          />
        )}
      </div>

      {saveError && <p className='text-red-500 mb-2 text-sm'>{saveError}</p>}
      <div>
        <Button small className='mr-2' onClick={handleClickSubmit}>
          Save
        </Button>

        <Button small outline onClick={onCancelNewLink}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default NewLinkForm;
