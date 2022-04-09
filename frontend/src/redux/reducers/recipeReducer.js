import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  RECIPE_LIST_FAIL,
  RECIPE_LIST_REQUEST,
  RECIPE_LIST_SUCCESS,
} from '../types';

const initialState = {
  recipes: [],
  recipe: {},
  loading: false,
  error: '',
};

export const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECIPE_LIST_REQUEST:
      return { ...state, loading: true };
    case RECIPE_LIST_SUCCESS:
      return {
        ...state,
        recipes: action.payload.recipes,
        pages: action.payload.pages,
        page: action.payload.page,
        loading: false,
      };
    case RECIPE_LIST_FAIL:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { ...state, product: action.payload, loading: false };
    case PRODUCT_DETAILS_FAIL:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
