import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { Root } from '@/root/Root';
import { LoadingPage } from '@/components/UI/Loading/Loading';
const Cart = lazy(() => import('@/pages/Cart/Cart').then((module) => ({ default: module.Cart })));
const Home = lazy(() => import('@/pages/Home/Home').then((module) => ({ default: module.Home })));
const Blog = lazy(() => import('@/pages/Blog/Blog').then((module) => ({ default: module.Blog })));
const Account = lazy(() =>
  import('@/pages/Account/Account').then((module) => ({ default: module.Account }))
);
const Product = lazy(() =>
  import('@/pages/Product/Product').then((module) => ({ default: module.Product }))
);
const Checkout = lazy(() =>
  import('@/pages/Checkout/Checkout').then((module) => ({ default: module.Checkout }))
);
const NotFound = lazy(() =>
  import('@/pages/NotFound/NotFound').then((module) => ({ default: module.NotFound }))
);
const Details = lazy(() =>
  import('@/components/Details/Details').then((module) => ({ default: module.Details }))
);
const Orders = lazy(() =>
  import('@/pages/Account/Orders/Orders').then((module) => ({ default: module.Orders }))
);
const Support = lazy(() =>
  import('@/pages/Account/Support/Support').then((module) => ({ default: module.Support }))
);
const Reviews = lazy(() =>
  import('@/pages/Product/Reviews/Reviews').then((module) => ({ default: module.Reviews }))
);
const Wishlist = lazy(() =>
  import('@/pages/Account/Wishlist/Wishlist').then((module) => ({ default: module.Wishlist }))
);
const AccountInfo = lazy(() =>
  import('@/components/Account/AccountInfo/AccountInfo').then((module) => ({
    default: module.AccountInfo,
  }))
);

const routes = [
  {
    path: '',
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Root />
      </Suspense>
    ),
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
