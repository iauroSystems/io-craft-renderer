interface IThemeFontType {
  fontFamily: string;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
}

export interface IThemeFont {
  [id: string]: IThemeFontType;
}

export { default as roboto } from './roboto';
