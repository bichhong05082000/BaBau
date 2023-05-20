import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const foodsSlice = createSlice({
    name: 'Foods',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // builder.addCase();
    },
});

export default foodsSlice.reducer;
