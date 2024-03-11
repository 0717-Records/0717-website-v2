'use client';

import { MouseEvent, useState } from 'react';
import axios from 'axios';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { TbPhotoPlus } from 'react-icons/tb';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import Button from './ui/Button';
import Loader from './Loader';

declare global {
  var cloudinary: any;
}

const uploadPreset = process.env.NEXT_PUBLIC_LOUDINARY_UPLOAD_PRESET;
const folderName = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER;

interface ImageUploadProps {
  label: string;
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value, label }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  const [isMouseHover, setIsMouseHover] = useState(false);

  console.log(value);

  const handleClear = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      // Extract public ID from the image URL
      const publicId = `${folderName}/${value.split('/').pop()?.split('.')[0]}`;

      // Clear the uploaded image by setting the value to an empty string
      onChange('');
      await axios.post('/api/delete-image', { publicId });
    } catch (error: any) {
      console.error(error);
      const message = error?.response?.data || 'Error clearing image.';
      toast.error(message);
    }
  };

  const handleButtonMouseEnter = () => setIsMouseHover(true);
  const handleButtonMouseLeave = () => setIsMouseHover(false);

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1,
        folder: folderName,
      }}>
      {({ open }) => {
        return (
          <div className='mb-8'>
            <label className='text-md text-zinc-400'>{label}</label>
            <div
              onMouseEnter={handleButtonMouseEnter}
              onMouseLeave={handleButtonMouseLeave}
              onClick={() => open?.()}
              className={`
            relative 
            rounded-full 
            my-2 
            w-40 
            h-40 
            cursor-pointer
            ${isMouseHover && 'opacity-70'}
            transition
            border-dashed 
            border-2 
            border-neutral-300
            flex
            flex-col
            justify-center
            items-center
            gap-4
            text-neutral-600
            group
            `}>
              {(!value || value === '') && (
                <>
                  <TbPhotoPlus size={40} />
                  <div className='font-semibold text-sm'>Click to upload</div>
                </>
              )}
              {value && (
                <>
                  <Loader />
                  <div
                    className='
                  absolute 
                  rounded-full 
                  w-40 
                  h-40  
                  overflow-hidden 
                '>
                    <Image
                      fill
                      sizes='100px'
                      style={{ objectFit: 'cover' }}
                      src={value}
                      alt='House'
                    />
                  </div>
                  <HiOutlinePencilAlt
                    className={`absolute right-0 bottom-0 w-6 h-6 ${
                      isMouseHover ? 'opacity-70' : ''
                    }`}
                  />
                </>
              )}
            </div>
            {value && (
              <Button onClick={(e) => handleClear(e)} className='w-40' small color='red'>
                Delete
              </Button>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
