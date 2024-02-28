import {createSlice} from '@reduxjs/toolkit';
import {IProduct, IProductBidHistoryItem, IProductCondition} from '../../types';

export interface ProductState {
  //sign in state
  products: IProduct[];
  productDetail: IProduct | null;

  isGettingHomePage: boolean;
  isGettingProductDetail: boolean;

  keyWord: string | null;
  priceStart: string | null;
  priceEnd: string | null;
  condition: IProductCondition | null;
  category: string | null;
  brand: string[];
  color: string[];
  size: string[];
}

export const initialState: ProductState = {
  //sign in state
  products: [],
  productDetail: null,

  isGettingHomePage: false,
  isGettingProductDetail: false,

  keyWord: null,
  priceStart: null,
  priceEnd: null,
  condition: null,
  category: null,
  brand: [],
  color: [],
  size: [],
};

export const productSlice = createSlice({
  name: 'productReducer',
  initialState: {...initialState},
  reducers: {
    setIsGettingHomePage: (state, action) => {
      state.isGettingHomePage = action.payload;
    },
    setIsGettingProductDetail: (state, action) => {
      state.isGettingProductDetail = action.payload;
    },
    setProductDetail: (state, action) => {
      state.productDetail = action.payload;
    },
    setKeyWord: (state, action) => {
      state.keyWord = action.payload;
    },
    setPriceStart: (state, action) => {
      state.priceStart = action.payload;
    },
    setPriceEnd: (state, action) => {
      state.priceEnd = action.payload;
    },
    setCondition: (state, action) => {
      state.condition = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setSize: (state, action) => {
      state.size = action.payload;
    },
    reset() {
      return initialState;
    },
  },
});

export const productReducer = productSlice.reducer;
export const productReducerKey = productSlice.name;
export const productReducerActions = productSlice.actions;
