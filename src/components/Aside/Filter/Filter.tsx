import { FilterSale } from '@/components/Aside/Filter/FilterSale';
import { FilterSize } from '@/components/Aside/Filter/FilterSize';
import { FilterPrice } from '@/components/Aside/Filter/FilterPrice';
import { FilterAvailable } from '@/components/Aside/Filter/FilterAviable';
import { FilterCategory } from '@/components/Aside/Filter/FilterCagegory';

import './Filter.scss';

export const Filter = () => {
  return (
    <div className="filter">
      <FilterCategory />
      <FilterSize />
      <FilterSale />
      <FilterAvailable />
      <FilterPrice />
    </div>
  );
};
