import { Theme } from '@mui/material';
import darkTheme from './dark';
import lightTheme from './light';
import { IThemePalette } from './palette';
import solarizedTheme from './solarized';
import { IThemeFont } from './typography';

export type ThemeContextType = {
  theme: Theme;
  changeTheme: (theme: ITheme) => void;
};

export interface ITheme {
  palette: IThemePalette;
  typography: IThemeFont;
}

export { default as light } from './light';
export { default as dark } from './dark';
export { default as solarized } from './solarized';

const themes = {
  light: lightTheme,
  dark: darkTheme,
  solarized: solarizedTheme,
  default: darkTheme,
};

export default themes;
