import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axios.config";

// Create async thunk for fetching products
export const fetchProducts = createAsyncThunk("products/fetchProducts", async (thunkAPI) => {
    try {
        const response = await axios.get("/products");
        return response.data.products;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong");
    }
});

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        loading: false,
        error: null,
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default productSlice.reducer;
