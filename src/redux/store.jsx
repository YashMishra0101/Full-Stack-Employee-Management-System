import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./slices/employeeSlice";

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
});
