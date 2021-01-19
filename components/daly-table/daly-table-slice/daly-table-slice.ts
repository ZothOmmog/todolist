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

const thunks = {
    fetchEditItem: createAsyncThunk<
        types.IDalyTableItemTask[],
        types.IDalyTableItemTaskDB,
        {
            rejectValue: fetchErrors,
            state: RootState
        }
    >(
        `${SLICE_NAME}/fetchEditItem`,
        async (editedItem, thunkAPI) => {
            try {
                const result = await dalyTableApi.updateTask(editedItem);
                return normalizeTodosFromDb(result);
            }
            catch(e) {
                thunkAPI.dispatch(errorModalActions.showError({
                    title: 'Ошибка при редактировании записи',
                    message: e.message
                }));
                return thunkAPI.rejectWithValue(fetchErrors.common);
            }
        }
    )
}

const { actions, reducer } = createSlice({
    name: SLICE_NAME,
    initialState: adapter.getInitialState({
        isLoading: isLoading.initial
    }),
    reducers: {
        dalyItemAdded: adapter.addOne,
        dalyItemsChanged: adapter.setAll
    },
    extraReducers: builder => {
        builder.addCase(thunks.fetchEditItem.fulfilled, (state, action) => {
            adapter.setAll(state, action.payload);
        });
    }
});

export {
    actions as dalyTableActions,
    thunks as dalyTableThunks,
    reducer as dalyTableReducer,
    adapter as dalyTableAdapter //export only for selectors
};