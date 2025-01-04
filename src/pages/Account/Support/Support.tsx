import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';

import { CreateReportType } from '@/types/report';

import { Title } from '@/components/UI/Title/Title';
import { Button } from '@/components/UI/Button/Button';
import { ErrorForm } from '@/components/UI/Error/Error';
import { TextArea } from '@/components/UI/TextArea/TextArea';
import { LoadingButton } from '@/components/UI/Loading/Loading';

import { ReportService } from '@/api/services/report-service';

import { useRequiredAuth } from '@/hooks/useRequiredAuth';

import { catchError } from '@/helpers/catchError';

import './Support.scss';

type ReportFormProps = {
  reportText: string;
};

export const Support = () => {
  const authCheck = useRequiredAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReportFormProps>();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateReportType) => ReportService.create(data),
    onSuccess: (res) => {
      toast.success(res.message);
      reset();
    },
    onError: (error) => {
      toast.error(catchError(error));
    },
  });

  const submitReport: SubmitHandler<ReportFormProps> = ({ reportText }) => {
    const report = { text: reportText };
    mutate(report);
  };

  return (
    <div className="support">
      <Title size="medium" variant="border">
        Support
      </Title>
      <form onSubmit={handleSubmit(authCheck(submitReport))} className="support__form">
        <p>If you encounter any issues, please feel free to contact us, and we will assist you!</p>
        <TextArea
          register={{
            ...register('reportText', {
              required: 'Report text is required',
              validate: (value) => value.length <= 500 || 'Limit 500 characters',
            }),
          }}
          placeholder="Describe your problem ..."
        />
        <ErrorForm error={errors?.reportText?.message} />
        <Button type="submit" disabled={isPending}>
          {isPending ? <LoadingButton /> : 'Send Report'}
        </Button>
      </form>
    </div>
  );
};
