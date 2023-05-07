import { configureStore } from "@reduxjs/toolkit";
import { issueApi } from "./issue/issue.api";
import { issueReducer } from "./issue/issue.slice";

export const store = configureStore({
    reducer: {
        query: issueReducer,
        [issueApi.reducerPath]: issueApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(issueApi.middleware),
})
export type RootState = ReturnType<typeof store.getState>