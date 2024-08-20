import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import userSlice from './userSlice';
import productSlice from './productSlice';

const rootReducer = combineReducers({
  user: userSlice,
  products: productSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'products', 'forgotPassToken'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };