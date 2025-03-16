import { configureStore } from "@reduxjs/toolkit";
import visitsReducer from "./visitsSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    visits: visitsReducer,
    user: userReducer,
  },
});
