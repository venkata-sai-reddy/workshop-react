import { configureStore } from "@reduxjs/toolkit";
import UserReducers from "./reducers/UserReducers";
import AdminReducers from "./reducers/AdminReducers";
import WorkshopReducers from './reducers/WorkshopReducers';

export const Store = configureStore({
  reducer: {
    user: UserReducers,
    admin: AdminReducers,
    workshop: WorkshopReducers
  }
});