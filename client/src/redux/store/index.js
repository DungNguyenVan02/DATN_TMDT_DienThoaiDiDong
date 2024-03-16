import { configureStore } from '@reduxjs/toolkit';
import appSlice from '../slice/appSlice';
import productSlide from '../slice/productSlide';

import storage from 'redux-persist/lib/storage';
import userSlide from '../slice/userSlide';

import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';

const commonConfig = {
    storage,
};

const userConfig = {
    ...commonConfig,
    key: 'user/LEOphone',
    whitelist: ['currentUser', 'token'],
};

const appConfig = {
    ...commonConfig,
    key: 'app/LEOphone',
    whitelist: ['category'],
};

const store = configureStore({
    reducer: {
        app: persistReducer(appConfig, appSlice),
        product: productSlide,
        user: persistReducer(userConfig, userSlide),
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
const persistor = persistStore(store);
export { persistor, store };
