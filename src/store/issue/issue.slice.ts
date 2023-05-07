import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    query: ''
}

export const issueSlice = createSlice({
    name: 'issues',
    initialState,
    reducers: {
        getIssue: (state, action: PayloadAction<string>) => {
            state.query = action.payload
        }
        
    }
})

export const issueReducer = issueSlice.reducer;
export const issueListAction = issueSlice.actions;