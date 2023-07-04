import React, {
  createContext,
  useState,
  FC,
  ReactNode,
  useContext,
  useEffect,
} from 'react';
import { MicroFrontendContext } from '.';
import routesArray from '../routing';
import { IRoute, RouteContextType } from '../types/routes';

export const RouteContext = createContext<RouteContextType | null>(null);
export const RouteProvider: FC<ReactNode> | any = ({ children }: any) => {
  const { microFrontends } = useContext(MicroFrontendContext);
  const [routes, setRoutes] = useState<Array<IRoute>>(routesArray);

  useEffect(() => {
    setRoutes([...microFrontends.routes, ...routesArray]);
  }, [microFrontends, setRoutes]);

  const addRoute = (addRoute: IRoute) => {
    const newRoute: IRoute = addRoute;
    setRoutes([...routes, newRoute]);
  };

  const removeRoute = (deleteRoute: IRoute) => {
    const filteredRoutes = routes.filter((route: IRoute) => {
      return route.path !== deleteRoute.path;
    });
    setRoutes(filteredRoutes);
  };
  return (
    <RouteContext.Provider value={{ routes, addRoute, removeRoute }}>
      {children}
    </RouteContext.Provider>
  );
};

export default RouteProvider;
