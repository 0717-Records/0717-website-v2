import React, { useState } from 'react';
import { FiImage, FiEdit2, FiXCircle } from 'react-icons/fi';

interface ImageUploadComponent {
  label: string;
}

const ImageUploadComponent = ({ label }: ImageUploadComponent) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageUploadClick = () => {
    // Trigger your image upload functionality here
    console.log('Open file selector');
  };

  const handleDeleteImage = () => {
    // Trigger your delete image functionality here
    setUploadedImage(null);
  };

  return (
    <div className='mb-4'>
      <label className='text-md text-zinc-400'>{label}</label>
      <div
        className={`mt-4 relative inline-block w-40 h-40 rounded-full border-2 border-dotted ${
          isHovered ? 'border-gray-400' : 'border-gray-200'
        } cursor-pointer flex justify-center items-center`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleImageUploadClick}>
        {uploadedImage ? (
          <img
            src={uploadedImage}
            alt='Uploaded'
            className='w-full h-full rounded-full object-cover'
          />
        ) : (
          <>
            <FiImage className='w-10 h-10 text-gray-400' />
            <span className='text-sm text-gray-400 mt-2'>Click to upload</span>
          </>
        )}
        <FiEdit2
          className={`absolute right-0 bottom-0 mb-1 mr-1 w-6 h-6 ${
            isHovered ? 'text-gray-600' : 'text-gray-400'
          }`}
        />
      </div>
      {uploadedImage && (
        <button
          className='mt-4 px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-700 transition duration-150 ease-in-out'
          onClick={handleDeleteImage}>
          Delete <FiXCircle className='inline mb-1' />
        </button>
      )}
    </div>
  );
};

export default ImageUploadComponent;
