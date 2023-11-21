import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "./auth";
import profileSlice from "./user";

const reducer = combineReducers({
  auth: authSlice,
  profile: profileSlice,
});

export default reducer;
