import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../config/axios.config";

// Check authentication on page load

export const checkAuthStatus = createAsyncThunk("auth/checkStatus", async (thunkAPI) => {
    try {
        const response = await axiosInstance.get(`/auth/me`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue("Not authenticated");
    }
});

// logout

// export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
//     try {
//         await authInstance.delete("/logout", {}, { withCredentials: true });
//         return null; // Clearing user state
//     } catch (error) {
//         return rejectWithValue("Logout failed");
//     }
// });

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(checkAuthStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkAuthStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(checkAuthStatus.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;
