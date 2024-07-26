import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer.js";

// this function creates the store and we pass our root reducer to it
export default configureStore({
  reducer: userReducer,
});
