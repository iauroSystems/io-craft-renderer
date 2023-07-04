import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit';
import { environment } from 'apps/view-page/src/environments/environment';
import { IRootState } from 'apps/view-page/src/store';
import axios from '../../../../utils/NetworkLayer';

type _IRPageWidgetData = EntityState<IRPageWidgetData>;
export interface IRGridData extends _IRPageWidgetData {
  activePageId: string;
}
export interface IRPageWidgetData {
  page_id: string;
  widgets: any;
}

const gridDataAdapter = createEntityAdapter<IRPageWidgetData>({
  selectId: ({ page_id }) => page_id,
});

export const {
  selectAll: selectAllPageWidgetData,
  selectById: selectPageWidgetDataById,
} = gridDataAdapter.getSelectors((state: IRootState) => {
  return state.grid.pageWidgetData;
});

export const selectActivepageWidgetDataPageId = createSelector(
  (state: IRootState) => state.grid.pageWidgetData,
  (data) => data
);

const pageWidgetData = createSlice({
  name: 'Page-widget-data',
  initialState: gridDataAdapter.getInitialState({ activePageId: '-1' }),
  reducers: {
    addPageWidgetData: gridDataAdapter.upsertOne,
    upsertPageWidgetData: gridDataAdapter.upsertMany,
    deleteAllPageWidgetData: gridDataAdapter.removeAll,
    deletePageWidgetDataByPageId: gridDataAdapter.removeOne,
  },
});

export const {
  upsertPageWidgetData,
  addPageWidgetData,
  deleteAllPageWidgetData,
  deletePageWidgetDataByPageId,
} = pageWidgetData.actions;
export default pageWidgetData.reducer;
