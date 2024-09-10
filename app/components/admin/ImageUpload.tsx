import React, { MouseEvent, MutableRefObject, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { TbPhotoPlus } from 'react-icons/tb';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import Button from './ui/Button';
import Loader from './Loader';
import isSupportedImageURL, { supportedExtensions } from '@/app/libs/isSupportedImage';

declare global {
  var cloudinary: any;
}

const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const folderName = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER;

interface ImageUploadProps {
  label?: string;
  onChange: (value: string) => void;
  value: string;
  disabled?: boolean;
  isEdit?: boolean;
  shape?: 'rounded' | 'portrait' | 'default';
  saving: boolean;
  resetImageRef?: MutableRefObject<(() => void) | null>;
}

enum ImageState {
  Idle = 'idle',
  Empty = 'empty',
  Loading = 'loading',
  Found = 'found',
  Error = 'error',
}

interface deleteImgFromCloudinaryProps {
  url: string;
}

export const deleteImgFromCloudinary = async ({ url }: deleteImgFromCloudinaryProps) => {
  if (url && url !== '') {
    if (!folderName) throw 'No folderName!';
    try {
      // Extract public ID from the image URL
      const publicId = `${folderName}/${url.split('/').pop()?.split('.')[0]}`;
      // Delete the image in cloudinary
      await axios.post('/api/delete-image', { publicId });
    } catch (error: any) {
      console.error(error);
    }
  }
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value,
  label,
  disabled = false,
  isEdit = false,
  shape = 'default',
  saving,
  resetImageRef,
}) => {
  const [isMouseHover, setIsMouseHover] = useState(false);
  const [imageState, setImageState] = useState<ImageState>(ImageState.Idle);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const latestUrlRef = useRef(value);
  const [isNewImg, setIsNewImg] = useState(false);

  const deleteCloudinaryImg = useRef(!isEdit || (isEdit && isNewImg));

  const defaultVal = useRef(value);
  const savingRef = useRef(saving);

  useEffect(() => {
    checkImageUrl(value);
    latestUrlRef.current = value;
  }, [value]);

  useEffect(() => {
    // Update the ref to the latest value of `saving`
    savingRef.current = saving;
  }, [saving]);

  useEffect(() => {
    deleteCloudinaryImg.current = !isEdit || (isEdit && isNewImg);
  }, [isEdit, isNewImg]);

  // Delete orphaned image on cloudinary if it exists upon unmount
  // (i.e if we selected an image but are exiting without saving)
  useEffect(() => {
    return () => {
      if (
        !savingRef.current &&
        latestUrlRef.current &&
        latestUrlRef.current !== defaultVal.current
      ) {
        deleteImgFromCloudinary({ url: latestUrlRef.current });
      }
    };
  }, []);

  // Function to reset image state and delete image from Cloudinary
  const resetImageState = () => {
    if (latestUrlRef.current && latestUrlRef.current !== defaultVal.current) {
      deleteImgFromCloudinary({ url: latestUrlRef.current });
    }
  };

  // Pass the resetImageState function via ref so it can be called externally
  useEffect(() => {
    if (resetImageRef) {
      resetImageRef.current = resetImageState;
    }
  }, [resetImageRef]);

  const handleUpload = (result: any) => {
    if (deleteCloudinaryImg.current) deleteImgFromCloudinary({ url: latestUrlRef.current });
    onChange(result.info.secure_url);
    if (!isNewImg) setIsNewImg(true);
  };

  const handleClear = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (deleteCloudinaryImg.current) deleteImgFromCloudinary({ url: value });
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
            {label && <label className='text-md text-zinc-400'>{label}</label>}
            <div
              onMouseEnter={handleButtonMouseEnter}
              onMouseLeave={handleButtonMouseLeave}
              onClick={() => open?.()}
              className={`relative my-2 w-40 cursor-pointer transition border-dashed border-2 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 group ${
                isMouseHover ? 'opacity-70' : ''
              }
                ${shape === 'rounded' ? 'rounded-full h-40' : ''}
                ${shape === 'portrait' ? 'h-56' : ''}
                ${shape === 'default' ? 'h-40' : ''}
              `}>
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
                    className={`
                    absolute 
                    w-40 
                    overflow-hidden 
                    ${shape === 'rounded' ? 'rounded-full h-40' : ''}
                    ${shape === 'portrait' ? 'h-56' : ''}
                    ${shape === 'default' ? 'h-40' : ''}
                  `}>
                    <Image
                      className='object-cover'
                      fill
                      sizes='100px'
                      src={latestUrlRef.current}
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
