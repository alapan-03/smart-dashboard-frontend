import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // This defaults to localStorage
import rootReducer from './Reducers'; // Assuming this is the root reducer

// Configuration for redux-persist
const persistConfig = {
  key: 'root',         // Key for the persisted state (can be anything)
  storage,             // Storage to use (localStorage in this case)
  whitelist: ['auth'], // List of reducers to persist (e.g., auth)
};

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store to use persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };
