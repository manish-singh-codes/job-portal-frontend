import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading : false,
    user : null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Add your reducers here
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser : (state, action) => {
            state.user = action.payload;
        },

    }
});

export const { setLoading, setUser} = authSlice.actions;
export default authSlice.reducer;