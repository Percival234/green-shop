import { toast } from 'react-toastify';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UpdatePasswordType } from '@/types/user';

import { Title } from '@/components/UI/Title/Title';
import { ErrorForm } from '@/components/UI/Error/Error';
import { Button } from '@/components/UI/Button/Button';
import { InputWithLabel } from '@/components/UI/Input/Input';
import { LoadingButton } from '@/components/UI/Loading/Loading';

import { UserService } from '@/api/services/user-service';

import { catchError } from '@/helpers/catchError';

import { useUser } from '@/hooks/useUser';

type PasswordFormProps = {
  newPassword: string;
  newPasswordConfirm: string;
};

export const AccountPassword = () => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<PasswordFormProps>();
  const { data: user } = useUser();

  const { mutate, isPending } = useMutation({
    mutationFn: (userData: UpdatePasswordType) => {
      if (!user?._id) {
        throw new Error('User ID is missing');
      }
      return UserService.update(user._id, userData);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      reset();
      toast.success(res.message);
    },
    onError: (error) => {
      toast.error(catchError(error));
    },
  });

  const passwordResetSubmit: SubmitHandler<PasswordFormProps> = ({ newPassword }) => {
    const userData = {
      password: newPassword,
    };
    if (!user?._id) {
      toast.error('User ID is missing');
      return;
    }
    mutate(userData);
  };

  return (
    <form id="password-reset" onSubmit={handleSubmit(passwordResetSubmit)}>
      <Title variant="border" size="medium">
        Password change
      </Title>
      <InputWithLabel
        register={{
          ...register('newPassword', {
            validate: (value) => value.length >= 8 || 'Password is too short',
          }),
        }}
        label="new password"
      />
      <ErrorForm error={errors?.newPassword?.message} />
      <InputWithLabel
        register={{
          ...register('newPasswordConfirm', {
            validate: (value) => watch('newPasswordConfirm') === value || 'Passwords don`t match',
          }),
        }}
        label="confirm new password"
      />
      <ErrorForm error={errors?.newPasswordConfirm?.message} />
      <Button disabled={isPending} type="submit">
        {isPending ? <LoadingButton /> : 'Change password'}
      </Button>
    </form>
  );
};
