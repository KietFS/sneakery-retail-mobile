import {createAction} from '@reduxjs/toolkit';
import {cartReducerKey} from './slice';
import {IAddToCartPayload, OrderPaymentType} from '../@types';

export const getCartItems = createAction(cartReducerKey + '/getCartItems');

export const addToCart = createAction<IAddToCartPayload>(
  cartReducerKey + '/addToCart',
);

export const removeCartItem = createAction<{id: string | number}>(
  cartReducerKey + '/removeCartItem',
);

export const checkOutCart = createAction<{
  cartId: string[];
  address: string;
  paymentType?: OrderPaymentType;
}>(cartReducerKey + '/checkOutCart');
