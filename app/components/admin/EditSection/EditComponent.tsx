import { ComponentData, FieldDataType } from '@/app/types';
import Input from '../../inputs/Input';
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import TextArea from '../../inputs/TextArea';
import toSentenceCase from '@/app/libs/toSentenceCase';
import CustomComponent from './CustomComponent';

interface EditComponentProps {
  component: ComponentData;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  isLoading?: boolean;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const EditComponent = ({
  component,
  register,
  isLoading = false,
  errors,
  watch,
  setValue,
}: EditComponentProps) => {
  const { fields, custom, unique_name } = component;

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
              label={toSentenceCase(field.name)}
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
              label={toSentenceCase(field.name)}
              register={register}
              errors={errors}
              disabled={isLoading}
              rows={6}
            />
          );
        return null;
      })}
    </>
  );
};

export default EditComponent;
