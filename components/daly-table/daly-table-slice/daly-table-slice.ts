import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';
import { formatISODuration } from 'date-fns/esm';
import { COMMON_FETCH_ERROR } from '../../../common-constants';
import { isLoading } from '../../../common-types';
import { errorModalActions } from '../../error-modal';
import * as types from './daly-table-slice-types';

const MOCK_DALY_ITEMS = [
    {
        key: 0,
        date: new Date().toUTCString(),
        keyTask: 228,
        desctiption: 'Какое-то описание для действий по таску 228',
        timeStart: addHours(new Date(), -4).toUTCString(),
        timeEnd: addHours(new Date(), -2).toUTCString()
    },
    {
        key: 1,
        date: new Date().toUTCString(),
        keyTask: 1488,
        desctiption: 'Какое-то описание для действий по таску 1488',
        timeStart: addHours(new Date(), -2).toUTCString(),
        timeEnd: new Date().toUTCString()
    }
];

const SLICE_NAME = 'dalyTable';

const adapter = createEntityAdapter<types.IDalyTableItemTask>({
    selectId: item => item.key,
    sortComparer: (itemA, itemB) => itemA.key - itemB.key
});

const thunks = {
    fetchDalyItems: createAsyncThunk(
        `${SLICE_NAME}/fetchDalyItems`,
        () => {
            return MOCK_DALY_ITEMS;
        }
    ),
    fetchDalyItemAdded: createAsyncThunk<
        void,
        types.IDalyItemForFetch,
        {
            rejectValue: -1
        }
    >(
        `${SLICE_NAME}/fetchDalyItemAdded`,
        async (_dalyItem, thunkAPI) => {
            //Имитация задержки ответа
            await new Promise((resolve) => setTimeout(() => resolve(), 2000));
            try {
                throw new Error('Функционал по добавлению записи ещё не реализован :(');
            }
            catch(e) {
                thunkAPI.dispatch(errorModalActions.showError({
                    title: 'Ошибка при добавлении записи',
                    message: e.message
                }));
                return thunkAPI.rejectWithValue(-1);
            }
        }
    )
}

const { actions, reducer } = createSlice({
    name: SLICE_NAME,
    initialState: adapter.getInitialState({ isLoading: isLoading.initial, cancelAddItem: false }),
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
            console.log(action);
            adapter.setAll(state, action.payload);
        });
        builder.addCase(thunks.fetchDalyItemAdded.rejected, () => {
            
        });
    }
});

export {
    actions as dalyTableActions,
    thunks as dalyTableThunks,
    reducer as dalyTableReducer,
    adapter as dalyTableAdapter //export only for selectors
};