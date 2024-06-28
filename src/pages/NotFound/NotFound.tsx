import { Link } from '@/components/UI/Link/Link';
import { Title } from '@/components/UI/Title/Title';

import './NotFound.scss';

export const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found__info">
        <Title tag="h2" className="not-found__code">
          404
        </Title>
        <Title tag="h1" className="not-found__text">
          Not Found
        </Title>
      </div>
      <Link to="/">Return to the home page</Link>
    </div>
  );
};
