import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UpdateUserType } from '@/types/user';

import { Title } from '@/components/UI/Title/Title';
import { Button } from '@/components/UI/Button/Button';
import { ErrorForm } from '@/components/UI/Error/Error';
import { InputWithLabel } from '@/components/UI/Input/Input';
import { LoadingButton } from '@/components/UI/Loading/Loading';

import { useUserStore } from '@/store/userStore';

import { updateUser } from '@/API/API';

import { REGEX_EMAIL } from '@/constants/EMAIL_REGEX';

type PersonalFormProps = {
  personalFirstname: string;
  personalLastname: string;
  personalEmail: string;
  personalPhone: string;
  personalAddress: string;
  personalCity: string;
};

export const AccountPersonal = () => {
  const client = useQueryClient();
  const user = useUserStore((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PersonalFormProps>();

  const { mutate, isPending } = useMutation({
    mutationFn: (userData: UpdateUserType) => updateUser(userData),
    onSuccess: (data) => {
      client.invalidateQueries({ queryKey: ['user'] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  useEffect(() => {
    if (user) {
      setValue('personalFirstname', user.firstname);
      setValue('personalLastname', user.lastname);
      setValue('personalEmail', user.email);
      setValue('personalPhone', user.phone);
      setValue('personalAddress', user.address);
      setValue('personalCity', user.city);
    }
  }, [user, setValue]);

  const personalUpdateSubmit: SubmitHandler<PersonalFormProps> = ({
    personalFirstname,
    personalLastname,
    personalEmail,
    personalPhone,
    personalAddress,
    personalCity,
  }) => {
    const userData = {
      firstname: personalFirstname,
      lastname: personalLastname,
      email: personalEmail,
      phone: personalPhone,
      address: personalAddress,
      city: personalCity,
    };
    mutate(userData);
  };

  return (
    <form onSubmit={handleSubmit(personalUpdateSubmit)}>
      <Title size="medium" variant="border">
        Personal information
      </Title>
      <InputWithLabel
        register={{
          ...register('personalFirstname', {
            required: 'First name is required',
            validate: (value) => value.length >= 3 || 'First name is too short',
          }),
        }}
        label="First name"
      />
      <ErrorForm error={errors?.personalFirstname?.message} />
      <InputWithLabel
        register={{
          ...register('personalLastname', {
            required: 'Last name is required',
            validate: (value) => value.length >= 3 || 'Last name is too short',
          }),
        }}
        label="Last name"
      />
      <ErrorForm error={errors?.personalLastname?.message} />
      <InputWithLabel
        register={{
          ...register('personalEmail', {
            required: 'Email is required',
            pattern: {
              value: REGEX_EMAIL,
              message: 'Please enter valid email',
            },
          }),
        }}
        label="Email"
      />
      <ErrorForm error={errors?.personalEmail?.message} />
      <InputWithLabel
        register={{
          ...register('personalPhone', {
            required: 'Phone number is required',
            validate: (value) =>
              (value.length > 9 && value.length < 12) || 'Uncorrect phone number',
          }),
        }}
        type="number"
        label="Phone number"
      />
      <ErrorForm error={errors?.personalPhone?.message} />
      <InputWithLabel
        register={{
          ...register('personalCity', {
            required: 'City / town is required',
            validate: (value) => value.length >= 3 || 'Uncorrect City / town name',
          }),
        }}
        label="City / town"
      />
      <ErrorForm error={errors?.personalCity?.message} />
      <InputWithLabel
        register={{
          ...register('personalAddress', {
            required: 'Address is required',
            validate: (value) => value.length >= 3 || 'Uncorrect address',
          }),
        }}
        label="Street address"
        placeholder="House number and street name"
      />
      <ErrorForm error={errors?.personalAddress?.message} />
      <Button disabled={isPending} type="submit">
        {isPending ? <LoadingButton /> : 'Save changes'}
      </Button>
    </form>
  );
};
