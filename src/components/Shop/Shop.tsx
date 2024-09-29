import { useQuery } from '@tanstack/react-query';

import { Sort } from '@/components/Sort/Sort';
import { Search } from '@/components/Search/Search';
import { Aside } from '@/components/Aside/Aside/Aside';
import { ErrorServer } from '@/components/UI/Error/Error';
import { LoadingLocal } from '@/components/UI/Loading/Loading';
import { Pagination } from '@/components/Pagination/Pagination';
import { ProductList } from '@/components/Product/ProductList/ProductList';

import { getProducts } from '@/API/API';

import './Shop.scss';

export const Shop = () => {
  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    refetchOnMount: true,
  });

  if (isPending) return <LoadingLocal />;
  if (error) return <ErrorServer error={error} />;

  return (
    <div className="shop">
      {isFetching && <div className="shop__loading"></div>}
      <div className="shop__container">
        <Aside />
        <div className="shop__flex">
          <Search />
          <Sort />
          <ProductList products={data.products} />
          <Pagination pagesCount={data.pagesCount} />
        </div>
      </div>
    </div>
  );
};
