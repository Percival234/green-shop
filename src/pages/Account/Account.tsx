import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { AccountMenu } from '@/components/Account/AccountMenu/AccountMenu';

import { useUserStore } from '@/store/userStore';

import './Account.scss';

export const Account = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);

  return (
    <div className="account">
      <AccountMenu />
      <div className="account__page">
        <Outlet />
      </div>
    </div>
  );
};
