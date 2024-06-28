import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

import { Modal } from '@/components/UI/Modal/Modal';
import { Title } from '@/components/UI/Title/Title';
import { LoadingPage } from '@/components/UI/Loading/Loading';

import { useUserStore } from '@/store/userStore';

import { deleteUser } from '@/API/API';

import './ModalUserDelete.scss';

export const ModalUserDelete = () => {
  const logout = useUserStore((state) => state.logout);
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteUser(),
    onSuccess: () => {
      logout();
      toast.success('User has been deleted');
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
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
