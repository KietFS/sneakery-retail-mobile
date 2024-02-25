import {createSlice} from '@reduxjs/toolkit';
import {IProduct, IProductBidHistoryItem, IProductCondition} from '../../types';

export interface ProductState {
  //sign in state
  nikeProducts: IProduct[];
  filterProducts: IProduct[];
  adidasProducts: IProduct[];
  lvProducts: IProduct[];
  pumaProducts: IProduct[];
  productDetail: IProduct | null;
  productBidHistory: IProductBidHistoryItem[];

  isGettingHomePage: boolean;
  isGettingProductDetail: boolean;
  isBiddingProduct: boolean;
  isFilteringProduct: boolean;

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
  nikeProducts: [],
  adidasProducts: [],
  lvProducts: [],
  filterProducts: [],
  pumaProducts: [],
  productDetail: null,
  productBidHistory: [],
  isGettingHomePage: false,
  isGettingProductDetail: false,
  isBiddingProduct: false,
  isFilteringProduct: false,

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
    setNikeProducts: (state, action) => {
      state.nikeProducts = action.payload;
    },
    setAdidasProducts: (state, action) => {
      state.adidasProducts = action.payload;
    },
    setPumaProducts: (state, action) => {
      state.pumaProducts = action.payload;
    },
    setLVProducts: (state, action) => {
      state.lvProducts = action.payload;
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
    setProductBidHistory: (state, action) => {
      state.productBidHistory = action.payload;
    },
    setIsBiddingProduct: (state, action) => {
      state.isBiddingProduct = action.payload;
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
    setIsFilteringProduct: (state, action) => {
      state.isFilteringProduct = action.payload;
    },
    setFilterProducts: (state, action) => {
      state.filterProducts = action.payload;
    },
    reset() {
      return initialState;
    },
  },
});

export const productReducer = productSlice.reducer;
export const productReducerKey = productSlice.name;
export const productReducerActions = productSlice.actions;
