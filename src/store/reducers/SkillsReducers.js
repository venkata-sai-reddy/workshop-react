import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allSkills: undefined
}

export const skillsSlice = createSlice({
    name:"skills",
    initialState: {value: initialState},
    reducers: {
        saveAllSkills : (state, action) => {
            state.value.allSkills = action.payload.data;
        },
        
    }
})

export const { saveAllSkills } = skillsSlice.actions;
export default skillsSlice.reducer;