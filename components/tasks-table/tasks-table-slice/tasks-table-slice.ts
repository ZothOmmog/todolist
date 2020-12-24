import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { IAgregateTaskInfo } from "../tasks-table-types";

const adapter = createEntityAdapter<IAgregateTaskInfo>({
    selectId: (agregateTaskInfo) => agregateTaskInfo.key,
    sortComparer: (a, b) => a.key - b.key
});

const { actions, reducer } = createSlice({
    name: 'tasksTable',
    initialState: adapter.getInitialState(),
    reducers: {
        setAll: adapter.setAll
    }
});

export {
    actions as tasksTableActions,
    reducer as tasksTableReducer,
    adapter as tasksTableAdapter
}