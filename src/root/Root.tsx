import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';
import { ModalAuth } from '@/components/Modals/ModalAuth/ModalAuth';
import { ModalLogout } from '@/components/Modals/ModalLogout/ModalLogout';
import { ModalCheckout } from '@/components/Modals/ModalCheckout/ModalCheckout';
import { ModalUserDelete } from '@/components/Modals/ModalUserDelete/ModalUserDelete';

import { AuthProvider } from '@/providers/AuthProvider';
import { QueryProvider } from '@/providers/QueryProvider';

import 'react-toastify/dist/ReactToastify.css';

export const Root = () => {
  return (
    <QueryProvider>
      <AuthProvider>
        <div className="app">
          <Header />
          <main className="main">
            <div className="container">
              <Outlet />
            </div>
          </main>
          <Footer />
          <ModalAuth />
          <ModalUserDelete />
          <ModalLogout />
          <ModalCheckout />
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </AuthProvider>
    </QueryProvider>
  );
};
