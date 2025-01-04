import { FiLogOut, FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';

import { Link } from '@/components/UI/Link/Link';
import { Logo } from '@/components/UI/Logo/Logo';
import { Button } from '@/components/UI/Button/Button';

import { useCartStore } from '@/store/cartStore';
import { useEventStore } from '@/store/eventStore';

import { useUser } from '@/hooks/useUser';

import './Header.scss';

export const Header = () => {
  const open = useEventStore((state) => state.open);
  const { data: user } = useUser();
  const cartItems = useCartStore((state) => state.cartItems);

  const openAuthModal = () => open('authModal');
  const openLogoutModal = () => open('logoutModal');

  return (
    <header className="header">
      <div className="header__container container">
        <Logo />
        <div className="header__action">
          <Link variant="ghost" size="icon" navlink aria-label="Navigate to shop page" to="/">
            <FiSearch />
          </Link>
          <div className="header__cart-info">
            {cartItems.length > 0 && (
              <div className="header__cart-length">{Math.min(cartItems.length, 99)}</div>
            )}
            <Link
              variant="ghost"
              size="icon"
              navlink
              aria-label="Navigate to shopping cart"
              to="/cart">
              <FiShoppingCart />
            </Link>
          </div>
          {user ? (
            <>
              <Link
                size="icon"
                variant="ghost"
                navlink
                aria-label="Navigate to account"
                to="/account">
                <FiUser />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={openLogoutModal}
                aria-label="Open log out popup">
                <FiLogOut />
              </Button>
            </>
          ) : (
            <Button onClick={openAuthModal}>Login</Button>
          )}
        </div>
      </div>
    </header>
  );
};
