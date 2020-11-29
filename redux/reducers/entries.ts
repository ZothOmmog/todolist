import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//====================slice-name====================
const SLICE_NAME = 'entries';
//==================================================

//====================thunks====================
const thunks = {

}
//==============================================

//====================initialState====================
const initialState = {
    entries: []
};
//====================================================

//====================helpers====================
//===============================================

//====================slice====================
const { actions, reducer } = createSlice({
    name: SLICE_NAME,
    initialState: initialState,
    reducers: {
    
    },
    extraReducers: {
    
    }
});
//=============================================

//====================selectors====================
const sliceSelector = (state) => state.entries;
const selectors = {
    entries: (state) => sliceSelector(state).entries
};
//=================================================

//====================exports====================
export { selectors as entriesSelectors };
export { thunks as entriesThunks };
export { actions as entriesActions };
export { reducer as entriesReducer };
//===============================================