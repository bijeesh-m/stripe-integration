import { createSlice } from "@reduxjs/toolkit";




const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            let isExist = false;
            state.map((item) => {
                if (item.id === action.payload.id) {
                    isExist = true;
                    return (item.quantity += 1);
                }
            });
            if (!isExist) {
                state.push(action.payload);
            }
        },
        removeFromCart: (state, action) => (state = state.filter((item) => item.id !== action.payload)),
        incQty: (state, action) => {
            state.map((item) => {
                if (item.id === action.payload) {
                    return (item.quantity += 1);
                }
            });
        },
        decQty: (state, action) => {
            state.map((item) => {
                if (item.id === action.payload) {
                    if (item.quantity > 1) {
                        return (item.quantity -= 1);
                    }
                    
                }
            });
        },
    },
});

export const { addToCart, removeFromCart, incQty, decQty } = cartSlice.actions;
export default cartSlice.reducer;
