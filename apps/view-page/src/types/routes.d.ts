import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { ReactElement } from 'react';

interface IRoute {
  path?: string | string[];
  element:
    | React.LazyExoticComponent<FunctionComponent>
    | (() => EmotionJSX.Element)
    | ReactElement;
  children?: IRoute[];
  exact?: boolean;
  showInNavbar?: boolean;
  name?: string;
  settings?: ISettings;
}

type RouteContextType = {
  routes: IRoute[];
  addRoute: (route: IRoute) => void;
  removeRoute: (route: IRoute) => void;
};
