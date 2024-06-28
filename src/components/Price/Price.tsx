import './Price.scss';

type PriceProps = {
  price: number;
  sale: number;
};

export const Price: React.FC<PriceProps> = ({ price, sale }) => {
  const currentPrice = sale ? price - (price * sale) / 100 : price;
  return (
    <div className="prices">
      <div className="prices__price_solid">{currentPrice.toFixed(2)}$</div>
      {sale ? <div className="prices__price_fake">{price.toFixed(2)}$</div> : ''}
    </div>
  );
};
