import { createSlice } from '@reduxjs/toolkit';
import * as actions from '../action';

const productSlice = createSlice({
    name: 'product',
    initialState: {
        bestSellers: null,
        newProducts: null,
        loading: false,
    },
    reducers: {},

    extraReducers: (builder) => {
        // Bắt đầu thực hiện action actions.getCategory (Promise pending)
        builder
            .addCase(actions.getBestSellers.pending, (state) => {
                state.loading = true;
            })

            .addCase(actions.getBestSellers.fulfilled, (state, action) => {
                state.bestSellers = action.payload?.products;
            })

            .addCase(actions.getBestSellers.rejected, (state, action) => {
                state.loading = false;
            })

            .addCase(actions.getNewProduct.pending, (state) => {
                state.loading = true;
            })

            .addCase(actions.getNewProduct.fulfilled, (state, action) => {
                state.newProducts = action.payload?.products;
            })

            .addCase(actions.getNewProduct.rejected, (state, action) => {
                state.loading = false;
            });
    },
});

export default productSlice.reducer;
