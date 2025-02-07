import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading : false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Add your reducers here
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const { setLoading} = authSlice.actions;
export default authSlice.reducer;