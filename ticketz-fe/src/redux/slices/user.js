import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

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
  }
});

export const profileAction = {
  ...profileSlice.actions,
};

export default profileSlice.reducer;
