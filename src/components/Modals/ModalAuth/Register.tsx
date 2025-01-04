import { toast } from 'react-toastify';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CredentialsType } from '@/types/credentials';

import { Button } from '@/components/UI/Button/Button';
import { ErrorForm } from '@/components/UI/Error/Error';
import { Input, InputPass } from '@/components/UI/Input/Input';
import { LoadingButton } from '@/components/UI/Loading/Loading';

import { AuthService } from '@/api/services/auth-service';

import { useEventStore } from '@/store/eventStore';

import { REGEX_EMAIL } from '@/constants/EMAIL_REGEX';

import { catchError } from '@/helpers/catchError';

type RegisterFormProps = {
  registerEmail: string;
  registerPassword: string;
  registerPasswordConfirm: string;
};

export const Register = () => {
  const queryqueryClient = useQueryClient();
  const close = useEventStore((state) => state.close);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormProps>();

  const { mutate, isPending } = useMutation({
    mutationFn: (credentials: CredentialsType) => AuthService.register(credentials),
    onSuccess: () => {
      queryqueryClient.invalidateQueries({ queryKey: ['user'] });
      close('authModal');
    },
    onError: (error) => {
      toast.error(catchError(error));
    },
  });

  const submitRegister: SubmitHandler<RegisterFormProps> = ({
    registerEmail,
    registerPassword,
  }) => {
    const credentials = {
      email: registerEmail,
      password: registerPassword,
    };
    mutate(credentials);
  };

  return (
    <form onSubmit={handleSubmit(submitRegister)} className="auth-modal__form">
      <p>Enter your email and password to register</p>
      <div className="auth-modal__fields">
        <Input
          register={{
            ...register('registerEmail', {
              pattern: {
                value: REGEX_EMAIL,
                message: 'Please enter valid email',
              },
              required: 'Email address is required',
            }),
          }}
          placeholder="Enter your email address"
        />
        <InputPass
          register={{
            ...register('registerPassword', {
              validate: (value) => value.length >= 8 || 'Password is too short',
              required: 'Password is required',
            }),
          }}
          placeholder="Password"
        />
        <InputPass
          register={{
            ...register('registerPasswordConfirm', {
              validate: (value) => value === watch('registerPassword') || 'Passwords do not match',
              required: 'Password confirm is required',
            }),
          }}
          placeholder="Confirm password"
        />
      </div>
      <ErrorForm
        error={
          errors?.registerEmail?.message ||
          errors?.registerPassword?.message ||
          errors?.registerPasswordConfirm?.message
        }
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? <LoadingButton /> : 'Register'}
      </Button>
    </form>
  );
};
