import {Film} from "../types";
import {createSlice} from "@reduxjs/toolkit";


interface FilmsState {
    films: Film[];
    value: string;
}

const initialState:FilmsState = {
    films: [],
    value: '',
};

const filmSlice = createSlice({
    name: 'film',
    initialState,
    reducers: {
        filmName: (state, action) => {
            state.value = action.payload;
        }
    },
});

export const filmReducer = filmSlice.reducer;

export const {filmName} = filmSlice.actions;

