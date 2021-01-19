import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { compareAsc } from 'date-fns';
import { dalyTableApi } from '../../../api/daly-table-api';
import { fetchErrors, isLoading } from '../../../common-types';
import { normalizeTodosFromDb } from '../../../helpers/normalize-todos-from-db';
import { RootState } from '../../../redux';
import { errorModalActions } from '../../error-modal';
import * as types from './daly-table-slice-types';

const SLICE_NAME = 'dalyTable';

const adapter = createEntityAdapter<types.IDalyTableItemTask>({
    selectId: item => item.key,
    sortComparer: (itemA, itemB) => compareAsc(
        new Date(itemA.timeStart),
        new Date(itemB.timeStart)
    )
});

const { actions, reducer } = createSlice({
    name: SLICE_NAME,
    initialState: adapter.getInitialState({
        isLoading: isLoading.initial
    }),
    reducers: {
        dalyItemAdded: adapter.addOne,
        dalyItemsChanged: adapter.setAll
    }
});

export {
    actions as dalyTableActions,
    reducer as dalyTableReducer,
    adapter as dalyTableAdapter //export only for selectors
};