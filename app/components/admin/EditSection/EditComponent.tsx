import { ComponentData, FieldDataType } from '@/app/types';
import Heading from '../../typography/Heading';
import Input from '../../inputs/Input';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import TextArea from '../../inputs/TextArea';

interface EditComponentProps {
  component: ComponentData;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const EditComponent = ({ component, register, errors }: EditComponentProps) => {
  const { fields } = component;

  return (
    <>
      <Heading key={component.id} type='h3'>
        {component.name || ''}
      </Heading>
      {/* If component.custom === true then pass into a custom component handler. Otherwise render fields one by one */}
      {/* Extract the below into field type rendering function */}
      {fields.map((field) => {
        if (field.type === FieldDataType.String)
          return (
            <Input
              key={field.id}
              id={field.id}
              label={field.name}
              register={register}
              errors={errors}
            />
          );
        if (field.type === FieldDataType.Paragraph)
          return (
            <TextArea
              key={field.id}
              id={field.id}
              label={field.name}
              register={register}
              errors={errors}
            />
          );
        return null;
      })}
    </>
  );
};

export default EditComponent;
