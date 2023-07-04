import containerApp from '../app/pages/projects/store';
import { IRGridData } from '../app/pages/projects/store/gridSlice';
export { default as containerApp } from '../app/pages/projects/store';
import { IRMenuList } from '../app/pages/projects/store/appMenuSlice';
import { IRThemeContext } from './themeContextSlice';
import { IRThemePaletteContext } from './colorPalleteSlice';
import { IRSortedMenuList } from '../app/pages/projects/store/sortedMenuSlice';

export interface IRootState {
  containerApp: {
    gridSlice: IRGridData;
    menuListSlice: IRMenuList;
    themeContextSlice: IRThemeContext;
    themePaletteSlice: IRThemePaletteContext;
    sortedMenuListSlice: IRSortedMenuList;
  };
}

const reducers = {
  containerApp,
};

export default reducers;
