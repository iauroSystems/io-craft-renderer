import { memo, useContext } from 'react';
import { RouteContext } from '../../context';
import { useRoutes } from 'react-router';
import { RouteContextType } from '../../types/routes';

const Layout = (props: any) => {
  const newRoutes: any = useContext(RouteContext) as RouteContextType;
  const routes = useRoutes([...newRoutes.routes]);
  return routes;
};

const LayoutWrapper = (props: any) => {
  return <Layout />;
};

export default memo(LayoutWrapper);
