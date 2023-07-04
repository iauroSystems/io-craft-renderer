import React, { useState, useEffect } from 'react';
import { SwipeableDrawer } from '@mui/material';
import AppMenu from './AppMenu';
import { useTheme } from '@mui/material';
import { useAppDispatch } from 'apps/pages-gessa/src/context/redux';

interface Props {
  anchor: 'left' | 'right';
  drawerOpen: boolean;
  toggleDrawer: (
    open: boolean
  ) => (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function AppDrawer({ anchor = 'left', drawerOpen, toggleDrawer }: Props) {
  const dispatch = useAppDispatch();
  const data: any = '';
  const theme = useTheme();

  return (
    <SwipeableDrawer
      anchor={anchor}
      variant="temporary"
      open={drawerOpen}
      onOpen={toggleDrawer(true)}
      onClose={toggleDrawer(false)}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': {
          backgroundColor: theme.palette.background.default,
          color: theme.palette.primary.main,
          boxSizing: 'border-box',
          width: 250,
        },
      }}
    >
      <AppMenu menuType="classic" />
    </SwipeableDrawer>
  );
}

export default AppDrawer;
