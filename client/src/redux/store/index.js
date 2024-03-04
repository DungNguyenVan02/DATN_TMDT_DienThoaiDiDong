import { configureStore } from '@reduxjs/toolkit';
import appSlice from '../slice/appSlice';
import productSlide from '../slice/productSlide';

const store = configureStore({
    reducer: {
        app: appSlice,
        product: productSlide,
    },
});

export default store;
