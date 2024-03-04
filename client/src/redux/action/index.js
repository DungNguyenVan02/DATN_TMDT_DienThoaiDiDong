import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiGetCategory } from '~/apis';
import { apiGetProducts } from '~/apis/products';

export const getCategory = createAsyncThunk('app/category', async (data, { rejectWithValue }) => {
    const response = await apiGetCategory();
    if (!response.success) {
        return rejectWithValue(response);
    }
    return response;
});

export const getBestSellers = createAsyncThunk('product/bestSeller', async (data, { rejectWithValue }) => {
    const response = await apiGetProducts({ sort: '-sold' });
    if (!response.success) {
        return rejectWithValue(response);
    }
    return response;
});

export const getNewProduct = createAsyncThunk('product/newProducts', async (data, { rejectWithValue }) => {
    const response = await apiGetProducts({ sort: 'createdAt' });
    if (!response.success) {
        return rejectWithValue(response);
    }
    return response;
});
