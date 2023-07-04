import { Navigate } from 'react-router-dom';
import { IPageConfig } from '../types/pageConfig';
import getRoutesFromConfig from '../utils/getRoutesFromConfig';
import ProjectConfig from '../app/pages/ProjectConfig';
import ErrorConfig from '../app/pages/errors/ErrorConfig';

const routeConfigs: Array<IPageConfig> = [ProjectConfig, ErrorConfig];
const routes: Array<any> = [...getRoutesFromConfig(routeConfigs)];
export default routes;
