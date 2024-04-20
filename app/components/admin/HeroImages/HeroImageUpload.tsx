import { CldUploadWidget } from 'next-cloudinary';
import { supportedExtensions } from '@/app/libs/isSupportedImage';
import Button from '../ui/Button';

declare global {
  var cloudinary: any;
}

const uploadPreset = process.env.NEXT_PUBLIC_LOUDINARY_UPLOAD_PRESET;
const folderName = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER;

interface HeroImageUploadProps {
  onUpload: (value: string) => void;
  uploadText: string;
}

const HeroImageUpload: React.FC<HeroImageUploadProps> = ({ onUpload, uploadText }) => {
  return (
    <CldUploadWidget
      onSuccess={(result: any) => onUpload(result.info.secure_url)}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1,
        folder: folderName,
        clientAllowedFormats: supportedExtensions,
      }}>
      {({ open }) => (
        <Button onClick={() => open?.()} className='font-semibold text-sm small'>
          {uploadText}
        </Button>
      )}
    </CldUploadWidget>
  );
};

export default HeroImageUpload;
