import { createTheme, Theme } from '@mui/material';
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WebFont from 'webfontloader';
import {
  getThemePalette,
  IRThemePalette,
  selectThemePaletteContext,
  setThemePaletteContext,
} from '../store/colorPalleteSlice';
import { IRootState } from '../store/index';
import {
  getTheme,
  IRTheme,
  selectThemeContext,
  setThemeContext,
} from '../store/themeContextSlice';
import themes, { ThemeContextType } from '../theme';
import { getLocalStorage, setLocalStorage } from '../utils/localStorageService';
import { DefaultThemeColor, DefaultThemeFonts } from './defaultTh';

export const ThemeContext = React.createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<React.ReactNode> | any = ({
  children,
}: any) => {
  const [theme, setTheme] = React.useState<Theme>(createTheme(themes.default));
  const rootState = useSelector((state: IRootState) => state);
  const themeData = selectThemeContext(rootState);
  const themePaletteData = selectThemePaletteContext(rootState);
  const newUrl = window.location.href.replace('#', '');
  var url = new URL(newUrl);
  var projectId = url.searchParams.get('projectId');
  const dispatch = useDispatch();
  const changeTheme = (theme: any) => {
    setTheme(createTheme(theme));
  };
  const [posts, setPosts] = React.useState({});
  const themeFunc = (projectId: any) => {
    if (themeData && themeData.length > 0) {
    } else {
      const apicall = new Promise((resolve, reject) => {
        const someThunkCall = new Promise((resolve, reject) => {
          resolve(dispatch(getTheme(projectId)));
        }).then((res: any) => {
          if (res && res.payload && res.payload.data) {
            const themeObject: IRTheme = {
              project_id: '123',
              font: res.payload.data,
            };
            dispatch(setThemeContext(themeObject));
            setLocalStorage('fontData', themeObject);
          }
        });
      });
    }
  };

  const colorthemeFunc = (projectId: any) => {
    if (themePaletteData && themePaletteData.length > 0) {
    } else {
      const apicall = new Promise((resolve, reject) => {
        const someThunkCall = new Promise((resolve, reject) => {
          resolve(dispatch(getThemePalette(projectId)));
        }).then((res: any) => {
          if (res && res.payload && res.payload.data) {
            const themeObject: IRThemePalette = {
              project_id: '123',
              color: res.payload.data,
            };
            dispatch(setThemePaletteContext(themeObject));
            setLocalStorage('colorData', themeObject);
          }
        });
      });
    }
  };

  React.useEffect(() => {
    const newUrl = window.location.href.replace('#', '');
    const projectId = newUrl?.split('&')?.shift?.()?.split('/')[5];
    // themeFunc(projectId);
    // colorthemeFunc(projectId);
    const themeObject = getLocalStorage('colorData');
    const themeObject2 = getLocalStorage('fontData');
    if (Object.keys(themeObject).length > 0) {
      dispatch(setThemePaletteContext(themeObject));
    } else {
      dispatch(setThemePaletteContext(DefaultThemeColor));
    }
    if (Object.keys(themeObject2).length > 0) {
      dispatch(setThemeContext(themeObject2));
    } else {
      dispatch(setThemeContext(DefaultThemeFonts));
    }
  }, []);

  React.useEffect(() => {
    const WebFontConfig = {
      custom: {
        families: themeData[0]?.font?.result.families,
        urls: themeData[0]?.font?.result.urls,
      },
    };
    WebFont.load(WebFontConfig);
    themes.default.typography = {
      ...themes.default.typography,
      ...themeData[0]?.font?.result.fonts,
    };
    setTheme(createTheme(themes.default));
  }, [themeData]);

  React.useEffect(() => {
    // setPosts(themePaletteData[0]?.color.result);
    themes.default.palette = {
      ...themes.default.palette,
      ...themePaletteData[0]?.color?.result?.colors,
      primary: {
        ...themePaletteData[0]?.color?.result?.colors?.primary,
        main:
          themePaletteData[0]?.color?.result?.colors?.primary?.pri300Main ||
          '#328DF6',
      },
      secondary: {
        ...themePaletteData[0]?.color?.result?.colors?.secondary,
        main:
          themePaletteData[0]?.color?.result?.colors?.secondary?.sec300Main ||
          '#F94948',
      },

      ...{
        chart: [
          '#ff6083',
          '#8b5cf6',
          '#fbbf24',
          '#84cc16',
          '#35a2ec',
          '#be123c',
          '#86efac',
          '#4bc1bd',
          '#64748b',
          '#a5f3fc',
          '#6b21a8',
          '#fecdd3',
          '#f87171',
          '#d9f99d',
          '#f0abfc',
          '#7f1d1d',
          '#c4b5fd',
        ],
      },
    };

    setTheme(createTheme(themes.default));
  }, [themePaletteData]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <MaterialThemeProvider theme={theme}>{children}</MaterialThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const settingContext = React.useContext(ThemeContext);

  return [settingContext?.theme, settingContext?.changeTheme];
};

export default ThemeProvider;
