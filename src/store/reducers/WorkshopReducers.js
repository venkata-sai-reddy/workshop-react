import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allWorkshops : undefined,
    upComingWorkshops : undefined,
    onGoingWorkshops : undefined,
    completedWorkshops : undefined,
    registeredWorkshops : undefined,
    requestedSkills: undefined,
    workshop : [],
    filteredWorkshop: undefined
}

export const workshopSlice = createSlice({
    name:"workshop",
    initialState: {value: initialState},
    reducers: {
        saveAllWorkshops : (state, action) => {
            const workshops = [
                ...action.payload.data.pastWorkshops,
                ...action.payload.data.onGoingWorkshops,
                ...action.payload.data.upComingWorkshops
              ];
            state.value.upComingWorkshops = action.payload.data.upComingWorkshops;
            state.value.allWorkshops = workshops;
        },
        saveWorkshop: (state, action) => {
            state.value.workshop = action.payload.data;
        },
        saveRegisteredWorkshops: (state, action) => {
            const workshops = [
                ...action.payload.data.pastWorkshops,
                ...action.payload.data.onGoingWorkshops,
                ...action.payload.data.upComingWorkshops
              ];
            state.value.registeredWorkshops = workshops;
        },
        saveRequestedSkills: (state, action) => {
            state.value.requestedSkills = action.payload.data;
        },
        updateLocalWorkshop: (state, action) => {
            state.value.upComingWorkshops[state.value.upComingWorkshops.findIndex((workshop) => workshop.workshopId === action.payload.workshopId)]= action.payload;
        },
        updateDeleteWorkshop: (state, action) => {
            state.value.upComingWorkshops.pop(state.value.upComingWorkshops.findIndex((workshop) => workshop.workshopId === action.payload.workshopId));
        },
        addToWorkshops: (state, action) => {
            state.value.upComingWorkshops.push(action.payload.data);
        },
        clearAllWorkshops : (state, action) => {
            state.value.allWorkshops = [];
        },
        clearWorkshop: (state, action) => {
            state.value.workshop = [];
        }
    }
})

export const { saveAllWorkshops, saveWorkshop, addToWorkshops, clearAllWorkshops, clearWorkshop, updateLocalWorkshop, updateDeleteWorkshop, saveRegisteredWorkshops, saveRequestedSkills } = workshopSlice.actions;
export default workshopSlice.reducer;