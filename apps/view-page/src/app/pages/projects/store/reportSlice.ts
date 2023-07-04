import {
  createSlice,
  createEntityAdapter,
  createSelector,
  EntityState,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { environment } from 'apps/view-page/src/environments/environment';
import axios from '../../../../utils/NetworkLayer';
import { IRootState } from '../../../../store';

type _IRReportSlice = EntityState<IReport>;
export interface IRReportSlice extends _IRReportSlice {
  activeWidgetId: string;
}

export interface IWidgetProperties {
  _id: string;
  key: string;
  datatype: string;
}
export interface IReport {
  id: string;
  name: string;
  schedule: string;
  query: string;
  definition: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  modifiedBy: string;
}

export interface IParams {
  page: number;
  size: number;
}

export interface IDataResourseParams {
  widget_id: string;
  report: string;
  label: string;
}

export const getChartDataResource = createAsyncThunk(
  'get chart resource',
  async (params: IDataResourseParams, { dispatch }) => {
    const response: any = await axios.get(
      environment.NX_SCHEMA_SERVICE +
        `/chart-data/report/${params.report}/label/${params.label}`
    );
    return response;
    // if (response && response.data) {
    //   const data: IReport[] = response.data;
    //   const dataForStore: IReport[] = data.map((e: IReport) => {
    //     return {
    //       id: e.id,
    //       createdAt: e.createdAt,
    //       createdBy: e.createdBy,
    //       definition: e.definition,
    //       modifiedBy: e.modifiedBy,
    //       name: e.name,
    //       query: e.query,
    //       schedule: e.schedule,
    //       updatedAt: e.updatedAt,
    //     };
    //   });
    //   dispatch(setReports(dataForStore));
    // }
  }
);

export const getAllReportsApi = createAsyncThunk(
  'get all reports',
  async (params: IParams, { dispatch }) => {
    const response: any = await axios.get(
      environment.NX_REPORT_SERVICE + `/reports`,
      {
        params: params,
      }
    );
    if (response && response.data) {
      const data: IReport[] = response.data;
      const dataForStore: IReport[] = data.map((e: IReport) => {
        return {
          id: e.id,
          createdAt: e.createdAt,
          createdBy: e.createdBy,
          definition: e.definition,
          modifiedBy: e.modifiedBy,
          name: e.name,
          query: e.query,
          schedule: e.schedule,
          updatedAt: e.updatedAt,
        };
      });
      dispatch(setReports(dataForStore));
    }
  }
);

const reportSliceAdapter = createEntityAdapter<IReport>({
  selectId: ({ id }) => id,
});

export const {
  selectAll: selectAllReports,
  selectById: selectReportById,
  selectIds: selectReportByIds,
} = reportSliceAdapter.getSelectors((state: IRootState) => {
  return state.grid.reportSlice;
});

const reportSlice = createSlice({
  name: 'reportSlice',
  initialState: reportSliceAdapter.getInitialState({
    activeWidgetId: null,
  }),
  reducers: {
    setReports: reportSliceAdapter.upsertMany,
  },
});

export const { setReports } = reportSlice.actions;
export default reportSlice.reducer;
