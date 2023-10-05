import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isUserAuthenticated: false,
    user: {},
}

export const userSlice = createSlice({
    name:"user",
    initialState: {value: initialState},
    reducers: {
        saveUser: (state, action) => {
            state.value.isUserAuthenticated = action.payload.status === 200 ? true : false;
            state.value.user = action.payload.data;
            localStorage.setItem('session', state.value.user.session);
        },
        doLogout: (state, action) => {
            state.value.isUserAuthenticated = false;
            state.value.user = {}
            localStorage.clear();
        }
    }
})

export const { saveUser, doLogout } = userSlice.actions;
export default userSlice.reducer;