import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { Title } from '@/components/UI/Title/Title';
import { Button } from '@/components/UI/Button/Button';

import { MIN_PRICE_VALUE, MAX_PRICE_VALUE, PRICE_RANGE_STEP } from '@/constants/PRICE_RANGE';

export const FilterPrice = () => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || MIN_PRICE_VALUE);
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || MAX_PRICE_VALUE);

  const handlePriceValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.id === 'min-price'
      ? setMinPrice(Math.min(+event.target.value, +maxPrice))
      : setMaxPrice(Math.max(+event.target.value, +minPrice));
  };

  const handlePrice = () => {
    setSearchParams((prev) => {
      if (+minPrice > MIN_PRICE_VALUE) {
        prev.set('minPrice', String(minPrice));
      } else {
        prev.delete('minPrice');
      }

      if (+maxPrice < MAX_PRICE_VALUE) {
        prev.set('maxPrice', String(maxPrice));
      } else {
        prev.delete('maxPrice');
      }

      prev.delete('page');

      return prev;
    });
    queryClient.invalidateQueries({ queryKey: ['products'] });
  };

  return (
    <div className="filter__form">
      <Title tag="h4" size="small">
        Price Range
      </Title>
      <label className="filter__double-range">
        <div
          style={{
            background: `linear-gradient(to right, var(--clr-gray-light) ${
              (+minPrice / MAX_PRICE_VALUE) * 100
            }% , var(--clr-primary) ${(+minPrice / MAX_PRICE_VALUE) * 100}% , var(--clr-primary) ${
              (+maxPrice / MAX_PRICE_VALUE) * 100
            }%, var(--clr-gray-light) ${(+maxPrice / MAX_PRICE_VALUE) * 100}%)`,
          }}
          className="filter__slider-track"></div>
        <input
          type="range"
          min={MIN_PRICE_VALUE}
          max={MAX_PRICE_VALUE - PRICE_RANGE_STEP}
          step={PRICE_RANGE_STEP}
          value={minPrice}
          id="min-price"
          onChange={handlePriceValue}
        />
        <input
          type="range"
          min={MIN_PRICE_VALUE + PRICE_RANGE_STEP}
          max={MAX_PRICE_VALUE}
          step={PRICE_RANGE_STEP}
          value={maxPrice}
          id="max-price"
          onChange={handlePriceValue}
        />
      </label>
      <div className="filter__item">
        Price:
        <div className="filter__price">{`$${minPrice} - $${maxPrice}`}</div>
      </div>
      <Button onClick={handlePrice}>Find</Button>
    </div>
  );
};
