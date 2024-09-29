import { ProductCard } from '@/components/Product/ProductCard/ProductCard';

import { ProductType } from '@/types/product';

import './RelatedSlide.scss';

type RelatedSlideProps = {
  related: ProductType[];
  width: number;
  slides: number;
};

export const RelatedSlide: React.FC<RelatedSlideProps> = ({ related, width, slides }) => {
  return (
    <div
      style={{ gridTemplateColumns: `repeat(${slides}, 1fr)`, minWidth: `${width}px` }}
      className="related-slide">
      {related.map((relate) => (
        <ProductCard key={relate._id} product={relate} />
      ))}
    </div>
  );
};
