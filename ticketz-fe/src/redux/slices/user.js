import { createSlice } from "@reduxjs/toolkit";
import { getProfileData } from "utils/https/user";

const initialState = {
  data: [],
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  err: null,
};

const getProfile = createAsyncThunk(
    "profile/get",
    async ({ token, controller }) => {
      try {
        const response = await getProfileData(token, controller);
        return response.data.data[0];
      } catch (err) {
        return err;
      }
    }
  );

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    filter: (prevState) => {
      return {
        ...prevState,
        data: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (prevState) => {
        return {
          ...prevState,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
          err: null,
        };
      })
      .addCase(getProfile.fulfilled, (prevState, action) => {
        // console.log(action.payload);
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: true,
          data: action.payload,
        };
      })
    }
});

export const profileAction = {
  ...profileSlice.actions,
};

export default profileSlice.reducer;
