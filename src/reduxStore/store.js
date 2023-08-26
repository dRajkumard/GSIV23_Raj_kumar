import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from './slices/movieSlice'

export const store = configureStore({
    reducer:{
        movies:moviesReducer,
    }
})