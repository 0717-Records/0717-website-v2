import React, { MouseEvent, ReactNode, useEffect, useState } from 'react';
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
  disabled?: boolean;
}

enum ImageState {
  Idle = 'idle',
  Empty = 'empty',
  Loading = 'loading',
  Found = 'found',
  NotFound = 'notFound',
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value, label, disabled = false }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  const [isMouseHover, setIsMouseHover] = useState(false);
  const [imageState, setImageState] = useState<ImageState>(ImageState.Idle);

  const handleClear = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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

  const checkImageExists = async (url: string) => {
    if (!url || url === '') {
      setImageState(ImageState.Empty);
      return;
    }
    setImageState(ImageState.Loading);
    try {
      await axios.head(url);
      setImageState(ImageState.Found);
    } catch (error) {
      setImageState(ImageState.NotFound);
    }
  };

  useEffect(() => {
    checkImageExists(value);
  }, [value]);

  const uiState = {
    idle: imageState === ImageState.Idle,
    empty: imageState === ImageState.Empty,
    loading: imageState === ImageState.Loading,
    found: imageState === ImageState.Found,
    notFound: imageState === ImageState.NotFound,
  };

  return (
    <CldUploadWidget
      onSuccess={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1,
        folder: folderName,
      }}>
      {({ open }) => {
        return (
          <div
            className={`mb-8 ${
              disabled || uiState.idle || uiState.loading ? 'pointer-events-none' : ''
            }`}>
            <label className='text-md text-zinc-400'>{label}</label>
            <div
              onMouseEnter={handleButtonMouseEnter}
              onMouseLeave={handleButtonMouseLeave}
              onClick={() => open?.()}
              className={`relative rounded-full my-2 w-40 h-40 cursor-pointer transition border-dashed border-2 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 group ${
                isMouseHover && 'opacity-70'
              }`}>
              {(uiState.idle || uiState.loading) && <Loader />}
              {(uiState.empty || uiState.notFound) && (
                <>
                  <TbPhotoPlus size={40} />
                  <div className='font-semibold text-sm'>Click to upload</div>
                </>
              )}
              {uiState.found && (
                <>
                  <div
                    className='
                    absolute 
                    rounded-full 
                    w-40 
                    h-40  
                    overflow-hidden 
                  '>
                    <Image
                      className='object-cover'
                      fill
                      sizes='100px'
                      src={value}
                      alt='Artist image'
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
            {uiState.found && (
              <Button onClick={(e) => handleClear(e)} className='w-40' small color='red'>
                Delete
              </Button>
            )}
            {uiState.notFound && (
              <span className='text-red-400'>
                The image for this artist cannot be retrieved. Please try re-uploading the image or
                try again later.
              </span>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
