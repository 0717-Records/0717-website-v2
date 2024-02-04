import React, { useState, useEffect } from 'react';
import {
  FaArrowUp,
  FaArrowDown,
  FaTrash,
  FaFacebook,
  FaBandcamp,
  FaSpotify,
  FaGlobe,
  FaInstagram,
} from 'react-icons/fa';
import Button from '../../ui/Button';
import NewLinkForm from './NewLinkForm';
import { getIconByName } from './IconDropDown';

interface Link {
  url: string;
  iconType: string;
}

interface LinksTableProps {
  links: Link[];
  onUpdateLinks: (updatedLinks: Link[]) => void;
}

const LinksTable: React.FC<LinksTableProps> = ({ links, onUpdateLinks }) => {
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
      <table className='min-w-full divide-y divide-gray-200'>
        <thead>
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              URL
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Icon
            </th>
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
              <td className='px-6 py-4 whitespace-nowrap'>
                <input
                  type='text'
                  className='border rounded px-2 py-1 w-full'
                  value={link.url}
                  onChange={(e) => handleUrlChange(index, e.target.value)}
                />
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='w-10'>{getIconByName(link.iconType)}</div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                {index + 1}
                <div className='flex mt-2'>
                  <button
                    className={`mr-2 ${index === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={(e) => handleMoveUp(index, e)}
                    disabled={index === 0}>
                    <FaArrowUp />
                  </button>
                  <button
                    className={`ml-2 ${
                      index === editableLinks.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={(e) => handleMoveDown(index, e)}
                    disabled={index === editableLinks.length - 1}>
                    <FaArrowDown />
                  </button>
                </div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <button onClick={(e) => handleDelete(index, e)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isNewLinkFormVisible ? (
        <NewLinkForm
          onSaveNewLink={onSaveNewLink}
          onCancelNewLink={() => setNewLinkFormVisible(false)}
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
