import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "", // Username
    email: "", // Email
    firstName: "", // First name
    lastName: "", // Last name
    gender: "", // Gender
    token: {
        access: '', // Access token
        refresh: '' // Refresh token
    },
    profilePicture: "", // Profile picture URL
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        adminLogin: (state, action) => {
            state.username = action.payload?.username; // Set username
            state.email = action.payload?.email; // Set email
            state.firstName = action.payload?.firstName; // Set first name
            state.lastName = action.payload?.lastName; // Set last name
            state.gender = action.payload?.gender; // Set gender
            state.token = {
                access: action.payload?.accessToken, // Access token
                refresh: action.payload?.refreshToken // Refresh token
            };
            state.profilePicture = action.payload?.image; // Profile picture URL
        },

        adminLogout: () => initialState, // Reset state on logout
    },
});

export const { adminLogin, adminLogout } = authSlice.actions;

export default authSlice.reducer;
