import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {},
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    err: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logoutRedux: () => {
            return initialState;
        },
    }
})

export const authAction = {
    ...authSlice.actions,
};

export default authSlice.reducer;
