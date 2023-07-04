import grid from '../app/pages/projects/store';
import { IRGridData } from '../app/pages/projects/store/gridSlice';
import gridSlice from '../app/pages/projects/store';
import { IRwidgetSlice } from '../app/pages/projects/store/widgetsSlice';
import { IRReportSlice } from '../app/pages/projects/store/reportSlice';
import { IRReportLabelSlice } from '../app/pages/projects/store/reportLabelSlice';
import { IRGridDataRenderSlice } from '../app/pages/projects/store/gridDataRenderSlice';
import { IRThemeContext } from '../app/pages/projects/newStore/themeContextSlice';
import { IRThemePaletteContext } from '../app/pages/projects/newStore/colorPalleteSlice';

export { default as grid } from '../app/pages/projects/store';

export interface IRootState {
  grid: {
    gridSlice: IRGridData;
    widgetSlice: IRwidgetSlice;
    reportSlice: IRReportSlice;
    reportLabelSlice: IRReportLabelSlice;
    gridDataRenderSlice: IRGridDataRenderSlice;
    themeContextSlice: IRThemeContext;
    themePaletteSlice: IRThemePaletteContext;
    pageDetailSlice: any;
    pageWidgetData: any;
  };
}

const reducers = {
  grid,
};

export default reducers;
