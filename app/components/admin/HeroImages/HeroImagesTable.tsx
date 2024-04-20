import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import Button from '../ui/Button';
import UpDownArrows from '../UpDownArrows';
import { Link } from '@/app/types';
import HeroImageUpload from './HeroImageUpload';
import Image from 'next/image';

interface HeroImagesTableProps {}

const links: Link[] = [];

const HeroImagesTable = ({}) => {
  const [editableLinks, setEditableLinks] = useState([...links]);
  const [isNewLinkFormVisible, setNewLinkFormVisible] = useState(false);
  const [tempImg, setTempImg] = useState<string | null>(null);

  // const handleMoveUp = (index: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   e.preventDefault();
  //   if (index > 0) {
  //     const updatedLinks = [...editableLinks];
  //     [updatedLinks[index], updatedLinks[index - 1]] = [
  //       updatedLinks[index - 1],
  //       updatedLinks[index],
  //     ];

  //     const rowElement = document.querySelectorAll('.link-row')[index];
  //     rowElement.classList.add('slide-up');

  //     rowElement.addEventListener(
  //       'transitionend',
  //       () => {
  //         setEditableLinks(updatedLinks);
  //         onUpdateLinks();
  //         rowElement.classList.remove('slide-up');
  //       },
  //       { once: true }
  //     );
  //   }
  // };

  // const handleMoveDown = (index: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   e.preventDefault();
  //   if (index < editableLinks.length - 1) {
  //     const updatedLinks = [...editableLinks];
  //     [updatedLinks[index], updatedLinks[index + 1]] = [
  //       updatedLinks[index + 1],
  //       updatedLinks[index],
  //     ];

  //     const rowElement = document.querySelectorAll('.link-row')[index];
  //     rowElement.classList.add('slide-down');

  //     rowElement.addEventListener(
  //       'transitionend',
  //       () => {
  //         setEditableLinks(updatedLinks);
  //         onUpdateLinks();
  //         rowElement.classList.remove('slide-down');
  //       },
  //       { once: true }
  //     );
  //   }
  // };

  const handleDelete = (index: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // const updatedLinks = editableLinks.filter((_, i) => i !== index);
    // setEditableLinks(updatedLinks);
    // onUpdateLinks();
  };

  return (
    <div>
      {tempImg && (
        <table className='min-w-full divide-y divide-gray-200 mb-6'>
          <thead>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Image
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
            <tr className='link-row'>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div
                  className={`
                    relative 
                    w-52 
                    overflow-hidden 
                    h-36 
                  `}>
                  <Image
                    className='object-cover'
                    fill
                    sizes='100px'
                    src={tempImg}
                    alt='Artist image'
                  />
                </div>
              </td>

              <td style={{ alignItems: 'center' }} className='px-6 py-4 whitespace-nowrap'>
                {/* <UpDownArrows
                    index={index}
                    onUpClick={(e) => handleMoveUp(index, e)}
                    onDownClick={(e) => handleMoveDown(index, e)}
                    numRows={editableLinks.length}
                  /> */}
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <button onClick={(e) => handleDelete(index, e)}>
                  <FaTrash className='text-red-600' />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      )}

      <HeroImageUpload onUpload={(url) => setTempImg(url)} uploadText='Add New Image' />
    </div>
  );
};

export default HeroImagesTable;
