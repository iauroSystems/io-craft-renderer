import { lazy } from 'react';
import { IPageConfig } from '../../../types/pageConfig';

const ErrorConfig: IPageConfig = {
  routes: [
    {
      path: '/error-404',
      component: lazy(() => import('./Error404')),
    },
    {
      path: '/error-500',
      component: lazy(() => import('./Error500')),
    },
  ],
};

export default ErrorConfig;
