import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { processPayment } from "utils/https/payment";

const initialState = {
    paymentData: {},
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    err: null,
};

const doPayment = createAsyncThunk(
    "payment/post",
    async ({ paymentInfo }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const response = await processPayment(paymentInfo); // Gọi hàm xử lý thanh toán từ utils
            console.log(response.data);
            return fulfillWithValue(response.data);
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        clearPaymentData: () => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(doPayment.pending, (prevState) => {
                return {
                    ...prevState,
                    isLoading: true,
                    isRejected: false,
                    isFulfilled: false,
                    err: null,
                };
            })
    }
})

export const paymentAction = {
    ...paymentSlice.actions,
    doPayment,
};

export default paymentSlice.reducer;