import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        token: null,
    },
    reducers: {
        login: (state, action) => {
            state.currentUser = action.payload?.user;
            state.token = action.payload?.accessToken;
        },
        logout: (state) => {
            state.currentUser = null;
            state.token = null;
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
