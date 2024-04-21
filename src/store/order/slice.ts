import {createSlice} from '@reduxjs/toolkit';
import {IOrderItem} from '../@types';

export interface OrderState {
  orderItems: IOrderItem[];
  orderDetail: IOrderItem | null;

  isGettingOrderItem: boolean;
  isCancelingOrder: boolean;
  isGettingOrderDetail: IOrderItem | null;
}

export const initialState: OrderState = {
  //sign in state
  orderItems: [],
  isGettingOrderItem: false,
  isCancelingOrder: false,
  orderDetail: null,
  isGettingOrderDetail: null,
};

export const orderSlice = createSlice({
  name: 'orderReducer',
  initialState: {...initialState},
  reducers: {
    setOrderItems: (state, action) => {
      state.orderItems = action.payload;
    },
    setIsGettingOrderItem: (state, action) => {
      state.isGettingOrderItem = action.payload;
    },
    setIsGettingOrderDetail: (state, action) => {
      state.isGettingOrderDetail = action.payload;
    },
    setIsCancelingOrder: (state, action) => {
      state.isCancelingOrder = action.payload;
    },
    setOrderDetail: (state, action) => {
      state.orderDetail = action.payload;
    },
    reset() {
      return initialState;
    },
  },
});

export const orderReducer = orderSlice.reducer;
export const orderReducerKey = orderSlice.name;
export const orderReducerActions = orderSlice.actions;
