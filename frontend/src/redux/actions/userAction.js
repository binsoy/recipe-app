import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/users', {
        name,
        email,
        password,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const details = createAsyncThunk(
  'user/details',
  async (id, { rejectWithValue, getState }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/users/${id}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const update = createAsyncThunk(
  'user/update',
  async (user, { rejectWithValue, getState }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(`/api/users/profile`, user, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
