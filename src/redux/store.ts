import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import rootReducer from './reducers';

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
