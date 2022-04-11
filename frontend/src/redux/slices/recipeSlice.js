import { createSlice } from '@reduxjs/toolkit';
import {
  getRecipes,
  getMoreRecipes,
  getFavoriteRecipes,
  addFavoriteRecipe,
  deleteFavoriteRecipe,
} from '../actions/recipeAction';

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
      })
      .addCase(getMoreRecipes.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMoreRecipes.fulfilled, (state, action) => {
        return {
          recipesInfo: {
            ...action.payload,
            hits: [...state.recipesInfo.hits, ...action.payload.hits],
          },
        };
      })
      .addCase(getMoreRecipes.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

const favoriteRecipesSlice = createSlice({
  name: 'favorites',
  initialState: {},
  reducers: {
    reset: (state, action) => {
      return {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFavoriteRecipes.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getFavoriteRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
      })
      .addCase(getFavoriteRecipes.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(addFavoriteRecipe.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addFavoriteRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites.push(action.payload);
      })
      .addCase(addFavoriteRecipe.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(deleteFavoriteRecipe.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteFavoriteRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = state.favorites.filter(
          (x) => x.recipe.uri !== action.payload.recipe.uri
        );
      })
      .addCase(deleteFavoriteRecipe.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export const { reset: resetListActionCreator } = recipeListSlice.actions;
export const {
  reset: resetFavoritesActionCreator,
} = favoriteRecipesSlice.actions;

export const recipeListReducer = recipeListSlice.reducer;
export const favoritesReducer = favoriteRecipesSlice.reducer;
