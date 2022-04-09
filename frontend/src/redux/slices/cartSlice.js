import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    shippingAddress: {},
  },
  reducers: {
    add: (state, action) => {
      const item = action.payload

      const existItem = state.cartItems.find(
        (x) => x.productId === item.productId
      )

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.productId === existItem.productId ? item : x
        )
      } else {
        state.cartItems.push(item)
      }
    },
    remove: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x.productId !== action.payload
      )
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload
    },
    setPrices: (state, action) => {
      return { ...action.payload }
    },
  },
})

export const {
  add: addToCartActionCreator,
  remove: removeFromCartActionCreator,
  saveShippingAddress: saveShippingAddressActionCreator,
  savePaymentMethod: savePaymentMethodActionCreator,
  setPrices: setPricesActionCreator,
} = cartSlice.actions

export const cartReducer = cartSlice.reducer
