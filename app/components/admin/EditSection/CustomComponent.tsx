import { FieldData, FieldValue, Link } from '@/app/types';
import React from 'react';
import Button from '../../ui/Button';
import { FieldValues, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import LinkTable from '../LinkTable/LinkTable';

enum ComponentTypes {
  company_links = 'company_links',
}

interface CustomComponentProps {
  name: string;
  fields: FieldData[];
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const CustomComponent = ({ name, fields, setValue, watch }: CustomComponentProps) => {
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  if (name === ComponentTypes.company_links) {
    const field = fields.find((field) => field.name === 'company links');
    const id = field?.id || '';

    const links = watch(id);

    return <LinkTable links={links} onUpdateLinks={(value) => setCustomValue(id, value)} />;
  }
  return null;
};

export default CustomComponent;
