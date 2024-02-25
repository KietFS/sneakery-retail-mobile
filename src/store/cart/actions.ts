import {createAction} from '@reduxjs/toolkit';
import {cartReducerKey} from './slice';

export const getCartItems = createAction<{accessToken: string}>(
  cartReducerKey + '/getCartItems',
);

export const checkOutCart = createAction<{
  orderId: number;
  balance: number;
  shippingFee: number;
  totalPrice: number;
  token: string;
}>(cartReducerKey + '/checkOutCart');
