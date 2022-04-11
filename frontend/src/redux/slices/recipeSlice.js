import { createSlice } from '@reduxjs/toolkit';
import { getRecipes } from '../actions/recipeAction';

const recipeListSlice = createSlice({
  name: 'recipeList',
  initialState: {},
  reducers: {
    reset: (state, action) => {
      state.recipesInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecipes.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipesInfo = action.payload;
      })
      .addCase(getRecipes.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export const { reset: resetListActionCreator } = recipeListSlice.actions;
export const recipeListReducer = recipeListSlice.reducer;
