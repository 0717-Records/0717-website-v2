import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import Button from '../ui/Button';
import UpDownArrows from '../UpDownArrows';
import { HeroImage, Link } from '@/app/types';
import HeroImageUpload from './HeroImageUpload';
import Image from 'next/image';
import { deleteImgFromCloudinary } from '../ImageUpload';
import LoadingPanel from '../LoadingPanel';
import { AddImageProps } from '@/app/admin/[category]/hero/images/HeroImagesClient';
import InfoBox from '../InfoBox';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface HeroImagesTableProps {
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  onAddImage: (data: AddImageProps) => void;
  images: HeroImage[];
}

const HeroImagesTable = ({
  isLoading = false,
  setIsLoading,
  onAddImage,
  images,
}: HeroImagesTableProps) => {
  const router = useRouter();

  const handleMoveUp = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number,
    imageId: string
  ) => {
    e.preventDefault();
    // if (index > 0) {
    //   const updatedLinks = [...editableLinks];
    //   [updatedLinks[index], updatedLinks[index - 1]] = [
    //     updatedLinks[index - 1],
    //     updatedLinks[index],
    //   ];

    //   const rowElement = document.querySelectorAll('.link-row')[index];
    //   rowElement.classList.add('slide-up');

    //   rowElement.addEventListener(
    //     'transitionend',
    //     () => {
    //       setEditableLinks(updatedLinks);
    //       onUpdateLinks();
    //       rowElement.classList.remove('slide-up');
    //     },
    //     { once: true }
    //   );
    // }
  };

  const handleMoveDown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // if (index < editableLinks.length - 1) {
    //   const updatedLinks = [...editableLinks];
    //   [updatedLinks[index], updatedLinks[index + 1]] = [
    //     updatedLinks[index + 1],
    //     updatedLinks[index],
    //   ];

    //   const rowElement = document.querySelectorAll('.link-row')[index];
    //   rowElement.classList.add('slide-down');

    //   rowElement.addEventListener(
    //     'transitionend',
    //     () => {
    //       setEditableLinks(updatedLinks);
    //       onUpdateLinks();
    //       rowElement.classList.remove('slide-down');
    //     },
    //     { once: true }
    //   );
    // }
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    image: HeroImage
  ) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.delete(`/api/hero_images/${image.id}`);
      toast.success(`Image deleted!`);
      router.refresh();
    } catch (error: any) {
      console.error(error);
      let message = error?.response?.data || '';
      message = message !== '' ? message : 'Cannot delete image right now. Please try again later.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
    deleteImgFromCloudinary({ url: image.imageUrl });
  };

  return (
    <>
      {isLoading && <LoadingPanel />}
      <div>
        {!images.length && <InfoBox className='mb-4' text='No saved images.' />}
        {!!images.length && (
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
              {images.map((image, index) => (
                <tr key={image.id} className='link-row'>
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
                        src={image.imageUrl}
                        alt='Artist image'
                      />
                    </div>
                  </td>

                  <td style={{ alignItems: 'center' }} className='px-6 py-4 whitespace-nowrap'>
                    <UpDownArrows
                      index={index}
                      onUpClick={(e) => handleMoveUp(e, index, image.id)}
                      onDownClick={(e) => handleMoveDown(e)}
                      numRows={images.length}
                    />
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <button onClick={(e) => handleDelete(e, image)}>
                      <FaTrash className='text-red-600' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <HeroImageUpload onUpload={onAddImage} uploadText='Add New Image' />
      </div>
    </>
  );
};

export default HeroImagesTable;
