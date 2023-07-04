import { Navigate } from 'react-router-dom';
import { IPageConfig } from '../types/pageConfig';
import getRoutesFromConfig from '../utils/getRoutesFromConfig';
import ProjectConfig from '../app/pages/projects/DemoConfig';
import ErrorConfig from '../app/pages/errors/ErrorConfig';

const routeConfigs: Array<IPageConfig> = [ProjectConfig, ErrorConfig];
const routes: Array<any> = [
  ...getRoutesFromConfig(routeConfigs),
  {
    path: '*',
    exact: true,
    component: () => <Navigate to="/demo" />,
  },
  {
    component: () => <Navigate to="/error-404" />,
  },
];

export default routes;
