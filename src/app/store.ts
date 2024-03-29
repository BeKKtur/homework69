import {configureStore} from "@reduxjs/toolkit";
import {filmReducer} from "../store/FilmsSlice";

export const store = configureStore({
    reducer:{
        film: filmReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;