import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { dalyTableReducer, errorModalReducer } from "../components";

export const store = configureStore({
    reducer: {
        dalyTable: dalyTableReducer,
        errorModal: errorModalReducer
    }
});


export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()