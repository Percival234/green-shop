import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { Title } from '@/components/UI/Title/Title';

export const FilterSale = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const handleIsSale = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => {
      if (event.target.checked) {
        searchParams.set('sale', String(true));
      } else {
        searchParams.delete('sale');
      }
      prev.delete('page');
      return prev;
    });
    queryClient.invalidateQueries({ queryKey: ['products'] });
  };

  return (
    <div className="filter__form">
      <Title size="small" tag="h4">
        Sale
      </Title>
      <div className="filter__item">
        <input
          id="sale"
          type="checkbox"
          className="filter__checkbox"
          onChange={handleIsSale}
          checked={!!searchParams.get('sale')}
        />
        <label htmlFor="sale" className="filter__label">
          <div>Only sale</div>
        </label>
      </div>
    </div>
  );
};
