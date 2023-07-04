import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { Microfrontend } from '../../../micro-frontend';
import { Outlet } from 'react-router';
import MFViewPageApp from '../../../micro-frontend/remotes/view-page-app';
import ViewPageUi from './Page-ui/viewPageUi';
import { useEffect } from 'react';

const Test = () => {
  return <Typography variant="body1">feature3</Typography>;
};

const Nest = () => {
  return <Typography variant="body1">Loading...</Typography>;
};

// export const routesObj = [
//   {
//     path: '/menu/:menuId/sub-menu/feature3/',
//     element: <ViewPageUi tabData={{}} />,
//   },
//   {
//     path: '/3',
//     element: <Nest />,
//   },
// ];

// export const Routing = () => {
//   return useRoutes(routesObj);
// };

const AppMain = (props: any) => {
  // console.log('page props', props);
  return props && props.pageId && props.pageId.length > 0 ? (
    <ViewPageUi tabData={props}></ViewPageUi>
  ) : (
    // <>no data</>
    <>no data</>
  );
};

export default AppMain;
