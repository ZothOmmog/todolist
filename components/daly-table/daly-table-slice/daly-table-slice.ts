import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import Item from 'antd/lib/list/Item';
import { addHours, compareAsc, startOfDay } from 'date-fns';
import { fetchErrors, isLoading } from '../../../common-types';
import { RootState } from '../../../redux';
import { errorModalActions } from '../../error-modal';
import * as types from './daly-table-slice-types';

let MOCK_ID = 2;
const MOCK_DALY_ITEMS = [
    {
        key: 0,
        date: startOfDay(new Date()).toUTCString(),
        keyTask: 228,
        desctiption: 'Какое-то описание для действий по таску 228',
        timeStart: addHours(new Date(), -5).toUTCString(),
        timeEnd: addHours(new Date(), -3).toUTCString()
    },
    {
        key: 1,
        date: startOfDay(new Date()).toUTCString(),
        keyTask: 1488,
        desctiption: 'Какое-то описание для действий по таску 1488',
        timeStart: addHours(new Date(), -3).toUTCString(),
        timeEnd: addHours(new Date(), -2).toUTCString()
    }
];

const SLICE_NAME = 'dalyTable';

const adapter = createEntityAdapter<types.IDalyTableItemTask>({
    selectId: item => item.key,
    sortComparer: (itemA, itemB) => compareAsc(
        new Date(itemA.timeStart),
        new Date(itemB.timeStart)
    )
});

const thunks = {
    fetchDalyItems: createAsyncThunk(
        `${SLICE_NAME}/fetchDalyItems`,
        () => {
            return [...MOCK_DALY_ITEMS];
        }
    ),
    fetchDalyItemAdded: createAsyncThunk<
        types.IDalyTableItemTask[],
        types.IDalyItemForFetch,
        {
            rejectValue: fetchErrors,
            state: RootState
        }
    >(
        `${SLICE_NAME}/fetchDalyItemAdded`,
        async (dalyItem, thunkAPI) => {
            //Имитация задержки ответа
            await new Promise((resolve) => setTimeout(() => resolve(), 2000));
            try {
                const { cancelAddItem } = thunkAPI.getState().dalyTable;
                if (cancelAddItem) return;
                MOCK_DALY_ITEMS.push({ ...dalyItem, key: MOCK_ID++ });
                return [...MOCK_DALY_ITEMS];
            }
            catch(e) {
                thunkAPI.dispatch(errorModalActions.showError({
                    title: 'Ошибка при добавлении записи',
                    message: e.message
                }));
                return thunkAPI.rejectWithValue(fetchErrors.common);
            }
        }
    ),
    fetchEditItem: createAsyncThunk<
        types.IDalyTableItemTask[],
        types.IDalyTableItemTask,
        {
            rejectValue: fetchErrors,
            state: RootState
        }
    >(
        `${SLICE_NAME}/fetchEditItem`,
        async (editedItem, thunkAPI) => {
            try {
                const { cancelEditItem } = thunkAPI.getState().dalyTable;
                if (cancelEditItem) return;
                MOCK_DALY_ITEMS[
                    MOCK_DALY_ITEMS.findIndex(item => item.key === editedItem.key)
                ] = editedItem;
                return [...MOCK_DALY_ITEMS];
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
        isLoading: isLoading.initial,
        cancelAddItem: false,
        cancelEditItem: false
    }),
    reducers: {
        dalyItemAdded: adapter.addOne,
        cancelAddItem(state) {
            state.cancelAddItem = true;
        }
    },
    extraReducers: builder => {
        builder.addCase(thunks.fetchDalyItems.pending, (state) => {
            state.isLoading = isLoading.loading;
        });
        builder.addCase(thunks.fetchDalyItems.fulfilled, (state, action) => {
            adapter.setAll(state, action.payload);
        });

        builder.addCase(thunks.fetchDalyItemAdded.pending, (state) => {
            state.cancelAddItem = false;
        });
        builder.addCase(thunks.fetchDalyItemAdded.fulfilled, (state, action) => {
            adapter.setAll(state, action.payload);
        });

        builder.addCase(thunks.fetchEditItem.pending, (state) => {
            state.cancelEditItem = false;
        });
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