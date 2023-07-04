import MFViewPageApp from './view-page-app';

export { default as ViewPageApp } from './view-page-app';

export interface IMicroFrontend {
  url: string;
  scope: string;
  components: {
    [key: string]: string;
  };
  slices: {
    [key: string]: string;
  };
  routes: {
    [key: string]: string;
  };
}

export interface IMicroFrontends {
  [key: string]: IMicroFrontend;
}

const microFrontends: IMicroFrontends = {
  viewpageApp: MFViewPageApp,
};

export default microFrontends;
