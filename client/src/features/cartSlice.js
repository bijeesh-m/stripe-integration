import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axios.config";

export const getCart = createAsyncThunk("cart/getCart", async (userId) => {
    const res = await axios.get(`/cart`);
    return res.data.userCart;
});

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        userId: null,
        items: [],
        totalAmount: 0,
        status: "active",
        loading: false,
        error: null,
    },
    reducers: {
        addToCart: (state, action) => {
            const item = state.items.find((i) => i.productId._id === action.payload.productId);
            if (item) {
                item.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            console.log(action);
            state.items = state.items.filter((i) => i.productId._id !== action.payload);
        },
        incQty: (state, action) => {
            const item = state.items.find((i) => i.productId._id === action.payload);
            if (item) item.quantity += 1;
        },
        decQty: (state, action) => {
            const item = state.items.find((i) => i.productId._id === action.payload);
            if (item && item.quantity > 1) item.quantity -= 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                const { userId, items, totalAmount, status } = action.payload;
                state.userId = userId;
                state.items = items;
                state.totalAmount = totalAmount;
                state.status = status;
                state.loading = false;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { addToCart, removeFromCart, incQty, decQty } = cartSlice.actions;
export default cartSlice.reducer;
