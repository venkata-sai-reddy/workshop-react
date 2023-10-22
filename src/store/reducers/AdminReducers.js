import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    venues: undefined,
    allUser: []
}

export const adminSlice = createSlice({
    name:"admin",
    initialState: {value: initialState},
    reducers: {
        saveVenues: (state, action) => {
            state.value.venues = action.payload.data;
        },
        saveAllUsers: (state, action) => {
            state.value.allUsers = action.payload.data
        }
    }
})

export const { saveVenues, saveAllUsers } = adminSlice.actions;
export default adminSlice.reducer;