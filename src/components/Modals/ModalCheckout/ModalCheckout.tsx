import { Modal } from '@/components/UI/Modal/Modal';

import ImageCheckout from '@/assets/icons/thanks.svg';

import './ModalCheckout.scss';

export const ModalCheckout = () => {
  return (
    <Modal name="checkoutModal">
      <div className="modal-checkout">
        <img src={ImageCheckout} alt="thanks" />
        <p>Your order has been received!</p>
      </div>
    </Modal>
  );
};
