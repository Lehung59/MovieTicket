import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { processPayment } from "utils/https/payment";

const initialState = {
    paymentData: {},
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    err: null,
};

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        clearPaymentData: () => {
            return initialState;
        },
    },
})

export const paymentAction = {
    ...paymentSlice.actions,
};

export default paymentSlice.reducer;