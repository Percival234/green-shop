import { toast } from 'react-toastify';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CredentialsType } from '@/types/credentials';

import { Button } from '@/components/UI/Button/Button';
import { ErrorForm } from '@/components/UI/Error/Error';
import { Input, InputPass } from '@/components/UI/Input/Input';
import { LoadingButton } from '@/components/UI/Loading/Loading';

import { useEventStore } from '@/store/eventStore';

import { AuthService } from '@/api/services/auth-service';

import { REGEX_EMAIL } from '@/constants/EMAIL_REGEX';

import { catchError } from '@/helpers/catchError';

type LoginFormProps = {
  loginEmail: string;
  loginPassword: string;
};

export const Login = () => {
  const queryqueryClient = useQueryClient();
  const close = useEventStore((state) => state.close);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>();

  const { mutate, isPending } = useMutation({
    mutationFn: (credentials: CredentialsType) => AuthService.login(credentials),
    onSuccess: () => {
      queryqueryClient.invalidateQueries({ queryKey: ['user'] });
      close('authModal');
    },
    onError: (error) => {
      toast.error(catchError(error));
    },
  });

  const submitLogin: SubmitHandler<LoginFormProps> = ({ loginEmail, loginPassword }) => {
    const credentials = {
      email: loginEmail,
      password: loginPassword,
    };
    mutate(credentials);
  };

  return (
    <form onSubmit={handleSubmit(submitLogin)} className="auth-modal__form">
      <p>Enter your email and password to login</p>
      <div className="auth-modal__fields">
        <Input
          register={{
            ...register('loginEmail', {
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
            ...register('loginPassword', {
              validate: (value) => value.length >= 8 || 'Password is too short',
              required: 'Password is required',
            }),
          }}
          placeholder="Password"
        />
      </div>
      <ErrorForm error={errors?.loginEmail?.message || errors?.loginPassword?.message} />
      <Button disabled={isPending} type="submit">
        {isPending ? <LoadingButton /> : 'Login'}
      </Button>
    </form>
  );
};
