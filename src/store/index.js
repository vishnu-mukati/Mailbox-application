import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import composeReducer from './ComposeSlice';


const store = configureStore({
    reducer: { auth: authReducer, compose : composeReducer }
})

export default store;