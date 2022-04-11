import { configureStore } from '@reduxjs/toolkit';

import {
  userReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from './slices/userSlice';

import { recipeListReducer } from './slices/recipeSlice';

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
};

const store = configureStore({
  reducer,
  preloadedState: initialState,
});

export default store;
