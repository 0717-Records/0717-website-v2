import { ComponentData, FieldDataType } from '@/app/types';
import Input from '../Inputs/Input';
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import TextArea from '../Inputs/TextArea';
import toSentenceCase from '@/app/libs/toSentenceCase';
import CustomComponent from './CustomComponent';
import ImageUpload from '../ImageUpload';
import { MutableRefObject } from 'react';

interface EditComponentProps {
  component: ComponentData;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  isLoading?: boolean;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  saving: boolean;
  resetImageRef?: MutableRefObject<(() => void) | null>;
}

const EditComponent = ({
  component,
  register,
  isLoading = false,
  errors,
  watch,
  setValue,
  saving,
  resetImageRef,
}: EditComponentProps) => {
  const { fields, custom, unique_name } = component;

  // used for non-standard fields
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  if (custom)
    return (
      <CustomComponent
        name={unique_name}
        fields={fields}
        watch={watch}
        setValue={setValue}
        isLoading={isLoading}
      />
    );

  return (
    <>
      {/* Extract the below into field type rendering function */}
      {fields.map((field) => {
        if (field.type === FieldDataType.String)
          return (
            <Input
              key={field.id}
              id={field.id}
              label={toSentenceCase(field.displayName)}
              register={register}
              disabled={isLoading}
              errors={errors}
            />
          );
        if (field.type === FieldDataType.Paragraph)
          return (
            <TextArea
              key={field.id}
              id={field.id}
              label={toSentenceCase(field.displayName)}
              register={register}
              errors={errors}
              disabled={isLoading}
              rows={6}
            />
          );
        if (field.type === FieldDataType.Image) {
          const id = field?.id || '';
          const imageSrc = watch(id);

          return (
            <ImageUpload
              key={field.id}
              onChange={(value) => setCustomValue(id, value)}
              value={imageSrc}
              disabled={isLoading}
              isEdit
              saving={saving}
              resetImageRef={resetImageRef}
            />
          );
        }
        return null;
      })}
    </>
  );
};

export default EditComponent;
