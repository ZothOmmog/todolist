import { createSlice } from "@reduxjs/toolkit";
import { IShowErrorAction } from "./error-modal-slice-types";

const { actions, reducer } = createSlice({
    name: 'errorModal',
    initialState: {
        title: '',
        message: ''
    },
    reducers: {
        showError(state, action: IShowErrorAction) {
            state.title = action.payload.title;
            state.message = action.payload.message;
        },
        closeError(state) {
            state.message = '';
            state.title = '';
        }
    }
});

export {
    actions as errorModalActions,
    reducer as errorModalReducer
}