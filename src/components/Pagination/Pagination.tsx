import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import './Pagination.scss';

type PaginationProps = {
  pagesCount: number;
};

export const Pagination: React.FC<PaginationProps> = ({ pagesCount }) => {
  const client = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePage = (page: number) => {
    setSearchParams((prev) => {
      if (page == 1) {
        prev.delete('page');
      } else {
        prev.set('page', String(page));
      }
      return prev;
    });
    client.invalidateQueries({ queryKey: ['products'] });
  };

  return (
    <div className="pag">
      {pagesCount > 1 &&
        [...Array(pagesCount)]
          .map((_, i) => i + 1)
          .map((page) => (
            <button
              key={page}
              onClick={() => handlePage(page)}
              className={
                searchParams.get('page') == String(page) || (page == 1 && !searchParams.has('page'))
                  ? 'pag__point active'
                  : 'pag__point'
              }>
              {page}
            </button>
          ))}
    </div>
  );
};
