import Button from '@mui/material/Button';
import React from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Menu, MenuItem } from '@mui/material';
import { getIcon } from './AppMenuItem';

import { Box } from '@mui/system';
import NavMenuItemComponent from './NavMenuItemComponent';

function NavMenuItem({ appMenuItems }: any) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (label: string) => {
  };

  const handleNestedClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <Box sx={{ sx: 'fit-content' }}>
      {appMenuItems.map((menuItem: any, index: number) =>
        menuItem.items ? (
          <>
            <Button
              sx={{ mx: 0.5, px: 1.5 }}
              key={index}
              onClick={handleNestedClick}
              startIcon={getIcon(menuItem.label)}
              endIcon={<ExpandMoreIcon />}
            >
              {menuItem.label}
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              key={index}
            >
              {menuItem?.items.map((menuItem: any, index: number) => (
                <NavMenuItemComponent
                  key={index}
                  menuItem={menuItem}
                  parentMenuOpen={open}
                  handleClose={handleClose}
                />
              ))}
            </Menu>
          </>
        ) : (
          <Button
            key={index}
            sx={{ mx: 0.5, px: 1.5 }}
            startIcon={getIcon(menuItem.label)}
            onClick={() => handleClick(menuItem.label)}
          >
            {menuItem.label}
          </Button>
        )
      )}
    </Box>
  );
}

export default NavMenuItem;
