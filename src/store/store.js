import { configureStore } from "@reduxjs/toolkit";
import visitsReducer from "./visitsSlice";

export const store = configureStore({
  reducer: {
    visits: visitsReducer,
  },
});
