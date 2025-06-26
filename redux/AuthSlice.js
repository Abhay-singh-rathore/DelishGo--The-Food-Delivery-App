

import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name : 'auth',
    initialState:{
        email : '',
        password : '',
    },

    reducers: {
        login: (state, action) => {
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
     
    },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;