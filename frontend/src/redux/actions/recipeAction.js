import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getRecipes = createAsyncThunk('recipes', async (url) => {
  const { data } = await axios.get(url);
  return data;
});
