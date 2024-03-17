import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import Button from '../ui/Button';
import NewLinkForm from './NewLinkForm';
import IconDropdown from './IconDropDown';
import UpDownArrows from '../UpDownArrows';
import { Link } from '@/app/types';

interface LinksTableProps {
  links: Link[];
  onUpdateLinks: (updatedLinks: Link[]) => void;
  disabled?: boolean;
  forEvents?: boolean;
}

const LinksTable: React.FC<LinksTableProps> = ({
  links,
  onUpdateLinks,
  disabled = false,
  forEvents = false,
}) => {
  const [editableLinks, setEditableLinks] = useState([...links]);
  const [isNewLinkFormVisible, setNewLinkFormVisible] = useState(false);

  useEffect(() => {
    setEditableLinks(links);
  }, [links]);

  const handleUrlChange = (index: number, newValue: string) => {
    const updatedLinks = [...editableLinks];
    updatedLinks[index].url = newValue;
    setEditableLinks(updatedLinks);
    onUpdateLinks(updatedLinks);
  };

  const handleIconChange = (index: number, newIcon: string) => {
    const updatedLinks = [...editableLinks];
    updatedLinks[index].iconType = newIcon;
    setEditableLinks(updatedLinks);
    onUpdateLinks(updatedLinks);
  };

  const handleLabelChange = (index: number, newLabel: string) => {
    const updatedLinks = [...editableLinks];
    updatedLinks[index].label = newLabel;
    setEditableLinks(updatedLinks);
    onUpdateLinks(updatedLinks);
  };

  const handleMoveUp = (index: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (index > 0) {
      const updatedLinks = [...editableLinks];
      [updatedLinks[index], updatedLinks[index - 1]] = [
        updatedLinks[index - 1],
        updatedLinks[index],
      ];

      const rowElement = document.querySelectorAll('.link-row')[index];
      rowElement.classList.add('slide-up');

      rowElement.addEventListener(
        'transitionend',
        () => {
          setEditableLinks(updatedLinks);
          onUpdateLinks(updatedLinks);
          rowElement.classList.remove('slide-up');
        },
        { once: true }
      );
    }
  };

  const handleMoveDown = (index: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (index < editableLinks.length - 1) {
      const updatedLinks = [...editableLinks];
      [updatedLinks[index], updatedLinks[index + 1]] = [
        updatedLinks[index + 1],
        updatedLinks[index],
      ];

      const rowElement = document.querySelectorAll('.link-row')[index];
      rowElement.classList.add('slide-down');

      rowElement.addEventListener(
        'transitionend',
        () => {
          setEditableLinks(updatedLinks);
          onUpdateLinks(updatedLinks);
          rowElement.classList.remove('slide-down');
        },
        { once: true }
      );
    }
  };

  const handleDelete = (index: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const updatedLinks = editableLinks.filter((_, i) => i !== index);
    setEditableLinks(updatedLinks);
    onUpdateLinks(updatedLinks);
  };

  const onSaveNewLink = (newLink: Link) => {
    const updatedLinks = [...editableLinks, newLink];
    setEditableLinks(updatedLinks);
    onUpdateLinks(updatedLinks);
    setNewLinkFormVisible(false);
  };

  return (
    <div>
      {!!editableLinks.length && (
        <table className='min-w-full divide-y divide-gray-200'>
          <thead>
            <tr>
              {forEvents && (
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  LABEL
                </th>
              )}
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                URL
              </th>
              {!forEvents && (
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Icon
                </th>
              )}
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Order
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Delete
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {editableLinks.map((link, index) => (
              <tr key={index} className='link-row'>
                {forEvents && (
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <input
                      type='text'
                      className={`border rounded px-2 py-1 w-full ${
                        link.url.trim() === '' ? 'border-red-500' : ''
                      }`}
                      value={link.label || ''}
                      onChange={(e) => handleLabelChange(index, e.target.value)}
                      disabled={disabled}
                    />
                  </td>
                )}
                <td className='px-6 py-4 whitespace-nowrap'>
                  <input
                    type='text'
                    className={`border rounded px-2 py-1 w-full ${
                      link.url.trim() === '' ? 'border-red-500' : ''
                    }`}
                    value={link.url}
                    onChange={(e) => handleUrlChange(index, e.target.value)}
                    disabled={disabled}
                  />
                </td>
                {!forEvents && (
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <IconDropdown
                      selectedIcon={link.iconType || ''}
                      onSelect={(iconType) => handleIconChange(index, iconType)}
                      disabled={disabled}
                    />
                  </td>
                )}
                <td style={{ alignItems: 'center' }} className='px-6 py-4 whitespace-nowrap'>
                  <UpDownArrows
                    index={index}
                    onUpClick={(e) => handleMoveUp(index, e)}
                    onDownClick={(e) => handleMoveDown(index, e)}
                    disabled={disabled}
                    numRows={editableLinks.length}
                  />
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <button disabled={disabled} onClick={(e) => handleDelete(index, e)}>
                    <FaTrash className='text-red-600' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isNewLinkFormVisible ? (
        <NewLinkForm
          onSaveNewLink={onSaveNewLink}
          onCancelNewLink={() => setNewLinkFormVisible(false)}
          forEvents={forEvents}
        />
      ) : (
        <Button small className='mt-4 ml-6' onClick={() => setNewLinkFormVisible(true)}>
          Add New Link
        </Button>
      )}
    </div>
  );
};

export default LinksTable;
