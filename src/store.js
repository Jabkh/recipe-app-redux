import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; 
import recipesReducer from './slices/recipesSlice'; 

const store = configureStore({
  reducer: {
    auth: authReducer, 
    recipes: recipesReducer
  }
});

export default store;
