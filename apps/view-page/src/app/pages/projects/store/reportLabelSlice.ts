import {createAsyncThunk, createEntityAdapter, createSlice, EntityState,} from '@reduxjs/toolkit';
import {environment} from 'apps/view-page/src/environments/environment';
import axios from '../../../../utils/NetworkLayer';
import {IRootState} from '../../../../store';

type _IRReportLabelSlice = EntityState<IReportLabel>;

export interface IRReportLabelSlice extends _IRReportLabelSlice {
    activeWidgetId: string;
}

export interface IReportLabel {
    [key: string]: string;
}

export interface IParams {
    reportName: string;
    params: {
        projections: string;
        filter: string;
        size: number;
        page: number;
    };
}

export const getAllReportsLabelApi = createAsyncThunk(
    'get all report labels',
    async (params: IParams, {dispatch}) => {
        const response: any = await axios.post(
            environment.NX_REPORT_SERVICE + `/queryReport/${params.reportName}`,
            {
                params: params.params,
            }
        );

        if (
            response &&
            response.data &&
            response.data.result &&
            response.data.result.data
        ) {
            const data: IReportLabel[] = response.data.result.data;

            const dataForStore: IReportLabel[] = data.map((e: IReportLabel) => {
                return e;
            });
            // dispatch(setReportLabels(dataForStore));
            return dataForStore;
        }
        return [];
    }
);

const reportLabelSliceAdapter = createEntityAdapter<IReportLabel>({
    selectId: ({producttype}) => producttype,
});

export const {
    selectAll: selectAllReportsLabel,
    selectById: selectReportLabelById,
    selectIds: selectReportLabelByIds,
} = reportLabelSliceAdapter.getSelectors((state: IRootState) => {
    return state.grid.reportLabelSlice;
});

const reportLabelSlice = createSlice({
    name: 'reportLabelSlice',
    initialState: reportLabelSliceAdapter.getInitialState({
        activeWidgetId: null,
    }),
    reducers: {
        setReportLabels: reportLabelSliceAdapter.upsertMany,
    },
});

export const {setReportLabels} = reportLabelSlice.actions;
export default reportLabelSlice.reducer;
