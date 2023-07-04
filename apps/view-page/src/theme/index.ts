import { Theme } from '@mui/material';
import appliedTh from './appliedTheme';
import darkTheme from './dark';
import lightTheme from './light';
import { IThemePaletteAT } from './palette';
import solarizedTheme from './solarized';
import { IThemeFont } from './typography';

export type ThemeContextType = {
  theme: Theme;
  changeTheme: (theme: ITheme) => void;
};

export interface ITheme {
  palette: IThemePaletteAT;
  typography: IThemeFont;
}

export { default as light } from './light';
export { default as dark } from './dark';
export { default as solarized } from './solarized';
export { default as appliedTh } from './appliedTheme';

const themes = {
  light: lightTheme,
  dark: darkTheme,
  solarized: solarizedTheme,
  default: appliedTh,
  // default: darkTheme,
};

export default themes;
