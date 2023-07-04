import { Box, useTheme } from '@mui/material';
import React from 'react';
import AppHeader from './AppHeader/AppHeader';
import AppMain from './AppMain/AppMain';
import AppDrawer from './AppMenu/AppDrawer';
import AppMenu from './AppMenu/AppMenu';
import './Enterprise.css';

function Enterprise({ bottom = false }) {
  const theme = useTheme();

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.MouseEvent<HTMLButtonElement>) => {
      if (event && event.type === 'keydown') {
        return;
      }
      setDrawerOpen(open);
    };

  return (
    <Box
      component="div"
      className={`container__enterprise ${
        bottom && 'container__enterprise__LW'
      }`}
    >
      <Box
        component="header"
        className="header__enterprise"
        sx={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.primary.main,
          borderBottom: `1px solid ${theme.palette.grey[900]}`,
        }}
      >
        <AppHeader toggleDrawer={toggleDrawer} />
      </Box>

      <Box
        component="nav"
        className="nav__enterprise"
        sx={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.primary.main,
          borderBottom: `1px solid ${theme.palette.grey[900]}`,
        }}
      >
        <AppMenu menuType="enterprise" />
      </Box>

      <Box
        component="main"
        className="main__enterprise"
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <AppMain pageId={'asa'} />
      </Box>

      <AppDrawer
        anchor="left"
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
      />
    </Box>
  );
}

export default Enterprise;
