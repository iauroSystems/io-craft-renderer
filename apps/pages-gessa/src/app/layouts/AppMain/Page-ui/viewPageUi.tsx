import { Microfrontend } from 'apps/pages-gessa/src/micro-frontend';
import MFViewPageApp from 'apps/pages-gessa/src/micro-frontend/remotes/view-page-app';
import React, { memo } from 'react';

export interface IViewPageProps {
  tabData: any;
}

const viewPageUi = (props: IViewPageProps) => {
  return (
    <Microfrontend
      url={MFViewPageApp.url}
      scope={MFViewPageApp.scope}
      module={MFViewPageApp.components.ViewPageAppComponent}
      props={props.tabData}
    />
  );
};

export default memo(viewPageUi);
