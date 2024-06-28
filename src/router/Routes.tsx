import { createBrowserRouter } from 'react-router-dom';

import { Root } from '@/root/Root';
import { Cart } from '@/pages/Cart/Cart';
import { Home } from '@/pages/Home/Home';
import { Blog } from '@/pages/Blog/Blog';
import { Account } from '@/pages/Account/Account';
import { Product } from '@/pages/Product/Product';
import { Checkout } from '@/pages/Checkout/Checkout';
import { NotFound } from '@/pages/NotFound/NotFound';
import { Details } from '@/components/Details/Details';
import { Orders } from '@/pages/Account/Orders/Orders';
import { Support } from '@/pages/Account/Support/Support';
import { Reviews } from '@/pages/Product/Reviews/Reviews';
import { Wishlist } from '@/pages/Account/Wishlist/Wishlist';
import { AccountInfo } from '@/components/Account/AccountInfo/AccountInfo';

const routes = [
  {
    path: '',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'product/:id',
        element: <Product />,
        children: [
          {
            path: '',
            element: <Details />,
          },
          {
            path: 'reviews',
            element: <Reviews />,
          },
        ],
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: 'blog/:id',
        element: <Blog />,
      },
      {
        path: 'account',
        element: <Account />,
        children: [
          {
            path: '',
            element: <AccountInfo />,
          },
          {
            path: 'orders',
            element: <Orders />,
          },
          {
            path: 'wishlist',
            element: <Wishlist />,
          },
          {
            path: 'support',
            element: <Support />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(routes);
