import { configureStore } from "@reduxjs/toolkit";
import UserReducers from "./reducers/UserReducers";

export const Store = configureStore({
  reducer: {
    user: UserReducers,
  }
});