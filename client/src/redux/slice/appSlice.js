import { createSlice } from '@reduxjs/toolkit';
import * as actions from '../action';

const appSlice = createSlice({
    name: 'app',
    initialState: {
        category: null,
        resizeScreen: window.innerWidth,
        isLoading: false,
        isShowModal: false,
    },
    reducers: {
        resizeScreen: (state, action) => {
            state.resizeScreen = action.payload;
        },
        showModal: (state, action) => {
            state.isShowModal = action.payload;
        },
    },

    extraReducers: (builder) => {
        // Bắt đầu thực hiện action actions.getCategory (Promise pending)
        builder
            .addCase(actions.getCategory.pending, (state) => {
                state.isLoading = true;
            })

            // Khi thực hiện action actions.getCategory thành công (Promise fulfilled)
            .addCase(actions.getCategory.fulfilled, (state, action) => {
                // Tắt trạng thái loading, lưu thông tin user vào store
                state.isLoading = false;
                state.category = action.payload?.data;
            })

            // Khi thực hiện action actions.getCategory thất bại (Promise rejected)
            .addCase(actions.getCategory.rejected, (state, action) => {
                // Tắt trạng thái loading, lưu thông báo lỗi vào store
                state.isLoading = false;
            });
    },
});

export const { resizeScreen, showModal } = appSlice.actions;

export default appSlice.reducer;
