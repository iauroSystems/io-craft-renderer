import { IThemeColor } from '../colors';
import {
  IThemePaletteATBackground,
  IThemePaletteATNeutral,
  IThemePaletteATPrimary,
  IThemePaletteATSecondary,
  IThemePaletteATSystemColor,
  IThemePaletteATText,
} from './appliedThemeInterface';

interface IThemePaletteCommon {
  black?: string;
  white?: string;
}

interface IThemePaletteText {
  primary: string;
  secondary?: string;
  disabled?: string;
  c100?: string;
  c50?: string;
}

interface IThemePaletteSystem {
  [id: string]: IThemeColor;
}

interface IThemePaletteBackground {
  default?: string;
  // paper?: string;
}

export interface IThemePalette {
  mode: 'dark' | 'light';
  common?: IThemePaletteCommon;
  primary?: IThemeColor;
  secondary?: IThemeColor;
  systemColor1?: IThemeColor;
  systemColor2?: IThemeColor;
  systemColor3?: IThemeColor;
  systemColor4?: IThemeColor;
  systemColor5?: IThemeColor;
  systemColor6?: IThemeColor;
  dark?: IThemeColor;
  light?: IThemeColor;
  text?: IThemePaletteText;
  // system?: IThemePaletteSystem;
  background?: IThemePaletteBackground;
  chart?: any;
}
export interface IThemePaletteAT {
  mode: 'dark' | 'light';
  common?: IThemePaletteCommon;
  primary?: IThemePaletteATPrimary;
  secondary?: IThemePaletteATSecondary;
  text?: IThemePaletteATText;
  system?: IThemePaletteSystem;
  background?: IThemePaletteATBackground;
  neutral?: IThemePaletteATNeutral;
  systemColor1?: IThemePaletteATSystemColor;
  systemColor2?: IThemePaletteATSystemColor;
  systemColor3?: IThemePaletteATSystemColor;
  systemColor4?: IThemePaletteATSystemColor;
  systemColor5?: IThemePaletteATSystemColor;
  systemColor6?: IThemePaletteATSystemColor;
  dark?: IThemePaletteSystem;
  light?: IThemePaletteSystem;
  chart?: any;
  custom?: any;
}

export { default as dark } from './dark';
export { default as light } from './light';
export { default as solarized } from './solarized';
export { default as appliedTheme } from './appliedTheme';
