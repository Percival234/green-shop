import { RouterProvider } from 'react-router-dom';

import { router } from '@/router/Routes';

export const App = () => {
  return <RouterProvider fallbackElement={<div>loading ...</div>} router={router} />;
};
