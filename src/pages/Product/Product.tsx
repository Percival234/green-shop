import { useQuery } from '@tanstack/react-query';
import { Outlet, useParams } from 'react-router-dom';

import { ErrorServer } from '@/components/UI/Error/Error';
import { Contacts } from '@/components/Contacts/Contacts';
import { LoadingPage } from '@/components/UI/Loading/Loading';
import { Related } from '@/components/Related/Related/Related';
import { NewsLetter } from '@/components/NewsLetter/NewsLetter';
import { ProductInfo } from '@/components/Product/ProductInfo/ProductInfo';
import { ProductAbout } from '@/components/Product/ProductAbout/ProductAbout';

import { ProductService } from '@/api/services/product-service';

import './Product.scss';

export const Product = () => {
  const { id } = useParams();

  const {
    data: product,
    isPending,
    error,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => ProductService.getById(String(id)),
  });

  if (isPending) return <LoadingPage />;
  if (error) return <ErrorServer error={error} />;

  return (
    <div className={product.quantity ? 'product' : 'product disactive'}>
      <ProductInfo product={product} />
      <ProductAbout />
      <Outlet />
      <Related category={product.category} />
      <NewsLetter />
      <Contacts />
    </div>
  );
};
