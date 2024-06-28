import { ProductInfoType } from '@/type/product';

import { Price } from '@/components/Price/Price';
import { Title } from '@/components/UI/Title/Title';
import { Rating } from '@/components/Rating/Rating';
import { ProductAction } from '@/components/Product/ProductAction/ProductAction';

import { SERVER_URL } from '@/constants/SERVER_URL';

import './ProductInfo.scss';

type ProductProps = {
  product: ProductInfoType;
};

export const ProductInfo: React.FC<ProductProps> = ({ product }) => {
  const {
    _id,
    name,
    size,
    sale,
    image,
    price,
    rating,
    quantity,
    category,
    description,
    reviewsLength,
  } = product;

  return (
    <div className="product-info__container">
      <div className="product-info__image-container">
        {sale ? <div className="product-info__sale">{sale}%OFF</div> : ''}
        <img src={`${SERVER_URL}/static/products/${image}`} alt={name} className="product__image" />
      </div>
      <div className="product-info__description">
        <Title tag="h1">{name}</Title>
        <div className="product-info__info">
          <div className="product-info__price">
            <Price price={price} sale={sale} />
          </div>
          <div className="product-info__rating-info">
            <Rating number rating={rating} />
            <div>{reviewsLength} Reviews</div>
          </div>
        </div>
        <Title tag="h2" size="medium">
          Short Description:
        </Title>
        <p>{description}</p>
        <ProductAction product={product} />
        <div>
          <strong>ID: </strong>
          <span>{_id}</span>
        </div>
        <div>
          <strong>Category: </strong>
          <span>{category.category}</span>
        </div>
        <div>
          <strong>Size: </strong>
          <span>{size.size}</span>
        </div>
        <div>
          <strong>Quantity: </strong>
          <span>{quantity}</span>
        </div>
      </div>
    </div>
  );
};
