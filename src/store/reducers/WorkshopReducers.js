import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allWorkshops : [],
    workshop : [],
    filteredWorkshop: undefined
}

export const workshopSlice = createSlice({
    name:"workshop",
    initialState: {value: initialState},
    reducers: {
        saveAllWorkshops : (state, action) => {
            state.value.allWorkshops = action.payload.data;
        },
        saveWorkshop: (state, action) => {
            state.value.workshop = action.payload.data;
        },
        addToWorkshops: (state, action) => {
            state.value.allWorkshops.push(action.payload.data);
        },
        clearAllWorkshops : (state, action) => {
            state.value.allWorkshops = [];
        },
        clearWorkshop: (state, action) => {
            state.value.workshop = [];
        }
    }
})

export const { saveAllWorkshops, saveWorkshop, addToWorkshops, clearAllWorkshops, clearWorkshop } = workshopSlice.actions;
export default workshopSlice.reducer;