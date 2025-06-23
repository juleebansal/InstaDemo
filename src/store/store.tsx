import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import videoReducer from '../slice/videoSlice';

// --- Redux Persist Setup ---
const persistConfig = {
  key: 'root', // Key for AsyncStorage
  storage: AsyncStorage, // Use AsyncStorage for React Native
  whitelist: ['video'], // Only persist the 'video' slice. Adjust if you have other slices to persist.
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, videoReducer);

/**
 * Configures and exports the Redux store.
 * It now uses `persistedReducer` to enable state persistence.
 */
export const store = configureStore({
  reducer: {
    video: persistedReducer, // Use persistedReducer here
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create and export the persistor
export const persistor = persistStore(store);

// Define RootState and AppDispatch types for better Redux typing in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
