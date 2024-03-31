import {createSlice} from '@reduxjs/toolkit';
import {IProduct} from '../@types';

export interface ProductState {
  //sign in state
  products: IProduct[];
  totalRecords: number;
  filteredProducts: IProduct[];
  productDetail: IProduct | null;

  isGettingHomePage: boolean;
  isGettingFilteredProduct: boolean;
  isGettingProductDetail: boolean;

  keyword: string | null;
  category: string | null;
  brand: string[];
  color: string[];
  size: string[];
}

export const initialState: ProductState = {
  //sign in state
  products: [],
  totalRecords: 0,
  filteredProducts: [],
  productDetail: null,

  isGettingHomePage: false,
  isGettingFilteredProduct: false,
  isGettingProductDetail: false,

  keyword: null,
  category: null,
  brand: [],
  color: [],
  size: [],
};

export const productSlice = createSlice({
  name: 'productReducer',
  initialState: {...initialState},
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setTotalRecords: (state, action) => {
      state.totalRecords = action.payload;
    },
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
    setIsGettingFilteredProducts: (state, action) => {
      state.isGettingFilteredProduct = action.payload;
    },
    setIsGettingHomePage: (state, action) => {
      state.isGettingHomePage = action.payload;
    },
    setIsGettingProductDetail: (state, action) => {
      state.isGettingProductDetail = action.payload;
    },
    setProductDetail: (state, action) => {
      state.productDetail = action.payload;
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
