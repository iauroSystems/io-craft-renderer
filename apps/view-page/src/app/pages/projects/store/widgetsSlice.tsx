import {createAsyncThunk, createEntityAdapter, createSlice, EntityState,} from '@reduxjs/toolkit';
import {environment} from 'apps/view-page/src/environments/environment';
import axios from '../../../../utils/NetworkLayer';
import {IRootState} from '../../../../store';

type _IRwidgetSlice = EntityState<IWidget>;

export interface IRwidgetSlice extends _IRwidgetSlice {
    activeWidgetId: string;
}

export interface IWidgetProperties {
    _id: string;
    key: string;
    datatype: string;
}

export interface IWidget {
    _id: string;
    name: string;
    type: string;
    properties: IWidgetProperties[];
    is_delete: number;
    created_at: string;
    updated_at: string;
    __v: number;
}

export interface IParams {
    page: number;
    size: number;
}

export const getAllWidgets = createAsyncThunk(
    'get all widgets',
    async (params: IParams, {dispatch}) => {
        const _response: any = await axios
            .get(environment.NX_WIDGET_SERVICE + `/widgets`, {
                params: params,
            })
            .catch((error) => error);

        if (
            _response &&
            _response.data &&
            _response.data.statusCode &&
            _response.data.statusCode === 403
        ) {
            return _response;
        }

        if (_response && _response.data && _response.data.result) {
            const response: any = _response.data.result;

            if (response && response.data) {
                const data: IWidget[] = response.data;
                const dataForStore: IWidget[] = data.map((e: IWidget) => {
                    return {
                        _id: e._id,
                        name: e.name,
                        type: e.type,
                        properties: e.properties,
                        is_delete: e.is_delete,
                        created_at: e.created_at,
                        updated_at: e.updated_at,
                        __v: e.__v,
                    };
                });
                dispatch(setWidgets(dataForStore));
            }
        }
    }
);

export const uploadImageApi = createAsyncThunk(
    'login-theme',
    async (params: any, {dispatch}) => {
        const response: any = await axios.post(
            `${environment.NX_FILE_SERVICE_BASE_URL}?isPublic=true`,
            params.data,
            {
                headers: {
                    storageid: 'aws',
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        const data: any = response.data;
        if (response.status === 201) {
            return response;
        } else return 'error';
    }
);
const widgetSliceAdapter = createEntityAdapter<IWidget>({
    selectId: ({_id}) => _id,
});

export const {
    selectAll: selectAllWidgets,
    selectById: selectWidgetById,
    selectIds: selectWidgetByIds,
} = widgetSliceAdapter.getSelectors((state: IRootState) => {
    return state.grid.widgetSlice;
});

const widgetSlice = createSlice({
    name: 'widgetSlice',
    initialState: widgetSliceAdapter.getInitialState({
        activeWidgetId: null,
    }),
    reducers: {
        setWidgets: widgetSliceAdapter.upsertMany,
    },
});

export const {setWidgets} = widgetSlice.actions;
export default widgetSlice.reducer;
