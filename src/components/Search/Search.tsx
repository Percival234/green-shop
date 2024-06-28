import { FiSearch } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { useDebounce } from '@/hooks/useDebounce';

import './Search.scss';

export const Search = () => {
  const client = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const debouncedSearch = useDebounce<string>(search, 500);

  useEffect(() => {
    setSearchParams((prev) => {
      if (debouncedSearch) {
        prev.set('search', debouncedSearch);
      } else {
        prev.delete('search');
      }
      return prev;
    });
    searchParams.delete('page');
    client.invalidateQueries({ queryKey: ['products'] });
  }, [debouncedSearch, client, setSearchParams, searchParams]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value);

  return (
    <div className="search">
      <FiSearch size={24} className="search__icon" />
      <input
        value={search}
        onChange={onChange}
        type="text"
        placeholder="Search"
        className="search__field"
        id="search"
      />
    </div>
  );
};
