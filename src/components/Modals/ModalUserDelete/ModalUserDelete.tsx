import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Modal } from '@/components/UI/Modal/Modal';
import { Title } from '@/components/UI/Title/Title';
import { LoadingPage } from '@/components/UI/Loading/Loading';

import { UserService } from '@/api/services/user-service';
import { AuthService } from '@/api/services/auth-service';

import { catchError } from '@/helpers/catchError';

import './ModalUserDelete.scss';

export const ModalUserDelete = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: UserService.delete,
    onSuccess: () => {
      AuthService.removeToken();
      queryClient.setQueryData(['user'], null);
      queryClient.setQueryData(['wishlist'], null);
      queryClient.invalidateQueries({ queryKey: ['user', 'wishlist'] });
      toast.success('User has been deleted');
    },
    onError: (error) => {
      toast.error(catchError(error));
    },
  });

  const deleteUserSubmit = () => mutate(undefined);

  if (isPending) return <LoadingPage />;

  return (
    <Modal name="userDeleteModal" cancel confirm={deleteUserSubmit}>
      <div className="user-delete-modal">
        <Title size="medium">Delete user</Title>
        <p>Your account and data will be deleted! Сonfirm the operation?</p>
      </div>
    </Modal>
  );
};
