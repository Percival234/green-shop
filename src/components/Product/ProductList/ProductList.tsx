import { FiShoppingCart } from 'react-icons/fi';

import { ProductType } from '@/type/product';

import { Empty } from '@/components/UI/Empty/Empty';
import { ProductCard } from '@/components/Product/ProductCard/ProductCard';

import './ProductList.scss';

type ProductListProps = {
  products: ProductType[];
};

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  if (!products?.length) return <Empty text="No result" Icon={FiShoppingCart} />;

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};
