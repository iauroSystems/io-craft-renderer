import { lazy } from 'react';

const AppLayout = lazy(() => import('../layouts/AppLayout'));

export const routes: any = [
  {
    path: '/project/:projectId/',
    element: <AppLayout />,
    exact: false,
    children: [{ path: '*' }],
  },
];
