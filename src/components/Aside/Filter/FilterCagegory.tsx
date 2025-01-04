import { useQuery } from '@tanstack/react-query';

import { FilterCritery } from './FilterCritery';
import { Title } from '@/components/UI/Title/Title';
import { ErrorServer } from '@/components/UI/Error/Error';
import { LoadingPage } from '@/components/UI/Loading/Loading';

import { CategoryService } from '@/api/services/category-service';

export const FilterCategory = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ['category'],
    queryFn: CategoryService.getMany,
  });

  if (isPending) return <LoadingPage />;
  if (error) return <ErrorServer error={error} />;

  return (
    <div className="filter__form">
      <Title tag="h4" size="small">
        Categories
      </Title>
      {data.map((category) => (
        <FilterCritery
          key={category._id}
          title={category.category}
          count={category.count}
          id={category._id}
          param="categories"
        />
      ))}
    </div>
  );
};
