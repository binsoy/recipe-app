import { createSlice } from '@reduxjs/toolkit';
import { login, update, details, register } from '../actions/userAction';

const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState: {},
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state, action) => {
      return {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload.message;
        state.loading = false;
      });
  },
});

const userRegisterSlice = createSlice({
  name: 'userRegister',
  initialState: {},
  reducers: {
    reset: (state, action) => {
      return {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload.message;
        state.loading = false;
      });
  },
});

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: { user: {} },
  reducers: {
    reset: (state, action) => {
      return {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(details.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(details.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(details.rejected, (state, action) => {
        state.error = action.payload.message;
        state.loading = false;
      });
  },
});

const userUpdateSlice = createSlice({
  name: 'userUpdate',
  initialState: {},
  reducers: {
    reset: (state, action) => {
      return {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(update.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.success = true;
      })
      .addCase(update.rejected, (state, action) => {
        state.error = action.payload.message;
        state.loading = false;
        state.success = false;
      });
  },
});

export const {
  logout: logoutActionCreator,
  login: loginActionCreator,
} = userLoginSlice.actions;

export const { reset: resetUserUpdateActionCreator } = userUpdateSlice.actions;
export const {
  reset: resetUserRegisterActionCreator,
} = userRegisterSlice.actions;
export const {
  reset: resetUserDetailsActionCreator,
} = userDetailsSlice.actions;

export const userReducer = userLoginSlice.reducer;
export const userRegisterReducer = userRegisterSlice.reducer;
export const userDetailsReducer = userDetailsSlice.reducer;
export const userUpdateProfileReducer = userUpdateSlice.reducer;
