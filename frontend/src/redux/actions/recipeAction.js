import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getRecipes = createAsyncThunk('recipes', async (keyword) => {
  let searchItem = 'salad';
  if (keyword) {
    searchItem = keyword;
  }

  // TODO: transfer app_id & app_key to .env
  let url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=c491d062&app_key=2240fe8cb9c7aca4aed7b49a15064785&q=${searchItem}`;
  const { data } = await axios.get(url);
  return data;
});

export const getMoreRecipes = createAsyncThunk('recipes/more', async (url) => {
  const { data } = await axios.get(url);
  return data;
});

export const getFavoriteRecipes = createAsyncThunk(
  'favorites',
  async (pageNumber, { rejectWithValue, getState }) => {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    try {
      const { data } = await axios.get(
        `/api/recipes/favorites/${pageNumber}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addFavoriteRecipe = createAsyncThunk(
  'favorites/add',
  async (recipe, { rejectWithValue, getState }) => {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    try {
      const { data } = await axios.post(
        '/api/recipes/favorites',
        { recipe },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteFavoriteRecipe = createAsyncThunk(
  'favorites/remove',
  async (id, { rejectWithValue, getState }) => {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    try {
      const { data } = await axios.delete(
        `/api/recipes/favorites/${id}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
