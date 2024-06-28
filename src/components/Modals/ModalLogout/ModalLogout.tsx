import { Modal } from '@/components/UI/Modal/Modal';
import { Title } from '@/components/UI/Title/Title';

import { useUserStore } from '@/store/userStore';

import './ModalLogout.scss';

export const ModalLogout = () => {
  const logout = useUserStore((state) => state.logout);

  return (
    <Modal name="logoutModal" cancel confirm={logout}>
      <div className="logout-modal">
        <Title size="medium" centered>
          Logout
        </Title>
        <p>Do you want to logout?</p>
      </div>
    </Modal>
  );
};
