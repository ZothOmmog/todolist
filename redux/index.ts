import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { dalyTableReducer, errorModalReducer } from "../components";
import { tasksTableReducer } from "../components/tasks-table/tasks-table-slice/tasks-table-slice";

export const store = configureStore({
    reducer: {
        dalyTable: dalyTableReducer,
        tasksTable: tasksTableReducer,
        errorModal: errorModalReducer
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;