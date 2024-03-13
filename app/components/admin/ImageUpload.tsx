import React, { MouseEvent, ReactNode, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { TbPhotoPlus } from 'react-icons/tb';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import Button from './ui/Button';
import Loader from './Loader';
import isSupportedImageURL, { supportedExtensions } from '@/app/libs/isSupportedImage';

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
  Error = 'error',
}

interface deleteImgFromCloudinaryProps {
  folderName: string | undefined;
  url: string;
}

const deleteImgFromCloudinary = async ({ folderName, url }: deleteImgFromCloudinaryProps) => {
  if (url && url !== '') {
    if (!folderName) throw 'No folderName!';
    try {
      // Extract public ID from the image URL
      const publicId = `${folderName}/${url.split('/').pop()?.split('.')[0]}`;
      // Delete the image in cloudinary
      await axios.post('/api/delete-image', { publicId });
    } catch (error: any) {
      throw error;
    }
  }
};

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value, label, disabled = false }) => {
  const [isMouseHover, setIsMouseHover] = useState(false);
  const [imageState, setImageState] = useState<ImageState>(ImageState.Idle);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const latestValueRef = useRef(value);

  const handleUpload = async (result: any) => {
    try {
      await deleteImgFromCloudinary({ folderName, url: latestValueRef.current });
    } catch (error: any) {
      console.error(error);
    }
    onChange(result.info.secure_url);
  };

  const handleClear = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await deleteImgFromCloudinary({ folderName, url: value });
    } catch (error: any) {
      console.error(error);
    }
    onChange('');
    setImageState(ImageState.Empty);
  };

  const handleButtonMouseEnter = () => setIsMouseHover(true);
  const handleButtonMouseLeave = () => setIsMouseHover(false);

  const checkImageUrl = async (url: string) => {
    if (!url || url === '') {
      setImageState(ImageState.Empty);
      return;
    }
    if (!isSupportedImageURL(url)) {
      setImageState(ImageState.Error);
      setErrorMsg('The image for this artist is invalid.  Please upload another image.');
      return;
    }
    setImageState(ImageState.Loading);
    try {
      await axios.head(url);
      setImageState(ImageState.Found);
    } catch (error) {
      setImageState(ImageState.Error);
      setErrorMsg(
        'The image for this artist cannot be loaded.  Please try again later, or try uploading another image.'
      );
    }
  };

  useEffect(() => {
    checkImageUrl(value);
    latestValueRef.current = value;
  }, [value]);

  const uiState = {
    idle: imageState === ImageState.Idle,
    empty: imageState === ImageState.Empty,
    loading: imageState === ImageState.Loading,
    found: imageState === ImageState.Found,
    error: imageState === ImageState.Error,
  };

  return (
    <CldUploadWidget
      onSuccess={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1,
        folder: folderName,
        clientAllowedFormats: supportedExtensions,
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
              {(uiState.empty || uiState.error) && (
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
              <Button onClick={(e) => handleClear(e)} className='w-40 bg-red-500' small>
                Delete
              </Button>
            )}
            {uiState.error && <span className='text-red-400'>{errorMsg}</span>}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
