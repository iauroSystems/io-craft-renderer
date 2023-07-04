import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import themes, { ITheme } from '../../../theme/index';
import { useAppTheme } from '../../../context/theme';
import { SettingContext } from '../../../context';

interface Props {
  toggleDrawer: (
    accountMenuOpen: boolean
  ) => (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const AppHeader = ({ toggleDrawer }: Props) => {
  const [accountMenuAnchorEl, setAccountMenuAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);
  const accountMenuOpen = Boolean(accountMenuAnchorEl);
  const handleAccoutMenuClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    setAccountMenuAnchorEl(event.currentTarget);
  };
  const handleAccoutMenuClose = () => {
    setAccountMenuAnchorEl(null);
  };

  const [themeMenuAnchorEl, setThemeMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const ThemeMenuOpen = Boolean(themeMenuAnchorEl);
  const handleThemeClick = (event: React.MouseEvent<HTMLElement>) => {
    setThemeMenuAnchorEl(event.currentTarget);
  };
  const handleThemeClose = () => {
    setThemeMenuAnchorEl(null);
  };

  const [layoutMenuAnchorEl, setLayoutMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const Layoutopen = Boolean(layoutMenuAnchorEl);
  const handleLayoutClick = (event: React.MouseEvent<HTMLElement>) => {
    setLayoutMenuAnchorEl(event.currentTarget);
  };
  const handleLayoutClose = () => {
    setLayoutMenuAnchorEl(null);
  };

  const getTheme = (themeName: string): ITheme => {
    switch (themeName) {
      case 'light':
        return themes.light;
      case 'dark':
        return themes.default;
      case 'solarized':
        return themes.solarized;
      default:
        return themes.default;
    }
  };

  const [theme, changeTheme] = useAppTheme();
  const setTheme = (theme: string) => (event: any) => {
    const selectedTheme: any = getTheme(theme);
    // @ts-ignore
    changeTheme(selectedTheme);
  };

  const { settings, setSettings } = React.useContext(SettingContext);
  const setLayout = (layout: string) => (event: any) =>
    setSettings({ showHeader: true, layout: layout });

  return (
    <>
      <IconButton sx={{ display: { md: 'none' } }} onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Box sx={{ ml: 'auto' }}>
        {/* <Button
          id="layout-button"
          size="small"
          sx={{ ml: 1 }}
          disableElevation
          onClick={handleLayoutClick}
          endIcon={<KeyboardArrowDownIcon />}
        >
          Layout
        </Button> */}

        {/* <Button
          id="theme-button"
          size="small"
          sx={{ ml: 1 }}
          disableElevation
          onClick={handleThemeClick}
          endIcon={<KeyboardArrowDownIcon />}
        >
          Theme
        </Button> */}

        <Tooltip title="Account settings">
          <IconButton
            onClick={handleAccoutMenuClick}
            size="small"
            sx={{ ml: 1 }}
          >
            <Avatar />
          </IconButton>
        </Tooltip>
      </Box>
      {/* Account Menu */}
      <Menu
        id="account-menu"
        anchorEl={accountMenuAnchorEl}
        open={accountMenuOpen}
        onClose={handleAccoutMenuClose}
        onClick={handleAccoutMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      {/*Theme Menu  */}
      <Menu
        id="theme-menu"
        anchorEl={themeMenuAnchorEl}
        open={ThemeMenuOpen}
        onClose={handleThemeClose}
        onClick={handleThemeClose}
        PaperProps={{
          elevation: 0,
          sx: {
            width: 150,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 2,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {Object.keys(themes).map((theme) => (
          <MenuItem key={theme} onClick={setTheme(theme)}>
            {theme}
          </MenuItem>
        ))}
      </Menu>
      {/*Layout Menu  */}
      <Menu
        id="layout-menu"
        anchorEl={layoutMenuAnchorEl}
        open={Layoutopen}
        onClose={handleLayoutClose}
        onClick={handleLayoutClose}
        PaperProps={{
          elevation: 0,
          sx: {
            width: 150,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 2,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {[
          'classic-ltr',
          'empty',
          'classic-rtl',
          'enterprise-ttb',
          'enterprise-btu',
          'default',
        ].map((layout) => (
          <MenuItem key={layout} onClick={setLayout(layout)}>
            {layout}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default AppHeader;
