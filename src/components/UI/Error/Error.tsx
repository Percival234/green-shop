import { AxiosError } from 'axios';

import './Error.scss';

type ErrorServerProps = {
  error: AxiosError<{ message: string }> | null | undefined;
};

export const ErrorServer: React.FC<ErrorServerProps> = ({ error }) => {
  return <div className="server-error">{error?.response?.data?.message}</div>;
};

type ErrorFormProps = {
  error: string | undefined;
};

export const ErrorForm: React.FC<ErrorFormProps> = ({ error }) => {
  return <div className="form-error">{error}</div>;
};
