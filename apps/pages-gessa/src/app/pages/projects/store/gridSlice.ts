import {createEntityAdapter, createSelector, createSlice, EntityState,} from '@reduxjs/toolkit';
import {IRootState} from '../../../../store';

type _IRGridData = EntityState<IRGrid>;

export interface IRGridData extends _IRGridData {
    activePageId: string;
}

export interface IRGrid extends _IRGridData {
    page_id: string;
    page: string;
    data: any;
}

const gridDataAdapter = createEntityAdapter<IRGrid>({
    selectId: ({page_id}: any) => page_id,
});

export const {selectAll: selectGridData} = gridDataAdapter.getSelectors(
    (state: IRootState) => {
        return state.containerApp.gridSlice;
    }
);

export const selectActivePageId = createSelector(
    (state: IRootState) => state.containerApp.gridSlice,
    (data: any) => data
);

const gridSlice = createSlice({
    name: 'gridStore',
    initialState: gridDataAdapter.getInitialState({activePageId: '-1'}),
    reducers: {
        setGridDatatore: gridDataAdapter.setAll,
    },
});

export const {setGridDatatore} = gridSlice.actions;
export default gridSlice.reducer;
