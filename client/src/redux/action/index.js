import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiGetCategory } from '~/apis';

export const getCategory = createAsyncThunk('app/category', async (data, { rejectWithValue }) => {
    const response = await apiGetCategory();
    if (!response.success) {
        return rejectWithValue(response);
    }
    return response;
});
