import { FiInfo } from 'react-icons/fi';

import { DetailType } from '@/type/detail';

import { Detail } from './Detail';
import { Empty } from '@/components/UI/Empty/Empty';

type DetailListProps = {
  details: DetailType[];
};

export const DetailList: React.FC<DetailListProps> = ({ details }) => {
  if (!details?.length) return <Empty Icon={FiInfo} text="No details" />;

  return (
    <div className="details">
      {details.map((detail) => (
        <Detail key={detail._id} detail={detail} />
      ))}
    </div>
  );
};
