'use client';

import { useEffect, useState } from 'react';
import Heading from '../components/Heading';
import InputComponent from '../components/InputComponent/InputComponent';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import ButtonComponent from '../components/ButtonComponent/ButtonComponent';
import Link from 'next/link';
import { AiOutlineGoogle } from 'react-icons/ai';
import { useGlobalState } from '@/context/context';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Notification from '../components/Notification';
import { SafeUser } from '@/types';

function RegisterForm({ currentUser }: { currentUser: SafeUser | null }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push('/');
      router.refresh();
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post('/api/register', data)
      .then((res) => {
        toast.success('Account created successfully');

        signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((res) => {
          if (res?.error) {
            toast.error(res.error);
          } else {
            router.push('/cart');
            router.refresh();
            toast.success('Logged in successfully');
          }
        });
      })
      .catch(() => {
        toast.error('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (currentUser) {
    return (
      <p className="text--center font-semibold">Logged in. Redirecting....</p>
    );
  }

  return (
    <>
      <Heading title="Sign Up" />
      <ButtonComponent
        outline
        label="Sign Up with Google"
        icon={AiOutlineGoogle}
        onClick={() => {
          signIn('google');
        }}
      />
      <hr className="horizontal-line" />
      <InputComponent
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <InputComponent
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <InputComponent
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <ButtonComponent
        label={isLoading ? 'Loading' : 'Sign Up'}
        onClick={handleSubmit(onSubmit)}
      />
      <p
        className={`registration-p`}
      >
        Already have an account?{' '}
        <Link className="underline" href="/login">
          Login
        </Link>
      </p>
      <Notification />
    </>
  );
}

export default RegisterForm;
