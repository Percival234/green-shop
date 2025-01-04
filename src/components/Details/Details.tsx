import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { DetailList } from './DetailList';
import { ErrorServer } from '@/components/UI/Error/Error';
import { LoadingLocal } from '@/components/UI/Loading/Loading';

import { DetailService } from '@/api/services/detail-service';

import './Details.scss';

export const Details = () => {
  const { id } = useParams();

  const { data, isPending, error } = useQuery({
    queryKey: ['details', id],
    queryFn: () => DetailService.getProductDetails(String(id)),
  });

  if (isPending) return <LoadingLocal />;
  if (error) return <ErrorServer error={error} />;

  return <DetailList details={data} />;
};
