import { IconType } from 'react-icons/lib';

import './Empty.scss';

type EmptyProps = {
  text: string;
  Icon: IconType;
};

export const Empty: React.FC<EmptyProps> = ({ Icon, text }) => {
  return (
    <div className="empty">
      <div className="empty__icon">{<Icon />}</div>
      <p className="empty__text">{text}</p>
    </div>
  );
};
