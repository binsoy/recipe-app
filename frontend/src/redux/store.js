import { configureStore } from '@reduxjs/toolkit';

import { recipeListReducer, favoritesReducer } from './slices/recipeSlice';
import {
  userReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from './slices/userSlice';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const reducer = {
  userLogin: userReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  recipes: recipeListReducer,
  favorites: favoritesReducer,
};

const store = configureStore({
  reducer,
  preloadedState: initialState,
});

export default store;
