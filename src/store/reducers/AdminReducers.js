import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    venues: undefined,
    allUser: [],
    newSkills: [],
    allSkills: [],
    allRequestedWorkshops: []
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
        },
        saveUserDetails: (state, action) => {
            state.value.userDetails = action.payload.data;
        },
        saveNewSkills: (state, action) => {
            state.value.newSkills = action.payload.data;
        },
        saveAllSkills: (state, action) => {
            state.value.allSkills = action.payload.data;
        },
        saveAllUserRequestedSkills: (state, action) => {
            state.value.allRequestedWorkshops = action.payload.data;
        }
    }
})

export const { saveVenues, saveAllUsers, saveUserDetails, saveNewSkills, saveAllSkills, saveAllUserRequestedSkills } = adminSlice.actions;
export default adminSlice.reducer;