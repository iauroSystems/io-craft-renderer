import { IThemeColor } from '../colors';

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
  // common?: IThemePaletteCommon;
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

export { default as dark } from './dark';
export { default as light } from './light';
export { default as solarized } from './solarized';
