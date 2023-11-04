import { configureStore } from "@reduxjs/toolkit";
import UserReducers from "./reducers/UserReducers";
import AdminReducers from "./reducers/AdminReducers";
import WorkshopReducers from './reducers/WorkshopReducers';
import SkillsReducers from './reducers/SkillsReducers';

export const Store = configureStore({
  reducer: {
    user: UserReducers,
    admin: AdminReducers,
    workshop: WorkshopReducers,
    skills: SkillsReducers
  }
});