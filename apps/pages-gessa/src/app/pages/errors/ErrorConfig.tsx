import { lazy } from 'react';
import { IPageConfig } from '../../../types/pageConfig';
import Error404Page from './Error404';
import Error500Page from './Error500';

const ErrorConfig: IPageConfig = {
  routes: [
    {
      path: '/error-404',
      element: <Error404Page />,
    },
    {
      path: '/error-500',
      element: <Error500Page />,
    },
  ],
};

export default ErrorConfig;
