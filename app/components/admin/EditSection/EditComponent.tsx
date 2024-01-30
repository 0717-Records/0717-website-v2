import { ComponentData, FieldDataType } from '@/app/types';
import Input from '../../inputs/Input';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import TextArea from '../../inputs/TextArea';
import toSentenceCase from '@/app/libs/toSentenceCase';

interface EditComponentProps {
  component: ComponentData;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  isLoading?: boolean;
}

const EditComponent = ({ component, register, isLoading = false, errors }: EditComponentProps) => {
  const { fields } = component;

  return (
    <>
      {/* If component.custom === true then pass into a custom component handler. Otherwise render fields one by one */}
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
