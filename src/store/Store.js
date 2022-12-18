import { configureStore } from "@reduxjs/toolkit";
import navReducer from "../slices/navSlice";

export const Store = configureStore({
    reducer:{
        nav: navReducer,
    },
});