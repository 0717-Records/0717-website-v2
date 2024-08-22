import { FieldData } from '@/app/types';
import React from 'react';
import { FieldValues, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import LinkTable from '../LinkTable/LinkTable';
import ImageUpload from '../ImageUpload';

enum ComponentTypes {
  company_links = 'company_links',
  social_preview_img = 'social_preview_img',
}

interface CustomComponentProps {
  name: string;
  fields: FieldData[];
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  isLoading?: boolean;
}

const CustomComponent = ({
  name,
  fields,
  setValue,
  watch,
  isLoading = false,
}: CustomComponentProps) => {
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  if (name === ComponentTypes.company_links) {
    const field = fields.find((field) => field.displayName === 'company links');
    const id = field?.id || '';

    const links = watch(id);

    return (
      <LinkTable
        links={links}
        onUpdateLinks={(value) => setCustomValue(id, value)}
        disabled={isLoading}
      />
    );
  }
  // if (name === ComponentTypes.social_preview_img) {
  //   const field = fields.find((field) => field.name === 'social preview image');
  //   const id = field?.id || '';

  //   const imageSrc = watch(id);

  //   return (
  //     <ImageUpload
  //       label='Image'
  //       onChange={(value) => setCustomValue('imageSrc', value)}
  //       value={imageSrc}
  //       disabled={isLoading}
  //       isEdit
  //     />
  //   );
  // }
  return null;
};

export default CustomComponent;
