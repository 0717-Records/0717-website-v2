'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from './Inputs/Input';
import { useRouter } from 'next/navigation';
import Button from './ui/Button';

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      const callback = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (callback?.ok) {
        // ADD TOAST LOGIC HERE
        router.refresh();
        return;
      }

      if (callback?.error) {
        console.error(callback.error);
        setErrorMsg(callback.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
      // ADD TOAST LOGIC HERE
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className='flex flex-col gap-4 w-1/3 mx-auto mt-32'>
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        label='Password'
        type='password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {errorMsg && <p className='text-red-500'>{errorMsg}</p>}
      <Button
        onClick={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)(e);
        }}>
        Login
      </Button>
    </form>
  );
};

export default Login;
