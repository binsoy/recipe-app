import { createSlice } from '@reduxjs/toolkit'

const productListSlice = createSlice({
  name: 'productList',
  initialState: {
    products: [],
    product: { reviews: [] },
    loading: false,
    error: '',
  },
  reducers: {
    request: (state) => {
      return (state.loading = true)
    },
    success: (state, action) => {
      state.products = action.payload.products
      state.pages = action.payload.pages
      state.page = action.payload.page
      state.loading = false
    },
    fail: (state, action) => {
      state.shippingAddress = action.payload
    },
    savePaymentMethod: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const {
  request: productListRequestActionCreator,
  success: productListSuccessActionCreator,
  fail: productListFailActionCreator,
} = productListSlice.actions

export const productListReducer = productListSlice.reducer
