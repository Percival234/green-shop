import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { CategoryType } from '@/type/category';

import { Title } from '@/components/UI/Title/Title';
import { ErrorServer } from '@/components/UI/Error/Error';
import { LoadingLocal } from '@/components/UI/Loading/Loading';
import { RelatedSlider } from '@/components/Related/RelatedSlider/RelatedSlider';

import { getRelated } from '@/API/API';

import './Related.scss';

type RelatedProps = {
  category: CategoryType;
};

export const Related: React.FC<RelatedProps> = ({ category }) => {
  const { id } = useParams();

  const { data, isPending, error } = useQuery({
    queryKey: ['related'],
    queryFn: () => getRelated(category._id, String(id)),
  });

  if (isPending) return <LoadingLocal />;
  if (error) return <ErrorServer error={error} />;

  return (
    <div className="related">
      <Title variant="border" size="small">
        Related Products
      </Title>
      <RelatedSlider related={data.products} />
    </div>
  );
};