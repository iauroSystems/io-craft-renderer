import React from 'react';
import { NestedMenuItem } from 'mui-nested-menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { MenuItem } from '@mui/material';

interface Props {
  menuItem: any;
  parentMenuOpen: boolean;
  handleClose?: () => void;
}

function NavMenuItemComponent({
  menuItem,
  parentMenuOpen,
  handleClose,
}: Props) {
  if (menuItem.items) {
    return (
      <NestedMenuItem
        rightIcon={<ChevronRightIcon />}
        label={menuItem.label}
        parentMenuOpen={parentMenuOpen}
      >
        {menuItem?.items.map((menuItem: any, index: number) => (
          <NavMenuItemComponent
            key={index}
            menuItem={menuItem}
            parentMenuOpen={parentMenuOpen}
          ></NavMenuItemComponent>
        ))}
      </NestedMenuItem>
    );
  } else {
    return <MenuItem onClick={handleClose}>{menuItem.label}</MenuItem>;
  }
}

export default NavMenuItemComponent;
