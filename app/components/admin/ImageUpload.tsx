'use client';

import { MouseEvent, useState } from 'react';
import axios from 'axios';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
  var cloudinary: any;
}

const uploadPreset = process.env.NEXT_PUBLIC_LOUDINARY_UPLOAD_PRESET;
const folderName = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER;

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  const [isMouseHover, setIsMouseHover] = useState(false);

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
          <div
            onClick={() => open?.()}
            className={`
            relative
            cursor-pointer
            ${!isMouseHover && 'hover:opacity-70'}
            transition
            border-dashed 
            border-2 
            p-20 
            border-neutral-300
            flex
            flex-col
            justify-center
            items-center
            gap-4
            text-neutral-600
            group
            `}>
            <TbPhotoPlus size={50} />
            <div className='font-semibold text-lg'>Click to upload</div>
            {value && (
              <div
                className='
                  absolute 
                  inset-0
                  w-full
                  h-full
                '>
                <Image fill style={{ objectFit: 'cover' }} src={value} alt='House' />
                <button
                  onMouseEnter={handleButtonMouseEnter}
                  onMouseLeave={handleButtonMouseLeave}
                  onClick={(e) => handleClear(e)}
                  className='
                    absolute 
                    top-2 
                    right-2 
                    p-2 
                    bg-red-500 
                    hover:bg-red-700 
                    text-white 
                    rounded-full
                  '>
                  Clear
                </button>
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
