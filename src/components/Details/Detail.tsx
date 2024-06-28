import { DetailType } from '@/type/detail';

import { Title } from '@/components/UI/Title/Title';

type DetailProps = {
  detail: DetailType;
};

export const Detail: React.FC<DetailProps> = ({ detail: { title, description } }) => {
  return (
    <div className="details__detail">
      <Title size="medium">{`${title}:`}</Title>
      <p>{description}</p>
    </div>
  );
};
