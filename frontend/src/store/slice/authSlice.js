import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    userData: {
        _id: "",
        username: "",
        email: "",
        university: "",
        role: ""
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            if(action.payload.userData) {
                state.userData = action.payload.userData;
            }else{
                state.userData = action.payload;
            }
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.userData = {
                _id: "",
                username: "",
                email: "",
                university: "",
                role: ""
            };
        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;