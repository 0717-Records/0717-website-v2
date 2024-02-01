import { Link } from '@/app/types';
import React, { useState } from 'react';
import IconDropdown from './IconDropDown';
import Button from '../../ui/Button';

interface NewLinkFormProps {
  onSaveNewLink: (newLink: Link) => void;
  onCancelNewLink: () => void;
}

const NewLinkForm = ({ onSaveNewLink, onCancelNewLink }: NewLinkFormProps) => {
  const [newLink, setNewLink] = useState<Link>({ url: '', iconType: '' });
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSaveNewLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
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
        <input
          type='text'
          className='border rounded px-2 py-1 mr-2 flex-shrink-0 w-[21rem]'
          placeholder='Enter URL'
          value={newLink.url}
          onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
        />

        <IconDropdown
          selectedIcon={newLink.iconType}
          onSelect={(iconType) => setNewLink({ ...newLink, iconType })}
        />
      </div>

      {saveError && <p className='text-red-500 mb-2 text-sm'>{saveError}</p>}
      <div>
        <Button small className='mr-2' onClick={handleSaveNewLink}>
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
