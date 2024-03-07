'use client';

import Button from '@/app/components/admin/ui/Button';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import TextArea from '@/app/components/admin/inputs/TextArea';
import { SectionData } from '@/app/types';
import EditComponent from '@/app/components/admin/EditSection/EditComponent';
import updateSectionHandler from '@/app/dispatchers/updateSectionHandler';
import HeaderBar from '@/app/components/admin/HeaderBar';
import EditContainer from '@/app/components/admin/EditSection/EditContainer';
import MyHeading from '@/app/components/admin/typography/Heading';
import { useState } from 'react';
import toast from 'react-hot-toast';

const EditSectionClient = (section: SectionData) => {
  const { id, title, sub_title, components } = section;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const fieldArr = components.flatMap((component) => component.fields);

  const fieldVals = fieldArr.reduce((acc, item) => {
    acc[item.id] = item.value;
    return acc;
  }, {} as Record<string, any>);

  const defaultValues = { sub_title, ...fieldVals };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues,
  });

  const updateSection: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await updateSectionHandler({ id, data, fieldArr });
      toast.success('Content saved!');
      router.refresh();
    } catch (error: any) {
      console.error(error);
      let message = error?.response?.data || '';
      message =
        message !== '' ? message : 'Cannot update content right now. Please try again later.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <HeaderBar>
        <MyHeading title={title || ''} />
        <div className='mb-2'>
          <Button
            outline
            disabled={isLoading}
            onClick={() => {
              reset(defaultValues);
            }}>
            Reset
          </Button>
          <Button
            submit
            disabled={isLoading}
            className='ml-2'
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(updateSection)(e);
            }}>
            Save
          </Button>
        </div>
      </HeaderBar>

      <form>
        <EditContainer heading='Sub Title'>
          <TextArea
            id='sub_title'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            rows={3}
          />
        </EditContainer>

        {components.map((component) => (
          <EditContainer key={component.id} heading={component.name}>
            <EditComponent
              component={component}
              isLoading={isLoading}
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
            />
          </EditContainer>
        ))}
      </form>
    </>
  );
};

export default EditSectionClient;
