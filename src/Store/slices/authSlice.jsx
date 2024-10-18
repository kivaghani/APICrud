import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "", 
    email: "", 
    firstName: "", 
    lastName: "", 
    gender: "", 
    token: {
        access: '', 
        refresh: '' 
    },
    profilePicture: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        adminLogin: (state, action) => {
            state.username = action.payload?.username; 
            state.email = action.payload?.email; 
            state.firstName = action.payload?.firstName; 
            state.lastName = action.payload?.lastName; 
            state.gender = action.payload?.gender; 
            state.token = {
                access: action.payload?.accessToken, 
                refresh: action.payload?.refreshToken 
            };
            state.profilePicture = action.payload?.image; 
        },

        adminLogout: () => initialState, 
    },
});

export const { adminLogin, adminLogout } = authSlice.actions;

export default authSlice.reducer;
