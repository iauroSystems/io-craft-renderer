import { IPageConfig } from '../types/pageConfig';
import { IRoute } from '../types/routes';

export default function getRoutesFromConfig(
  configs: Array<IPageConfig>
): Array<IRoute> {
  const routes: Array<IRoute> = [];
  // Iterate over configs for each page
  configs.forEach((config: IPageConfig) => {
    // If settings are available, map to all available routes of that config
    config.routes.forEach((route) => {
      const routeData = {
        ...route,
      };
      if (config.settings) {
        routeData.settings = config.settings;
      }

      routes.push(routeData);
    });
  });
   return routes;
}
