import { Filter } from '@/components/Aside/Filter/Filter';
import { Advertising } from '@/components/Aside/Advertising/Advertising';

import { useEventStore } from '@/store/eventStore';

import './Aside.scss';

export const Aside = () => {
  const filter = useEventStore((state) => state.filter);
  return (
    <aside className={filter ? 'aside' : 'aside hidden'}>
      <div className="aside__sticky">
        <Filter />
        <Advertising />
      </div>
    </aside>
  );
};
