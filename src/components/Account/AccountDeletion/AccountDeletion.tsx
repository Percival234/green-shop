import { Title } from '@/components/UI/Title/Title';
import { Button } from '@/components/UI/Button/Button';

import { useEventStore } from '@/store/eventStore';

import './AccountDeletion.scss';

export const AccountDeletion = () => {
  const open = useEventStore((state) => state.open);
  const openUserDeleteModal = () => open('userDeleteModal');

  return (
    <div className="account-deletion">
      <Title size="small" variant="border">
        Account deletion
      </Title>
      <div className="account-deletion__content">
        <p>Do you want to delete your account? All data will be cleared!</p>
        <Button variant="outline" onClick={openUserDeleteModal}>
          Delete
        </Button>
      </div>
    </div>
  );
};
