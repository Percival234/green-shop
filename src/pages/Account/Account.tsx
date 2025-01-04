import { Outlet, useNavigate } from 'react-router-dom';

import { LoadingPage } from '@/components/UI/Loading/Loading';
import { AccountMenu } from '@/components/Account/AccountMenu/AccountMenu';

import { useUser } from '@/hooks/useUser';

import './Account.scss';

export const Account = () => {
  const navigate = useNavigate();
  const { data: user, isPending } = useUser();

  if (isPending) return <LoadingPage />;
  if (!user) navigate('/');

  return (
    <div className="account">
      <AccountMenu />
      <div className="account__page">
        <Outlet />
      </div>
    </div>
  );
};
