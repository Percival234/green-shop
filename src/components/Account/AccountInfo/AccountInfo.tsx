import { AccountPersonal } from '@/components/Account/AccountPersonal/AccountPersonal';
import { AccountDeletion } from '@/components/Account/AccountDeletion/AccountDeletion';
import { AccountPassword } from '@/components/Account/AccountPassword/AccountPassword';

import './AccountInfo.scss';

export const AccountInfo = () => {
  return (
    <div className="account-info">
      <div className="account-info__forms">
        <AccountPersonal />
      </div>
      <div className="account-info__forms">
        <AccountPassword />
      </div>
      <AccountDeletion />
    </div>
  );
};
