import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
  EntityState,
} from '@reduxjs/toolkit';
import { IRootState } from '../../../../store';
import axios from '../../../../utils/NetworkLayer';
import { environment } from 'apps/view-page/src/environments/environment';

type _IRGridData = EntityState<IRGrid>;
export interface IRGridData extends _IRGridData {
  activePageId: string;
}
export interface IRGrid extends _IRGridData {
  created_at: string;
  created_by: string;
  is_delete: number;
  page_id: string;
  updated_at: string;
  updated_by: string;
  widgets: any;
  page: string;
  __v: any;
  _id: string;
}

export const getPageDataByIdApi = createAsyncThunk(
  'get page config',
  async (params: any, { dispatch }) => {
    const payload = {
      page: params.page,
      size: params.size,
    };

    const response: any = (
      await axios.get(environment.NX_PAGE_SERVICE + `/page/` + params.page_id, {
        params: {},
      })
    ).data.result;
    dispatch(setGridDatatore([]));
    dispatch(setGridDatatore([response]));
  }
);

export const savePageConfigurationApi = createAsyncThunk(
  'save page config',
  async (params: any, { dispatch }) => {
    const response: any = await axios.patch(
      environment.NX_PAGE_SERVICE + `/page/${params.page_id}`,
      params
    );

    const data = response.data.result;
    if (data) {
      dispatch(setGridDatatore([data]));
    } else {
      dispatch(setGridDatatore([]));
    }
    return response;
  }
);

const gridDataAdapter = createEntityAdapter<IRGrid>({
  selectId: ({ _id }) => _id,
});

export const { selectAll: selectGridData } = gridDataAdapter.getSelectors(
  (state: IRootState) => {
    return state.grid.gridSlice;
  }
);

export const selectActivePageId = createSelector(
  (state: IRootState) => state.grid.gridSlice,
  (data) => data
);

const gridSlice = createSlice({
  name: 'gridStore',
  initialState: gridDataAdapter.getInitialState({ activePageId: '-1' }),
  reducers: {
    setGridDatatore: gridDataAdapter.upsertMany,
    deleteAllStore: gridDataAdapter.removeAll,
  },
});

export const { setGridDatatore, deleteAllStore } = gridSlice.actions;
export default gridSlice.reducer;
