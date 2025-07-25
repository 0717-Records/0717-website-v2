'use client';

import Button from '@/app/components/Button';
import Heading from '@/app/components/Heading';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import TextArea from '@/app/components/inputs/TextArea';
import { SectionData } from '@/app/types';
import EditComponent from '@/app/components/admin/EditSection/EditComponent';
import updateSectionHandler from '@/app/dispatchers/updateSectionHandler';

const EditSectionClient = (section: SectionData) => {
  const { id, title, sub_title, components } = section;

  const router = useRouter();

  const fieldArr = components.flatMap((component) => component.fields);

  const fieldVals = fieldArr.reduce((acc, item) => {
    acc[item.id] = item.value;
    return acc;
  }, {} as Record<string, any>);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { sub_title, ...fieldVals },
  });

  const updateSection: SubmitHandler<FieldValues> = async (data) => {
    try {
      await updateSectionHandler({ id, data, fieldArr });
      router.refresh();
    } catch (error: any) {
      // ADD ERROR HANDLING HERE
    }
  };

  return (
    <div>
      <Heading type='h2'>{`Edit Section: ${title}`}</Heading>
      <form>
        <TextArea
          id='sub_title'
          label='Sub Title'
          register={register}
          errors={errors}
          required
          rows={5}
        />
        {components.map((component) => (
          <EditComponent
            key={component.id}
            component={component}
            register={register}
            errors={errors}
          />
        ))}
        <Button
          submit
          label='Save'
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(updateSection)(e);
          }}
        />
        <Button
          outline
          label='Back'
          onClick={(e) => {
            e.preventDefault();
            router.push('/admin');
          }}
        />
      </form>
    </div>
  );
};

export default EditSectionClient;
