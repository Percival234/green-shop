import { useQuery } from '@tanstack/react-query';

import { FilterCritery } from './FilterCritery';
import { Title } from '@/components/UI/Title/Title';
import { ErrorServer } from '@/components/UI/Error/Error';
import { LoadingPage } from '@/components/UI/Loading/Loading';

import { getSizes } from '@/API/API';

export const FilterSize = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ['size'],
    queryFn: getSizes,
  });

  if (isPending) return <LoadingPage />;
  if (error) return <ErrorServer error={error} />;

  return (
    <div className="filter__form">
      <Title size="small" tag="h4">
        Sizes
      </Title>
      {data.map((size) => (
        <FilterCritery
          key={size._id}
          title={size.size}
          count={size.count}
          id={size._id}
          param="sizes"
        />
      ))}
    </div>
  );
};
