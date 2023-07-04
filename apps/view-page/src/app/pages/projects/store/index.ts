import { combineReducers } from '@reduxjs/toolkit';
import themeContextSlice from 'apps/view-page/src/app/pages/projects/newStore/themeContextSlice';
import themePaletteSlice from 'apps/view-page/src/app/pages/projects/newStore/colorPalleteSlice';
import gridDataRenderSlice from './gridDataRenderSlice';
import gridSlice from './gridSlice';
import reportLabelSlice from './reportLabelSlice';
import reportSlice from './reportSlice';
import widgetSlice from './widgetsSlice';
import pageDetailSlice from './../newStore/pageDetail';
import pageWidgetData from './../newStore/pageWidgetData';
const reducer = combineReducers({
  gridSlice,
  widgetSlice,
  reportSlice,
  reportLabelSlice,
  gridDataRenderSlice,
  themeContextSlice,
  themePaletteSlice,
  pageDetailSlice,
  pageWidgetData,
});

export default reducer;
