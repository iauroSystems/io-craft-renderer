import {createAsyncThunk, createEntityAdapter, createSlice, EntityState,} from '@reduxjs/toolkit';
import {IRootState} from './index';
// import axios from 'axios';
import axios from '../utils/NetworkLayer';
import {environment} from '../environments/environment';

type _IRTheme = EntityState<IRTheme>;

export interface IRThemeContext extends _IRTheme {
    activeProjectId: string;
}

export interface IRTheme {
    project_id: string;
    font: any;
}

export const getTheme = createAsyncThunk(
    'projects',
    async (params: any, {dispatch}: any) => {
        const response: any = await axios.get(
            `${environment.NX_THEME_BASE_URL}/fonts/${params}`
        );
        const themeObject: IRTheme = {
            project_id: params,
            font: {
                families: 'poppins',
            },
        };
        return response;
    }
);

const themeContextAdapter = createEntityAdapter<IRTheme>({
    selectId: ({project_id}) => project_id,
});

export const {selectAll: selectThemeContext} =
    themeContextAdapter.getSelectors(
        (state: IRootState) => state.containerApp.themeContextSlice
    );

const themeContextSlice = createSlice({
    name: 'projects',
    initialState: themeContextAdapter.getInitialState({
        themeContext: null,
    }),
    reducers: {
        setThemeContext: themeContextAdapter.setOne,
    },
});

export const {setThemeContext} = themeContextSlice.actions;
export default themeContextSlice.reducer;
