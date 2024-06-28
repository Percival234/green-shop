import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { Title } from '@/components/UI/Title/Title';

export const FilterAvailable = () => {
  const client = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleIsAvailable = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => {
      if (event.target.checked) {
        searchParams.set('available', String(true));
      } else {
        searchParams.delete('available');
      }

      prev.delete('page');

      return prev;
    });
    client.invalidateQueries({ queryKey: ['products'] });
  };

  return (
    <div className="filter__form">
      <Title tag="h4" size="small">
        Available
      </Title>
      <div className="filter__item">
        <input
          id="available"
          type="checkbox"
          className="filter__checkbox"
          onChange={handleIsAvailable}
          checked={!!searchParams.get('available')}
        />
        <label htmlFor="available" className="filter__label">
          <div>Only Available</div>
        </label>
      </div>
    </div>
  );
};
