import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { Title } from '@/components/UI/Title/Title';
import { Button } from '@/components/UI/Button/Button';

import { useEventStore } from '@/store/eventStore';

import { SORT_ORDERS } from '@/constants/SORT_ORDERS';

import './Sort.scss';

export const Sort = () => {
  const queryClient = useQueryClient();
  const [isVisible, setIsVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const toggle = useEventStore((state) => state.toggle);

  const handleSortOrder = (order: string) => {
    setSearchParams((prev) => {
      if (order === SORT_ORDERS[0]) {
        prev.delete('sort');
      } else {
        prev.set('sort', order);
      }

      prev.delete('page');

      return prev;
    });
    queryClient.invalidateQueries({ queryKey: ['products'] });
  };

  const handleSortVisible = () => setIsVisible(!isVisible);
  const handleFiltersVisible = () => toggle('filter');

  return (
    <div className="sort">
      <div className="sort__container">
        <Title tag="h4" size="small">
          Short by:
        </Title>
        <div className="sort__select" onClick={handleSortVisible}>
          <div className="sort__option-current sort__option">
            {searchParams.get('sort') || SORT_ORDERS[0]}
          </div>
          {isVisible && (
            <div className="sort__menu">
              {SORT_ORDERS.map((order) => (
                <div
                  className={
                    searchParams.get('sort') == order ||
                    (order == SORT_ORDERS[0] && !searchParams.has('sort'))
                      ? 'sort__option hidden'
                      : 'sort__option'
                  }
                  key={order}
                  onClick={() => handleSortOrder(order)}>
                  {order}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="filter__button">
        <Button onClick={handleFiltersVisible}>Filters</Button>
      </div>
    </div>
  );
};
