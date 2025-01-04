import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Modal } from '@/components/UI/Modal/Modal';
import { Title } from '@/components/UI/Title/Title';

import { AuthService } from '@/api/services/auth-service';

import './ModalLogout.scss';

export const ModalLogout = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      AuthService.removeToken();
      queryClient.setQueryData(['user'], null);
      queryClient.setQueryData(['wishlist'], null);
      queryClient.invalidateQueries({ queryKey: ['user', 'wishlist'] });
    },
  });

  return (
    <Modal name="logoutModal" cancel confirm={() => mutate()}>
      <div className="logout-modal">
        <Title size="medium" centered>
          Logout
        </Title>
        <p>Do you want to logout?</p>
      </div>
    </Modal>
  );
};
