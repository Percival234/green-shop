import { FiX } from 'react-icons/fi';
import { createPortal } from 'react-dom';
import { useCallback, useEffect } from 'react';

import { Button } from '@/components/UI/Button/Button';

import { EventState, useEventStore } from '@/store/eventStore';

import './Modal.scss';

type ModalProps = {
  name: keyof EventState;
  children: React.ReactNode;
  confirm?: () => void;
  cancel?: boolean;
};

export const Modal: React.FC<ModalProps> = ({ name, children, confirm, cancel }) => {
  const visible = useEventStore((state) => state[name]);
  const close = useEventStore((state) => state.close);

  const closeModal = useCallback(() => close(name), [close, name]);

  const confirmModalAction = () => {
    if (confirm) {
      confirm();
    }
    closeModal();
  };

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [closeModal]);

  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [visible]);

  return createPortal(
    visible && (
      <div className="modal">
        <div className="modal__backdrop" onClick={closeModal}></div>
        <div className="modal__body">
          <button type="button" onClick={closeModal} className="modal__close">
            <FiX size={32} />
          </button>
          <div className="modal__children">{children}</div>
          {(cancel || confirm) && (
            <div className="modal__action">
              {cancel && (
                <Button variant="outline" onClick={closeModal}>
                  Cancel
                </Button>
              )}
              {confirm && <Button onClick={confirmModalAction}>Confirm</Button>}
            </div>
          )}
        </div>
      </div>
    ),
    document.getElementById('modal')!
  );
};
