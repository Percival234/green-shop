import { useState } from 'react';

import { Modal } from '@/components/UI/Modal/Modal';
import { Login } from '@/components/Modals/ModalAuth/Login';
import { Register } from '@/components/Modals/ModalAuth/Register';

import './ModalAuth.scss';

export const ModalAuth = () => {
  const [loginIsVisible, setLoginIsVisible] = useState(true);

  const handleAuth = () => setLoginIsVisible(!loginIsVisible);

  return (
    <Modal name="authModal">
      <div className="auth-modal">
        <div className="auth-modal__nav">
          <button
            onClick={handleAuth}
            className={loginIsVisible ? 'auth-modal__nav-link active' : 'auth-modal__nav-link'}>
            Login
          </button>
          <span></span>
          <button
            onClick={handleAuth}
            className={!loginIsVisible ? 'auth-modal__nav-link active' : 'auth-modal__nav-link'}>
            Register
          </button>
        </div>
        {loginIsVisible ? <Login /> : <Register />}
      </div>
    </Modal>
  );
};
