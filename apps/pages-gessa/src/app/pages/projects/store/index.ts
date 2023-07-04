import { combineReducers } from '@reduxjs/toolkit';
import gridSlice from './gridSlice';
// import themeColorSlice from './themeSlice';
import menuListSlice from './appMenuSlice';
import themeContextSlice from '../../../../store/themeContextSlice';
import themePaletteSlice from '../../../../store/colorPalleteSlice';
import sortedMenuListSlice from './sortedMenuSlice';
const reducer = combineReducers({
  gridSlice,
  menuListSlice,
  sortedMenuListSlice,
  themeContextSlice,
  themePaletteSlice,
});

export default reducer;
