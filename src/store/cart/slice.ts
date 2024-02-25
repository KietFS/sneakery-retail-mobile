import {createSlice} from '@reduxjs/toolkit';
import {ICartItem} from '../../types';

export interface CartState {
  cartItems: ICartItem[];
  isGettingCartItems: boolean;
  isCheckingOutCart: boolean;
}

export const initialState: CartState = {
  //sign in state
  cartItems: [],
  isGettingCartItems: false,
  isCheckingOutCart: false,
};

export const cartSlice = createSlice({
  name: 'cartReducer',
  initialState: {...initialState},
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    setIsGettingCartItems: (state, action) => {
      state.isGettingCartItems = action.payload;
    },
    setIsCheckingOutCart: (state, action) => {
      state.isCheckingOutCart = action.payload;
    },
    reset() {
      return initialState;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const cartReducerKey = cartSlice.name;
export const cartReducerActions = cartSlice.actions;
