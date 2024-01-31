import { FieldData, FieldValue, Link } from '@/app/types';
import React from 'react';
import Button from '../../ui/Button';
import { FieldValues, UseFormSetValue, UseFormWatch } from 'react-hook-form';

const TEST_LINKS: Link[] = [
  {
    url: 'Zww....',
    iconType: 'facebook',
    order: 1,
  },
  {
    url: 'Bww....',
    iconType: 'facebook',
    order: 1,
  },
  {
    url: 'Cww....',
    iconType: 'facebook',
    order: 1,
  },
];

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
    const links = field?.value || [];
    const id = field?.id || '';
    console.log('FIELDS: ', fields);
    console.log('LINKS: ', links);
    return (
      <>
        <Button
          onClick={(e) => {
            e.preventDefault();
            setCustomValue(id, TEST_LINKS);
          }}>
          JSON Update
        </Button>
      </>
    );
  }
  return null;
};

export default CustomComponent;
